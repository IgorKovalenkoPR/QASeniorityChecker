import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { IntegrityEvent } from '@qasc/core';

/**
 * What these tests are for.
 *
 * The complaint that produced this suite was that termination felt random: the
 * same action - switching to another tab and coming back - could cost one
 * strike or two depending on the browser, and nobody could tell which. The
 * cause was never the policy, it was the detector reporting raw browser events.
 * A single tab switch fires `blur` and `visibilitychange`, in an engine-specific
 * order, and coming back fires `focus` and `visibilitychange` in either order.
 *
 * So the property under test throughout is: ONE human action produces exactly
 * ONE reported event, with the same type and a truthful duration, whatever
 * order the browser chooses to tell us about it. Everything else here is a
 * corollary.
 *
 * The environment is `node`, so there is no DOM. Rather than pull in jsdom for
 * four objects, the harness below implements exactly the surface the proctor
 * touches - which also documents that surface.
 */

class FakeTarget {
  private readonly listeners = new Map<string, Set<(event: unknown) => void>>();

  addEventListener(type: string, handler: (event: unknown) => void): void {
    const set = this.listeners.get(type) ?? new Set();
    set.add(handler);
    this.listeners.set(type, set);
  }

  removeEventListener(type: string, handler: (event: unknown) => void): void {
    this.listeners.get(type)?.delete(handler);
  }

  dispatch(type: string, detail: Record<string, unknown> = {}): void {
    for (const handler of [...(this.listeners.get(type) ?? [])]) {
      handler({ type, preventDefault: () => undefined, ...detail });
    }
  }

  get listenerCount(): number {
    let total = 0;
    for (const set of this.listeners.values()) total += set.size;
    return total;
  }
}

class FakeDocument extends FakeTarget {
  visibilityState: 'visible' | 'hidden' = 'visible';
}

interface Posted {
  kind: string;
  pageId: string;
}

class FakeChannel {
  static instances: FakeChannel[] = [];
  readonly posted: Posted[] = [];
  closed = false;
  onmessage: ((event: { data: unknown }) => void) | null = null;

  constructor(readonly name: string) {
    FakeChannel.instances.push(this);
  }

  postMessage(data: Posted): void {
    this.posted.push(data);
  }

  close(): void {
    this.closed = true;
  }

  /** Simulate another page on the same channel talking to this one. */
  deliver(data: unknown): void {
    this.onmessage?.({ data });
  }
}

const START = 1_700_000_000_000;

let doc: FakeDocument;
let win: FakeTarget;
let events: IntegrityEvent[];
let beacons: number;
let Proctor: typeof import('../src/lib/proctor.js').Proctor;

beforeEach(async () => {
  vi.useFakeTimers();
  vi.setSystemTime(START);
  doc = new FakeDocument();
  win = new FakeTarget();
  events = [];
  beacons = 0;
  FakeChannel.instances = [];

  const g = globalThis as unknown as Record<string, unknown>;
  g.document = doc;
  g.window = Object.assign(win, {
    // Delegated rather than captured, so vitest's fake timers - installed
    // above - are the ones the proctor actually schedules on.
    setTimeout: (fn: () => void, ms?: number) => globalThis.setTimeout(fn, ms),
    clearTimeout: (id: number) => globalThis.clearTimeout(id),
    setInterval: (fn: () => void, ms?: number) => globalThis.setInterval(fn, ms),
    clearInterval: (id: number) => globalThis.clearInterval(id),
  });
  g.BroadcastChannel = FakeChannel;
  g.navigator = {
    sendBeacon: () => {
      beacons += 1;
      return true;
    },
  };
  g.Blob = class {
    constructor(readonly parts: unknown[]) {}
  };

  ({ Proctor } = await import('../src/lib/proctor.js'));
});

afterEach(() => {
  vi.useRealTimers();
});

