import type { IntegrityEvent, IntegrityEventType } from '@qasc/core';
import { beaconIntegrity } from './api.js';

/**
 * Client-side exam proctor.
 *
 * The product requirement is "end the test when the candidate navigates away".
 * This module is the DETECTOR half of that: it observes, timestamps and reports.
 * It never decides. The server replays the reported log and issues the verdict,
 * for two reasons:
 *
 *   1. Anything the browser decides can be edited in the browser. A candidate who
 *      patches this file could otherwise grant themselves an unlimited number of
 *      lookups.
 *   2. The server sees things this file cannot, above all silence: a heartbeat
 *      that stops is evidence, and a patched client cannot fake one it never sent.
 *
 * Detection strategy, in order of reliability:
 *   - `visibilitychange` fires for tab switches, minimising and mobile app
 *     switches. It is the single most reliable signal and works on every engine.
 *   - `blur`/`focus` catch a second window on another monitor, where the document
 *     never becomes hidden.
 *   - `pagehide` catches closing the tab and navigating away; it is paired with
 *     sendBeacon so the report survives the page.
 *   - copy/paste/contextmenu/print are recorded but carry zero strike weight by
 *     default: honest candidates highlight text while reading, and failing them
 *     for it would be worse than the leak it prevents.
 *
 * Absences are measured, not merely counted. A sub-2s blur (a notification
 * stealing focus, a password manager, an incoming call) is reported with its
 * duration and costs nothing; a 10s+ absence - long enough to actually read
 * another page - ends the attempt on its own.
 */

export interface ProctorHandlers {
  /** A reportable event was observed. Called before the network round trip. */
  onEvent: (event: IntegrityEvent) => void;
  /** The server verdict came back. The only authority on termination. */
  onVerdict: (verdict: { strikes: number; terminate: boolean; reason: string | null; remaining: number }) => void;
  /** A transient warning to surface immediately, before the server answers. */
  onLocalWarning: (message: string) => void;
}

export interface ProctorOptions {
  attemptId: string;
  token: string;
  heartbeatSeconds: number;
  handlers: ProctorHandlers;
  report: (events: IntegrityEvent[]) => Promise<{
    verdict: { strikes: number; terminate: boolean; reason: string | null; remaining: number };
  }>;
}

const AWAY_MESSAGE =
  'Ви залишили сторінку тесту. Спроба завершиться, якщо це повториться або триватиме довше за кілька секунд.';

export class Proctor {
  private readonly options: ProctorOptions;
  private awaySince: number | null = null;
  private queue: IntegrityEvent[] = [];
  private flushTimer: number | null = null;
  private heartbeatTimer: number | null = null;
  private stopped = false;
  private readonly disposers: (() => void)[] = [];
  /**
   * Cross-tab guard. Every attempt page announces itself on a channel keyed by
   * the attempt id; if a second page answers, both know the attempt was opened
   * twice and report it. Falls back silently where BroadcastChannel is missing.
   */
  private channel: BroadcastChannel | null = null;

  constructor(options: ProctorOptions) {
    this.options = options;
  }

  start(): void {
    const on = <K extends keyof DocumentEventMap>(
      target: Document | Window,
      type: K | string,
      handler: (event: Event) => void,
      opts?: AddEventListenerOptions,
    ) => {
      target.addEventListener(type, handler as EventListener, opts);
      this.disposers.push(() => target.removeEventListener(type, handler as EventListener, opts));
    };

    on(document, 'visibilitychange', () => {
      if (document.visibilityState === 'hidden') this.markAway();
      else this.markBack('visibility_hidden');
    });

    on(window, 'blur', () => this.markAway());
    on(window, 'focus', () => this.markBack('window_blur'));

    on(window, 'pagehide', () => {
      // The page is going away: report immediately and synchronously.
      this.enqueue({ type: 'navigation_away', occurredAt: Date.now() });
      this.flushWithBeacon();
    });

    on(document, 'copy', () => this.record('copy_attempt'));
    on(document, 'cut', () => this.record('copy_attempt'));
    on(document, 'paste', () => this.record('paste_attempt'));
    on(document, 'contextmenu', (event) => {
      event.preventDefault();
      this.record('context_menu');
    });

    on(window, 'beforeprint', () => this.record('print_attempt'));
    on(document, 'keydown', (event) => {
      const e = event as KeyboardEvent;
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && key === 'p') {
        e.preventDefault();
        this.record('print_attempt');
      }
      // F12 / Ctrl+Shift+I are hints, not proof, and cost nothing by policy.
      if (key === 'f12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === 'i' || key === 'j'))) {
        this.record('devtools_suspected');
      }
    });

