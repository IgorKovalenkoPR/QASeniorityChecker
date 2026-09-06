import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import fastifyStatic from '@fastify/static';
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import { validateBank } from '@qasc/content';
import { config } from './config.js';
import { getDatabase, openDatabase } from './db.js';
import type { Db } from './db.js';
import { registerAuthRoutes } from './authRoutes.js';
import type { CodeExchanger } from './auth.js';
import { registerAdminRoutes, registerRoutes } from './routes.js';
import { startExportFlusher } from './sheetOutbox.js';

export interface AppDeps {
  /**
   * Overrides the Google authorization-code exchange. Only tests pass this:
   * everything worth testing about the callback - state checking, the domain
   * rules, the cookie, the error mapping - is independent of the exchange.
   */
  exchangeCode?: CodeExchanger;
}

export function buildApp(db: Db = getDatabase(), deps: AppDeps = {}): FastifyInstance {
  // Fail fast rather than serving a subtly broken paper to a real candidate.
  const problems = validateBank();
  if (problems.length > 0) {
    throw new Error(`Question bank is invalid:\n  ${problems.join('\n  ')}`);
  }

  const app = Fastify({
    logger: process.env.NODE_ENV === 'test' ? false : { level: process.env.LOG_LEVEL ?? 'info' },
    // Trust the proxy for rate limiting when deployed behind one.
    trustProxy: true,
  });

  app.register(cors, {
    origin: config.corsOrigin === '*' ? true : config.corsOrigin.split(',').map((s) => s.trim()),
    credentials: false,
  });

  // Blunts the "script the API instead of taking the test" approach, and stops a
  // stuck client from hammering the integrity endpoint.
  app.register(rateLimit, {
    max: 600,
    timeWindow: '1 minute',
    allowList: () => process.env.NODE_ENV === 'test',
  });

  // Signed cookies carry the session. Registered before the routes that read
  // them, and with the same secret that survives a deploy - rotating it logs
  // everyone out mid-test.
  app.register(cookie, { secret: config.sessionSecret });

  app.register(async (instance) => {
    registerRoutes(instance, db);
    registerAuthRoutes(instance, deps.exchangeCode);
    registerAdminRoutes(instance, db);
  });

  const here = dirname(fileURLToPath(import.meta.url));
  const webRoot = resolve(here, '..', config.webDist);
  if (existsSync(webRoot)) {
    app.register(fastifyStatic, { root: webRoot });
    // SPA fallback: anything that is not an API route serves index.html.
    app.setNotFoundHandler((request, reply) => {
      if (request.url.startsWith('/api/')) {
        return reply.code(404).send({ error: 'not_found' });
      }
      return reply.sendFile('index.html');
    });
  }

  return app;
}

/** Test helper: a fully wired app over an isolated in-memory database. */
export function buildTestApp(deps: AppDeps = {}): { app: FastifyInstance; db: Db } {
  const db = openDatabase(':memory:');
  return { app: buildApp(db, deps), db };
}

// pathToFileURL, not string-concatenating a file:// prefix onto resolve():
// on Windows resolve() returns a drive path with backslash separators and no
// leading slash, which never equals the three-slash POSIX form Node puts in
// import.meta.url. The comparison was therefore always false on Windows, and
// the process exited 0 without ever listening - so the API could not be run on
// a Windows host at all. It only ever worked in Docker and CI, which is why
// this went unnoticed.
const isEntrypoint =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isEntrypoint) {
  const app = buildApp();

  // Started here rather than in buildApp so the test suite does not acquire a
  // background timer per app it builds. Rows queue with or without
  // credentials; this only drains them.
  startExportFlusher(getDatabase(), (message, detail) => {
    if (detail === undefined) app.log.info(message);
    else app.log.warn(detail, message);
  });
  app
    .listen({ port: config.port, host: config.host })
    .then(() => {
      app.log.info(
        `QA Seniority Checker API listening on ${config.host}:${config.port} ` +
          `(attempt budget ${config.attemptDurationSec}s)`,
      );
    })
    .catch((error: unknown) => {
      app.log.error(error);
      process.exit(1);
    });
}
