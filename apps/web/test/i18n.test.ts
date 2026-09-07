import { describe, expect, it } from 'vitest';
import { LOCALES, STRING_KEYS, translate } from '../src/lib/i18n.js';
import type { Locale } from '../src/lib/i18n.js';

/**
 * The dictionary is typed, so a missing language is a compile error. These
 * cover what the type cannot: empty strings, placeholders that survived a
 * translation, and the interpolation itself.
 */


const KEYS = STRING_KEYS;

const CYRILLIC = /[Ѐ-ӿ]/;

describe('the interface dictionary', () => {
  it('walks the whole dictionary, not a copy of it', () => {
    // Guards the guard: an empty or truncated export would make every check
    // below pass without testing anything.
    expect(KEYS.length).toBeGreaterThan(100);
    expect(new Set(KEYS).size).toBe(KEYS.length);
  });

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
