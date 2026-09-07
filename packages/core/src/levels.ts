import { TIERS, TIER_LABELS } from './types.js';
import type { Level, LocalizedText, Tier } from './types.js';

/**
 * The promotion ladder, transcribed from row 4 of the Performance Review sheet
 * ("QA roadmap employee copy", columns I..Q). The sheet phrases each rule in
 * terms of "points" on skill rows of a given colour; here the same thresholds
 * are applied to the tier percentages produced by the test.
 *
 * Sheet wording -> rule:
 *   Trainee      "current level (grey) must have at least 25 points"
 *   Junior-      "grey must have at least 50 points"
 *   Junior       "green >= 25, and all Trainee (grey) items 50"      (+ ISTQB FL)
 *   Junior+      "green >= 50, and all Trainee (grey) items 75"
 *   Middle-      "green >= 75"
 *   Middle       "yellow >= 50, and all Junior (green) items 75"
 *   Middle+      "red >= 25, and all Middle (yellow) items >= 75"
 *   Senior       "red >= 50, and all Middle (yellow) items >= 75"    (+ ISTQB Advanced)
 *
 * Trainee- is the floor: it is awarded when no other rule passes.
 *
 * READING THE SHEET AS A LADDER. Each row names only its own colour and, at
 * most, the one below - "yellow >= 50, and all Junior (green) items 75" says
 * nothing about grey. Taken rule by rule in isolation that lets a paper with
 * nothing on the lower tiers satisfy an upper row outright, which is not what a
 * promotion ladder means and not how the sheet is used in a review: nobody
 * reads row Senior as reachable by someone who cannot do Trainee work. So the
 * requirements are cumulative - see `resolveLevel`. The thresholds below are
 * still the sheet's own numbers, unchanged; only their composition is fixed.
 */
export interface LevelRule {
  level: Level;
  /** Human label used in the UI and in the PDF-able report. */
  label: string;
  /** Minimum tier percentages that must all be met. */
  requires: Partial<Record<Tier, number>>;
  /**
    * Sheet wording, surfaced in the result so the rule is auditable.
    *
    * The English side is the sheet's own English phrasing - the same wording
    * this file's header records - rather than a translation of the Ukrainian,
    * so a candidate reading it in English sees what their review will say.
    */
  rationale: LocalizedText;
}

/**
 * Ordered weakest -> strongest, and the order is load-bearing: `resolveLevel`
 * walks it upwards and stops at the first rung that fails, so every rung
 * carries the requirements of all the rungs beneath it.
 */
export const LEVEL_RULES: readonly LevelRule[] = [
  {
    level: 'trainee_minus',
    label: 'Trainee-',
    requires: {},
    rationale: {
      uk: 'Нижче порога Trainee: правильних відповідей на питання рівня Trainee менше ніж 25%.',
      en: 'Below the Trainee threshold: fewer than 25% of the Trainee-level questions were answered correctly.',
    },
  },
  {
    level: 'trainee',
    label: 'Trainee',
    requires: { trainee: 25 },
    rationale: {
      uk: 'Кожен пункт навичок поточного рівня ("сірий") має щонайменше 25 балів.',
      en: 'Every skill item at the current level ("grey") scores at least 25 points.',
    },
  },
  {
    level: 'junior_minus',
    label: 'Junior-',
    requires: { trainee: 50 },
    rationale: {
      uk: 'Кожен пункт навичок поточного рівня ("сірий") має щонайменше 50 балів.',
      en: 'Every skill item at the current level ("grey") scores at least 50 points.',
    },
  },
  {
    level: 'junior',
    label: 'Junior',
    requires: { junior: 25, trainee: 50 },
    rationale: {
      uk:
        'Кожен пункт навичок поточного рівня ("зелений") має щонайменше 25 балів, а всі пункти рівня Trainee ("сірий") - 50. Підтвердження рівня також очікує ISTQB Foundation Level.',
      en:
        'Every skill item at the current level ("green") scores at least 25 points, and every Trainee item ("grey") scores 50. Confirming the level also expects an ISTQB Foundation Level certification.',
    },
  },
  {
    level: 'junior_plus',
    label: 'Junior+',
    requires: { junior: 50, trainee: 75 },
    rationale: {
      uk:
        'Кожен пункт навичок поточного рівня ("зелений") має щонайменше 50 балів, а всі пункти рівня Trainee ("сірий") - 75.',
      en:
        'Every skill item at the current level ("green") scores at least 50 points, and every Trainee item ("grey") scores 75.',
    },
  },
  {
    level: 'middle_minus',
    label: 'Middle-',
    requires: { junior: 75, trainee: 75 },
    rationale: {
      uk: 'Кожен пункт навичок поточного рівня ("зелений") має щонайменше 75 балів.',
      en: 'Every skill item at the current level ("green") scores at least 75 points.',
    },
  },
  {
    level: 'middle',
    label: 'Middle',
    requires: { middle: 50, junior: 75 },
    rationale: {
      uk:
        'Кожен пункт навичок поточного рівня ("жовтий") має щонайменше 50 балів, а всі пункти рівня Junior ("зелений") - 75.',
      en:
        'Every skill item at the current level ("yellow") scores at least 50 points, and every Junior item ("green") scores 75.',
    },
  },
  {
    level: 'middle_plus',
    label: 'Middle+',
    requires: { senior: 25, middle: 75 },
    rationale: {
      uk:
        'Кожен пункт навичок рівня Senior ("червоний") має щонайменше 25 балів, а всі пункти рівня Middle ("жовтий") - щонайменше 75.',
      en:
        'Every Senior skill item ("red") scores at least 25 points, and every Middle item ("yellow") scores at least 75.',
    },
  },
  {
    level: 'senior',
    label: 'Senior',
    requires: { senior: 50, middle: 75 },
    rationale: {
      uk:
        'Кожен пункт навичок поточного рівня ("червоний") має щонайменше 50 балів, а всі пункти рівня Middle ("жовтий") - щонайменше 75. Підтвердження рівня також очікує ISTQB Advanced Level.',
      en:
        'Every skill item at the current level ("red") scores at least 50 points, and every Middle item ("yellow") scores at least 75. Confirming the level also expects an ISTQB Advanced Level certification.',
    },
  },
] as const;

