import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { QUESTION_BY_ID, VARIANT_BY_NUMBER } from '@qasc/content';
import type { Db } from '../src/db.js';
import { buildTestApp } from '../src/server.js';

let app: FastifyInstance;
let db: Db;

beforeEach(() => {
  process.env.NODE_ENV = 'test';
  ({ app, db } = buildTestApp());
});

afterEach(async () => {
  await app.close();
  db.close();
});

async function startAttempt(name = 'Anna Tester', email = 'anna@example.com') {
  const response = await app.inject({
    method: 'POST',
    url: '/api/attempts',
    payload: { candidateName: name, candidateEmail: email, acceptedRules: true },
  });
  expect(response.statusCode).toBe(201);
  const body = response.json();
  return { ...body, auth: { authorization: `Bearer ${body.token}` } };
}

describe('starting an attempt', () => {
  it('assigns a variant and returns exactly 20 questions', async () => {
    const { attempt, questions } = await startAttempt();
    expect(attempt.variantNumber).toBeGreaterThanOrEqual(1);
    expect(attempt.variantNumber).toBeLessThanOrEqual(50);
    expect(questions).toHaveLength(20);
  });

  it('rejects a start without acknowledging the integrity rules', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/attempts',
      payload: { candidateName: 'Anna Tester', candidateEmail: 'anna@example.com' },
    });
    expect(response.statusCode).toBe(400);
  });

  it('rejects an invalid email', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/attempts',
      payload: { candidateName: 'Anna Tester', candidateEmail: 'not-an-email', acceptedRules: true },
    });
    expect(response.statusCode).toBe(400);
  });

  it('spreads consecutive candidates across different variants', async () => {
    const first = await startAttempt('One Tester', 'one@example.com');
    const second = await startAttempt('Two Tester', 'two@example.com');
    expect(second.attempt.variantNumber).not.toBe(first.attempt.variantNumber);
  });
});

describe('answer key containment', () => {
  it('never sends the answer key or the explanation with the paper', async () => {
    const started = await startAttempt();
    const raw = JSON.stringify(started);
    expect(raw).not.toContain('correctOptionIds');
    expect(raw).not.toContain('explanation');
  });

  it('sends option ids that are unique to the attempt', async () => {
    const a = await startAttempt('A Tester', 'a@example.com');
    const b = await startAttempt('B Tester', 'b@example.com');
    const idsA = new Set(a.questions.flatMap((q: any) => q.options.map((o: any) => o.id)));
    const idsB = b.questions.flatMap((q: any) => q.options.map((o: any) => o.id));
    // Even where the two papers share a question, the option ids must not match:
    // that is what makes a published answer worthless to the next candidate.
    expect(idsB.some((id: string) => idsA.has(id))).toBe(false);
  });

  it('ignores option ids that were not issued for this attempt', async () => {
    const started = await startAttempt();
    const question = started.questions[0];
    const response = await app.inject({
      method: 'PUT',
      url: `/api/attempts/${started.attempt.id}/answers`,
      headers: started.auth,
      payload: { questionId: question.id, optionIds: ['0'.repeat(16)] },
    });
    expect(response.statusCode).toBe(200);
    // Accepted syntactically, resolved to nothing: no way to probe the id space.
    expect(response.json().savedOptionCount).toBe(0);
  });

  it('rejects a question that is not part of the attempt', async () => {
    const started = await startAttempt();
    const paperIds = new Set(started.questions.map((q: any) => q.id));
    const outsider = [...QUESTION_BY_ID.keys()].find((id) => !paperIds.has(id));
    const response = await app.inject({
      method: 'PUT',
      url: `/api/attempts/${started.attempt.id}/answers`,
      headers: started.auth,
      payload: { questionId: outsider, optionIds: [] },
    });
    expect(response.statusCode).toBe(400);
    expect(response.json().error).toBe('unknown_question');
  });
});

