import { describe, expect, it } from 'vitest';
import { LEVEL_RULES, describeGap, resolveLevel } from '../src/levels.js';
import { isCorrect, scoreAttempt } from '../src/scoring.js';
import type { AnswerSheet, Level, Question, Tier } from '../src/index.js';

function question(id: string, tier: Tier, correct: string[] = ['a']): Question {
  return {
    id,
    tier,
    competencyId: 'test-artifacts',
    source: 'pr-matrix',
    text: `Question ${id}`,
    options: [
      { id: 'a', text: 'A' },
      { id: 'b', text: 'B' },
      { id: 'c', text: 'C' },
      { id: 'd', text: 'D' },
    ],
    correctOptionIds: correct,
    explanation: 'Because that is how it works, for a reason long enough to be useful.',
  };
}

/** A 4/6/6/4 paper matching the real blueprint. */
function paper(): Question[] {
  const out: Question[] = [];
  const quota: Record<Tier, number> = { trainee: 4, junior: 6, middle: 6, senior: 4 };
  for (const [tier, count] of Object.entries(quota) as [Tier, number][]) {
    for (let i = 0; i < count; i += 1) out.push(question(`${tier}-${i}`, tier));
  }
  return out;
}

/** Answer the first `n` questions of each tier correctly, the rest wrongly. */
function answerSheet(correctPerTier: Partial<Record<Tier, number>>): AnswerSheet {
  const sheet: AnswerSheet = {};
  const counters: Record<string, number> = {};
  for (const q of paper()) {
    counters[q.tier] = (counters[q.tier] ?? 0) + 1;
    const wanted = correctPerTier[q.tier] ?? 0;
    sheet[q.id] = counters[q.tier]! <= wanted ? ['a'] : ['b'];
  }
  return sheet;
}

describe('isCorrect', () => {
  it('requires an exact match on multi-select questions', () => {
    const q = question('multi', 'middle', ['a', 'c']);
    expect(isCorrect(q, ['a', 'c'])).toBe(true);
    expect(isCorrect(q, ['c', 'a'])).toBe(true);
    expect(isCorrect(q, ['a'])).toBe(false);
    expect(isCorrect(q, ['a', 'b', 'c'])).toBe(false);
  });

  it('treats an unanswered question as incorrect', () => {
    const q = question('single', 'junior');
    expect(isCorrect(q, undefined)).toBe(false);
    expect(isCorrect(q, [])).toBe(false);
  });
});

describe('the Performance Review ladder', () => {
  const cases: { percents: Record<Tier, number>; expected: Level }[] = [
    { percents: { trainee: 0, junior: 0, middle: 0, senior: 0 }, expected: 'trainee_minus' },
    { percents: { trainee: 24, junior: 0, middle: 0, senior: 0 }, expected: 'trainee_minus' },
    { percents: { trainee: 25, junior: 0, middle: 0, senior: 0 }, expected: 'trainee' },
    { percents: { trainee: 50, junior: 0, middle: 0, senior: 0 }, expected: 'junior_minus' },
    { percents: { trainee: 50, junior: 25, middle: 0, senior: 0 }, expected: 'junior' },
    { percents: { trainee: 75, junior: 50, middle: 0, senior: 0 }, expected: 'junior_plus' },
    { percents: { trainee: 75, junior: 75, middle: 0, senior: 0 }, expected: 'middle_minus' },
    { percents: { trainee: 75, junior: 75, middle: 50, senior: 0 }, expected: 'middle' },
    { percents: { trainee: 100, junior: 100, middle: 75, senior: 25 }, expected: 'middle_plus' },
    { percents: { trainee: 100, junior: 100, middle: 75, senior: 50 }, expected: 'senior' },
  ];

  for (const { percents, expected } of cases) {
    it(`awards ${expected} for ${JSON.stringify(percents)}`, () => {
      expect(resolveLevel(percents).level).toBe(expected);
    });
  }

  it('does not let a strong senior score paper over weak fundamentals', () => {
    // Perfect on the hard questions, nothing on the easy ones. The rules for
    // middle_plus and senior both require a solid Middle tier, so this must not
    // reach the top of the ladder.
    const level = resolveLevel({ trainee: 0, junior: 0, middle: 0, senior: 100 }).level;
    expect(level).toBe('trainee_minus');
  });

  it('awards the highest rung that passes, and only rungs that pass', () => {
    for (const rule of LEVEL_RULES) {
      const percents: Record<Tier, number> = { trainee: 0, junior: 0, middle: 0, senior: 0 };
      for (const [tier, min] of Object.entries(rule.requires)) {
        percents[tier as Tier] = min as number;
      }
      const awarded = resolveLevel(percents);
      const awardedIndex = LEVEL_RULES.findIndex((r) => r.level === awarded.level);
      const ruleIndex = LEVEL_RULES.findIndex((r) => r.level === rule.level);
      expect(awardedIndex).toBeGreaterThanOrEqual(ruleIndex);
    }
  });

  it('explains what is missing for the next rung', () => {
    const gap = describeGap('junior', { trainee: 60, junior: 30, middle: 0, senior: 0 });
    expect(gap).toContain('Junior+');
    expect(gap).toContain('75');
  });

  it('has no gap to describe at the top of the ladder', () => {
    expect(describeGap('senior', { trainee: 100, junior: 100, middle: 100, senior: 100 })).toBeNull();
  });
});

describe('scoreAttempt', () => {
  it('scores a blank paper as the floor of the ladder', () => {
    const breakdown = scoreAttempt(paper(), {});
    expect(breakdown.correct).toBe(0);
    expect(breakdown.level).toBe('trainee_minus');
    expect(breakdown.tiers.trainee.percent).toBe(0);
  });

  it('scores a perfect paper as Senior', () => {
    const sheet = answerSheet({ trainee: 4, junior: 6, middle: 6, senior: 4 });
    const breakdown = scoreAttempt(paper(), sheet);
    expect(breakdown.correct).toBe(20);
    expect(breakdown.percent).toBe(100);
    expect(breakdown.level).toBe('senior');
    expect(breakdown.nextLevel).toBeNull();
  });

  it('computes tier percentages from the tier questions only', () => {
    const sheet = answerSheet({ trainee: 3, junior: 3, middle: 0, senior: 0 });
    const breakdown = scoreAttempt(paper(), sheet);
    expect(breakdown.tiers.trainee).toMatchObject({ correct: 3, total: 4, percent: 75 });
    expect(breakdown.tiers.junior).toMatchObject({ correct: 3, total: 6, percent: 50 });
    expect(breakdown.tiers.middle.percent).toBe(0);
    expect(breakdown.level).toBe('junior_plus');
  });

  it('reports competencies weakest first so the report leads with the gaps', () => {
    const questions = [
      question('a1', 'trainee'),
      { ...question('b1', 'trainee'), competencyId: 'severity-priority' },
    ];
    const breakdown = scoreAttempt(questions, { a1: ['a'], b1: ['b'] });
    expect(breakdown.competencies[0]!.competencyId).toBe('severity-priority');
    expect(breakdown.competencies[0]!.percent).toBe(0);
  });

  it('produces a stable total regardless of answer order', () => {
    const questions = paper();
    const sheet = answerSheet({ trainee: 2, junior: 4, middle: 3, senior: 1 });
    const reversed = Object.fromEntries(Object.entries(sheet).reverse());
    expect(scoreAttempt(questions, sheet)).toEqual(scoreAttempt(questions, reversed));
  });
});
