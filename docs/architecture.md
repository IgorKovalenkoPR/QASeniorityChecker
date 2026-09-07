# QA Seniority Checker — Architecture

**Status:** as-built, describes `main`.
**Audience:** whoever changes this next, including a future version of anyone who
worked on it.

## What this document is, and what it replaced

This file used to be a *build specification*: "Approved design baseline",
normative, written for an agent that had not yet written any code. That was the
right document to have at the time and the wrong one to keep. The repository was
built, then changed a dozen times, and the specification stayed still — so it
came to describe packages that do not exist (`packages/domain`, `packages/db`),
modules that were never written (`integrity/detectors.ts`,
`stateMachine.ts`), a test suite that was never adopted (property tests on
`fast-check`, Playwright E2E), and — worst of all — it assessed security risks
as *Low* on the strength of controls nobody had implemented.

A document that says "this risk is handled" about a control that does not exist
is worse than no document. It is now an as-built description. Where something
is planned rather than present, it says so in those words.

If you change behaviour, change this file in the same commit. The reason the
previous version drifted is that nothing forced them to move together.

---

## 1. What the product does

A tester signs in, answers 20 multiple-choice questions in 30 minutes, and gets
an indicative rung on the company Performance Review ladder — `Trainee−`
through `Senior`. The result is an input to a review conversation, not the
review.

Three properties make it more than a quiz:

- **The answer key never reaches the browser.** Scoring happens on the server,
  and the question bank is not in the client bundle at all.
- **The clock is the server's.** The deadline is fixed when the attempt starts;
  the client's countdown is decoration.
- **Papers differ, the shape does not.** 50 pre-generated papers, each built to
  the same tier quota, so two people who got different papers are still
  measured on one scale.

Scale it was built for: an internal tool, low tens of concurrent attempts,
single process, single SQLite file.

---

## 2. Repository layout

npm workspaces, TypeScript throughout, no build step for the API (it runs from
source through `tsx`).

```
packages/core/          domain logic, no I/O, no framework
  types.ts              Tier, Level, Question, LocalizedText, ScoreBreakdown
  blueprint.ts          the 4/6/6/4 tier quota; 20 questions, 50 papers
  competencies.ts       the 62 Performance Review rows, and their labels
  levels.ts             the 9-rung ladder and how a rung is awarded
  scoring.ts            answers -> tier percentages -> rung
  integrity.ts          the strike policy, shared by client and server
  variants.ts           deterministic paper generation
  rng.ts                seeded PRNG, so paper 17 is always paper 17
  index.ts

packages/content/       the question bank, and nothing else
  define.ts             the single choke point every question passes through
  bank.ts               structural validation of the loaded bank
  questions/*.ts        504 questions, Ukrainian
  questions/*.en.ts     their English side, keyed by question id
  index.ts

apps/api/               Fastify, SQLite via better-sqlite3, runs under tsx
  server.ts             app assembly, static SPA serving, entrypoint
  config.ts             environment, and the guards that refuse to start
  db.ts                 schema, pragmas, migrations
  attempts.ts           attempt lifecycle, scoring, integrity verdicts
  paper.ts              builds the candidate-visible paper; opaque option ids
  routes.ts             candidate and reviewer endpoints, error handling
  auth.ts               Google identity: verification and the domain rule
  authRoutes.ts         the OAuth flow and the session cookie
  sheets.ts             the spreadsheet row, and the Google transport
  sheetOutbox.ts        durable queue and flusher for that export
  scripts/export-variants.ts   regenerates docs/variants.md

apps/web/               React + Vite SPA, served by the API in production
  App.tsx               phases, session handling, proctor and queue wiring
  lib/api.ts            the HTTP client and its response types
  lib/i18n.tsx          every interface string, in both languages
  lib/proctor.ts        integrity detection in the browser
  lib/answerQueue.ts    durable-ish answer writes with retry
  screens/              SignIn, Start, Test, Result
  components/ui.tsx

scripts/
  check-bundle-leak.ts       greps the built bundle for the answer key
  translation-coverage.ts    how much of the bank has an English side
```

`packages/core` and `packages/content` are separate on purpose. See §3.

---

## 3. The invariants

These are the properties that took work to establish and are easy to break
without noticing. Each has a mechanism, because a documented invariant with no
mechanism is a wish.

### 3.1 The answer key never reaches the browser

`@qasc/content` is imported by the API and **never** by the SPA — it is not in
`apps/web/package.json`. `buildPaper` (`paper.ts`) constructs the
candidate-visible payload field by field rather than by omitting keys, so a new
field on `Question` cannot leak by default.

