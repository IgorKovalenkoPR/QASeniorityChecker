import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { INTEGRITY_EVENT_TYPES, LEVEL_LABELS, LEVEL_RULES } from '@qasc/core';
import { QUESTION_BANK, VARIANTS, bankStats } from '@qasc/content';
import { config } from './config.js';
import type { Db } from './db.js';
import {
  AttemptError,
  applyIntegrityVerdict,
  answeredOptionIds,
  attemptMeta,
  authorizeAttempt,
  buildResult,
  detectHeartbeatGap,
  getAttempt,
  loadReinstatement,
  recordIntegrityEvents,
  reinstateAttempt,
  requireLive,
  saveAnswer,
  startAttempt,
  submitAttempt,
  touch,
} from './attempts.js';
import type { AttemptRow } from './attempts.js';
import { buildPaper } from './paper.js';

const reinstateBody = z.object({
  /**
   * Required, and not a free pass: overturning a termination is a judgement a
   * reviewer has to own in writing, because the roster will show this attempt
   * next to clean ones.
   */
  note: z.string().trim().min(3).max(500),
});

const startBody = z.object({
  candidateName: z.string().trim().min(2).max(120),
  candidateEmail: z.string().trim().email().max(200),
  /** The candidate must acknowledge the integrity rules before the timer starts. */
  acceptedRules: z.literal(true),
});

const answerBody = z.object({
  questionId: z.string().min(1).max(64),
  optionIds: z.array(z.string().regex(/^[0-9a-f]{16}$/)).max(6),
});

const integrityBody = z.object({
  events: z
    .array(
      z.object({
        type: z.enum(INTEGRITY_EVENT_TYPES),
        occurredAt: z.number().int().positive(),
        durationMs: z.number().int().min(0).max(24 * 60 * 60 * 1000).optional(),
      }),
    )
    .min(1)
    .max(50),
});

function bearer(request: FastifyRequest): string | undefined {
  const header = request.headers.authorization;
  if (!header?.startsWith('Bearer ')) return undefined;
  return header.slice('Bearer '.length).trim();
}

/**
 * navigator.sendBeacon cannot set headers, so the pagehide report - the one that
 * proves a candidate closed the tab - has to carry its token in the query
 * string. Accepted only on the integrity endpoint: that request can create no
 * data and read none, so the worst a leaked URL allows is filing an integrity
 * event against an attempt that is already being terminated.
 */
function attemptToken(request: FastifyRequest): string | undefined {
  const header = bearer(request);
  if (header) return header;
  const query = request.query as { token?: unknown } | undefined;
  return typeof query?.token === 'string' ? query.token : undefined;
}

/** Public view of an attempt. Deliberately excludes token_hash and the answers. */
function attemptView(attempt: AttemptRow) {
  return {
    id: attempt.id,
    status: attempt.status,
    variantNumber: attempt.variant_number,
    candidateName: attempt.candidate_name,
    startedAt: attempt.started_at,
    deadlineAt: attempt.deadline_at,
    /** Authoritative: the browser clock is never trusted for the countdown. */
    serverNow: Date.now(),
    secondsRemaining: Math.max(0, Math.round((attempt.deadline_at - Date.now()) / 1000)),
    strikes: attempt.strikes,
    strikesAllowed: attemptMeta.policy.terminateAtStrikes,
    terminationReason: attempt.termination_reason,
  };
}

