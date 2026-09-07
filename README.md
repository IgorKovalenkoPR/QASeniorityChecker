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
| `QASC_AUTH_MODE` | `google` in production, `open` otherwise | How candidates identify themselves |
| `QASC_ALLOWED_EMAIL_DOMAINS` | *unset* | **Required** in `google` mode, e.g. `qarea.com,testfort.com` |
| `QASC_GOOGLE_CLIENT_ID` | *unset* | **Required** in `google` mode |
| `QASC_GOOGLE_CLIENT_SECRET` | *unset* | **Required** in `google` mode |
| `QASC_SESSION_SECRET` | *generated in dev* | **Required in production**, >= 32 chars |
| `QASC_SESSION_TTL_SECONDS` | `43200` | How long a sign-in lasts (12 h) |
| `QASC_PUBLIC_URL` | *derived from the request* | Absolute origin, scheme included, no path. https in production |
| `QASC_SHEET_ID` | *unset* | Spreadsheet to append results to. Unset = queue but do not send |
| `QASC_SHEET_TAB` | `Attempts` | Tab name. Must already exist |
| `QASC_GOOGLE_SERVICE_ACCOUNT_JSON` | *unset* | The service account key, whole JSON blob |
| `QASC_SHEET_FLUSH_SECONDS` | `30` | How often the outbox is drained |

`QASC_OPTION_SECRET` must be stable for the lifetime of an attempt: rotating it mid-test invalidates
the option ids of every paper in flight. The process refuses to start in production without it.

### Signing in

Candidates identify themselves with Google, restricted to an allow-list of email domains.
Before this, the email was a text field validated for shape and nothing else - anyone could type
anyone's address and the result was filed under whatever they typed. That is tolerable for a link
handed to three people you trust and useless once the test has a public URL.

Three properties, each of which is a way the field version was wrong:

- The identity comes from Google's ID token, verified against Google's own keys, never from
  anything the browser sent. Passing a `candidateEmail` in the request body is ignored.
- `email_verified` must be true. A Google account can carry an address it never proved it owns,
  and an unverified address is exactly as good as a typed one.
- The domain must be on the allow-list. This is the control that keeps a public URL from handing
  the 504-question bank to the internet, so the process **refuses to start** without it rather
  than defaulting to "any Google account".

#### What to create in Google Cloud

1. In the Google Cloud console, pick or create a project, then **APIs & Services -> Credentials
   -> Create credentials -> OAuth client ID**, application type **Web application**.
2. Under **Authorised redirect URIs** add exactly one entry, matching your deployment:

```
https://<your-host>/api/auth/google/callback
```

   Google compares this byte for byte. If you also want to run it locally, add
   `http://localhost:3000/api/auth/google/callback` as a second entry.

   Set `QASC_PUBLIC_URL` to the same origin - **including** `https://` and nothing after the
   host. It is validated at startup, because a bare hostname there produces
   `host/api/auth/google/callback` as the redirect URI: not a URL at all, and the only place
   that shows up is a Google error page in front of a candidate.
3. Copy the client ID and client secret into `QASC_GOOGLE_CLIENT_ID` and
   `QASC_GOOGLE_CLIENT_SECRET`.
4. Set `QASC_ALLOWED_EMAIL_DOMAINS` to your work domains, comma-separated.
5. Generate the two secrets once and keep them - rotating either is disruptive rather than
   dangerous, but it is disruptive in the middle of somebody's test:

```bash
echo "QASC_OPTION_SECRET=$(openssl rand -hex 32)"  >> .env   # invalidates in-flight papers
echo "QASC_SESSION_SECRET=$(openssl rand -hex 32)" >> .env   # signs out everyone
```

No consent screen verification is needed while the client is restricted to accounts in your own
Workspace organisation.

#### The configuration refuses to start rather than run half-open

Each of these is a state in which the test would either mis-attribute results or leak the bank,
so the process exits instead of serving:

| Condition | Why it is fatal |
| --- | --- |
| `google` mode with no `QASC_ALLOWED_EMAIL_DOMAINS` | Google sign-in with no allow-list admits every Google account there is |
| `google` mode with no client ID or secret | There is no sign-in to perform |
| `QASC_AUTH_MODE=open` with `NODE_ENV=production` | Anyone could start an attempt under any address |
| `NODE_ENV=production` with no `QASC_SESSION_SECRET` | A random one per deploy signs everyone out on every deploy |
| `NODE_ENV=production` with no `QASC_OPTION_SECRET` | A random one per deploy invalidates every paper in flight |
| `QASC_PUBLIC_URL` without a scheme, with a path, or plain http in production | Produces a redirect URI Google cannot match, and the failure would only appear when a person clicks "sign in" |

`QASC_AUTH_MODE=open` keeps the old typed name and email. It is the default outside
production, which is what makes local development and the test suite work without a Google
project, and it is refused in production.

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

### Results in a Google Spreadsheet

A scored attempt is appended to a spreadsheet as one row, the way a Google Form fills a sheet.
This also changes what the database is for: if the sheet holds the results, SQLite only has to
survive the half hour of an attempt in progress, which is the difference between needing a paid
persistent disk and not.

That makes a lost row unacceptable, so nothing appends inline from a request handler. Scoring
writes to a `sheet_exports` outbox table and a flusher drains it every
`QASC_SHEET_FLUSH_SECONDS`. Three properties follow:

- **Rows are queued whether or not credentials are configured.** Bringing the URL up before the
  service account exists loses nothing: setting `QASC_SHEET_ID` and
  `QASC_GOOGLE_SERVICE_ACCOUNT_JSON` later drains everything queued since the first attempt.
