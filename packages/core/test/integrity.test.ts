import { describe, expect, it } from 'vitest';
import {
  DEFAULT_INTEGRITY_POLICY,
  INTEGRITY_EVENT_TYPES,
  evaluateIntegrity,
  strikeCost,
} from '../src/integrity.js';
import type { IntegrityEvent } from '../src/integrity.js';

const at = (offset: number): number => 1_700_000_000_000 + offset;

/** An ordinary tab switch: away long enough to count, short enough to survive. */
const absence = (offset: number): IntegrityEvent => ({
  type: 'visibility_hidden',
  occurredAt: at(offset),
  durationMs: 3_000,
});

describe('integrity policy', () => {
  it('forgives a blink-length blur', () => {
    // A notification stealing focus for half a second must not fail an honest
    // candidate - this is the single most important false-positive guard.
    const event: IntegrityEvent = { type: 'window_blur', occurredAt: at(0), durationMs: 500 };
    expect(strikeCost(event, DEFAULT_INTEGRITY_POLICY)).toBe(0);
    expect(evaluateIntegrity([event]).terminate).toBe(false);
  });

  it('warns on the first absence and ends the attempt on the second', () => {
    // The owner asked for two: leaving the page once is a warning, twice ends
    // it. The budget is only this tight because everything a candidate cannot
    // control was taken out of it at the same time - see the tests below.
    const one = evaluateIntegrity([absence(0)]);
    expect(one.strikes).toBe(1);
    expect(one.terminate).toBe(false);
    expect(one.remaining).toBe(1);

    const two = evaluateIntegrity([absence(0), absence(10_000)]);
    expect(two.terminate).toBe(true);
    expect(two.remaining).toBe(0);
    expect(two.reason?.en).toContain('hidden');
  });

  it('ends the attempt on a single long absence', () => {
    // Thirty seconds is long enough to read another page, which is exactly the
    // behaviour the requirement exists to stop. Below that the absence is a
    // strike, not a verdict: a screen lock, a screensaver or a full-screen app
    // stealing the display all look identical to a tab switch from here.
    expect(
      evaluateIntegrity([{ type: 'visibility_hidden', occurredAt: at(0), durationMs: 15_000 }])
        .terminate,
    ).toBe(false);

    const verdict = evaluateIntegrity([
      { type: 'visibility_hidden', occurredAt: at(0), durationMs: 45_000 },
    ]);
    expect(verdict.terminate).toBe(true);
    expect(verdict.reason?.uk).toContain('приховано');
  });

  it('never charges a strike for server-observed silence', () => {
    // The regression this rework exists to prevent. Silence used to cost a
    // strike between two and five minutes. With a budget of two, one flaky-wifi
    // minute would have decided half the verdict - for something the candidate
    // cannot see happening, did not do, and cannot argue with. It is now either
    // long enough to be final on its own or it is free, with nothing in between.
    for (const durationMs of [90_000, 180_000, 290_000]) {
      const verdict = evaluateIntegrity([
        { type: 'heartbeat_gap', occurredAt: at(0), durationMs },
      ]);
      expect(verdict.strikes, `${durationMs}ms`).toBe(0);
      expect(verdict.terminate, `${durationMs}ms`).toBe(false);
    }

    expect(
      evaluateIntegrity([{ type: 'heartbeat_gap', occurredAt: at(0), durationMs: 400_000 }])
        .terminate,
    ).toBe(true);
  });

  it('lets a candidate survive a network drop and a tab switch on the same attempt', () => {
    // The concrete unfairness the previous policy produced: a four-minute VPN
    // reconnect plus one glance at a Teams popup, and the attempt was over.
    const verdict = evaluateIntegrity([
      { type: 'heartbeat_gap', occurredAt: at(0), durationMs: 240_000 },
      absence(300_000),
    ]);
    expect(verdict.strikes).toBe(1);
    expect(verdict.terminate).toBe(false);
  });

  it('does not let a heartbeat gap inherit the hidden-tab hard terminate', () => {
    // The older regression, still worth pinning: the gap used to be recorded as
    // a visibility_hidden carrying the whole gap as its duration, so every gap
    // past the grace window was automatically past the hard terminate.
    const gap = { occurredAt: at(0), durationMs: 130_000 } as const;
    expect(strikeCost({ ...gap, type: 'heartbeat_gap' }, DEFAULT_INTEGRITY_POLICY)).toBe(0);
    expect(strikeCost({ ...gap, type: 'visibility_hidden' }, DEFAULT_INTEGRITY_POLICY)).toBe(
      DEFAULT_INTEGRITY_POLICY.terminateAtStrikes,
    );
  });

  it('records guesses about intent without punishing them', () => {
    // F12 does not prove devtools opened, Ctrl+P is prevented before it prints,
    // and highlighting a question is what reading looks like. Under a budget of
    // two, charging any of these would have made a stray keypress worth half an
    // attempt. They stay in the log for the reviewer and cost nothing.
    const verdict = evaluateIntegrity([
      { type: 'copy_attempt', occurredAt: at(0) },
      { type: 'paste_attempt', occurredAt: at(1) },
      { type: 'context_menu', occurredAt: at(2) },
      { type: 'devtools_suspected', occurredAt: at(3) },
      { type: 'devtools_suspected', occurredAt: at(4) },
      { type: 'print_attempt', occurredAt: at(5) },
      { type: 'print_attempt', occurredAt: at(6) },
    ]);
    expect(verdict.strikes).toBe(0);
    expect(verdict.terminate).toBe(false);
  });

  it('keeps zero-weight events out of the budget however many arrive', () => {
    // The invariant behind the whole policy: a strike may only be charged for a
    // deliberate act the candidate can perceive. Anything the weight table
    // scores at zero must therefore be unable to end an attempt no matter how
    // often it fires - so a future weight change cannot quietly re-arm one.
    const free = INTEGRITY_EVENT_TYPES.filter(
      (type) => DEFAULT_INTEGRITY_POLICY.weights[type] === 0,
    );
    expect(free.length).toBeGreaterThan(0);

    for (const type of free) {
      // No duration: a duration is what makes an absence or a silence fatal,
      // and those routes are covered by their own tests above.
      const events: IntegrityEvent[] = Array.from({ length: 20 }, (_, i) => ({
        type,
        occurredAt: at(i * 1_000),
      }));
      const verdict = evaluateIntegrity(events);
      expect(verdict.strikes, type).toBe(0);
      expect(verdict.terminate, type).toBe(false);
    }
  });

  it('charges a reload one strike but never ends the attempt on the first one', () => {
    // pagehide fires on F5, on the back button and on crash recovery exactly as
    // it does on a deliberate exit, and the client cannot tell them apart at the
    // time it has to report. The start screen tells the candidate the
    // server-side timer survives a reload, so terminating on the first pagehide
    // would fail people for an action they were told was allowed. The second one
    // does end it, and the start screen now says so in as many words.
    const one = evaluateIntegrity([{ type: 'navigation_away', occurredAt: at(0) }]);
    expect(one.strikes).toBe(1);
    expect(one.terminate).toBe(false);

    const two = evaluateIntegrity([
      { type: 'navigation_away', occurredAt: at(0) },
      { type: 'navigation_away', occurredAt: at(60_000) },
    ]);
    expect(two.terminate).toBe(true);
  });

  it('treats a second tab as one interruption, not an instant verdict', () => {
    // A second tab is deliberate and visible, so it belongs in the budget. It
    // is no longer double-weighted: at a budget of two that made the first
    // detection final, and the handshake that detects it can misfire on a
    // browser restoring tabs.
    const one = evaluateIntegrity([{ type: 'duplicate_session', occurredAt: at(0) }]);
    expect(one.strikes).toBe(1);
    expect(one.terminate).toBe(false);

    const two = evaluateIntegrity([
      { type: 'duplicate_session', occurredAt: at(0) },
      { type: 'duplicate_session', occurredAt: at(1_000) },
    ]);
    expect(two.terminate).toBe(true);
    expect(two.reason?.uk).toContain('вкладці');
  });

  it('gives the reason in both languages', () => {
    // The sentence is shown at the moment an attempt ends - the worst possible
    // moment to hand a Ukrainian reader English, or the reverse. Checked for
    // Cyrillic on the Ukrainian side specifically, because an untranslated
    // string copied into both slots is exactly the failure that looks fine.
    // The shortest log that terminates on each type: the absence types and a
    // long silence are fatal alone, the other two need their second event.
    const fatal: Record<string, IntegrityEvent[]> = {
      visibility_hidden: [{ type: 'visibility_hidden', occurredAt: at(0), durationMs: 45_000 }],
      window_blur: [{ type: 'window_blur', occurredAt: at(0), durationMs: 45_000 }],
      heartbeat_gap: [{ type: 'heartbeat_gap', occurredAt: at(0), durationMs: 400_000 }],
      navigation_away: [
        { type: 'navigation_away', occurredAt: at(0) },
        { type: 'navigation_away', occurredAt: at(1_000) },
      ],
      duplicate_session: [
        { type: 'duplicate_session', occurredAt: at(0) },
        { type: 'duplicate_session', occurredAt: at(1_000) },
      ],
    };

    for (const [type, events] of Object.entries(fatal)) {
      const verdict = evaluateIntegrity(events);
      expect(verdict.terminate, type).toBe(true);
      expect(verdict.reason?.en.length, type).toBeGreaterThan(20);
      expect(verdict.reason?.en, type).not.toMatch(/[а-яіїєґА-ЯІЇЄҐ]/);
      expect(verdict.reason?.uk, type).toMatch(/[а-яіїєґА-ЯІЇЄҐ]/);
    }
  });

  it('is a pure fold, so replaying the log is idempotent', () => {
    const events: IntegrityEvent[] = [absence(0)];
    expect(evaluateIntegrity(events)).toEqual(evaluateIntegrity(events));
  });

  it('never reports a reason while the attempt survives', () => {
    const verdict = evaluateIntegrity([absence(0)]);
    expect(verdict.terminate).toBe(false);
    expect(verdict.reason).toBeNull();
  });

  it('honours a stricter policy without code changes', () => {
    const strict = { ...DEFAULT_INTEGRITY_POLICY, terminateAtStrikes: 1, graceMs: 0 };
    const verdict = evaluateIntegrity(
      [{ type: 'window_blur', occurredAt: at(0), durationMs: 100 }],
      strict,
    );
    expect(verdict.terminate).toBe(true);
  });
});