**Mechanism:** `npm run check:bundle` greps the *built artefact* — not the
source — for question ids and explanation fragments. It samples across the bank
and checks **both languages**; a guard that only knew about Ukrainian would have
quietly stopped covering half the bank when the translation landed. CI runs it.

One thing it does not cover: sourcemaps. `vite.config.ts` emits them and the
guard scans `*.js` only. The SPA contains no bank, so nothing leaks through
them today, but if the bank ever reached the client, sourcemaps would be a
second door.

### 3.2 The 50 papers are deterministic

`buildVariants` is seeded with the literal `'qasc-variants-v1'`. Paper 17 today
is paper 17 next year, which is what makes a stored `variant_number` enough to
reconstruct what someone was asked.

**Mechanism:** `npm run export:variants` regenerates `docs/variants.md`, and CI
fails if the file changes. Editing the bank changes that file — that is
expected and correct; the invariant is determinism, not immutability.

### 3.3 Every paper has the same shape

4 Trainee / 6 Junior / 6 Middle / 4 Senior, no repeats inside one paper.

**Mechanism:** `variants.ts` throws if a paper comes out the wrong size, and
`packages/content/test/bank.test.ts` asserts the quota and the usage spread
across all 50.

### 3.4 The ladder is the client's sheet, transcribed

The 9 rungs in `levels.ts` and their thresholds are a verbatim transcription of
row 4 of the Performance Review sheet. They are not tuned, and "improving" a
threshold silently changes what the tool measures.

The one change made to the ladder was **composition, not thresholds** — see
§5.2.

### 3.5 The bank is bilingual, and neither side is optional

`Question.text`, every option and every explanation are `LocalizedText` with
both `en` and `uk` required. An optional English side would have meant a paper
that silently serves Ukrainian to an English-speaking candidate.

**Mechanism:** the type. Plus `bank.test.ts` asserts no question is left
untranslated, no English side is a copy of the Ukrainian (excluding the 131
strings — SQL, HTML tags, defect statuses, ISTQB names — that are legitimately
identical), and no Cyrillic is left on the English side.

### 3.6 Certain things stay English on purpose

The rung names (`Trainee−` … `Senior`), ISTQB certification names, English text
quoted inside questions that test reading and writing English, and
`Competency.sheetRow` — which is the verbatim sheet row, kept for traceability
and now also used as the English competency label (§8.2).

---

## 4. Data model

SQLite, WAL, `foreign_keys = ON`. Schema in `db.ts`, created with
`CREATE TABLE IF NOT EXISTS` plus a small idempotent migration step keyed off
the real table shape — create-if-missing can add a table but never a column,
and by the time a column is needed there are rows to keep.

| Table | Holds |
| --- | --- |
| `attempts` | one row per attempt: candidate name and email, paper number, status, timings, strike count, termination reason, and the SHA-256 of the attempt token |
| `attempt_answers` | what was selected, per question, with a timestamp. Never whether it was right |
| `attempt_results` | the full `ScoreBreakdown` as JSON, written once at scoring time |
| `integrity_events` | every honesty event, with duration, whether the server inferred it, and whether a reviewer has forgiven it |
| `attempt_reinstatements` | one row per overturned termination: the reviewer's note, the previous reason and strike count |
| `sheet_exports` | the outbox for the spreadsheet export (§9) |

Two deliberate absences: there is no `questions` table and no `variants` table.
The bank and the 50 papers are deterministic code artefacts; persisting them
would create a second source of truth that could drift from the one scoring
uses.

`attempt_answers` storing selections but not correctness is the reason there is
no column an over-broad `SELECT` could leak.

**Backups.** WAL means `qasc.db-wal` and `qasc.db-shm` live beside the database.
Copying only `.db` gives an incomplete snapshot. There is no automated backup.

---

## 5. Scoring and the ladder

### 5.1 Tier percentages

`scoreAttempt` folds the answer sheet into a per-tier and per-competency
breakdown. A multi-select question requires an exact match. An unanswered
question is incorrect.

Granularity is coarse and worth remembering when reading a result: with 4
Trainee questions a single miss moves that tier by 25 points, and with 6 Junior
questions by 16.7.

### 5.2 How a rung is awarded

`resolveLevel` walks the rungs **upward** and stops at the first rule that
fails, awarding the rung below it. Requirements are therefore cumulative:
Senior demands the Middle, Junior and Trainee bars as well as its own.

