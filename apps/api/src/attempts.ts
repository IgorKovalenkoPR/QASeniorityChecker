import { createHash, randomBytes, randomUUID } from 'node:crypto';
import type {
  AnswerSheet,
  IntegrityEvent,
  IntegrityEventType,
  LocalizedText,
  ScoreBreakdown,
} from '@qasc/core';
import {
  DEFAULT_INTEGRITY_POLICY,
  QUESTIONS_PER_VARIANT,
  VARIANT_COUNT,
  evaluateIntegrity,
  scoreAttempt,
} from '@qasc/core';
import { config } from './config.js';
import type { Db } from './db.js';
import { opaqueOptionId, resolveOptionIds, variantQuestions } from './paper.js';
import { enqueueAttemptExport } from './sheetOutbox.js';

export type AttemptStatus = 'in_progress' | 'submitted' | 'expired' | 'terminated';

export interface AttemptRow {
  id: string;
  token_hash: string;
  candidate_name: string;
  candidate_email: string;
  variant_number: number;
  status: AttemptStatus;
  created_at: number;
  started_at: number;
  deadline_at: number;
  finished_at: number | null;
  last_seen_at: number;
  strikes: number;
  termination_reason: string | null;
}

export class AttemptError extends Error {
  constructor(
    readonly statusCode: number,
    message: string,
    readonly code: string,
  ) {
    super(message);
  }
}

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * How many recently issued papers to steer away from.
 *
 * Ten rather than all fifty: the point is that people sitting down near each
 * other get different papers, not that the rotation is perfect.
 */
const RECENT_PAPERS_TO_AVOID = 10;

/**
 * Variant assignment.
 *
 * This was round-robin over `COUNT(*)`, which is only even while the database
 * survives. On the current hosting it does not: the free plan destroys the
 * container on every deploy AND on every idle spin-down, so the count restarted
 * at zero and the next candidate got paper 1 again. Three testers in a row were
 * handed the identical paper - which is precisely the sharing risk the fifty
 * papers exist to prevent, arriving through the mechanism meant to prevent it.
 *
 * So the choice is random at heart, and the database is used only to make it
 * better when it happens to hold history, never to make it work at all:
 *
 *   - never a paper this candidate has already been given, so a second attempt
 *     cannot be a second run at the same questions;
 *   - never one of the last `RECENT_PAPERS_TO_AVOID` issued to anyone, so two
 *     people starting together do not get the same twenty questions;
 *   - and when those two rules leave nothing to pick from, they are dropped in
 *     that order rather than failing.
 *
 * `Math.random` is right here: nothing about this needs to be unguessable.
 * Knowing which paper you have is worth nothing on its own, because the option
 * ids and the option order are per-attempt (see paper.ts).
 */
function nextVariantNumber(db: Db, candidateEmail: string): number {
  const all = Array.from({ length: VARIANT_COUNT }, (_, i) => i + 1);

  const mine = new Set(
    (
      db
        .prepare('SELECT DISTINCT variant_number AS n FROM attempts WHERE candidate_email = ?')
        .all(candidateEmail) as { n: number }[]
    ).map((row) => row.n),
  );
  const recent = new Set(
    (
      db
        .prepare('SELECT variant_number AS n FROM attempts ORDER BY created_at DESC LIMIT ?')
        .all(RECENT_PAPERS_TO_AVOID) as { n: number }[]
    ).map((row) => row.n),
  );

  const pick = (pool: number[]): number | null =>
    pool.length === 0 ? null : (pool[Math.floor(Math.random() * pool.length)] as number);

  return (
    pick(all.filter((n) => !mine.has(n) && !recent.has(n))) ??
    pick(all.filter((n) => !mine.has(n))) ??
    pick(all) ??
    1
  );
}

export interface StartedAttempt {
  attempt: AttemptRow;
  token: string;
}

export function startAttempt(
  db: Db,
  input: { candidateName: string; candidateEmail: string },
): StartedAttempt {
  const now = Date.now();
  const id = randomUUID();
  const token = randomBytes(32).toString('base64url');
  const variantNumber = nextVariantNumber(db, input.candidateEmail);
  const deadline = now + config.attemptDurationSec * 1000;

  db.prepare(
    `INSERT INTO attempts
       (id, token_hash, candidate_name, candidate_email, variant_number, status,
        created_at, started_at, deadline_at, last_seen_at, strikes)
     VALUES (?, ?, ?, ?, ?, 'in_progress', ?, ?, ?, ?, 0)`,
  ).run(
    id,
    hashToken(token),
    input.candidateName,
    input.candidateEmail,
    variantNumber,
    now,
    now,
    deadline,
    now,
  );

  const attempt = getAttempt(db, id);
  if (!attempt) throw new Error('Attempt insert did not persist');
  return { attempt, token };
}

