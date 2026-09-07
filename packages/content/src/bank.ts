import type { Question, QuestionSource, Tier } from '@qasc/core';
import { COMPETENCY_BY_ID, TIERS } from '@qasc/core';
import { dumpJuniorQuestions, dumpMiddleQuestions, dumpTraineeQuestions } from './questions/dumps.js';
import {
  glossaryJuniorQuestions,
  glossaryMiddleQuestions,
  glossaryTraineeQuestions,
} from './questions/glossary.js';
import { juniorCtflQuestions } from './questions/junior-istqb-ctfl.js';
import { juniorPrQuestions } from './questions/junior-pr.js';
import { middleCtalTaQuestions } from './questions/middle-istqb-ctal-ta.js';
import { middlePrQuestions } from './questions/middle-pr.js';
import { seniorCtalTaQuestions } from './questions/senior-istqb-ctal-ta.js';
import { seniorCtalTmQuestions } from './questions/senior-istqb-ctal-tm.js';
import { seniorPrQuestions } from './questions/senior-pr.js';
import { traineePrQuestions } from './questions/trainee-pr.js';

/** The complete question bank, in a stable, declaration-ordered sequence. */
export const QUESTION_BANK: readonly Question[] = Object.freeze([
  ...traineePrQuestions,
  ...glossaryTraineeQuestions,
  ...dumpTraineeQuestions,
  ...juniorPrQuestions,
  ...juniorCtflQuestions,
  ...glossaryJuniorQuestions,
  ...dumpJuniorQuestions,
  ...middlePrQuestions,
  ...middleCtalTaQuestions,
  ...glossaryMiddleQuestions,
  ...dumpMiddleQuestions,
  ...seniorPrQuestions,
  ...seniorCtalTmQuestions,
  ...seniorCtalTaQuestions,
]);

export const QUESTION_BY_ID: ReadonlyMap<string, Question> = new Map(
  QUESTION_BANK.map((q) => [q.id, q]),
);

export interface BankStats {
  total: number;
  byTier: Record<Tier, number>;
  bySource: Record<QuestionSource, number>;
  byCompetency: Record<string, number>;
}

export function bankStats(bank: readonly Question[] = QUESTION_BANK): BankStats {
  const byTier = Object.fromEntries(TIERS.map((t) => [t, 0])) as Record<Tier, number>;
  const bySource: Record<string, number> = {};
  const byCompetency: Record<string, number> = {};
  for (const q of bank) {
    byTier[q.tier] += 1;
    bySource[q.source] = (bySource[q.source] ?? 0) + 1;
    byCompetency[q.competencyId] = (byCompetency[q.competencyId] ?? 0) + 1;
  }
  return {
    total: bank.length,
    byTier,
    bySource: bySource as Record<QuestionSource, number>,
    byCompetency,
  };
}

/**
 * Structural checks that must hold before the bank can be served. Run by the
 * test suite and by the API on boot, so a bad edit fails fast rather than
 * producing a subtly broken paper for a real candidate.
 */
export function validateBank(bank: readonly Question[] = QUESTION_BANK): string[] {
  const problems: string[] = [];
  const seenIds = new Set<string>();
  const seenText = new Map<string, string>();

  for (const q of bank) {
    if (seenIds.has(q.id)) problems.push(`Duplicate question id: ${q.id}`);
    seenIds.add(q.id);

    const normalised = q.text.uk.trim().toLowerCase().replace(/\s+/g, ' ');
    const previous = seenText.get(normalised);
    if (previous) problems.push(`Duplicate question text in ${previous} and ${q.id}`);
    seenText.set(normalised, q.id);

    const competency = COMPETENCY_BY_ID.get(q.competencyId);
    if (!competency) {
      problems.push(`${q.id}: unknown competency "${q.competencyId}"`);
    }

    if (q.correctOptionIds.length === 0) problems.push(`${q.id}: no correct option`);
    if (q.explanation.uk.trim().length < 20) problems.push(`${q.id}: explanation too short to be useful`);

    const optionTexts = new Set(q.options.map((o) => o.text.uk.trim().toLowerCase()));
    if (optionTexts.size !== q.options.length) problems.push(`${q.id}: duplicate option text`);

    for (const id of q.correctOptionIds) {
      if (!q.options.some((o) => o.id === id)) {
        problems.push(`${q.id}: correct option "${id}" is not in the option list`);
      }
    }
  }
  return problems;
}
