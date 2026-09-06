import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import Database from 'better-sqlite3';
import { config } from './config.js';

/**
 * Schema.
 *
 * Two deliberate omissions: there is no `questions` table and no `variants`
 * table. The bank and the 50 papers are deterministic code artefacts built from
 * a fixed seed, so persisting them would create a second source of truth that
 * could drift from the one the scoring uses. An attempt stores only the variant
 * NUMBER, and the paper is reconstructed from it.
 *
 * `attempt_answers` stores what the candidate selected, never whether it was
 * right. Correctness is computed inside the submit transaction and written to
 * `attempt_results`, so there is no column an over-broad SELECT could leak.
 */
const SCHEMA = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS attempts (
  id                TEXT PRIMARY KEY,
  token_hash        TEXT NOT NULL,
  candidate_name    TEXT NOT NULL,
  candidate_email   TEXT NOT NULL,
  variant_number    INTEGER NOT NULL,
  status            TEXT NOT NULL CHECK (status IN ('in_progress','submitted','expired','terminated')),
  created_at        INTEGER NOT NULL,
  started_at        INTEGER NOT NULL,
  deadline_at       INTEGER NOT NULL,
  finished_at       INTEGER,
  last_seen_at      INTEGER NOT NULL,
  strikes           INTEGER NOT NULL DEFAULT 0,
  termination_reason TEXT
);

CREATE INDEX IF NOT EXISTS idx_attempts_email ON attempts (candidate_email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_attempts_status ON attempts (status);

CREATE TABLE IF NOT EXISTS attempt_answers (
  attempt_id   TEXT NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  question_id  TEXT NOT NULL,
  -- JSON array of the REAL option ids, resolved from the opaque ids the client sent.
  selected     TEXT NOT NULL,
  answered_at  INTEGER NOT NULL,
  PRIMARY KEY (attempt_id, question_id)
);

CREATE TABLE IF NOT EXISTS integrity_events (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  attempt_id  TEXT NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  type        TEXT NOT NULL,
  occurred_at INTEGER NOT NULL,
  received_at INTEGER NOT NULL,
  duration_ms INTEGER,
  -- Set when the server, not the client, inferred the event (e.g. a heartbeat gap).
  server_derived INTEGER NOT NULL DEFAULT 0,
  UNIQUE (attempt_id, type, occurred_at)
);

CREATE INDEX IF NOT EXISTS idx_integrity_attempt ON integrity_events (attempt_id, id);

CREATE TABLE IF NOT EXISTS attempt_results (
  attempt_id  TEXT PRIMARY KEY REFERENCES attempts(id) ON DELETE CASCADE,
  level       TEXT NOT NULL,
  correct     INTEGER NOT NULL,
  total       INTEGER NOT NULL,
  percent     REAL NOT NULL,
  -- Full ScoreBreakdown, stored so an old result can be re-read without
  -- re-running scoring against a bank that may have been edited since.
  breakdown   TEXT NOT NULL,
  created_at  INTEGER NOT NULL
);
`;

export type Db = Database.Database;

let instance: Db | null = null;

export function openDatabase(file: string = config.databaseFile): Db {
  if (file !== ':memory:') mkdirSync(dirname(file), { recursive: true });
  const db = new Database(file);
  db.exec(SCHEMA);
  return db;
}

export function getDatabase(): Db {
  instance ??= openDatabase();
  return instance;
}

export function closeDatabase(): void {
  instance?.close();
  instance = null;
}
