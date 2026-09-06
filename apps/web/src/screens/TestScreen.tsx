import { useEffect, useMemo, useState } from 'react';
import type { AttemptView, PaperQuestion } from '../lib/api.js';
import { Banner, Card, Progress, TierBadge, Timer } from '../components/ui.js';
import { sourceLabel, useI18n } from '../lib/i18n.js';

export interface TestScreenProps {
  attempt: AttemptView;
  questions: PaperQuestion[];
  answers: Record<string, string[]>;
  secondsRemaining: number;
  saveStatus: { pending: number; retrying: boolean };
  warning: string | null;
  strikesRemaining: number;
  onSelect: (questionId: string, optionIds: string[]) => void;
  onSubmit: () => void;
  submitting: boolean;
}

export function TestScreen({
  attempt,
  questions,
  answers,
  secondsRemaining,
  saveStatus,
  warning,
  strikesRemaining,
  onSelect,
  onSubmit,
  submitting,
}: TestScreenProps) {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [confirming, setConfirming] = useState(false);

  // Moving between questions must put the reader at the top of the new one.
  // Without this the page keeps whatever scroll position the previous question
  // left, so a candidate arriving from a long question lands halfway down the
  // next one, with its text tucked under the sticky header.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [index]);

  const question = questions[index];
  const answeredCount = useMemo(
    () => questions.filter((q) => (answers[q.id]?.length ?? 0) > 0).length,
    [questions, answers],
  );

  if (!question) return null;

  const selected = answers[question.id] ?? [];
  const unanswered = questions.length - answeredCount;

  const toggle = (optionId: string) => {
    if (question.multiSelect) {
      const next = selected.includes(optionId)
        ? selected.filter((id) => id !== optionId)
        : [...selected, optionId];
      onSelect(question.id, next);
    } else {
      onSelect(question.id, [optionId]);
    }
  };

  return (
    <div className="stack">
      <Card>
        <div className="row row--between">
          <div className="row">
            <strong>
              {t('test.progress', { i: index + 1, n: questions.length })}
            </strong>
            <span className="badge badge--neutral">{t('app.variant', { n: attempt.variantNumber })}</span>
          </div>
          <div className="row">
            {saveStatus.pending > 0 && !saveStatus.retrying ? (
              <span className="small muted">{t('test.saving')}</span>
            ) : null}
            {saveStatus.retrying ? (
              <span className="small" style={{ color: 'var(--warning-ink)', fontWeight: 500 }}>
                {t('test.unsaved')}
              </span>
            ) : null}
            <Timer seconds={secondsRemaining} />
          </div>
        </div>
        <div style={{ marginTop: 'var(--sp-4)' }}>
          <Progress answered={answeredCount} total={questions.length} />
        </div>
      </Card>

      {saveStatus.retrying ? (
        <Banner tone="warning" title={t('test.retryTitle')}>
          {t('test.retryBody')}
        </Banner>
      ) : null}

      {warning ? (
        <Banner tone="warning" title={t('test.warnTitle')}>
          {warning}
          {strikesRemaining > 0 ? (
            <>
              {' '}
              {t('test.warnRemaining', { n: strikesRemaining })}
            </>
          ) : null}
        </Banner>
      ) : null}

      <Card>
        <div className="question__meta">
          <TierBadge tier={question.tier} />
          <span className="badge badge--neutral">{sourceLabel(t, question.source)}</span>
          {question.multiSelect ? (
            <span className="badge badge--neutral">{t('test.multi')}</span>
          ) : null}
        </div>

        <h2 className="question__text">{question.text}</h2>

        <ul className="options">
          {question.options.map((option) => {
            const isSelected = selected.includes(option.id);
            return (
              <li key={option.id}>
                <label className={`option ${isSelected ? 'option--selected' : ''}`.trim()}>
                  <input
                    type={question.multiSelect ? 'checkbox' : 'radio'}
                    name={`q-${question.id}`}
                    checked={isSelected}
                    onChange={() => toggle(option.id)}
                  />
                  <span className="option__text">{option.text}</span>
                </label>
              </li>
            );
          })}
        </ul>

        <div className="row row--between" style={{ marginTop: 'var(--sp-6)' }}>
          <button
            className="btn btn--secondary"
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            {t('test.back')}
          </button>
          {index < questions.length - 1 ? (
            <button
              className="btn btn--primary"
              type="button"
              onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
            >
              {t('test.next')}
            </button>
          ) : (
            <button className="btn btn--accent" type="button" onClick={() => setConfirming(true)}>
              {t('test.finish')}
            </button>
          )}
        </div>
      </Card>

      <Card>
        <h3 className="card__title" style={{ fontSize: 'var(--fs-h4)' }}>
          {t('test.jump')}
        </h3>
        <div className="pager">
          {questions.map((q, i) => {
            const answered = (answers[q.id]?.length ?? 0) > 0;
            const cls = i === index ? 'pager__dot--current' : answered ? 'pager__dot--answered' : '';
            return (
              <button
                key={q.id}
                type="button"
                className={`pager__dot ${cls}`.trim()}
                onClick={() => setIndex(i)}
                aria-label={t('test.jumpAria', {
                  n: i + 1,
                  state: answered ? t('test.jumpAnswered') : t('test.jumpUnanswered'),
                })}
                aria-current={i === index}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <div className="row" style={{ marginTop: 'var(--sp-5)' }}>
          <button className="btn btn--accent" type="button" onClick={() => setConfirming(true)}>
            {t('test.finish')}
          </button>
          <span className="small muted">
            {unanswered === 0
              ? t('test.allAnswered')
              : t('test.stillUnanswered', { n: unanswered })}
          </span>
        </div>
      </Card>

      {confirming ? (
        <div className="blocker" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div className="blocker__panel">
            <h2 id="confirm-title">{t('test.confirmTitle')}</h2>
            <p className="muted">
              {unanswered === 0
                ? t('test.confirmAll', { n: questions.length })
                : t('test.confirmSome', { unanswered, total: questions.length })}
            </p>
            <div className="row" style={{ justifyContent: 'center', marginTop: 'var(--sp-5)' }}>
              <button className="btn btn--ghost" type="button" onClick={() => setConfirming(false)}>
                {t('test.keepGoing')}
              </button>
              <button className="btn btn--primary" type="button" onClick={onSubmit} disabled={submitting}>
                {submitting ? t('test.submitting') : t('test.confirmFinish')}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
