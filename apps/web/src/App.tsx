import { useCallback, useEffect, useRef, useState } from 'react';
import type { IntegrityEvent } from '@qasc/core';
import { ApiError, api } from './lib/api.js';
import type { AttemptView, MetaResponse, PaperQuestion, ResultResponse } from './lib/api.js';
import { Proctor } from './lib/proctor.js';
import { Banner, Card } from './components/ui.js';
import { StartScreen } from './screens/StartScreen.js';
import { TestScreen } from './screens/TestScreen.js';
import { ResultScreen } from './screens/ResultScreen.js';

/**
 * Session handle.
 *
 * Kept in sessionStorage, not localStorage, on purpose: sessionStorage is scoped
 * to a single tab, so opening the attempt in a second tab does not silently hand
 * that tab a working token. It also means a reload resumes cleanly, which is what
 * makes it safe to end an attempt on a genuine navigation away - the candidate
 * who refreshes by accident is not punished for it, only recorded.
 */
const SESSION_KEY = 'qasc.attempt';

interface StoredSession {
  attemptId: string;
  token: string;
}

function readSession(): StoredSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as StoredSession) : null;
  } catch {
    return null;
  }
}

function writeSession(session: StoredSession | null): void {
  try {
    if (session) sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Private mode or blocked storage: the attempt still works, it just cannot
    // be resumed after a reload. Not worth failing the whole test over.
  }
}

type Phase = 'loading' | 'start' | 'test' | 'result' | 'terminated';

