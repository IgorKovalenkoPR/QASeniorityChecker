import { useState } from 'react';
import type { Level, Tier } from '@qasc/core';
import { TIERS } from '@qasc/core';
import type { MetaResponse, ResultResponse } from '../lib/api.js';
import { Banner, Card, TIER_LABELS } from '../components/ui.js';
import { sourceLabel, useI18n } from '../lib/i18n.js';

/** Which tier colour a level badge takes. */
function tierOfLevel(level: Level): Tier {
  if (level.startsWith('trainee')) return 'trainee';
  if (level.startsWith('junior')) return 'junior';
  if (level.startsWith('middle')) return 'middle';
  return 'senior';
}

export function ResultScreen({
  result,
  meta,
  onRestart,
}: {
  result: ResultResponse;
  meta: MetaResponse | null;
  onRestart: () => void;
}) {
  const { t, text } = useI18n();
  const [showReview, setShowReview] = useState(false);
  const { breakdown } = result;
  const label = meta?.levelLabels[breakdown.level] ?? breakdown.level;
  const tier = tierOfLevel(breakdown.level);
  const weakest = breakdown.competencies.filter((c) => c.percent < 100).slice(0, 5);

  return (
    <div className="stack">
      <Card hero>
        <div className="result-hero">
          <div className={`level-badge level-badge--${tier}`}>
            <span className="level-badge__caption">{t('result.caption')}</span>
            <span className="level-badge__value">{label}</span>
          </div>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <h1>
              {t('result.correct', { correct: breakdown.correct, total: breakdown.total })}
            </h1>
            <p className="muted" style={{ marginTop: 'var(--sp-3)' }}>
              {breakdown.rationale}
            </p>
            {breakdown.nextLevelGap ? (
              <Banner tone="info" title={t('result.nextTitle')}>
                {breakdown.nextLevelGap}
              </Banner>
            ) : (
              <Banner tone="info">
                {t('result.topRung')}
              </Banner>
            )}
          </div>
        </div>
      </Card>

      {result.status === 'expired' ? (
        <Banner tone="warning" title={t('result.expiredTitle')}>
          {t('result.expiredBody')}
        </Banner>
      ) : null}

      <Card>
        <h2 className="card__title">{t('result.byTier')}</h2>
        <p className="muted small">
          {t('result.byTierNote')}
        </p>
        <div className="tier-bars" style={{ marginTop: 'var(--sp-5)' }}>
          {TIERS.map((tier) => {
            const score = breakdown.tiers[tier];
            return (
              <div key={tier}>
                <div className="tier-bar__head">
                  <strong>{TIER_LABELS[tier]}</strong>
                  <span className="muted">
                    {score.correct}/{score.total} &middot; {score.percent}%
                  </span>
                </div>
                <div
                  className="tier-bar__track"
                  role="img"
                  aria-label={t('result.tierAria', { tier: TIER_LABELS[tier], percent: score.percent })}
                >
                  <div className={`tier-bar__fill tier-bar__fill--${tier}`} style={{ width: `${score.percent}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {meta ? (
        <Card>
          <h2 className="card__title">{t('result.ladderTitle')}</h2>
          <div className="table__scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>{t('result.ladderLevel')}</th>
                  <th>{t('result.ladderRequires')}</th>
                  <th>{t('result.ladderYou')}</th>
                </tr>
              </thead>
              <tbody>
                {meta.ladder.map((rule) => {
                  const isYou = rule.level === breakdown.level;
                  const requires = Object.entries(rule.requires)
                    .map(([t, min]) => `${TIER_LABELS[t as Tier]} >= ${min}%`)
                    .join(', ');
                  return (
                    <tr
                      key={rule.level}
                      style={isYou ? { background: 'var(--brand-primary-tint)', fontWeight: 600 } : undefined}
                    >
                      <td>{rule.label}</td>
                      <td className="muted">{requires || t('result.belowTrainee')}</td>
                      <td>{isYou ? t('result.yourResult') : ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {weakest.length > 0 ? (
        <Card>
          <h2 className="card__title">{t('result.compsTitle')}</h2>
          <p className="muted small">
            {t('result.compsNote')}
          </p>
          <div className="table__scroll" style={{ marginTop: 'var(--sp-4)' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>{t('result.compColumn')}</th>
                  <th>{t('result.compLevel')}</th>
                  <th>{t('result.compScore')}</th>
                </tr>
              </thead>
              <tbody>
                {weakest.map((c) => (
                  <tr key={c.competencyId}>
                    <td>{c.label}</td>
                    <td>
                      <span className={`badge badge--${c.tier}`}>{TIER_LABELS[c.tier]}</span>
                    </td>
                    <td>
                      {c.correct}/{c.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      <Card>
        <div className="row row--between">
          <h2 style={{ fontSize: 'var(--fs-h3)' }}>
            {result.answersRevealed ? t('result.reviewTitle') : t('result.answersTitle')}
          </h2>
          <button className="btn btn--secondary" type="button" onClick={() => setShowReview((v) => !v)}>
            {showReview
              ? t('result.hide')
              : result.answersRevealed
                ? t('result.showAnswers', { n: result.questions.length })
                : t('result.showQuestions', { n: result.questions.length })}
          </button>
        </div>
        {!result.answersRevealed ? (
          <p className="small muted" style={{ marginTop: 'var(--sp-2)' }}>
            {t('result.keyWithheld')}
          </p>
        ) : null}
        {showReview ? (
          <div className="review" style={{ marginTop: 'var(--sp-5)' }}>
            {result.questions.map((q, i) => (
              <article key={q.id} className={`review__item ${q.correct ? '' : 'review__item--wrong'}`.trim()}>
                <div className="question__meta">
                  <span className="badge badge--neutral">{i + 1}</span>
                  <span className={`badge badge--${q.tier}`}>{TIER_LABELS[q.tier]}</span>
                  <span className="badge badge--neutral">{sourceLabel(t, q.source)}</span>
                  <span className={`option__mark option__mark--${q.correct ? 'correct' : 'incorrect'}`}>
                    {q.correct ? t('result.right') : t('result.wrong')}
                  </span>
                </div>
                <div style={{ fontWeight: 500, color: 'var(--ink-strong)' }}>{text(q.text)}</div>
                <div className="small" style={{ marginTop: 'var(--sp-3)' }}>
                  <div>
                    <span className="muted">{t('result.yourAnswer')}</span>
                    {q.yourAnswer.length > 0 ? (
                      q.yourAnswer.map(text).join('; ')
                    ) : (
                      <em className="muted">{t('result.noAnswer')}</em>
                    )}
                  </div>
                  {!q.correct && q.correctAnswer ? (
                    <div style={{ marginTop: 'var(--sp-1)' }}>
                      <span className="muted">{t('result.correctAnswer')}</span>
                      {q.correctAnswer.map(text).join('; ')}
                    </div>
                  ) : null}
                </div>
                {q.explanation ? (
                  <div className="review__explanation">{text(q.explanation)}</div>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}
      </Card>

      <div className="row">
        <button className="btn btn--ghost" type="button" onClick={onRestart}>
          {t('result.restart')}
        </button>
        <span className="small muted">
          {t('result.restartNote')}
        </span>
      </div>
    </div>
  );
}
