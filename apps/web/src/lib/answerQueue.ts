/**
 * Write queue for answer selections.
 *
 * Selecting an answer used to be fire-and-forget: the UI painted the choice
 * optimistically and a failed PUT was swallowed without a retry and without a
 * trace, so a blink of the network silently cost the candidate an answer while
 * the screen kept showing it as chosen. The start screen promised the opposite.
 *
 * Three properties matter here, and each one is a way the naive version was
 * wrong:
 *
 *   1. A transport failure is retried, with backoff, for as long as the attempt
 *      is live. The network usually comes back well inside a 30-minute test,
 *      and the right answer to "the wifi blinked" is to send it again, not to
 *      lose the answer.
 *   2. The latest selection wins. A retry must never resurrect a stale choice:
 *      if the candidate changes their mind while an earlier send is in flight,
 *      the newer selection is what has to reach the server, and the older one
 *      must not overwrite it afterwards. Sends are serialised and tagged with a
 *      sequence number for exactly this.
 *   3. A rejection is not a hiccup. If the server says the attempt is over, no
 *      amount of retrying fixes it, so the queue stops and hands the error up
 *      rather than spinning forever against a closed attempt.
 *
 * Deliberately dependency-free: no import of the api module, so the retry
 * policy is unit-testable in a plain node environment with no DOM and no Vite.
 * HTTP errors are recognised by their numeric `status`, which is what
 * `ApiError` carries.
 */

export interface AnswerQueueStatus {
  /** Questions whose latest selection has not reached the server yet. */
  pending: number;
  /** A send has failed and is being retried. */
  retrying: boolean;
}

export interface AnswerQueueOptions {
  save: (questionId: string, optionIds: readonly string[]) => Promise<unknown>;
  onStatus?: (status: AnswerQueueStatus) => void;
  /** Called once when the server rejects a write for a reason retrying cannot fix. */
  onFatal?: (error: unknown) => void;
  /** Injected in tests to avoid real timers. */
  sleep?: (ms: number) => Promise<void>;
  now?: () => number;
  /** Backoff ceiling. */
  maxDelayMs?: number;
  /** Injected in tests to make jitter deterministic. */
  random?: () => number;
}

interface Entry {
  optionIds: readonly string[];
  seq: number;
}

const BASE_DELAY_MS = 300;
const defaultSleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * Retry transport failures and server-side blips; never retry a verdict.
 *
 * No `status` at all means the request never got a response - a dropped
 * connection, DNS, a proxy restart - which is exactly the case worth retrying.
 * A 4xx is the server having read the request and refused it, so sending it
 * again produces the same refusal; the exceptions are the two codes that
 * explicitly mean "later": 408 and 429.
 */
export function isRetryable(error: unknown): boolean {
  const status = (error as { status?: unknown } | null | undefined)?.status;
  if (typeof status !== 'number') return true;
  if (status === 408 || status === 429) return true;
  return status >= 500;
}

export class AnswerQueue {
  private readonly dirty = new Map<string, Entry>();
  private seq = 0;
  private failures = 0;
  private running = false;
  private stopped = false;

  constructor(private readonly options: AnswerQueueOptions) {}

  get status(): AnswerQueueStatus {
    return { pending: this.dirty.size, retrying: this.failures > 0 };
  }

  /** Record the candidate's latest selection for one question and start sending. */
  set(questionId: string, optionIds: readonly string[]): void {
    if (this.stopped) return;
    this.seq += 1;
    this.dirty.set(questionId, { optionIds: [...optionIds], seq: this.seq });
    this.emit();
    void this.pump();
  }

  /**
   * Wait for everything to land, up to a deadline. Returns whether it did.
   *
   * Used before submission: scoring a paper whose last answer never arrived
   * would mark it blank, so the candidate is told to wait rather than having
   * that happen quietly.
   */
  async flush(timeoutMs = 8_000): Promise<boolean> {
    const now = this.options.now ?? Date.now;
    const sleep = this.options.sleep ?? defaultSleep;
    const deadline = now() + timeoutMs;
    void this.pump();
    while (this.dirty.size > 0 && !this.stopped && now() < deadline) {
      await sleep(50);
    }
    return this.dirty.size === 0;
  }

  /** Abandon queued writes. The attempt is over; nothing more can be saved. */
  stop(): void {
    if (this.stopped) return;
    this.stopped = true;
    this.dirty.clear();
    this.failures = 0;
    this.emit();
  }

  private emit(): void {
    this.options.onStatus?.(this.status);
  }

  private async pump(): Promise<void> {
    if (this.running || this.stopped) return;
    this.running = true;
    try {
      while (!this.stopped) {
        const next = this.dirty.entries().next();
        if (next.done) break;
        const [questionId, entry] = next.value;

        try {
          await this.options.save(questionId, entry.optionIds);
        } catch (error) {
          if (!isRetryable(error)) {
            const fatal = error;
            this.stop();
            this.options.onFatal?.(fatal);
            return;
          }
          this.failures += 1;
          this.emit();
          await (this.options.sleep ?? defaultSleep)(this.delay());
          continue;
        }

        // Clear the entry only if nothing newer arrived while it was in flight.
        // Deleting unconditionally would drop a selection the candidate made
        // during the send and leave the server holding the older answer.
        const current = this.dirty.get(questionId);
        if (current && current.seq === entry.seq) this.dirty.delete(questionId);
        this.failures = 0;
        this.emit();
      }
    } finally {
      this.running = false;
    }
  }

  private delay(): number {
    const random = this.options.random ?? Math.random;
    const ceiling = this.options.maxDelayMs ?? 8_000;
    const exponential = Math.min(ceiling, BASE_DELAY_MS * 2 ** (this.failures - 1));
    // Plus or minus 25%, so a roomful of candidates coming back onto the same
    // wifi do not retry in lockstep.
    return Math.round(exponential * (0.75 + random() * 0.5));
  }
}