This replaced taking the highest *individually* satisfied rule. Each sheet row
names only its own colour and at most the one below — the Senior row says
"red ≥ 50, and all Middle (yellow) items ≥ 75" and nothing about grey or green.
Read row by row in isolation, a paper scoring 0% on Trainee and 0% on Junior
was awarded **Senior**. No threshold changed to fix it; only their composition.

**This has teeth.** The lower tiers are now hard gates and they are short:

| Trainee score | Ceiling | | Junior score | Ceiling |
| --- | --- | --- | --- | --- |
| 0 / 4 | Trainee− | | 0–1 / 6 | Junior− |
| 1 / 4 | Trainee | | 2 / 6 | Junior |
| 2 / 4 | **Junior** | | 3–4 / 6 | **Junior+** |
| 3–4 / 4 | Senior | | 5–6 / 6 | Senior |

Two careless misses among the four Trainee questions cap an otherwise strong
candidate at Junior. Across all 1225 score combinations the blueprint can
produce, this reading moves 320 of them down at least one rung and none up.

That is correct for a ladder, and it puts real weight on the low-tier questions
being unambiguous. **When reading results, read the tier percentages, not the
rung name.** A strong tester capped by one or two low-tier misses points at a
bad question rather than a weak candidate.

**Mechanism:** `packages/core/test/scoring.test.ts` checks three properties
across every achievable score combination — the award is the rung below the
first failing rule, raising any tier never lowers the rung, and no rung is
stranded unreachable.

### 5.3 What the candidate is told

`describeGap` names what is missing for the next rung, in both languages, built
in one place because the same sentence goes onto the screen, into the stored
result and into the spreadsheet row. Because the award is the rung below the
first failure, the rung above it *is* the real obstacle — so the candidate is
told what stopped them rather than what some higher row happens to want.

---

## 6. Paper generation and option ids

Papers are generated at import time from the seed, not per attempt. An attempt
stores only its `variant_number`.

Option ids sent to the browser are **opaque**: `opaqueOptionId` HMACs
(attempt id, question id, option id) with `QASC_OPTION_SECRET`. Two
consequences:

- The same option has a different id in every attempt, so ids cannot be
  compared or shared between candidates.
- The secret must be **stable across deploys**. Rotating it invalidates the
  option ids of every paper in flight. The process refuses to start in
  production without it, precisely so that a random per-deploy value cannot
  quietly do that.

`resolveOptionIds` compares in constant time and silently drops ids it does not
recognise, returning only a count — there is no oracle for probing the option
space.

---

## 7. Identity and access

### 7.1 Candidates

`QASC_AUTH_MODE` selects between `google` and `open`.

**`google`** — ordinary OAuth authorization-code flow. The identity comes from
Google's ID token, verified against Google's own keys by `google-auth-library`;
`email_verified` must be true; the domain must be on
`QASC_ALLOWED_EMAIL_DOMAINS`. Anything in the request body is ignored — the
attempt is filed under the session, and there is a test that passes a different
address to prove it.

The session is a signed, HttpOnly, `SameSite=Lax` cookie holding the verified
email, display name and an expiry. `Lax` rather than `Strict` because the
browser arrives back on a top-level redirect from Google, and `Strict` would
withhold the cookie on exactly that navigation. There is no session table:
nothing needs revoking that outliving the cookie would endanger, and a table
would be a second source of truth for something Google already owns.

The OAuth `state` lives in its own signed cookie and is compared on return.
Without it, an attacker completes the flow in someone else's browser and the
victim's session becomes the attacker's account.

**`open`** — the historical behaviour: the candidate types a name and an email
that nobody verifies. It is the default outside production, which is what lets
the test suite and local development run with no Google project, and it is
**refused in production**.

### 7.2 Reviewers

A single shared bearer token, `QASC_ADMIN_TOKEN`. Admin endpoints return 503
until it is set, 401 without it. That is all the authorisation model there is —
no roles, no per-reviewer identity, no audit of who read what. Adequate for one
reviewer; state it plainly before it becomes several.

---

## 8. What the candidate sees, and in which language

### 8.1 Interface

English by default, with a two-button switch to Ukrainian. Every interface
string lives in `apps/web/src/lib/i18n.tsx` behind a typed key, so a missing
translation is a compile error rather than a sentence someone finds in
production. The choice persists in `localStorage` and sets
`document.documentElement.lang`.

The default is deliberately **not** taken from `navigator.language`: a
Ukrainian-configured browser in an English-speaking office is ordinary, and a
test that silently changes language between two candidates has changed the
instrument between two measurements.

### 8.2 Content

