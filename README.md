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
| **Question bank** | 504 questions, in Ukrainian |
| **Tier split per paper** | 4 Trainee · 6 Junior · 6 Middle · 4 Senior |
| **Time limit** | 30 minutes, enforced by the server |
| **Result** | One of 9 rungs, plus per-tier and per-competency breakdown |

### Where the questions come from

| Source | Questions | Asked at |
| --- | --- | --- |
| Performance Review matrix | 276 | every tier |
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
> describe superseded syllabus versions. The ISTQB questions are likewise original formulations
> that test syllabus concepts, not reproductions of syllabus or exam text.

### What the test deliberately does not ask

Three groups of Performance Review rows carry no questions:

- **Books** and **Certification/courses** — whether someone has read *Peopleware* or holds a CTFL
  certificate is evidence gathered during the review itself.
- **Customer communication** — the presale row, the "emails to a customer" row and the
  customer-facing report row. Talking to a client is judged on a call, not on a multiple-choice
  question, and a written test that pretends otherwise makes the result less trustworthy.

The competency rows stay in `packages/core/src/competencies.ts` so the matrix remains fully
transcribed; they simply have no questions attached.

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

1. Correct answers live in `@qasc/content`, which the API imports and the web bundle does not.
   `npm run check:bundle` greps the *built* artefact for question ids and explanation text and fails
   if any appear, so a stray `import { QUESTION_BANK }` in a React component cannot slip through
   review. CI runs it on every pull request.
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
packages/content   The 504-question bank (Ukrainian) + the 50 generated papers.
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

### With Docker

```bash
export QASC_OPTION_SECRET=$(openssl rand -hex 32)   # keep this value; see below
docker compose up --build
```

One container: the API serves the prebuilt SPA on the same origin, so there is no
cross-origin request to configure. Attempts live in a named volume mounted at
`/app/data` — without it, a redeploy discards the results of anyone mid-review.

Compose refuses to start when `QASC_OPTION_SECRET` is unset rather than inventing
one, because a value that changes between deploys invalidates the option ids of
every attempt in flight.

The image runs the API directly instead of the root `npm start`: that script
rebuilds the SPA first, and the build tooling is pruned from the runtime image.

```bash
npm test                  # 81 tests
npm run typecheck         # solution build, plus apps/web separately
npm run build
npm run check:bundle      # answer key must not be in the built SPA (needs a build first)
npm run export:variants   # regenerate docs/variants.md
```

CI runs all of the above on every pull request, and additionally checks that `docs/variants.md`
still regenerates byte for byte — a diff there means either the bank changed without the document
being regenerated, or variant generation stopped being deterministic.

### Configuration

| Variable | Default | Notes |
| --- | --- | --- |
| `PORT` | `3000` | |
| `QASC_DB` | `data/qasc.db` | SQLite file |
| `QASC_ATTEMPT_SECONDS` | `1800` | Wall-clock budget per attempt |
| `QASC_HEARTBEAT_SECONDS` | `15` | Client ping period |
| `QASC_HEARTBEAT_GRACE_SECONDS` | `120` | Silence tolerated before it becomes an event |
| `QASC_REVEAL_ANSWERS_TO_CANDIDATE` | `false` | Whether a candidate's own result carries the answer key |
| `QASC_OPTION_SECRET` | *generated in dev* | **Required in production**, ≥ 32 chars |
| `QASC_ADMIN_TOKEN` | *unset* | Admin endpoints return 503 until set |
| `QASC_CORS_ORIGIN` | `http://localhost:5173` | |

`QASC_OPTION_SECRET` must be stable for the lifetime of an attempt: rotating it mid-test invalidates
the option ids of every paper in flight. The process refuses to start in production without it.

### Reading a finished attempt

