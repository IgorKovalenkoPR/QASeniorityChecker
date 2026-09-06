# syntax=docker/dockerfile:1

# ---------------------------------------------------------------- builder ---
# Build tools are needed because better-sqlite3 compiles a native addon when no
# prebuilt binary matches. Doing it here keeps them out of the runtime image.
FROM node:22-bookworm-slim AS builder

RUN apt-get update \
 && apt-get install -y --no-install-recommends python3 make g++ ca-certificates \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Manifests first: this layer only changes when dependencies change, so an
# ordinary source edit reuses the (slow) install layer.
COPY package.json package-lock.json ./
COPY packages/core/package.json      packages/core/
COPY packages/content/package.json   packages/content/
COPY apps/api/package.json           apps/api/
COPY apps/web/package.json           apps/web/

RUN npm ci

COPY . .

# Builds the SPA into apps/web/dist. The API is run from TypeScript source by
# tsx, so there is nothing to compile for it.
RUN npm run build

# Strips vite, typescript and vitest but keeps the already-compiled
# better-sqlite3 addon, so the runtime stage needs no compiler.
RUN npm prune --omit=dev


# ---------------------------------------------------------------- runtime ---
FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0 \
    # Absolute, because the default is relative to the working directory and
    # this path is where the volume gets mounted.
    QASC_DB=/app/data/qasc.db

WORKDIR /app

COPY --from=builder --chown=node:node /app /app

# The image ships the directory so the server can write even when no volume is
# mounted; compose mounts one over it for persistence.
RUN mkdir -p /app/data && chown node:node /app/data

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# NOT `npm start`: the root start script rebuilds the SPA first, and vite was
# pruned from this image. The SPA is already built into apps/web/dist, so the
# container starts the API directly and lets it serve those files.
CMD ["npm", "run", "start", "-w", "@qasc/api"]
