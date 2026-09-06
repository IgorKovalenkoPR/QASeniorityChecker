import type { TranslationMap } from '../define.js';

/**
 * English side of the Middle / Performance Review set.
 *
 * Kept beside the Ukrainian file rather than inside it: the question tuples are
 * dense, and interleaving two languages would make every reword touch both and
 * every diff unreadable.
 *
 * Rules this file follows, and the rest of the bank's translations follow too:
 *
 *   - Standard ISTQB and industry English terminology, not a literal rendering
 *     of the Ukrainian. The Ukrainian was itself written from the English
 *     concepts, so the translation recovers the term actually in use.
 *   - Option order is untouched. Correctness is stored as an index, so
 *     reordering options here would silently change the answer key.
 *   - A distractor stays wrong for the same reason it was wrong in Ukrainian.
 *     A distractor that becomes defensible in English changes what the
 *     question measures.
 *   - Explanations keep their point and stay over 40 characters, which the
 *     bank test enforces in both languages.
 */
export const middlePrEn: TranslationMap = {
  // --- api-theory ---------------------------------------------------------
  'MD-API-001': {
    text: 'Why is testing at the API level usually cheaper and more stable than the same coverage at the UI level?',
    options: [
      'It bypasses rendering and layout, so it is faster and unaffected by cosmetic changes',
      'It needs no test data',
      'It needs no assertions',
      'It cannot produce false negatives',
    ],
    explanation:
      'This is the argument behind the test pyramid: push coverage down to the layer with the most stable contract and the fastest feedback.',
  },
  'MD-API-002': {
    text: 'What is the key difference between REST and SOAP?',
    options: [
      'REST is an architectural style over HTTP; SOAP is a protocol with a strict XML envelope',
      'REST cannot use XML',
      'SOAP cannot be tested automatically',
      'REST always uses GraphQL',
    ],
    explanation:
      'SOAP brings WSDL, a fixed envelope and built-in standards (WS-Security). REST relies on HTTP semantics and is far lighter - at the cost of having no formal contract until OpenAPI is added.',
  },
  'MD-API-003': {
    text: 'What is idempotency, and why does it matter when testing a payment API?',
    options: [
      'Repeating the same request must not create a second charge',
      'A request must always return 200',
      'A request must be encrypted',
      'A request must complete within a second',
    ],
    explanation:
      'Retries across the network are routine. An idempotency key on POST is the mechanism that stops one user click from becoming two payments.',
  },
  'MD-API-004': {
    text: 'Contract testing between two services primarily protects against:',
    options: [
      'One service changing its interface in a way that breaks its consumers',
      'Slow response times',
      'Database corruption',
      'UI layout regressions',
    ],
    explanation:
      'Contract tests give fast, precise feedback where a full end-to-end suite gives it slowly and flakily.',
  },
  'MD-API-005': {
    text: 'An API returns 200 OK with the body {"error": "user not found"}. This is a defect because:',
    options: [
      'The status code contradicts the body, so clients cannot rely on HTTP semantics',
      'The body should be XML',
      '200 is never valid for a GET',
      'The message is in English',
    ],
    explanation:
      'Clients, proxies, caches and monitoring all key off the status code. Errors encoded inside a 200 break every one of them.',
  },
  'MD-API-006': {
    text: 'When testing pagination on a REST collection endpoint, the most important boundary cases are:',
    options: [
      'An empty result, a single page, an exact page boundary and a page beyond the range',
      'The first page only',
      'Very large pages only',
      'The sort order only',
    ],
    explanation:
      'An off-by-one at a page boundary and the behaviour past the last page are exactly where pagination defects live.',
  },

  // --- risks-in-testing ---------------------------------------------------
  'MD-RISK-001': {
    text: 'Which order of steps in risk-based testing is correct?',
    options: [
      'Identify risks, analyse them (likelihood x impact), prioritise, allocate effort, monitor',
      'Write the test cases, then look for risks',
      'Execute the tests, then rank the defects found',
      'Estimate the effort first, then identify risks',
    ],
    explanation:
      'Risk analysis drives the plan. Running it after the tests are written turns it into documentation instead of a decision-making tool.',
  },
  'MD-RISK-002': {
    text: 'A project risk, as opposed to a product risk, is:',
    options: [
      "The team's only automation engineer is leaving next month",
      'The payment module may calculate VAT incorrectly',
      'The application may be slow on 3G',
      'Export may corrupt Unicode characters',
    ],
    explanation:
      'Project risks threaten the ability to deliver; product risks threaten the quality of what is delivered.',
  },
  'MD-RISK-003': {
    text: 'The most useful outcome of a risk workshop for a tester is:',
    options: [
      'A prioritised list of risk areas that determines how deep the coverage goes',
      'A longer test plan',
      'A list of everyone who attended',
      'A fixed number of test cases per module',
    ],
    explanation:
      'Risk priority is what turns limited time into a defensible decision about coverage.',
  },
  'MD-RISK-004': {
    text: 'Residual risk means:',
    options: [
      'The risk that remains once the planned measures have been applied',
      'A risk nobody has identified',
      'A risk that has already materialised',
      'A risk with zero impact',
    ],
    explanation:
      'Reporting residual risk honestly at release time is the most valuable thing a test report does.',
  },
  'MD-RISK-005': {
    text: 'Two weeks before release, testing is cut to one week. The risk-based response is:',
    options: [
      'Cut coverage of the lowest-risk areas and report the resulting residual risk',
      'Cut the depth of every area by the same amount',
      'Drop regression testing entirely',
      'Keep the plan and work overtime',
    ],
    explanation:
      'An even cut damages coverage of the high-risk areas just as much as the low-risk ones, which is the opposite of what a risk model exists for.',
  },

  // --- testing-metrics ----------------------------------------------------
  'MD-MET-001': {
    text: 'How is Defect Detection Percentage (DDP) calculated?',
    options: [
      'Defects found by testing / (found by testing + found after release)',
      'Defects / test cases executed',
      'Defects fixed / defects raised',
      'Test cases passed / test cases executed',
    ],
    explanation:
      'DDP measures what share of the whole defect population the test process caught - one of the few metrics that really says something about its effectiveness.',
  },
  'MD-MET-002': {
    text: 'Which metric is the easiest to game, and therefore the most dangerous to set as a target?',
    options: [
      'The number of test cases written',
      'Defect detection percentage',
      'Requirements coverage',
      'Defects that escaped into the release',
    ],
    explanation:
      "Counting cases rewards splitting one test into ten. Goodhart's law applies: a measure that becomes a target stops being a measure.",
  },
  'MD-MET-003': {
    text: 'Defect density is normally expressed as:',
    options: [
      'Defects per unit of size, for example per KLOC or per function point',
      'Defects per tester',
      'Defects per sprint',
      'Defects per environment',
    ],
    explanation:
      'Normalising by size makes modules of different sizes comparable and exposes the clusters that deserve extra attention.',
  },
  'MD-MET-004': {
    text: '90% requirements coverage means that:',
    options: [
      'At least one test exists for 90% of the requirements, and it says nothing about how good those tests are',
      '90% of the defects have been found',
      'The product is 90% ready',
      '10% of the code is broken',
    ],
    explanation:
      'Coverage counts links, not thoroughness. A weak test marks a requirement covered just as well as a strong one.',
  },
  'MD-MET-005': {
    text: 'The open-defect chart is flat while the rate at which defects are found is falling. The most likely reading is that:',
    options: [
      'The bottleneck is fixing capacity, not testing',
      'The product is ready for release',
      'Testing has stopped',
      'The metric is wrong',
    ],
    explanation:
      'Reading the two metrics together turns the chart into a diagnosis. Either one on its own is ambiguous.',
  },

  // --- json ---------------------------------------------------------------
  'MD-JSON-001': {
    text: 'Which of the following is NOT a valid value type in JSON?',
    options: ['Date', 'Number', 'Boolean', 'null'],
    explanation:
      'JSON has objects, arrays, strings, numbers, booleans and null. Dates travel as strings (usually ISO 8601) - which is why time-zone defects are so common.',
  },
  'MD-JSON-002': {
    text: 'Which JSON fragment is syntactically invalid?',
    options: ['{"a": 1,}', '{"a": 1}', '{"a": [1, 2]}', '{"a": {"b": null}}'],
    explanation:
      'JSON forbids a trailing comma. Many parsers are lenient - which is exactly why the defect shows up on only one of them.',
  },
  'MD-JSON-003': {
    text: 'JSON Schema is used in API testing in order to:',
    options: [
      'Validate the structure and the types of a response automatically',
      'Compress the payload',
      'Encrypt sensitive fields',
      'Generate the UI',
    ],
    explanation:
      'Schema validation catches whole classes of contract regression in a single check instead of dozens of field-by-field assertions.',
  },
  'MD-JSON-004': {
    text: 'Given {"user": {"roles": ["admin", "qa"]}}, which JSONPath selects the second role?',
    options: ['$.user.roles[1]', '$.user.roles[2]', '$.roles[1]', '$.user[roles][1]'],
    explanation:
      'JSONPath arrays are zero-indexed, so index 1 is the second element of the array.',
  },
  'MD-JSON-005': {
    text: 'A numeric id is returned as 9007199254740993, but a JavaScript client displays 9007199254740992. The cause is:',
    options: [
      'JavaScript numbers lose precision above 2^53-1',
      'The API is broken',
      'JSON cannot hold large numbers',
      'The client rounded the value deliberately',
    ],
    explanation:
      'This is why large ids are carried as strings. It is a genuine, reproducible defect worth raising against the API contract.',
  },

  // --- unix ---------------------------------------------------------------
  'MD-UNIX-001': {
    text: 'Which command shows the last 100 lines of a log and keeps following it?',
    options: [
      'tail -n 100 -f app.log',
      'head -n 100 app.log',
      'cat -f app.log',
      'less -f app.log',
    ],
    explanation:
      'tail -f is the standard way to watch a log while reproducing a defect.',
  },
  'MD-UNIX-002': {
    text: 'What does "grep -i -c error app.log" return?',
    options: [
      'The number of lines containing "error", ignoring case',
      'The matching lines only',
      'The first matching line',
      'The size of the file',
    ],
    explanation:
      '-i ignores case, and -c prints a count instead of the matching lines themselves.',
  },
  'MD-UNIX-003': {
    text: 'Which chmod value gives the owner read/write/execute and everyone else read/execute?',
    options: ['755', '777', '644', '700'],
    explanation:
      'The digits stand for owner/group/others; 7 = rwx, 5 = r-x. 777 grants write access to everyone and is almost always a configuration mistake.',
  },
  'MD-UNIX-004': {
    text: 'Which command finds the process listening on port 8080?',
    options: [
      'lsof -i :8080  (or ss -ltnp | grep 8080)',
      'ps -ef | grep 8080',
      'netcat 8080',
      'kill -9 8080',
    ],
    explanation:
      'ps only searches command lines. lsof and ss look at the actual socket table.',
  },
  'MD-UNIX-005': {
    text: 'What does "2>&1" do in a shell pipeline?',
    options: [
      'Redirects the standard error stream into standard output',
      'Runs the command twice',
      'Redirects the output into a file named 2',
      'Suppresses all output',
    ],
    explanation:
      'Without it, stderr bypasses the pipeline and never reaches the next command or the log file.',
  },

  // --- virtualization -----------------------------------------------------
  'MD-VIRT-001': {
    text: 'The main difference between a container and a virtual machine is that a container:',
    options: [
      'Uses the host kernel instead of a full guest OS',
      'Cannot use the network',
      'Is always slower',
      'Cannot run databases',
    ],
    explanation:
      'The shared kernel is exactly what lets containers start in milliseconds and weigh megabytes rather than gigabytes.',
  },
  'MD-VIRT-002': {
    text: 'Why are containers valuable for test environments?',
    options: [
      'They make the environment reproducible and disposable',
      'They remove the need for test data',
      'They guarantee there are no defects',
      'They replace CI',
    ],
    explanation:
      "A disposable environment eliminates a whole class of false results that come from running against yesterday's leftover state.",
  },
  'MD-VIRT-003': {
    text: 'In Docker, what is the difference between an image and a container?',
    options: [
      'An image is an immutable template; a container is a running instance of it',
      'They are the same thing',
      'A container is what is stored in a registry',
      'An image has a writable layer',
    ],
    explanation:
      'The writable layer belongs to the container. Data written there disappears with the container unless a volume is mounted.',
  },
  'MD-VIRT-004': {
    text: 'A test suite passes locally and fails inside a container. What should be compared first?',
    options: [
      'Environment variables, mounted volumes, time zone and locale',
      "The tester's keyboard layout",
      'The version of the Docker logo',
      'The screen resolution of the host',
    ],
    explanation:
      'Time-zone and locale differences alone account for a large share of the failures that happen only inside a container.',
  },
  'MD-VIRT-005': {
    text: 'In testing, docker-compose is most useful for:',
    options: [
      'Bringing the application up together with its dependencies as one reproducible stack',
      'Running unit tests faster',
      'Replacing the CI server',
      'Generating test data',
    ],
    explanation:
      'Application plus database plus queue plus mock services, starting identically on every machine, is precisely the integration-testing problem compose solves.',
  },

  // --- auto-web-ui --------------------------------------------------------
  'MD-AWEB-001': {
    text: 'The Page Object pattern primarily improves:',
    options: [
      "Maintainability, by keeping a page's locators and behaviour in one place",
      'Execution speed',
      'Defect detection percentage',
      'Cross-browser compatibility',
    ],
    explanation:
      'When a locator changes, one file changes. Without the pattern the same selector is scattered across dozens of tests.',
  },
  'MD-AWEB-002': {
    text: 'Which waiting strategy produces the most reliable UI tests?',
    options: [
      'Explicit waits for a specific expected condition',
      'Fixed Thread.sleep calls',
      'Implicit waits with a large global value',
      'No waits at all',
    ],
    explanation:
      'An explicit condition states what you are waiting for, so the test fails with a meaningful message rather than at an arbitrary timeout.',
  },
  'MD-AWEB-003': {
    text: 'A UI test fails once in ten runs with no change to the product. The correct response is:',
    options: [
      'Find and remove the race condition, quarantining the test in the meantime',
      'Add a retry so that it turns green',
      'Increase every delay',
      'Delete the test',
    ],
    explanation:
      'Blind retries hide genuine intermittent product defects - exactly the ones users report and nobody can reproduce.',
  },
  'MD-AWEB-004': {
    text: 'Which locator strategy is generally the most fragile?',
    options: [
      'An absolute XPath through the DOM hierarchy',
      'A dedicated data-testid',
      'The element id',
      'An accessibility role together with the name',
    ],
    explanation:
      'An absolute XPath encodes the whole document structure, so any wrapper div a designer adds breaks it.',
  },
  'MD-AWEB-005': {
    text: 'In the test pyramid, end-to-end UI tests should be:',
    options: [
      'The smallest layer, covering only the critical user journeys',
      'The largest layer',
      'The only layer',
      'Equal in volume to the unit tests',
    ],
    explanation:
      'E2E tests are the slowest and most fragile per unit of coverage, so they are spent on the journeys that must never break.',
  },

  // --- auto-mobile-ui -----------------------------------------------------
  'MD-AMOB-001': {
    text: 'Appium can drive both Android and iOS because it:',
    options: [
      "Speaks the WebDriver protocol on top of each platform's own native automation frameworks",
      'Recompiles the application',
      'Requires the source code',
      'Only works on emulators',
    ],
    explanation:
      'Appium wraps UiAutomator2/Espresso on Android and XCUITest on iOS behind a single client API.',
  },
  'MD-AMOB-002': {
    text: 'The key limitation of testing exclusively on emulators and simulators is that they cannot faithfully reproduce:',
    options: [
      'Real hardware behaviour: sensors, performance, battery, network conditions',
      'Screen layout',
      'Button taps',
      'Application logic',
    ],
    explanation:
      'Layout and logic transfer well. Performance, thermal behaviour and radio state do not, which is why a real-device layer is needed.',
  },
  'MD-AMOB-003': {
    text: 'Which mobile automation problem is caused by the platform rather than by the test code?',
    options: [
      'Permission request dialogs on a clean install',
      'A mistake in a locator',
      'A missing assertion',
      'A hard-coded delay',
    ],
    explanation:
      'System dialogs live outside the view hierarchy of the application, so they have to be handled explicitly in the automation setup.',
  },

  // --- auto-performance ---------------------------------------------------
  'MD-APERF-001': {
    text: 'The difference between load testing and stress testing is that stress testing:',
    options: [
      'Drives the system beyond its expected capacity to find the breaking point',
      'Uses the expected number of users',
      'Holds normal load for a long period',
      'Measures response time only',
    ],
    explanation:
      'Load = the expected volume; stress = beyond it; soak = normal load for a long time; spike = sudden surges.',
  },
  'MD-APERF-002': {
    text: 'Reporting only the average response time is misleading because:',
    options: [
      'It hides the tail; percentiles show what the slowest users actually experience',
      'An average cannot be calculated reliably',
      'It ignores the number of requests',
      'It needs more data',
    ],
    explanation:
      'A 200 ms average sits quite happily alongside a 99th percentile of 4 s. Users feel the tail, not the average.',
  },
  'MD-APERF-003': {
    text: 'Soak testing is intended to reveal:',
    options: [
      'Memory leaks and resource exhaustion over time',
      'Maximum throughput',
      'The breaking point',
      'Cold start time',
    ],
    explanation:
      'Degradation that only appears after hours of steady traffic is invisible to a ten-minute load test.',
  },
  'MD-APERF-004': {
    text: 'What is a precondition for a meaningful performance test?',
    options: [
      'A production-like environment and a realistic volume of data',
      'A brand-new empty database',
      'A single test user',
      'Running it from a developer laptop',
    ],
    explanation:
      'Performance is dominated by data volume, indexes, caches and infrastructure. An empty database measures nothing useful.',
  },

  // --- auto-api -----------------------------------------------------------
  'MD-AAPI-001': {
    text: 'Which set of checks is the minimum for a meaningful automated API test?',
    options: [
      'The status code, the response schema and the values of the business-critical fields',
      'The status code only',
      'The response time only',
      'Only that the response is not empty',
    ],
    explanation:
      'The status alone passes on a 200 with a wrong body; the schema alone passes on schema-valid nonsense.',
  },
  'MD-AAPI-002': {
    text: 'When automating a REST API, authentication tokens should:',
    options: [
      'Be obtained during setup and injected from configuration or a secret store',
      'Be hard-coded in the test file',
      'Be committed to the repository',
      'Be copied out of the browser by hand every time',
    ],
    explanation:
      'Hard-coded tokens expire, leak, and break the suite for everybody else.',
  },
  'MD-AAPI-003': {
    text: 'Automated API tests should clean up the data they create because:',
    options: [
      'Accumulated state makes later runs non-deterministic',
      'Storage is expensive',
      'The API requires it',
      'It makes the tests faster',
    ],
    explanation:
      'Per-test setup and teardown are what let the suite run a thousand times with the same result.',
  },
  'MD-AAPI-004': {
    text: 'Which negative case is most often missing from API test suites?',
    options: [
      'Malformed request bodies and incorrect content types',
      'The main positive scenario',
      'A valid GET request',
      'A successful login',
    ],
    explanation:
      'Error handling is where APIs leak stack traces, answer client mistakes with a 500, and expose internal field names.',
  },

  // --- auto-db ------------------------------------------------------------
  'MD-ADB-001': {
    text: 'An automated database test should verify that:',
    options: [
      'The stored data satisfies the business rules after the operation',
      'The UI shows a green message',
      'The query runs without syntax errors',
      'The table exists',
    ],
    explanation:
      'The point of a database-level check is to confirm what was actually stored, regardless of what the UI chose to display.',
  },
  'MD-ADB-002': {
    text: 'Which practice keeps automated database tests independent of one another?',
    options: [
      'Each test creates its own data and then rolls it back or deletes it',
      'The tests share one fixed data set',
      'The tests run in a fixed alphabetical order',
      'The tests read production data',
    ],
    explanation:
      'Shared mutable state makes a suite order-dependent, which is the hardest kind of instability to diagnose.',
  },
  'MD-ADB-003': {
    text: 'Testing a database migration must always include:',
    options: [
      'The rollback path, verified against production-like data',
      'Only the forward migration on an empty schema',
      'Only a syntax check',
      'Only a performance measurement',
    ],
    explanation:
      'Migrations fail on real data, not on empty schemas, and a migration with no tested rollback is a deployment with no way back.',
  },

  // --- precise-estimation -------------------------------------------------
  'MD-PEST-001': {
    text: 'Three-point estimation (optimistic, most likely, pessimistic) is useful because it:',
    options: [
      'Makes the uncertainty explicit instead of hiding it inside a single number',
      'Always produces a smaller estimate',
      'Removes the need for historical data',
      'Guarantees the deadline',
    ],
    explanation:
      'The spread is itself information: a wide range signals that the requirement needs clarifying before anyone commits to it.',
  },
  'MD-PEST-002': {
    text: 'The most reliable source of data for a test estimate is:',
    options: [
      'Historical actuals from similar work in the same context',
      'What management expects',
      "The developer's estimate multiplied by a fixed factor",
      'A round number that sounds plausible',
    ],
    explanation:
      "Calibrating on your own past data beats any rule of thumb, because it silently accounts for your own team's overheads.",
  },
  'MD-PEST-003': {
    text: 'When estimating the verification of a bug fix, you have to account for:',
    options: [
      'Retesting the fix plus regression around the affected area',
      'Retesting the fix only',
      'The developer time spent on the fix',
      'Nothing, it is negligible',
    ],
    explanation:
      'The regression radius, not the retest itself, is the part that swings from ten minutes to two days.',
  },
  'MD-PEST-004': {
    text: 'Planning poker reduces estimation bias mainly because:',
    options: [
      'The estimators commit to their own view independently, before any discussion',
      "It averages everybody's numbers",
      'It lets the most experienced person decide',
      'It uses Fibonacci numbers',
    ],
    explanation:
      'The mechanism is the simultaneous reveal; the card values are only a scale. What it guards against is anchoring.',
  },

  // --- process-analysis ---------------------------------------------------
  'MD-PROC-001': {
    text: 'Defects escape into production in numbers while the internal test pass rate stays high. This points to:',
    options: [
      'The tests not covering what users actually do',
      'The testers working too slowly',
      'The product being too complex',
      'The developers writing bad code',
    ],
    explanation:
      'A high pass rate together with a high escape rate is a coverage and oracle problem, and it is measured through DDP.',
  },
  'MD-PROC-002': {
    text: 'Root cause analysis of escaped defects is most useful when it produces:',
    options: [
      'A process change that prevents the same class of defect',
      'A list of who got it wrong',
      'A longer regression suite',
      'A new metric',
    ],
    explanation:
      'An analysis that ends in a name changes nothing. One that ends in a changed review, check or gate changes the outcome.',
  },
  'MD-PROC-003': {
    text: 'The per-sprint testing process keeps taking longer although the scope is unchanged. Which cause should be investigated first?',
    options: [
      'Growth of the regression suite and manual repetition',
      'The testers have become slower',
      'The requirements have become harder',
      'Tool licence limits',
    ],
    explanation:
      'Regression cost grows monotonically with the size of the product unless it is actively automated and pruned.',
  },
  'MD-PROC-004': {
    text: 'Which of these is a symptom of a testing process problem rather than a product problem?',
    options: [
      'The same defect is raised independently by three testers',
      'A module has a high defect density',
      'A performance target has not been met',
      'A requirement is ambiguous',
    ],
    explanation:
      'Duplicates mean coverage is uncoordinated and nobody searches the tracker - both of which are process problems.',
  },

  // --- project-estimation -------------------------------------------------
  'MD-PROJ-001': {
    text: 'When estimating testing for a whole project, what is most often underestimated?',
    options: [
      'Environment setup, test data and communication overhead',
      'Test case execution',
      'Test case writing',
      'Defect reporting',
    ],
    explanation:
      'Execution is visible and easy to count; the work around it is invisible, and that is where the variability sits.',
  },
  'MD-PROJ-002': {
    text: 'You are asked for a fixed test estimate on a project with unstable requirements. The professional answer is:',
    options: [
      'Propose a timeboxed investigation phase, or a range with the assumptions stated',
      'Give a low number to win the deal',
      'Give a very high number just in case',
      'Refuse to name any figure',
    ],
    explanation:
      'A lowballed figure and an inflated one both destroy trust later. What makes a number defensible is the assumption stated beside it.',
  },
  'MD-PROJ-003': {
    text: 'Which factor increases a test estimate the most for the same set of functionality?',
    options: [
      'A regulated industry that demands evidence and traceability',
      'A bigger monitor',
      'A newer test tool',
      'More frequent standups',
    ],
    explanation:
      'Compliance overhead - documented evidence, sign-offs, an audit trail - can double the cost of identical functional coverage.',
  },

  // --- onboarding-training ------------------------------------------------
  'MD-ONB-001': {
    text: 'The most effective first week for a tester joining a project is:',
    options: [
      'A guided walkthrough of the domain plus a small real task with an assigned mentor',
      'Reading all of the documentation alone',
      'Owning the regression suite straight away',
      'Waiting for the next sprint to start',
    ],
    explanation:
      'A real task with support builds competence and confidence far faster than passive reading does.',
  },
  'MD-ONB-002': {
    text: 'A mentee has raised a defect that is in fact correct behaviour. The best response is:',
    options: [
      'Walk through the requirement together, so that they learn to find the oracle',
      'Close the ticket silently',
      'Tell them to be more careful',
      'Ask somebody else to review their reports from now on',
    ],
    explanation:
      'The goal is a tester who checks the oracle next time, not one who raises fewer reports.',
  },
  'MD-ONB-003': {
    text: 'What is a good sign that onboarding has worked?',
    options: [
      'The new tester completes representative tasks with steadily less supervision',
      'The number of documents read',
      'The number of meetings attended',
      'How quickly they stopped asking questions',
    ],
    explanation:
      'Questions stopping can mean understanding or disengagement. Independent work on real tasks tells the two apart.',
  },

  // --- test-doc-development -----------------------------------------------
  'MD-TDOC-001': {
    text: 'When designing the test documentation structure for a new project, the first thing to decide is:',
    options: [
      'How much documentation the context and the risk actually justify',
      'Which template was used on the previous project',
      'Which tool the team likes',
      'How many test cases to write per module',
    ],
    explanation:
      'A regulated medical product and an internal admin panel need different amounts of evidence. Copying a template skips that judgement.',
  },
  'MD-TDOC-002': {
    text: 'A documentation standard is worth introducing primarily because it:',
    options: [
      'Makes test artefacts reviewable and reusable across the team',
      'Makes the documents longer',
      'Keeps the customer happy',
      'Reduces the need for testing',
    ],
    explanation:
      'The benefit is that a case written by one tester can be executed and maintained by another without a separate conversation.',
  },
  'MD-TDOC-003': {
    text: 'The strongest argument for keeping test documentation under version control and in a tool is:',
    options: [
      'Changes are traceable, and the documentation evolves together with the product',
      'It looks more professional',
      'It takes up less disk space',
      'ISTQB requires it',
    ],
    explanation:
      'Untracked documents drift silently away from reality; tracked ones make that gap visible and reviewable.',
  },
};
