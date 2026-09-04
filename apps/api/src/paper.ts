import { createHmac, timingSafeEqual } from 'node:crypto';
import type { Question } from '@qasc/core';
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
  text: string;
  options: { id: string; text: string }[];
  multiSelect: boolean;
  /**
   * Tier and competency are included so the candidate can see what a question is
   * about. They reveal nothing about the answer, and hiding them would make the
   * result page impossible to explain.
   */
  tier: string;
  competencyId: string;
  source: string;
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

/** Builds the candidate-facing paper: opaque option ids, shuffled option order. */
export function buildPaper(attemptId: string, variantNumber: number): PaperQuestion[] {
  return variantQuestions(variantNumber).map((q, index) => {
    const order = shuffle(q.options, createRng(`${attemptId}:${q.id}`));
    return {
      id: q.id,
      index: index + 1,
      text: q.text,
      options: order.map((o) => ({ id: opaqueOptionId(attemptId, q.id, o.id), text: o.text })),
      multiSelect: q.correctOptionIds.length > 1,
      tier: q.tier,
      competencyId: q.competencyId,
      source: q.source,
    } satisfies PaperQuestion;
  });
}
