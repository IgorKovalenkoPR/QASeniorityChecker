import { buildVariants } from '@qasc/core';
import type { Variant } from '@qasc/core';
import { QUESTION_BANK } from './bank.js';

export * from './bank.js';
export * from './define.js';

/**
 * The 50 fixed test papers.
 *
 * Built once at module load from the frozen bank and a fixed seed, so every
 * process in every environment produces byte-identical variants. An attempt
 * therefore only needs to store a variant number to be fully reconstructible.
 */
export const VARIANTS: readonly Variant[] = Object.freeze(buildVariants(QUESTION_BANK));

export const VARIANT_BY_NUMBER: ReadonlyMap<number, Variant> = new Map(
  VARIANTS.map((v) => [v.number, v]),
);