The candidate's result deliberately does **not** carry the answer key
(`QASC_REVEAL_ANSWERS_TO_CANDIDATE` is `false` by default). They see their rung, the per-tier and
per-competency breakdown, and which of the twenty questions counted - not the correct answers or
the explanations. The reason is arithmetic: a variant is 20 questions out of 504 and the variant
counter round-robins, so a reviewer-grade result screen shown to everyone is a slow, complete
export of the bank to anyone holding the link.

The reviewer's view lives behind `QASC_ADMIN_TOKEN`:

```
GET  /api/admin/attempts                   # roster, newest first, with the final rung
GET  /api/admin/attempts/:id/result        # per-question detail, answers and explanations
GET  /api/admin/attempts/:id/integrity     # the honesty event log, plus any reinstatement
POST /api/admin/attempts/:id/reinstate     # overturn a false termination and score it
```

`/result` is the endpoint the pilot needs: without it you can see that somebody scored Middle but
not which questions they missed, and the candidate's own token is stored only as a hash, so it
cannot be replayed after the fact.

A terminated attempt is never scored, so it has no row in `attempt_results` and `/result` returns
404 for it. The answers themselves are kept in `attempt_answers` whatever the status, so nothing is
ever actually lost.

### Overturning a termination

The proctor can be wrong, and `POST /api/admin/attempts/:id/reinstate` is how a reviewer says so.
It takes a required `note` - overturning a termination is a judgement someone has to own in
writing, because the reinstated attempt then sits in the roster next to clean ones.

```bash
curl -X POST "$BASE/api/admin/attempts/$ID/reinstate" \
  -H "authorization: Bearer $QASC_ADMIN_TOKEN" \
  -H 'content-type: application/json' \
  -d '{"note":"Wifi у переговорці впав; кандидат був на звʼязку зі мною."}'
```

It forgives the attempt's honesty events, scores the answers as they stand, and returns the full
reviewer result together with a record of the decision. Three things are worth knowing:

- **Forgiven, not deleted.** The events stay in `integrity_events` with `forgiven = 1` and are
  still returned by the `/integrity` endpoint. They are only excluded from the verdict - which is
  the part that matters, because the verdict is recomputed by replaying the whole log on every
  report, so a log that still counted would write the terminating strikes straight back.
- **It recovers the result, not the remaining time.** The candidate's browser discarded its session
  when it was told the attempt was over, so there is no live test to resume. If they should get a
  full run, start a fresh attempt.
- **Read the coverage, not just the rung.** The response reports `answeredQuestions` against
  `totalQuestions`. An attempt cut short at question three still produces a level, and that level
  means nothing; the roster marks such attempts with `reinstated: 1` and the reviewer's note.

Reinstatement is one-shot per attempt: a second call returns 409, since by then the attempt is
submitted rather than terminated.

---

## Two things to settle before this ships

**1. The brand colours are inferred, not TestFort's.** `testfort.com` is unreachable from the
environment this was built in (egress policy blocked it, and so did the brand-asset fallbacks), so
the palette is a coherent, contrast-validated system built to TestFort's stated visual direction —
not its actual style guide. All six brand values sit in one clearly marked block at the top of
`apps/web/src/styles/tokens.css`; replacing them rethemes the whole application. Everything else in
the palette derives from them, and the contrast ratios in `docs/design-system.md` were computed, not
estimated — three colours were darkened specifically to pass WCAG AA.

**2. The product is in Ukrainian; a few things stay English on purpose.** The question bank, the
interface, the result report and the reviewer's variant document are all Ukrainian. Three things are
deliberately not translated: the nine ladder names (Trainee− … Senior) and the ISTQB certification
names, because those are what people actually say at the review; the English wording quoted inside
the *"Can read and understand test documentation"* and *"Creating defect reports (in English)"*
questions, because reading and writing English is the competency being measured there; and each
competency's `sheetRow` field, which keeps the original English spreadsheet row verbatim so any
result line can be mapped back to the source.

---

## Scope note

The estimated level is a **starting point for the Performance Review conversation, not a decision**.
Twenty questions cannot cover 60 competency rows; the result page says so, and names the specific
rows the paper actually touched.