Both languages travel to the browser together and the browser picks. The
alternative — the client telling the server its locale — would make the paper
depend on a preference, so switching language mid-test would need a round trip
and could hand out a different paper. Two short strings per option is a cheap
price for making language a purely local choice.

Competency names in English are `Competency.sheetRow`, the verbatim row from
the Performance Review sheet, rather than a translation of the Ukrainian label.
A candidate reading the English result therefore sees the exact wording their
review will use. The coupling is deliberate and worth knowing: `sheetRow` is now
read by the UI as well as by the audit trail.

### 8.3 What the start screen deliberately does not say

Not how many questions are in the bank, not how many papers exist, not the tier
quota, and not which syllabi the questions come from. All of that reads as a
revision plan, and the test is meant to measure where someone is rather than
what they read the night before.

A card headed *What the test covers* used to sit there and is gone. It withheld
the syllabus list while still sketching the shape of the paper — "theory and
practice across the whole range of the role" — which is the worst of both: a
candidate could act on none of it, and it still read as a hint about what to
revise. The one sentence worth keeping, that there is nothing to prepare for,
now sits under the two facts in the hero, where it reassures without describing
anything.

---

## 9. Integrity subsystem

### 9.1 The governing principle

Terminating an honest attempt destroys the result **and** the candidate's trust
in the tool. A borderline blur that slips through costs, at most, a lookup on
one question out of twenty. The two failures are not symmetric, so the policy is
not symmetric either.

That principle was learned the hard way. An earlier policy failed an honest
candidate along three paths, and the start screen told them the opposite was
true.

On top of it sits a second rule, added when the budget was tightened to two:

> A strike may only be charged for an action the candidate took on purpose and
> can perceive themselves taking.

This is what makes a two-interruption budget defensible. It came from the
owner's report that termination felt *random*, and the complaint was correct.
The old budget of four was drawn on by a stray F12, a print shortcut, a
two-minute wifi drop and a reload as well as by a tab switch, so two candidates
who behaved identically could get different verdicts and neither could tell why.
Halving the budget while leaving that in place would have made luck the deciding
factor roughly half the time. So the two changes are one change: the count is
tighter, and everything that is a guess about intent or an event the candidate
cannot see was taken out of the count altogether.

### 9.2 As-built policy (`DEFAULT_INTEGRITY_POLICY`)

| | |
| --- | --- |
| Interruptions that end the attempt | 2 |
| An interruption shorter than this is free | 2 s |
| A single absence this long ends it outright | 30 s |
| Server-observed silence this long ends it | 5 min |

There used to be a fifth threshold, `heartbeatStrikeMs`, which charged one
strike for silence between two and five minutes. It is gone rather than retuned:
at a budget of two it could only do harm, and it was the clearest violation of
§9.1's second rule.

The budget is spent by three things, and only three — each of them deliberate
and visible to the person doing it:

| Weight 1 | |
| --- | --- |
| `visibility_hidden`, `window_blur` | leaving the page for longer than the grace window |
| `navigation_away` | closing or navigating away, which includes a reload |
| `duplicate_session` | opening the same attempt in a second tab or browser |

Two facts end an attempt on their own **without** touching the count: one
absence of 30 s or more, and server-observed silence of 5 minutes or more.
`strikeCost` checks those before it reads the weight table, which is what lets
an event be fatal while costing nothing towards the ordinary count — so "how
many interruptions do I have left" has one answer and does not quietly mean
something else.

Everything else is recorded for the reviewer and charged nothing:
`copy_attempt`, `paste_attempt`, `context_menu`, `print_attempt`,
`devtools_suspected`, shorter silences, and `fullscreen_exit` (which nothing
emits — the attempt never requests fullscreen).

Four specifics worth the words:

**A reload costs one interruption, not the attempt.** `pagehide` fires on F5, on
the back button and on browser crash recovery exactly as it does on a deliberate
exit, and the client cannot tell them apart at the moment it has to report. The
start screen tells the candidate the server-side timer survives a reload, so
ending the attempt on the first `pagehide` failed people for an action they had
been told was allowed. At a budget of two, though, a reload is now half of it,
and the start screen says so in as many words rather than "there is no reason to
do it".

**Server-observed silence never costs a strike.** A heartbeat gap is recorded as
`heartbeat_gap`, not as a hidden tab. Filing it as `visibility_hidden` carrying
the whole gap as its duration meant every gap past the grace window was
automatically past the hard-terminate threshold — three missed pings ended a
test. It is now scored on one rule with nothing in between: five minutes of
silence is final, and anything less is free. Nobody reported it, the candidate
cannot see it happening, and the same sixty seconds is produced by a cheating
candidate and by a reconnecting VPN.

