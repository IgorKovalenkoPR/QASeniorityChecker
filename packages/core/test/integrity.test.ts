import { describe, expect, it } from 'vitest';
import { DEFAULT_INTEGRITY_POLICY, evaluateIntegrity, strikeCost } from '../src/integrity.js';
import type { IntegrityEvent } from '../src/integrity.js';

const at = (offset: number): number => 1_700_000_000_000 + offset;

describe('integrity policy', () => {
  it('forgives a blink-length blur', () => {
    // A notification stealing focus for half a second must not fail an honest
    // candidate - this is the single most important false-positive guard.
    const event: IntegrityEvent = { type: 'window_blur', occurredAt: at(0), durationMs: 500 };
    expect(strikeCost(event, DEFAULT_INTEGRITY_POLICY)).toBe(0);
    expect(evaluateIntegrity([event]).terminate).toBe(false);
  });

  it('charges a strike for an absence past the grace window', () => {
    const event: IntegrityEvent = { type: 'visibility_hidden', occurredAt: at(0), durationMs: 4_000 };
    expect(strikeCost(event, DEFAULT_INTEGRITY_POLICY)).toBe(1);
    const verdict = evaluateIntegrity([event]);
    expect(verdict.strikes).toBe(1);
    expect(verdict.terminate).toBe(false);
    expect(verdict.remaining).toBe(3);
  });

  it('survives two ordinary absences and ends on the fourth', () => {
    // Two focus losses in half an hour is an ordinary working day - a Teams
    // popup and a glance at the clock - not evidence of cheating. Failing an
    // honest attempt costs the result AND the candidate's trust in the tool,
    // so the ordinary-absence budget is four, not two.
    const two = evaluateIntegrity([
      { type: 'visibility_hidden', occurredAt: at(0), durationMs: 3_000 },
      { type: 'window_blur', occurredAt: at(10_000), durationMs: 3_000 },
    ]);
    expect(two.terminate).toBe(false);
    expect(two.strikes).toBe(2);

    const four = evaluateIntegrity([
      { type: 'visibility_hidden', occurredAt: at(0), durationMs: 3_000 },
      { type: 'window_blur', occurredAt: at(10_000), durationMs: 3_000 },
      { type: 'visibility_hidden', occurredAt: at(20_000), durationMs: 3_000 },
      { type: 'window_blur', occurredAt: at(30_000), durationMs: 3_000 },
    ]);
    expect(four.terminate).toBe(true);
    expect(four.reason).toContain('втратило фокус');
  });

  it('ends the attempt on a single long absence', () => {
    // Thirty seconds is long enough to read another page, which is exactly the
    // behaviour the requirement exists to stop. Below that the absence is a
    // strike, not a verdict: a screen lock, a screensaver or a full-screen app
    // stealing the display all look identical to a tab switch from here.
    const short = evaluateIntegrity([
      { type: 'visibility_hidden', occurredAt: at(0), durationMs: 15_000 },
    ]);
    expect(short.terminate).toBe(false);

    const verdict = evaluateIntegrity([
      { type: 'visibility_hidden', occurredAt: at(0), durationMs: 45_000 },
    ]);
    expect(verdict.terminate).toBe(true);
    expect(verdict.reason).toContain('приховано');
  });

  it('does not end the attempt on a single navigation away, because that is a reload', () => {
    // pagehide fires on F5, on the back button and on a browser crash recovery
    // exactly as it does on a deliberate exit, and the client cannot tell them
    // apart at the time it has to report. The start screen tells the candidate
    // the server-side timer survives a reload, so terminating on the first
    // pagehide would fail people for an action they were told was allowed.
    const one = evaluateIntegrity([{ type: 'navigation_away', occurredAt: at(0) }]);
    expect(one.terminate).toBe(false);
    expect(one.strikes).toBe(1);

    const four = evaluateIntegrity([
      { type: 'navigation_away', occurredAt: at(0) },
      { type: 'navigation_away', occurredAt: at(1_000) },
      { type: 'navigation_away', occurredAt: at(2_000) },
      { type: 'navigation_away', occurredAt: at(3_000) },
    ]);
    expect(four.terminate).toBe(true);
  });

  it('charges a duplicate session double, but does not end the attempt on its own', () => {
    // A second tab is a deliberate act with no innocent explanation, so it
    // costs double - but it is still a strike, not an instant verdict, because
    // sessionStorage duplication also happens when a browser restores tabs.
    const one = evaluateIntegrity([{ type: 'duplicate_session', occurredAt: at(0) }]);
    expect(one.strikes).toBe(2);
    expect(one.terminate).toBe(false);

    const two = evaluateIntegrity([
      { type: 'duplicate_session', occurredAt: at(0) },
      { type: 'duplicate_session', occurredAt: at(1_000) },
    ]);
    expect(two.terminate).toBe(true);
    expect(two.reason).toContain('іншій вкладці');
  });

  it('treats server-observed silence far more gently than a reported absence', () => {
    // The server cannot tell a closed tab from a dropped connection, a VPN
    // reconnect or a shut lid, and the candidate cannot see it happening or
    // argue with it. Silence is therefore scored on its own scale: nothing
    // under two minutes, a strike up to five, and only then a verdict.
    const brief = evaluateIntegrity([
      { type: 'heartbeat_gap', occurredAt: at(0), durationMs: 90_000 },
    ]);
    expect(brief.strikes).toBe(0);
    expect(brief.terminate).toBe(false);

    const notable = evaluateIntegrity([
      { type: 'heartbeat_gap', occurredAt: at(0), durationMs: 180_000 },
    ]);
    expect(notable.strikes).toBe(1);
    expect(notable.terminate).toBe(false);

    const fatal = evaluateIntegrity([
      { type: 'heartbeat_gap', occurredAt: at(0), durationMs: 400_000 },
    ]);
    expect(fatal.terminate).toBe(true);
  });

  it('does not let a heartbeat gap inherit the hidden-tab hard terminate', () => {
    // This is the regression that mattered: the gap used to be recorded as a
    // visibility_hidden carrying the whole gap as its duration, so every gap
    // past the grace window was automatically past the 30s hard terminate and
    // ended the attempt. Three missed pings must not be a verdict.
    const gap = { occurredAt: at(0), durationMs: 130_000 } as const;
    expect(strikeCost({ ...gap, type: 'heartbeat_gap' }, DEFAULT_INTEGRITY_POLICY)).toBe(1);
    expect(strikeCost({ ...gap, type: 'visibility_hidden' }, DEFAULT_INTEGRITY_POLICY)).toBe(
      DEFAULT_INTEGRITY_POLICY.terminateAtStrikes,
    );
  });

  it('records but does not punish copy, paste and right-click', () => {
    const verdict = evaluateIntegrity([
      { type: 'copy_attempt', occurredAt: at(0) },
      { type: 'paste_attempt', occurredAt: at(1) },
      { type: 'context_menu', occurredAt: at(2) },
      { type: 'devtools_suspected', occurredAt: at(3) },
    ]);
    // devtools_suspected carries weight; the other three do not.
    expect(verdict.strikes).toBe(1);
    expect(verdict.terminate).toBe(false);
  });

  it('is a pure fold, so replaying the log is idempotent', () => {
    const events: IntegrityEvent[] = [
      { type: 'window_blur', occurredAt: at(0), durationMs: 3_000 },
    ];
    expect(evaluateIntegrity(events)).toEqual(evaluateIntegrity(events));
  });

  it('never reports a reason while the attempt survives', () => {
    const verdict = evaluateIntegrity([
      { type: 'window_blur', occurredAt: at(0), durationMs: 3_000 },
    ]);
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
