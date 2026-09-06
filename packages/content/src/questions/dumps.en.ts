import type { TranslationMap } from '../define.js';

/**
 * English side of the practice-dump sets (trainee / junior / middle).
 *
 * One map per `defineQuestions` call in `dumps.ts`: the definition rejects a
 * translation keyed to an id it does not contain, so the three maps stay
 * separate rather than merged into one.
 *
 * Rules, as in `senior-istqb-ctal-ta.en.ts`:
 *
 *   - Standard English testing terminology, not a literal rendering of the
 *     Ukrainian.
 *   - Option order is untouched. Correctness is stored as an index, so
 *     reordering options here would silently change the answer key.
 *   - A distractor stays wrong for the same reason it was wrong in Ukrainian.
 *   - English that was already English in the Ukrainian source (SQL, HTTP
 *     verbs, shell pipelines, defect-report field names) is carried over
 *     verbatim.
 *   - Explanations keep their point and stay over 40 characters, which the
 *     bank test enforces in both languages.
 */
export const dumpTraineeEn: TranslationMap = {
  'DP-T-001': {
    text: 'A password field accepts between 8 and 16 characters. Which set of lengths gives the best boundary coverage?',
    options: ['7, 8, 16, 17', '8, 12, 16', '1, 8, 16, 100', '0, 8, 16'],
    explanation:
      'Each boundary is paired with its nearest invalid neighbour. 12 adds nothing that 8 and 16 do not already represent.',
  },
  'DP-T-002': {
    text: 'The build arrives at 5 p.m. and the release is tomorrow. Which testing do you run first?',
    options: [
      'Smoke tests over the critical paths',
      'The full regression suite',
      'Usability testing',
      'Performance testing',
    ],
    explanation:
      'The first question is whether the build is viable at all. Everything else is wasted effort if it is not.',
  },
  'DP-T-003': {
    text: 'The "Buy" button is invisible only in Safari on iPhone. Classify it:',
    options: [
      'High severity, high priority',
      'Low severity, low priority',
      'High severity, low priority',
      'Low severity, high priority',
    ],
    explanation:
      'The revenue path plus a large browser share: both the impact and the urgency are high.',
  },
  'DP-T-004': {
    text: 'A user complains of being logged out every time the browser closes, even though "remember me" was ticked. The most likely cause is:',
    options: [
      'The session cookie has no expiry, so it is dropped when the browser closes',
      'The wrong password',
      'The server is unreachable',
      'JavaScript is disabled',
    ],
    explanation:
      'A cookie with no Expires or Max-Age is by definition a session cookie, which is exactly the symptom described.',
  },
  'DP-T-005': {
    text: 'Which is the best expected result for a login test?',
    options: [
      'The user is redirected to /dashboard and their name is shown in the header',
      'Login works',
      'There are no errors',
      'The page loads',
    ],
    explanation:
      'A verifiable observable outcome. "Works" cannot be failed by anyone except the person who wrote the wording.',
  },
  'DP-T-006': {
    text: 'You raised a defect yesterday. Today the build has changed, the defect no longer reproduces, and nothing in the change log is related. You should:',
    options: [
      'Retest carefully and record the observation in the ticket rather than closing it silently',
      'Close it as not reproducible',
      'Delete the ticket',
      'Raise its priority',
    ],
    explanation:
      'A defect that disappears with no known fix usually means the trigger conditions changed, not that the defect is gone.',
  },
  'DP-T-007': {
    text: 'An element is visible, but clicking it does nothing. Which front-end cause do you check first?',
    options: [
      'Another element overlaps it and receives the click instead',
      'The wrong colour in the CSS',
      'A font failed to load',
      'A missing page title',
    ],
    explanation:
      'A transparent overlay or a displaced modal backdrop is the classic cause, and the element inspector confirms it in seconds.',
  },
  'DP-T-008': {
    text: 'Which is the best example of negative testing?',
    options: [
      'Submitting a form with "abc" in the email field',
      'Submitting a valid form',
      'Measuring how long submission takes',
      'Checking the colour of the button',
    ],
    explanation:
      'Negative testing supplies input the system is meant to reject, and checks that it rejects it correctly.',
  },
  'DP-T-009': {
    text: 'A test case has 12 steps and fails at step 3. You should:',
    options: [
      'Record the failure with evidence at step 3 and raise a defect',
      'Carry on to step 12 and only then report it',
      'Mark the whole case as blocked',
      'Skip to the last step',
    ],
    explanation:
      'The verdict is Failed at step 3. Whether to continue is a judgement call; the report must state where it failed.',
  },
  'DP-T-010': {
    text: 'The app works on Android 14 but crashes on Android 9. The report must include:',
    options: [
      'OS versions, devices, and the crash log or stack trace',
      'Only a description of the crash',
      'Only the model of the Android 9 device',
      'Only a screenshot',
    ],
    explanation:
      'Version-specific crashes are usually API-level defects, and the stack trace is what points at the specific call.',
  },
  'DP-T-011': {
    text: 'A dropdown has 5 options and a text field accepts 3 valid formats. The minimum number of tests to cover every value at least once is:',
    options: ['5', '15', '8', '3'],
    explanation:
      'Covering every value of every parameter at least once takes max(5, 3) = 5 tests, pairing the values up. 15 is full combinatorial coverage.',
  },
  'DP-T-012': {
    text: 'Which statement belongs in the "Steps to reproduce" section?',
    options: [
      '1. Open /cart with 2 items. 2. Apply code SAVE10. 3. Click Checkout.',
      'The total is wrong',
      'This is a regression from build 42',
      'Severity: Major',
    ],
    explanation:
      'Steps are numbered actions only. Observations, history and metadata each have their own field.',
  },
  'DP-T-013': {
    text: 'A page shows stale content after a deployment. What do you check first?',
    options: [
      'A hard refresh, and whether the assets are being served from cache',
      'Reinstalling the browser',
      'Raising a back-end defect',
      'Clearing the database',
    ],
    explanation:
      'Cache is by far the most likely cause, and it takes ten seconds to rule out.',
  },
  'DP-T-014': {
    text: 'Which check belongs to compatibility testing?',
    options: [
      'The same scenario in Chrome, Firefox and Safari at three window widths',
      'Response time under 500 concurrent users',
      'Checking password complexity',
      'Database backup and restore',
    ],
    explanation:
      'Compatibility covers browsers, devices, OS versions and the software that coexists alongside.',
  },
  'DP-T-015': {
    text: 'Which is the best test case title?',
    options: [
      'Login fails with a clear message when the password is wrong',
      'Login test 3',
      'Check login',
      'Password',
    ],
    explanation:
      'A title should state the condition and the expected result, so a reader can decide whether to run the case without opening it.',
  },
};

