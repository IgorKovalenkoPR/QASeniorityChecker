import { BLUEPRINT, QUESTIONS_PER_VARIANT, VARIANT_COUNT } from './blueprint.js';
import { createRng, shuffle } from './rng.js';
import type { Question, QuestionSource, Tier, Variant } from './types.js';

const SEED_PREFIX = 'qasc-variants-v1';

interface Pool {
  /** Questions still unused in the current pass, in shuffled order. */
  queue: Question[];
  /** Full shuffled list, used to refill `queue` when it runs dry. */
  all: Question[];
  cursor: number;
}

function poolKey(tier: Tier, sources: readonly QuestionSource[]): string {
  return `${tier}::${sources.slice().sort().join('+')}`;
}

/**
 * Round-robin draw with wrap-around.
 *
 * Draining a shuffled list before reshuffling it (rather than sampling with
 * replacement) is what keeps usage even: with N questions and M slots every
 * question is used either floor(M/N) or ceil(M/N) times, never zero and never
 * three times while its neighbour is used once.
 */
function draw(pool: Pool, taken: Set<string>, rng: () => number): Question {
  for (let attempts = 0; attempts < pool.all.length * 2 + 2; attempts += 1) {
    if (pool.cursor >= pool.queue.length) {
      pool.queue = shuffle(pool.all, rng);
      pool.cursor = 0;
    }
    const q = pool.queue[pool.cursor]!;
    pool.cursor += 1;
    if (!taken.has(q.id)) return q;
  }
  throw new Error(
    `Cannot fill a blueprint slot without repeating a question inside one variant. ` +
      `The pool has only ${pool.all.length} questions; widen the bank.`,
  );
}

/**
 * Build the full, fixed set of test papers.
 *
 * Deterministic: same bank + same seed => same 50 variants, every time. That is
 * what lets the API store just a variant number on an attempt and reconstruct
 * the exact paper later, and what lets a reviewer re-read a six-month-old
 * result and see the questions the candidate actually saw.
 */
export function buildVariants(
  bank: readonly Question[],
  options: { count?: number; seed?: string } = {},
): Variant[] {
  const count = options.count ?? VARIANT_COUNT;
  const seed = options.seed ?? SEED_PREFIX;
  const rng = createRng(seed);

  const pools = new Map<string, Pool>();
  for (const slot of BLUEPRINT) {
    const key = poolKey(slot.tier, slot.sources);
    if (pools.has(key)) continue;
    const matching = bank.filter(
      (q) => q.tier === slot.tier && slot.sources.includes(q.source),
    );
    if (matching.length < slot.count) {
      throw new Error(
        `Blueprint slot ${key} needs ${slot.count} questions per variant but the bank has only ${matching.length}.`,
      );
    }
    const all = shuffle(matching, rng);
    pools.set(key, { all, queue: all, cursor: 0 });
  }

  const variants: Variant[] = [];
  for (let n = 1; n <= count; n += 1) {
    const taken = new Set<string>();
    const picked: Question[] = [];
    for (const slot of BLUEPRINT) {
      const pool = pools.get(poolKey(slot.tier, slot.sources))!;
      for (let i = 0; i < slot.count; i += 1) {
        const q = draw(pool, taken, rng);
        taken.add(q.id);
        picked.push(q);
      }
    }
    if (picked.length !== QUESTIONS_PER_VARIANT) {
      throw new Error(`Variant ${n} produced ${picked.length} questions, expected ${QUESTIONS_PER_VARIANT}.`);
    }
    // Interleave so the paper does not walk monotonically from easy to hard:
    // a candidate who stalls on question 18 should not be able to infer that
    // everything after it is senior-tier and give up.
    const ordered = shuffle(picked, createRng(`${seed}:order:${n}`));
    variants.push({
      number: n,
      id: `V${String(n).padStart(2, '0')}`,
      title: `Variant ${n}`,
      questionIds: ordered.map((q) => q.id),
    });
  }
  return variants;
}

/** Usage histogram, used by the bank-health test and the admin screen. */
export function variantUsage(variants: readonly Variant[]): Map<string, number> {
  const usage = new Map<string, number>();
  for (const v of variants) {
    for (const id of v.questionIds) usage.set(id, (usage.get(id) ?? 0) + 1);
  }
  return usage;
}