- **A row is marked sent only once Google has acknowledged it**, so a crash mid-flush retries
  rather than skips, and a failed batch is never recorded as sent.
- **One row per attempt.** Re-scoring after a reinstatement replaces the queued row instead of
  adding a second one, so nobody appears twice.

A transport failure or a 5xx is retried indefinitely. A 4xx is not: a wrong spreadsheet id, or a
sheet nobody shared with the service account, would otherwise hide behind a queue that only
grows. The row stays queued and its `last_error` says it will not be retried.

#### What to create

1. In the Google Cloud console, **IAM & Admin -> Service Accounts -> Create service account**. No
   roles are needed - the access comes from sharing the sheet, not from a project role.
2. On that account, **Keys -> Add key -> Create new key -> JSON**. Download it.
3. Enable the **Google Sheets API** for the project (**APIs & Services -> Library**).
4. Create the spreadsheet, and add a tab named `Attempts` (or set
   `QASC_SHEET_TAB`). Leave it empty: the first export writes the header row itself.
5. **Share the spreadsheet with the service account's email** (the `client_email` in the
   JSON, ending `.iam.gserviceaccount.com`) as an **Editor**. This is the step that is easy
   to miss and it produces a 403 that the export deliberately does not retry.
6. Set `QASC_SHEET_ID` to the long id from the spreadsheet URL, and paste the whole JSON
   file into `QASC_GOOGLE_SERVICE_ACCOUNT_JSON`.

#### Checking that it is working

The export is the one part of the system whose failure is invisible from the outside: every
attempt looks fine and the sheet quietly stops growing. So it reports on itself:

```
GET  /api/admin/sheet-exports         # configured?, counts, and the rows that are failing
POST /api/admin/sheet-exports/flush   # drain now instead of waiting for the next tick
```

The columns are one per number rather than a blob per attempt, so the sheet can be sorted and
pivoted without parsing a cell. It carries the per-tier percentages alongside the rung on
purpose: the ladder is cumulative and a single low-tier miss caps the result, so the tiers are
what tell you whether a rung means what it looks like.

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

## One thing to settle before this ships

**The palette is TestFort's own, read from the live site.** The six brand values sit in one clearly
marked block at the top of `apps/web/src/styles/tokens.css`, and they are no longer inferred:
`testfort.com` declares them outright in the CSS it serves (`--color-black #111111`,
`--color-grey #464646`, `--color-light #E6EEF3`, `--color-red #FF3333`, and `--color-yellow #FF865C`,
which is named "yellow" but is in fact the brand coral). The same stylesheet shows what the brand
does with them: `.btn` is `#111111` with a white 18px/500 label and `border-radius: 200px`, while
`.btn.orange` swaps in a coral gradient. So the primary call to action is black and the coral is an
accent, which is how `--brand-primary` is mapped.

One measured constraint shapes the rest: `#FF865C` on white is **2.38:1**, which fails WCAG AA both
as text and as a fill under white text, while `#111111` on that same coral is **7.93:1**. The coral
is therefore a fill-only colour carried under near-black text, and the two jobs that genuinely need
a coral passing AA — accent-as-text and the focus ring — use `#B84520` (**5.37:1** on white). Every
ratio in `docs/design-system.md` §9 is computed rather than estimated, and it records which colours
were darkened and why.

What is still open is the **typeface**. TestFort sets Poppins; this app is on Inter. Poppins is not
a system face, so it needs self-hosting, and its digits are not tabular — the timer and the score
counters would jitter without an explicit `font-variant-numeric: tabular-nums` and an audit of the
numeric blocks. The suggestion on the table is Poppins for `--font-display` only, keeping Inter for
UI and body text, but nothing has been changed pending that decision.

**The product is in Ukrainian; a few things stay English on purpose.** The question bank, the
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

### The ladder is cumulative, and that has teeth

Each row of the sheet names only its own colour and, at most, the one below - the Senior row says
"red >= 50, and all Middle (yellow) items >= 75" and nothing about grey or green. Read row by row
in isolation, that let a paper scoring 0% on Trainee and 0% on Junior be awarded **Senior** purely
on its Middle and Senior answers. `resolveLevel` therefore walks the rungs upwards and stops at
the first one that fails, so every rung carries the requirements of all the rungs beneath it. No
threshold was changed to do this; the sheet's numbers are still the sheet's numbers.

The consequence is worth knowing before you read pilot results, because the lower tiers are now
hard gates and they are short:

| Trainee score | Highest rung reachable | Junior score | Highest rung reachable |
| --- | --- | --- | --- |
| 0 / 4 | Trainee&minus; | 0-1 / 6 | Junior&minus; |
| 1 / 4 | Trainee | 2 / 6 | Junior |
| 2 / 4 | **Junior** | 3-4 / 6 | **Junior+** |
| 3-4 / 4 | Senior | 5-6 / 6 | Senior |

So two careless misses among the four Trainee questions cap an otherwise strong candidate at
Junior, whatever they scored above. Across all 1225 score combinations the 4/6/6/4 blueprint can
produce, this reading moves 320 of them (26%) down at least one rung, and none up.

That is the correct behaviour for a ladder, but it puts real weight on the Trainee and Junior
questions being unambiguous. **During the pilot, watch specifically for a strong tester capped by
one or two low-tier misses** - that points at a bad question rather than a weak candidate, and the
result page's "next rung" line names the exact tier and threshold that blocked them.
