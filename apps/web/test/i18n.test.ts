import { describe, expect, it } from 'vitest';
import { LOCALES, translate } from '../src/lib/i18n.js';
import type { Locale, StringKey } from '../src/lib/i18n.js';

/**
 * The dictionary is typed, so a missing language is a compile error. These
 * cover what the type cannot: empty strings, placeholders that survived a
 * translation, and the interpolation itself.
 */

// Re-derived rather than exported: the module keeps its table private on
// purpose, and a test that reaches into it would just mirror the source.
const KEYS: StringKey[] = [
  'app.name',
  'app.tagline',
  'app.variant',
  'app.loading',
  'app.footer',
  'lang.label',
  'signin.heading',
  'signin.intro',
  'signin.button',
  'signin.domains',
  'signin.domainsAny',
  'signin.needTitle',
  'signin.need1',
  'signin.need2',
  'signin.need3',
  'signin.rulesLater',
  'signin.failed',
  'auth.err.auth_domain_not_allowed',
  'auth.err.auth_email_unverified',
  'auth.err.auth_state_mismatch',
  'auth.err.auth_missing_code',
  'auth.err.access_denied',
  'auth.err.auth_no_email',
  'auth.err.auth_no_id_token',
  'auth.err.auth_not_configured',
  'auth.err.unknown',
  'start.heading',
  'start.intro',
  'start.stat.questions',
  'start.stat.time',
  'start.stat.minutes',
  'start.covers.title',
  'start.covers.body',
  'start.covers.noPrep',
  'start.rules.title',
  'start.rules.bannerTitle',
  'start.rules.bannerBody',
  'start.rules.foreground',
  'start.rules.closeTabs',
  'start.rules.copyPaste',
  'start.rules.reload',
  'start.rules.network',
  'start.rules.answers',
  'start.form.title',
  'start.form.signedInAs',
  'start.form.identityFixed',
  'start.form.name',
  'start.form.nameError',
  'start.form.email',
  'start.form.emailHint',
  'start.form.emailError',
  'start.form.accept',
  'start.form.submit',
  'start.form.starting',
  'start.error',
  'test.progress',
  'test.saving',
  'test.unsaved',
  'test.answered',
  'test.answeredAria',
  'test.retryTitle',
  'test.retryBody',
  'test.warnTitle',
  'test.warnRemaining',
  'test.multi',
  'test.back',
  'test.next',
  'test.finish',
  'test.jump',
  'test.jumpAria',
  'test.jumpAnswered',
  'test.jumpUnanswered',
  'test.allAnswered',
  'test.stillUnanswered',
  'test.confirmTitle',
  'test.confirmAll',
  'test.confirmSome',
  'test.keepGoing',
  'test.submitting',
  'test.confirmFinish',
  'test.timeLeft',
  'result.caption',
  'result.correct',
  'result.nextTitle',
  'result.topRung',
  'result.expiredTitle',
  'result.expiredBody',
  'result.byTier',
  'result.byTierNote',
  'result.tierAria',
  'result.ladderTitle',
  'result.ladderLevel',
  'result.ladderRequires',
  'result.ladderYou',
  'result.belowTrainee',
  'result.yourResult',
  'result.compsTitle',
  'result.compsNote',
  'result.compColumn',
  'result.compLevel',
  'result.compScore',
  'result.reviewTitle',
  'result.answersTitle',
  'result.hide',
  'result.showAnswers',
  'result.showQuestions',
  'result.keyWithheld',
  'result.right',
  'result.wrong',
  'result.yourAnswer',
  'result.noAnswer',
  'result.correctAnswer',
  'result.restart',
  'result.restartNote',
  'term.heading',
  'term.rulesTitle',
  'term.default',
  'term.body',
  'term.back',
  'proctor.leftPage',
  'proctor.navAway',
  'err.attemptGone',
  'err.submit',
  'err.unsavedOnSubmit',
  'source.pr-matrix',
  'source.istqb-ctfl',
  'source.istqb-ctal-ta',
  'source.istqb-ctal-tm',
  'source.istqb-glossary',
  'source.practice-dump',
];

const CYRILLIC = /[Ѐ-ӿ]/;

describe('the interface dictionary', () => {
  it('has a non-empty string for every key in both languages', () => {
    for (const key of KEYS) {
      for (const locale of LOCALES) {
        const value = translate(locale, key);
        expect(value.trim(), `${key} / ${locale}`).not.toBe('');
      }
    }
  });

  it('has no Cyrillic left in the English side', () => {
    // The failure this catches is a copy-paste that never got translated -
    // which is invisible until an English-speaking candidate hits that screen.
    const untranslated = KEYS.filter((key) => CYRILLIC.test(translate('en', key)));
    expect(untranslated).toEqual([]);
  });

  it('keeps the same placeholders in both languages', () => {
    // A placeholder dropped in translation prints nothing where a number
    // should be; one invented prints a literal {brace} at a candidate.
    const placeholders = (text: string) => (text.match(/\{(\w+)\}/g) ?? []).sort();
    for (const key of KEYS) {
      expect(placeholders(translate('uk', key)), key).toEqual(placeholders(translate('en', key)));
    }
  });

  it('substitutes values by name', () => {
    expect(translate('en', 'test.progress', { i: 3, n: 20 })).toBe('Question 3 / 20');
    expect(translate('uk', 'test.progress', { i: 3, n: 20 })).toBe('Питання 3 / 20');
  });

  it('leaves an unknown placeholder alone rather than printing "undefined"', () => {
    expect(translate('en', 'test.progress', { i: 3 })).toBe('Question 3 / {n}');
  });

  it('covers every locale the switch offers', () => {
    expect([...LOCALES].sort()).toEqual(['en', 'uk'] satisfies Locale[]);
  });
});
