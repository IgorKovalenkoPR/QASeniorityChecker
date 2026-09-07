import { randomBytes } from 'node:crypto';

function bool(name: string, fallback: boolean): boolean {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  if (['1', 'true', 'yes', 'on'].includes(raw.toLowerCase())) return true;
  if (['0', 'false', 'no', 'off'].includes(raw.toLowerCase())) return false;
  throw new Error(`${name} must be a boolean (true/false)`);
}

function int(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n <= 0) throw new Error(`${name} must be a positive integer`);
  return n;
}

/**
 * The option-id secret must be stable for the lifetime of an attempt, otherwise
 * a server restart would invalidate every in-flight paper. In production it is
 * supplied via the environment; in development a random one is generated and
 * the operator is warned, because a silent random secret in production would
 * fail only for the candidates unlucky enough to be mid-test during a deploy.
 */
function optionSecret(): string {
  const fromEnv = process.env.QASC_OPTION_SECRET;
  if (fromEnv && fromEnv.length >= 32) return fromEnv;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('QASC_OPTION_SECRET must be set to at least 32 characters in production');
  }
  const generated = randomBytes(32).toString('hex');
  console.warn('[qasc] QASC_OPTION_SECRET is not set - generated an ephemeral one for development.');
  return generated;
}

function list(name: string): string[] {
  const raw = process.env[name];
  if (!raw) return [];
  return raw
    .split(',')
    .map((v) => v.trim().toLowerCase())
    .filter((v) => v.length > 0);
}

/**
 * How candidates identify themselves.
 *
 *   google - Google sign-in, restricted to QASC_ALLOWED_EMAIL_DOMAINS.
 *   open   - the candidate types a name and an email that nobody verifies.
 *
 * 'open' is the historical behaviour and is fine for a link handed to a few
 * people you trust. It is refused in production: a public URL with an
 * unverified name field files results under whatever anyone types, and hands
 * the 504-question bank to anyone who finds the link.
 */
function authMode(): 'google' | 'open' {
  const raw = (process.env.QASC_AUTH_MODE ?? '').trim().toLowerCase();
  const mode = raw === '' ? (process.env.NODE_ENV === 'production' ? 'google' : 'open') : raw;
  if (mode !== 'google' && mode !== 'open') {
    throw new Error('QASC_AUTH_MODE must be "google" or "open"');
  }
  if (mode === 'open' && process.env.NODE_ENV === 'production') {
    throw new Error(
      'QASC_AUTH_MODE=open is refused in production: it would let anyone start an attempt ' +
        'under any email. Configure Google sign-in instead.',
    );
  }
  return mode;
}

/**
 * The secret that signs the session cookie. Same reasoning as the option
 * secret: rotating it logs everyone out, and a silent random one in production
 * would do that on every deploy.
 */
function sessionSecret(mode: 'google' | 'open'): string {
  const fromEnv = process.env.QASC_SESSION_SECRET;
  if (fromEnv && fromEnv.length >= 32) return fromEnv;
  if (mode === 'google' && process.env.NODE_ENV === 'production') {
    throw new Error('QASC_SESSION_SECRET must be set to at least 32 characters in production');
  }
  return randomBytes(32).toString('hex');
}

/**
 * The externally reachable origin, validated rather than trusted.
 *
 * This one is worth checking at startup because getting it wrong fails in the
 * least helpful place possible: the process starts, every endpoint answers, and
 * the mistake only surfaces when a human clicks "sign in" and Google shows them
 * an error page. A value with no scheme produced
 * "qaseniority-checker.onrender.com/api/auth/google/callback" as the redirect
 * URI - not a URL at all, and Google compares it byte for byte.
 *
 * Normalised to a bare origin, so a trailing slash or a stray path cannot end
 * up spliced into the callback URI either.
 */
function publicUrl(): string | null {
  const raw = process.env.QASC_PUBLIC_URL?.trim();
  if (!raw) return null;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error(
      `QASC_PUBLIC_URL must be an absolute URL including the scheme, e.g. ` +
        `"https://example.onrender.com" - got "${raw}"`,
    );
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error(
      `QASC_PUBLIC_URL must start with https:// or http:// - got "${raw}"`,
    );
  }

  const local = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
  if (parsed.protocol === 'http:' && !local && process.env.NODE_ENV === 'production') {
    // The session cookie is Secure in production, so a browser would drop it on
    // an http origin and the sign-in would appear to succeed and do nothing.
    // Google also refuses non-https redirect URIs outside localhost.
    throw new Error(
      `QASC_PUBLIC_URL must use https:// in production - got "${raw}"`,
    );
  }

  if (parsed.pathname !== '/' && parsed.pathname !== '') {
    throw new Error(
      `QASC_PUBLIC_URL must be an origin with no path - got "${raw}". ` +
        `The callback path is appended to it.`,
    );
  }

  return `${parsed.protocol}//${parsed.host}`;
}

