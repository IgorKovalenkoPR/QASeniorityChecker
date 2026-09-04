import type { QuestionSource, Tier } from './types.js';

/**
 * Every one of the 50 variants is assembled from the same blueprint, so two
 * candidates who draw different papers are still measured on the same scale.
 *
 * Tier split: 4 Trainee / 6 Junior / 6 Middle / 4 Senior = 20 questions.
 * The middle of the ladder gets the most questions because that is where the
 * decision boundary usually sits, and because a tier's percentage is only as
 * trustworthy as the number of questions behind it - 4 questions give 25%
 * granularity, which is exactly the granularity the sheet's thresholds use.
 *
 * Source split honours the company's certification expectations:
 *   ISTQB Foundation Level  -> asked at the Junior tier (required for Junior)
 *   ISTQB Test Analyst      -> asked at the Middle and Senior tiers
 *   ISTQB Test Manager      -> asked at the Senior tier
 *   ISTQB Glossary          -> terminology spot-checks at Junior and Middle
 *   Practice-dump style     -> applied, scenario-shaped questions
 */
export interface BlueprintSlot {
  tier: Tier;
  /** The slot is filled from any one of these sources. */
  sources: readonly QuestionSource[];
  count: number;
}

export const BLUEPRINT: readonly BlueprintSlot[] = [
  { tier: 'trainee', sources: ['pr-matrix'], count: 3 },
  { tier: 'trainee', sources: ['practice-dump', 'istqb-glossary'], count: 1 },

  { tier: 'junior', sources: ['pr-matrix'], count: 3 },
  { tier: 'junior', sources: ['istqb-ctfl'], count: 2 },
  { tier: 'junior', sources: ['istqb-glossary', 'practice-dump'], count: 1 },

  { tier: 'middle', sources: ['pr-matrix'], count: 3 },
  { tier: 'middle', sources: ['istqb-ctal-ta'], count: 2 },
  { tier: 'middle', sources: ['istqb-glossary', 'practice-dump'], count: 1 },

  { tier: 'senior', sources: ['pr-matrix'], count: 2 },
  { tier: 'senior', sources: ['istqb-ctal-tm'], count: 1 },
  { tier: 'senior', sources: ['istqb-ctal-ta', 'istqb-ctal-tm'], count: 1 },
] as const;

export const QUESTIONS_PER_VARIANT = BLUEPRINT.reduce((n, s) => n + s.count, 0);
export const VARIANT_COUNT = 50;

/** Questions per tier, derived from the blueprint rather than hard-coded. */
export const TIER_QUOTA: Record<Tier, number> = BLUEPRINT.reduce(
  (acc, slot) => {
    acc[slot.tier] += slot.count;
    return acc;
  },
  { trainee: 0, junior: 0, middle: 0, senior: 0 } as Record<Tier, number>,
);
