import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Identity, MetaResponse } from '../lib/api.js';
import { useI18n } from '../lib/i18n.js';
import { Banner, Card } from '../components/ui.js';

/**
 * Стартовий екран.
 *
 * Правила чесності показані повністю ДО того, як запуститься таймер, і їх треба
 * підтвердити. Це не формальність: правило проктарингу, про яке кандидат
 * дізнається лише порушивши його, несправедливе, а спроба, завершена за
 * правилом, якого ніхто не пояснив, непридатна для розмови на Performance
 * Review.
 *
 * Що цей екран НЕ показує, і теж свідомо: скільки питань у банку, скільки є
 * варіантів, як папір розкладений по щаблях і з яких силабусів узятий. Усе це
 * читається як інструкція, до чого готуватися, а тест міряє не те, що людина
 * встигла прочитати напередодні.
 */
export function StartScreen({
  meta,
  identity,
  onStart,
  busy,
  error,
}: {
  meta: MetaResponse | null;
  identity: Identity | null;
  onStart: (input: { candidateName?: string; candidateEmail?: string }) => void;
  busy: boolean;
  error: string | null;
}) {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [touched, setTouched] = useState(false);

  // When Google owns the identity there is nothing to type and nothing to
  // validate: the server takes the name and the address from the verified
  // session and ignores anything sent in the body.
  const identityFromGoogle = identity !== null;
  const nameValid = name.trim().length >= 2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canStart = (identityFromGoogle || (nameValid && emailValid)) && accepted && !busy;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (!canStart) return;
    if (identityFromGoogle) onStart({});
    else onStart({ candidateName: name.trim(), candidateEmail: email.trim() });
  };

  const minutes = meta ? Math.round(meta.durationSeconds / 60) : 30;
  const graceSec = meta ? Math.round(meta.integrity.graceMs / 1000) : 2;
  const hardSec = meta ? Math.round(meta.integrity.hardTerminateMs / 1000) : 30;
  const strikes = meta ? meta.integrity.strikesAllowed : 4;

  return (
    <div className="stack">
      <Card hero>
        <h1>{t('start.heading')}</h1>
        <p className="muted" style={{ marginTop: 'var(--sp-3)' }}>
          {t('start.intro')}
        </p>
        <div className="row" style={{ marginTop: 'var(--sp-5)' }}>
          <Fact
            value={meta ? String(meta.questionsPerTest) : '20'}
            label={t('start.stat.questions')}
          />
          <Fact value={t('start.stat.minutes', { n: minutes })} label={t('start.stat.time')} />
        </div>
      </Card>

      <div className="stack" style={{ gap: 'var(--sp-5)' }}>
        <Card>
          <h2 className="card__title">{t('start.covers.title')}</h2>
          <p className="muted small">{t('start.covers.body')}</p>
          <p className="muted small" style={{ marginTop: 'var(--sp-3)' }}>
            {t('start.covers.noPrep')}
          </p>
        </Card>

        <Card>
          <h2 className="card__title">{t('start.rules.title')}</h2>
          <Banner tone="warning" title={t('start.rules.bannerTitle')}>
            {t('start.rules.bannerBody', { grace: graceSec, strikes, hard: hardSec })}
          </Banner>
          <ul
            className="small muted"
            style={{ marginTop: 'var(--sp-4)', paddingLeft: 'var(--sp-5)' }}
          >
            <li>{t('start.rules.foreground')}</li>
            <li>{t('start.rules.closeTabs')}</li>
            <li>{t('start.rules.copyPaste')}</li>
            <li>{t('start.rules.reload')}</li>
            <li>{t('start.rules.network')}</li>
            <li>{t('start.rules.answers')}</li>
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="card__title">{t('start.form.title')}</h2>
        <form className="stack" onSubmit={submit} noValidate>
          {identityFromGoogle ? (
            <div className="field">
              <span className="field__label">{t('start.form.signedInAs')}</span>
              <div style={{ fontWeight: 500, color: 'var(--ink-strong)' }}>{identity.name}</div>
              <span className="field__hint">
                {t('start.form.identityFixed', { email: identity.email })}
              </span>
            </div>
          ) : (
            <>
              <div className="field">
                <label className="field__label" htmlFor="candidate-name">
                  {t('start.form.name')}
                </label>
                <input
                  id="candidate-name"
                  className="field__input"
                  value={name}
                  autoComplete="name"
                  onChange={(event) => setName(event.target.value)}
                />
                {touched && !nameValid ? (
                  <span className="field__error">{t('start.form.nameError')}</span>
                ) : null}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="candidate-email">
                  {t('start.form.email')}
                </label>
                <input
                  id="candidate-email"
                  className="field__input"
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <span className="field__hint">{t('start.form.emailHint')}</span>
                {touched && !emailValid ? (
                  <span className="field__error">{t('start.form.emailError')}</span>
                ) : null}
              </div>
            </>
          )}

          <label className="row" style={{ alignItems: 'flex-start', gap: 'var(--sp-3)' }}>
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              style={{ marginTop: '4px' }}
            />
            <span className="small">{t('start.form.accept')}</span>
          </label>

          {error ? <Banner tone="danger">{error}</Banner> : null}

          <div>
            <button className="btn btn--primary" type="submit" disabled={!canStart}>
              {busy ? t('start.form.starting') : t('start.form.submit')}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div className="fact">
      <div className="fact__value">{value}</div>
      <div className="fact__label">{label}</div>
    </div>
  );
}
