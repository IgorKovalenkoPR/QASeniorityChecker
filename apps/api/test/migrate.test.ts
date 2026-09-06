import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import Database from 'better-sqlite3';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { openDatabase } from '../src/db.js';

/**
 * The schema is create-if-missing, so it can add a table but never a column.
 * An attempt that needs reinstating is by definition in a database that already
 * exists, which makes this upgrade path the only one that matters for the
 * feature - and the one no fresh-database test would ever exercise.
 */
describe('opening a database written by an older build', () => {
  let dir: string;
  let file: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'qasc-migrate-'));
    file = join(dir, 'old.db');

    // The integrity_events table exactly as it was before reinstatement
    // existed: no `forgiven` column.
    const old = new Database(file);
    old.exec(`
      CREATE TABLE attempts (
        id TEXT PRIMARY KEY,
        token_hash TEXT NOT NULL,
        candidate_name TEXT NOT NULL,
        candidate_email TEXT NOT NULL,
        variant_number INTEGER NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('in_progress','submitted','expired','terminated')),
        created_at INTEGER NOT NULL,
        started_at INTEGER NOT NULL,
        deadline_at INTEGER NOT NULL,
        finished_at INTEGER,
        last_seen_at INTEGER NOT NULL,
        strikes INTEGER NOT NULL DEFAULT 0,
        termination_reason TEXT
      );
      CREATE TABLE integrity_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        attempt_id TEXT NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        occurred_at INTEGER NOT NULL,
        received_at INTEGER NOT NULL,
        duration_ms INTEGER,
        server_derived INTEGER NOT NULL DEFAULT 0,
        UNIQUE (attempt_id, type, occurred_at)
      );
      INSERT INTO attempts VALUES
        ('a1','hash','Anna','anna@example.com',1,'terminated',1,1,2,2,1,4,'приховано');
      INSERT INTO integrity_events
        (attempt_id, type, occurred_at, received_at, duration_ms, server_derived)
        VALUES ('a1','visibility_hidden',1,1,45000,0);
    `);
    old.close();
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('adds the forgiven column without touching the rows already there', () => {
    const db = openDatabase(file);
    try {
      const columns = (
        db.prepare('PRAGMA table_info(integrity_events)').all() as { name: string }[]
      ).map((c) => c.name);
      expect(columns).toContain('forgiven');

      // The pre-existing event survives, and defaults to counting - forgiveness
      // is something a reviewer grants, never the state an old row lands in.
      const rows = db
        .prepare('SELECT type, forgiven FROM integrity_events WHERE attempt_id = ?')
        .all('a1') as { type: string; forgiven: number }[];
      expect(rows).toHaveLength(1);
      expect(rows[0]?.forgiven).toBe(0);

      // And the attempt itself is untouched, so it is still reinstatable.
      const attempt = db.prepare('SELECT status FROM attempts WHERE id = ?').get('a1') as {
        status: string;
      };
      expect(attempt.status).toBe('terminated');
    } finally {
      db.close();
    }
  });

  it('is safe to run twice, and creates the reinstatements table it lacked', () => {
    openDatabase(file).close();
    const db = openDatabase(file);
    try {
      const columns = (
        db.prepare('PRAGMA table_info(integrity_events)').all() as { name: string }[]
      ).filter((c) => c.name === 'forgiven');
      expect(columns).toHaveLength(1);

      // attempt_reinstatements did not exist in the old database at all; the
      // create-if-missing schema is enough for a whole new table.
      const tables = db
        .prepare("SELECT name FROM sqlite_master WHERE type = 'table'")
        .all() as { name: string }[];
      expect(tables.map((t) => t.name)).toContain('attempt_reinstatements');
    } finally {
      db.close();
    }
  });
});
