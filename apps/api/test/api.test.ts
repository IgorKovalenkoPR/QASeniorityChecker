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

  it('reveals the key and the explanations only after submission', async () => {
    const started = await startAttempt();
    await answerAll(started, 5);
    const submitted = await app.inject({
      method: 'POST',
      url: `/api/attempts/${started.attempt.id}/submit`,
      headers: started.auth,
    });
    const body = submitted.json();
    expect(body.questions[0]).toHaveProperty('correctAnswer');
    expect(body.questions[0]).toHaveProperty('explanation');
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

  it('warns on the first real absence and terminates on the second', async () => {
    const started = await startAttempt();
    const first = await report(started, [
      { type: 'visibility_hidden', occurredAt: Date.now() - 1000, durationMs: 3000 },
    ]);
    expect(first.json().verdict.terminate).toBe(false);
    expect(first.json().verdict.remaining).toBe(1);

    const second = await report(started, [
      { type: 'window_blur', occurredAt: Date.now(), durationMs: 3000 },
    ]);
    expect(second.json().verdict.terminate).toBe(true);
    expect(second.json().attempt.status).toBe('terminated');
  });

  it('terminates on a single long absence', async () => {
    const started = await startAttempt();
    const response = await report(started, [
      { type: 'visibility_hidden', occurredAt: Date.now(), durationMs: 30_000 },
    ]);
    expect(response.json().attempt.status).toBe('terminated');
  });

  it('terminates when the candidate navigates away', async () => {
    const started = await startAttempt();
    const response = await report(started, [{ type: 'navigation_away', occurredAt: Date.now() }]);
    expect(response.json().attempt.status).toBe('terminated');
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
    await report(started, [{ type: 'navigation_away', occurredAt: Date.now() }]);

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
    expect(response.json().attempt.status).toBe('terminated');
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

  it('turns client silence into an integrity event', async () => {
    const started = await startAttempt();
    // Simulate a client that stopped sending heartbeats for two minutes, which
    // is what a patched or closed page looks like from the server side.
    db.prepare('UPDATE attempts SET last_seen_at = ? WHERE id = ?').run(
      Date.now() - 120_000,
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
});
