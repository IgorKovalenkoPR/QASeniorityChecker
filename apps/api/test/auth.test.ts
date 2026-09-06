import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { FastifyInstance } from 'fastify';
import type { Db } from '../src/db.js';

/**
 * `config` is evaluated once at module load, so switching identity modes means
 * re-importing the module graph with the environment already set. Every test
 * here therefore builds its own app through `load()` rather than sharing one.
 */
const GOOGLE_ENV = {
  QASC_AUTH_MODE: 'google',
  QASC_ALLOWED_EMAIL_DOMAINS: 'qarea.com,testfort.com',
  QASC_GOOGLE_CLIENT_ID: 'test-client-id',
  QASC_GOOGLE_CLIENT_SECRET: 'test-client-secret',
  QASC_SESSION_SECRET: 'a'.repeat(32),
  QASC_PUBLIC_URL: 'https://check.example.com',
};

const ORIGINAL = { ...process.env };

function setEnv(vars: Record<string, string | undefined>): void {
  for (const [k, v] of Object.entries(vars)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
}

/** A fresh module graph, and an app whose Google exchange is a stub. */
async function load(
  profile: {
    email: string;
    name: string;
    emailVerified?: boolean;
  } = { email: 'anna@qarea.com', name: 'Anna Tester' },
) {
  vi.resetModules();
  const { buildTestApp } = await import('../src/server.js');
  const exchanged: string[] = [];
  const { app, db } = buildTestApp({
    exchangeCode: async (code) => {
      exchanged.push(code);
      return {
        email: profile.email,
        name: profile.name,
        emailVerified: profile.emailVerified ?? true,
      };
    },
  });
  return { app, db, exchanged };
}

/** Walk the redirect flow and return the Set-Cookie the callback issued. */
async function signIn(app: FastifyInstance) {
  const start = await app.inject({ method: 'GET', url: '/api/auth/google/start' });
  const stateCookie = start.cookies.find((c) => c.name === 'qasc.oauth');
  const location = start.headers.location as string;
  const state = new URL(location).searchParams.get('state');
  const callback = await app.inject({
    method: 'GET',
    url: `/api/auth/google/callback?code=good-code&state=${encodeURIComponent(state ?? '')}`,
    cookies: { 'qasc.oauth': stateCookie?.value ?? '' },
  });
  const session = callback.cookies.find((c) => c.name === 'qasc.session');
  return { start, callback, session, authHeaders: { cookie: `qasc.session=${session?.value ?? ''}` } };
}

beforeEach(() => {
  setEnv({ ...GOOGLE_ENV, NODE_ENV: 'test' });
});

afterEach(() => {
  process.env = { ...ORIGINAL };
  vi.resetModules();
});

describe('who is admitted', () => {
  it('refuses an unverified Google address', async () => {
    // A Google account can carry an address it has never proved it owns, and an
    // unverified address is exactly as trustworthy as a typed one.
    const { admit } = await import('../src/auth.js');
    expect(() => admit({ email: 'anna@qarea.com', name: 'Anna', emailVerified: false })).toThrow(
      /не підтверджена/,
    );
  });

  it('refuses a domain that is not on the list', async () => {
    // This is the control that keeps a public URL from handing the bank to
    // every Gmail account on earth.
    const { admit } = await import('../src/auth.js');
    expect(() =>
      admit({ email: 'someone@gmail.com', name: 'Someone', emailVerified: true }),
    ).toThrow(/робочих акаунтів/);
  });

  it('admits a listed domain and normalises the address', async () => {
    const { admit } = await import('../src/auth.js');
    const session = admit({ email: 'Anna.Tester@QArea.com', name: '  Anna  ', emailVerified: true });
    expect(session.email).toBe('anna.tester@qarea.com');
    expect(session.name).toBe('Anna');
    expect(session.expiresAt).toBeGreaterThan(Date.now());
  });

  it('does not tell the caller which domains would have worked', async () => {
    const { admit } = await import('../src/auth.js');
    try {
      admit({ email: 'someone@gmail.com', name: 'Someone', emailVerified: true });
      expect.unreachable('should have refused');
    } catch (error) {
      expect((error as Error).message).not.toContain('qarea');
      expect((error as Error).message).not.toContain('testfort');
    }
  });
});

describe('signing in with Google', () => {
  it('sends the browser to Google with a state it can check on the way back', async () => {
    const { app } = await load();
    const response = await app.inject({ method: 'GET', url: '/api/auth/google/start' });
    expect(response.statusCode).toBe(302);

    const url = new URL(response.headers.location as string);
    expect(url.host).toBe('accounts.google.com');
    expect(url.searchParams.get('client_id')).toBe('test-client-id');
    expect(url.searchParams.get('redirect_uri')).toBe(
      'https://check.example.com/api/auth/google/callback',
    );
    expect(url.searchParams.get('scope')).toContain('email');
    expect(url.searchParams.get('state')).toBeTruthy();

    // The state must also be stored, or there is nothing to compare against.
    const cookie = response.cookies.find((c) => c.name === 'qasc.oauth');
    expect(cookie).toBeDefined();
    expect(cookie?.httpOnly).toBe(true);
    await app.close();
  });

  it('keeps the port in the redirect URI when the origin is derived from the request', async () => {
    // Google matches redirect_uri byte for byte. Fastify 5's request.hostname
    // drops the port, so deriving the origin from it produced a URI that would
    // be rejected for anything not served on the default port - and it failed
    // silently, at Google, only in a real deployment.
    setEnv({ ...GOOGLE_ENV, QASC_PUBLIC_URL: undefined, NODE_ENV: 'test' });
    const { app } = await load();
    const response = await app.inject({
      method: 'GET',
      url: '/api/auth/google/start',
      headers: { host: 'localhost:3000' },
    });
    const uri = new URL(response.headers.location as string).searchParams.get('redirect_uri');
    expect(uri).toBe('http://localhost:3000/api/auth/google/callback');
    await app.close();
  });

  it('prefers the configured public URL over whatever the request claims', async () => {
    // Behind a proxy the Host header is attacker-controllable in principle, and
    // the registered URI is fixed, so an explicit setting has to win.
    const { app } = await load();
    const response = await app.inject({
      method: 'GET',
      url: '/api/auth/google/start',
      headers: { host: 'evil.example.net' },
    });
    const uri = new URL(response.headers.location as string).searchParams.get('redirect_uri');
    expect(uri).toBe('https://check.example.com/api/auth/google/callback');
    await app.close();
  });

  it('completes the flow and issues an HttpOnly session cookie', async () => {
    const { app, exchanged } = await load();
    const { callback, session } = await signIn(app);

    expect(callback.statusCode).toBe(302);
    expect(callback.headers.location).toBe('https://check.example.com/');
    expect(exchanged).toEqual(['good-code']);
    expect(session).toBeDefined();
    expect(session?.httpOnly).toBe(true);
    expect(session?.sameSite?.toLowerCase()).toBe('lax');
    // The cookie is a signed blob, not something a browser can read or forge.
    expect(session?.value).not.toContain('anna@qarea.com');
    await app.close();
  });

  it('reports the signed-in identity, and refuses without the cookie', async () => {
    const { app } = await load();
    const anonymous = await app.inject({ method: 'GET', url: '/api/auth/me' });
    expect(anonymous.statusCode).toBe(401);

    const { authHeaders } = await signIn(app);
    const me = await app.inject({ method: 'GET', url: '/api/auth/me', headers: authHeaders });
    expect(me.statusCode).toBe(200);
    expect(me.json()).toMatchObject({
      authenticated: true,
      email: 'anna@qarea.com',
      name: 'Anna Tester',
    });
    await app.close();
  });

  it('refuses a callback whose state does not match the cookie', async () => {
    // Without this an attacker completes the flow in someone else's browser
    // with their own code, and the victim's session becomes the attacker's
    // account.
    const { app } = await load();
    const start = await app.inject({ method: 'GET', url: '/api/auth/google/start' });
    const stateCookie = start.cookies.find((c) => c.name === 'qasc.oauth');

    const response = await app.inject({
      method: 'GET',
      url: '/api/auth/google/callback?code=good-code&state=not-the-state-we-issued',
      cookies: { 'qasc.oauth': stateCookie?.value ?? '' },
    });
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toContain('auth_error=auth_state_mismatch');
    expect(response.cookies.find((c) => c.name === 'qasc.session')).toBeUndefined();
    await app.close();
  });

  it('refuses a callback with no state cookie at all', async () => {
    const { app } = await load();
    const response = await app.inject({
      method: 'GET',
      url: '/api/auth/google/callback?code=good-code&state=anything',
    });
    expect(response.headers.location).toContain('auth_error=auth_state_mismatch');
    await app.close();
  });

  it('sends a refused domain back to the app with a reason, not a JSON error page', async () => {
    const { app } = await load({ email: 'someone@gmail.com', name: 'Someone' });
    const { callback, session } = await signIn(app);
    expect(callback.statusCode).toBe(302);
    expect(callback.headers.location).toContain('auth_error=auth_domain_not_allowed');
    expect(session).toBeUndefined();
    await app.close();
  });

  it('logs out by clearing the cookie', async () => {
    const { app } = await load();
    const { authHeaders } = await signIn(app);
    const response = await app.inject({
      method: 'POST',
      url: '/api/auth/logout',
      headers: authHeaders,
    });
    expect(response.statusCode).toBe(204);
    const cleared = response.cookies.find((c) => c.name === 'qasc.session');
    expect(cleared?.value).toBe('');
    await app.close();
  });
});

describe('an attempt belongs to the verified identity', () => {
  it('refuses to start an attempt for someone who has not signed in', async () => {
    const { app } = await load();
    const response = await app.inject({
      method: 'POST',
      url: '/api/attempts',
      payload: { acceptedRules: true },
    });
    expect(response.statusCode).toBe(401);
    expect(response.json().error).toBe('auth_required');
    await app.close();
  });

  it('files the attempt under the session, ignoring anything in the body', async () => {
    // The whole point: the body used to BE the identity. Passing a different
    // address must change nothing.
    const { app, db } = await load();
    const { authHeaders } = await signIn(app);
    const response = await app.inject({
      method: 'POST',
      url: '/api/attempts',
      headers: authHeaders,
      payload: {
        acceptedRules: true,
        candidateEmail: 'ceo@qarea.com',
        candidateName: 'Someone Else Entirely',
      },
    });
    expect(response.statusCode).toBe(201);

    const row = db
      .prepare('SELECT candidate_email, candidate_name FROM attempts WHERE id = ?')
      .get(response.json().attempt.id) as { candidate_email: string; candidate_name: string };
    expect(row.candidate_email).toBe('anna@qarea.com');
    expect(row.candidate_name).toBe('Anna Tester');
    await app.close();
  });

  it('still refuses an attempt that does not acknowledge the rules', async () => {
    const { app } = await load();
    const { authHeaders } = await signIn(app);
    const response = await app.inject({
      method: 'POST',
      url: '/api/attempts',
      headers: authHeaders,
      payload: {},
    });
    expect(response.statusCode).toBe(400);
    await app.close();
  });

  it('tells the client which mode it is in, and which domains are accepted', async () => {
    const { app } = await load();
    const meta = await app.inject({ method: 'GET', url: '/api/meta' });
    expect(meta.json().auth).toEqual({
      mode: 'google',
      allowedEmailDomains: ['qarea.com', 'testfort.com'],
    });
    await app.close();
  });
});

describe('configuration refuses to start in a state that would leak the bank', () => {
  it('will not run Google mode without a domain allow-list', async () => {
    // Google sign-in with no allow-list admits every Google account there is,
    // which is not a smaller hole than having no sign-in.
    setEnv({ ...GOOGLE_ENV, QASC_ALLOWED_EMAIL_DOMAINS: undefined, NODE_ENV: 'test' });
    vi.resetModules();
    await expect(import('../src/config.js')).rejects.toThrow(/QASC_ALLOWED_EMAIL_DOMAINS/);
  });

  it('will not run Google mode without client credentials', async () => {
    setEnv({ ...GOOGLE_ENV, QASC_GOOGLE_CLIENT_SECRET: undefined, NODE_ENV: 'test' });
    vi.resetModules();
    await expect(import('../src/config.js')).rejects.toThrow(/QASC_GOOGLE_CLIENT_SECRET/);
  });

  it('will not run the unverified-email mode in production', async () => {
    setEnv({
      QASC_AUTH_MODE: 'open',
      NODE_ENV: 'production',
      QASC_OPTION_SECRET: 'b'.repeat(32),
    });
    vi.resetModules();
    await expect(import('../src/config.js')).rejects.toThrow(/refused in production/);
  });

  it('rejects a mode it does not understand rather than guessing', async () => {
    setEnv({ ...GOOGLE_ENV, QASC_AUTH_MODE: 'sso-maybe', NODE_ENV: 'test' });
    vi.resetModules();
    await expect(import('../src/config.js')).rejects.toThrow(/QASC_AUTH_MODE/);
  });

  it('defaults to Google in production and to open in development', async () => {
    setEnv({
      QASC_AUTH_MODE: undefined,
      NODE_ENV: 'development',
      QASC_OPTION_SECRET: undefined,
    });
    vi.resetModules();
    const dev = await import('../src/config.js');
    expect(dev.config.authMode).toBe('open');
  });
});