export function App() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [meta, setMeta] = useState<MetaResponse | null>(null);
  const [attempt, setAttempt] = useState<AttemptView | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [questions, setQuestions] = useState<PaperQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [result, setResult] = useState<ResultResponse | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [warning, setWarning] = useState<string | null>(null);
  const [terminationReason, setTerminationReason] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [strikesRemaining, setStrikesRemaining] = useState(2);

  const proctorRef = useRef<Proctor | null>(null);
  const attemptRef = useRef<{ id: string; token: string } | null>(null);

  // --- bootstrap -----------------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const loaded = await api.meta();
        if (!cancelled) setMeta(loaded);
      } catch {
        // Metadata is decorative; the start screen has sensible fallbacks.
      }

      const session = readSession();
      if (!session) {
        if (!cancelled) setPhase('start');
        return;
      }

      try {
        const resumed = await api.resume(session.attemptId, session.token);
        if (cancelled) return;
        applyAttempt(resumed.attempt, session.token);
        setQuestions(resumed.questions);
        setAnswers(resumed.answers);

        if (resumed.attempt.status === 'in_progress') {
          setPhase('test');
        } else if (resumed.attempt.status === 'terminated') {
          setTerminationReason(resumed.attempt.terminationReason);
          setPhase('terminated');
        } else {
          await loadResult(session.attemptId, session.token);
        }
      } catch {
        writeSession(null);
        if (!cancelled) setPhase('start');
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyAttempt = useCallback((view: AttemptView, activeToken: string) => {
    setAttempt(view);
    setToken(activeToken);
    setSecondsRemaining(view.secondsRemaining);
    setStrikesRemaining(Math.max(0, view.strikesAllowed - view.strikes));
    attemptRef.current = { id: view.id, token: activeToken };
  }, []);

  const loadResult = useCallback(async (attemptId: string, activeToken: string) => {
    try {
      const loaded = await api.result(attemptId, activeToken);
      setResult(loaded);
      setPhase('result');
    } catch (err) {
      if (err instanceof ApiError && err.code === 'attempt_terminated') {
        setTerminationReason(err.message);
        setPhase('terminated');
        return;
      }
      // No stored result yet (e.g. the attempt expired without a submit):
      // submitting is idempotent and produces one.
      try {
        const submitted = await api.submit(attemptId, activeToken);
        setResult(submitted);
        setPhase('result');
      } catch {
        writeSession(null);
        setPhase('start');
      }
    }
  }, []);

  // --- termination ---------------------------------------------------------

  const terminate = useCallback((reason: string | null) => {
    proctorRef.current?.stop();
    proctorRef.current = null;
    setTerminationReason(reason ?? 'This attempt was ended by the exam integrity rules.');
    setPhase('terminated');
    writeSession(null);
  }, []);

  // --- proctor -------------------------------------------------------------

  useEffect(() => {
    if (phase !== 'test' || !attempt || !token) return undefined;

    const proctor = new Proctor({
      attemptId: attempt.id,
      token,
      heartbeatSeconds: meta?.heartbeatSeconds ?? 15,
      report: async (events: IntegrityEvent[]) => {
        const response = await api.reportIntegrity(attempt.id, token, events);
        applyAttempt(response.attempt, token);
        return response;
      },
      handlers: {
        onEvent: () => undefined,
        onLocalWarning: (message) => setWarning(message),
        onVerdict: (verdict) => {
          setStrikesRemaining(verdict.remaining);
          if (verdict.terminate) terminate(verdict.reason);
          else if (verdict.strikes > 0) {
            setWarning(
              `Leaving the test page was recorded. ${verdict.remaining} ${
                verdict.remaining === 1 ? 'warning' : 'warnings'
              } left before the attempt ends.`,
            );
          }
        },
      },
    });

    proctor.start();
    proctorRef.current = proctor;
    return () => {
      proctor.stop();
      proctorRef.current = null;
    };
  }, [phase, attempt?.id, token, meta?.heartbeatSeconds, applyAttempt, terminate]);

  // --- clock + heartbeat ---------------------------------------------------

  useEffect(() => {
    if (phase !== 'test') return undefined;
    // Local ticks keep the display smooth; the server value below corrects it.
    const id = window.setInterval(() => setSecondsRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'test' || !attempt || !token) return undefined;
    const period = (meta?.heartbeatSeconds ?? 15) * 1000;
    const id = window.setInterval(() => {
      void (async () => {
        try {
          const response = await api.heartbeat(attempt.id, token);
          applyAttempt(response.attempt, token);
          if (response.attempt.status === 'terminated') {
            terminate(response.attempt.terminationReason);
          } else if (response.attempt.status !== 'in_progress') {
            await loadResult(attempt.id, token);
          }
        } catch {
          // A dropped heartbeat is not fatal for the candidate: the server will
          // record the gap and the next successful ping reconciles the state.
        }
      })();
    }, period);
    return () => window.clearInterval(id);
  }, [phase, attempt?.id, token, meta?.heartbeatSeconds, applyAttempt, terminate, loadResult]);

  // Time is up: submit whatever is saved rather than leaving the candidate
  // staring at 00:00 with no result.
  useEffect(() => {
    if (phase !== 'test' || secondsRemaining > 0 || !attempt || !token) return;
    void handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, secondsRemaining]);

  // --- actions -------------------------------------------------------------

  const handleStart = useCallback(
    async (input: { candidateName: string; candidateEmail: string }) => {
      setBusy(true);
      setError(null);
      try {
        const started = await api.start(input);
        writeSession({ attemptId: started.attempt.id, token: started.token });
        applyAttempt(started.attempt, started.token);
        setQuestions(started.questions);
        setAnswers({});
        setWarning(null);
        setPhase('test');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not start the test.');
      } finally {
        setBusy(false);
      }
    },
    [applyAttempt],
  );

  const handleSelect = useCallback(
    (questionId: string, optionIds: string[]) => {
      const active = attemptRef.current;
      if (!active) return;
      // Optimistic: the UI must not wait for the network on every click.
      setAnswers((prev) => ({ ...prev, [questionId]: optionIds }));
      setSaving(true);
      void api
        .saveAnswer(active.id, active.token, questionId, optionIds)
        .catch((err: unknown) => {
          if (err instanceof ApiError && err.code.startsWith('attempt_')) {
            if (err.code === 'attempt_terminated') terminate(err.message);
            else void loadResult(active.id, active.token);
          }
        })
        .finally(() => setSaving(false));
    },
    [terminate, loadResult],
  );

  const handleSubmit = useCallback(async () => {
    const active = attemptRef.current;
    if (!active) return;
    setSubmitting(true);
    try {
      proctorRef.current?.stop();
      proctorRef.current = null;
      const submitted = await api.submit(active.id, active.token);
      setResult(submitted);
      setPhase('result');
    } catch (err) {
      if (err instanceof ApiError && err.code === 'attempt_terminated') {
        terminate(err.message);
      } else {
        setError(err instanceof Error ? err.message : 'Could not submit the attempt.');
      }
    } finally {
      setSubmitting(false);
    }
  }, [terminate]);

  const handleRestart = useCallback(() => {
    writeSession(null);
    attemptRef.current = null;
    setAttempt(null);
    setToken(null);
    setQuestions([]);
    setAnswers({});
    setResult(null);
    setWarning(null);
    setTerminationReason(null);
    setError(null);
    setPhase('start');
  }, []);

  // --- render --------------------------------------------------------------

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          QA Seniority Checker <span>Performance Review pre-assessment</span>
        </div>
        <div className="app__header-right">
          {phase === 'test' && attempt ? (
            <span className="badge badge--neutral">Variant {attempt.variantNumber}</span>
          ) : null}
        </div>
      </header>

      <main className={`app__main ${phase === 'start' ? 'app__main--narrow' : ''}`.trim()}>
        {phase === 'loading' ? <Card>Loading...</Card> : null}

        {phase === 'start' ? (
          <StartScreen meta={meta} onStart={(input) => void handleStart(input)} busy={busy} error={error} />
        ) : null}

        {phase === 'test' && attempt ? (
          <TestScreen
            attempt={attempt}
            questions={questions}
            answers={answers}
            secondsRemaining={secondsRemaining}
            saving={saving}
            warning={warning}
            strikesRemaining={strikesRemaining}
            onSelect={handleSelect}
            onSubmit={() => void handleSubmit()}
            submitting={submitting}
          />
        ) : null}

        {phase === 'result' && result ? (
          <ResultScreen result={result} meta={meta} onRestart={handleRestart} />
        ) : null}

        {phase === 'terminated' ? (
          <Card hero>
            <h1>Attempt ended</h1>
            <Banner tone="danger" title="Exam integrity rules">
              {terminationReason ?? 'This attempt was ended by the exam integrity rules.'}
            </Banner>
            <p className="muted" style={{ marginTop: 'var(--sp-5)' }}>
              The attempt was not scored. If you believe this was a mistake - a system notification, a
              call, or a connection drop - talk to your manager or the QA lead; every event is logged
              with its timestamp and duration, so the record can be reviewed.
            </p>
            <div className="row" style={{ marginTop: 'var(--sp-5)' }}>
              <button className="btn btn--primary" type="button" onClick={handleRestart}>
                Back to the start
              </button>
            </div>
          </Card>
        ) : null}
      </main>

      <footer className="app__footer">
        Estimated levels are a starting point for the Performance Review conversation, not a decision.
      </footer>
    </div>
  );
}
