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
  /**
   * The server stopped hearing from the client for longer than the grace
   * window. Deliberately distinct from `visibility_hidden`: the server cannot
   * tell a closed tab from a dropped connection, a VPN reconnect or a sleeping
   * laptop, so this type carries its own, far more forgiving thresholds.
   */
  'heartbeat_gap',
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
  /**
   * A server-observed heartbeat gap shorter than this costs nothing. Silence is
   * not evidence: it is far more often a flaky network than a candidate reading
   * another page, and the candidate cannot even see it happening.
   */
  heartbeatStrikeMs: number;
  /** A heartbeat gap at or above this ends the attempt on its own. */
  heartbeatTerminateMs: number;
  /** Strike cost per event type. 0 = logged for the report but never punished. */
  weights: Record<IntegrityEventType, number>;
}

/**
 * Default policy. Tuned so that:
 *   - a single accidental sub-2s blur is free (warning only),
 *   - four focus losses end the attempt,
 *   - one deliberate 30s+ absence ends the attempt on its own,
 *   - a page reload costs one strike, not the attempt: the start screen tells
 *     the candidate a reload is safe, and failing someone for an action you
 *     explicitly allowed is the one failure mode that destroys trust outright,
 *   - a server-observed silence has to reach five minutes to be fatal,
 *   - copy/paste/right-click are recorded for the reviewer but do not, by
 *     themselves, fail an honest candidate who highlights text while reading.
 *
 * The thresholds are deliberately loose. Terminating an honest attempt destroys
 * the result and the candidate's trust in the tool, while a borderline blur
 * that slips through costs at most a lookup on one question out of twenty. The
 * two failures are not symmetric, so the policy is not symmetric either.
 */
export const DEFAULT_INTEGRITY_POLICY: IntegrityPolicy = {
  terminateAtStrikes: 4,
  graceMs: 2_000,
  hardTerminateMs: 30_000,
  heartbeatStrikeMs: 120_000,
  heartbeatTerminateMs: 300_000,
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
    navigation_away: 1,
    heartbeat_gap: 1,
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
  const duration = event.durationMs ?? 0;

  // A heartbeat gap is server-derived: nobody reported it, the server merely
  // stopped hearing. It gets its own scale, because the same sixty seconds of
  // silence is produced by a cheating candidate and by a reconnecting VPN, and
  // only one of those should cost the attempt.
  if (event.type === 'heartbeat_gap') {
    if (duration >= policy.heartbeatTerminateMs) return policy.terminateAtStrikes;
    if (duration < policy.heartbeatStrikeMs) return 0;
    return base;
  }

  const isAbsence = event.type === 'visibility_hidden' || event.type === 'window_blur';
  if (isAbsence) {
    if (duration >= policy.hardTerminateMs) return policy.terminateAtStrikes;
    if (duration < policy.graceMs) return 0;
  }
  return base;
}

const REASONS: Partial<Record<IntegrityEventType, string>> = {
  visibility_hidden: 'Вкладку з тестом було приховано. Перемикання вкладок, застосунків або вікон завершує спробу.',
  window_blur: 'Вікно тесту втратило фокус. Спроба має лишатися на передньому плані.',
  fullscreen_exit: 'Повноекранний режим було вимкнено.',
  navigation_away: 'Сторінку тесту було закрито або залишено надто багато разів.',
  heartbeat_gap:
    'Звʼязок із сервером було втрачено надто надовго, і спробу не вдалося продовжити.',
  duplicate_session: 'Ту саму спробу було відкрито в іншій вкладці або браузері.',
  devtools_suspected: 'Схоже, було відкрито інструменти розробника.',
  print_attempt: 'Було використано комбінацію клавіш для друку або захоплення екрана.',
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
      reason = REASONS[event.type] ?? 'Порушено правила чесності проходження тесту.';
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