export function getAttempt(db: Db, id: string): AttemptRow | undefined {
  return db.prepare('SELECT * FROM attempts WHERE id = ?').get(id) as AttemptRow | undefined;
}

/**
 * Loads an attempt and checks the bearer token in one place, so no route can
 * forget to. Also applies the server-side clock: an attempt past its deadline is
 * expired the moment anybody looks at it, regardless of what the client believes.
 */
export function authorizeAttempt(db: Db, id: string, token: string | undefined): AttemptRow {
  const attempt = getAttempt(db, id);
  if (!attempt) throw new AttemptError(404, 'Спробу не знайдено.', 'attempt_not_found');
  if (!token || hashToken(token) !== attempt.token_hash) {
    throw new AttemptError(401, 'Недійсний токен спроби.', 'invalid_token');
  }
  return expireIfDue(db, attempt);
}

export function expireIfDue(db: Db, attempt: AttemptRow): AttemptRow {
  if (attempt.status !== 'in_progress') return attempt;
  if (Date.now() < attempt.deadline_at) return attempt;
  db.prepare("UPDATE attempts SET status = 'expired', finished_at = ? WHERE id = ?").run(
    attempt.deadline_at,
    attempt.id,
  );
  return { ...attempt, status: 'expired', finished_at: attempt.deadline_at };
}

export function requireLive(attempt: AttemptRow): void {
  if (attempt.status === 'in_progress') return;
  const messages: Record<Exclude<AttemptStatus, 'in_progress'>, string> = {
    submitted: 'Цю спробу вже завершено і здано.',
    expired: 'Час на цю спробу вичерпано.',
    terminated: 'Цю спробу завершено за правилами чесності проходження тесту.',
  };
  throw new AttemptError(409, messages[attempt.status], `attempt_${attempt.status}`);
}

export function touch(db: Db, attemptId: string): void {
  db.prepare('UPDATE attempts SET last_seen_at = ? WHERE id = ?').run(Date.now(), attemptId);
}

// --- answers ---------------------------------------------------------------

export function saveAnswer(
  db: Db,
  attempt: AttemptRow,
  questionId: string,
  opaqueOptionIds: readonly string[],
): { savedOptionCount: number } {
  const question = variantQuestions(attempt.variant_number).find((q) => q.id === questionId);
  if (!question) {
    throw new AttemptError(400, 'Це питання не входить до цієї спроби.', 'unknown_question');
  }

  const real = resolveOptionIds(attempt.id, question, opaqueOptionIds);
  db.prepare(
    `INSERT INTO attempt_answers (attempt_id, question_id, selected, answered_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT (attempt_id, question_id)
     DO UPDATE SET selected = excluded.selected, answered_at = excluded.answered_at`,
  ).run(attempt.id, questionId, JSON.stringify(real), Date.now());

  return { savedOptionCount: real.length };
}

export function loadAnswers(db: Db, attemptId: string): AnswerSheet {
  const rows = db
    .prepare('SELECT question_id, selected FROM attempt_answers WHERE attempt_id = ?')
    .all(attemptId) as { question_id: string; selected: string }[];
  const sheet: AnswerSheet = {};
  for (const row of rows) sheet[row.question_id] = JSON.parse(row.selected) as string[];
  return sheet;
}

/**
 * What the client needs to restore its UI after a reload: the opaque ids it was
 * originally given, re-derived from the real ids we stored. Still no key.
 */
export function answeredOptionIds(db: Db, attempt: AttemptRow): Record<string, string[]> {
  const sheet = loadAnswers(db, attempt.id);
  const out: Record<string, string[]> = {};
  for (const q of variantQuestions(attempt.variant_number)) {
    const selected = sheet[q.id];
    if (!selected?.length) continue;
    out[q.id] = selected.map((optionId) => opaqueOptionId(attempt.id, q.id, optionId));
  }
  return out;
}

// --- integrity -------------------------------------------------------------

export function recordIntegrityEvents(
  db: Db,
  attempt: AttemptRow,
  events: readonly IntegrityEvent[],
  serverDerived = false,
): void {
  const insert = db.prepare(
    `INSERT OR IGNORE INTO integrity_events
       (attempt_id, type, occurred_at, received_at, duration_ms, server_derived)
     VALUES (?, ?, ?, ?, ?, ?)`,
  );
  const now = Date.now();
  const tx = db.transaction((batch: readonly IntegrityEvent[]) => {
    for (const e of batch) {
      insert.run(attempt.id, e.type, e.occurredAt, now, e.durationMs ?? null, serverDerived ? 1 : 0);
    }
  });
  tx(events);
}

