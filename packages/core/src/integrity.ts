/**
 * Exam integrity policy.
 *
 * The requirement is "end the test if the candidate navigates away, so nobody
 * can look up answers". Implemented as a strike system rather than a hair
 * trigger, because a browser fires the same events for an OS notification, a
 * password-manager popup and an incoming call as it does for a candidate
 * opening a second tab. Terminating an honest attempt is a worse failure than
 * letting one borderline blur through, so a short blur costs a warning and a
 * sustained one - the only kind you can actually read another page during -
 * ends the attempt.
 *
 * This module is shared by the browser and the API on purpose: the client uses
 * it to render the right warning immediately, the server uses it to make the
 * decision. The client's verdict is advisory; only the server's is binding.
 */

export const INTEGRITY_EVENT_TYPES = [
  /** document.visibilityState became 'hidden' - tab switch, minimise, app switch. */
  'visibility_hidden',
  /** window lost focus but the document is still visible - popup, other monitor. */
  'window_blur',
  /** Candidate left fullscreen, when the attempt was started in fullscreen. */
  'fullscreen_exit',
  /** Selection copied out of the question area. */
  'copy_attempt',
  /** Text pasted into an answer field. */
  'paste_attempt',
  /** Right-click / context menu on the question area. */
  'context_menu',
  /** Print or screenshot-adjacent shortcut. */
  'print_attempt',
  /** Viewport jumped in a way that matches a docked devtools panel opening. */
  'devtools_suspected',
  /** The same attempt was opened in a second tab or browser. */
  'duplicate_session',
  /** beforeunload / pagehide - the candidate navigated away or closed the tab. */
  'navigation_away',
] as const;

export type IntegrityEventType = (typeof INTEGRITY_EVENT_TYPES)[number];

export interface IntegrityEvent {
  type: IntegrityEventType;
  /** Client clock, milliseconds since epoch. Advisory - never trusted for timing. */
  occurredAt: number;
  /** How long the candidate was away, in ms. Only set for blur/hidden events. */
  durationMs?: number;
}

export interface IntegrityPolicy {
  /** Strikes at or above this end the attempt. */
  terminateAtStrikes: number;
  /** A blur shorter than this is a warning, not a strike. */
  graceMs: number;
  /** Any absence longer than this terminates immediately, whatever the count. */
  hardTerminateMs: number;
  /** Strike cost per event type. 0 = logged for the report but never punished. */
  weights: Record<IntegrityEventType, number>;
}

/**
 * Default policy. Tuned so that:
 *   - a single accidental sub-2s blur is free (warning only),
 *   - two focus losses end the attempt,
 *   - one deliberate 10s+ absence ends the attempt on its own,
 *   - copy/paste/right-click are recorded for the reviewer but do not, by
 *     themselves, fail an honest candidate who highlights text while reading.
 */
export const DEFAULT_INTEGRITY_POLICY: IntegrityPolicy = {
  terminateAtStrikes: 2,
  graceMs: 2_000,
  hardTerminateMs: 10_000,
  weights: {
    visibility_hidden: 1,
    window_blur: 1,
    fullscreen_exit: 1,
    copy_attempt: 0,
    paste_attempt: 0,
    context_menu: 0,
    print_attempt: 1,
    devtools_suspected: 1,
    duplicate_session: 2,
    navigation_away: 2,
  },
};

export interface IntegrityVerdict {
  strikes: number;
  terminate: boolean;
  /** Why, in words a candidate can understand. */
  reason: string | null;
  /** Strikes left before termination. */
  remaining: number;
}

/** Strike cost of a single event under a policy. */
export function strikeCost(event: IntegrityEvent, policy: IntegrityPolicy): number {
  const base = policy.weights[event.type] ?? 0;
  if (base === 0) return 0;
  const isAbsence = event.type === 'visibility_hidden' || event.type === 'window_blur';
  if (isAbsence) {
    const duration = event.durationMs ?? 0;
    if (duration >= policy.hardTerminateMs) return policy.terminateAtStrikes;
    if (duration < policy.graceMs) return 0;
  }
  return base;
}

const REASONS: Partial<Record<IntegrityEventType, string>> = {
  visibility_hidden: 'The test tab was hidden. Switching tabs, apps or windows ends the attempt.',
  window_blur: 'The test window lost focus. The attempt must stay in the foreground.',
  fullscreen_exit: 'Fullscreen mode was exited.',
  navigation_away: 'The test page was closed or navigated away from.',
  duplicate_session: 'The same attempt was opened in another tab or browser.',
  devtools_suspected: 'Developer tools appear to have been opened.',
  print_attempt: 'A print or capture shortcut was used.',
};

/**
 * Fold a full event log into a verdict. Pure and total: the server replays the
 * whole stored log on every report, so a lost or duplicated request cannot
 * leave the attempt in an inconsistent state.
 */
export function evaluateIntegrity(
  events: readonly IntegrityEvent[],
  policy: IntegrityPolicy = DEFAULT_INTEGRITY_POLICY,
): IntegrityVerdict {
  let strikes = 0;
  let reason: string | null = null;

  for (const event of events) {
    const cost = strikeCost(event, policy);
    if (cost === 0) continue;
    strikes += cost;
    if (strikes >= policy.terminateAtStrikes && reason === null) {
      reason = REASONS[event.type] ?? 'Exam integrity rules were violated.';
    }
  }

  const terminate = strikes >= policy.terminateAtStrikes;
  return {
    strikes,
    terminate,
    reason: terminate ? reason : null,
    remaining: Math.max(0, policy.terminateAtStrikes - strikes),
  };
}
