import type { IntegrityEvent, IntegrityEventType, IntegrityVerdict } from '@qasc/core';
import { beaconIntegrity } from './api.js';
import type { StringKey } from './i18n.js';

/**
 * Client-side exam proctor.
 *
 * The product requirement is "end the test when the candidate leaves the page".
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
 *   - copy/paste/contextmenu/print are recorded but carry zero strike weight:
 *     honest candidates highlight text while reading, and failing them for it
 *     would be worse than the leak it prevents.
 *
 * ## Episodes, not events
 *
 * The unit this file reports is an ABSENCE EPISODE - one continuous stretch of
 * the candidate not being on the page - and never a raw browser event. That
 * distinction is the whole point of the rewrite, because the browser does not
 * emit one event per human action:
 *
 *   - one tab switch fires `blur` AND `visibilitychange`, in an order that
 *     differs between engines;
 *   - coming back fires `focus` and `visibilitychange` in either order;
 *   - Windows alt-tab, native dialogs and monitor switches emit
 *     blur/focus/blur clusters milliseconds apart.
 *
 * Reporting those raw would charge one candidate one strike and another two for
 * the identical action, and neither could tell why. So an episode opens on the
 * first signal, absorbs every further signal, and only closes once the page has
 * been visible again for `EPISODE_COALESCE_MS` uninterrupted. Its duration is
 * the time actually spent away, and its type is decided by what was true during
 * it - hidden if the document was ever hidden, otherwise merely unfocused -
 * rather than by whichever return event happened to win the race.
 *
 * Absences are measured, not merely counted. A sub-2s episode (a notification
 * stealing focus, a password manager, an incoming call) is reported with its
 * duration and costs nothing; a 30s+ absence - long enough to actually read
 * another page - ends the attempt on its own.
 */

/**
 * How long the page has to be back before an absence is treated as over.
 *
 * One second: long enough to swallow the blur/focus chatter browsers emit
 * around native dialogs and window switches, short enough that two genuinely
 * separate lookups a second apart still count separately.
 */
const EPISODE_COALESCE_MS = 1_000;

interface Episode {
  /** When this episode began - the moment the candidate first left. */
  startedAt: number;
  /** Start of the current stretch away, or null while the page is back. */
  awaySince: number | null;
  /** Time away accumulated across the episode, excluding time spent back. */
  awayMs: number;
  /** Whether the document was ever genuinely hidden, not just unfocused. */
  wasHidden: boolean;
}

export interface ProctorHandlers {
  /** A reportable event was observed. Called before the network round trip. */
  onEvent: (event: IntegrityEvent) => void;
  /** The server verdict came back. The only authority on termination. */
  onVerdict: (verdict: IntegrityVerdict) => void;
  /**
   * A transient warning to surface immediately, before the server answers.
   *
   * A translation KEY, not a sentence - the proctor runs outside React and has
   * no locale. Typed as `StringKey` rather than `string` because it was typed
   * as `string` and the app passed it straight to the banner, so candidates saw
   * the literal text `proctor.leftPage` the moment they left the page.
   */
  onLocalWarning: (key: StringKey) => void;
}

export interface ProctorOptions {
  attemptId: string;
  token: string;
  heartbeatSeconds: number;
  handlers: ProctorHandlers;
  report: (events: IntegrityEvent[]) => Promise<{ verdict: IntegrityVerdict }>;
}

/**
 * The proctor runs outside React and has no locale, so it emits a translation
 * key and the app renders it. Keeping the sentence here would have made the
 * warning the one piece of the interface that stayed Ukrainian.
 */
const AWAY_MESSAGE = 'proctor.leftPage';

