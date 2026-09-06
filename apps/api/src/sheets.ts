/**
 * Appending a finished attempt to a Google Spreadsheet.
 *
 * The reason this exists rather than a CSV download: the owner wants results to
 * arrive the way a Google Form's do - in a sheet they already have open, one
 * row per submission, no export step. It also changes what the database is for.
 * If the sheet holds the results, SQLite only has to survive the half hour of
 * an attempt in progress, which is the difference between needing a paid
 * persistent disk and not.
 *
 * That makes losing a row unacceptable, so nothing here appends inline from a
 * request handler. Scoring writes to an outbox table (see sheetOutbox.ts) and a
 * flusher drains it. Two consequences worth stating:
 *
 *   - Rows are queued whether or not Google credentials are configured. Turning
 *     the credentials on later drains everything queued since the first
 *     attempt, so no result is lost to "we had not set it up yet".
 *   - A row is only marked sent once Google has acknowledged it, so a crash
 *     mid-flush retries rather than skips.
 *
 * Only the append itself talks to Google, and it is injectable, so everything
 * else - the row shape, the retry rules, the outbox state machine - is tested
 * without a service account.
 */

import { JWT } from 'google-auth-library';
import { LEVEL_LABELS } from '@qasc/core';
import type { ScoreBreakdown, Tier } from '@qasc/core';
import { config } from './config.js';

const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/** Sends one batch of rows. Injectable; the real one talks to Google. */
export type RowAppender = (rows: (string | number)[][]) => Promise<void>;

export interface AttemptExport {
  attemptId: string;
  candidateName: string;
  candidateEmail: string;
  variantNumber: number;
  status: string;
  startedAt: number;
  finishedAt: number | null;
  strikes: number;
  terminationReason: string | null;
  reinstated: boolean;
  breakdown: ScoreBreakdown;
}

const TIER_ORDER: Tier[] = ['trainee', 'junior', 'middle', 'senior'];

/**
 * Column headers, written once into an empty sheet.
 *
 * Deliberately flat: a row per attempt with one column per number, so the sheet
 * can be sorted, filtered and pivoted without anyone having to parse a cell.
 * The per-tier percentages are here because the rung on its own is the wrong
 * thing to read - the ladder is cumulative and a single low-tier miss caps it,
 * so the tiers are what tell you whether a result means what it says.
 */
export const SHEET_HEADER: string[] = [
  'Завершено',
  'Імʼя',
  'Пошта',
  'Щабель',
  'Правильних',
  'Питань',
  'Відсоток',
  'Trainee %',
  'Junior %',
  'Middle %',
  'Senior %',
  'Найслабші компетенції',
  'Наступний щабель',
  'Що для нього треба',
  'Варіант',
  'Статус',
  'Страйків',
  'Причина завершення',
  'Скасовано рецензентом',
  'ID спроби',
];

const iso = (ms: number | null): string => (ms === null ? '' : new Date(ms).toISOString());

export function buildRow(attempt: AttemptExport): (string | number)[] {
  const b = attempt.breakdown;
  // Three weakest competencies that the paper actually touched. The full list
  // is 60 rows long and 20 questions cannot cover it, so a column naming
  // everything would invite reading absence as failure.
  const weakest = b.competencies
    .filter((c) => c.total > 0)
    .slice(0, 3)
    .map((c) => `${c.label} (${c.correct}/${c.total})`)
    .join('; ');

  return [
    iso(attempt.finishedAt ?? attempt.startedAt),
    attempt.candidateName,
    attempt.candidateEmail,
    LEVEL_LABELS[b.level] ?? b.level,
    b.correct,
    b.total,
    b.percent,
    ...TIER_ORDER.map((t) => b.tiers[t].percent),
    weakest,
    b.nextLevel ? (LEVEL_LABELS[b.nextLevel] ?? b.nextLevel) : '',
    b.nextLevelGap ?? '',
    attempt.variantNumber,
    attempt.status,
    attempt.strikes,
    attempt.terminationReason ?? '',
    attempt.reinstated ? 'так' : '',
    attempt.attemptId,
  ];
}

// --- the Google side -------------------------------------------------------

function serviceAccount(): { client_email: string; private_key: string } {
  const raw = config.sheetServiceAccountJson;
  if (!raw) throw new Error('QASC_GOOGLE_SERVICE_ACCOUNT_JSON is not set');
  const parsed = JSON.parse(raw) as { client_email?: unknown; private_key?: unknown };
  if (typeof parsed.client_email !== 'string' || typeof parsed.private_key !== 'string') {
    throw new Error('QASC_GOOGLE_SERVICE_ACCOUNT_JSON must contain client_email and private_key');
  }
  // Render and most dashboards store multi-line values with escaped newlines.
  return {
    client_email: parsed.client_email,
    private_key: parsed.private_key.replace(/\\n/g, '\n'),
  };
}

async function accessToken(): Promise<string> {
  const creds = serviceAccount();
  const jwt = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: SCOPES,
  });
  const { access_token: token } = await jwt.authorize();
  if (!token) throw new Error('Google did not return an access token for the service account');
  return token;
}

async function sheetsRequest(
  path: string,
  init: { method: string; body?: unknown },
): Promise<unknown> {
  const token = await accessToken();
  const response = await fetch(`${SHEETS_API}/${config.sheetId}${path}`, {
    method: init.method,
    headers: {
      authorization: `Bearer ${token}`,
      ...(init.body === undefined ? {} : { 'content-type': 'application/json' }),
    },
    ...(init.body === undefined ? {} : { body: JSON.stringify(init.body) }),
  });
  const text = await response.text();
  if (!response.ok) {
    // The status is what decides whether the outbox retries, so it is carried.
    throw Object.assign(
      new Error(`Sheets API ${response.status}: ${text.slice(0, 300)}`),
      { status: response.status },
    );
  }
  return text ? (JSON.parse(text) as unknown) : null;
}

/**
 * Write the header if the sheet is empty.
 *
 * A sheet whose first row is data is unreadable by anyone who did not build it,
 * and appending cannot know it is the first append. Checked once per flush
 * rather than per row.
 */
async function ensureHeader(): Promise<void> {
  const range = encodeURIComponent(`${config.sheetTab}!A1:A1`);
  const existing = (await sheetsRequest(`/values/${range}`, { method: 'GET' })) as {
    values?: unknown[][];
  } | null;
  if (existing?.values && existing.values.length > 0) return;

  await sheetsRequest(
    `/values/${encodeURIComponent(`${config.sheetTab}!A1`)}?valueInputOption=RAW`,
    { method: 'PUT', body: { values: [SHEET_HEADER] } },
  );
}

export const appendToGoogleSheet: RowAppender = async (rows) => {
  if (rows.length === 0) return;
  await ensureHeader();
  await sheetsRequest(
    `/values/${encodeURIComponent(`${config.sheetTab}!A1`)}:append` +
      '?valueInputOption=RAW&insertDataOption=INSERT_ROWS',
    { method: 'POST', body: { values: rows } },
  );
};

/**
 * Whether a failed append is worth retrying.
 *
 * Same reasoning as the answer queue: no status means the request never
 * reached Google, which is exactly the case to retry. A 4xx means Google read
 * it and refused - a wrong sheet id, a sheet not shared with the service
 * account - and retrying that forever would hide a misconfiguration behind a
 * growing queue. 408 and 429 are the two that mean "later".
 */
export function isRetryableSheetError(error: unknown): boolean {
  const status = (error as { status?: unknown } | null | undefined)?.status;
  if (typeof status !== 'number') return true;
  if (status === 408 || status === 429) return true;
  return status >= 500;
}