**Guesses about intent are not evidence.** F12 does not prove devtools opened
(the keypress is all the browser will tell us), Ctrl+P is prevented before it
prints, and highlighting a question is what reading looks like. Under the old
weights a stray keypress was worth a quarter of an attempt; under a budget of
two it would have been half.

**A second tab costs one interruption, not two.** It used to be double-weighted,
which at a budget of two would have made the first detection final — and the
`BroadcastChannel` handshake that detects it can misfire, so instant termination
on a single detection is more confidence than the mechanism has earned.

### 9.3 Client and server

`packages/core/src/integrity.ts` is shared. The client uses it to render the
right warning immediately; the server uses it to decide. **The client's verdict
is advisory; only the server's is binding.**

**The client reports episodes, never raw browser events.** This is the other
half of the fix for "it feels random", and it lives in
`apps/web/src/lib/proctor.ts`. The browser does not emit one event per human
action: a single tab switch fires `blur` *and* `visibilitychange` in an
engine-specific order, coming back fires `focus` and `visibilitychange` in
either order, and alt-tab, native dialogs and monitor switches emit
blur/focus/blur clusters milliseconds apart. Reported raw, the identical action
cost one candidate one strike and another two.

So an *absence episode* opens on the first signal, absorbs every further signal,
and closes only once the document has been visible again for one uninterrupted
second. It reports one event, whose duration is the time actually spent away
(time briefly back is excluded) and whose type is decided by what was true
during the episode — `visibility_hidden` if the document was ever hidden,
`window_blur` if it only lost focus — rather than by whichever return event won
the race. Three smaller holes closed with it: an episode still open at
`pagehide` is now reported instead of being dropped (so switching tab and then
closing the tab used to lose the *longest* absences), an attempt that starts
while the document is already hidden opens an episode immediately (no
`visibilitychange` will fire until the candidate comes back), and the
duplicate-tab handshake now counts each peer page once by id and stops answering
on a real unload, so a reload no longer lets the outgoing page report a second
session against its own replacement. `apps/web/test/proctor.test.ts` pins all of
this against a hand-built DOM, in both event orders.

**The reason is bilingual, and stored in one language.** `IntegrityVerdict.reason`
is a `LocalizedText`, composed once in `integrity.ts`, so the candidate reads
the cause in their own language at the moment the attempt ends. The
`attempts.termination_reason` column stores the English side only: it is the
reviewer's record and the source of the spreadsheet cell. A candidate who
reloads a terminated attempt therefore sees the general localised sentence
rather than the specific cause — the trade for not adding a code column and a
migration, and the specific cause was on screen when it happened.

`applyIntegrityVerdict` replays the *whole* stored event log on every report
rather than incrementing a counter. A retried beacon, a duplicated request or an
out-of-order delivery all converge on the same verdict, and the unique
constraint on `(attempt, type, occurred_at)` absorbs the duplicate itself.

The client reports over `fetch`, and on `pagehide` over `navigator.sendBeacon` —
which cannot set an `Authorization` header, so the token travels in the query
string for that one call. The alternative is no evidence at all. Note that
Fastify logs `req.url` at info level, so those tokens reach the container log;
they are single-attempt and short-lived, but it is a real property of the
system rather than an oversight.

### 9.4 Overturning a termination

The proctor can be wrong, and being wrong used to be final: a terminated
attempt is never scored, so it had no result row, and even the reviewer's own
result endpoint returned 404 for it. The answers were never lost — they sit in
`attempt_answers` whatever the status — but no endpoint could reach them.

`POST /api/admin/attempts/:id/reinstate` takes a required `note`, forgives the
attempt's honesty events, scores the answers as they stand, and returns the full
reviewer result.

Clearing the status alone would not work: the verdict is recomputed by replaying
the whole log, and the integrity route accepts reports whatever the status, so an
attempt whose log still counted would have its terminating strikes written
straight back. The events are therefore marked `forgiven` — excluded from the
verdict, still present in the table and still returned by the integrity
endpoint. Forgiven, not deleted.

Two limits, by design: it recovers the **result**, not the remaining time (the
candidate's browser discarded its session when it was told the attempt was
over), and it reports `answeredQuestions` against `totalQuestions` because a
paper cut short at question three still produces a rung, and that rung means
nothing.

### 9.5 Answer writes

