/**
 * Deterministic PRNG. The 50 variants must be byte-identical on every machine
 * and across every rebuild, otherwise a candidate who reloads or a reviewer who
 * re-opens an old attempt would see a different paper. Math.random cannot give
 * that, so we seed a small, well-behaved 32-bit generator instead.
 */

/** FNV-1a: turns a human-readable seed string into a 32-bit integer. */
export function hashSeed(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32 - 32-bit state, passes gjrand, plenty for shuffling a question bank. */
export function createRng(seed: string | number): () => number {
  let a = (typeof seed === 'string' ? hashSeed(seed) : seed) >>> 0;
  return function next(): number {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher-Yates. Returns a new array; the input is left untouched. */
export function shuffle<T>(items: readonly T[], rng: () => number): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const a = out[i]!;
    const b = out[j]!;
    out[i] = b;
    out[j] = a;
  }
  return out;
}