/**
 * The events that count towards the verdict.
 *
 * Forgiven rows are excluded. They stay in the table for the audit trail, but a
 * reinstated attempt whose log still counted would be terminated again by the
 * very next replay - the undo has to be visible to `evaluateIntegrity`, not
 * just to the status column.
 */
export function loadIntegrityEvents(db: Db, attemptId: string): IntegrityEvent[] {
  const rows = db
    .prepare(
      `SELECT type, occurred_at, duration_ms FROM integrity_events
        WHERE attempt_id = ? AND forgiven = 0 ORDER BY id`,
    )
    .all(attemptId) as { type: string; occurred_at: number; duration_ms: number | null }[];
  return rows.map((r) => ({
    type: r.type as IntegrityEventType,
    occurredAt: r.occurred_at,
    ...(r.duration_ms === null ? {} : { durationMs: r.duration_ms }),
  }));
}

/**
 * Re-evaluates the WHOLE stored event log and applies the verdict.
 *
 * Replaying instead of incrementing is what makes the endpoint idempotent: a
 * retried beacon, a duplicated request or an out-of-order delivery all converge
 * on the same verdict, and the UNIQUE constraint on (attempt, type, occurred_at)
 * absorbs the duplicate itself.
 */
export function applyIntegrityVerdict(db: Db, attempt: AttemptRow) {
  const verdict = evaluateIntegrity(loadIntegrityEvents(db, attempt.id));
  if (verdict.terminate && attempt.status === 'in_progress') {
    db.prepare(
      `UPDATE attempts
          SET status = 'terminated', finished_at = ?, strikes = ?, termination_reason = ?
        WHERE id = ?`,
      // The English side only. This column is the reviewer's record - it is
      // what the spreadsheet export reads - and SQLite cannot hold the pair.
      // The candidate is shown the localised sentence from the verdict itself.
    ).run(Date.now(), verdict.strikes, verdict.reason?.en ?? null, attempt.id);
  } else {
    db.prepare('UPDATE attempts SET strikes = ? WHERE id = ?').run(verdict.strikes, attempt.id);
  }
  return verdict;
}

/**
 * Turns client silence into evidence.
 *
 * A candidate who patches out the visibility listeners still has to keep the
 * heartbeat flowing, and a heartbeat cannot be sent by a tab that has been
 * closed or a laptop that has been put to sleep. Any gap longer than the grace
 * window is recorded as a `heartbeat_gap` event with its measured duration.
 *
 * It is deliberately NOT recorded as `visibility_hidden`. The server cannot
 * tell a closed tab from a dropped connection, a VPN reconnect or a lid that
 * was shut, and `visibility_hidden` carries the ordinary 30-second hard
 * terminate - which meant every gap past the grace window ended the attempt
 * instantly, since the grace window is longer than that threshold. Silence is
 * the one signal the candidate cannot see happening and cannot argue with, so
 * it is scored on its own scale, and under the current policy costs no
 * strikes at all: it is either long enough to be final or it is free.
 */
export function detectHeartbeatGap(db: Db, attempt: AttemptRow): IntegrityEvent | null {
  const gap = Date.now() - attempt.last_seen_at;
  if (gap <= config.heartbeatGraceSec * 1000) return null;
  const event: IntegrityEvent = {
    type: 'heartbeat_gap',
    occurredAt: attempt.last_seen_at,
    durationMs: gap,
  };
  recordIntegrityEvents(db, attempt, [event], true);
  return event;
}

// --- submission ------------------------------------------------------------

export interface ResultQuestion {
  id: string;
  text: LocalizedText;
  yourAnswer: LocalizedText[];
  correct: boolean;
  tier: string;
  competencyId: string;
  source: string;
  /** Present only when the caller is allowed to see the answer key. */
  correctAnswer?: LocalizedText[];
  /** Present only when the caller is allowed to see the answer key. */
  explanation?: LocalizedText;
}

export interface AttemptResult {
  attemptId: string;
  status: AttemptStatus;
  breakdown: ScoreBreakdown;
  questions: ResultQuestion[];
  /** Whether `questions` carries the answer key, so a client can adapt. */
  answersRevealed: boolean;
}

