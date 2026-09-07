import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { QUESTION_BY_ID, VARIANT_BY_NUMBER } from '@qasc/content';
import type { Db } from '../src/db.js';

const ORIGINAL = { ...process.env };

function setEnv(vars: Record<string, string | undefined>): void {
  for (const [k, v] of Object.entries(vars)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
}

/**
 * `config.sheetExportConfigured` is read at module load, so switching between
 * "no credentials yet" and "credentials arrived" means a fresh module graph.
 */
async function load(configured: boolean) {
  setEnv({
    NODE_ENV: 'test',
    QASC_SHEET_ID: configured ? 'sheet-abc' : undefined,
    QASC_GOOGLE_SERVICE_ACCOUNT_JSON: configured
      ? JSON.stringify({ client_email: 'bot@example.iam.gserviceaccount.com', private_key: 'k' })
      : undefined,
  });
  vi.resetModules();
  const [{ buildTestApp }, outbox, sheets] = await Promise.all([
    import('../src/server.js'),
    import('../src/sheetOutbox.js'),
    import('../src/sheets.js'),
  ]);
  const { app, db } = buildTestApp();
  return { app, db, ...outbox, ...sheets };
}

async function takeTest(app: FastifyInstance, db: Db, howMany: number) {
  const started = (
    await app.inject({
      method: 'POST',
      url: '/api/attempts',
      payload: {
        candidateName: 'Anna Tester',
        candidateEmail: 'anna@qarea.com',
        acceptedRules: true,
      },
    })
  ).json();
  const auth = { authorization: `Bearer ${started.token}` };
  // From the database, not the response: the candidate's attempt view no
  // longer carries the variant number, and this helper needs the answer key.
  const variantNumber = (
    db.prepare('SELECT variant_number AS n FROM attempts WHERE id = ?').get(started.attempt.id) as {
      n: number;
    }
  ).n;
  const variant = VARIANT_BY_NUMBER.get(variantNumber)!;
  let answered = 0;
  for (const questionId of variant.questionIds) {
    if (answered >= howMany) break;
    const source = QUESTION_BY_ID.get(questionId)!;
    const paper = started.questions.find((q: { id: string }) => q.id === questionId);
    const optionIds = source.correctOptionIds.map((correctId) => {
      const text = source.options.find((o) => o.id === correctId)!.text.uk;
      return paper.options.find((o: { text: { uk: string } }) => o.text.uk === text).id;
    });
    await app.inject({
      method: 'PUT',
      url: `/api/attempts/${started.attempt.id}/answers`,
      headers: auth,
      payload: { questionId, optionIds },
    });
    answered += 1;
  }
  await app.inject({
    method: 'POST',
    url: `/api/attempts/${started.attempt.id}/submit`,
    headers: auth,
  });
  return { attemptId: started.attempt.id as string, auth };
}

afterEach(() => {
  process.env = { ...ORIGINAL };
  vi.resetModules();
});

describe('the row that lands in the spreadsheet', () => {
  let mod: Awaited<ReturnType<typeof load>>;

  beforeEach(async () => {
    mod = await load(true);
  });

  afterEach(async () => {
    await mod.app.close();
    mod.db.close();
  });

  it('carries the per-tier percentages, not just the rung', async () => {
    // The rung alone is the wrong thing to read: the ladder is cumulative, so a
    // single low-tier miss caps it. The tiers are what say whether a result
    // means what it looks like.
    const { attemptId } = await takeTest(mod.app, mod.db, 10);
    const queued = mod.db
      .prepare('SELECT row_json FROM sheet_exports WHERE attempt_id = ?')
      .get(attemptId) as { row_json: string };
    const row = JSON.parse(queued.row_json) as (string | number)[];

    expect(row).toHaveLength(mod.SHEET_HEADER.length);
    const at = (label: string) => row[mod.SHEET_HEADER.indexOf(label)];
    expect(at('Email')).toBe('anna@qarea.com');
    expect(at('Name')).toBe('Anna Tester');
    expect(at('Correct')).toBe(10);
    expect(at('Questions')).toBe(20);
    expect(typeof at('Trainee %')).toBe('number');
    expect(typeof at('Senior %')).toBe('number');
    expect(at('Attempt id')).toBe(attemptId);
  });

  it('has a header for every column it writes', () => {
    // A sheet whose first row is data is unreadable by anyone who did not build
    // it, and a header shorter than the row silently mislabels columns.
    expect(new Set(mod.SHEET_HEADER).size).toBe(mod.SHEET_HEADER.length);
  });

  it('marks a result that came from an overturned termination', async () => {
    // The roster distinguishes a reinstated attempt from a clean run and the
    // sheet must not lose that.
    process.env.QASC_ADMIN_TOKEN = 'admin-token';
    const { app, db, SHEET_HEADER } = await load(true);
    try {
      const started = (
        await app.inject({
          method: 'POST',
          url: '/api/attempts',
          payload: {
            candidateName: 'Anna Tester',
            candidateEmail: 'anna@qarea.com',
            acceptedRules: true,
          },
        })
      ).json();
      const auth = { authorization: `Bearer ${started.token}` };
      await app.inject({
        method: 'POST',
        url: `/api/attempts/${started.attempt.id}/integrity`,
        headers: auth,
        payload: {
          events: [{ type: 'visibility_hidden', occurredAt: Date.now(), durationMs: 45_000 }],
        },
      });
      await app.inject({
        method: 'POST',
        url: `/api/admin/attempts/${started.attempt.id}/reinstate`,
        headers: { authorization: 'Bearer admin-token' },
        payload: { note: 'Wifi впав.' },
      });

      const queued = db
        .prepare('SELECT row_json FROM sheet_exports WHERE attempt_id = ?')
        .get(started.attempt.id) as { row_json: string };
      const row = JSON.parse(queued.row_json) as string[];
      expect(row[SHEET_HEADER.indexOf('Reinstated by reviewer')]).toBe('yes');
    } finally {
      delete process.env.QASC_ADMIN_TOKEN;
      await app.close();
      db.close();
    }
  });

  it('queues one row per attempt, even when it is scored twice', async () => {
    // Re-scoring after a reinstatement must replace the queued row, not append
    // a second one - otherwise the sheet gets two rows for one person.
    const { attemptId, auth } = await takeTest(mod.app, mod.db, 4);
    await mod.app.inject({
      method: 'POST',
      url: `/api/attempts/${attemptId}/submit`,
      headers: auth,
    });
    const count = mod.db
      .prepare('SELECT COUNT(*) AS n FROM sheet_exports WHERE attempt_id = ?')
      .get(attemptId) as { n: number };
    expect(count.n).toBe(1);
  });
});

describe('the outbox', () => {
  it('queues rows before any credentials exist, and sends them once they arrive', async () => {
    // This is the case the deployment is actually in: the URL goes up before
    // the service account does. Nothing may be lost to "we had not set it up".
    const unconfigured = await load(false);
    try {
      await takeTest(unconfigured.app, unconfigured.db, 6);
      expect(unconfigured.exportStats(unconfigured.db).pending).toBe(1);

      const skipped = await unconfigured.flushExports(unconfigured.db, async () => {
        throw new Error('must not be called without credentials');
      });
      expect(skipped.skipped).toBe('not_configured');
      expect(skipped.sent).toBe(0);
      expect(unconfigured.exportStats(unconfigured.db).pending).toBe(1);
    } finally {
      await unconfigured.app.close();
      unconfigured.db.close();
    }

    // Credentials arrive. The backlog drains.
    const configured = await load(true);
    try {
      await takeTest(configured.app, configured.db, 6);
      const sentRows: (string | number)[][] = [];
      const result = await configured.flushExports(configured.db, async (rows) => {
        sentRows.push(...rows);
      });
      expect(result.sent).toBe(1);
      expect(result.pending).toBe(0);
      expect(sentRows).toHaveLength(1);
    } finally {
      await configured.app.close();
      configured.db.close();
    }
  });

  it('sends the whole batch in one call rather than a request per row', async () => {
    const mod = await load(true);
    try {
      await takeTest(mod.app, mod.db, 2);
      await takeTest(mod.app, mod.db, 3);
      await takeTest(mod.app, mod.db, 4);

      const calls: number[] = [];
      const result = await mod.flushExports(mod.db, async (rows) => {
        calls.push(rows.length);
      });
      expect(result.sent).toBe(3);
      expect(calls).toEqual([3]);
    } finally {
      await mod.app.close();
      mod.db.close();
    }
  });

  it('keeps a row queued when the send fails, and sends it on the next flush', async () => {
    const mod = await load(true);
    try {
      await takeTest(mod.app, mod.db, 5);

      const failed = await mod.flushExports(mod.db, async () => {
        throw new TypeError('Failed to fetch');
      });
      expect(failed.sent).toBe(0);
      expect(failed.failed).toBe(1);
      expect(failed.pending).toBe(1);

      const row = mod.pendingExports(mod.db)[0];
      expect(row?.attempts).toBe(1);
      expect(row?.lastError).toContain('Failed to fetch');

      const ok = await mod.flushExports(mod.db, async () => undefined);
      expect(ok.sent).toBe(1);
      expect(mod.exportStats(mod.db).pending).toBe(0);
    } finally {
      await mod.app.close();
      mod.db.close();
    }
  });

  it('never marks a row sent when the batch failed', async () => {
    // A row marked sent that Google never took is a silently missing result,
    // which is the one failure this whole mechanism exists to prevent.
    const mod = await load(true);
    try {
      await takeTest(mod.app, mod.db, 1);
      await mod.flushExports(mod.db, async () => {
        throw new Error('nope');
      });
      const sent = mod.db
        .prepare('SELECT COUNT(*) AS n FROM sheet_exports WHERE sent_at IS NOT NULL')
        .get() as { n: number };
      expect(sent.n).toBe(0);
    } finally {
      await mod.app.close();
      mod.db.close();
    }
  });

  it('says so when a refusal is not worth retrying', async () => {
    // A wrong sheet id or a sheet nobody shared with the service account is a
    // 4xx. Retrying that forever hides the misconfiguration behind a queue
    // that only grows.
    const mod = await load(true);
    try {
      await takeTest(mod.app, mod.db, 1);
      await mod.flushExports(mod.db, async () => {
        throw Object.assign(new Error('The caller does not have permission'), { status: 403 });
      });
      expect(mod.pendingExports(mod.db)[0]?.lastError).toContain('не повторюємо');
    } finally {
      await mod.app.close();
      mod.db.close();
    }
  });

  it('retries transport failures and rate limits, but not a refusal', async () => {
    const mod = await load(true);
    try {
      expect(mod.isRetryableSheetError(new TypeError('Failed to fetch'))).toBe(true);
      expect(mod.isRetryableSheetError(Object.assign(new Error(''), { status: 429 }))).toBe(true);
      expect(mod.isRetryableSheetError(Object.assign(new Error(''), { status: 503 }))).toBe(true);
      expect(mod.isRetryableSheetError(Object.assign(new Error(''), { status: 403 }))).toBe(false);
      expect(mod.isRetryableSheetError(Object.assign(new Error(''), { status: 404 }))).toBe(false);
    } finally {
      await mod.app.close();
      mod.db.close();
    }
  });

  it('does nothing on an empty queue', async () => {
    const mod = await load(true);
    try {
      let called = false;
      const result = await mod.flushExports(mod.db, async () => {
        called = true;
      });
      expect(result).toEqual({ sent: 0, failed: 0, pending: 0 });
      expect(called).toBe(false);
    } finally {
      await mod.app.close();
      mod.db.close();
    }
  });
});

describe('the reviewer can see whether results are arriving', () => {
  it('reports configuration, counts and the failing rows', async () => {
    // The export is the only part whose failure is invisible from outside:
    // every attempt looks fine and the sheet just quietly stops growing.
    process.env.QASC_ADMIN_TOKEN = 'admin-token';
    const mod = await load(true);
    try {
      await takeTest(mod.app, mod.db, 3);
      await mod.flushExports(mod.db, async () => {
        throw new TypeError('Failed to fetch');
      });

      const response = await mod.app.inject({
        method: 'GET',
        url: '/api/admin/sheet-exports',
        headers: { authorization: 'Bearer admin-token' },
      });
      expect(response.statusCode).toBe(200);
      const body = response.json();
      expect(body.configured).toBe(true);
      expect(body.sheetId).toBe('sheet-abc');
      expect(body.stats).toMatchObject({ pending: 1, sent: 0, failing: 1 });
      expect(body.pending[0].lastError).toContain('Failed to fetch');
    } finally {
      delete process.env.QASC_ADMIN_TOKEN;
      await mod.app.close();
      mod.db.close();
    }
  });

  it('reports that it is not configured rather than pretending to work', async () => {
    process.env.QASC_ADMIN_TOKEN = 'admin-token';
    const mod = await load(false);
    try {
      await takeTest(mod.app, mod.db, 3);
      const status = await mod.app.inject({
        method: 'GET',
        url: '/api/admin/sheet-exports',
        headers: { authorization: 'Bearer admin-token' },
      });
      expect(status.json().configured).toBe(false);
      expect(status.json().stats.pending).toBe(1);

      const flush = await mod.app.inject({
        method: 'POST',
        url: '/api/admin/sheet-exports/flush',
        headers: { authorization: 'Bearer admin-token' },
      });
      expect(flush.json().skipped).toBe('not_configured');
    } finally {
      delete process.env.QASC_ADMIN_TOKEN;
      await mod.app.close();
      mod.db.close();
    }
  });

  it('refuses the export endpoints without the admin token', async () => {
    process.env.QASC_ADMIN_TOKEN = 'admin-token';
    const mod = await load(true);
    try {
      const status = await mod.app.inject({ method: 'GET', url: '/api/admin/sheet-exports' });
      expect(status.statusCode).toBe(401);
      const flush = await mod.app.inject({
        method: 'POST',
        url: '/api/admin/sheet-exports/flush',
      });
      expect(flush.statusCode).toBe(401);
    } finally {
      delete process.env.QASC_ADMIN_TOKEN;
      await mod.app.close();
      mod.db.close();
    }
  });
});
