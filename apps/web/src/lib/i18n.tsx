import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { LocalizedText } from '@qasc/core';

/**
 * Interface language.
 *
 * English is the default. The tool started Ukrainian-only because its first
 * audience was, and the strings were written inline; that made "add a second
 * language" a rewrite rather than a setting. Everything the candidate reads now
 * lives here, in both languages, so a missing translation is a type error
 * rather than a sentence someone finds in production.
 *
 * The question bank is a separate matter and is translated on its own schedule -
 * see docs. This module covers the application's own words.
 */
export type { Locale } from '@qasc/core';
import type { Locale } from '@qasc/core';

export const LOCALES: readonly Locale[] = ['en', 'uk'];
export const LOCALE_NAMES: Record<Locale, string> = { en: 'English', uk: 'Українська' };

const STORAGE_KEY = 'qasc.locale';

function readStored(): Locale | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === 'en' || raw === 'uk' ? raw : null;
  } catch {
    // Private mode or blocked storage: the choice just does not persist.
    return null;
  }
}

/**
 * English unless the visitor has chosen otherwise.
 *
 * Deliberately NOT guessed from navigator.language: a Ukrainian-speaking
 * browser in an English-speaking office is common, and a test that silently
 * changes language between two candidates is a difference in the instrument.
 * The default is fixed and the switch is visible.
 */
function initialLocale(): Locale {
  return readStored() ?? 'en';
}

type Entry = { en: string; uk: string };

