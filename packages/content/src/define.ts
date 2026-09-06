import type { Question, QuestionSource, Tier } from '@qasc/core';

/**
 * Authoring shape for a question.
 *
 * Tuples rather than objects: a 500-question bank written as object literals is
 * mostly punctuation, and the repetition hides typos. The tuple is checked at
 * runtime by `defineQuestions`, and the whole bank is validated by
 * `test/bank.test.ts` before it can ship.
 *
 *   [ id, competencyId, text, options, correctIndexes, explanation ]
 *
 * `correctIndexes` is 0-based and may hold more than one index, which makes the
 * question multi-select.
 */
export type QuestionSpec = readonly [
  id: string,
  competencyId: string,
  text: string,
  options: readonly string[],
  correct: number | readonly number[],
  explanation: string,
];

const OPTION_IDS = ['a', 'b', 'c', 'd', 'e', 'f'] as const;

export function defineQuestions(
  tier: Tier,
  source: QuestionSource,
  specs: readonly QuestionSpec[],
): Question[] {
  return specs.map(([id, competencyId, text, options, correct, explanation]) => {
    if (options.length < 2 || options.length > OPTION_IDS.length) {
      throw new Error(`${id}: expected 2..${OPTION_IDS.length} options, got ${options.length}`);
    }
    const correctIndexes = (Array.isArray(correct) ? correct : [correct]) as number[];
    for (const i of correctIndexes) {
      if (!Number.isInteger(i) || i < 0 || i >= options.length) {
        throw new Error(`${id}: correct index ${i} is outside the option list`);
      }
    }
    if (new Set(correctIndexes).size !== correctIndexes.length) {
      throw new Error(`${id}: duplicate correct index`);
    }
    if (correctIndexes.length === options.length) {
      throw new Error(`${id}: every option marked correct`);
    }
    return {
      id,
      tier,
      competencyId,
      source,
      text,
      options: options.map((optionText, i) => ({ id: OPTION_IDS[i]!, text: optionText })),
      correctOptionIds: correctIndexes.map((i) => OPTION_IDS[i]!),
      explanation,
    } satisfies Question;
  });
}