export function registerRoutes(app: FastifyInstance, db: Db): void {
  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof AttemptError) {
      return reply.code(error.statusCode).send({ error: error.code, message: error.message });
    }
    if (error instanceof z.ZodError) {
      return reply.code(400).send({ error: 'invalid_request', issues: error.issues });
    }
    app.log.error(error);
    return reply.code(500).send({ error: 'internal_error', message: 'Непередбачена помилка сервера.' });
  });

  // --- metadata ------------------------------------------------------------

  app.get('/api/health', () => ({ ok: true, questions: QUESTION_BANK.length, variants: VARIANTS.length }));

  /** Everything the start screen needs to explain the test before it begins. */
  app.get('/api/meta', () => ({
    questionsPerTest: attemptMeta.questionsPerVariant,
    variantCount: attemptMeta.variantCount,
    durationSeconds: config.attemptDurationSec,
    heartbeatSeconds: config.heartbeatIntervalSec,
    bank: bankStats(),
    integrity: {
      strikesAllowed: attemptMeta.policy.terminateAtStrikes,
      graceMs: attemptMeta.policy.graceMs,
      hardTerminateMs: attemptMeta.policy.hardTerminateMs,
    },
    ladder: LEVEL_RULES.map((rule) => ({
      level: rule.level,
      label: rule.label,
      requires: rule.requires,
      rationale: rule.rationale,
    })),
    levelLabels: LEVEL_LABELS,
  }));

  // --- attempt lifecycle ---------------------------------------------------

  app.post('/api/attempts', async (request, reply) => {
    const body = startBody.parse(request.body);
    const { attempt, token } = startAttempt(db, {
      candidateName: body.candidateName,
      candidateEmail: body.candidateEmail,
    });
    return reply.code(201).send({
      token,
      attempt: attemptView(attempt),
      questions: buildPaper(attempt.id, attempt.variant_number),
    });
  });

  /**
   * Resume. Returns the paper plus the answers already saved, so a reload - or a
   * dropped connection - does not cost the candidate their work. The reload
   * itself is not forgiven silently: the client reports the navigation event, and
   * the heartbeat gap is measured here regardless.
   */
  app.get('/api/attempts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    let attempt = authorizeAttempt(db, id, bearer(request));

    if (attempt.status === 'in_progress') {
      const gap = detectHeartbeatGap(db, attempt);
      if (gap) {
        applyIntegrityVerdict(db, attempt);
        attempt = authorizeAttempt(db, id, bearer(request));
      }
      touch(db, attempt.id);
    }

    return reply.send({
      attempt: attemptView(attempt),
      questions: attempt.status === 'in_progress' ? buildPaper(attempt.id, attempt.variant_number) : [],
      answers: answeredOptionIds(db, attempt),
    });
  });

  app.put('/api/attempts/:id/answers', async (request, reply) => {
    const { id } = request.params as { id: string };
    const attempt = authorizeAttempt(db, id, bearer(request));
    requireLive(attempt);
    const body = answerBody.parse(request.body);
    const { savedOptionCount } = saveAnswer(db, attempt, body.questionId, body.optionIds);
    touch(db, attempt.id);
    // Echoes the count only. Confirming WHICH options were understood would let a
    // client probe the option space one id at a time.
    return reply.send({ ok: true, savedOptionCount, secondsRemaining: attemptView(attempt).secondsRemaining });
  });

  /**
   * Integrity channel. Called by the client on every suspicious event, and via
   * navigator.sendBeacon on pagehide so the last one survives the tab closing.
   */
  app.post('/api/attempts/:id/integrity', async (request, reply) => {
    const { id } = request.params as { id: string };
    const token = attemptToken(request);
    const attempt = authorizeAttempt(db, id, token);
    const body = integrityBody.parse(request.body);
    recordIntegrityEvents(db, attempt, body.events);
    const verdict = applyIntegrityVerdict(db, attempt);
    const updated = authorizeAttempt(db, id, token);
    return reply.send({ verdict, attempt: attemptView(updated) });
  });

  /** Liveness ping. Silence longer than the grace window becomes an event. */
  app.post('/api/attempts/:id/heartbeat', async (request, reply) => {
    const { id } = request.params as { id: string };
    let attempt = authorizeAttempt(db, id, bearer(request));
    if (attempt.status === 'in_progress') {
      const gap = detectHeartbeatGap(db, attempt);
      if (gap) {
        applyIntegrityVerdict(db, attempt);
        attempt = authorizeAttempt(db, id, bearer(request));
      }
      touch(db, attempt.id);
    }
    return reply.send({ attempt: attemptView(attempt) });
  });

  app.post('/api/attempts/:id/submit', async (request, reply) => {
    const { id } = request.params as { id: string };
    const attempt = authorizeAttempt(db, id, bearer(request));
    if (attempt.status === 'submitted') {
      return reply.send(
        buildResult(db, attempt, { revealAnswers: config.revealAnswersToCandidate }),
      );
    }
    return reply.send(submitAttempt(db, attempt));
  });

  app.get('/api/attempts/:id/result', async (request, reply) => {
    const { id } = request.params as { id: string };
    const attempt = authorizeAttempt(db, id, bearer(request));
    if (attempt.status === 'terminated') {
      throw new AttemptError(
        409,
        attempt.termination_reason ?? 'Цю спробу завершено за правилами чесності проходження тесту.',
        'attempt_terminated',
      );
    }
    return reply.send(
      buildResult(db, attempt, { revealAnswers: config.revealAnswersToCandidate }),
    );
  });
}

