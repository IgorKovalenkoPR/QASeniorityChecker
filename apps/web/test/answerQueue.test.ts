import { describe, expect, it } from 'vitest';
import { AnswerQueue, isRetryable } from '../src/lib/answerQueue.js';

/** No real timers: backoff is verified by what it asks for, not by waiting. */
function harness(
  save: (questionId: string, optionIds: readonly string[]) => Promise<unknown>,
  options: { timeoutAfter?: number } = {},
) {
  const sleeps: number[] = [];
  const statuses: { pending: number; retrying: boolean }[] = [];
  const fatals: unknown[] = [];
  let clock = 0;
  const queue = new AnswerQueue({
    save,
    onStatus: (s) => statuses.push(s),
    onFatal: (e) => fatals.push(e),
    sleep: async (ms) => {
      sleeps.push(ms);
      // Advance the injected clock so a stuck queue's flush hits its deadline
      // instead of polling forever.
      clock += options.timeoutAfter ?? ms;
      // A real macrotask, not Promise.resolve(): a queue that keeps failing
      // would otherwise spin the microtask queue and never yield, hanging the
      // run instead of failing a test.
      await new Promise((resolve) => setTimeout(resolve, 0));
    },
    now: () => clock,
    random: () => 0.5, // jitter multiplier lands exactly on 1.0
  });
  return { queue, sleeps, statuses, fatals };
}

const httpError = (status: number): Error & { status: number } =>
  Object.assign(new Error(`HTTP ${status}`), { status });

describe('which failures are worth retrying', () => {
  it('retries a request that never got a response', () => {
    // A dropped connection, DNS, a proxy restart: fetch rejects with a
    // TypeError carrying no status. This is the case the whole queue exists for.
    expect(isRetryable(new TypeError('Failed to fetch'))).toBe(true);
    expect(isRetryable(undefined)).toBe(true);
  });

  it('retries server-side failures and the two codes that mean "later"', () => {
    expect(isRetryable(httpError(500))).toBe(true);
    expect(isRetryable(httpError(502))).toBe(true);
    expect(isRetryable(httpError(503))).toBe(true);
    expect(isRetryable(httpError(408))).toBe(true);
    expect(isRetryable(httpError(429))).toBe(true);
  });

  it('never retries a verdict', () => {
    // The server read the request and refused it. Sending it again produces the
    // same refusal, and against a terminated attempt it would spin forever.
    expect(isRetryable(httpError(400))).toBe(false);
    expect(isRetryable(httpError(401))).toBe(false);
    expect(isRetryable(httpError(404))).toBe(false);
    expect(isRetryable(httpError(409))).toBe(false);
  });
});