/**
 * Scores an attempt and stores the breakdown.
 *
 * Terminated attempts are never scored. Grading one would put a number produced
 * under disputed conditions into a Performance Review conversation, and it would
 * also tell a candidate how far the answers they did give had got them, which is
 * exactly the feedback a second, cleaner cheating attempt would want.
 */
export function submitAttempt(db: Db, attempt: AttemptRow): AttemptResult {
  if (attempt.status === 'terminated') {
    throw new AttemptError(409, 'Завершену за порушення спробу не оцінюють.', 'attempt_terminated');
  }

  const questions = variantQuestions(attempt.variant_number);
  const breakdown = scoreAttempt(questions, loadAnswers(db, attempt.id));
  const now = Date.now();

  const tx = db.transaction(() => {
    if (attempt.status === 'in_progress') {
      db.prepare("UPDATE attempts SET status = 'submitted', finished_at = ? WHERE id = ?").run(
        now,
        attempt.id,
      );
    }
    db.prepare(
      `INSERT INTO attempt_results (attempt_id, level, correct, total, percent, breakdown, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (attempt_id) DO NOTHING`,
    ).run(
      attempt.id,
      breakdown.level,
      breakdown.correct,
      breakdown.total,
      breakdown.percent,
      JSON.stringify(breakdown),
      now,
    );
  });
  tx();

  const finalStatus: AttemptStatus = attempt.status === 'in_progress' ? 'submitted' : attempt.status;
  const scored = { ...attempt, status: finalStatus };

  // Queue the spreadsheet row. Deliberately after the result is persisted and
  // deliberately not awaited on anything external: the candidate's submission
  // must not be able to fail because Google was slow.
  queueExport(db, scored, breakdown);

  return buildResult(db, scored, { revealAnswers: config.revealAnswersToCandidate });
}

/**
 * Assemble a result. `revealAnswers` decides whether the answer key travels
 * with it, and it is a required argument on purpose: a default would make the
 * safe choice the one you have to remember, and forgetting it here publishes
 * the bank.
 *
 * The per-question `correct` flag stays either way. It is what makes the
 * result useful to the candidate, and it leaks little the per-competency
 * breakdown does not already say - unlike the answer text and the explanation,
 * which are the expensive, reusable part of the bank.
 */
/**
 * Hand a scored attempt to the spreadsheet outbox.
 *
 * Reads the reinstatement flag so the sheet can show that a result came from an
 * overturned termination rather than a clean run - a distinction the roster
 * makes and the sheet must not lose.
 */
function queueExport(db: Db, attempt: AttemptRow, breakdown: ScoreBreakdown): void {
  const reinstated =
    db.prepare('SELECT 1 FROM attempt_reinstatements WHERE attempt_id = ?').get(attempt.id) !==
    undefined;
  enqueueAttemptExport(db, {
    attemptId: attempt.id,
    candidateName: attempt.candidate_name,
    candidateEmail: attempt.candidate_email,
    variantNumber: attempt.variant_number,
    status: attempt.status,
    startedAt: attempt.started_at,
    finishedAt: attempt.finished_at,
    strikes: attempt.strikes,
    terminationReason: attempt.termination_reason,
    reinstated,
    breakdown,
  });
}

export function buildResult(
  db: Db,
  attempt: AttemptRow,
  options: { revealAnswers: boolean },
): AttemptResult {
  const stored = db
    .prepare('SELECT breakdown FROM attempt_results WHERE attempt_id = ?')
    .get(attempt.id) as { breakdown: string } | undefined;
  if (!stored) throw new AttemptError(404, 'Для цієї спроби ще немає результату.', 'no_result');

  const breakdown = JSON.parse(stored.breakdown) as ScoreBreakdown;
  const answers = loadAnswers(db, attempt.id);
  const questions = variantQuestions(attempt.variant_number).map((q) => {
    const selected = answers[q.id] ?? [];
    const textOf = (ids: readonly string[]): LocalizedText[] =>
      ids.map((id) => q.options.find((o) => o.id === id)?.text ?? { en: id, uk: id });
    const correct =
      selected.length === q.correctOptionIds.length &&
      selected.every((id) => q.correctOptionIds.includes(id));
    const shown: ResultQuestion = {
      id: q.id,
      text: q.text,
      yourAnswer: textOf(selected),
      correct,
      tier: q.tier,
      competencyId: q.competencyId,
      source: q.source,
    };
    if (options.revealAnswers) {
      shown.correctAnswer = textOf(q.correctOptionIds);
      shown.explanation = q.explanation;
    }
    return shown;
  });

  return {
    attemptId: attempt.id,
    status: attempt.status,
    breakdown,
    questions,
    answersRevealed: options.revealAnswers,
  };
}

