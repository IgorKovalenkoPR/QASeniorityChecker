import { describe, expect, it } from 'vitest';
import { LEVEL_RULES, describeGap, resolveLevel } from '../src/levels.js';
import { isCorrect, scoreAttempt } from '../src/scoring.js';
import type { AnswerSheet, Level, LocalizedText, Question, Tier } from '../src/index.js';

/** The percentages a tier of N questions can actually produce, as scoring rounds them. */
function tierScale(questions: number): number[] {
  return Array.from(
    { length: questions + 1 },
    (_, correct) => Math.round((correct / questions) * 1000) / 10,
  );
}

/** Every score combination the 4/6/6/4 blueprint can yield. */
function achievableProfiles(): Record<Tier, number>[] {
  const out: Record<Tier, number>[] = [];
  for (const trainee of tierScale(4))
    for (const junior of tierScale(6))
      for (const middle of tierScale(6))
        for (const senior of tierScale(4)) out.push({ trainee, junior, middle, senior });
  return out;
}

function ruleIndex(level: Level): number {
  return LEVEL_RULES.findIndex((r) => r.level === level);
}

function satisfiedBy(rule: (typeof LEVEL_RULES)[number], percents: Record<Tier, number>): boolean {
  return Object.entries(rule.requires).every(
    ([tier, min]) => percents[tier as Tier] >= (min as number),
  );
}

function describe_(rule: (typeof LEVEL_RULES)[number], percents: Record<Tier, number>): string {
  return `${rule.label} vs ${JSON.stringify(percents)}`;
}

/** These fixtures do not care about language; the same text serves both. */
const both = (text: string): LocalizedText => ({ en: text, uk: text });

function question(id: string, tier: Tier, correct: string[] = ['a']): Question {
  return {
    id,
    tier,
    competencyId: 'test-artifacts',
    source: 'pr-matrix',
    text: both(`Question ${id}`),
    options: [
      { id: 'a', text: both('A') },
      { id: 'b', text: both('B') },
      { id: 'c', text: both('C') },
      { id: 'd', text: both('D') },
    ],
    correctOptionIds: correct,
    explanation: both('Because that is how it works, for a reason long enough to be useful.'),
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

  it('does not hand out a rung whose lower rungs were never cleared', () => {
    // The exact profile that used to score Senior. The senior row names only
    // red >= 50 and yellow >= 75, so read in isolation it passed - on a paper
    // with nothing at all on the two lower tiers.
    expect(resolveLevel({ trainee: 0, junior: 0, middle: 83.3, senior: 50 }).level).toBe(
      'trainee_minus',
    );
    // And the realistic version of the same shape: someone who knows the
    // syllabus but missed the soft Trainee-level rows.
    expect(resolveLevel({ trainee: 25, junior: 50, middle: 83.3, senior: 50 }).level).toBe(
      'trainee',
    );
    // A genuine Senior profile is untouched.
    expect(resolveLevel({ trainee: 100, junior: 100, middle: 83.3, senior: 50 }).level).toBe(
      'senior',
    );
  });

  it('awards exactly the rung below the first rule that fails', () => {
    // The defining property, checked over every score the test can actually
    // produce: 4 trainee questions, 6 junior, 6 middle, 4 senior.
    for (const percents of achievableProfiles()) {
      const awardedIndex = ruleIndex(resolveLevel(percents).level);
      // Everything up to and including the award is satisfied...
      for (const rule of LEVEL_RULES.slice(0, awardedIndex + 1)) {
        expect(satisfiedBy(rule, percents), describe_(rule, percents)).toBe(true);
      }
      // ...and the rung above it, if there is one, is not.
      const blocker = LEVEL_RULES[awardedIndex + 1];
      if (blocker) {
        expect(satisfiedBy(blocker, percents), describe_(blocker, percents)).toBe(false);
      }
    }
  });

  it('never lowers the rung when a tier score goes up', () => {
    // Answering one more question correctly must never cost a candidate a
    // rung. Cheap to state, and the kind of thing a threshold edit breaks.
    const scales: Record<Tier, number[]> = {
      trainee: tierScale(4),
      junior: tierScale(6),
      middle: tierScale(6),
      senior: tierScale(4),
    };
    for (const percents of achievableProfiles()) {
      const base = ruleIndex(resolveLevel(percents).level);
      for (const tier of ['trainee', 'junior', 'middle', 'senior'] as Tier[]) {
        const scale = scales[tier];
        const next = scale[scale.indexOf(percents[tier]) + 1];
        if (next === undefined) continue;
        const better = { ...percents, [tier]: next };
        expect(
          ruleIndex(resolveLevel(better).level),
          `raising ${tier} from ${percents[tier]}% to ${next}% lowered the rung`,
        ).toBeGreaterThanOrEqual(base);
      }
    }
  });

  it('leaves every rung on the ladder reachable', () => {
    // Cumulative requirements could in principle strand a rung that no real
    // paper can produce. None of the nine is stranded.
    const reached = new Set(achievableProfiles().map((p) => resolveLevel(p).level));
    for (const rule of LEVEL_RULES) {
      expect(reached.has(rule.level), `no achievable paper awards ${rule.label}`).toBe(true);
    }
  });

  it('names the rule that actually blocked progression', () => {
    // Now that the award is the rung below the FIRST failing rule, the rung
    // above it is by construction the real obstacle - so the candidate is told
    // what stopped them rather than what some higher row happens to want.
    // A strong middle and senior showing, held at Junior+ by two junior misses.
    const percents = { trainee: 100, junior: 66.7, middle: 100, senior: 100 };
    expect(resolveLevel(percents).level).toBe('junior_plus');
    const gap = describeGap('junior_plus', percents);
    // Checked in both languages: the text goes on the screen, into the stored
    // result and into the spreadsheet row, so a language that drifted would
    // mislead a reader rather than fail visibly.
    for (const locale of ['en', 'uk'] as const) {
      const text = gap?.[locale] ?? '';
      expect(text, locale).toContain('Middle-');
      // The tier is a proper noun and is written as one: the Ukrainian used to
      // interpolate the raw id and read `рівень trainee`.
      expect(text, locale).toContain('Junior');
      expect(text, locale).toContain('75');
      expect(text, locale).toContain('67');
      // And it does not point at the middle or senior tiers, already full.
      // Case-insensitively, because `Middle-` is the rung name in the sentence
      // and only a TIER named Middle would be wrong here.
      expect(text.replace('Middle-', ''), locale).not.toMatch(/middle/i);
      expect(text, locale).not.toMatch(/senior/i);
    }
  });

  it('explains what is missing for the next rung', () => {
    const gap = describeGap('junior', { trainee: 60, junior: 30, middle: 0, senior: 0 });
    expect(gap?.en).toContain('Junior+');
    expect(gap?.en).toContain('75');
    expect(gap?.uk).toContain('Junior+');
    expect(gap?.uk).toContain('75');
    // The same numbers in both, so the two languages cannot disagree about
    // what the candidate is short of.
    expect(gap?.en.match(/\d+/g)).toEqual(gap?.uk.match(/\d+/g));
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