function build() {
  const proctor = new Proctor({
    attemptId: 'a1',
    token: 't1',
    heartbeatSeconds: 15,
    report: async () => ({ verdict: { strikes: 0, terminate: false, reason: null, remaining: 2 } }),
    handlers: {
      onEvent: (event) => events.push(event),
      onVerdict: () => undefined,
      onLocalWarning: () => undefined,
    },
  });
  proctor.start();
  return proctor;
}

/** Leave the page for `awayMs`, telling the proctor in the given order. */
function tabSwitch(proctor: ReturnType<typeof build>, awayMs: number, order: 'blur-first' | 'hidden-first') {
  if (order === 'blur-first') {
    win.dispatch('blur');
    doc.visibilityState = 'hidden';
    doc.dispatch('visibilitychange');
  } else {
    doc.visibilityState = 'hidden';
    doc.dispatch('visibilitychange');
    win.dispatch('blur');
  }
  vi.advanceTimersByTime(awayMs);
  doc.visibilityState = 'visible';
  doc.dispatch('visibilitychange');
  win.dispatch('focus');
  return proctor;
}

describe('the proctor as a detector', () => {
  it('reports one event per tab switch, whichever order the browser fires', () => {
    // The exact defect: blur and visibilitychange are two signals for one
    // action, and reporting both charged two strikes for one tab switch.
    for (const order of ['blur-first', 'hidden-first'] as const) {
      events = [];
      const proctor = build();
      const left = Date.now();
      tabSwitch(proctor, 4_000, order);
      vi.advanceTimersByTime(2_000);

      expect(events.length, order).toBe(1);
      expect(events[0]?.type, order).toBe('visibility_hidden');
      expect(events[0]?.durationMs, order).toBe(4_000);
      // Stamped when the candidate left, not when the report was assembled.
      expect(events[0]?.occurredAt, order).toBe(left);
      proctor.stop();
    }
  });

  it('calls an absence by what happened, not by which return event won', () => {
    // A window switch on a second monitor never hides the document, so it is a
    // blur and nothing else. Previously the reported type depended on whether
    // `focus` or `visibilitychange` arrived first, so the same action could be
    // logged under either name and the reviewer's report was unreadable.
    const proctor = build();
    win.dispatch('blur');
    vi.advanceTimersByTime(3_000);
    win.dispatch('focus');
    vi.advanceTimersByTime(2_000);

    expect(events.length).toBe(1);
    expect(events[0]?.type).toBe('window_blur');
    expect(events[0]?.durationMs).toBe(3_000);
    proctor.stop();
  });

  it('treats a burst of blur/focus chatter as one absence', () => {
    // Windows alt-tab, native dialogs and monitor switches emit clusters of
    // blur/focus milliseconds apart. Counted raw, one alt-tab could exhaust a
    // two-interruption budget on its own.
    const proctor = build();
    win.dispatch('blur');
    vi.advanceTimersByTime(1_500);
    win.dispatch('focus');
    vi.advanceTimersByTime(200); // back, but not for long enough to be back
    win.dispatch('blur');
    vi.advanceTimersByTime(1_500);
    win.dispatch('focus');
    vi.advanceTimersByTime(2_000);

    expect(events.length).toBe(1);
    // Three seconds away, and the 200ms spent back does not count as away.
    expect(events[0]?.durationMs).toBe(3_000);
    proctor.stop();
  });

  it('still counts two genuinely separate absences separately', () => {
    // The coalescing window must not become a free second lookup.
    const proctor = build();
    tabSwitch(proctor, 3_000, 'blur-first');
    vi.advanceTimersByTime(10_000);
    tabSwitch(proctor, 3_000, 'blur-first');
    vi.advanceTimersByTime(2_000);

    expect(events.map((event) => event.type)).toEqual(['visibility_hidden', 'visibility_hidden']);
    proctor.stop();
  });

  it('does not lose an absence when the candidate closes the tab from another one', () => {
    // Switch away, then close the tab. The absence used to be dropped entirely,
    // so the longest absences were the least likely to be recorded - only the
    // navigation went out.
    const proctor = build();
    win.dispatch('blur');
    doc.visibilityState = 'hidden';
    doc.dispatch('visibilitychange');
    vi.advanceTimersByTime(20_000);
    win.dispatch('pagehide', { persisted: false });

    expect(events.map((event) => event.type)).toEqual(['visibility_hidden', 'navigation_away']);
    expect(events[0]?.durationMs).toBe(20_000);
    expect(beacons).toBe(1);
    proctor.stop();
  });

  it('records an absence that began before it was watching', () => {
    // The paper is created by a request; a candidate can switch away while it
    // is in flight, so the document is already hidden when the proctor starts
    // and no `visibilitychange` will fire until they come back.
    doc.visibilityState = 'hidden';
    const proctor = build();
    vi.advanceTimersByTime(5_000);
    doc.visibilityState = 'visible';
    doc.dispatch('visibilitychange');
    vi.advanceTimersByTime(2_000);

    expect(events.length).toBe(1);
    expect(events[0]?.type).toBe('visibility_hidden');
    expect(events[0]?.durationMs).toBe(5_000);
    proctor.stop();
  });

  it('ignores a focus that arrives while the document is still hidden', () => {
    const proctor = build();
    doc.visibilityState = 'hidden';
    doc.dispatch('visibilitychange');
    vi.advanceTimersByTime(3_000);
    win.dispatch('focus'); // still hidden: the absence is not over
    vi.advanceTimersByTime(3_000);

    expect(events.length).toBe(0);
    proctor.stop();
  });
});