export class Proctor {
  private readonly options: ProctorOptions;
  private episode: Episode | null = null;
  private closeTimer: number | null = null;
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
  /** Identifies this page instance, so a peer is only ever counted once. */
  private readonly pageId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  private readonly peers = new Set<string>();

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
      else this.markBack();
    });

    on(window, 'blur', () => this.markAway());
    on(window, 'focus', () => this.markBack());

    on(window, 'pagehide', (event) => {
      // An episode still open at this point used to be lost outright: switching
      // to another tab and then closing that tab reported the navigation and
      // never the absence, so the longest absences were the ones least likely
      // to be recorded.
      this.closeEpisode();
      this.enqueue({ type: 'navigation_away', occurredAt: Date.now() });
      if (!(event as PageTransitionEvent).persisted) {
        // A real unload rather than a move into the back/forward cache. Stop
        // answering the duplicate-tab handshake now: on a reload the outgoing
        // page would otherwise answer its own replacement, and both would
        // record a second session that never existed.
        this.channel?.close();
        this.channel = null;
      }
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
      // F12 / Ctrl+Shift+I are hints, not proof. They are recorded for the
      // reviewer and carry no strike weight: a keypress is a guess about
      // intent, and a guess must not decide somebody's result.
      if (key === 'f12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === 'i' || key === 'j'))) {
        this.record('devtools_suspected');
      }
    });

    // A paper can be started and then left before this listener exists: the
    // Start request is in flight while the candidate switches away, so the
    // document is already hidden by the time the proctor runs and no
    // `visibilitychange` will fire until they come back. Without this, the
    // first absence of the attempt is the one absence that goes unrecorded.
    if (document.visibilityState === 'hidden') this.markAway();

    this.startDuplicateTabGuard();
    this.startHeartbeat();
  }

  stop(): void {
    this.stopped = true;
    for (const dispose of this.disposers) dispose();
    this.disposers.length = 0;
    if (this.closeTimer !== null) window.clearTimeout(this.closeTimer);
    if (this.flushTimer !== null) window.clearTimeout(this.flushTimer);
    if (this.heartbeatTimer !== null) window.clearInterval(this.heartbeatTimer);
    this.channel?.close();
    this.channel = null;
  }

  // --- absence tracking ----------------------------------------------------

  /**
   * The page stopped being available to the candidate. Idempotent within one
   * episode: `blur` and `visibilitychange` both firing for a single tab switch
   * must not open two.
   */
  private markAway(): void {
    const now = Date.now();
    const hidden = document.visibilityState === 'hidden';

    if (this.episode) {
      // Either a second signal for the same departure, or a re-departure inside
      // the coalescing window. Both belong to the episode already open.
      if (this.closeTimer !== null) {
        window.clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
      if (this.episode.awaySince === null) this.episode.awaySince = now;
      if (hidden) this.episode.wasHidden = true;
      return;
    }

    this.episode = { startedAt: now, awaySince: now, awayMs: 0, wasHidden: hidden };
    this.options.handlers.onLocalWarning(AWAY_MESSAGE);
  }

  /**
   * The page is back. Stops the clock but does not close the episode yet - the
   * page has to stay back for `EPISODE_COALESCE_MS` first.
   */
  private markBack(): void {
    const episode = this.episode;
    if (!episode || episode.awaySince === null) return;
    // Only a visible document counts as back. A `focus` that arrives while the
    // document is still hidden would otherwise stop the clock on an absence
    // that is still running.
    if (document.visibilityState !== 'visible') return;

    episode.awayMs += Date.now() - episode.awaySince;
    episode.awaySince = null;
    this.closeTimer = window.setTimeout(() => {
      this.closeTimer = null;
      this.closeEpisode();
      this.flushSoon();
    }, EPISODE_COALESCE_MS);
  }

  /**
   * Turn the open episode into exactly one reported event. Safe to call with
   * no episode open, and safe to call while still away - on `pagehide` the
   * absence has to be reported without waiting for a return that will not come.
   */
  private closeEpisode(): void {
    const episode = this.episode;
    if (!episode) return;
    if (this.closeTimer !== null) {
      window.clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    this.episode = null;

    const stillAway = episode.awaySince === null ? 0 : Date.now() - episode.awaySince;
    this.enqueue({
      // Decided by what was true during the episode, not by whichever return
      // event won the race, so the same action always reports the same type.
      type: episode.wasHidden ? 'visibility_hidden' : 'window_blur',
      occurredAt: episode.startedAt,
      durationMs: episode.awayMs + stillAway,
    });
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
   * Batches for a moment before sending, so a burst of events becomes one
   * request and one verdict rather than several racing to render warnings in an
   * arbitrary order.
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
    channel.onmessage = (event: MessageEvent<unknown>) => {
      const message = event.data as { kind?: unknown; pageId?: unknown } | null;
      if (!message || typeof message.pageId !== 'string') return;
      // Each peer page is counted exactly once, by its own id. A peer that
      // announces itself and then answers a later handshake is still one second
      // session, and counting it twice was one of the ways the old guard
      // produced strikes nobody could account for.
      if (message.pageId === this.pageId || this.peers.has(message.pageId)) return;
      this.peers.add(message.pageId);
      this.record('duplicate_session');
      if (message.kind === 'hello') channel.postMessage({ kind: 'here', pageId: this.pageId });
    };
    channel.postMessage({ kind: 'hello', pageId: this.pageId });
  }
}
