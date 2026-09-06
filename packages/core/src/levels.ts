import type { Level, Tier } from './types.js';

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
 */
export interface LevelRule {
  level: Level;
  /** Human label used in the UI and in the PDF-able report. */
  label: string;
  /** Minimum tier percentages that must all be met. */
  requires: Partial<Record<Tier, number>>;
  /** Sheet wording, surfaced in the result so the rule is auditable. */
  rationale: string;
}

/**
 * Ordered weakest -> strongest. `resolveLevel` walks this backwards and awards
 * the first rung whose thresholds are all satisfied, so a candidate can never
 * skip a rung by acing the senior questions while failing the basics.
 */
export const LEVEL_RULES: readonly LevelRule[] = [
  {
    level: 'trainee_minus',
    label: 'Trainee-',
    requires: {},
    rationale: 'Нижче порога Trainee: правильних відповідей на питання рівня Trainee менше ніж 25%.',
  },
  {
    level: 'trainee',
    label: 'Trainee',
    requires: { trainee: 25 },
    rationale: 'Кожен пункт навичок поточного рівня ("сірий") має щонайменше 25 балів.',
  },
  {
    level: 'junior_minus',
    label: 'Junior-',
    requires: { trainee: 50 },
    rationale: 'Кожен пункт навичок поточного рівня ("сірий") має щонайменше 50 балів.',
  },
  {
    level: 'junior',
    label: 'Junior',
    requires: { junior: 25, trainee: 50 },
    rationale:
      'Кожен пункт навичок поточного рівня ("зелений") має щонайменше 25 балів, а всі пункти рівня Trainee ("сірий") - 50. Підтвердження рівня також очікує ISTQB Foundation Level.',
  },
  {
    level: 'junior_plus',
    label: 'Junior+',
    requires: { junior: 50, trainee: 75 },
    rationale:
      'Кожен пункт навичок поточного рівня ("зелений") має щонайменше 50 балів, а всі пункти рівня Trainee ("сірий") - 75.',
  },
  {
    level: 'middle_minus',
    label: 'Middle-',
    requires: { junior: 75, trainee: 75 },
    rationale: 'Кожен пункт навичок поточного рівня ("зелений") має щонайменше 75 балів.',
  },
  {
    level: 'middle',
    label: 'Middle',
    requires: { middle: 50, junior: 75 },
    rationale:
      'Кожен пункт навичок поточного рівня ("жовтий") має щонайменше 50 балів, а всі пункти рівня Junior ("зелений") - 75.',
  },
  {
    level: 'middle_plus',
    label: 'Middle+',
    requires: { senior: 25, middle: 75 },
    rationale:
      'Кожен пункт навичок рівня Senior ("червоний") має щонайменше 25 балів, а всі пункти рівня Middle ("жовтий") - щонайменше 75.',
  },
  {
    level: 'senior',
    label: 'Senior',
    requires: { senior: 50, middle: 75 },
    rationale:
      'Кожен пункт навичок поточного рівня ("червоний") має щонайменше 50 балів, а всі пункти рівня Middle ("жовтий") - щонайменше 75. Підтвердження рівня також очікує ISTQB Advanced Level.',
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

/** Highest rung whose thresholds are all met. Always returns something. */
export function resolveLevel(percents: Record<Tier, number>): LevelRule {
  for (let i = LEVEL_RULES.length - 1; i >= 0; i -= 1) {
    const rule = LEVEL_RULES[i]!;
    if (satisfies(rule, percents)) return rule;
  }
  return LEVEL_RULES[0]!;
}

/** The rung immediately above the awarded one, if any. */
export function nextRule(level: Level): LevelRule | null {
  const idx = LEVEL_RULES.findIndex((r) => r.level === level);
  return idx >= 0 && idx < LEVEL_RULES.length - 1 ? LEVEL_RULES[idx + 1]! : null;
}

/** Plain-language description of what is still missing for the next rung. */
export function describeGap(level: Level, percents: Record<Tier, number>): string | null {
  const next = nextRule(level);
  if (!next) return null;
  const missing = Object.entries(next.requires)
    .filter(([tier, min]) => percents[tier as Tier] < (min as number))
    .map(([tier, min]) => `рівень ${tier}: ${percents[tier as Tier].toFixed(0)}% -> потрібно ${min}%`);
  if (missing.length === 0) return null;
  return `Щоб досягти ${next.label}: ${missing.join('; ')}.`;
}
