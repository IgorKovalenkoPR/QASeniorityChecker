import type { ReactNode } from 'react';
import type { Tier } from '@qasc/core';
import { useI18n } from '../lib/i18n.js';

// Re-exported rather than redefined: the same names are needed in core, where
// `describeGap` composes a sentence out of them, and two copies of a label are
// two things to keep in step. Imported as well as re-exported, because
// `TierBadge` below reads it.
import { TIER_LABELS } from '@qasc/core';
export { TIER_LABELS };

/**
 * Рівні лишаються англійськими: це власні назви щаблів компанії з таблиці
 * Performance Review, і саме так їх називають на самому review.
 */

export function Card({
  children,
  hero = false,
  className = '',
}: {
  children: ReactNode;
  hero?: boolean;
  className?: string;
}) {
  return <section className={`card ${hero ? 'card--hero' : ''} ${className}`.trim()}>{children}</section>;
}

export function TierBadge({ tier }: { tier: Tier }) {
  return <span className={`badge badge--${tier}`}>{TIER_LABELS[tier]}</span>;
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tier | 'neutral' }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}

export function Progress({ answered, total }: { answered: number; total: number }) {
  const { t } = useI18n();
  const percent = total === 0 ? 0 : Math.round((answered / total) * 100);
  return (
    <div className="progress">
      <div
        className="progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={answered}
        aria-label={t('test.answeredAria')}
      >
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress__label">
        {t('test.answered', { answered, total })}
      </span>
    </div>
  );
}

/**
 * Countdown driven by the SERVER deadline.
 *
 * `secondsRemaining` is recomputed from a server timestamp on every heartbeat, so
 * a candidate who changes their system clock changes only the digits between two
 * pings, and the submit endpoint would reject them anyway.
 */
export function Timer({ seconds }: { seconds: number }) {
  const tone = seconds <= 60 ? 'critical' : seconds <= 300 ? 'warning' : '';
  const mm = Math.floor(Math.max(0, seconds) / 60)
    .toString()
    .padStart(2, '0');
  const ss = (Math.max(0, seconds) % 60).toString().padStart(2, '0');
  return (
    <span className={`timer ${tone ? `timer--${tone}` : ''}`.trim()} role="timer" aria-live="off">
      <span aria-hidden="true">&#9201;</span>
      {mm}:{ss}
    </span>
  );
}

export function Banner({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'warning' | 'danger';
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={`banner ${tone === 'info' ? '' : `banner--${tone}`}`.trim()} role="status">
      <div>
        {title ? <div className="banner__title">{title}</div> : null}
        <div>{children}</div>
      </div>
    </div>
  );
}
