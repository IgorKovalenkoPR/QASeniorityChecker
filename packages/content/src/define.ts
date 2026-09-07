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

/**
 * The English side of one question.
 *
 * Kept in its own file per question set rather than inline in the tuples. The
 * bank was written Ukrainian-first, the tuples are dense, and interleaving two
 * languages in them would have made every future edit touch both - and made a
 * diff of "we reworded one question" unreadable. Keyed by question id, so a
 * translation for an id that no longer exists is caught rather than ignored.
 */
export interface QuestionTranslation {
  text: string;
  /** Same order and length as the Ukrainian options. */
  options: readonly string[];
  explanation: string;
}

export type TranslationMap = Readonly<Record<string, QuestionTranslation>>;

/**
 * Question ids whose English side is still the Ukrainian text.
 *
 * Populated as the bank is defined, so coverage is a fact about the loaded
 * bank rather than a grep. `validateBank` reports it and a test asserts it is
 * empty, which is what stops a half-finished translation from shipping quietly.
 */
const untranslated = new Set<string>();

export function untranslatedQuestionIds(): string[] {
  return [...untranslated].sort();
}

export function defineQuestions(
  tier: Tier,
  source: QuestionSource,
  specs: readonly QuestionSpec[],
  translations: TranslationMap = {},
): Question[] {
  const seen = new Set<string>();
  const result = specs.map(([id, competencyId, text, options, correct, explanation]) => {
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
    // A missing translation falls back to the Ukrainian text rather than to an
    // empty string: a candidate reading a question in the wrong language is a
    // problem, a candidate reading a blank one is a broken test.
    const en = translations[id];
    seen.add(id);
    if (!en) untranslated.add(id);
    if (en && en.options.length !== options.length) {
      throw new Error(
        `${id}: translation has ${en.options.length} options, the question has ${options.length}`,
      );
    }

    return {
      id,
      tier,
      competencyId,
      source,
      text: { uk: text, en: en?.text ?? text },
      options: options.map((optionText, i) => ({
        id: OPTION_IDS[i]!,
        text: { uk: optionText, en: en?.options[i] ?? optionText },
      })),
      correctOptionIds: correctIndexes.map((i) => OPTION_IDS[i]!),
      explanation: { uk: explanation, en: en?.explanation ?? explanation },
    } satisfies Question;
  });

  // A translation keyed to an id that is not in this set is almost always a
  // typo in the id, which would otherwise silently leave a question untranslated.
  for (const id of Object.keys(translations)) {
    if (!seen.has(id)) {
      throw new Error(`translation for unknown question id "${id}" in ${tier}/${source}`);
    }
  }

  return result;
}