describe('authorization', () => {
  it('rejects a wrong token', async () => {
    const started = await startAttempt();
    const response = await app.inject({
      method: 'GET',
      url: `/api/attempts/${started.attempt.id}`,
      headers: { authorization: 'Bearer definitely-not-the-token' },
    });
    expect(response.statusCode).toBe(401);
  });

  it('rejects a missing token', async () => {
    const started = await startAttempt();
    const response = await app.inject({ method: 'GET', url: `/api/attempts/${started.attempt.id}` });
    expect(response.statusCode).toBe(401);
  });

  it('returns 404 for an unknown attempt', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/attempts/00000000-0000-0000-0000-000000000000',
      headers: { authorization: 'Bearer anything' },
    });
    expect(response.statusCode).toBe(404);
  });
});

describe('taking the test', () => {
  /** Answers the whole paper correctly by reading the key out of the bank. */
  async function answerAll(started: any, howMany = 20) {
    const variant = VARIANT_BY_NUMBER.get(started.attempt.variantNumber)!;
    let answered = 0;
    for (const questionId of variant.questionIds) {
      if (answered >= howMany) break;
      const source = QUESTION_BY_ID.get(questionId)!;
      const paperQuestion = started.questions.find((q: any) => q.id === questionId);
      // Match by option TEXT, since the ids are opaque and reshuffled per attempt.
      const optionIds = source.correctOptionIds.map((correctId) => {
        const text = source.options.find((o) => o.id === correctId)!.text;
        return paperQuestion.options.find((o: any) => o.text === text).id;
      });
      const response = await app.inject({
        method: 'PUT',
        url: `/api/attempts/${started.attempt.id}/answers`,
        headers: started.auth,
        payload: { questionId, optionIds },
      });
      expect(response.statusCode).toBe(200);
      answered += 1;
    }
  }

  it('scores a perfect paper as Senior', async () => {
    const started = await startAttempt();
    await answerAll(started);
    const response = await app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/submit`,
      headers: started.auth,
    });
    expect(response.statusCode).toBe(200);
    const result = response.json();
    expect(result.breakdown.correct).toBe(20);
    expect(result.breakdown.level).toBe('senior');
  });

  it('scores an untouched paper at the floor of the ladder', async () => {
    const started = await startAttempt();
    const response = await app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/submit`,
      headers: started.auth,
    });
    expect(response.json().breakdown.level).toBe('trainee_minus');
  });

  it('withholds the key and the explanations from the candidate by default', async () => {
    // The bank is the expensive asset here: 504 written questions. With the
    // review switched on, anyone holding the link could start an attempt,
    // submit it untouched, read twenty correct answers, and start again - the
    // variant round-robin hands out a fresh paper every time. So the candidate
    // keeps their score and which questions they missed, never the answers.
    const started = await startAttempt();
    await answerAll(started, 5);
    const submitted = await app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/submit`,
      headers: started.auth,
    });
    const body = submitted.json();
    expect(body.answersRevealed).toBe(false);
    expect(body.questions[0]).not.toHaveProperty('correctAnswer');
    expect(body.questions[0]).not.toHaveProperty('explanation');
    // What the candidate does keep: their own answer and whether it counted.
    expect(body.questions[0]).toHaveProperty('correct');
    expect(body.questions[0]).toHaveProperty('yourAnswer');
    expect(body.breakdown).toBeDefined();
  });

  it('never ships the key on the result endpoint either', async () => {
    const started = await startAttempt();
    await answerAll(started, 5);
    await app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/submit`,
      headers: started.auth,
    });
    const result = await app.inject({
      method: 'GET',
      url: `/api/attempts/${started.attempt.id}/result`,
      headers: started.auth,
    });
    expect(result.json().answersRevealed).toBe(false);
    // Checked against the raw payload, not the parsed object: the guarantee is
    // about what crosses the wire.
    expect(result.payload).not.toContain('correctAnswer');
    expect(result.payload).not.toContain('explanation');
  });

  it('restores saved answers on resume', async () => {
    const started = await startAttempt();
    await answerAll(started, 3);
    const resumed = await app.inject({
      method: 'GET',
      url: `/api/attempts/${started.attempt.id}`,
      headers: started.auth,
    });
    expect(Object.keys(resumed.json().answers)).toHaveLength(3);
    expect(JSON.stringify(resumed.json())).not.toContain('correctOptionIds');
  });

  it('is idempotent on repeated submits', async () => {
    const started = await startAttempt();
    await answerAll(started, 10);
    const first = await app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/submit`,
      headers: started.auth,
    });
    const second = await app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/submit`,
      headers: started.auth,
    });
    expect(second.statusCode).toBe(200);
    expect(second.json().breakdown).toEqual(first.json().breakdown);
  });

  it('refuses to save an answer after submission', async () => {
    const started = await startAttempt();
    await app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/submit`,
      headers: started.auth,
    });
    const response = await app.inject({
      method: 'PUT',
      url: `/api/attempts/${started.attempt.id}/answers`,
      headers: started.auth,
      payload: { questionId: started.questions[0].id, optionIds: [] },
    });
    expect(response.statusCode).toBe(409);
    expect(response.json().error).toBe('attempt_submitted');
  });
});

describe('exam integrity', () => {
  async function report(started: any, events: unknown[]) {
    return app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/integrity`,
      headers: started.auth,
      payload: { events },
    });
  }

  it('does not punish a blur inside the grace window', async () => {
    const started = await startAttempt();
    const response = await report(started, [
      { type: 'window_blur', occurredAt: Date.now(), durationMs: 500 },
    ]);
    expect(response.json().verdict.terminate).toBe(false);
    expect(response.json().attempt.status).toBe('in_progress');
  });

  it('warns on ordinary absences and terminates on the fourth', async () => {
    const started = await startAttempt();
    const first = await report(started, [
      { type: 'visibility_hidden', occurredAt: Date.now() - 1000, durationMs: 3000 },
    ]);
    expect(first.json().verdict.terminate).toBe(false);
    expect(first.json().verdict.remaining).toBe(3);

    const second = await report(started, [
      { type: 'window_blur', occurredAt: Date.now() - 900, durationMs: 3000 },
    ]);
    expect(second.json().verdict.terminate).toBe(false);
    expect(second.json().attempt.status).toBe('in_progress');

    await report(started, [
      { type: 'visibility_hidden', occurredAt: Date.now() - 800, durationMs: 3000 },
    ]);
    const fourth = await report(started, [
      { type: 'window_blur', occurredAt: Date.now(), durationMs: 3000 },
    ]);
    expect(fourth.json().verdict.terminate).toBe(true);
    expect(fourth.json().attempt.status).toBe('terminated');
  });

  it('terminates on a single long absence', async () => {
    const started = await startAttempt();
    const response = await report(started, [
      { type: 'visibility_hidden', occurredAt: Date.now(), durationMs: 30_000 },
    ]);
    expect(response.json().attempt.status).toBe('terminated');
  });

  it('survives a single navigation away, because that is what a reload looks like', async () => {
    // pagehide fires on F5, on the back button and on browser crash recovery
    // exactly as it does on a deliberate exit. The start screen tells the
    // candidate the server-side timer survives a reload, so ending the attempt
    // on the first pagehide failed people for an action they were allowed.
    const started = await startAttempt();
    const response = await report(started, [{ type: 'navigation_away', occurredAt: Date.now() }]);
    expect(response.json().attempt.status).toBe('in_progress');
    expect(response.json().verdict.strikes).toBe(1);
  });

  it('still terminates a candidate who keeps leaving the page', async () => {
    const started = await startAttempt();
    for (let i = 0; i < 3; i += 1) {
      await report(started, [{ type: 'navigation_away', occurredAt: Date.now() - 100 * (3 - i) }]);
    }
    const last = await report(started, [{ type: 'navigation_away', occurredAt: Date.now() }]);
    expect(last.json().attempt.status).toBe('terminated');
  });

  it('is idempotent: a replayed report does not double-count', async () => {
    const started = await startAttempt();
    const occurredAt = Date.now();
    const event = { type: 'visibility_hidden', occurredAt, durationMs: 3000 };
    const first = await report(started, [event]);
    const second = await report(started, [event]);
    expect(second.json().verdict.strikes).toBe(first.json().verdict.strikes);
    expect(second.json().attempt.status).toBe('in_progress');
  });

  it('never scores a terminated attempt', async () => {
    const started = await startAttempt();
    // A 45-second absence is past the hard-terminate threshold on its own.
    await report(started, [
      { type: 'visibility_hidden', occurredAt: Date.now(), durationMs: 45_000 },
    ]);

    const submit = await app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/submit`,
      headers: started.auth,
    });
    expect(submit.statusCode).toBe(409);
    expect(submit.json().error).toBe('attempt_terminated');

    const result = await app.inject({
      method: 'GET',
      url: `/api/attempts/${started.attempt.id}/result`,
      headers: started.auth,
    });
    expect(result.statusCode).toBe(409);
  });

  it('accepts the pagehide beacon, which cannot set an Authorization header', async () => {
    const started = await startAttempt();
    const response = await app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/integrity?token=${encodeURIComponent(started.token)}`,
      payload: { events: [{ type: 'navigation_away', occurredAt: Date.now() }] },
    });
    expect(response.statusCode).toBe(200);
    // What this test is about is the unauthenticated beacon path, not the
    // verdict: one pagehide is a recorded strike, not a termination.
    expect(response.json().verdict.strikes).toBe(1);
    expect(response.json().attempt.status).toBe('in_progress');
  });

  it('rejects a beacon carrying the wrong token', async () => {
    const started = await startAttempt();
    const response = await app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/integrity?token=nope`,
      payload: { events: [{ type: 'navigation_away', occurredAt: Date.now() }] },
    });
    expect(response.statusCode).toBe(401);
  });

  it('rejects an unknown event type', async () => {
    const started = await startAttempt();
    const response = await report(started, [{ type: 'made_up_event', occurredAt: Date.now() }]);
    expect(response.statusCode).toBe(400);
  });

  it('records client silence without ending the attempt over it', async () => {
    // A three-minute gap is a reconnecting VPN, a sleeping laptop or hotel wifi
    // far more often than it is a closed page - and it is the one signal the
    // candidate cannot see happening and cannot argue with. Recorded, charged
    // one strike, not fatal. This is the regression that mattered most: the gap
    // used to be filed as a visibility_hidden carrying the whole gap as its
    // duration, so any gap past the grace window was automatically past the
    // hard-terminate threshold and ended the attempt outright.
    const started = await startAttempt();
    db.prepare('UPDATE attempts SET last_seen_at = ? WHERE id = ?').run(
      Date.now() - 180_000,
      started.attempt.id,
    );
    const response = await app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/heartbeat`,
      headers: started.auth,
    });
    expect(response.json().attempt.status).toBe('in_progress');

    const events = db
      .prepare('SELECT type, server_derived FROM integrity_events WHERE attempt_id = ?')
      .all(started.attempt.id) as { type: string; server_derived: number }[];
    expect(events).toHaveLength(1);
    const [gapEvent] = events;
    expect(gapEvent?.type).toBe('heartbeat_gap');
    expect(gapEvent?.server_derived).toBe(1);
  });

  it('terminates on silence long enough that nothing innocent explains it', async () => {
    const started = await startAttempt();
    db.prepare('UPDATE attempts SET last_seen_at = ? WHERE id = ?').run(
      Date.now() - 400_000,
      started.attempt.id,
    );
    const response = await app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/heartbeat`,
      headers: started.auth,
    });
    expect(response.json().attempt.status).toBe('terminated');
  });
});

describe('the server owns the clock', () => {
  it('expires an attempt whose deadline has passed and still scores it', async () => {
    const started = await startAttempt();
    db.prepare('UPDATE attempts SET deadline_at = ? WHERE id = ?').run(
      Date.now() - 1000,
      started.attempt.id,
    );

    const resumed = await app.inject({
      method: 'GET',
      url: `/api/attempts/${started.attempt.id}`,
      headers: started.auth,
    });
    expect(resumed.json().attempt.status).toBe('expired');
    expect(resumed.json().questions).toHaveLength(0);

    const submitted = await app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/submit`,
      headers: started.auth,
    });
    expect(submitted.statusCode).toBe(200);
    expect(submitted.json().status).toBe('expired');
  });

  it('refuses new answers once the deadline has passed', async () => {
    const started = await startAttempt();
    db.prepare('UPDATE attempts SET deadline_at = ? WHERE id = ?').run(
      Date.now() - 1000,
      started.attempt.id,
    );
    const response = await app.inject({
      method: 'PUT',
      url: `/api/attempts/${started.attempt.id}/answers`,
      headers: started.auth,
      payload: { questionId: started.questions[0].id, optionIds: [] },
    });
    expect(response.statusCode).toBe(409);
    expect(response.json().error).toBe('attempt_expired');
  });

  it('publishes the rules and the ladder before the test begins', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/meta' });
    const body = response.json();
    expect(body.questionsPerTest).toBe(20);
    expect(body.variantCount).toBe(50);
    expect(body.ladder).toHaveLength(9);
    expect(body.integrity.strikesAllowed).toBeGreaterThan(0);
  });
});

