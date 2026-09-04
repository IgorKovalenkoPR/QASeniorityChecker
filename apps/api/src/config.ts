import { randomBytes } from 'node:crypto';

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
  heartbeatGraceSec: int('QASC_HEARTBEAT_GRACE_SECONDS', 45),
  optionSecret: optionSecret(),
  /** Serve the built SPA from the API process when it exists. */
  webDist: process.env.QASC_WEB_DIST ?? '../web/dist',
  corsOrigin: process.env.QASC_CORS_ORIGIN ?? 'http://localhost:5173',
} as const;
