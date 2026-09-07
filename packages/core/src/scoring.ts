import { COMPETENCY_BY_ID } from './competencies.js';
import { describeGap, nextRule, resolveLevel } from './levels.js';
import { TIERS } from './types.js';
import type {
  CompetencyScore,
  Question,
  ScoreBreakdown,
  Tier,
  TierScore,
} from './types.js';

/** What the candidate ticked: question id -> selected option ids. */
export type AnswerSheet = Record<string, string[]>;

function sameSet(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  const set = new Set(a);
  return b.every((x) => set.has(x));
}

/**
 * A question is correct only when the selection matches the key exactly.
 * Partial credit is deliberately not given: on a multi-select question,
 * "I ticked the two obvious ones and missed the third" is the difference
 * between knowing a technique and recognising it.
 */
export function isCorrect(question: Question, selected: readonly string[] | undefined): boolean {
  if (!selected || selected.length === 0) return false;
  return sameSet(question.correctOptionIds, selected);
}

function pct(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 1000) / 10;
}

export function scoreAttempt(questions: readonly Question[], answers: AnswerSheet): ScoreBreakdown {
  const tiers = Object.fromEntries(
    TIERS.map((t) => [t, { tier: t, correct: 0, total: 0, percent: 0 } as TierScore]),
  ) as Record<Tier, TierScore>;

  const byCompetency = new Map<string, { correct: number; total: number }>();
  let correct = 0;

  for (const q of questions) {
    const ok = isCorrect(q, answers[q.id]);
    if (ok) correct += 1;

    const tier = tiers[q.tier];
    tier.total += 1;
    if (ok) tier.correct += 1;

    const comp = byCompetency.get(q.competencyId) ?? { correct: 0, total: 0 };
    comp.total += 1;
    if (ok) comp.correct += 1;
    byCompetency.set(q.competencyId, comp);
  }

  for (const t of TIERS) {
    tiers[t].percent = pct(tiers[t].correct, tiers[t].total);
  }

  const percents = Object.fromEntries(TIERS.map((t) => [t, tiers[t].percent])) as Record<Tier, number>;
  const rule = resolveLevel(percents);
  const next = nextRule(rule.level);

  const competencies: CompetencyScore[] = [...byCompetency.entries()]
    .map(([competencyId, agg]) => {
      const meta = COMPETENCY_BY_ID.get(competencyId);
      return {
        competencyId,
        label: meta?.label ?? competencyId,
        group: meta?.group ?? 'theory',
        tier: meta?.tier ?? 'trainee',
        correct: agg.correct,
        total: agg.total,
        percent: pct(agg.correct, agg.total),
      } satisfies CompetencyScore;
    })
    .sort((a, b) => a.percent - b.percent || a.label.localeCompare(b.label));

  return {
    level: rule.level,
    tiers,
    competencies,
    correct,
    total: questions.length,
    percent: pct(correct, questions.length),
    nextLevel: next?.level ?? null,
    nextLevelGap: describeGap(rule.level, percents),
  };
}

/** Strips the answer key. The only safe way to send a question to a browser. */
export function toPublicQuestion(q: Question) {
  return {
    id: q.id,
    tier: q.tier,
    competencyId: q.competencyId,
    source: q.source,
    text: q.text,
    options: q.options,
    multiSelect: q.correctOptionIds.length > 1,
  };
}