describe('answer write queue', () => {
  it('saves a selection once when the network is healthy', async () => {
    const calls: [string, readonly string[]][] = [];
    const { queue, sleeps } = harness(async (id, ids) => {
      calls.push([id, ids]);
    });

    queue.set('Q1', ['a']);
    expect(await queue.flush()).toBe(true);

    expect(calls).toEqual([['Q1', ['a']]]);
    expect(sleeps.filter((ms) => ms > 50)).toEqual([]); // no backoff waits
    expect(queue.status).toEqual({ pending: 0, retrying: false });
  });

  it('keeps retrying a dropped connection until it lands', async () => {
    let attempts = 0;
    const { queue, sleeps } = harness(async () => {
      attempts += 1;
      if (attempts < 4) throw new TypeError('Failed to fetch');
    });

    queue.set('Q1', ['a']);
    expect(await queue.flush(60_000)).toBe(true);

    expect(attempts).toBe(4);
    // Exponential with the jitter pinned to 1.0: 300, 600, 1200.
    expect(sleeps.filter((ms) => ms > 50)).toEqual([300, 600, 1200]);
  });

  it('caps the backoff so a long outage does not stop retrying', async () => {
    let attempts = 0;
    const { queue, sleeps } = harness(async () => {
      attempts += 1;
      if (attempts < 9) throw new TypeError('Failed to fetch');
    });

    queue.set('Q1', ['a']);
    expect(await queue.flush(600_000)).toBe(true);

    const backoffs = sleeps.filter((ms) => ms > 50);
    expect(backoffs).toEqual([300, 600, 1200, 2400, 4800, 8000, 8000, 8000]);
  });

  it('reports that it is retrying, then that it is clean', async () => {
    let attempts = 0;
    const { queue, statuses } = harness(async () => {
      attempts += 1;
      if (attempts === 1) throw new TypeError('Failed to fetch');
    });

    queue.set('Q1', ['a']);
    await queue.flush(60_000);

    expect(statuses.some((s) => s.retrying && s.pending === 1)).toBe(true);
    expect(statuses.at(-1)).toEqual({ pending: 0, retrying: false });
  });

  it('sends the newest selection, and never lets a retry resurrect the old one', async () => {
    // The candidate changes their mind while the first send is failing. What
    // must reach the server last is 'c' - if the retry replayed 'a', the
    // answer on the server would silently disagree with the screen.
    const calls: string[][] = [];
    let attempts = 0;
    const { queue } = harness(async (_id, ids) => {
      attempts += 1;
      calls.push([...ids]);
      if (attempts === 1) throw new TypeError('Failed to fetch');
    });

    queue.set('Q1', ['a']);
    // Give the first (failing) send a chance to start before changing the answer.
    await Promise.resolve();
    queue.set('Q1', ['c']);
    expect(await queue.flush(60_000)).toBe(true);

    // The retry carried 'c', not the 'a' it originally failed on, and the last
    // thing the server heard is what the screen shows.
    expect(calls[0]).toEqual(['a']);
    expect(calls.slice(1).every((ids) => ids.join() === 'c')).toBe(true);
    expect(calls.at(-1)).toEqual(['c']);
    expect(queue.status.pending).toBe(0);
  });

  it('does not mark a question clean when a newer choice arrived mid-flight', async () => {
    // Same race, but the first send succeeds. The success must not clear the
    // newer selection, or 'c' would never be sent at all.
    const calls: string[][] = [];
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const { queue } = harness(async (_id, ids) => {
      calls.push([...ids]);
      if (calls.length === 1) await gate;
    });

    queue.set('Q1', ['a']);
    await Promise.resolve();
    queue.set('Q1', ['c']);
    release();
    expect(await queue.flush(60_000)).toBe(true);

    expect(calls).toEqual([['a'], ['c']]);
  });

  it('stops and reports once when the server says the attempt is over', async () => {
    const { queue, sleeps, fatals } = harness(async () => {
      throw httpError(409);
    });

    queue.set('Q1', ['a']);
    queue.set('Q2', ['b']);
    expect(await queue.flush(60_000)).toBe(true); // stopped, nothing left queued

    expect(fatals).toHaveLength(1);
    expect((fatals[0] as { status: number }).status).toBe(409);
    expect(sleeps.filter((ms) => ms > 50)).toEqual([]); // no retry against a verdict
  });

  it('ignores selections made after it has stopped', async () => {
    const calls: string[] = [];
    const { queue } = harness(async (id) => {
      calls.push(id);
    });

    queue.stop();
    queue.set('Q1', ['a']);
    await queue.flush();

    expect(calls).toEqual([]);
  });

  it('reports failure when a flush cannot drain before its deadline', async () => {
    // What submission relies on: if the last answer is still stuck, the
    // candidate has to be told, not have it scored as blank.
    const { queue } = harness(
      async () => {
        throw new TypeError('Failed to fetch');
      },
      { timeoutAfter: 5_000 },
    );

    queue.set('Q1', ['a']);
    expect(await queue.flush(1_000)).toBe(false);
    expect(queue.status.pending).toBe(1);
    // This queue never succeeds by construction: stop it, or its retry loop
    // outlives the test.
    queue.stop();
  });

  it('serialises writes across questions rather than firing them all at once', async () => {
    let inFlight = 0;
    let maxInFlight = 0;
    const { queue } = harness(async () => {
      inFlight += 1;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await Promise.resolve();
      inFlight -= 1;
    });

    queue.set('Q1', ['a']);
    queue.set('Q2', ['b']);
    queue.set('Q3', ['c']);
    expect(await queue.flush(60_000)).toBe(true);

    expect(maxInFlight).toBe(1);
  });
});
