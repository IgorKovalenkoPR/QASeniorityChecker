/**
 * Google sign-in, restricted to an allow-list of email domains.
 *
 * Before this, "candidateEmail" was a text field validated for shape and
 * nothing else: anyone could type anyone's address, and the result was filed
 * under whatever they typed. That is tolerable for a link passed to three
 * people you trust and useless once the test has a public URL, which is the
 * point of the deployment this was written for.
 *
 * The flow is the ordinary authorization-code one. What matters here:
 *
 *   - The identity comes from Google's ID token, verified against Google's own
 *     keys by google-auth-library, never from anything the browser sent us.
 *   - `email_verified` must be true. A Google account can carry an unverified
 *     address, and an unverified address is exactly as good as a typed one.
 *   - The domain must be on the allow-list. This is the control that keeps a
 *     public URL from handing the 504-question bank to the internet, so it is
 *     required in production rather than defaulted to "any".
 *
 * The session is a signed, HttpOnly cookie holding the verified email, the
 * display name and an expiry. No server-side session table: there is nothing
 * to revoke that outliving the cookie would endanger, and a table would be a
 * second source of truth for something Google already owns.
 */

import { OAuth2Client } from 'google-auth-library';
import { config } from './config.js';

export const SESSION_COOKIE = 'qasc.session';
export const OAUTH_STATE_COOKIE = 'qasc.oauth';

export interface Identity {
  email: string;
  name: string;
}

export interface Session extends Identity {
  /** Epoch milliseconds. Checked on every read; the cookie's own maxAge is a hint. */
  expiresAt: number;
}

export class AuthError extends Error {
  constructor(
    readonly statusCode: number,
    message: string,
    readonly code: string,
  ) {
    super(message);
  }
}

/**
 * Exchange an authorization code for a verified identity.
 *
 * Injectable so the callback route can be tested without talking to Google:
 * everything interesting about that route - state checking, domain rules,
 * cookie shape, error mapping - is independent of the exchange itself.
 */
export type CodeExchanger = (code: string, redirectUri: string) => Promise<GoogleProfile>;

export interface GoogleProfile {
  email: string;
  name: string;
  emailVerified: boolean;
  /** Google Workspace hosted domain, absent for consumer accounts. */
  hostedDomain?: string;
}

function oauthClient(redirectUri: string): OAuth2Client {
  if (!config.googleClientId || !config.googleClientSecret) {
    throw new AuthError(503, 'Вхід через Google не налаштовано.', 'auth_not_configured');
  }
  return new OAuth2Client({
    clientId: config.googleClientId,
    clientSecret: config.googleClientSecret,
    redirectUri,
  });
}

/** The URL to send the browser to. `state` is echoed back by Google. */
export function authorizeUrl(redirectUri: string, state: string): string {
  const client = oauthClient(redirectUri);
  return client.generateAuthUrl({
    scope: ['openid', 'email', 'profile'],
    state,
    // A hint only - it pre-selects the right account in the picker. Never a
    // control: the hosted domain in the hint is chosen by whoever crafts the
    // URL, so the real check happens against the verified token below.
    ...(config.allowedEmailDomains.length === 1 ? { hd: config.allowedEmailDomains[0] } : {}),
    prompt: 'select_account',
  });
}

export const exchangeWithGoogle: CodeExchanger = async (code, redirectUri) => {
  const client = oauthClient(redirectUri);
  const { tokens } = await client.getToken(code);
  if (!tokens.id_token) {
    throw new AuthError(502, 'Google не повернув ідентифікаційний токен.', 'auth_no_id_token');
  }
  // Verifies signature, issuer, audience and expiry against Google's keys.
  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: config.googleClientId as string,
  });
  const payload = ticket.getPayload();
  if (!payload?.email) {
    throw new AuthError(502, 'Google не повернув адресу пошти.', 'auth_no_email');
  }
  return {
    email: payload.email,
    name: payload.name ?? payload.email,
    emailVerified: payload.email_verified === true,
    ...(payload.hd === undefined ? {} : { hostedDomain: payload.hd }),
  };
};

/**
 * Turn a verified Google profile into a session, or refuse it.
 *
 * Refusals are deliberately not specific to the caller: "your domain is not on
 * the list" is fine to say, but which domains ARE on it is not the candidate's
 * business.
 */
export function admit(profile: GoogleProfile): Session {
  if (!profile.emailVerified) {
    throw new AuthError(
      403,
      'Ваша адреса Google не підтверджена, тому пройти тест не вийде.',
      'auth_email_unverified',
    );
  }
  const domain = profile.email.split('@')[1]?.toLowerCase();
  if (!domain || !config.allowedEmailDomains.includes(domain)) {
    throw new AuthError(
      403,
      'Цей тест доступний лише для робочих акаунтів компанії. Увійдіть з робочої пошти.',
      'auth_domain_not_allowed',
    );
  }
  return {
    email: profile.email.toLowerCase(),
    name: profile.name.trim() || profile.email,
    expiresAt: Date.now() + config.sessionTtlSec * 1000,
  };
}

/** Cookie payload. Signing is left to @fastify/cookie. */
export function encodeSession(session: Session): string {
  return Buffer.from(JSON.stringify(session), 'utf8').toString('base64url');
}

export function decodeSession(value: string): Session | null {
  try {
    const parsed = JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as unknown;
    if (typeof parsed !== 'object' || parsed === null) return null;
    const s = parsed as { email?: unknown; name?: unknown; expiresAt?: unknown };
    if (typeof s.email !== 'string' || typeof s.name !== 'string') return null;
    if (typeof s.expiresAt !== 'number' || s.expiresAt <= Date.now()) return null;
    return { email: s.email, name: s.name, expiresAt: s.expiresAt };
  } catch {
    return null;
  }
}
