import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import fastifyStatic from '@fastify/static';
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import { validateBank } from '@qasc/content';
import { config } from './config.js';
import { getDatabase, openDatabase } from './db.js';
import type { Db } from './db.js';
import { registerAdminRoutes, registerRoutes } from './routes.js';

export function buildApp(db: Db = getDatabase()): FastifyInstance {
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

  app.register(async (instance) => {
    registerRoutes(instance, db);
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
export function buildTestApp(): { app: FastifyInstance; db: Db } {
  const db = openDatabase(':memory:');
  return { app: buildApp(db), db };
}

const isEntrypoint = process.argv[1] && import.meta.url === `file://${resolve(process.argv[1])}`;

if (isEntrypoint) {
  const app = buildApp();
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
