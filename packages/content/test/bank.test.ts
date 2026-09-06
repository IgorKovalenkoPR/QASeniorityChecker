import { describe, expect, it } from 'vitest';
import {
  BLUEPRINT,
  COMPETENCY_BY_ID,
  QUESTIONS_PER_VARIANT,
  TIER_QUOTA,
  TIERS,
  VARIANT_COUNT,
  buildVariants,
  variantUsage,
} from '@qasc/core';
import {
  QUESTION_BANK,
  QUESTION_BY_ID,
  VARIANTS,
  bankStats,
  untranslatedQuestionIds,
  validateBank,
} from '../src/index.js';

describe('question bank', () => {
  it('passes its own structural validation', () => {
    expect(validateBank()).toEqual([]);
  });

  it('is large enough that no question carries an unreasonable share of the papers', () => {
    // 50 variants x 20 questions = 1000 slots. A bank under ~350 would mean some
    // question appears in more than a third of all papers.
    expect(QUESTION_BANK.length).toBeGreaterThanOrEqual(350);
  });

  it('covers every tier and every declared source', () => {
    const stats = bankStats();
    for (const tier of TIERS) expect(stats.byTier[tier]).toBeGreaterThan(30);
    expect(stats.bySource['pr-matrix']).toBeGreaterThan(100);
    expect(stats.bySource['istqb-ctfl']).toBeGreaterThan(20);
    expect(stats.bySource['istqb-ctal-ta']).toBeGreaterThan(20);
    expect(stats.bySource['istqb-ctal-tm']).toBeGreaterThan(20);
    expect(stats.bySource['istqb-glossary']).toBeGreaterThan(20);
    expect(stats.bySource['practice-dump']).toBeGreaterThan(20);
  });

  it('only references competencies that exist in the Performance Review matrix', () => {
    for (const q of QUESTION_BANK) {
      expect(COMPETENCY_BY_ID.has(q.competencyId), `${q.id} -> ${q.competencyId}`).toBe(true);
    }
  });

  it('places every question at the tier its competency belongs to', () => {
    // The one deliberate exception is ISTQB material: the syllabus level, not the
    // matrix row, decides where a certification question is asked.
    const certification = new Set(['istqb-ctfl', 'istqb-ctal-ta', 'istqb-ctal-tm', 'istqb-glossary']);
    for (const q of QUESTION_BANK) {
      if (certification.has(q.source)) continue;
      const competency = COMPETENCY_BY_ID.get(q.competencyId);
      expect(q.tier, `${q.id} (${q.competencyId})`).toBe(competency?.tier);
    }
  });

  it('never marks every option correct and always keeps at least one wrong option', () => {
    for (const q of QUESTION_BANK) {
      expect(q.correctOptionIds.length).toBeGreaterThan(0);
      expect(q.correctOptionIds.length).toBeLessThan(q.options.length);
    }
  });

  it('has an English side for every question', () => {
    // The bank was written Ukrainian-first and the translation landed file by
    // file. A question with no translation falls back to its Ukrainian text,
    // which keeps the test working and is exactly why this has to be asserted:
    // an English-speaking candidate would meet a Ukrainian question and
    // nothing would look broken.
    expect(untranslatedQuestionIds()).toEqual([]);
  });

  it('does not pass off the Ukrainian text as the English one', () => {
    // Catches the other half of the same failure: a translation file that
    // exists but was filled in by copying the source across.
    //
    // Identical strings are only suspicious when the Ukrainian side actually
    // contains Ukrainian. Plenty of options are SQL, HTML tags, defect statuses
    // or ISTQB names that are the same in both languages by nature, and a test
    // that flagged those would have to be silenced - at which point it stops
    // catching the real thing.
    const cyrillic = /[а-яїієґА-ЯЇІЄҐ]/;
    const copied: string[] = [];
    for (const q of QUESTION_BANK) {
      if (q.text.en === q.text.uk && cyrillic.test(q.text.uk)) copied.push(q.id);
      if (q.explanation.en === q.explanation.uk && cyrillic.test(q.explanation.uk)) {
        copied.push(`${q.id} (explanation)`);
      }
      for (const o of q.options) {
        if (o.text.en === o.text.uk && cyrillic.test(o.text.uk)) copied.push(`${q.id}/${o.id}`);
      }
    }
    expect(copied).toEqual([]);
  });

  it('leaves no Ukrainian text on the English side', () => {
    // The failure this catches is a half-translated string - an option rendered
    // into English with one Ukrainian clause left in it, which no length or
    // presence check would notice.
    const cyrillic = /[а-яїієґА-ЯЇІЄҐ]/;
    const leaked = QUESTION_BANK.filter(
      (q) =>
        cyrillic.test(q.text.en) ||
        cyrillic.test(q.explanation.en) ||
        q.options.some((o) => cyrillic.test(o.text.en)),
    ).map((q) => q.id);
    expect(leaked).toEqual([]);
  });

  it('gives every question an explanation the candidate can learn from', () => {
    for (const q of QUESTION_BANK) {
      expect(q.explanation.uk.length, `${q.id} uk`).toBeGreaterThan(40);
      expect(q.explanation.en.length, `${q.id} en`).toBeGreaterThan(40);
    }
  });
});