export const LEVEL_LABELS: Record<Level, string> = Object.fromEntries(
  LEVEL_RULES.map((r) => [r.level, r.label]),
) as Record<Level, string>;

function satisfies(rule: LevelRule, percents: Record<Tier, number>): boolean {
  return Object.entries(rule.requires).every(
    ([tier, min]) => percents[tier as Tier] >= (min as number),
  );
}

/**
 * The highest rung reached without skipping one. Always returns something.
 *
 * Walks upwards and stops at the first rule that fails, awarding the rung below
 * it. Requirements are therefore cumulative, which is what makes the ladder a
 * ladder: Senior demands the Middle, Junior and Trainee bars as well as its
 * own.
 *
 * This replaces taking the highest INDIVIDUALLY satisfied rule, which allowed a
 * rung to be skipped outright. The `senior` row names only red >= 50 and
 * yellow >= 75, so a paper scoring 0% on trainee, 0% on junior, 83% on middle
 * and 50% on senior was awarded Senior - a profile no reviewer would call
 * Senior, and one the ladder was documented as making impossible.
 *
 * A useful side effect: the rung immediately above the award is now, by
 * construction, exactly the rule that blocked it, so `describeGap` names the
 * real obstacle rather than an arbitrary higher row.
 */
export function resolveLevel(percents: Record<Tier, number>): LevelRule {
  // LEVEL_RULES[0] is the floor and requires nothing, so this always holds.
  let awarded = LEVEL_RULES[0]!;
  for (const rule of LEVEL_RULES) {
    if (!satisfies(rule, percents)) break;
    awarded = rule;
  }
  return awarded;
}

/** The rung immediately above the awarded one, if any. */
export function nextRule(level: Level): LevelRule | null {
  const idx = LEVEL_RULES.findIndex((r) => r.level === level);
  return idx >= 0 && idx < LEVEL_RULES.length - 1 ? LEVEL_RULES[idx + 1]! : null;
}

/** Plain-language description of what is still missing for the next rung. */
export function describeGap(
  level: Level,
  percents: Record<Tier, number>,
): LocalizedText | null {
  const next = nextRule(level);
  if (!next) return null;

  // Lowest tier first, which is both the order the ladder reads in and the order
  // the candidate should work in: it is cumulative, so a shortfall low down caps
  // the result whatever happens above it. Object key order would otherwise
  // decide, and in `LEVEL_RULES` it happens to run the other way - the sentence
  // used to open with the senior requirement and mention the fundamentals last.
  const short = TIERS.filter((tier) => {
    const min = next.requires[tier];
    return min !== undefined && percents[tier] < min;
  }).map((tier) => ({ tier, min: next.requires[tier] as number }));

  if (short.length === 0) return null;

  // Built in both languages here rather than returned as data and formatted at
  // the edges: it is written into the stored result and into the spreadsheet
  // row as well as onto the screen, and three formatters would drift.
  //
  // The shape is "you need X% at <Tier> (you have Y%)" rather than the old
  // "<tier>: Y% -> needs X%". The old one nested a colon inside a sentence that
  // already had one, used an ASCII arrow, and - in Ukrainian - dropped the raw
  // lowercase tier id into the prose after the word `рівень`, so it read
  // "рівень trainee". The tier is a proper noun here and is capitalised.
  const render = (locale: 'en' | 'uk'): string => {
    const parts = short.map(({ tier, min }) => {
      const have = percents[tier].toFixed(0);
      return locale === 'en'
        ? `${min}% at ${TIER_LABELS[tier]} (you have ${have}%)`
        : `${min}% на рівні ${TIER_LABELS[tier]} (у вас ${have}%)`;
    });
    return locale === 'en'
      ? `To reach ${next.label} you need ${parts.join(' and ')}.`
      : `Щоб досягти ${next.label}, потрібно ${parts.join(' і ')}.`;
  };

  return { en: render('en'), uk: render('uk') };
}