export const dumpJuniorEn: TranslationMap = {
  'DP-J-001': {
    text: 'A GET request to /api/users/999 returns 200 with an empty body for a user who does not exist. This is:',
    options: [
      'A defect: it should return 404',
      'Correct behaviour',
      'A performance problem',
      'A front-end defect',
    ],
    explanation:
      'Clients cannot tell "no such user" from "a user with no data". The status code is the contract.',
  },
  'DP-J-002': {
    text: 'Which query counts the orders of every customer, including those with none?',
    options: [
      'SELECT c.id, COUNT(o.id) FROM customers c LEFT JOIN orders o ON o.customer_id = c.id GROUP BY c.id',
      'SELECT c.id, COUNT(*) FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.id',
      'SELECT c.id, COUNT(o.id) FROM customers c, orders o GROUP BY c.id',
      'SELECT COUNT(*) FROM orders GROUP BY customer_id',
    ],
    explanation:
      'LEFT JOIN keeps customers with no orders, and COUNT(o.id) counts only non-NULL rows, so they correctly show 0. COUNT(*) would show 1.',
  },
  'DP-J-003': {
    text: 'A defect appears only when modules A and B run together, although each passes its own unit tests. The level that should have caught it is:',
    options: [
      'Integration testing',
      'Component testing',
      'Acceptance testing',
      'Unit testing',
    ],
    explanation:
      'Interface and interaction defects are by definition what integration testing aims at.',
  },
  'DP-J-004': {
    text: 'A story says "the user can filter results". Which is the most important question to ask before testing starts?',
    options: [
      'Filter by what, how do combinations behave, and what is the default?',
      'What colour is the filter button?',
      'Who implemented it?',
      'When is it being released?',
    ],
    explanation:
      'Without the set of filters and the semantics of combining them, no expected result can be stated at all.',
  },
  'DP-J-005': {
    text: 'A DELETE request is sent twice for the same resource. The second call should return:',
    options: [
      '404 or 204 - but never produce a side effect',
      '500',
      '201',
      'A repeat-deletion error that changes state',
    ],
    explanation:
      'DELETE is idempotent: repeating it must leave the same state. Both 204 and 404 are acceptable; a side effect is not.',
  },
  'DP-J-006': {
    text: 'The pipeline is green, yet a defect reached production in a covered area. The most useful thing to investigate is:',
    options: [
      'Whether the test checked the right thing, rather than merely that it ran',
      'Whether the pipeline was fast enough',
      'Which developer did the merge',
      'How many tests there are in total',
    ],
    explanation:
      'A passing test with a weak or wrong assertion is indistinguishable from coverage until something slips through.',
  },
  'DP-J-007': {
    text: 'The team asks you to guarantee that the release has no defects. The correct answer is:',
    options: [
      'I can report risk and coverage; no amount of testing can guarantee the absence of defects',
      'Yes, if I test everything',
      'Yes, if we automate everything',
      'No, testing is pointless anyway',
    ],
    explanation:
      'This is the second testing principle, stated as a professional boundary rather than as a piece of trivia.',
  },
  'DP-J-008': {
    text: 'A user sees 502 Bad Gateway. This most likely means:',
    options: [
      'An upstream server gave the proxy an invalid response',
      'The user typed the wrong URL',
      'The browser cache is stale',
      'The request body was malformed',
    ],
    explanation:
      '502 is a proxy-level failure: the gateway reached the upstream but got back something it could not use.',
  },
  'DP-J-009': {
    text: 'You are asked to sign off a story whose acceptance criteria were changed after development had finished. You should:',
    options: [
      'Verify against the currently agreed criteria and record that they changed mid-story',
      'Verify against the original criteria',
      'Sign off without verifying',
      'Refuse to verify',
    ],
    explanation:
      'The current agreement is the oracle, but a silent change mid-story is a process signal worth raising.',
  },
  'DP-J-010': {
    text: 'The UI shows a total of 100.00 while the database holds 99.995. The most likely defect is:',
    options: [
      'Rounding, or using a floating-point type for money',
      'A UI caching problem',
      'A network error',
      'A permissions problem',
    ],
    explanation:
      'Money in a binary floating-point type is a recurring class of defect; the cure is a decimal type or integers in minor units.',
  },
  'DP-J-011': {
    text: 'In a two-week sprint, when should testing of a story start?',
    options: [
      'As soon as the story is testable, in parallel with development',
      'In the last two days',
      'After the sprint review',
      'Only once every story is done',
    ],
    explanation:
      'Pushing testing to the end of the sprint recreates waterfall inside the sprint and guarantees carry-over.',
  },
  'DP-J-012': {
    text: 'A request with no token returns 200 and the requested data. This is:',
    options: [
      'A critical security defect - broken access control',
      'Fine, as long as the endpoint is fast',
      'A minor documentation issue',
      'Expected for GET requests',
    ],
    explanation:
      'Broken access control sits consistently at the top of the OWASP Top 10 and is reachable by ordinary functional testing.',
  },
  'DP-J-013': {
    text: 'Which of the following should unit tests catch rather than manual testing?',
    options: [
      'An off-by-one error in a date calculation function',
      'A confusing button label',
      'A page that is slow under load',
      'A broken integration with a third-party service',
    ],
    explanation:
      'Deterministic pure logic is the cheapest thing to cover at unit level and the most expensive to cover by hand.',
  },
  'DP-J-014': {
    text: 'Putting an assertion inside a page class in a Page Object framework is usually a mistake because:',
    options: [
      'Pages should expose capabilities; verdicts belong to the tests',
      'Assertions are slow',
      'It breaks inheritance',
      'It makes parallel execution impossible',
    ],
    explanation:
      'Keeping the verdict in the test leaves the page reusable by tests that have different expectations.',
  },
  'DP-J-015': {
    text: 'A requirement says: "export must support large files". Your first action is:',
    options: [
      'Ask for a number: how large, in what format, within what time',
      'Test with a 1 GB file',
      'Mark the requirement as passed',
      'Skip it',
    ],
    explanation:
      'Picking the threshold yourself quietly invents a requirement and guarantees an argument at acceptance.',
  },
};

