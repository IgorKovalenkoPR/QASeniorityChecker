import type { MetaResponse } from '../lib/api.js';
import { Banner, Card } from '../components/ui.js';

/**
 * Екран входу.
 *
 * Показується, поки кандидат не увійшов. Сенс не в тому, щоб когось не
 * пустити, а в тому, щоб результат був приєднаний до адреси, яку **підтвердив
 * Google**, а не до тієї, яку людина набрала руками - інакше результат
 * оцінювання неможливо покласти в чийсь Performance Review із певністью, що це
 * та сама людина.
 */

/** Причини відмови, які сервер повертає в `?auth_error=`. */
const REASONS: Record<string, string> = {
  auth_domain_not_allowed:
    'Цей акаунт не належить до робочого домену компанії. Увійдіть, будь ласка, з робочої пошти.',
  auth_email_unverified:
    'Адреса цього акаунта не підтверджена в Google, тому пройти тест із неї не вийде.',
  auth_state_mismatch:
    'Сеанс входу втратив звʼязок із запитом - найчастіше це буває, коли сторінка довго висіла відкритою. Спробуйте ще раз.',
  auth_missing_code: 'Google не повернув дані для входу. Спробуйте ще раз.',
  access_denied: 'Вхід скасовано.',
  auth_no_email: 'Google не повернув адресу пошти цього акаунта.',
  auth_no_id_token: 'Google не завершив вхід. Спробуйте ще раз.',
  auth_not_configured: 'Вхід через Google ще не налаштований на цьому сервері.',
};

export function SignInScreen({
  meta,
  authError,
}: {
  meta: MetaResponse | null;
  authError: string | null;
}) {
  const domains = meta?.auth.allowedEmailDomains ?? [];
  const reason = authError
    ? (REASONS[authError] ?? 'Не вдалося увійти. Спробуйте ще раз.')
    : null;

  return (
    <div className="stack">
      {reason ? (
        <Banner tone="danger" title="Вхід не вдався.">
          {reason}
        </Banner>
      ) : null}

      <Card>
        <h1 style={{ fontSize: 'var(--fs-h1)', marginBottom: 'var(--sp-4)' }}>
          Перевірте свій рівень сеньйорності
        </h1>
        <p className="muted">
          Коротка самооцінка, яка визначає, де ви зараз перебуваєте на щаблях Performance Review
          компанії - від Trainee− до Senior. Результат є відправною точкою для планування вашого
          review, а не самим review.
        </p>

        <div style={{ marginTop: 'var(--sp-6)' }}>
          {/*
            Звичайне посилання, а не fetch: сервер відповідає редиректом на
            Google, і пройти його має саме браузер верхнього рівня.
          */}
          <a className="btn btn--primary" href="/api/auth/google/start">
            Увійти через Google
          </a>
        </div>

        <p className="small muted" style={{ marginTop: 'var(--sp-4)' }}>
          {domains.length > 0 ? (
            <>
              Доступ лише для робочих акаунтів{' '}
              <strong>{domains.map((d) => `@${d}`).join(', ')}</strong>. Ваш результат буде
              приєднаний до цієї адреси.
            </>
          ) : (
            <>Ваш результат буде приєднаний до адреси, з якою ви увійдете.</>
          )}
        </p>
      </Card>

      <Card>
        <h2 className="card__title">Що вам знадобиться</h2>
        <ul className="small muted" style={{ paddingLeft: 'var(--sp-5)' }}>
          <li>
            Приблизно {meta ? Math.round(meta.durationSeconds / 60) : 30} хвилин без переривань -
            таймер працює на сервері і не ставиться на паузу.
          </li>
          <li>Одне вікно браузера на передньому плані: перемикання фіксуються.</li>
          <li>Стабільний звʼязок. Короткий обрив не страшний, але тривалий завершить спробу.</li>
        </ul>
        <p className="small muted" style={{ marginTop: 'var(--sp-3)' }}>
          Повні правила чесного проходження ви побачите на наступному екрані - до того, як
          запуститься таймер.
        </p>
      </Card>
    </div>
  );
}
