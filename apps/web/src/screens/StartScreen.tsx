import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Identity, MetaResponse } from '../lib/api.js';
import { Banner, Card } from '../components/ui.js';

/**
 * Стартовий екран.
 *
 * Правила чесності показані повністю ДО того, як запуститься таймер, і їх треба
 * підтвердити. Це не формальність: правило проктарингу, про яке кандидат
 * дізнається лише порушивши його, несправедливе, а спроба, завершена за
 * правилом, якого ніхто не пояснив, непридатна для розмови на Performance
 * Review.
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
        <h1>Перевірте свій рівень сеньйорності</h1>
        <p className="muted" style={{ marginTop: 'var(--sp-3)' }}>
          Коротка самооцінка, яка визначає, де ви зараз перебуваєте на щаблях Performance Review
          компанії - від Trainee&minus; до Senior. Результат є відправною точкою для планування
          вашого review, а не самим review.
        </p>
        <div className="row" style={{ marginTop: 'var(--sp-5)' }}>
          <Fact value={meta ? String(meta.questionsPerTest) : '20'} label="питань" />
          <Fact value={`${minutes} хв`} label="обмеження часу" />
          <Fact value={meta ? String(meta.variantCount) : '50'} label="варіантів тесту" />
          <Fact value={meta ? String(meta.bank.total) : '500+'} label="питань у банку" />
        </div>
      </Card>

      <div className="stack" style={{ gap: 'var(--sp-5)' }}>
        <Card>
          <h2 className="card__title">Що охоплює тест</h2>
          <p className="muted small">
            Кожен варіант побудований за однією й тією самою схемою, тож двоє людей, які отримали
            різні варіанти, все одно вимірюються за однією шкалою.
          </p>
          <div className="table__scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>Рівень</th>
                  <th>Питань</th>
                  <th>Джерела</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Trainee</td>
                  <td>4</td>
                  <td>Матриця Performance Review, термінологія</td>
                </tr>
                <tr>
                  <td>Junior</td>
                  <td>6</td>
                  <td>Матриця Performance Review, ISTQB Foundation Level, глосарій</td>
                </tr>
                <tr>
                  <td>Middle</td>
                  <td>6</td>
                  <td>Матриця Performance Review, ISTQB Test Analyst, глосарій</td>
                </tr>
                <tr>
                  <td>Senior</td>
                  <td>4</td>
                  <td>Матриця Performance Review, ISTQB Test Manager і Test Analyst</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h2 className="card__title">Правила чесного проходження</h2>
          <Banner tone="warning" title="Спроба завершується, якщо ви йдете зі сторінки тесту.">
            Перехід на іншу вкладку, в інше вікно або в інший застосунок фіксується і передається на
            сервер. Коротке переривання до {graceSec} секунд коштує вам попередження; далі кожне
            переривання зараховується, і спроба завершується на {strikes}-му. Одна відсутність
            довша за {hardSec} секунд завершує спробу одразу, і результат не зараховується.
          </Banner>
          <ul className="small muted" style={{ marginTop: 'var(--sp-4)', paddingLeft: 'var(--sp-5)' }}>
            <li>Тримайте це вікно активним протягом усього тесту.</li>
            <li>Закрийте інші вкладки і вимкніть сповіщення перед початком.</li>
            <li>Правий клік, копіювання і друк вимкнені або фіксуються.</li>
            <li>
              Таймер працює на сервері, тож перезавантаження сторінки його не скидає. Саме
              перезавантаження спробу не завершує, але фіксується і зараховується як одне
              переривання, тому не варто робити це без потреби.
            </li>
            <li>
              Короткий обрив зʼєднання спробу не завершує: сервер чекає на вас кілька хвилин.
            </li>
            <li>
              Кожна відповідь надсилається на сервер одразу після вибору. Якщо звʼязок пропаде,
              надсилання повторюється автоматично, доки не вдасться - ви побачите про це
              попередження, і втрачати чи вибирати відповідь заново не доведеться.
            </li>
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="card__title">Почати тест</h2>
        <form className="stack" onSubmit={submit} noValidate>
          {identityFromGoogle ? (
            <div className="field">
              <span className="field__label">Ви входите як</span>
              <div style={{ fontWeight: 500, color: 'var(--ink-strong)' }}>{identity.name}</div>
              <span className="field__hint">
                {identity.email} - результат приєднається до цієї адреси. Змінити її тут не можна:
                вона підтверджена входом через Google.
              </span>
            </div>
          ) : (
            <>
              <div className="field">
                <label className="field__label" htmlFor="candidate-name">
                  Повне імʼя
                </label>
                <input
                  id="candidate-name"
                  className="field__input"
                  value={name}
                  autoComplete="name"
                  onChange={(event) => setName(event.target.value)}
                />
                {touched && !nameValid ? (
                  <span className="field__error">Будь ласка, введіть своє імʼя.</span>
                ) : null}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="candidate-email">
                  Робоча пошта
                </label>
                <input
                  id="candidate-email"
                  className="field__input"
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <span className="field__hint">
                  Використовується, щоб приєднати результат до вашого запису Performance Review.
                </span>
                {touched && !emailValid ? (
                  <span className="field__error">Будь ласка, введіть коректну адресу пошти.</span>
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
            <span className="small">
              Я прочитав правила чесного проходження і розумію, що вихід із цієї сторінки завершує
              мою спробу.
            </span>
          </label>

          {error ? <Banner tone="danger">{error}</Banner> : null}

          <div>
            <button className="btn btn--primary" type="submit" disabled={!canStart}>
              {busy ? 'Запускаємо...' : 'Почати тест'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div style={{ fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)', color: 'var(--ink-strong)' }}>
        {value}
      </div>
      <div className="small muted">{label}</div>
    </div>
  );
}