Selecting an answer is optimistic in the UI, which is only honest because
`answerQueue.ts` makes it so: a transport failure is retried with backoff for as
long as the attempt is live, the latest selection wins (sends are serialised and
sequence-tagged, so a retry cannot resurrect a choice the candidate has since
changed), and a 4xx stops the queue rather than spinning against a terminated
attempt. Submission flushes the queue first and refuses to submit if it cannot
drain — grading an answer the candidate gave but that never arrived is the
silent data loss the queue exists to prevent.

---

## 10. API surface

Candidate endpoints authenticate with the attempt token (`Authorization:
Bearer`); reviewer endpoints with `QASC_ADMIN_TOKEN`.

```
GET    /api/health                          liveness; also reports bank size
GET    /api/meta                            auth mode, allowed domains, policy, ladder

GET    /api/auth/me                         the signed-in identity, or 401
GET    /api/auth/google/start               302 to Google, sets the state cookie
GET    /api/auth/google/callback            exchanges the code, sets the session
POST   /api/auth/logout                     clears the session cookie

POST   /api/attempts                        starts an attempt, returns the paper + token
GET    /api/attempts/:id                    resume: attempt view, paper, saved answers
PUT    /api/attempts/:id/answers            save one answer
POST   /api/attempts/:id/heartbeat          liveness; silence becomes an event
POST   /api/attempts/:id/integrity          report events; returns the verdict
POST   /api/attempts/:id/submit             score and return the result
GET    /api/attempts/:id/result             the stored result

GET    /api/admin/attempts                  roster, newest first, with the rung
GET    /api/admin/attempts/:id/result       per-question detail, answers, explanations
GET    /api/admin/attempts/:id/integrity    the event log, plus any reinstatement
POST   /api/admin/attempts/:id/reinstate    overturn a termination and score it
GET    /api/admin/bank                      bank statistics and paper composition
GET    /api/admin/sheet-exports             is the export configured, and is it working
POST   /api/admin/sheet-exports/flush       drain the outbox now
```

Contracts worth knowing:

- `PUT .../answers` echoes only the **count** of options it understood.
  Confirming *which* would let a client probe the option space one id at a time.
- The candidate's result carries the answer key only when
  `QASC_REVEAL_ANSWERS_TO_CANDIDATE` is on, and it is off by default. With it
  on, anyone holding the link could start an attempt, submit it untouched, read
  twenty correct answers and start again — the paper counter round-robins, so
  each pass returns a fresh paper. `answersRevealed` on the response says which
  mode produced it.
- `authorizeAttempt` expires an overdue attempt *inside* the authorisation step,
  so no route can forget to check the clock.
- Errors: `AttemptError` and `AuthError` carry their own status and a stable
  code. A framework rejection with a 4xx status passes through as
  `invalid_request` and is logged at warn; anything else is a 500 with a generic
  message. Collapsing framework 4xx into 500 used to tell a caller the server
  had broken when their request had.
- Rate limit: 600 requests per minute, disabled in tests. `trustProxy` is on
  unconditionally, which is right behind Render and means a directly-exposed
  container would accept a forged `X-Forwarded-For`.

---

## 11. Results out: the spreadsheet export

A scored attempt is appended to a Google Spreadsheet as one flat row, one column
per number, the way a Google Form fills a sheet.

This changes what the database is for. If the sheet holds the results, SQLite
only has to survive the half hour of an attempt in progress — which is the
difference between needing a paid persistent disk and not.

Which makes a lost row unacceptable, so nothing appends inline from a request
handler. Scoring writes to the `sheet_exports` outbox; a flusher drains it every
`QASC_SHEET_FLUSH_SECONDS`. Three properties:

- **Rows are queued whether or not credentials are configured.** Bringing the
  URL up before the service account exists loses nothing: setting the
  credentials later drains everything queued since the first attempt.
- **A row is marked sent only once Google has acknowledged the batch**, so a
  crash mid-flush retries rather than skips.
- **One row per attempt.** Re-scoring after a reinstatement replaces the queued
  row rather than adding a second.

A transport failure or 5xx retries indefinitely; a 4xx does not. A wrong
spreadsheet id, or the easy-to-miss step of not sharing the sheet with the
service account, is a 403 — retrying that forever would hide the
misconfiguration behind a queue that only grows.

The row carries the per-tier percentages next to the rung, and the reinstatement
flag. Both for the same reason: the rung alone is the wrong thing to read (§5.2),
and an overturned termination is not a clean run.

**The export is the one part of the system whose failure is invisible from
outside** — every attempt looks fine and the sheet quietly stops growing. Hence
`GET /api/admin/sheet-exports`.

The flusher starts in the entrypoint rather than in `buildApp`, so the test
suite does not acquire a background timer per app it builds, and its interval is
`unref`'d so a pending export can never be why a container refuses to exit.

