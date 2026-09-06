import { useState } from 'react';
import type { Level, Tier } from '@qasc/core';
import { TIERS } from '@qasc/core';
import type { MetaResponse, ResultResponse } from '../lib/api.js';
import { Banner, Card, SOURCE_LABELS, TIER_LABELS } from '../components/ui.js';

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
            <span className="level-badge__caption">Орієнтовний рівень</span>
            <span className="level-badge__value">{label}</span>
          </div>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <h1>
              Правильних відповідей: {breakdown.correct} з {breakdown.total}
            </h1>
            <p className="muted" style={{ marginTop: 'var(--sp-3)' }}>
              {breakdown.rationale}
            </p>
            {breakdown.nextLevelGap ? (
              <Banner tone="info" title="Наступний щабель">
                {breakdown.nextLevelGap}
              </Banner>
            ) : (
              <Banner tone="info">
                У цьому тесті ви дісталися верхнього щабля. Performance Review для рівня Senior також
                очікує сертифікацію ISTQB Advanced Level.
              </Banner>
            )}
          </div>
        </div>
      </Card>

      {result.status === 'expired' ? (
        <Banner tone="warning" title="Час вичерпано">
          Спробу оцінено за відповідями, збереженими до завершення часу. Питання без відповіді
          зараховані як неправильні.
        </Banner>
      ) : null}

      <Card>
        <h2 className="card__title">Результат за рівнями</h2>
        <p className="muted small">
          Щабель визначається саме цими чотирма числами за порогами з таблиці Performance Review.
          Рівень має вагу лише тоді, коли рівні під ним міцні - тому сильний результат за Senior не
          компенсує слабкий за Junior.
        </p>
        <div className="tier-bars" style={{ marginTop: 'var(--sp-5)' }}>
          {TIERS.map((t) => {
            const score = breakdown.tiers[t];
            return (
              <div key={t}>
                <div className="tier-bar__head">
                  <strong>{TIER_LABELS[t]}</strong>
                  <span className="muted">
                    {score.correct}/{score.total} &middot; {score.percent}%
                  </span>
                </div>
                <div
                  className="tier-bar__track"
                  role="img"
                  aria-label={`Рівень ${TIER_LABELS[t]}: ${score.percent} відсотків`}
                >
                  <div className={`tier-bar__fill tier-bar__fill--${t}`} style={{ width: `${score.percent}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {meta ? (
        <Card>
          <h2 className="card__title">Де розташований цей рівень</h2>
          <div className="table__scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>Рівень</th>
                  <th>Вимоги</th>
                  <th>Ви</th>
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
                      <td className="muted">{requires || 'Нижче порога Trainee'}</td>
                      <td>{isYou ? 'Ваш результат' : ''}</td>
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
          <h2 className="card__title">Компетенції, на які варто глянути першими</h2>
          <p className="muted small">
            Взято з тих рядків таблиці Performance Review, яких торкнувся ваш варіант. Двадцять
            питань не можуть покрити кожен рядок, тож сприймайте це як тему для розмови на review, а
            не як вирок.
          </p>
          <div className="table__scroll" style={{ marginTop: 'var(--sp-4)' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Компетенція</th>
                  <th>Рівень</th>
                  <th>Результат</th>
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
            {result.answersRevealed ? 'Розбір відповідей' : 'Ваші відповіді за питаннями'}
          </h2>
          <button className="btn btn--secondary" type="button" onClick={() => setShowReview((v) => !v)}>
            {showReview
              ? 'Сховати'
              : `Показати всі ${result.questions.length} ${result.answersRevealed ? 'відповідей' : 'питань'}`}
          </button>
        </div>
        {!result.answersRevealed ? (
          <p className="small muted" style={{ marginTop: 'var(--sp-2)' }}>
            Правильні відповіді й пояснення не показуються: банк питань має лишитися
            придатним для наступних оцінювань. Ви бачите, які питання зараховано, а
            детальний розбір доступний вашому керівнику разом із результатом.
          </p>
        ) : null}
        {showReview ? (
          <div className="review" style={{ marginTop: 'var(--sp-5)' }}>
            {result.questions.map((q, i) => (
              <article key={q.id} className={`review__item ${q.correct ? '' : 'review__item--wrong'}`.trim()}>
                <div className="question__meta">
                  <span className="badge badge--neutral">{i + 1}</span>
                  <span className={`badge badge--${q.tier}`}>{TIER_LABELS[q.tier]}</span>
                  <span className="badge badge--neutral">{SOURCE_LABELS[q.source] ?? q.source}</span>
                  <span className={`option__mark option__mark--${q.correct ? 'correct' : 'incorrect'}`}>
                    {q.correct ? 'Правильно' : 'Неправильно'}
                  </span>
                </div>
                <div style={{ fontWeight: 500, color: 'var(--ink-strong)' }}>{q.text}</div>
                <div className="small" style={{ marginTop: 'var(--sp-3)' }}>
                  <div>
                    <span className="muted">Ваша відповідь: </span>
                    {q.yourAnswer.length > 0 ? (
                      q.yourAnswer.join('; ')
                    ) : (
                      <em className="muted">без відповіді</em>
                    )}
                  </div>
                  {!q.correct && q.correctAnswer ? (
                    <div style={{ marginTop: 'var(--sp-1)' }}>
                      <span className="muted">Правильна відповідь: </span>
                      {q.correctAnswer.join('; ')}
                    </div>
                  ) : null}
                </div>
                {q.explanation ? (
                  <div className="review__explanation">{q.explanation}</div>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}
      </Card>

      <div className="row">
        <button className="btn btn--ghost" type="button" onClick={onRestart}>
          Почати нову спробу
        </button>
        <span className="small muted">
          Нова спроба видає інший варіант. Поділіться цим результатом з керівником, коли
          плануватимете Performance Review.
        </span>
      </div>
    </div>
  );
}