describe('variants', () => {
  it('produces exactly the required number of papers', () => {
    expect(VARIANTS).toHaveLength(VARIANT_COUNT);
    expect(VARIANT_COUNT).toBe(50);
  });

  it('gives every paper exactly 20 questions', () => {
    for (const v of VARIANTS) expect(v.questionIds).toHaveLength(QUESTIONS_PER_VARIANT);
    expect(QUESTIONS_PER_VARIANT).toBe(20);
  });

  it('never repeats a question inside one paper', () => {
    for (const v of VARIANTS) {
      expect(new Set(v.questionIds).size, `variant ${v.number}`).toBe(v.questionIds.length);
    }
  });

  it('holds the 4/6/6/4 tier split in every paper', () => {
    expect(TIER_QUOTA).toEqual({ trainee: 4, junior: 6, middle: 6, senior: 4 });
    for (const v of VARIANTS) {
      const counts = { trainee: 0, junior: 0, middle: 0, senior: 0 };
      for (const id of v.questionIds) counts[QUESTION_BY_ID.get(id)!.tier] += 1;
      expect(counts, `variant ${v.number}`).toEqual(TIER_QUOTA);
    }
  });

  it('satisfies every blueprint slot in every paper', () => {
    for (const v of VARIANTS) {
      const questions = v.questionIds.map((id) => QUESTION_BY_ID.get(id)!);
      const pool = [...questions];
      for (const slot of BLUEPRINT) {
        for (let i = 0; i < slot.count; i += 1) {
          const index = pool.findIndex(
            (q) => q.tier === slot.tier && slot.sources.includes(q.source),
          );
          expect(
            index,
            `variant ${v.number} cannot fill ${slot.tier}/${slot.sources.join('+')}`,
          ).toBeGreaterThanOrEqual(0);
          pool.splice(index, 1);
        }
      }
      expect(pool).toHaveLength(0);
    }
  });

  it('asks ISTQB Foundation Level at Junior in every paper', () => {
    for (const v of VARIANTS) {
      const ctfl = v.questionIds
        .map((id) => QUESTION_BY_ID.get(id)!)
        .filter((q) => q.source === 'istqb-ctfl');
      expect(ctfl.length, `variant ${v.number}`).toBeGreaterThanOrEqual(2);
      for (const q of ctfl) expect(q.tier).toBe('junior');
    }
  });

  it('asks Test Analyst at Middle or Senior, and Test Manager only at Senior', () => {
    for (const v of VARIANTS) {
      for (const q of v.questionIds.map((id) => QUESTION_BY_ID.get(id)!)) {
        if (q.source === 'istqb-ctal-ta') expect(['middle', 'senior']).toContain(q.tier);
        if (q.source === 'istqb-ctal-tm') expect(q.tier).toBe('senior');
      }
    }
  });

  it('includes at least one Test Manager question in every paper', () => {
    for (const v of VARIANTS) {
      const tm = v.questionIds.filter((id) => QUESTION_BY_ID.get(id)!.source === 'istqb-ctal-tm');
      expect(tm.length, `variant ${v.number}`).toBeGreaterThanOrEqual(1);
    }
  });

  it('spreads usage evenly across the bank', () => {
    const usage = variantUsage(VARIANTS);
    const counts = [...usage.values()];
    // Round-robin dealing over shuffled pools: no question should be reused far
    // more often than its neighbours in the same pool.
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(3);
    // Nearly the whole bank is in play; a large unused remainder would mean the
    // pools are lopsided and some questions can never be drawn.
    expect(usage.size / QUESTION_BANK.length).toBeGreaterThan(0.9);
  });

  it('is deterministic: the same bank and seed rebuild the same papers', () => {
    const again = buildVariants(QUESTION_BANK);
    expect(again.map((v) => v.questionIds)).toEqual(VARIANTS.map((v) => v.questionIds));
  });

  it('produces different papers for different seeds', () => {
    const other = buildVariants(QUESTION_BANK, { seed: 'different-seed' });
    expect(other[0]!.questionIds).not.toEqual(VARIANTS[0]!.questionIds);
  });

  it('does not walk monotonically from easy to hard', () => {
    // If papers were ordered by tier, a candidate could infer difficulty from
    // position. Check that at least most papers break the ordering.
    const order = { trainee: 0, junior: 1, middle: 2, senior: 3 };
    const sorted = VARIANTS.filter((v) => {
      const tiers = v.questionIds.map((id) => order[QUESTION_BY_ID.get(id)!.tier]);
      return tiers.every((t, i) => i === 0 || t >= tiers[i - 1]!);
    });
    expect(sorted.length).toBeLessThan(3);
  });
});
