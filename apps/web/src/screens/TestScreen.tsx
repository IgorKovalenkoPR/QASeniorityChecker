import { useMemo, useState } from 'react';
import type { AttemptView, PaperQuestion } from '../lib/api.js';
import { Banner, Card, Progress, SOURCE_LABELS, TierBadge, Timer } from '../components/ui.js';

export interface TestScreenProps {
  attempt: AttemptView;
  questions: PaperQuestion[];
  answers: Record<string, string[]>;
  secondsRemaining: number;
  saving: boolean;
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
  saving,
  warning,
  strikesRemaining,
  onSelect,
  onSubmit,
  submitting,
}: TestScreenProps) {
  const [index, setIndex] = useState(0);
  const [confirming, setConfirming] = useState(false);

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
              Question {index + 1} / {questions.length}
            </strong>
            <span className="badge badge--neutral">Variant {attempt.variantNumber}</span>
          </div>
          <div className="row">
            {saving ? <span className="small muted">Saving...</span> : null}
            <Timer seconds={secondsRemaining} />
          </div>
        </div>
        <div style={{ marginTop: 'var(--sp-4)' }}>
          <Progress answered={answeredCount} total={questions.length} />
        </div>
      </Card>

      {warning ? (
        <Banner tone="warning" title="Integrity warning">
          {warning}
          {strikesRemaining > 0 ? (
            <>
              {' '}
              You have {strikesRemaining} {strikesRemaining === 1 ? 'warning' : 'warnings'} left before
              the attempt ends.
            </>
          ) : null}
        </Banner>
      ) : null}

      <Card>
        <div className="question__meta">
          <TierBadge tier={question.tier} />
          <span className="badge badge--neutral">{SOURCE_LABELS[question.source] ?? question.source}</span>
          {question.multiSelect ? <span className="badge badge--neutral">Select all that apply</span> : null}
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
            Previous
          </button>
          {index < questions.length - 1 ? (
            <button
              className="btn btn--primary"
              type="button"
              onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
            >
              Next
            </button>
          ) : (
            <button className="btn btn--accent" type="button" onClick={() => setConfirming(true)}>
              Finish and see my level
            </button>
          )}
        </div>
      </Card>

      <Card>
        <h3 className="card__title" style={{ fontSize: 'var(--fs-h4)' }}>
          Jump to a question
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
                aria-label={`Question ${i + 1}${answered ? ', answered' : ', not answered'}`}
                aria-current={i === index}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <div className="row" style={{ marginTop: 'var(--sp-5)' }}>
          <button className="btn btn--accent" type="button" onClick={() => setConfirming(true)}>
            Finish and see my level
          </button>
          <span className="small muted">
            {unanswered === 0 ? 'All questions answered.' : `${unanswered} still unanswered.`}
          </span>
        </div>
      </Card>

      {confirming ? (
        <div className="blocker" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div className="blocker__panel">
            <h2 id="confirm-title">Submit your attempt?</h2>
            <p className="muted">
              {unanswered === 0
                ? 'All 20 questions are answered. You will not be able to change them afterwards.'
                : `${unanswered} of ${questions.length} questions are still unanswered and will be scored as incorrect.`}
            </p>
            <div className="row" style={{ justifyContent: 'center', marginTop: 'var(--sp-5)' }}>
              <button className="btn btn--ghost" type="button" onClick={() => setConfirming(false)}>
                Keep working
              </button>
              <button className="btn btn--primary" type="button" onClick={onSubmit} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
