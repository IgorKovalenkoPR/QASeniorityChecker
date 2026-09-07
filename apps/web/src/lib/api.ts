import type { IntegrityEvent, IntegrityVerdict, Level, ScoreBreakdown, Tier } from '@qasc/core';
import type { LocalizedText } from '@qasc/core';

const BASE = import.meta.env.VITE_API_BASE ?? '/api';

export interface AttemptView {
  id: string;
  status: 'in_progress' | 'submitted' | 'expired' | 'terminated';
  variantNumber: number;
  candidateName: string;
  startedAt: number;
  deadlineAt: number;
  serverNow: number;
  secondsRemaining: number;
  strikes: number;
  strikesAllowed: number;
  terminationReason: string | null;
}

export interface PaperQuestion {
  id: string;
  index: number;
  // Both languages arrive together and the browser picks, so switching
  // language mid-test is a local choice rather than a new request for a paper.
  text: LocalizedText;
  options: { id: string; text: LocalizedText }[];
  multiSelect: boolean;
  tier: Tier;
  competencyId: string;
  source: string;
}

export interface StartResponse {
  token: string;
  attempt: AttemptView;
  questions: PaperQuestion[];
}

export interface ResumeResponse {
  attempt: AttemptView;
  questions: PaperQuestion[];
  answers: Record<string, string[]>;
}

export interface ResultResponse {
  attemptId: string;
  status: AttemptView['status'];
  breakdown: ScoreBreakdown;
  questions: {
    id: string;
    text: LocalizedText;
    yourAnswer: LocalizedText[];
    correct: boolean;
    tier: Tier;
    competencyId: string;
    source: string;
    /** Absent when the server is configured to keep the answer key private. */
    correctAnswer?: LocalizedText[];
    /** Absent when the server is configured to keep the answer key private. */
    explanation?: LocalizedText;
  }[];
  /** Whether the server sent the answer key along with the result. */
  answersRevealed: boolean;
}

export interface Identity {
  authenticated: true;
  email: string;
  name: string;
}

export interface MetaResponse {
  questionsPerTest: number;
  variantCount: number;
  durationSeconds: number;
  heartbeatSeconds: number;
  bank: { total: number; byTier: Record<Tier, number>; bySource: Record<string, number> };
  auth: { mode: 'google' | 'open'; allowedEmailDomains: string[] };
  integrity: { strikesAllowed: number; graceMs: number; hardTerminateMs: number };
  ladder: { level: Level; label: string; requires: Partial<Record<Tier, number>>; rationale: LocalizedText }[];
  levelLabels: Record<Level, string>;
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body) headers.set('content-type', 'application/json');
  if (token) headers.set('authorization', `Bearer ${token}`);

  const response = await fetch(`${BASE}${path}`, { ...init, headers });
  const text = await response.text();
  const payload: unknown = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const body = payload as { error?: string; message?: string } | null;
    throw new ApiError(
      response.status,
      body?.error ?? 'unknown_error',
      body?.message ?? `Request failed with ${response.status}`,
    );
  }
  return payload as T;
}

export const api = {
  meta: () => request<MetaResponse>('/meta'),

  /**
   * The signed-in candidate, or null. A 401 here is the ordinary state for
   * someone who has not signed in yet, not an error worth surfacing.
   */
  me: async (): Promise<Identity | null> => {
    try {
      return await request<Identity>('/auth/me');
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) return null;
      throw error;
    }
  },

  logout: () => request<null>('/auth/logout', { method: 'POST' }),

  /**
   * In Google mode the identity comes from the session cookie and the body
   * carries only the acknowledgement - passing a name or an email would be
   * ignored by the server anyway.
   */
  start: (input: { candidateName?: string; candidateEmail?: string } = {}) =>
    request<StartResponse>('/attempts', {
      method: 'POST',
      body: JSON.stringify({ ...input, acceptedRules: true }),
    }),

  resume: (attemptId: string, token: string) =>
    request<ResumeResponse>(`/attempts/${attemptId}`, {}, token),

  saveAnswer: (attemptId: string, token: string, questionId: string, optionIds: string[]) =>
    request<{ ok: true; savedOptionCount: number; secondsRemaining: number }>(
      `/attempts/${attemptId}/answers`,
      { method: 'PUT', body: JSON.stringify({ questionId, optionIds }) },
      token,
    ),

  heartbeat: (attemptId: string, token: string) =>
    request<{ attempt: AttemptView }>(`/attempts/${attemptId}/heartbeat`, { method: 'POST' }, token),

  reportIntegrity: (attemptId: string, token: string, events: IntegrityEvent[]) =>
    request<{ verdict: IntegrityVerdict; attempt: AttemptView }>(
      `/attempts/${attemptId}/integrity`,
      { method: 'POST', body: JSON.stringify({ events }) },
      token,
    ),

  submit: (attemptId: string, token: string) =>
    request<ResultResponse>(`/attempts/${attemptId}/submit`, { method: 'POST' }, token),

  result: (attemptId: string, token: string) =>
    request<ResultResponse>(`/attempts/${attemptId}/result`, {}, token),
};

/**
 * Last-gasp report on pagehide.
 *
 * `fetch` is cancelled when the document unloads, so a candidate closing the tab
 * would otherwise leave no record. sendBeacon is queued by the browser and
 * delivered after the page is gone. It cannot set an Authorization header, so
 * the token travels in the query string here - acceptable because the token is
 * single-attempt, short-lived, and the alternative is no evidence at all.
 */
export function beaconIntegrity(attemptId: string, token: string, events: IntegrityEvent[]): void {
  if (typeof navigator.sendBeacon !== 'function') return;
  const url = `${BASE}/attempts/${attemptId}/integrity?token=${encodeURIComponent(token)}`;
  const blob = new Blob([JSON.stringify({ events })], { type: 'application/json' });
  navigator.sendBeacon(url, blob);
}
