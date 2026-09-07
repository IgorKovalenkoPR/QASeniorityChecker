import { useCallback, useEffect, useRef, useState } from 'react';
import type { IntegrityEvent, LocalizedText } from '@qasc/core';
import { ApiError, api } from './lib/api.js';
import type {
  AttemptView,
  Identity,
  MetaResponse,
  PaperQuestion,
  ResultResponse,
} from './lib/api.js';
import { AnswerQueue } from './lib/answerQueue.js';
import { LocaleSwitch, useI18n } from './lib/i18n.js';
import type { AnswerQueueStatus } from './lib/answerQueue.js';
import { Proctor } from './lib/proctor.js';
import { Banner, Card } from './components/ui.js';
import { SignInScreen } from './screens/SignInScreen.js';
import { StartScreen } from './screens/StartScreen.js';
import { TestScreen } from './screens/TestScreen.js';
import { ResultScreen } from './screens/ResultScreen.js';

/**
 * Session handle.
 *
 * Kept in sessionStorage, not localStorage, on purpose: sessionStorage is scoped
 * to a single tab, so opening the attempt in a second tab does not silently hand
 * that tab a working token. It also means a reload resumes cleanly: the reload
 * fires `pagehide`, so it is recorded as one navigation_away, but that costs a
 * single strike out of four rather than the attempt. An accidental refresh
 * therefore is not fatal - which matters, because the start screen tells the
 * candidate the server-side timer survives a reload.
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

type Phase = 'loading' | 'signin' | 'start' | 'test' | 'result' | 'terminated';

export function App() {
  const { t, text } = useI18n();
  const [phase, setPhase] = useState<Phase>('loading');
  const [identity, setIdentity] = useState<Identity | null>(null);
  // Set by the OAuth callback when it refuses the sign-in, so the reason can be
  // shown instead of dumping the candidate back on an unexplained login screen.
  const [authError, setAuthError] = useState<string | null>(null);
  const [meta, setMeta] = useState<MetaResponse | null>(null);
  const [attempt, setAttempt] = useState<AttemptView | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [questions, setQuestions] = useState<PaperQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [result, setResult] = useState<ResultResponse | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [warning, setWarning] = useState<string | null>(null);
  // The cause, in both languages, as the integrity policy composed it. Held as
  // LocalizedText rather than a rendered string so switching language on the
  // termination screen re-renders the sentence instead of freezing whichever
  // language happened to be active when the attempt ended.
  const [terminationReason, setTerminationReason] = useState<LocalizedText | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [saveStatus, setSaveStatus] = useState<AnswerQueueStatus>({
    pending: 0,
    retrying: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [strikesRemaining, setStrikesRemaining] = useState(2);

  const proctorRef = useRef<Proctor | null>(null);
  const attemptRef = useRef<{ id: string; token: string } | null>(null);
  const queueRef = useRef<AnswerQueue | null>(null);

  // --- bootstrap -----------------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    // The callback puts the reason in the query string. Read it once, then
    // strip it, so a reload does not keep re-announcing a failure.
    const params = new URLSearchParams(window.location.search);
    const failed = params.get('auth_error');
    if (failed) {
      setAuthError(failed);
      params.delete('auth_error');
      const rest = params.toString();
      window.history.replaceState({}, '', window.location.pathname + (rest ? `?${rest}` : ''));
    }

    void (async () => {
      let loaded: MetaResponse | null = null;
      try {
        loaded = await api.meta();
        if (!cancelled) setMeta(loaded);
      } catch {
        // Metadata is decorative; the start screen has sensible fallbacks.
      }

      // Google mode: nothing can be started without a verified identity, so
      // resolve it before anything else and show the sign-in screen if absent.
      if (loaded?.auth.mode === 'google') {
        try {
          const who = await api.me();
          if (cancelled) return;
          setIdentity(who);
          if (!who) {
            setPhase('signin');
            return;
          }
        } catch {
          if (!cancelled) setPhase('signin');
          return;
        }
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
          // `terminationReason` on the attempt is the reviewer's record: one
          // English sentence, stored for the spreadsheet. Showing it here would
          // put English in front of a Ukrainian reader, so a resumed
          // termination gets the localised general line instead. The specific
          // cause was shown at the moment it happened.
          setTerminationReason(null);
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

  /**
   * One queue per attempt. It reads the attempt from the ref rather than
   * closing over it, so a resume that swaps the token does not leave the queue
   * writing with a dead one.
   */
  const answerQueue = useCallback((): AnswerQueue => {
    if (!queueRef.current) {
      queueRef.current = new AnswerQueue({
        save: async (questionId, optionIds) => {
          const active = attemptRef.current;
          if (!active) throw new ApiError(409, 'attempt_gone', t('err.attemptGone'));
          return api.saveAnswer(active.id, active.token, questionId, [...optionIds]);
        },
        onStatus: setSaveStatus,
        onFatal: (err: unknown) => {
          const active = attemptRef.current;
          if (!(err instanceof ApiError) || !active) return;
          if (err.code === 'attempt_terminated') terminateRef.current?.(null);
          else if (err.code.startsWith('attempt_')) {
            void loadResultRef.current?.(active.id, active.token);
          }
        },
      });
    }
    return queueRef.current;
  }, []);

  const discardQueue = useCallback(() => {
    queueRef.current?.stop();
    queueRef.current = null;
    setSaveStatus({ pending: 0, retrying: false });
  }, []);

  const loadResult = useCallback(async (attemptId: string, activeToken: string) => {
    try {
      const loaded = await api.result(attemptId, activeToken);
      setResult(loaded);
      setPhase('result');
    } catch (err) {
      if (err instanceof ApiError && err.code === 'attempt_terminated') {
        setTerminationReason(null);
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

  const terminate = useCallback((reason: LocalizedText | null) => {
    proctorRef.current?.stop();
    proctorRef.current = null;
    discardQueue();
    setTerminationReason(reason);
    setPhase('terminated');
    writeSession(null);
  }, [discardQueue]);

  // The queue is built before terminate and loadResult exist, and both are
  // recreated by hooks it must not depend on. Refs keep the wiring one-way.
  const terminateRef = useRef<((reason: LocalizedText | null) => void) | null>(null);
  const loadResultRef = useRef<((id: string, token: string) => Promise<void>) | null>(null);
  terminateRef.current = terminate;
  loadResultRef.current = loadResult;

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
            // Only the cause. TestScreen appends the remaining-strike count, so
            // including it here too would print the sentence twice.
            setWarning(t('proctor.navAway'));
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
            terminate(null);
          } else if (response.attempt.status !== 'in_progress') {
            await loadResult(attempt.id, token);
          }
        } catch {
          // A dropped heartbeat is not fatal for the candidate: the server
          // records the gap as a heartbeat_gap event, which costs nothing below
          // two minutes, and the next successful ping reconciles the state.
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

  // Each phase is a different page as far as the reader is concerned, so start
  // it at the top rather than at the previous screen's scroll offset.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [phase]);

  // --- actions -------------------------------------------------------------

  const handleStart = useCallback(
    async (input: { candidateName?: string; candidateEmail?: string }) => {
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
        setError(err instanceof Error ? err.message : t('start.error'));
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
      // Optimistic: the UI must not wait for the network on every click. The
      // queue is what makes that honest - it keeps retrying a failed write
      // instead of leaving the screen showing an answer the server never got.
      setAnswers((prev) => ({ ...prev, [questionId]: optionIds }));
      answerQueue().set(questionId, optionIds);
    },
    [answerQueue],
  );

  const handleSubmit = useCallback(async () => {
    const active = attemptRef.current;
    if (!active) return;
    setSubmitting(true);
    try {
      // Land every outstanding answer first. Submitting with a write still in
      // flight would score that question blank, which is the silent data loss
      // the queue exists to prevent - so if it cannot drain, say so and let the
      // candidate press the button again rather than grading an answer that
      // was made but never arrived.
      const drained = await answerQueue().flush(8_000);
      if (!drained) {
        setError(
          t('err.unsavedOnSubmit'),
        );
        setSubmitting(false);
        return;
      }
      proctorRef.current?.stop();
      proctorRef.current = null;
      const submitted = await api.submit(active.id, active.token);
      discardQueue();
      setResult(submitted);
      setPhase('result');
    } catch (err) {
      if (err instanceof ApiError && err.code === 'attempt_terminated') {
        terminate(null);
      } else {
        setError(err instanceof Error ? err.message : t('err.submit'));
      }
    } finally {
      setSubmitting(false);
    }
  }, [terminate]);

  const handleRestart = useCallback(() => {
    writeSession(null);
    discardQueue();
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
  }, [discardQueue]);

  // --- render --------------------------------------------------------------

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          {t('app.name')} <span>{t('app.tagline')}</span>
        </div>
        <div className="app__header-right">
          <LocaleSwitch />
          {phase === 'test' && attempt ? (
            <span className="badge badge--neutral">{t('app.variant', { n: attempt.variantNumber })}</span>
          ) : null}
        </div>
      </header>

      <main className={`app__main ${phase === 'start' ? 'app__main--narrow' : ''}`.trim()}>
        {phase === 'loading' ? <Card>{t('app.loading')}</Card> : null}

        {phase === 'signin' ? <SignInScreen meta={meta} authError={authError} /> : null}

        {phase === 'start' ? (
          <StartScreen
            meta={meta}
            identity={identity}
            onStart={(input) => void handleStart(input)}
            busy={busy}
            error={error}
          />
        ) : null}

        {phase === 'test' && attempt ? (
          <TestScreen
            attempt={attempt}
            questions={questions}
            answers={answers}
            secondsRemaining={secondsRemaining}
            saveStatus={saveStatus}
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
            <h1>{t('term.heading')}</h1>
            <Banner tone="danger" title={t('term.rulesTitle')}>
              {terminationReason ? text(terminationReason) : t('term.default')}
            </Banner>
            <p className="muted" style={{ marginTop: 'var(--sp-5)' }}>
              {t('term.body')}
            </p>
            <div className="row" style={{ marginTop: 'var(--sp-5)' }}>
              <button className="btn btn--primary" type="button" onClick={handleRestart}>
                {t('term.back')}
              </button>
            </div>
          </Card>
        ) : null}
      </main>

      <footer className="app__footer">
        {t('app.footer')}
      </footer>
    </div>
  );
}