// --- reinstatement ---------------------------------------------------------

export interface Reinstatement {
  attemptId: string;
  /** The reviewer's stated reason, kept verbatim. */
  note: string;
  previousReason: string | null;
  previousStrikes: number;
  /** Events moved out of the verdict. Still readable in the integrity log. */
  forgivenEvents: number;
  reinstatedAt: number;
  /** How much of the paper the candidate actually got to answer. */
  answeredQuestions: number;
  totalQuestions: number;
}

export function loadReinstatement(db: Db, attemptId: string): Reinstatement | null {
  const row = db
    .prepare('SELECT * FROM attempt_reinstatements WHERE attempt_id = ?')
    .get(attemptId) as
    | {
        attempt_id: string;
        note: string;
        previous_reason: string | null;
        previous_strikes: number;
        forgiven_events: number;
        reinstated_at: number;
      }
    | undefined;
  if (!row) return null;
  return {
    attemptId: row.attempt_id,
    note: row.note,
    previousReason: row.previous_reason,
    previousStrikes: row.previous_strikes,
    forgivenEvents: row.forgiven_events,
    reinstatedAt: row.reinstated_at,
    answeredQuestions: Object.keys(loadAnswers(db, attemptId)).length,
    totalQuestions: QUESTIONS_PER_VARIANT,
  };
}

/**
 * Overturn a termination and score what the candidate had answered.
 *
 * The proctor can be wrong, and until now being wrong was final: a terminated
 * attempt is never scored, the answers sat in `attempt_answers` unreachable by
 * any endpoint, and the only remedy was editing SQLite by hand inside the
 * container.
 *
 * Undoing the status alone would not work. `applyIntegrityVerdict` replays the
 * whole stored log on every report, so the next heartbeat would terminate the
 * attempt again on the same events. The events therefore have to be forgiven -
 * marked so the verdict ignores them, while the rows stay for the audit trail.
 *
 * What this recovers is the RESULT, not the remaining time. The candidate's
 * browser discarded its session when it was told the attempt was over, so there
 * is no live test to resume; if they should get a full run, start a fresh
 * attempt instead. That is also why the answered count is returned: scoring a
 * paper abandoned at question five yields a rung that means nothing, and the
 * reviewer has to be able to see that rather than read the level and trust it.
 */
export function reinstateAttempt(
  db: Db,
  attempt: AttemptRow,
  note: string,
): { reinstated: Reinstatement; result: AttemptResult } {
  if (attempt.status !== 'terminated') {
    throw new AttemptError(
      409,
      'Скасовувати нічого: цю спробу не було завершено за правилами чесності.',
      'attempt_not_terminated',
    );
  }

  const now = Date.now();
  const previousReason = attempt.termination_reason;
  const previousStrikes = attempt.strikes;

  const forgive = db.transaction(() => {
    const forgiven = db
      .prepare('UPDATE integrity_events SET forgiven = 1 WHERE attempt_id = ? AND forgiven = 0')
      .run(attempt.id).changes;
    db.prepare(
      `UPDATE attempts
          SET status = 'in_progress', strikes = 0, termination_reason = NULL, finished_at = NULL
        WHERE id = ?`,
    ).run(attempt.id);
    db.prepare(
      `INSERT INTO attempt_reinstatements
         (attempt_id, note, previous_reason, previous_strikes, forgiven_events, reinstated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    ).run(attempt.id, note, previousReason, previousStrikes, forgiven, now);
    return forgiven;
  });
  forgive();

  // Re-read rather than patching the caller's copy: the row is the source of
  // truth for the submit that follows, and submitAttempt refuses a terminated
  // status - which is exactly what the transaction above has just cleared.
  const restored = getAttempt(db, attempt.id);
  if (!restored) throw new AttemptError(404, 'Спроба зникла під час скасування.', 'attempt_missing');
  submitAttempt(db, restored);

  const scored = getAttempt(db, attempt.id);
  if (!scored) throw new AttemptError(404, 'Спроба зникла під час скасування.', 'attempt_missing');
  const reinstated = loadReinstatement(db, attempt.id);
  if (!reinstated) throw new AttemptError(500, 'Не вдалося зафіксувати скасування.', 'reinstate_failed');

  return { reinstated, result: buildResult(db, scored, { revealAnswers: true }) };
}

export const attemptMeta = {
  questionsPerVariant: QUESTIONS_PER_VARIANT,
  variantCount: VARIANT_COUNT,
  policy: DEFAULT_INTEGRITY_POLICY,
} as const;
