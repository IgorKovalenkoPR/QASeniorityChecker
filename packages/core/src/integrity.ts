/**
 * Exam integrity policy.
 *
 * The requirement is "end the test if the candidate leaves the page, so nobody
 * can look up answers". Two failures are possible and they are not symmetric:
 * letting one borderline absence through costs a lookup on one question out of
 * twenty, while terminating an honest attempt destroys the result and the
 * candidate's trust in the whole exercise. So the policy is not symmetric
 * either - but it is strict about the one thing it is actually about.
 *
 * The rule that shapes everything below:
 *
 *   A strike may only be charged for an action the candidate took on purpose
 *   and can perceive themselves taking.
 *
 * That is what separates this version from the previous one. Before, a stray
 * F12, a print shortcut, a two-minute wifi drop and a page reload all drew on
 * the same budget as a tab switch, so two candidates who behaved identically
 * could get different verdicts and neither could tell why. Anything that is a
 * guess about intent (a keypress that MIGHT mean devtools) or an event the
 * candidate cannot see happening (server-observed silence) is now recorded for
 * the reviewer and charged nothing. What is left in the budget - leaving the
 * page, closing it, opening the attempt twice - is deliberate, visible to the
 * person doing it, and announced on the start screen before the timer starts.
 *
 * Facts that end an attempt on their own are kept out of the strike count
 * entirely (see `strikeCost`), so "how many interruptions do I have left" has
 * one answer and it does not silently mean something else.
 *
 * This module is shared by the browser and the API on purpose: the client uses
 * it to render the right warning immediately, the server uses it to make the
 * decision. The client's verdict is advisory; only the server's is binding.
 */

import type { LocalizedText } from './types.js';

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
   * The server stopped hearing from the client. Deliberately distinct from
   * `visibility_hidden`: the server cannot tell a closed tab from a dropped
   * connection, a VPN reconnect or a sleeping laptop, so this type carries its
   * own, far more forgiving threshold and never costs a strike.
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
   * A server-observed silence at or above this ends the attempt. Below it,
   * silence costs nothing at all: it is far more often a flaky network than a
   * candidate reading another page, and - the deciding argument - the candidate
   * cannot see it happening, so it can never satisfy the deliberate-and-visible
   * rule this policy is built on.
   */
  heartbeatTerminateMs: number;
  /** Strike cost per event type. 0 = logged for the report but never punished. */
  weights: Record<IntegrityEventType, number>;
}

/**
 * Default policy.
 *
 * Two interruptions end the attempt. That is deliberately tight, and it is
 * only defensible because of what was taken OUT of the budget at the same
 * time: with a budget of two, anything a candidate cannot control would decide
 * the outcome roughly half the time it fired.
 *
 * What costs a strike:
 *   - leaving the page for longer than `graceMs` (tab switch, another window,
 *     minimising, switching app),
 *   - closing or navigating away from the page, which includes a reload,
 *   - opening the same attempt in a second tab or browser.
 *
 * What ends the attempt on its own, without touching the count:
 *   - one absence of `hardTerminateMs` or more, which is long enough to read
 *     another page and is the behaviour the requirement exists to stop,
 *   - server-observed silence of `heartbeatTerminateMs` or more, which is the
 *     only signal a tampered client cannot fake.
 *
 * What is recorded for the reviewer and charged nothing:
 *   - copy, cut, paste and right-click: honest candidates highlight text while
 *     reading, and the leak this would prevent is smaller than the injustice,
 *   - print and devtools shortcuts: a keypress is a guess about intent, not
 *     evidence of anything, and a guess must not decide a result,
 *   - shorter server-observed silences: see `heartbeatTerminateMs`,
 *   - fullscreen exit: nothing requests fullscreen, so nothing emits this.
 *
 * A sub-`graceMs` FOCUS LOSS is free because it is not an act: a Teams popup,
 * a password manager and an incoming call all steal focus for under a second
 * whatever the candidate does, and the page stays on screen throughout. Hiding
 * the page - another tab, another application, minimising - has no grace at
 * all, because there is no way to do it by accident.
 */
export const DEFAULT_INTEGRITY_POLICY: IntegrityPolicy = {
  terminateAtStrikes: 2,
  graceMs: 2_000,
  hardTerminateMs: 30_000,
  heartbeatTerminateMs: 300_000,
  weights: {
    visibility_hidden: 1,
    window_blur: 1,
    fullscreen_exit: 0,
    copy_attempt: 0,
    paste_attempt: 0,
    context_menu: 0,
    print_attempt: 0,
    devtools_suspected: 0,
    duplicate_session: 1,
    navigation_away: 1,
    heartbeat_gap: 0,
  },
};