const resolvedAuthMode = authMode();
const resolvedDomains = list('QASC_ALLOWED_EMAIL_DOMAINS');

// The domain allow-list is the whole point of the sign-in: without it, Google
// sign-in still admits every Gmail account on earth.
if (resolvedAuthMode === 'google' && resolvedDomains.length === 0) {
  throw new Error(
    'QASC_ALLOWED_EMAIL_DOMAINS must list at least one domain when QASC_AUTH_MODE=google ' +
      '(e.g. "qarea.com,testfort.com"). Without it any Google account would be admitted.',
  );
}
if (
  resolvedAuthMode === 'google' &&
  (!process.env.QASC_GOOGLE_CLIENT_ID || !process.env.QASC_GOOGLE_CLIENT_SECRET)
) {
  throw new Error(
    'QASC_GOOGLE_CLIENT_ID and QASC_GOOGLE_CLIENT_SECRET are required when QASC_AUTH_MODE=google',
  );
}

export const config = {
  port: int('PORT', 3000),
  host: process.env.HOST ?? '0.0.0.0',
  databaseFile: process.env.QASC_DB ?? 'data/qasc.db',
  /** Wall-clock budget for one attempt. 20 questions at 90 seconds each. */
  attemptDurationSec: int('QASC_ATTEMPT_SECONDS', 30 * 60),
  /**
   * How long the client may go silent before the server treats the gap as an
   * unreported absence. Must be comfortably above the client heartbeat period.
   */
  heartbeatIntervalSec: int('QASC_HEARTBEAT_SECONDS', 15),
  /**
   * 120s rather than 45s: three missed heartbeats is a flaky network, not a
   * verdict. A VPN reconnect alone routinely takes longer than 45 seconds.
   */
  heartbeatGraceSec: int('QASC_HEARTBEAT_GRACE_SECONDS', 120),
  optionSecret: optionSecret(),
  /** Serve the built SPA from the API process when it exists. */
  webDist: process.env.QASC_WEB_DIST ?? '../web/dist',
  corsOrigin: process.env.QASC_CORS_ORIGIN ?? 'http://localhost:5173',
  /**
   * Whether the candidate's own result includes the correct answers and the
   * explanations. Off by default: the question bank is the expensive asset here
   * (504 written questions), and with the review switched on, anyone with the
   * link can start an attempt, submit it untouched, read twenty answers, and
   * repeat - the variant round-robin hands out a fresh paper each time. The
   * reviewer still sees everything through the admin result endpoint.
   */
  revealAnswersToCandidate: bool('QASC_REVEAL_ANSWERS_TO_CANDIDATE', false),

  /** --- identity --- */
  authMode: resolvedAuthMode,
  /** Lower-cased, e.g. ['qarea.com']. Empty only when authMode is 'open'. */
  allowedEmailDomains: resolvedDomains,
  googleClientId: process.env.QASC_GOOGLE_CLIENT_ID ?? null,
  googleClientSecret: process.env.QASC_GOOGLE_CLIENT_SECRET ?? null,
  sessionSecret: sessionSecret(resolvedAuthMode),
  /** 12 hours: long enough to finish a test and come back, short enough to expire. */
  sessionTtlSec: int('QASC_SESSION_TTL_SECONDS', 12 * 60 * 60),
  /**
   * The externally reachable origin, used to build the OAuth redirect URI -
   * which must match the one registered in the Google Cloud console exactly.
   * Behind Render's proxy the request's own host is right, so this is only
   * needed when that is not true.
   */
  publicUrl: publicUrl(),

  /** --- Google Spreadsheet export --- */
  /** The spreadsheet's id, the long string in its URL. */
  sheetId: process.env.QASC_SHEET_ID ?? null,
  /** Tab name. Must exist in the spreadsheet; the export does not create it. */
  sheetTab: process.env.QASC_SHEET_TAB ?? 'Attempts',
  /**
   * The service account key, as the whole JSON blob. A dashboard env var is the
   * only place it can live on a platform with no filesystem to put a file on.
   */
  sheetServiceAccountJson: process.env.QASC_GOOGLE_SERVICE_ACCOUNT_JSON ?? null,
  /**
   * Whether rows can actually be sent. Rows are queued regardless - this only
   * gates the flusher, so credentials arriving later drain the backlog.
   */
  sheetExportConfigured:
    Boolean(process.env.QASC_SHEET_ID) &&
    Boolean(process.env.QASC_GOOGLE_SERVICE_ACCOUNT_JSON),
  sheetFlushIntervalSec: int('QASC_SHEET_FLUSH_SECONDS', 30),
} as const;