---

## 12. Configuration

| Variable | Default | Notes |
| --- | --- | --- |
| `PORT`, `HOST` | `3000`, `0.0.0.0` | |
| `QASC_DB` | `data/qasc.db` | absolute in the container, so it lands on the volume |
| `QASC_ATTEMPT_SECONDS` | `1800` | |
| `QASC_HEARTBEAT_SECONDS` | `15` | client ping period |
| `QASC_HEARTBEAT_GRACE_SECONDS` | `120` | silence tolerated before it becomes an event |
| `QASC_OPTION_SECRET` | *random in dev* | **required in production**, ≥ 32 chars, must be stable |
| `QASC_SESSION_SECRET` | *random in dev* | **required in production**, ≥ 32 chars |
| `QASC_SESSION_TTL_SECONDS` | `43200` | 12 hours |
| `QASC_AUTH_MODE` | `google` in production, `open` otherwise | |
| `QASC_ALLOWED_EMAIL_DOMAINS` | *unset* | **required** in `google` mode |
| `QASC_GOOGLE_CLIENT_ID` / `_SECRET` | *unset* | **required** in `google` mode |
| `QASC_PUBLIC_URL` | *derived from the request* | absolute origin, scheme included, no path |
| `QASC_ADMIN_TOKEN` | *unset* | admin endpoints 503 until set |
| `QASC_REVEAL_ANSWERS_TO_CANDIDATE` | `false` | whether the candidate's result carries the key |
| `QASC_SHEET_ID`, `QASC_SHEET_TAB` | *unset*, `Attempts` | unset = queue but do not send |
| `QASC_GOOGLE_SERVICE_ACCOUNT_JSON` | *unset* | the whole key JSON |
| `QASC_SHEET_FLUSH_SECONDS` | `30` | |
| `QASC_CORS_ORIGIN` | `http://localhost:5173` | irrelevant when the API serves the SPA |

### 12.1 The process refuses to start rather than run half-open

Each of these is a state in which the tool would mis-attribute results or leak
the bank, so it exits instead of serving. This is the most useful thing in this
document if you are deploying.

| Condition | Why it is fatal |
| --- | --- |
| production without `QASC_OPTION_SECRET` | a random one per deploy invalidates every paper in flight |
| production without `QASC_SESSION_SECRET` | a random one per deploy signs everyone out on every deploy |
| `google` mode with no allowed domains | Google sign-in with no allow-list admits every Google account there is |
| `google` mode with no client id or secret | there is no sign-in to perform |
| `QASC_AUTH_MODE=open` in production | anyone could start an attempt under any address |
| `QASC_PUBLIC_URL` without a scheme, with a path, or plain http in production | produces a redirect URI Google cannot match, and the failure would only appear when a person clicks "sign in" |

The last one is there because it happened: a bare hostname produced
`host/api/auth/google/callback` as the redirect URI — not a URL at all — and the
service started, answered every endpoint, and failed only in front of the first
candidate.

---

## 13. Tests

`npm test` runs Vitest over 10 files. Node environment throughout; there is no
jsdom, no `fast-check`, and no Playwright — the previous version of this document
described all three, and none was ever adopted. Where a test needs a DOM it
builds the four objects it actually touches, which doubles as documentation of
that surface.

| File | Covers |
| --- | --- |
| `packages/core/test/scoring.test.ts` | tier folding, the ladder's three properties over every achievable score, gap text in both languages |
| `packages/core/test/integrity.test.ts` | the strike policy, including the reload and silence cases as named regressions, and the invariant that a zero-weight event can never end an attempt |
| `packages/content/test/bank.test.ts` | bank structure, quota, paper spread, translation completeness |
| `apps/api/test/api.test.ts` | the candidate lifecycle end to end over a real Fastify and in-memory SQLite, the answer-key gating, the integrity paths, the reviewer endpoints, reinstatement, malformed requests |
| `apps/api/test/auth.test.ts` | who is admitted, the OAuth flow with an injected exchange, the state check, the config guards |
| `apps/api/test/sheets.test.ts` | the row shape, the outbox state machine, queue-before-credentials |
| `apps/api/test/migrate.test.ts` | opening a database written by an older build |
| `apps/web/test/answerQueue.test.ts` | the retry policy, latest-wins, flush deadlines |
| `apps/web/test/proctor.test.ts` | one action = one reported event in both event orders, episode coalescing, the `pagehide` and already-hidden paths, the duplicate-tab handshake |
| `apps/web/test/i18n.test.ts` | the dictionary — no empties, no Cyrillic on the English side, matching placeholders — walked from the exported key list rather than a hand-copied one, which had stopped covering keys added after it was written |

