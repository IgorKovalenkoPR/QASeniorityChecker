/**
 * Core domain vocabulary for the QA Seniority Checker.
 *
 * Everything here is derived from the company's "QA roadmap employee copy"
 * Performance Review sheet. The sheet colour-codes every skill row by the
 * seniority tier that owns it:
 *
 *   #D9D9D9 grey   -> Trainee tier
 *   #D9EAD3 green  -> Junior tier
 *   #FFF2CC yellow -> Middle tier
 *   #F4CCCC red    -> Senior tier
 *
 * Those four tiers are the axes the test measures. The nine-rung ladder
 * (Trainee- ... Senior) is then derived from the four tier scores by the
 * rules in `levels.ts`, which mirror row 4 of the sheet verbatim.
 */

/** The four scoring axes. Named after the sheet's row colours. */
export const TIERS = ['trainee', 'junior', 'middle', 'senior'] as const;
export type Tier = (typeof TIERS)[number];

/**
 * How a tier is written when a person reads it.
 *
 * English in both languages on purpose: these are the column names of the
 * client's own Performance Review sheet, and the ladder names beside them are
 * kept English for the same reason (see the note in `levels.ts`). It lives in
 * core because `describeGap` needs it too, and the browser had the only copy -
 * which is how a sentence reading `рівень trainee` reached the result screen.
 */
export const TIER_LABELS: Record<Tier, string> = {
  trainee: 'Trainee',
  junior: 'Junior',
  middle: 'Middle',
  senior: 'Senior',
};

/** The nine rungs of the Performance Review ladder, weakest first. */
export const LEVELS = [
  'trainee_minus',
  'trainee',
  'junior_minus',
  'junior',
  'junior_plus',
  'middle_minus',
  'middle',
  'middle_plus',
  'senior',
] as const;
export type Level = (typeof LEVELS)[number];

/** Where a question came from. Drives the per-variant source blueprint. */
export const QUESTION_SOURCES = [
  'pr-matrix',
  'istqb-ctfl',
  'istqb-ctal-ta',
  'istqb-ctal-tm',
  'istqb-glossary',
  'practice-dump',
] as const;
export type QuestionSource = (typeof QUESTION_SOURCES)[number];

/** Top-level sections of the Performance Review sheet. */
export const COMPETENCY_GROUPS = [
  'theory',
  'technical',
  'automation',
  'test-executor',
  'test-analyst',
  'test-manager',
  'english',
] as const;
export type CompetencyGroup = (typeof COMPETENCY_GROUPS)[number];

export interface Competency {
  /** Stable slug used by questions and reports. */
  id: string;
  /** Ukrainian label shown to the candidate in the result report. */
  label: string;
  /**
   * The row label exactly as it appears in the English Performance Review
   * sheet. Kept verbatim so a reviewer can map any result line back to the
   * spreadsheet row it came from, whatever the UI language is.
   */
  sheetRow: string;
  group: CompetencyGroup;
  /** Tier that owns this row, read from the row's fill colour. */
  tier: Tier;
}

export interface AnswerOption {
  /** Stable per-question option id ('a' | 'b' | 'c' | 'd' ...). */
  id: string;
  text: LocalizedText;
}

/**
 * The languages the product is offered in. English is the default; see
 * apps/web/src/lib/i18n.tsx for the interface strings.
 */
export type Locale = 'en' | 'uk';

/**
 * A string the candidate reads, in every language the product offers.
 *
 * Both are required. The bank was written in Ukrainian and the English side
 * arrived later, but making `en` optional would have meant a paper that
 * silently serves Ukrainian to an English-speaking candidate - a difference in
 * the instrument, not a cosmetic gap. Missing translations are therefore
 * filled explicitly at definition time and counted, never left undefined.
 */
export interface LocalizedText {
  en: string;
  uk: string;
}

/** The one place that resolves a localized string, so the fallback is single. */
export function localized(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export interface Question {
  /** Globally unique, human-readable, stable across releases. */
  id: string;
  tier: Tier;
  competencyId: string;
  source: QuestionSource;
  text: LocalizedText;
  options: AnswerOption[];
  /** Ids of the correct options. Length > 1 means multi-select. */
  correctOptionIds: string[];
  /** Shown on the result page only, never before submission. */
  explanation: LocalizedText;
}

/**
 * A question with the answer key stripped. This is the ONLY question shape
 * the HTTP layer is allowed to serialise before an attempt is submitted.
 */
export type PublicQuestion = Omit<Question, 'correctOptionIds' | 'explanation'> & {
  /** True when more than one option must be selected. */
  multiSelect: boolean;
};

export interface Variant {
  /** 1..50 */
  number: number;
  id: string;
  title: string;
  questionIds: string[];
}

/** Per-tier result, expressed as a 0..100 percentage plus the raw counts. */
export interface TierScore {
  tier: Tier;
  correct: number;
  total: number;
  /** Rounded to one decimal. 0 when `total` is 0. */
  percent: number;
}

export interface CompetencyScore {
  competencyId: string;
  label: string;
  group: CompetencyGroup;
  tier: Tier;
  correct: number;
  total: number;
  percent: number;
}

export interface ScoreBreakdown {
  level: Level;
  /** The rule text that awarded this level, for the report. */
  rationale: LocalizedText;
  tiers: Record<Tier, TierScore>;
  competencies: CompetencyScore[];
  correct: number;
  total: number;
  percent: number;
  /** Rungs the candidate missed and what it would take to reach the next one. */
  nextLevel: Level | null;
  nextLevelGap: LocalizedText | null;
}
