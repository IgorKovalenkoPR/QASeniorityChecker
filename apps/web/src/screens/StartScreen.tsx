import { useState } from 'react';
import type { FormEvent } from 'react';
import type { MetaResponse } from '../lib/api.js';
import { Banner, Card } from '../components/ui.js';

/**
 * Start screen.
 *
 * The integrity rules are shown in full BEFORE the timer starts and must be
 * acknowledged. That is not a legal formality: a proctoring rule a candidate
 * only discovers by tripping it is unfair, and an attempt terminated under a
 * rule nobody explained is unusable in a Performance Review conversation.
 */
export function StartScreen({
  meta,
  onStart,
  busy,
  error,
}: {
  meta: MetaResponse | null;
  onStart: (input: { candidateName: string; candidateEmail: string }) => void;
  busy: boolean;
  error: string | null;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [touched, setTouched] = useState(false);

  const nameValid = name.trim().length >= 2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canStart = nameValid && emailValid && accepted && !busy;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (!canStart) return;
    onStart({ candidateName: name.trim(), candidateEmail: email.trim() });
  };

  const minutes = meta ? Math.round(meta.durationSeconds / 60) : 30;

  return (
    <div className="stack">
      <Card hero>
        <h1>Check your QA seniority level</h1>
        <p className="muted" style={{ marginTop: 'var(--sp-3)' }}>
          A short self-assessment that estimates where you currently sit on the company Performance
          Review ladder, from Trainee&minus; to Senior. The result is a starting point for planning
          your review, not the review itself.
        </p>
        <div className="row" style={{ marginTop: 'var(--sp-5)' }}>
          <Fact value={meta ? String(meta.questionsPerTest) : '20'} label="questions" />
          <Fact value={`${minutes} min`} label="time limit" />
          <Fact value={meta ? String(meta.variantCount) : '50'} label="test variants" />
          <Fact value={meta ? String(meta.bank.total) : '500+'} label="questions in the bank" />
        </div>
      </Card>

      <div className="stack" style={{ gap: 'var(--sp-5)' }}>
        <Card>
          <h2 className="card__title">What is covered</h2>
          <p className="muted small">
            Every paper follows the same blueprint, so two people who draw different variants are
            still measured on the same scale.
          </p>
          <div className="table__scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Questions</th>
                  <th>Drawn from</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Trainee</td>
                  <td>4</td>
                  <td>Performance Review matrix, terminology</td>
                </tr>
                <tr>
                  <td>Junior</td>
                  <td>6</td>
                  <td>Performance Review matrix, ISTQB Foundation Level, glossary</td>
                </tr>
                <tr>
                  <td>Middle</td>
                  <td>6</td>
                  <td>Performance Review matrix, ISTQB Test Analyst, glossary</td>
                </tr>
                <tr>
                  <td>Senior</td>
                  <td>4</td>
                  <td>Performance Review matrix, ISTQB Test Manager and Test Analyst</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h2 className="card__title">Exam integrity rules</h2>
          <Banner tone="warning" title="The attempt ends if you leave this page.">
            Switching to another tab, another window or another app is detected and reported. A brief
            interruption of under {meta ? Math.round(meta.integrity.graceMs / 1000) : 2} seconds costs
            you a warning; a second interruption, or a single absence longer than{' '}
            {meta ? Math.round(meta.integrity.hardTerminateMs / 1000) : 10} seconds, ends the attempt
            and the result is discarded.
          </Banner>
          <ul className="small muted" style={{ marginTop: 'var(--sp-4)', paddingLeft: 'var(--sp-5)' }}>
            <li>Keep this window in the foreground for the whole test.</li>
            <li>Close other tabs and silence notifications before you start.</li>
            <li>Right-click, copy and print are disabled or recorded.</li>
            <li>The timer runs on the server, so reloading the page does not reset it.</li>
            <li>Your answers are saved as you go; a lost connection will not lose your work.</li>
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="card__title">Start the test</h2>
        <form className="stack" onSubmit={submit} noValidate>
          <div className="field">
            <label className="field__label" htmlFor="candidate-name">
              Full name
            </label>
            <input
              id="candidate-name"
              className="field__input"
              value={name}
              autoComplete="name"
              onChange={(event) => setName(event.target.value)}
            />
            {touched && !nameValid ? <span className="field__error">Please enter your name.</span> : null}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="candidate-email">
              Work email
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
              Used to attach the result to your Performance Review record.
            </span>
            {touched && !emailValid ? (
              <span className="field__error">Please enter a valid email address.</span>
            ) : null}
          </div>

          <label className="row" style={{ alignItems: 'flex-start', gap: 'var(--sp-3)' }}>
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              style={{ marginTop: '4px' }}
            />
            <span className="small">
              I have read the integrity rules and understand that leaving this page ends my attempt.
            </span>
          </label>

          {error ? <Banner tone="danger">{error}</Banner> : null}

          <div>
            <button className="btn btn--primary" type="submit" disabled={!canStart}>
              {busy ? 'Starting...' : 'Start the test'}
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