/**
 * Reviewer-facing endpoints. Guarded by a shared token rather than a full user
 * model: this is an internal tool used by a handful of people, and inventing an
 * auth system it does not need would be the larger risk.
 */
export function registerAdminRoutes(app: FastifyInstance, db: Db): void {
  const adminToken = process.env.QASC_ADMIN_TOKEN;

  const guard = async (request: FastifyRequest, reply: FastifyReply) => {
    if (!adminToken) {
      return reply.code(503).send({ error: 'admin_disabled', message: 'QASC_ADMIN_TOKEN is not configured.' });
    }
    if (bearer(request) !== adminToken) {
      return reply.code(401).send({ error: 'unauthorized' });
    }
    return undefined;
  };

  app.get('/api/admin/attempts', { preHandler: guard }, async (request) => {
    const query = z
      .object({ limit: z.coerce.number().int().min(1).max(200).default(50) })
      .parse(request.query);
    const rows = db
      .prepare(
        `SELECT a.id, a.candidate_name, a.candidate_email, a.variant_number, a.status,
                a.started_at, a.finished_at, a.strikes, a.termination_reason,
                r.level, r.correct, r.total, r.percent,
                -- A reinstated attempt is not a clean run and must not read as
                -- one in the roster.
                CASE WHEN ri.attempt_id IS NULL THEN 0 ELSE 1 END AS reinstated,
                ri.note AS reinstatement_note
           FROM attempts a
           LEFT JOIN attempt_results r ON r.attempt_id = a.id
           LEFT JOIN attempt_reinstatements ri ON ri.attempt_id = a.id
          ORDER BY a.created_at DESC
          LIMIT ?`,
      )
      .all(query.limit);
    return { attempts: rows };
  });

  app.get('/api/admin/attempts/:id/integrity', { preHandler: guard }, async (request) => {
    const { id } = request.params as { id: string };
    // Forgiven events are included on purpose: this is the audit view, and the
    // point of forgiving rather than deleting is that the record survives.
    const events = db
      .prepare('SELECT * FROM integrity_events WHERE attempt_id = ? ORDER BY id')
      .all(id);
    return { events, reinstatement: loadReinstatement(db, id) };
  });

  /**
   * Overturn a false termination and score what the candidate answered.
   *
   * The proctor can be wrong. Before this existed, being wrong was final: the
   * answers survived in the database but no endpoint could reach them, so the
   * remedy was a hand-edit of SQLite inside the container.
   */
  app.post('/api/admin/attempts/:id/reinstate', { preHandler: guard }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = reinstateBody.parse(request.body);
    const attempt = getAttempt(db, id);
    if (!attempt) {
      return reply.code(404).send({ error: 'not_found', message: 'Такої спроби немає.' });
    }
    return reply.send(reinstateAttempt(db, attempt, body.note));
  });

  /**
   * The reviewer's view of a finished attempt: which questions it got wrong,
   * what the right answers were, and why. This is where the answer key lives
   * once QASC_REVEAL_ANSWERS_TO_CANDIDATE is off, and it is also the only way
   * to see the detail of an attempt at all - the candidate's own token is
   * stored hashed, so it cannot be replayed after the fact.
   */
  app.get('/api/admin/attempts/:id/result', { preHandler: guard }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const attempt = getAttempt(db, id);
    if (!attempt) {
      return reply.code(404).send({ error: 'not_found', message: 'Такої спроби немає.' });
    }
    return reply.send(buildResult(db, attempt, { revealAnswers: true }));
  });

  app.get('/api/admin/bank', { preHandler: guard }, async () => ({
    stats: bankStats(),
    variants: VARIANTS.map((v) => ({ number: v.number, questionIds: v.questionIds })),
  }));
}
