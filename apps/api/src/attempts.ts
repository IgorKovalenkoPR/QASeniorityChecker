import { createHash, randomBytes, randomUUID } from 'node:crypto';
import type { AnswerSheet, IntegrityEvent, IntegrityEventType, ScoreBreakdown } from '@qasc/core';
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

/** Variant assignment. Round-robin over the 50 papers keeps usage even. */
function nextVariantNumber(db: Db): number {
  const row = db.prepare('SELECT COUNT(*) AS n FROM attempts').get() as { n: number };
  return (row.n % VARIANT_COUNT) + 1;
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
  const variantNumber = nextVariantNumber(db);
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
  if (!attempt) throw new AttemptError(404, 'Attempt not found', 'attempt_not_found');
  if (!token || hashToken(token) !== attempt.token_hash) {
    throw new AttemptError(401, 'Invalid attempt token', 'invalid_token');
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
    submitted: 'This attempt has already been submitted.',
    expired: 'The time limit for this attempt has passed.',
    terminated: 'This attempt was ended by the exam integrity rules.',
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
    throw new AttemptError(400, 'Question is not part of this attempt', 'unknown_question');
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

export function loadIntegrityEvents(db: Db, attemptId: string): IntegrityEvent[] {
  const rows = db
    .prepare(
      'SELECT type, occurred_at, duration_ms FROM integrity_events WHERE attempt_id = ? ORDER BY id',
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
    ).run(Date.now(), verdict.strikes, verdict.reason, attempt.id);
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
 * window is recorded as a `visibility_hidden` event with its measured duration,
 * which then feeds the ordinary strike rules.
 */
export function detectHeartbeatGap(db: Db, attempt: AttemptRow): IntegrityEvent | null {
  const gap = Date.now() - attempt.last_seen_at;
  if (gap <= config.heartbeatGraceSec * 1000) return null;
  const event: IntegrityEvent = {
    type: 'visibility_hidden',
    occurredAt: attempt.last_seen_at,
    durationMs: gap,
  };
  recordIntegrityEvents(db, attempt, [event], true);
  return event;
}

// --- submission ------------------------------------------------------------

export interface ResultQuestion {
  id: string;
  text: string;
  yourAnswer: string[];
  correctAnswer: string[];
  correct: boolean;
  explanation: string;
  tier: string;
  competencyId: string;
  source: string;
}

export interface AttemptResult {
  attemptId: string;
  status: AttemptStatus;
  breakdown: ScoreBreakdown;
  questions: ResultQuestion[];
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
    throw new AttemptError(409, 'A terminated attempt cannot be scored.', 'attempt_terminated');
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
  return buildResult(db, { ...attempt, status: finalStatus });
}

export function buildResult(db: Db, attempt: AttemptRow): AttemptResult {
  const stored = db
    .prepare('SELECT breakdown FROM attempt_results WHERE attempt_id = ?')
    .get(attempt.id) as { breakdown: string } | undefined;
  if (!stored) throw new AttemptError(404, 'This attempt has no result yet.', 'no_result');

  const breakdown = JSON.parse(stored.breakdown) as ScoreBreakdown;
  const answers = loadAnswers(db, attempt.id);
  const questions = variantQuestions(attempt.variant_number).map((q) => {
    const selected = answers[q.id] ?? [];
    const textOf = (ids: readonly string[]) =>
      ids.map((id) => q.options.find((o) => o.id === id)?.text ?? id);
    const correct =
      selected.length === q.correctOptionIds.length &&
      selected.every((id) => q.correctOptionIds.includes(id));
    return {
      id: q.id,
      text: q.text,
      yourAnswer: textOf(selected),
      correctAnswer: textOf(q.correctOptionIds),
      correct,
      explanation: q.explanation,
      tier: q.tier,
      competencyId: q.competencyId,
      source: q.source,
    } satisfies ResultQuestion;
  });

  return { attemptId: attempt.id, status: attempt.status, breakdown, questions };
}

export const attemptMeta = {
  questionsPerVariant: QUESTIONS_PER_VARIANT,
  variantCount: VARIANT_COUNT,
  policy: DEFAULT_INTEGRITY_POLICY,
} as const;