describe('admin endpoints', () => {
  it('refuses access when no admin token is configured', async () => {
    delete process.env.QASC_ADMIN_TOKEN;
    const { app: freshApp, db: freshDb } = buildTestApp();
    const response = await freshApp.inject({ method: 'GET', url: '/api/admin/attempts' });
    expect(response.statusCode).toBe(503);
    await freshApp.close();
    freshDb.close();
  });

  it('gives the reviewer the per-question detail the candidate is denied', async () => {
    // Without this the pilot cannot do the thing it exists for: the owner would
    // see only the final rung, not which questions the person actually missed.
    // The candidate token is stored hashed and cannot be replayed afterwards,
    // so this endpoint is the only route to that detail after the fact.
    process.env.QASC_ADMIN_TOKEN = 'test-admin-token';
    const { app: adminApp, db: adminDb } = buildTestApp();
    try {
      const started = await adminApp.inject({
        method: 'POST',
        url: '/api/attempts',
        payload: {
          candidateName: 'Anna Tester',
          candidateEmail: 'anna@example.com',
          acceptedRules: true,
        },
      });
      const body = started.json();
      await adminApp.inject({
        method: 'POST',
        url: `/api/attempts/${body.attempt.id}/submit`,
        headers: { authorization: `Bearer ${body.token}` },
      });

      const detail = await adminApp.inject({
        method: 'GET',
        url: `/api/admin/attempts/${body.attempt.id}/result`,
        headers: { authorization: 'Bearer test-admin-token' },
      });
      expect(detail.statusCode).toBe(200);
      expect(detail.json().answersRevealed).toBe(true);
      expect(detail.json().questions[0]).toHaveProperty('correctAnswer');
      expect(detail.json().questions[0]).toHaveProperty('explanation');
    } finally {
      delete process.env.QASC_ADMIN_TOKEN;
      await adminApp.close();
      adminDb.close();
    }
  });

  it('refuses the reviewer detail endpoint without the admin token', async () => {
    process.env.QASC_ADMIN_TOKEN = 'test-admin-token';
    const { app: adminApp, db: adminDb } = buildTestApp();
    try {
      const response = await adminApp.inject({
        method: 'GET',
        url: '/api/admin/attempts/whatever/result',
      });
      expect(response.statusCode).toBe(401);
    } finally {
      delete process.env.QASC_ADMIN_TOKEN;
      await adminApp.close();
      adminDb.close();
    }
  });
});