describe('the duplicate-tab guard', () => {
  it('counts each peer page once, however often it speaks', () => {
    const proctor = build();
    const channel = FakeChannel.instances[0]!;
    expect(channel.posted[0]?.kind).toBe('hello');
    const me = channel.posted[0]!.pageId;

    channel.deliver({ kind: 'hello', pageId: 'peer-1' });
    channel.deliver({ kind: 'here', pageId: 'peer-1' });
    channel.deliver({ kind: 'hello', pageId: 'peer-1' });

    expect(events.filter((event) => event.type === 'duplicate_session').length).toBe(1);
    // And it answered the peer once, so the peer can count this page too.
    expect(channel.posted.filter((post) => post.kind === 'here').length).toBe(1);

    // Its own announcement, echoed back, is not a second session.
    channel.deliver({ kind: 'hello', pageId: me });
    expect(events.filter((event) => event.type === 'duplicate_session').length).toBe(1);
    proctor.stop();
  });

  it('stops answering the handshake once the page is really unloading', () => {
    // On a reload the outgoing page would otherwise answer its own replacement,
    // and both would record a second session that never existed - a strike for
    // pressing F5, on top of the one the reload already costs.
    const proctor = build();
    const channel = FakeChannel.instances[0]!;
    win.dispatch('pagehide', { persisted: false });
    expect(channel.closed).toBe(true);
    proctor.stop();
  });

  it('keeps the channel through a move into the back/forward cache', () => {
    // A page frozen in the bfcache runs no handlers, so it cannot answer
    // anything; closing the channel would only break the guard if it thaws.
    const proctor = build();
    const channel = FakeChannel.instances[0]!;
    win.dispatch('pagehide', { persisted: true });
    expect(channel.closed).toBe(false);
    proctor.stop();
  });
});

describe('the proctor when stopped', () => {
  it('detaches every listener it attached', () => {
    const proctor = build();
    expect(doc.listenerCount + win.listenerCount).toBeGreaterThan(0);
    proctor.stop();
    expect(doc.listenerCount + win.listenerCount).toBe(0);
  });

  it('reports nothing after being stopped', () => {
    const proctor = build();
    proctor.stop();
    events = [];
    win.dispatch('blur');
    vi.advanceTimersByTime(10_000);
    win.dispatch('focus');
    vi.advanceTimersByTime(2_000);
    expect(events).toEqual([]);
  });
});
