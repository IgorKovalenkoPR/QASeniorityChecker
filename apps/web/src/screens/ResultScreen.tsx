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
            <span className="level-badge__caption">Estimated level</span>
            <span className="level-badge__value">{label}</span>
          </div>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <h1>
              {breakdown.correct} of {breakdown.total} correct
            </h1>
            <p className="muted" style={{ marginTop: 'var(--sp-3)' }}>
              {breakdown.rationale}
            </p>
            {breakdown.nextLevelGap ? (
              <Banner tone="info" title="Next rung">
                {breakdown.nextLevelGap}
              </Banner>
            ) : (
              <Banner tone="info">
                You met the top rung of the ladder on this test. The Performance Review also expects
                ISTQB Advanced Level certification at Senior.
              </Banner>
            )}
          </div>
        </div>
      </Card>

      {result.status === 'expired' ? (
        <Banner tone="warning" title="Time ran out">
          The attempt was scored on the answers saved before the deadline. Unanswered questions count
          as incorrect.
        </Banner>
      ) : null}

      <Card>
        <h2 className="card__title">Score by tier</h2>
        <p className="muted small">
          The ladder is decided by these four numbers, using the thresholds from the Performance
          Review sheet. A tier is only useful if the tiers below it are solid, which is why a strong
          Senior score cannot compensate for a weak Junior one.
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
                  aria-label={`${TIER_LABELS[t]} tier: ${score.percent} percent`}
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
          <h2 className="card__title">Where this level sits</h2>
          <div className="table__scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Requires</th>
                  <th>You</th>
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
                      <td className="muted">{requires || 'Below the Trainee threshold'}</td>
                      <td>{isYou ? 'Your result' : ''}</td>
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
          <h2 className="card__title">Competencies to look at first</h2>
          <p className="muted small">
            Taken from the rows of the Performance Review sheet that this paper touched. Twenty
            questions cannot cover every row, so treat this as a prompt for the review conversation
            rather than a verdict.
          </p>
          <div className="table__scroll" style={{ marginTop: 'var(--sp-4)' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Competency</th>
                  <th>Tier</th>
                  <th>Result</th>
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
          <h2 style={{ fontSize: 'var(--fs-h3)' }}>Answer review</h2>
          <button className="btn btn--secondary" type="button" onClick={() => setShowReview((v) => !v)}>
            {showReview ? 'Hide answers' : 'Show all 20 answers'}
          </button>
        </div>
        {showReview ? (
          <div className="review" style={{ marginTop: 'var(--sp-5)' }}>
            {result.questions.map((q, i) => (
              <article key={q.id} className={`review__item ${q.correct ? '' : 'review__item--wrong'}`.trim()}>
                <div className="question__meta">
                  <span className="badge badge--neutral">{i + 1}</span>
                  <span className={`badge badge--${q.tier}`}>{TIER_LABELS[q.tier]}</span>
                  <span className="badge badge--neutral">{SOURCE_LABELS[q.source] ?? q.source}</span>
                  <span className={`option__mark option__mark--${q.correct ? 'correct' : 'incorrect'}`}>
                    {q.correct ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <div style={{ fontWeight: 500, color: 'var(--ink-strong)' }}>{q.text}</div>
                <div className="small" style={{ marginTop: 'var(--sp-3)' }}>
                  <div>
                    <span className="muted">Your answer: </span>
                    {q.yourAnswer.length > 0 ? q.yourAnswer.join('; ') : <em className="muted">not answered</em>}
                  </div>
                  {!q.correct ? (
                    <div style={{ marginTop: 'var(--sp-1)' }}>
                      <span className="muted">Correct answer: </span>
                      {q.correctAnswer.join('; ')}
                    </div>
                  ) : null}
                </div>
                <div className="review__explanation">{q.explanation}</div>
              </article>
            ))}
          </div>
        ) : null}
      </Card>

      <div className="row">
        <button className="btn btn--ghost" type="button" onClick={onRestart}>
          Start a new attempt
        </button>
        <span className="small muted">
          A new attempt draws a different variant. Share this result with your manager when you plan
          the Performance Review.
        </span>
      </div>
    </div>
  );
}