describe('reinstating a falsely terminated attempt', () => {
  const ADMIN = 'test-admin-token';
  let adminApp: FastifyInstance;
  let adminDb: Db;

  beforeEach(() => {
    process.env.QASC_ADMIN_TOKEN = ADMIN;
    ({ app: adminApp, db: adminDb } = buildTestApp());
  });

  afterEach(async () => {
    delete process.env.QASC_ADMIN_TOKEN;
    await adminApp.close();
    adminDb.close();
  });

  const adminAuth = { authorization: `Bearer ${ADMIN}` };

  async function begin() {
    const response = await adminApp.inject({
      method: 'POST',
      url: '/api/attempts',
      payload: {
        candidateName: 'Anna Tester',
        candidateEmail: 'anna@example.com',
        acceptedRules: true,
      },
    });
    const body = response.json();
    return { ...body, candidateAuth: { authorization: `Bearer ${body.token}` } };
  }

  async function answerCorrectly(started: any, howMany: number) {
    const variant = VARIANT_BY_NUMBER.get(started.attempt.variantNumber)!;
    let answered = 0;
    for (const questionId of variant.questionIds) {
      if (answered >= howMany) break;
      const source = QUESTION_BY_ID.get(questionId)!;
      const paper = started.questions.find((q: any) => q.id === questionId);
      const optionIds = source.correctOptionIds.map((correctId) => {
        const text = source.options.find((o) => o.id === correctId)!.text;
        return paper.options.find((o: any) => o.text === text).id;
      });
      await adminApp.inject({
        method: 'PUT',
        url: `/api/attempts/${started.attempt.id}/answers`,
        headers: started.candidateAuth,
        payload: { questionId, optionIds },
      });
      answered += 1;
    }
    return answered;
  }

  /** A 45-second absence is past the hard-terminate threshold on its own. */
  function condemn(started: any) {
    return adminApp.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/integrity`,
      headers: started.candidateAuth,
      payload: {
        events: [{ type: 'visibility_hidden', occurredAt: Date.now(), durationMs: 45_000 }],
      },
    });
  }

  function reinstate(id: string, note = 'Кандидат втратив фокус через звінок; я був поруч.') {
    return adminApp.inject({
      method: 'POST',
      url: `/api/admin/attempts/${id}/reinstate`,
      headers: adminAuth,
      payload: { note },
    });
  }

  it('scores the answers a terminated attempt had already given', async () => {
    // The answers were always in the database; before this endpoint no route
    // could reach them, so a proctor mistake destroyed the result outright.
    const started = await begin();
    const answered = await answerCorrectly(started, 8);
    expect((await condemn(started)).json().attempt.status).toBe('terminated');

    const response = await reinstate(started.attempt.id);
    expect(response.statusCode).toBe(200);
    const { reinstated, result } = response.json();

    expect(result.status).toBe('submitted');
    expect(result.answersRevealed).toBe(true);
    expect(result.breakdown.correct).toBe(answered);
    expect(reinstated.previousReason).toContain('приховано');
    expect(reinstated.previousStrikes).toBeGreaterThanOrEqual(4);
    expect(reinstated.forgivenEvents).toBe(1);
    expect(reinstated.note).toContain('звінок');
  });

  it('reports how little of the paper was answered, so the rung is not read as a verdict', async () => {
    // Scoring a paper abandoned at question three yields a level that means
    // nothing. The reviewer has to see the coverage next to it.
    const started = await begin();
    await answerCorrectly(started, 3);
    await condemn(started);

    const { reinstated } = (await reinstate(started.attempt.id)).json();
    expect(reinstated.answeredQuestions).toBe(3);
    expect(reinstated.totalQuestions).toBe(20);
  });

  it('keeps the forgiven events out of the verdict, so the attempt is not condemned again', async () => {
    // This is the property that makes reinstatement real rather than cosmetic.
    // applyIntegrityVerdict replays the WHOLE stored log on every report and
    // rewrites the strike count from it, and the integrity route accepts
    // reports whatever the status - so an attempt whose log still counted would
    // have its terminating strikes written straight back onto it.
    const started = await begin();
    await answerCorrectly(started, 5);
    await condemn(started);
    await reinstate(started.attempt.id);

    const after = await adminApp.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/integrity`,
      headers: started.candidateAuth,
      payload: {
        events: [{ type: 'window_blur', occurredAt: Date.now(), durationMs: 3_000 }],
      },
    });

    // Only the one new event counts. Without forgiveness this would be back at
    // the terminating total.
    expect(after.json().verdict.strikes).toBe(1);
    expect(after.json().verdict.terminate).toBe(false);
    expect(after.json().attempt.status).toBe('submitted');
  });

  it('keeps the forgiven events in the audit log rather than deleting them', async () => {
    const started = await begin();
    await condemn(started);
    await reinstate(started.attempt.id);

    const audit = await adminApp.inject({
      method: 'GET',
      url: `/api/admin/attempts/${started.attempt.id}/integrity`,
      headers: adminAuth,
    });
    const body = audit.json();
    expect(body.events).toHaveLength(1);
    expect(body.events[0].forgiven).toBe(1);
    expect(body.events[0].type).toBe('visibility_hidden');
    expect(body.reinstatement.note).toContain('звінок');
    expect(body.reinstatement.previousStrikes).toBeGreaterThanOrEqual(4);
  });

  it('marks the attempt as reinstated in the roster, so it never reads as a clean run', async () => {
    const started = await begin();
    await condemn(started);
    await reinstate(started.attempt.id);

    const roster = await adminApp.inject({
      method: 'GET',
      url: '/api/admin/attempts',
      headers: adminAuth,
    });
    const row = roster.json().attempts.find((a: any) => a.id === started.attempt.id);
    expect(row.reinstated).toBe(1);
    expect(row.reinstatement_note).toContain('звінок');
    expect(row.level).toBeTruthy();
  });

  it('refuses to reinstate an attempt that was never terminated', async () => {
    const started = await begin();
    const response = await reinstate(started.attempt.id);
    expect(response.statusCode).toBe(409);
    expect(response.json().error).toBe('attempt_not_terminated');
  });

  it('will not reinstate the same attempt twice', async () => {
    const started = await begin();
    await condemn(started);
    expect((await reinstate(started.attempt.id)).statusCode).toBe(200);
    const second = await reinstate(started.attempt.id);
    expect(second.statusCode).toBe(409);
    expect(second.json().error).toBe('attempt_not_terminated');
  });

  it('requires the reviewer to state a reason', async () => {
    // Overturning a termination is a judgement someone has to own in writing:
    // the roster will show this attempt beside clean ones.
    const started = await begin();
    await condemn(started);

    const blank = await adminApp.inject({
      method: 'POST',
      url: `/api/admin/attempts/${started.attempt.id}/reinstate`,
      headers: adminAuth,
      payload: { note: '  ' },
    });
    expect(blank.statusCode).toBe(400);

    const missing = await adminApp.inject({
      method: 'POST',
      url: `/api/admin/attempts/${started.attempt.id}/reinstate`,
      headers: adminAuth,
      payload: {},
    });
    expect(missing.statusCode).toBe(400);
  });

  it('refuses an unknown attempt, and refuses anyone without the admin token', async () => {
    const missing = await adminApp.inject({
      method: 'POST',
      url: '/api/admin/attempts/does-not-exist/reinstate',
      headers: adminAuth,
      payload: { note: 'whatever' },
    });
    expect(missing.statusCode).toBe(404);

    const started = await begin();
    await condemn(started);
    const unauthorised = await adminApp.inject({
      method: 'POST',
      url: `/api/admin/attempts/${started.attempt.id}/reinstate`,
      payload: { note: 'no token here' },
    });
    expect(unauthorised.statusCode).toBe(401);

    // And the candidate's own token must not open the reviewer's door.
    const asCandidate = await adminApp.inject({
      method: 'POST',
      url: `/api/admin/attempts/${started.attempt.id}/reinstate`,
      headers: started.candidateAuth,
      payload: { note: 'let me out' },
    });
    expect(asCandidate.statusCode).toBe(401);
  });
});
