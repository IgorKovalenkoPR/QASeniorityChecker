# QA Seniority Checker

A self-assessment platform where a QA engineer takes a 20-question test that estimates their
current position on the company Performance Review ladder — from **Trainee−** to **Senior** —
before the formal review process is scheduled.

The scoring rules are not invented. They are transcribed from row 4 of the
*"QA roadmap employee copy"* Performance Review sheet, and the competencies are the sheet's own
skill rows, with each row's seniority tier read from its fill colour.

---

## What it does

| | |
| --- | --- |
| **Questions per test** | 20 |
| **Test variants** | 50, fixed and deterministic |
| **Question bank** | 516 questions |
| **Tier split per paper** | 4 Trainee · 6 Junior · 6 Middle · 4 Senior |
| **Time limit** | 30 minutes, enforced by the server |
| **Result** | One of 9 rungs, plus per-tier and per-competency breakdown |

### Where the questions come from

| Source | Questions | Asked at |
| --- | --- | --- |
| Performance Review matrix | 288 | every tier |
| ISTQB Foundation Level (CTFL v4.0) | 42 | Junior |
| ISTQB Advanced — Test Analyst (CTAL-TA) | 64 | Middle and Senior |
| ISTQB Advanced — Test Manager (CTAL-TM) | 32 | Senior |
| ISTQB Glossary terminology | 45 | Trainee, Junior, Middle |
| Practice-test style scenarios | 45 | Trainee, Junior, Middle |

The certification split follows the sheet: it names ISTQB Foundation Level as a Junior expectation
and ISTQB Advanced Level as a Senior one.

> The practice-test questions are **original**, written in the format used by the well-known public
> quiz banks. Nothing is reproduced from a commercial question set — public dumps carry both a
> copyright problem and a quality problem, since many of their published answers are wrong or
> describe superseded syllabus versions.

---

## The seniority ladder

Four tier scores are computed as percentages, and the highest rung whose thresholds are all met is
awarded. This is the sheet's own rule set, verbatim:

| Level | Requires |
| --- | --- |
| Trainee− | *below everything* |
| Trainee | Trainee ≥ 25% |
| Junior− | Trainee ≥ 50% |
| Junior | Junior ≥ 25% **and** Trainee ≥ 50% *(+ ISTQB Foundation Level)* |
| Junior+ | Junior ≥ 50% **and** Trainee ≥ 75% |
| Middle− | Junior ≥ 75% |
| Middle | Middle ≥ 50% **and** Junior ≥ 75% |
| Middle+ | Senior ≥ 25% **and** Middle ≥ 75% |
| Senior | Senior ≥ 50% **and** Middle ≥ 75% *(+ ISTQB Advanced Level)* |

Because every rung above Junior also constrains the tiers below it, a candidate cannot reach the top
of the ladder by acing the senior questions while failing the fundamentals. There is a test for
exactly that.

---

## Exam integrity

> **The attempt ends when the candidate leaves the page.**

This is implemented as a strike system rather than a hair trigger, because a browser fires the same
events for an OS notification, a password-manager popup and an incoming call as it does for a
candidate opening a second tab. Terminating an honest attempt is a worse failure than letting one
borderline blur through.

| Signal | Detected by | Default cost |
| --- | --- | --- |
| Tab switch, minimise, mobile app switch | `visibilitychange` | 1 strike (0 if under 2 s) |
| Focus lost to another window | `blur` / `focus` | 1 strike (0 if under 2 s) |
| Any absence longer than 10 s | measured duration | terminates immediately |
| Tab closed, navigated away | `pagehide` + `sendBeacon` | terminates immediately |
| Same attempt open in a second tab | `BroadcastChannel` | terminates immediately |
| Client stops sending heartbeats | **server-side gap detection** | 1 strike, scaled by gap length |
| Copy, paste, right-click | DOM events | recorded, 0 cost |
| Devtools shortcuts | key handler | recorded, low cost |

Two strikes end the attempt. A terminated attempt is **never scored**.

### Why the server decides

The browser reports; the server rules. Anything the client decides can be edited in the client, so
the client's verdict is advisory only. More importantly, the server sees what the client cannot —
**silence**. A candidate who patches out the visibility listeners still has to keep the heartbeat
flowing, and a heartbeat cannot be sent by a tab that has been closed. A gap longer than the grace
window is recorded as an absence with its measured duration and fed through the same rules.

The verdict is computed by replaying the **whole** stored event log, so a retried beacon, a
duplicated request or an out-of-order delivery all converge on the same answer.