const S = {
  // --- chrome ---
  'app.name': { en: 'QA Seniority Checker', uk: 'QA Seniority Checker' },
  'app.tagline': {
    en: 'a self-check before your Performance Review',
    uk: 'попередня оцінка перед Performance Review',
  },
  'app.variant': { en: 'Paper {n}', uk: 'Варіант {n}' },
  'app.loading': { en: 'Loading…', uk: 'Завантаження…' },
  'app.footer': {
    en: 'The estimated level is a starting point for the Performance Review conversation, not the review itself.',
    uk: 'Орієнтовний рівень - це відправна точка для розмови на Performance Review, а не сам review.',
  },
  'lang.label': { en: 'Language', uk: 'Мова' },

  // --- sign in ---
  'signin.heading': { en: 'Check your seniority level', uk: 'Перевірте свій рівень сеньйорності' },
  'signin.intro': {
    en: 'A short self-check that places you on the company Performance Review ladder. The result is a starting point for planning your review, not the review itself.',
    uk: 'Коротка самооцінка, яка визначає, де ви зараз перебуваєте на щаблях Performance Review компанії. Результат є відправною точкою для планування вашого review, а не самим review.',
  },
  'signin.button': { en: 'Sign in with Google', uk: 'Увійти через Google' },
  'signin.domains': {
    en: 'Work accounts only: {domains}. Your result will be attached to that address.',
    uk: 'Доступ лише для робочих акаунтів {domains}. Ваш результат буде приєднаний до цієї адреси.',
  },
  'signin.domainsAny': {
    en: 'Your result will be attached to the address you sign in with.',
    uk: 'Ваш результат буде приєднаний до адреси, з якою ви увійдете.',
  },
  'signin.needTitle': { en: 'What you will need', uk: 'Що вам знадобиться' },
  'signin.need1': {
    en: 'About {minutes} minutes without interruptions - the timer runs on the server and does not pause.',
    uk: 'Приблизно {minutes} хвилин без переривань - таймер працює на сервері і не ставиться на паузу.',
  },
  'signin.need2': {
    en: 'One browser window in the foreground: switching away is recorded.',
    uk: 'Одне вікно браузера на передньому плані: перемикання фіксуються.',
  },
  'signin.need3': {
    en: 'A steady connection. A brief drop is fine, a long one ends the attempt.',
    uk: 'Стабільний звʼязок. Короткий обрив не страшний, але тривалий завершить спробу.',
  },
  'signin.rulesLater': {
    en: 'You will see the full integrity rules on the next screen, before the timer starts.',
    uk: 'Повні правила чесного проходження ви побачите на наступному екрані - до того, як запуститься таймер.',
  },
  'signin.failed': { en: 'Sign-in failed.', uk: 'Вхід не вдався.' },

  // --- sign-in failure reasons ---
  'auth.err.auth_domain_not_allowed': {
    en: 'This account is not on a company work domain. Please sign in with your work address.',
    uk: 'Цей акаунт не належить до робочого домену компанії. Увійдіть, будь ласка, з робочої пошти.',
  },
  'auth.err.auth_email_unverified': {
    en: 'Google has not verified this account’s address, so it cannot be used to take the test.',
    uk: 'Адреса цього акаунта не підтверджена в Google, тому пройти тест із неї не вийде.',
  },
  'auth.err.auth_state_mismatch': {
    en: 'The sign-in lost track of its request - usually because the page sat open for a long time. Please try again.',
    uk: 'Сеанс входу втратив звʼязок із запитом - найчастіше це буває, коли сторінка довго висіла відкритою. Спробуйте ще раз.',
  },
  'auth.err.auth_missing_code': {
    en: 'Google did not return the sign-in details. Please try again.',
    uk: 'Google не повернув дані для входу. Спробуйте ще раз.',
  },
  'auth.err.access_denied': { en: 'Sign-in cancelled.', uk: 'Вхід скасовано.' },
  'auth.err.auth_no_email': {
    en: 'Google did not return an address for this account.',
    uk: 'Google не повернув адресу пошти цього акаунта.',
  },
  'auth.err.auth_no_id_token': {
    en: 'Google did not complete the sign-in. Please try again.',
    uk: 'Google не завершив вхід. Спробуйте ще раз.',
  },
  'auth.err.auth_not_configured': {
    en: 'Google sign-in is not configured on this server yet.',
    uk: 'Вхід через Google ще не налаштований на цьому сервері.',
  },
  'auth.err.unknown': {
    en: 'Could not sign in. Please try again.',
    uk: 'Не вдалося увійти. Спробуйте ще раз.',
  },

  // --- start screen ---
  'start.heading': { en: 'Check your seniority level', uk: 'Перевірте свій рівень сеньйорності' },
  'start.intro': {
    en: 'A short self-check that places you on the company Performance Review ladder. The result is a starting point for planning your review, not the review itself.',
    uk: 'Коротка самооцінка, яка визначає, де ви зараз перебуваєте на щаблях Performance Review компанії. Результат є відправною точкою для планування вашого review, а не самим review.',
  },
  'start.stat.questions': { en: 'questions', uk: 'питань' },
  'start.stat.time': { en: 'time limit', uk: 'обмеження часу' },
  'start.stat.minutes': { en: '{n} min', uk: '{n} хв' },

  'start.covers.title': { en: 'What the test covers', uk: 'Що охоплює тест' },
  'start.covers.body': {
    en: 'Theory and practice across the whole range of the role - from the fundamentals through to the judgement calls expected further up. Papers differ from person to person, but they are built to the same shape, so two people who got different papers are still measured on one scale.',
    uk: 'Теорію і практику в усьому діапазоні ролі - від основ до рішень, яких очікують на вищих щаблях. Папери в різних людей різні, але побудовані за однією схемою, тож двоє, які отримали різні варіанти, все одно вимірюються за однією шкалою.',
  },
  'start.covers.noPrep': {
    en: 'There is nothing to revise for. The point is to see where you are today, not what you managed to read last night.',
    uk: 'Готуватися немає до чого. Сенс у тому, щоб побачити, де ви сьогодні, а не що встигли прочитати напередодні.',
  },

  'start.rules.title': { en: 'Integrity rules', uk: 'Правила чесного проходження' },
  'start.rules.bannerTitle': {
    en: 'The attempt ends if you leave the test page.',
    uk: 'Спроба завершується, якщо ви йдете зі сторінки тесту.',
  },
  'start.rules.bannerBody': {
    en: 'Switching to another tab, window or application is recorded and reported to the server. A break shorter than {grace} seconds costs you a warning; after that each interruption counts, and the attempt ends on the {strikes}th. A single absence longer than {hard} seconds ends it immediately, and the result does not count.',
    uk: 'Перехід на іншу вкладку, в інше вікно або в інший застосунок фіксується і передається на сервер. Коротке переривання до {grace} секунд коштує вам попередження; далі кожне переривання зараховується, і спроба завершується на {strikes}-му. Одна відсутність довша за {hard} секунд завершує спробу одразу, і результат не зараховується.',
  },
  'start.rules.foreground': {
    en: 'Keep this window in the foreground for the whole test.',
    uk: 'Тримайте це вікно активним протягом усього тесту.',
  },
  'start.rules.closeTabs': {
    en: 'Close other tabs and turn off notifications before you begin.',
    uk: 'Закрийте інші вкладки і вимкніть сповіщення перед початком.',
  },
  'start.rules.copyPaste': {
    en: 'Right-click, copying and printing are disabled or recorded.',
    uk: 'Правий клік, копіювання і друк вимкнені або фіксуються.',
  },
  'start.rules.reload': {
    en: 'The timer runs on the server, so reloading the page does not reset it. A reload does not end the attempt, but it is recorded and counts as one interruption, so there is no reason to do it.',
    uk: 'Таймер працює на сервері, тож перезавантаження сторінки його не скидає. Саме перезавантаження спробу не завершує, але фіксується і зараховується як одне переривання, тому не варто робити це без потреби.',
  },
  'start.rules.network': {
    en: 'A short connection drop does not end the attempt: the server waits several minutes for you.',
    uk: 'Короткий обрив зʼєднання спробу не завершує: сервер чекає на вас кілька хвилин.',
  },
  'start.rules.answers': {
    en: 'Each answer is sent to the server as soon as you pick it. If the connection goes down, sending is retried automatically until it succeeds - you will see a warning while that happens, and you will not lose an answer or have to pick it again.',
    uk: 'Кожна відповідь надсилається на сервер одразу після вибору. Якщо звʼязок пропаде, надсилання повторюється автоматично, доки не вдасться - ви побачите про це попередження, і втрачати чи вибирати відповідь заново не доведеться.',
  },

  'start.form.title': { en: 'Start the test', uk: 'Почати тест' },
  'start.form.signedInAs': { en: 'Signed in as', uk: 'Ви входите як' },
  'start.form.identityFixed': {
    en: '{email} - your result will be attached to this address. It cannot be changed here: Google has verified it.',
    uk: '{email} - результат приєднається до цієї адреси. Змінити її тут не можна: вона підтверджена входом через Google.',
  },
  'start.form.name': { en: 'Full name', uk: 'Повне імʼя' },
  'start.form.nameError': { en: 'Please enter your name.', uk: 'Будь ласка, введіть своє імʼя.' },
  'start.form.email': { en: 'Work email', uk: 'Робоча пошта' },
  'start.form.emailHint': {
    en: 'Used to attach the result to your Performance Review record.',
    uk: 'Використовується, щоб приєднати результат до вашого запису Performance Review.',
  },
  'start.form.emailError': {
    en: 'Please enter a valid email address.',
    uk: 'Будь ласка, введіть коректну адресу пошти.',
  },
  'start.form.accept': {
    en: 'I have read the integrity rules and understand that leaving this page ends my attempt.',
    uk: 'Я прочитав правила чесного проходження і розумію, що вихід із цієї сторінки завершує мою спробу.',
  },
  'start.form.submit': { en: 'Start the test', uk: 'Почати тест' },
  'start.form.starting': { en: 'Starting…', uk: 'Починаємо...' },
  'start.error': { en: 'Could not start the test.', uk: 'Не вдалося почати тест.' },

  // --- test screen ---
  'test.progress': { en: 'Question {i} / {n}', uk: 'Питання {i} / {n}' },
  'test.saving': { en: 'Saving…', uk: 'Зберігаємо...' },
  'test.unsaved': { en: 'Not saved - retrying', uk: 'Не збережено - повторюємо' },
  'test.answered': { en: 'Answered: {answered} of {total}', uk: 'Відповіді: {answered} з {total}' },
  'test.answeredAria': { en: 'Answers given', uk: 'Відповіді надано' },
  'test.retryTitle': {
    en: 'The connection to the server is unstable.',
    uk: 'Звʼязок із сервером нестабільний.',
  },
  'test.retryBody': {
    en: 'Your latest answers have not been saved yet and we are retrying. This does not end the attempt, and the timer runs on the server. Do not close the page - as soon as the connection is back, the answers will arrive on their own.',
    uk: 'Останні відповіді ще не збереглися, і ми повторюємо спроби надіслати їх. Спробу це не завершує, а таймер іде на сервері. Не закривайте сторінку - щойно звʼязок відновиться, відповіді дійдуть самі.',
  },
  'test.warnTitle': { en: 'Integrity warning', uk: 'Попередження про порушення' },
  'test.warnRemaining': {
    en: 'Warnings left before the attempt ends: {n}.',
    uk: 'Залишилося попереджень до завершення спроби: {n}.',
  },
  'test.multi': { en: 'Select every correct option', uk: 'Оберіть усі правильні варіанти' },
  'test.back': { en: 'Back', uk: 'Назад' },
  'test.next': { en: 'Next', uk: 'Далі' },
  'test.finish': { en: 'Finish and see my level', uk: 'Завершити і побачити рівень' },
  'test.jump': { en: 'Jump to question', uk: 'Перейти до питання' },
  'test.jumpAria': { en: 'Question {n}{state}', uk: 'Питання {n}{state}' },
  'test.jumpAnswered': { en: ', answered', uk: ', є відповідь' },
  'test.jumpUnanswered': { en: ', not answered', uk: ', без відповіді' },
  'test.allAnswered': { en: 'Every question is answered.', uk: 'На всі питання є відповіді.' },
  'test.stillUnanswered': { en: 'Not answered yet: {n}.', uk: 'Без відповіді ще: {n}.' },
  'test.confirmTitle': { en: 'Finish the attempt?', uk: 'Завершити спробу?' },
  'test.confirmAll': {
    en: 'All {n} questions are answered. You will not be able to change them afterwards.',
    uk: 'На всі {n} питань є відповіді. Змінити їх пізніше не вийде.',
  },
  'test.confirmSome': {
    en: '{unanswered} of {total} questions are still unanswered. They will be counted as incorrect.',
    uk: 'Без відповіді лишилося {unanswered} з {total} питань. Вони будуть зараховані як неправильні.',
  },
  'test.keepGoing': { en: 'Keep going', uk: 'Продовжити' },
  'test.submitting': { en: 'Submitting…', uk: 'Надсилаємо...' },
  'test.confirmFinish': { en: 'Finish', uk: 'Завершити' },
  'test.timeLeft': { en: 'Time left', uk: 'Залишилось часу' },

  // --- result screen ---
  'result.caption': { en: 'Estimated level', uk: 'Орієнтовний рівень' },
  'result.correct': {
    en: 'Correct answers: {correct} of {total}',
    uk: 'Правильних відповідей: {correct} з {total}',
  },
  'result.nextTitle': { en: 'Next rung', uk: 'Наступний щабель' },
  'result.topRung': {
    en: 'You reached the top rung in this test. A Performance Review at Senior also expects an ISTQB Advanced Level certification.',
    uk: 'У цьому тесті ви дісталися верхнього щабля. Performance Review для рівня Senior також очікує сертифікацію ISTQB Advanced Level.',
  },
  'result.expiredTitle': { en: 'Time is up', uk: 'Час вичерпано' },
  'result.expiredBody': {
    en: 'The attempt was scored from the answers saved before the time ran out. Unanswered questions counted as incorrect.',
    uk: 'Спробу оцінено за відповідями, збереженими до завершення часу. Питання без відповіді зараховані як неправильні.',
  },
  'result.byTier': { en: 'Result by level', uk: 'Результат за рівнями' },
  'result.byTierNote': {
    en: 'The rung is decided by these four numbers against the thresholds in the Performance Review sheet. A level only counts once the ones below it are solid - which is why a strong result higher up does not make up for a weak one lower down.',
    uk: 'Щабель визначається саме цими чотирма числами за порогами з таблиці Performance Review. Рівень має вагу лише тоді, коли рівні під ним міцні - тому сильний результат вище не компенсує слабкий нижче.',
  },
  'result.tierAria': { en: 'Level {tier}: {percent} percent', uk: 'Рівень {tier}: {percent} відсотків' },
  'result.ladderTitle': { en: 'Where this level sits', uk: 'Де розташований цей рівень' },
  'result.ladderLevel': { en: 'Level', uk: 'Рівень' },
  'result.ladderRequires': { en: 'Requires', uk: 'Вимоги' },
  'result.ladderYou': { en: 'You', uk: 'Ви' },
  'result.belowTrainee': { en: 'Below the Trainee threshold', uk: 'Нижче порога Trainee' },
  'result.yourResult': { en: 'Your result', uk: 'Ваш результат' },
  'result.compsTitle': {
    en: 'Competencies worth looking at first',
    uk: 'Компетенції, на які варто глянути першими',
  },
  'result.compsNote': {
    en: 'Taken from the Performance Review rows your paper actually touched. Twenty questions cannot cover every row, so treat this as a topic for the conversation rather than a verdict.',
    uk: 'Взято з тих рядків таблиці Performance Review, яких торкнувся ваш варіант. Двадцять питань не можуть покрити кожен рядок, тож сприймайте це як тему для розмови, а не як вирок.',
  },
  'result.compColumn': { en: 'Competency', uk: 'Компетенція' },
  'result.compLevel': { en: 'Level', uk: 'Рівень' },
  'result.compScore': { en: 'Score', uk: 'Результат' },
  'result.reviewTitle': { en: 'Answer review', uk: 'Розбір відповідей' },
  'result.answersTitle': { en: 'Your answers, question by question', uk: 'Ваші відповіді за питаннями' },
  'result.hide': { en: 'Hide', uk: 'Сховати' },
  'result.showAnswers': { en: 'Show all {n} answers', uk: 'Показати всі {n} відповідей' },
  'result.showQuestions': { en: 'Show all {n} questions', uk: 'Показати всі {n} питань' },
  'result.keyWithheld': {
    en: 'The correct answers and explanations are not shown: the question bank has to stay usable for future assessments. You can see which questions counted, and your reviewer gets the detailed breakdown along with the result.',
    uk: 'Правильні відповіді й пояснення не показуються: банк питань має лишитися придатним для наступних оцінювань. Ви бачите, які питання зараховано, а детальний розбір доступний вашому керівнику разом із результатом.',
  },
  'result.right': { en: 'Correct', uk: 'Правильно' },
  'result.wrong': { en: 'Incorrect', uk: 'Неправильно' },
  'result.yourAnswer': { en: 'Your answer: ', uk: 'Ваша відповідь: ' },
  'result.noAnswer': { en: 'not answered', uk: 'без відповіді' },
  'result.correctAnswer': { en: 'Correct answer: ', uk: 'Правильна відповідь: ' },
  'result.restart': { en: 'Start a new attempt', uk: 'Почати нову спробу' },
  'result.restartNote': {
    en: 'A new attempt gives you a different paper. Share this result with your manager when you plan your Performance Review.',
    uk: 'Нова спроба видає інший варіант. Поділіться цим результатом з керівником, коли плануватимете Performance Review.',
  },

  // --- terminated ---
  'term.heading': { en: 'Attempt ended', uk: 'Спробу завершено' },
  'term.rulesTitle': { en: 'Integrity rules', uk: 'Правила чесного проходження' },
  'term.default': {
    en: 'This attempt was ended under the integrity rules.',
    uk: 'Цю спробу завершено за правилами чесного проходження тесту.',
  },
  'term.body': {
    en: 'The attempt was not scored. If you believe this is a mistake - a system notification, a dropped connection - talk to your manager or QA lead: every event is recorded with a timestamp and a duration, so the record can be reviewed.',
    uk: 'Спробу не оцінено. Якщо ви вважаєте, що це помилка - системне сповіщення, обрив зʼєднання - зверніться до керівника або QA-ліда: кожна подія записана з міткою і тривалістю, тож запис можна переглянути.',
  },
  'term.back': { en: 'Back to the start', uk: 'Повернутися на початок' },

  // --- proctor / runtime messages ---
  'proctor.leftPage': {
    en: 'You left the test page. The attempt will end if this keeps happening.',
    uk: 'Ви залишили сторінку тесту. Спроба завершиться, якщо це повторюватиметься.',
  },
  'proctor.navAway': {
    en: 'Leaving the test page has been recorded.',
    uk: 'Вихід зі сторінки тесту зафіксовано.',
  },
  'err.attemptGone': { en: 'The attempt no longer exists.', uk: 'Спроби вже немає.' },
  'err.submit': { en: 'Could not finish the attempt.', uk: 'Не вдалося завершити спробу.' },
  'err.unsavedOnSubmit': {
    en: 'Your latest answers have not been saved yet - the connection is unstable. Do not close the page: as soon as it is back, press Finish again.',
    uk: 'Останні відповіді ще не збереглися - зʼєднання нестабільне. Не закривайте сторінку: щойно звʼязок відновиться, натисніть «Завершити» ще раз.',
  },

  // --- sources shown on the result review ---
  'source.pr-matrix': { en: 'Performance Review matrix', uk: 'Матриця Performance Review' },
  'source.istqb-ctfl': { en: 'ISTQB Foundation Level', uk: 'ISTQB Foundation Level' },
  'source.istqb-ctal-ta': { en: 'ISTQB Test Analyst', uk: 'ISTQB Test Analyst' },
  'source.istqb-ctal-tm': { en: 'ISTQB Test Manager', uk: 'ISTQB Test Manager' },
  'source.istqb-glossary': { en: 'ISTQB glossary', uk: 'Глосарій ISTQB' },
  'source.practice-dump': { en: 'Practice', uk: 'Практика' },
} as const satisfies Record<string, Entry>;

