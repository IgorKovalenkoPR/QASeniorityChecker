/**
 * Durable outbox for spreadsheet rows.
 *
 * Scoring an attempt enqueues a row; a flusher drains the queue. Nothing
 * appends inline from a request handler, for two reasons that both matter:
 *
 *   - A candidate must never see their submission fail because Google was
 *     slow. Scoring already happened; the export is bookkeeping.
 *   - If the sheet is where results live, a lost row is a lost result. A row
 *     is marked sent only once Google has acknowledged it, so a crash
 *     mid-flush retries rather than skips.
 *
 * Rows are enqueued even when no credentials are configured. That is the point:
 * the deployment this was written for is going up before the service account
 * exists, and turning the credentials on later drains everything queued since
 * the first attempt instead of losing it to "we had not set it up yet".
 */

import type { Db } from './db.js';
import { config } from './config.js';
import { appendToGoogleSheet, buildRow, isRetryableSheetError } from './sheets.js';
import type { AttemptExport, RowAppender } from './sheets.js';

export interface OutboxRow {
  id: number;
  attemptId: string;
  attempts: number;
  lastError: string | null;
}

export interface FlushResult {
  sent: number;
  failed: number;
  /** Rows still waiting, including ones this flush could not send. */
  pending: number;
  /** Set when the flush did nothing because Google is not configured yet. */
  skipped?: 'not_configured';
}

/**
 * Queue one scored attempt.
 *
 * The row is built and stored now, not at flush time, so a later change to the
 * row shape cannot silently rewrite history, and the flusher needs no access
 * to the scoring code.
 */
export function enqueueAttemptExport(db: Db, attempt: AttemptExport): void {
  db.prepare(
    `INSERT INTO sheet_exports (attempt_id, row_json, queued_at, attempts)
     VALUES (?, ?, ?, 0)
     ON CONFLICT (attempt_id) DO UPDATE SET
       row_json = excluded.row_json,
       sent_at  = NULL,
       attempts = 0,
       last_error = NULL`,
  ).run(attempt.attemptId, JSON.stringify(buildRow(attempt)), Date.now());
}

/** Rows waiting to be sent, oldest first. */
export function pendingExports(db: Db, limit = 200): OutboxRow[] {
  return (
    db
      .prepare(
        `SELECT id, attempt_id, attempts, last_error
           FROM sheet_exports
          WHERE sent_at IS NULL
          ORDER BY id
          LIMIT ?`,
      )
      .all(limit) as {
      id: number;
      attempt_id: string;
      attempts: number;
      last_error: string | null;
    }[]
  ).map((r) => ({
    id: r.id,
    attemptId: r.attempt_id,
    attempts: r.attempts,
    lastError: r.last_error,
  }));
}

export function exportStats(db: Db): { pending: number; sent: number; failing: number } {
  const row = db
    .prepare(
      `SELECT
         SUM(CASE WHEN sent_at IS NULL THEN 1 ELSE 0 END)                        AS pending,
         SUM(CASE WHEN sent_at IS NOT NULL THEN 1 ELSE 0 END)                    AS sent,
         SUM(CASE WHEN sent_at IS NULL AND attempts > 0 THEN 1 ELSE 0 END)       AS failing
       FROM sheet_exports`,
    )
    .get() as { pending: number | null; sent: number | null; failing: number | null };
  return {
    pending: row.pending ?? 0,
    sent: row.sent ?? 0,
    failing: row.failing ?? 0,
  };
}

/**
 * Send everything waiting.
 *
 * One batch per flush: the Sheets API appends many rows in a single call, and
 * doing it row by row would burn quota and interleave badly with a second
 * flush. All-or-nothing per batch - a partial success is indistinguishable from
 * a failure at this layer, so on error nothing is marked sent and the whole
 * batch is retried. Re-sending a row Google already took would duplicate it,
 * which is why the batch is kept small enough to be a single request.
 */
export async function flushExports(
  db: Db,
  append: RowAppender = appendToGoogleSheet,
  batchSize = 100,
): Promise<FlushResult> {
  if (!config.sheetExportConfigured) {
    return { sent: 0, failed: 0, pending: exportStats(db).pending, skipped: 'not_configured' };
  }

  const batch = (
    db
      .prepare(
        `SELECT id, row_json FROM sheet_exports
          WHERE sent_at IS NULL ORDER BY id LIMIT ?`,
      )
      .all(batchSize) as { id: number; row_json: string }[]
  ).map((r) => ({ id: r.id, row: JSON.parse(r.row_json) as (string | number)[] }));

  if (batch.length === 0) return { sent: 0, failed: 0, pending: 0 };

  try {
    await append(batch.map((b) => b.row));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const retryable = isRetryableSheetError(error);
    const mark = db.prepare(
      'UPDATE sheet_exports SET attempts = attempts + 1, last_error = ? WHERE id = ?',
    );
    const tx = db.transaction(() => {
      for (const b of batch) mark.run(retryable ? message : `не повторюємо: ${message}`, b.id);
    });
    tx();
    return { sent: 0, failed: batch.length, pending: exportStats(db).pending };
  }

  const now = Date.now();
  const done = db.prepare('UPDATE sheet_exports SET sent_at = ?, last_error = NULL WHERE id = ?');
  const tx = db.transaction(() => {
    for (const b of batch) done.run(now, b.id);
  });
  tx();

  return { sent: batch.length, failed: 0, pending: exportStats(db).pending };
}

/**
 * Drain the outbox on a timer.
 *
 * Returns a stop function. The timer is unref'd so it never holds the process
 * open - a pending export must not be the reason a container refuses to exit.
 */
export function startExportFlusher(
  db: Db,
  log: (message: string, detail?: unknown) => void,
  append: RowAppender = appendToGoogleSheet,
): () => void {
  let running = false;
  const tick = async (): Promise<void> => {
    if (running) return;
    running = true;
    try {
      const result = await flushExports(db, append);
      if (result.sent > 0) log(`надіслано рядків у таблицю: ${result.sent}`);
      if (result.failed > 0) {
        log('не вдалося надіслати рядки у таблицю', { failed: result.failed });
      }
    } catch (error) {
      log('несподівана помилка експорту в таблицю', { error });
    } finally {
      running = false;
    }
  };

  const timer = setInterval(() => void tick(), config.sheetFlushIntervalSec * 1000);
  timer.unref();
  void tick();
  return () => clearInterval(timer);
}