export const dumpMiddleEn: TranslationMap = {
  'DP-M-001': {
    text: 'An API test suite passes locally and intermittently fails in CI with 401. The most likely cause is:',
    options: [
      'A token fetched once and reused after it expired, shared across parallel workers',
      'A slow CI machine',
      'A wrong assertion',
      'A missing test case',
    ],
    explanation:
      'Shared cached credentials across parallel workers are the classic source of flaky authentication failures specifically in CI.',
  },
  'DP-M-002': {
    text: 'Response times: p50 120 ms, p95 400 ms, p99 6 s. The most important conclusion for the report is:',
    options: [
      '1% of requests take 6 seconds - address the tail before the average',
      'The average is acceptable',
      'p95 is the only relevant number',
      'There is no problem',
    ],
    explanation:
      'Six seconds at p99 on a busy endpoint is thousands of bad experiences a day, and it usually signals lock contention, a cold cache or a slow query path.',
  },
  'DP-M-003': {
    text: 'An API returns "created_at": "2026-03-15T02:30:00" with no time zone. Why is this a defect?',
    options: [
      'The client cannot know the offset, so the same value is shown differently to different users',
      'JSON forbids date strings',
      'The format is too long',
      'It should be a number',
    ],
    explanation:
      'Missing offsets are one of the most common and least reported API contract defects.',
  },
  'DP-M-004': {
    text: 'You need the 20 most frequent error codes from a 4 GB log. The right approach is:',
    options: [
      'grep for the pattern, cut the field you need, then sort | uniq -c | sort -rn | head -20',
      'Open the file in an editor',
      'Copy it into a spreadsheet',
      'Read it through cat',
    ],
    explanation:
      'The standard pipeline streams the file instead of loading all of it - that is the difference between two seconds and a dead editor.',
  },
  'DP-M-005': {
    text: 'Tests pass on the developer machine and fail in a container on date-format assertions. What do you check first?',
    options: [
      'The TZ environment variable and the locale inside the container',
      'The container CPU limit',
      'The Docker version',
      'The network mode',
    ],
    explanation:
      'Containers usually default to UTC and the C locale, and that changes both formatting and parsing.',
  },
  'DP-M-006': {
    text: 'Two days before the release, a critical defect is found in an area that was descoped as low risk. The right response is:',
    options: [
      'Report it, revisit the risk model, and let the risk owner decide about the release',
      'Fix it quietly',
      'Delay the release on your own authority',
      'Close it as out of scope',
    ],
    explanation:
      'A miss by the risk model is information about the model itself. Hiding it takes the decision away from the person it belongs to.',
  },
  'DP-M-007': {
    text: 'Automated test coverage rose from 40% to 80%, but the number of escaped defects did not fall. The most likely explanation is:',
    options: [
      'The new tests cover low-risk code or have weak assertions',
      'The metric is wrong',
      'Escaped defects always lag by a year',
      'Manual testing was not cut back enough',
    ],
    explanation:
      'Coverage that is not aimed where defects escape adds execution cost without adding detection.',
  },
  'DP-M-008': {
    text: 'A partner API has started returning an extra field in its response. Your suite fails on strict schema validation. The right action is:',
    options: [
      'Confirm the contract and relax the schema for additive changes, if that is what was agreed',
      'Remove schema validation',
      'Ignore the failures',
      'Block the release immediately',
    ],
    explanation:
      'Additive changes are usually permitted by the contract. The schema should encode the real contract, not the current response.',
  },
  'DP-M-009': {
    text: 'A UI suite of 400 tests takes 90 minutes to run sequentially. The cheapest large win is usually:',
    options: [
      'Run it in parallel on isolated workers with independent data',
      'Rewrite the framework',
      'Reduce the number of assertions',
      'Increase the timeouts',
    ],
    explanation:
      'Parallelism turns wall-clock time into machine time. It only works once data isolation is already in place.',
  },
  'DP-M-010': {
    text: 'Testers spend 40% of their time on environment problems. The most valuable improvement is:',
    options: [
      'Containerise the environment so it is reproducible and disposable',
      'Hire more testers',
      'Write more test cases',
      'Cut the scope of testing',
    ],
    explanation:
      'Forty per cent of capacity is the largest lever available, and this is an already solved problem.',
  },
  'DP-M-011': {
    text: 'A nightly data-migration test passes on a January copy but fails on production data. The likely cause is:',
    options: [
      'Production data contains cases absent from the snapshot, such as legacy null values',
      'The database is slower',
      'The migration script is non-deterministic',
      'The test framework is out of date',
    ],
    explanation:
      'Migrations fail on the variety of the data, and variety is exactly what an old or truncated snapshot lacks.',
  },
  'DP-M-012': {
    text: 'You estimated the work at 5 days; after 3 days it is 30% done. The professional action is:',
    options: [
      'Report a revised forecast of roughly 10 days now, with the reason',
      'Say nothing and try to catch up',
      'Report it on day 5',
      'Quietly cut the scope',
    ],
    explanation:
      'Thirty per cent for 60% of the budget already is the forecast. Reporting on day 3 leaves options; day 5 leaves none.',
  },
  'DP-M-013': {
    text: 'Which pair of metrics together gives the most honest picture of testing effectiveness?',
    options: [
      'Defect detection percentage and the severity of escaped defects',
      'Test cases executed and pass rate',
      'Automated coverage and suite execution time',
      'Hours logged and defects raised',
    ],
    explanation:
      'One measures how much was caught, the other how much it mattered that something got through.',
  },
  'DP-M-014': {
    text: 'You need to test an endpoint that charges a card. In a shared test environment you should:',
    options: [
      'Use the provider sandbox with test cards and assert the state inside it',
      'Use a real card for a small amount',
      'Skip the test',
      'Mock the whole endpoint and assert nothing',
    ],
    explanation:
      'Sandboxes exist precisely so payment paths can be covered end to end without moving real money.',
  },
  'DP-M-015': {
    text: 'A service is not responding. Which single command gives the most diagnostic value straight away?',
    options: [
      'journalctl -u <service> -n 200 --no-pager (or tail its log)',
      'ls -la /',
      'df -h',
      'whoami',
    ],
    explanation:
      'The last lines of the log usually name the failure outright; checking disk and user comes after the log explained nothing.',
  },
};
