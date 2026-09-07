import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { INTEGRITY_EVENT_TYPES, LEVEL_LABELS } from '@qasc/core';
import { QUESTION_BANK, VARIANTS, bankStats } from '@qasc/content';
import { AuthError } from './auth.js';
import { currentSession, requireCandidate } from './authRoutes.js';
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
import { exportStats, flushExports, pendingExports } from './sheetOutbox.js';

const reinstateBody = z.object({
  /**
   * Required, and not a free pass: overturning a termination is a judgement a
   * reviewer has to own in writing, because the roster will show this attempt
   * next to clean ones.
   */
  note: z.string().trim().min(3).max(500),
});

/**
 * In 'google' mode the identity is never taken from the body - it comes from
 * the verified session, so the only thing the caller still supplies is the
 * acknowledgement. In 'open' mode the old unverified fields are required.
 */
const startBody =
  config.authMode === 'google'
    ? z.object({ acceptedRules: z.literal(true) })
    : z.object({
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

interface ClientError {
  status: number;
  code: string;
  message: string;
}

/**
 * Recognise a rejection that blames the request rather than the server.
 *
 * Fastify's own errors - an empty body under a JSON content-type, an
 * unparseable payload, a content-type nothing can parse - carry their own 4xx
 * `statusCode`. The error reaching a Fastify error handler is typed `unknown`,
 * so the shape is checked rather than asserted.
 *
 * Strictly 4xx. A 5xx must not be passed through: an internal failure's own
 * wording is not something to hand to a client.
 */
function asClientError(error: unknown): ClientError | null {
  if (typeof error !== 'object' || error === null) return null;
  const shape = error as { statusCode?: unknown; code?: unknown; message?: unknown };
  if (typeof shape.statusCode !== 'number') return null;
  if (shape.statusCode < 400 || shape.statusCode >= 500) return null;
  return {
    status: shape.statusCode,
    code: typeof shape.code === 'string' ? shape.code : 'unknown',
    message: typeof shape.message === 'string' ? shape.message : 'Некоректний запит.',
  };
}

export function registerRoutes(app: FastifyInstance, db: Db): void {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AttemptError || error instanceof AuthError) {
      return reply.code(error.statusCode).send({ error: error.code, message: error.message });
    }
    if (error instanceof z.ZodError) {
      return reply.code(400).send({ error: 'invalid_request', issues: error.issues });
    }

    // Collapsing a framework rejection into 500 told the caller the server had
    // broken when in fact their request had, and logged someone else's mistake
    // at error level - during a pilot that is the difference between a quiet
    // log and one that reads like an outage.
    const client = asClientError(error);
    if (client) {
      request.log.warn({ code: client.code }, `malformed request rejected: ${client.message}`);
      return reply.code(client.status).send({ error: 'invalid_request', message: client.message });
    }

    app.log.error(error);
    return reply.code(500).send({ error: 'internal_error', message: 'Непередбачена помилка сервера.' });
  });

  // --- metadata ------------------------------------------------------------

  /**
   * Liveness. Reports THAT the bank loaded, not how big it is: this endpoint
   * needs no session either, so printing the counts here would have handed
   * back the two numbers `/api/meta` just stopped publishing and made that
   * change cosmetic. Both healthchecks that call this - the Dockerfile's and
   * compose's - only read the status code.
   */
  app.get('/api/health', () => ({
    ok: true,
    bankLoaded: QUESTION_BANK.length > 0 && VARIANTS.length > 0,
  }));

  /**
   * Everything the start screen needs to explain the test before it begins -
   * and deliberately nothing more. This endpoint needs no session, so whatever
   * it returns is public.
   *
   * What it used to return and no longer does:
   *   - `ladder`: all nine rungs with their exact thresholds AND the sheet's
   *     own wording for each. That is the client's Performance Review criteria,
   *     published to anyone who can reach the URL, and a map for gaming the
   *     next attempt.
   *   - `bank`: the bank size broken down by tier and by syllabus. The start
   *     screen stopped displaying it because candidates should not be told what
   *     to revise; leaving it here left the same answer one request away.
   *   - `variantCount`: how many papers exist.
   *
   * The reviewer still gets the bank statistics from the admin endpoint, which
   * is behind `QASC_ADMIN_TOKEN`.
   */
  app.get('/api/meta', () => ({
    questionsPerTest: attemptMeta.questionsPerVariant,
    durationSeconds: config.attemptDurationSec,
    heartbeatSeconds: config.heartbeatIntervalSec,
    auth: {
      mode: config.authMode,
      /** Present so the sign-in screen can name the domains it will accept. */
      allowedEmailDomains: config.allowedEmailDomains,
    },
    integrity: {
      strikesAllowed: attemptMeta.policy.terminateAtStrikes,
      graceMs: attemptMeta.policy.graceMs,
      hardTerminateMs: attemptMeta.policy.hardTerminateMs,
    },
    /** The rung names, so the result can print one. Names, not thresholds. */
    levelLabels: LEVEL_LABELS,
  }));

  // --- attempt lifecycle ---------------------------------------------------

  app.post('/api/attempts', async (request, reply) => {
    const body = startBody.parse(request.body) as {
      candidateName?: string;
      candidateEmail?: string;
    };
    const identity =
      config.authMode === 'google'
        ? requireCandidate(request)
        : { name: body.candidateName as string, email: body.candidateEmail as string };
    const { attempt, token } = startAttempt(db, {
      candidateName: identity.name,
      candidateEmail: identity.email,
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
        // Read by machines and by the reviewer, never rendered to a candidate:
        // the client recognises the `attempt_terminated` code and shows its own
        // localised sentence instead of this one.
        attempt.termination_reason ?? 'This attempt was ended under the test integrity rules.',
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

  /**
   * Whether results are reaching the spreadsheet.
   *
   * Worth having as an endpoint rather than a log line: the export is the only
   * part of the system whose failure is invisible from the outside - every
   * attempt looks fine, and the sheet just quietly stops growing.
   */
  app.get('/api/admin/sheet-exports', { preHandler: guard }, async () => ({
    configured: config.sheetExportConfigured,
    sheetId: config.sheetId,
    tab: config.sheetTab,
    stats: exportStats(db),
    pending: pendingExports(db, 50),
  }));

  /** Drain the queue now, instead of waiting for the next tick. */
  app.post('/api/admin/sheet-exports/flush', { preHandler: guard }, async () =>
    flushExports(db),
  );

  app.get('/api/admin/bank', { preHandler: guard }, async () => ({
    stats: bankStats(),
    variants: VARIANTS.map((v) => ({ number: v.number, questionIds: v.questionIds })),
  }));
}