    this.startDuplicateTabGuard();
    this.startHeartbeat();
  }

  stop(): void {
    this.stopped = true;
    for (const dispose of this.disposers) dispose();
    this.disposers.length = 0;
    if (this.flushTimer !== null) window.clearTimeout(this.flushTimer);
    if (this.heartbeatTimer !== null) window.clearInterval(this.heartbeatTimer);
    this.channel?.close();
    this.channel = null;
  }

  // --- absence tracking ----------------------------------------------------

  private markAway(): void {
    if (this.awaySince !== null) return; // blur and visibilitychange often both fire
    this.awaySince = Date.now();
    this.options.handlers.onLocalWarning(AWAY_MESSAGE);
  }

  private markBack(type: Extract<IntegrityEventType, 'visibility_hidden' | 'window_blur'>): void {
    if (this.awaySince === null) return;
    const start = this.awaySince;
    this.awaySince = null;
    this.enqueue({ type, occurredAt: start, durationMs: Date.now() - start });
    this.flushSoon();
  }

  private record(type: IntegrityEventType): void {
    this.enqueue({ type, occurredAt: Date.now() });
    this.flushSoon();
  }

  private enqueue(event: IntegrityEvent): void {
    if (this.stopped) return;
    this.queue.push(event);
    this.options.handlers.onEvent(event);
  }

  // --- reporting -----------------------------------------------------------

  /**
   * Batches for a moment before sending. A single tab switch fires blur AND
   * visibilitychange; without batching that is two requests racing to produce
   * two strikes for one action.
   */
  private flushSoon(delayMs = 250): void {
    if (this.flushTimer !== null) window.clearTimeout(this.flushTimer);
    this.flushTimer = window.setTimeout(() => void this.flush(), delayMs);
  }

  async flush(): Promise<void> {
    if (this.queue.length === 0 || this.stopped) return;
    const batch = this.queue;
    this.queue = [];
    try {
      const { verdict } = await this.options.report(batch);
      this.options.handlers.onVerdict(verdict);
    } catch {
      // Network failure must not lose evidence: put it back for the next flush.
      this.queue = [...batch, ...this.queue];
    }
  }

  private flushWithBeacon(): void {
    if (this.queue.length === 0) return;
    beaconIntegrity(this.options.attemptId, this.options.token, this.queue);
    this.queue = [];
  }

  // --- heartbeat -----------------------------------------------------------

  /**
   * The heartbeat is the half of the system a tampered client cannot fake.
   * If it stops, the server records the gap itself and applies the same rules,
   * so disabling the listeners above does not buy a candidate anything.
   */
  private startHeartbeat(): void {
    const period = Math.max(5, this.options.heartbeatSeconds) * 1000;
    this.heartbeatTimer = window.setInterval(() => {
      if (document.visibilityState === 'visible') void this.flush();
    }, period);
  }

  // --- duplicate tab guard -------------------------------------------------

  private startDuplicateTabGuard(): void {
    if (typeof BroadcastChannel === 'undefined') return;
    const channel = new BroadcastChannel(`qasc-attempt-${this.options.attemptId}`);
    this.channel = channel;
    channel.onmessage = (event: MessageEvent<string>) => {
      if (event.data === 'hello' || event.data === 'here') {
        this.record('duplicate_session');
        if (event.data === 'hello') channel.postMessage('here');
      }
    };
    channel.postMessage('hello');
  }
}