### Why the answer key never reaches the browser

1. Correct answers live in `@qasc/content`, which the API imports and the web bundle does not. There
   is a test asserting the built bundle contains no question ids and no key.
2. Every attempt receives **its own opaque option ids**, derived as
   `HMAC(secret, attemptId | questionId | optionId)`. A leaked "V07 Q3 = c" is worthless in any other
   attempt, and there is no small id space to brute-force — the client can only echo back ids the
   server issued.
3. Option order is shuffled per attempt, so a screenshot of "the third option" does not transfer.
4. `attempt_answers` stores what was selected, never whether it was right. Correctness is computed
   inside the submit transaction, so no over-broad `SELECT` can leak it.

---

## Architecture

```
packages/core      Domain: tiers, the 9-rung ladder, scoring, integrity policy,
                   deterministic variant builder. No I/O, no framework.
packages/content   The 516-question bank + the 50 generated papers.
apps/api           Fastify + SQLite. Owns the clock, the key and the verdict.
apps/web           React + Vite SPA. Reports; never decides.
```

Two things are deliberately **not** in the database: the question bank and the variants. Both are
deterministic code artefacts built from a fixed seed, so persisting them would create a second
source of truth that could drift from the one the scoring uses. An attempt stores only a variant
*number*, and the paper is reconstructed from it — which is also what lets a reviewer re-open a
six-month-old result and see the exact questions the candidate saw.

Full design documents:

- [`docs/architecture.md`](docs/architecture.md) — components, data model, API surface, threat model
- [`docs/design-system.md`](docs/design-system.md) — tokens, components, contrast audit
- [`docs/variants.md`](docs/variants.md) — all 50 papers with the answer key *(internal)*

---

## Running it

```bash
npm install

# Two processes, API on :3000 and Vite on :5173 with a proxy to the API
npm run dev

# Or build the SPA and let the API serve it on :3000
npm run build && npm start
```

```bash
npm test               # 81 tests
npm run typecheck
npm run export:variants   # regenerate docs/variants.md
```

### Configuration

| Variable | Default | Notes |
| --- | --- | --- |
| `PORT` | `3000` | |
| `QASC_DB` | `data/qasc.db` | SQLite file |
| `QASC_ATTEMPT_SECONDS` | `1800` | Wall-clock budget per attempt |
| `QASC_HEARTBEAT_SECONDS` | `15` | Client ping period |
| `QASC_HEARTBEAT_GRACE_SECONDS` | `45` | Silence tolerated before it becomes an event |
| `QASC_OPTION_SECRET` | *generated in dev* | **Required in production**, ≥ 32 chars |
| `QASC_ADMIN_TOKEN` | *unset* | Admin endpoints return 503 until set |
| `QASC_CORS_ORIGIN` | `http://localhost:5173` | |

`QASC_OPTION_SECRET` must be stable for the lifetime of an attempt: rotating it mid-test invalidates
the option ids of every paper in flight. The process refuses to start in production without it.

---

## Two things to settle before this ships

**1. The brand colours are inferred, not TestFort's.** `testfort.com` is unreachable from the
environment this was built in (egress policy blocked it, and so did the brand-asset fallbacks), so
the palette is a coherent, contrast-validated system built to TestFort's stated visual direction —
not its actual style guide. All six brand values sit in one clearly marked block at the top of
`apps/web/src/styles/tokens.css`; replacing them rethemes the whole application. Everything else in
the palette derives from them, and the contrast ratios in `docs/design-system.md` were computed, not
estimated — three colours were darkened specifically to pass WCAG AA.

**2. The questions are in English.** The Performance Review sheet supplied is the English copy, ISTQB
terminology is English, and the matrix itself lists *"Creating defect reports (in English)"* and
*"Can read and understand test documentation"* as assessed competencies. A Ukrainian translation of
the bank is a mechanical addition — every question carries a stable id — but it is a decision about
what the test measures, not a formatting choice, so it was left to you.

---

## Scope note

Three sections of the Performance Review sheet are intentionally absent from the question bank:
**Books**, **Certification/courses** and the conversational **English** rows. Whether someone has
read *Peopleware*, holds a CTFL certificate, or can hold a customer call is evidence gathered during
the review itself — a written knowledge test cannot establish any of it, and pretending otherwise
would make the result less trustworthy, not more.

The estimated level is a **starting point for the Performance Review conversation, not a decision**.
Twenty questions cannot cover 60 competency rows; the result page says so, and names the specific
rows the paper actually touched.