export interface IntegrityVerdict {
  strikes: number;
  terminate: boolean;
  /**
   * Why, in words a candidate can understand, in both languages.
   *
   * Localised here rather than at the edges because the same sentence is shown
   * on screen in the candidate's language, stored on the attempt and written
   * into the reviewer's spreadsheet in English. Three formatters would drift,
   * and the one place drift would show is the moment an attempt ends - the
   * worst possible moment to be confusing.
   */
  reason: LocalizedText | null;
  /** Strikes left before termination. */
  remaining: number;
}

/**
 * Strike cost of a single event under a policy.
 *
 * Terminating conditions are checked BEFORE the weight table, so an event can
 * be fatal on its own while costing nothing towards the ordinary count. That
 * ordering is the whole reason a two-minute network gap is free while a
 * five-minute one is final.
 */
export function strikeCost(event: IntegrityEvent, policy: IntegrityPolicy): number {
  const duration = event.durationMs ?? 0;

  // Server-derived: nobody reported this, the server merely stopped hearing.
  // The same sixty seconds of silence is produced by a cheating candidate and
  // by a reconnecting VPN, and only one of those should cost anything - so
  // silence is either long enough to be final or it is free.
  if (event.type === 'heartbeat_gap') {
    return duration >= policy.heartbeatTerminateMs ? policy.terminateAtStrikes : 0;
  }

  const isAbsence = event.type === 'visibility_hidden' || event.type === 'window_blur';
  if (isAbsence && duration >= policy.hardTerminateMs) return policy.terminateAtStrikes;

  const base = policy.weights[event.type] ?? 0;
  if (base === 0) return 0;

  // The grace window covers a focus STEAL, and only that. A notification, a
  // password manager or an incoming call takes the focus while the page stays
  // on screen - that is `window_blur`, the candidate did nothing, and it is
  // free. Hiding the document is a different act: you cannot accidentally
  // switch tab, switch application or minimise, and nothing involuntary hides
  // a page for under two seconds and then gives it back. Applying the same
  // grace to both meant a quick click away and back registered as nothing at
  // all, which is what the owner saw when they tried it.
  if (event.type === 'window_blur' && duration < policy.graceMs) return 0;
  return base;
}

const REASONS: Partial<Record<IntegrityEventType, LocalizedText>> = {
  // One event type covers two different causes - a single long absence, or the
  // last of several - and the candidate knows which of the two happened, so the
  // sentence has to cover both rather than pick one and be wrong half the time.
  visibility_hidden: {
    en: 'The test tab was hidden – either for longer than the rules allow, or once too often.',
    uk: 'Вкладку з тестом було приховано — або надто довго, або надто багато разів.',
  },
  window_blur: {
    en: 'The test window lost focus – either for longer than the rules allow, or once too often.',
    uk: 'Вікно тесту втратило фокус — або надто довго, або надто багато разів.',
  },
  fullscreen_exit: {
    en: 'Fullscreen mode was switched off during the attempt.',
    uk: 'Під час спроби було вимкнено повноекранний режим.',
  },
  navigation_away: {
    en: 'The test page was closed or left too many times.',
    uk: 'Сторінку тесту було закрито або залишено надто багато разів.',
  },
  // Says "several minutes" rather than "too long": it matches the threshold the
  // start screen promised, so the candidate can hold the tool to its own word.
  heartbeat_gap: {
    en: 'The connection to the server was lost for several minutes, so the attempt could not be continued.',
    uk: 'Звʼязок із сервером було втрачено на кілька хвилин, тож продовжити спробу не вдалося.',
  },
  duplicate_session: {
    en: 'The same attempt was opened in a second tab or browser.',
    uk: 'Ту саму спробу було відкрито в другій вкладці або в іншому браузері.',
  },
  // Unreachable at the current weights, and kept anyway: the weights are
  // configuration, and a policy that turns them back up should not fall through
  // to the generic sentence.
  devtools_suspected: {
    en: 'The developer tools appear to have been opened.',
    uk: 'Схоже, було відкрито інструменти розробника.',
  },
  print_attempt: {
    en: 'A print or screen-capture shortcut was used.',
    uk: 'Було використано комбінацію клавіш для друку або захоплення екрана.',
  },
};

// The same pair as the interface dictionary's `term.default`, deliberately. The
// old wording ("the rules were violated") was a flat accusation from a system
// that admits one screen lower that it might be wrong.
const DEFAULT_REASON: LocalizedText = {
  en: 'This attempt was ended under the integrity rules.',
  uk: 'Цю спробу завершено за правилами чесного проходження тесту.',
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
  let reason: LocalizedText | null = null;

  for (const event of events) {
    const cost = strikeCost(event, policy);
    if (cost === 0) continue;
    strikes += cost;
    if (strikes >= policy.terminateAtStrikes && reason === null) {
      reason = REASONS[event.type] ?? DEFAULT_REASON;
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
