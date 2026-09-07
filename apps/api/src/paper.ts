import { createHmac, timingSafeEqual } from 'node:crypto';
import type { Question } from '@qasc/core';
import type { LocalizedText } from '@qasc/core';
import { createRng, shuffle } from '@qasc/core';
import { QUESTION_BY_ID, VARIANT_BY_NUMBER } from '@qasc/content';
import { config } from './config.js';

/**
 * Per-attempt option identity.
 *
 * The bank uses stable option ids ('a'..'d'). If those were sent to the browser,
 * one candidate could publish "V07 Q3 = c" and every later candidate drawing
 * variant 7 would benefit. Instead every attempt sees its own opaque ids, derived
 * as HMAC(secret, attemptId | questionId | realOptionId). Consequences:
 *
 *   - A leaked id is worthless in any other attempt.
 *   - There is no small id space to brute-force: the client can only echo back
 *     ids the server gave it, and anything else resolves to nothing.
 *   - The mapping is computed, not stored, so it survives a restart and costs
 *     no rows.
 *
 * Option ORDER is shuffled per attempt as well, so screenshots of "the third
 * option" do not transfer either.
 */
export function opaqueOptionId(attemptId: string, questionId: string, optionId: string): string {
  return createHmac('sha256', config.optionSecret)
    .update(`${attemptId} ${questionId} ${optionId}`)
    .digest('hex')
    .slice(0, 16);
}

function constantTimeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Maps opaque ids from a client back to real option ids. Unknown ids are dropped. */
export function resolveOptionIds(
  attemptId: string,
  question: Question,
  opaqueIds: readonly string[],
): string[] {
  const resolved: string[] = [];
  for (const candidate of opaqueIds) {
    for (const option of question.options) {
      if (constantTimeEquals(opaqueOptionId(attemptId, question.id, option.id), candidate)) {
        resolved.push(option.id);
        break;
      }
    }
  }
  return [...new Set(resolved)];
}

/** Question shape sent to the browser. Carries no answer key, by construction. */
export interface PaperQuestion {
  id: string;
  index: number;
  /**
   * Both languages travel to the browser, and the browser picks.
   *
   * The alternative - the client telling the server its locale - would have made
   * the paper depend on a preference, so switching language mid-test would need a
   * round trip and could hand out a different paper. Two short strings per option
   * is a cheap way to make the language a purely local choice.
   */
  text: LocalizedText;
  options: { id: string; text: LocalizedText }[];
  multiSelect: boolean;
  /**
   * Tier, competency and source are deliberately NOT here.
   *
   * They used to be, on the argument that they tell the candidate what a
   * question is about and give nothing away about the answer. Both halves were
   * wrong. They tell a candidate which questions are the hard ones and which
   * syllabus each came from while the timer is running, which invites spending
   * the remaining minutes strategically instead of answering honestly - and
   * removing them from the screen alone would have left the same information one
   * devtools tab away.
   *
   * Nothing is lost on the result page: `ResultQuestion` reads all three from the
   * bank when the result is built, so the rung stays fully explainable.
   */
}

/** The ordered questions of a variant, as stored in the bank. */
export function variantQuestions(variantNumber: number): Question[] {
  const variant = VARIANT_BY_NUMBER.get(variantNumber);
  if (!variant) throw new Error(`Unknown variant number ${variantNumber}`);
  return variant.questionIds.map((id) => {
    const q = QUESTION_BY_ID.get(id);
    if (!q) throw new Error(`Variant ${variantNumber} references unknown question ${id}`);
    return q;
  });
}

/**
 * Builds the candidate-facing paper: shuffled question order, opaque option ids,
 * shuffled option order.
 *
 * The question ORDER is per attempt, not per variant. Two candidates who draw
 * the same paper therefore still see a different sequence, so "the first
 * question is about CDNs" transfers to nobody - and neither does a screenshot
 * of a numbered list. It is seeded from the attempt id rather than randomised
 * per call, because this function runs again on every resume and a paper that
 * reshuffled itself after a reload would be a different test.
 *
 * The variant itself is untouched: `VARIANTS` is generated from the fixed seed
 * and `docs/variants.md` still regenerates byte for byte.
 */
export function buildPaper(attemptId: string, variantNumber: number): PaperQuestion[] {
  const ordered = shuffle(variantQuestions(variantNumber), createRng(`${attemptId}:order`));
  return ordered.map((q, index) => {
    const order = shuffle(q.options, createRng(`${attemptId}:${q.id}`));
    return {
      id: q.id,
      index: index + 1,
      text: q.text,
      options: order.map((o) => ({ id: opaqueOptionId(attemptId, q.id, o.id), text: o.text })),
      multiSelect: q.correctOptionIds.length > 1,
    } satisfies PaperQuestion;
  });
}
