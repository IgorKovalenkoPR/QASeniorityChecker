import type { MetaResponse } from '../lib/api.js';
import { useI18n } from '../lib/i18n.js';
import type { StringKey } from '../lib/i18n.js';
import { Banner, Card } from '../components/ui.js';

/**
 * Екран входу.
 *
 * Показується, поки кандидат не увійшов. Сенс не в тому, щоб когось не
 * пустити, а в тому, щоб результат був приєднаний до адреси, яку **підтвердив
 * Google**, а не до тієї, яку людина набрала руками - інакше результат
 * оцінювання неможливо покласти в чийсь Performance Review із певністю, що це
 * та сама людина.
 */

/** Причини відмови, які сервер повертає в `?auth_error=`. */
const REASON_KEYS: Record<string, StringKey> = {
  auth_domain_not_allowed: 'auth.err.auth_domain_not_allowed',
  auth_email_unverified: 'auth.err.auth_email_unverified',
  auth_state_mismatch: 'auth.err.auth_state_mismatch',
  auth_missing_code: 'auth.err.auth_missing_code',
  access_denied: 'auth.err.access_denied',
  auth_no_email: 'auth.err.auth_no_email',
  auth_no_id_token: 'auth.err.auth_no_id_token',
  auth_not_configured: 'auth.err.auth_not_configured',
};

export function SignInScreen({
  meta,
  authError,
}: {
  meta: MetaResponse | null;
  authError: string | null;
}) {
  const { t } = useI18n();
  const domains = meta?.auth.allowedEmailDomains ?? [];
  const minutes = meta ? Math.round(meta.durationSeconds / 60) : 30;
  const reason = authError ? t(REASON_KEYS[authError] ?? 'auth.err.unknown') : null;

  return (
    <div className="stack">
      {reason ? (
        <Banner tone="danger" title={t('signin.failed')}>
          {reason}
        </Banner>
      ) : null}

      <Card>
        <h1 style={{ fontSize: 'var(--fs-h1)', marginBottom: 'var(--sp-4)' }}>
          {t('signin.heading')}
        </h1>
        <p className="muted">{t('signin.intro')}</p>

        <div style={{ marginTop: 'var(--sp-6)' }}>
          {/*
            Звичайне посилання, а не fetch: сервер відповідає редиректом на
            Google, і пройти його має саме браузер верхнього рівня.
          */}
          <a className="btn btn--primary" href="/api/auth/google/start">
            {t('signin.button')}
          </a>
        </div>

        <p className="small muted" style={{ marginTop: 'var(--sp-4)' }}>
          {domains.length > 0
            ? t('signin.domains', { domains: domains.map((d) => `@${d}`).join(', ') })
            : t('signin.domainsAny')}
        </p>
      </Card>

      <Card>
        <h2 className="card__title">{t('signin.needTitle')}</h2>
        <ul className="small muted" style={{ paddingLeft: 'var(--sp-5)' }}>
          <li>{t('signin.need1', { minutes })}</li>
          <li>{t('signin.need2')}</li>
          <li>{t('signin.need3')}</li>
        </ul>
        <p className="small muted" style={{ marginTop: 'var(--sp-3)' }}>
          {t('signin.rulesLater')}
        </p>
      </Card>
    </div>
  );
}