Beyond the suite, three checks run separately and belong in CI:
`npm run typecheck`, `npm run check:bundle` (needs a build first) and
`npm run export:variants` with a diff.

One CI-specific trap, since it has already cost a red build: **the runner is on a
much newer Node than the development machine** (24 against 20.4 at the time of
writing), and the globals differ. `navigator` does not exist at all on Node 20
and is a getter-only accessor on Node 24, so a test that assigns to it passes
locally and throws in CI — modules are strict mode, where writing to an accessor
without a setter is an error rather than a silent no-op. Anything that stands a
global in for a browser object has to use `Object.defineProperty`.

What is **not** covered automatically: anything requiring a real browser, a real
Google account, or a real Docker daemon. Those were exercised by hand — the
sign-in redirect, the language switch mid-test, the container build — and the
absence of automation for them is a real gap, not an oversight.

---

## 14. Deployment

Single container, or a Node service built from the repo. `compose.yaml` and the
`Dockerfile` describe the container; Render is the host it is deployed to.

The image is multi-stage: build tools in the builder for `better-sqlite3`'s
native addon, `npm prune --omit=dev` before the runtime stage copies `/app`
wholesale. The runtime `CMD` is `npm run start -w @qasc/api` and **not** the root
`npm start`, because the root script rebuilds the SPA and `vite` has been pruned.

Three things learned by deploying it:

- `npm prune --omit=dev` keeps the workspace symlinks. It was the prime suspect
  for a green build with a dead container; it is not the problem.
- `better-sqlite3` finds a prebuilt binary for `node:22-bookworm-slim`, so the
  runtime stage needs no compiler.
- On Render's free plan the disk is **ephemeral** and the instance spins down
  when idle. The database — including the export outbox — lives only as long as
  the container. Configure the spreadsheet export before relying on results
  surviving, or pay for a disk.

There is no graceful shutdown handler; `PID 1` is npm, so `SIGTERM` does not
reach Node reliably and `docker stop` waits out its timeout. WAL survives it.

---

## 15. Deliberately not built

Naming these matters, because the previous version of this document assessed
risks as handled on the strength of some of them.

- **No per-candidate authorisation beyond the domain check.** Anyone with a work
  account can start an attempt, as many times as they like. There is no
  "one attempt per person", no cooldown, no invite codes. The intended shape if
  this becomes a problem is one-time invite codes, which would also carry a
  cohort label.
- **No reviewer identity.** One shared token (§7.2).
- **No fullscreen enforcement**, no client fingerprinting, no
  `clientSeq` gap analysis.
- **No CSP and no `@fastify/helmet`.**
- **No automated backups.**
- **No per-candidate paper assembly.** 50 fixed papers; at 1000 slots over 504
  questions, repetition is 1–3, which is enough until hundreds of people take
  it.
- **No admin UI.** The reviewer endpoints return JSON.

---

## 16. Known gaps, in the order they would bite

1. **The tool has never been used by a candidate.** Whether the sheet's
   thresholds produce a meaningful rung on real people is the one thing no test
   here can answer, and §5.2 made the low tiers matter more than before.
2. **The English bank is a first pass.** It was translated with a detailed brief
   and cross-checked for terminology, but not reviewed by someone who knows both
   the subject and both languages. The Trainee and Junior sets are the ones to
   read first: their wording is shortest and therefore most sensitive to nuance.
3. **The export outbox is only as durable as the container** on the current
   plan (§14).
4. **Five dev-dependency advisories** (vite/vitest) remain; clearing them needs
   `vitest@5`, a major bump. They are pruned from the runtime image and
   `npm audit --omit=dev` is clean.
5. **Two interruptions is a judgement call nobody has field-tested.** §9.1's
   second rule makes it defensible in principle, and the reinstatement path
   (§9.4) is the remedy when it is wrong — but that remedy is now load-bearing
   rather than a nicety, and it only works if a reviewer is actually willing to
   press it. The first pilot should count how often it gets pressed.
6. **Ukrainian has no plural forms in the dictionary.** Counts are interpolated
   into strings that read correctly at some values and not others
   (`{n} питань` is right at 20 and wrong at 21). The rules copy avoids the trap
   by putting the numeral where no declined noun follows it, but five other
   strings still have it, and fixing them properly means a plural rule rather
   than a rewording.
7. **Attempt tokens reach the container log** through the beacon query string
   (§9.3).
8. **No graceful shutdown** (§14).
