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
    expect(verdict.remaining).toBe(1);
  });

  it('ends the attempt on the second ordinary absence', () => {
    const verdict = evaluateIntegrity([
      { type: 'visibility_hidden', occurredAt: at(0), durationMs: 3_000 },
      { type: 'window_blur', occurredAt: at(10_000), durationMs: 3_000 },
    ]);
    expect(verdict.terminate).toBe(true);
    expect(verdict.reason).toContain('lost focus');
  });

  it('ends the attempt on a single long absence', () => {
    // Ten seconds is long enough to read another page, which is exactly the
    // behaviour the requirement exists to stop.
    const verdict = evaluateIntegrity([
      { type: 'visibility_hidden', occurredAt: at(0), durationMs: 15_000 },
    ]);
    expect(verdict.terminate).toBe(true);
    expect(verdict.reason).toContain('hidden');
  });

  it('ends the attempt immediately when the page is navigated away from', () => {
    const verdict = evaluateIntegrity([{ type: 'navigation_away', occurredAt: at(0) }]);
    expect(verdict.terminate).toBe(true);
  });

  it('ends the attempt when the same attempt is opened twice', () => {
    const verdict = evaluateIntegrity([{ type: 'duplicate_session', occurredAt: at(0) }]);
    expect(verdict.terminate).toBe(true);
    expect(verdict.reason).toContain('another tab');
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
