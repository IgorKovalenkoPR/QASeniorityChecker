import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { config } from './config.js';
import {
  AuthError,
  OAUTH_STATE_COOKIE,
  SESSION_COOKIE,
  admit,
  authorizeUrl,
  decodeSession,
  encodeSession,
  exchangeWithGoogle,
} from './auth.js';
import type { CodeExchanger, Session } from './auth.js';
import { randomBytes } from 'node:crypto';

/**
 * The origin to build the OAuth redirect URI from.
 *
 * It has to match what is registered in the Google Cloud console byte for
 * byte, so QASC_PUBLIC_URL wins when set. Otherwise it is derived from the
 * request, which is correct behind Render's proxy because `trustProxy` makes
 * Fastify read the X-Forwarded-* headers it sets.
 */
function origin(request: FastifyRequest): string {
  if (config.publicUrl) return config.publicUrl.replace(/\/+$/, '');
  // request.host, not request.hostname: in Fastify 5 hostname drops the port,
  // which silently produced a redirect_uri Google would reject for anything
  // not served on the default port - and Google matches it byte for byte
  // against what is registered in the console.
  return `${request.protocol}://${request.host}`;
}

function redirectUri(request: FastifyRequest): string {
  return `${origin(request)}/api/auth/google/callback`;
}

const cookieBase = {
  httpOnly: true,
  sameSite: 'lax' as const,
  // Lax rather than Strict: the browser arrives back here on a top-level
  // redirect from Google, and Strict would withhold the cookie on exactly that
  // navigation. Lax still blocks it on cross-site POSTs, which is the case
  // that matters.
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  signed: true,
};

/** The candidate's verified identity, or null. */
export function currentSession(request: FastifyRequest): Session | null {
  const raw = request.cookies[SESSION_COOKIE];
  if (!raw) return null;
  const unsigned = request.unsignCookie(raw);
  if (!unsigned.valid || unsigned.value === null) return null;
  return decodeSession(unsigned.value);
}

/**
 * The identity to file an attempt under.
 *
 * In 'google' mode it is the verified session and nothing else - notably not
 * anything in the request body, which is where it used to come from. In 'open'
 * mode the caller supplies it and nobody checks, which is why that mode is
 * refused in production.
 */
export function requireCandidate(request: FastifyRequest): Session {
  const session = currentSession(request);
  if (!session) {
    throw new AuthError(401, 'Спершу увійдіть через Google.', 'auth_required');
  }
  return session;
}

export function registerAuthRoutes(
  app: FastifyInstance,
  exchange: CodeExchanger = exchangeWithGoogle,
): void {
  app.get('/api/auth/me', async (request, reply) => {
    const session = currentSession(request);
    if (!session) {
      return reply.code(401).send({ error: 'auth_required', authenticated: false });
    }
    return reply.send({ authenticated: true, email: session.email, name: session.name });
  });

  app.post('/api/auth/logout', async (_request, reply) => {
    reply.clearCookie(SESSION_COOKIE, { path: '/' });
    return reply.code(204).send();
  });

  if (config.authMode !== 'google') return;

  app.get('/api/auth/google/start', async (request, reply) => {
    // The state is compared against a cookie on the way back. Without it, an
    // attacker can complete the flow in a victim's browser with their own code
    // and have the victim's session become the attacker's account.
    const state = randomBytes(32).toString('base64url');
    reply.setCookie(OAUTH_STATE_COOKIE, state, { ...cookieBase, maxAge: 600 });
    return reply.redirect(authorizeUrl(redirectUri(request), state));
  });

  app.get('/api/auth/google/callback', async (request, reply) => {
    const query = request.query as { code?: string; state?: string; error?: string };

    // A failure here lands in the browser's address bar, so it redirects to the
    // SPA with a code rather than rendering JSON at the candidate.
    const fail = (code: string): FastifyReply => {
      reply.clearCookie(OAUTH_STATE_COOKIE, { path: '/' });
      return reply.redirect(`${origin(request)}/?auth_error=${encodeURIComponent(code)}`);
    };

    if (query.error) return fail(query.error);
    if (!query.code || !query.state) return fail('auth_missing_code');

    const expected = request.cookies[OAUTH_STATE_COOKIE];
    const unsigned = expected ? request.unsignCookie(expected) : null;
    if (!unsigned?.valid || unsigned.value !== query.state) {
      return fail('auth_state_mismatch');
    }

    let session: Session;
    try {
      session = admit(await exchange(query.code, redirectUri(request)));
    } catch (error) {
      request.log.warn(
        { code: error instanceof AuthError ? error.code : 'auth_failed' },
        'sign-in refused',
      );
      return fail(error instanceof AuthError ? error.code : 'auth_failed');
    }

    reply.clearCookie(OAUTH_STATE_COOKIE, { path: '/' });
    reply.setCookie(SESSION_COOKIE, encodeSession(session), {
      ...cookieBase,
      maxAge: config.sessionTtlSec,
    });
    return reply.redirect(`${origin(request)}/`);
  });
}