export type StringKey = keyof typeof S;

/** `{name}` placeholders, replaced positionally by name. Missing ones stay put. */
function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (whole, name: string) =>
    name in vars ? String(vars[name]) : whole,
  );
}

export function translate(
  locale: Locale,
  key: StringKey,
  vars?: Record<string, string | number>,
): string {
  return interpolate(S[key][locale], vars);
}

export interface I18n {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: StringKey, vars?: Record<string, string | number>) => string;
  /**
   * Resolves a string that came from the server in both languages - question
   * text, options, explanations. Separate from `t` because it is content
   * rather than interface: nothing about it is known at build time.
   */
  text: (value: LocalizedText) => string;
}

const LocaleContext = createContext<I18n | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    // Screen readers and browser translation both key off this.
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Non-fatal: the choice applies to this page load only.
    }
  }, []);

  const value = useMemo<I18n>(
    () => ({
      locale,
      setLocale,
      t: (key, vars) => translate(locale, key, vars),
      text: (value) => value[locale],
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/**
 * Label for a question's source.
 *
 * Falls back to the raw id: a new source added to the bank should show up as
 * itself rather than vanish, so the gap is visible instead of silent.
 */
export function sourceLabel(
  t: (key: StringKey, vars?: Record<string, string | number>) => string,
  source: string,
): string {
  const key = `source.${source}` as StringKey;
  return key in S ? t(key) : source;
}

export function useI18n(): I18n {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useI18n used outside LocaleProvider');
  return value;
}

/** The switch itself. Two languages, so a pair of buttons beats a select. */
export function LocaleSwitch() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div className="lang" role="group" aria-label={t('lang.label')}>
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          className={`lang__btn${code === locale ? ' lang__btn--on' : ''}`}
          aria-pressed={code === locale}
          onClick={() => setLocale(code)}
        >
          {code.toUpperCase()}
          <span className="sr-only"> {LOCALE_NAMES[code]}</span>
        </button>
      ))}
    </div>
  );
}
