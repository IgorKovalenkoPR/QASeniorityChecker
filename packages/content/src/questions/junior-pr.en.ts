import type { TranslationMap } from '../define.js';

/**
 * English side of the Junior / Performance Review set.
 *
 * Kept beside the Ukrainian file rather than inside it: the question tuples are
 * dense, and interleaving two languages would make every reword touch both and
 * every diff unreadable.
 *
 * Rules this file follows, and the rest of the bank's translations follow too:
 *
 *   - Standard ISTQB English terminology, not a literal rendering of the
 *     Ukrainian. The Ukrainian was itself written from the English concepts,
 *     so the translation recovers the term the syllabus actually uses.
 *   - Option order is untouched. Correctness is stored as an index, so
 *     reordering options here would silently change the answer key.
 *   - A distractor stays wrong for the same reason it was wrong in Ukrainian.
 *     A distractor that becomes defensible in English changes what the
 *     question measures.
 *   - Explanations keep their point and stay over 40 characters, which the
 *     bank test enforces in both languages.
 */
export const juniorPrEn: TranslationMap = {
  // --- verification-validation ----------------------------------------------
  'JR-VV-001': {
    text: 'Which question does verification answer?',
    options: [
      'Are we building the product right?',
      'Are we building the right product?',
      'Is the product profitable?',
      'Is the product fast enough?',
    ],
    explanation:
      'Verification checks the product against its specification. Validation checks it against the real user need - a product can pass verification completely and still be the wrong product.',
  },
  'JR-VV-002': {
    text: 'Which activity is validation rather than verification?',
    options: [
      'Acceptance testing by real users on real scenarios',
      'Requirements review',
      'Code inspection',
      'Checking a design document against the specification',
    ],
    explanation:
      'Validation involves the real need and the real user. Reviews and inspections compare one artefact against another, and that is verification.',
  },
  'JR-VV-003': {
    text: 'A feature matches the specification exactly, but users cannot accomplish their task with it. This is:',
    options: [
      'A validation failure',
      'A verification failure',
      'Not a defect at all',
      'A performance defect',
    ],
    explanation:
      'It was built right; the requirement was wrong. These are exactly the failures validation exists to catch, so it belongs in a report rather than being waved away.',
  },
  'JR-VV-004': {
    text: 'Which pair of activities is verification in both cases?',
    options: [
      'Static analysis and design review',
      'Beta testing and design review',
      'Acceptance testing and static analysis',
      'Beta testing and alpha testing',
    ],
    explanation:
      'Both compare an artefact against its specification without involving the real user need.',
  },

  // --- acceptance-criteria ---------------------------------------------------
  'JR-AC-001': {
    text: 'Acceptance criteria for a user story should be:',
    options: [
      'Testable, unambiguous and agreed before development starts',
      'Written by the tester after the demo',
      'As general as possible to keep flexibility',
      'Optional for small stories',
    ],
    explanation:
      'Criteria agreed up front are a shared definition of done for that story. Criteria written afterwards describe whatever was built, which is not the same thing.',
  },
  'JR-AC-002': {
    text: 'What is the difference between acceptance criteria and the Definition of Done?',
    options: [
      'Criteria belong to a single story; the DoD applies to every story the team delivers',
      'They are two names for the same thing',
      'Only the customer writes the DoD',
      'Criteria apply to bugs only',
    ],
    explanation:
      'The DoD is a team-wide quality bar (code reviewed, tests written, deployed to staging). Acceptance criteria describe what this particular story must do.',
  },
  'JR-AC-003': {
    text: 'Which of these acceptance criteria, as worded, cannot be verified?',
    options: [
      'The page should load reasonably fast',
      'The page loads within 2 seconds on 4G',
      'An error message is shown for an invalid email',
      'After login the user is redirected to /dashboard',
    ],
    explanation:
      'There is no oracle for "reasonably fast". A criterion two people read differently will be disputed at the worst possible moment.',
  },
  'JR-AC-004': {
    text: 'A story is demoed and works, but the team has not written the automated tests its DoD requires. The story is:',
    options: [
      'Not done',
      'Done, because it works',
      'Done if the customer approves',
      'Done, with a follow-up ticket',
    ],
    explanation:
      'The DoD is binary and team-wide. Allowing exceptions turns it into a wish, and the debt then accumulates unnoticed.',
  },
  'JR-AC-005': {
    text: 'The Given/When/Then format is common for acceptance criteria because it:',
    options: [
      'Forces you to state a precondition, an action and an observable outcome',
      'Is required by Scrum',
      'Makes stories shorter',
      'Only works with automation tools',
    ],
    explanation:
      'The three parts map directly onto precondition, step and expected result, which is why they turn into test cases so cleanly.',
  },

  // --- testing-phases-goals --------------------------------------------------
  'JR-PH-001': {
    text: 'Which of these is NOT a typical objective of testing?',
    options: [
      'Proving that the software contains no defects',
      'Finding defects',
      'Reducing risk',
      'Providing information for decision-making',
    ],
    explanation:
      'Testing can show the presence of defects but never their absence. The goal of "proving there are no bugs" is unreachable by definition.',
  },
  'JR-PH-002': {
    text: 'In the fundamental test process, which activity comes immediately after planning?',
    options: [
      'Monitoring and control, running in parallel with analysis and design',
      'Test execution',
      'Test completion',
      'Defect reporting',
    ],
    explanation:
      'ISTQB v4 lists planning, monitoring and control, analysis, design, implementation, execution and completion. Monitoring and control run continuously from planning onwards.',
  },
  'JR-PH-003': {
    text: 'Test completion activities include:',
    options: [
      'Collecting lessons learned and archiving testware',
      'Writing the first test cases',
      'Setting up the environment',
      'Running the regression suite',
    ],
    explanation:
      'Completion is where a team turns experience into something reusable. Skipping it means paying for the same lesson again next release.',
  },
  'JR-PH-004': {
    text: 'Why is early testing (shift left) valuable?',
    options: [
      'A defect found in the requirements costs far less than the same defect in production',
      'It reduces the number of testers needed',
      'It removes the need for regression testing',
      'It guarantees on-time delivery',
    ],
    explanation:
      'The cost of a defect rises sharply with the phase in which it is found, which makes requirements review one of a tester’s highest-return activities.',
  },

  // --- sdlc-methodologies ----------------------------------------------------
  'JR-SDLC-001': {
    text: 'In the V-model, which test level corresponds to the requirements specification?',
    options: [
      'Acceptance testing',
      'Unit testing',
      'Integration testing',
      'Component testing',
    ],
    explanation:
      'The V-model pairs each development artefact with the test level that validates it. Requirements pair with acceptance testing, detailed design with unit testing.',
  },
  'JR-SDLC-002': {
    text: 'A key characteristic of Scrum is:',
    options: [
      'Fixed-length iterations producing a potentially shippable increment',
      'A single test phase after all development is finished',
      'A complete absence of any requirements documentation',
      'A separate QA acceptance gate between phases',
    ],
    explanation:
      'The sprint boundary and the increment are Scrum’s two structural commitments. Testing happens inside the sprint, not after it.',
  },
  'JR-SDLC-003': {
    text: 'Kanban differs from Scrum mainly in that it:',
    options: [
      'Uses continuous flow with WIP limits instead of fixed iterations',
      'Forbids daily meetings',
      'Has no board',
      'Requires no estimation at all',
    ],
    explanation:
      'Kanban optimises flow and limits work in progress; Scrum packs work into sprint timeboxes. Both use boards, and both may estimate.',
  },
  'JR-SDLC-004': {
    text: 'The main drawback of pure Waterfall for testing is that:',
    options: [
      'Testing starts late, so defects are found when they are most expensive',
      'Testing is impossible altogether',
      'There is no documentation to test against',
      'Requirements are never written',
    ],
    explanation:
      'Waterfall pushes specification to the very front and verification to the very end - exactly the opposite of the economics of defects.',
  },
  'JR-SDLC-005': {
    text: 'What does "shift right" mean in a testing context?',
    options: [
      'Extending quality activities into production: monitoring, canary releases, feedback from real users',
      'Moving all testing to the end of the project',
      'Handing testing over to the developers',
      'Postponing the release',
    ],
    explanation:
      'Shift right complements shift left: some failures only appear under real traffic, on real data and real infrastructure.',
  },
  'JR-SDLC-006': {
    text: 'In Scrum, who is responsible for the quality of the increment?',
    options: [
      'The whole development team',
      'The testers only',
      'The Scrum Master only',
      'The Product Owner only',
    ],
    explanation:
      'Scrum defines a single accountability for the cross-functional team. A team that treats quality as "the tester’s job" has simply recreated a handover gate inside the sprint.',
  },

  // --- testing-principles ----------------------------------------------------
  'JR-PRIN-001': {
    text: 'The pesticide paradox states that:',
    options: [
      'Repeating the same tests eventually stops finding new defects',
      'Defects cluster in a few modules',
      'Testing cannot prove the absence of defects',
      'Early testing saves money',
    ],
    explanation:
      'Test suites lose their yield over time, so they must be reviewed and extended. This principle is exactly what justifies rotating and refreshing regression suites.',
  },
  'JR-PRIN-002': {
    text: 'In practice, the defect clustering principle means you should:',
    options: [
      'Direct extra effort at the modules that have historically produced the most defects',
      'Test every module equally',
      'Stop testing modules that have defects',
      'Automate everything',
    ],
    explanation:
      'Defects are not evenly distributed. Clustering is the empirical basis for prioritising testing by risk.',
  },
  'JR-PRIN-003': {
    text: 'Which statement matches the absence-of-errors fallacy?',
    options: [
      'A system can be defect-free and still fail to meet users’ needs',
      'If no defects are found, the software is perfect',
      'All defects can be found',
      'Early testing is unnecessary',
    ],
    explanation:
      'Fixing everything you found is not the same as building something useful. This principle is the bridge from verification to validation.',
  },
  'JR-PRIN-004': {
    text: 'Why is exhaustive testing impossible for real systems?',
    options: [
      'The number of input and precondition combinations is effectively unbounded',
      'Because tools are too slow',
      'Because budgets are always cut',
      'Because requirements are never complete',
    ],
    explanation:
      'Even a handful of fields with ordinary ranges gives a combination space no team will ever execute. That is precisely why selection by risk and by technique exists.',
  },
  'JR-PRIN-005': {
    text: 'The principle "testing is context dependent" means that:',
    options: [
      'A medical device and a marketing website need different testing approaches',
      'Every project should use one and the same process',
      'Context only matters for automation',
      'Only the customer decides the approach',
    ],
    explanation:
      'Risk profile, regulation, lifecycle and technology all change what good testing looks like. One fixed process for every case is a warning sign.',
  },

  // --- defect-management-systems ---------------------------------------------
  'JR-DMS-001': {
    text: 'The main purpose of a defect management system is to:',
    options: [
      'Track every defect from detection to closure with a full history',
      'Measure tester productivity',
      'Replace direct communication',
      'Store test cases',
    ],
    explanation:
      'The tracker is the single source of truth about defect status. Using it as a productivity scoreboard reliably corrupts the very data it holds.',
  },
  'JR-DMS-002': {
    text: 'In Jira, what is the difference between a workflow and an issue type?',
    options: [
      'The issue type says what it is; the workflow says which statuses it can move through',
      'They are the same thing',
      'Workflows apply to bugs only',
      'The issue type defines access rights',
    ],
    explanation:
      'A project can have several issue types sharing one workflow, or one type with a dedicated one. Confusing the two makes tracker configuration discussions endless.',
  },
  'JR-DMS-003': {
    text: 'Why should a defect be linked to the requirement or story it violates?',
    options: [
      'It enables impact analysis and coverage reporting',
      'Jira requires it',
      'It makes the fix faster',
      'It changes the severity',
    ],
    explanation:
      'Links turn a pile of tickets into a queryable model of product risk.',
  },
  'JR-DMS-004': {
    text: 'Which tracker metric is most misleading when used on its own?',
    options: [
      'Number of defects raised per tester',
      'Defect density per module',
      'Open defects by severity',
      'Average time to closure',
    ],
    explanation:
      'Counting reports per tester rewards volume over value and encourages splitting one defect into five tickets.',
  },

  // --- testing-levels --------------------------------------------------------
  'JR-LVL-001': {
    text: 'Integration testing focuses on:',
    options: [
      'The interfaces and interactions between components',
      'The internal logic of a single function',
      'The system as a whole against business requirements',
      'User acceptance of the product',
    ],
    explanation:
      'Integration testing targets the seams. Most integration defects are contract mismatches (format, order, timing, error handling) rather than logic errors.',
  },
  'JR-LVL-002': {
    text: 'Which test level do developers typically perform on their own code?',
    options: [
      'Component (unit) testing',
      'System testing',
      'Acceptance testing',
      'Operational acceptance testing',
    ],
    explanation:
      'Unit tests live next to the code, run in the pipeline, and are maintained by whoever changes that code.',
  },
  'JR-LVL-003': {
    text: 'System testing verifies:',
    options: [
      'The fully integrated system against the specified requirements',
      'A single class in isolation',
      'The database layer only',
      'Performance characteristics only',
    ],
    explanation:
      'System testing is the first level where the product is exercised end to end in an environment close to production.',
  },
  'JR-LVL-004': {
    text: 'Which of the following is a form of acceptance testing?',
    options: [
      'Operational acceptance testing (backup, restore, disaster recovery)',
      'Integration testing of components',
      'Unit testing',
      'Static analysis',
    ],
    explanation:
      'ISTQB lists user acceptance, operational acceptance, contractual and regulatory acceptance, plus alpha and beta testing as forms of acceptance testing.',
  },
  'JR-LVL-005': {
    text: 'Stubs or mocks are typically needed at which test level?',
    options: [
      'Component and integration testing',
      'Acceptance testing',
      'Beta testing',
      'Usability testing',
    ],
    explanation:
      'Test doubles stand in for collaborators that are unavailable, slow or non-deterministic - by definition a concern of the lower levels.',
  },

  // --- oop-principles --------------------------------------------------------
  'JR-OOP-001': {
    text: 'Encapsulation means:',
    options: [
      'Internal state is hidden and reachable only through a defined interface',
      'One class inherits from another',
      'The same method behaves differently for different types',
      'Details are hidden behind an abstract concept',
    ],
    explanation:
      'Encapsulation is controlled access to state. Inheritance, polymorphism and abstraction are the other three pillars.',
  },
  'JR-OOP-002': {
    text: 'Polymorphism allows:',
    options: [
      'One interface to have different implementations',
      'A class to have private fields',
      'Code to compile faster',
      'Objects to be serialised',
    ],
    explanation:
      'This is the property that lets a Page Object framework drive WebPage and MobilePage through a single interface.',
  },
  'JR-OOP-003': {
    text: 'Why does a manual tester moving towards automation need to understand OOP?',
    options: [
      'Test frameworks are built from classes, inheritance and interfaces',
      'It is needed to write a bug report',
      'It speeds up manual execution',
      'It replaces test design techniques',
    ],
    explanation:
      'Page Objects, base test classes, fixtures and custom assertions are all straightforward OOP once the four pillars make sense.',
  },
  'JR-OOP-004': {
    text: 'Inheritance in a Page Object framework is most often used to:',
    options: [
      'Move behaviour shared by pages into a base class',
      'Duplicate locators across pages',
      'Avoid writing assertions',
      'Replace the test runner',
    ],
    explanation:
      'A BasePage usually carries the driver, the waits and the navigation helpers, and each concrete page extends it.',
  },

  // --- ci-systems ------------------------------------------------------------
  'JR-CI-001': {
    text: 'The core idea of continuous integration is that:',
    options: [
      'Changes are merged and verified automatically and frequently',
      'Code is deployed to production every hour',
      'Testers no longer run any manual tests',
      'Releases happen only at the end of the project',
    ],
    explanation:
      'CI is about frequent integration and fast feedback. Continuous delivery and deployment are separate, later steps.',
  },
  'JR-CI-002': {
    text: 'A test suite in CI fails occasionally with no code changes at all. The right first response is to:',
    options: [
      'Investigate and remove the cause of the instability, quarantining the test explicitly if needed',
      'Re-run the pipeline until it goes green',
      'Delete the test',
      'Ignore it while it fails less than 50% of the time',
    ],
    explanation:
      'A tolerated flaky test teaches the whole team to ignore red pipelines, which costs far more than the test itself.',
  },
  'JR-CI-003': {
    text: 'Which suite belongs to the fastest CI stage, the one that runs on every commit?',
    options: [
      'Unit tests and a short smoke suite',
      'The full regression suite',
      'Manual exploratory sessions',
      'Full load tests',
    ],
    explanation:
      'The first stage exists to fail fast. Long suites run later, on a schedule or before a release.',
  },
  'JR-CI-004': {
    text: 'What is an artefact in a CI pipeline?',
    options: [
      'A build output stored for later stages, such as a package or a report',
      'A defect found during the build',
      'A configuration error',
      'A test case',
    ],
    explanation:
      'Artefacts are what one stage passes to the next: binaries, containers, coverage and test reports.',
  },

  // --- databases -------------------------------------------------------------
  'JR-DB-001': {
    text: 'Which SQL query returns customers who have never placed an order?',
    options: [
      'SELECT c.* FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL',
      'SELECT c.* FROM customers c INNER JOIN orders o ON o.customer_id = c.id',
      'SELECT c.* FROM customers c, orders o WHERE c.id = o.customer_id',
      'SELECT c.* FROM customers c RIGHT JOIN orders o ON o.customer_id = c.id',
    ],
    explanation:
      'The LEFT JOIN keeps every customer; filtering on a NULL from the right side isolates those with no match. The other three all require an order to exist.',
  },
  'JR-DB-002': {
    text: 'What does a PRIMARY KEY guarantee?',
    options: [
      'Uniqueness and the absence of NULLs for a set of columns',
      'That the column is indexed alphabetically',
      'That values are consecutive',
      'That the column references another table',
    ],
    explanation:
      'Referencing another table is what a foreign key does. A primary key identifies a row uniquely and can never be NULL.',
  },
  'JR-DB-003': {
    text: 'The difference between DELETE and TRUNCATE is that:',
    options: [
      'DELETE removes rows one by one and can be filtered; TRUNCATE empties the whole table',
      'They are identical',
      'TRUNCATE can take a WHERE clause',
      'DELETE removes the table structure',
    ],
    explanation:
      'TRUNCATE is faster but cannot filter, is not rollback-able in many DBMSs, and resets identity counters. Removing the structure is what DROP does.',
  },
  'JR-DB-004': {
    text: 'What is the defining trait of a document-oriented NoSQL database such as MongoDB?',
    options: [
      'A flexible document schema instead of fixed relational tables',
      'Strict enforcement of foreign keys',
      'Support for SQL joins only',
      'Data must be in third normal form',
    ],
    explanation:
      'Document stores trade a rigid schema and joins for flexibility and horizontal scaling, which changes what a tester has to check about data consistency.',
  },
  'JR-DB-005': {
    text: 'Why should a tester be able to query the database directly?',
    options: [
      'To verify what the system actually stored, not only what the UI displays',
      'To fix data in production',
      'To replace API testing',
      'To make the UI faster',
    ],
    explanation:
      'The UI may show a cached or transformed value. Checking directly separates a display defect from a persistence defect.',
  },
  'JR-DB-006': {
    text: 'Which SQL clause filters rows AFTER aggregation?',
    options: ['HAVING', 'WHERE', 'ORDER BY', 'GROUP BY'],
    explanation:
      'WHERE filters rows before grouping, HAVING filters the aggregated groups. Using WHERE on an aggregate is the classic mistake.',
  },

  // --- web-app-architecture --------------------------------------------------
  'JR-ARCH-001': {
    text: 'In a classic three-tier web application, the tiers are:',
    options: [
      'Presentation, business logic and data',
      'HTML, CSS and JavaScript',
      'Frontend, backend and QA',
      'Development, staging and production',
    ],
    explanation:
      'The three-tier split is the mental model that lets a tester localise a defect to a layer before writing the report.',
  },
  'JR-ARCH-002': {
    text: 'What does a load balancer do?',
    options: [
      'Distributes incoming requests across several server instances',
      'Compresses images',
      'Caches database queries',
      'Encrypts passwords',
    ],
    explanation:
      'Load balancers also affect testing: sticky sessions, or the lack of them, explain a good many "I was randomly logged out" reports.',
  },
  'JR-ARCH-003': {
    text: 'A microservice architecture makes which testing activity noticeably harder?',
    options: [
      'End-to-end testing across service boundaries',
      'Unit testing',
      'Static analysis',
      'Code review',
    ],
    explanation:
      'Independent deployment multiplies the number of version combinations - which is exactly why contract testing became popular.',
  },
  'JR-ARCH-004': {
    text: 'A CDN in front of the application affects testing mainly because:',
    options: [
      'Cached content can mask a fresh deployment',
      'It changes the database schema',
      'It rewrites the business logic',
      'It removes the need for HTTPS',
    ],
    explanation:
      'Checking against a stale copy held by the CDN is a standard cause of false "the fix did not work" reports.',
  },
  'JR-ARCH-005': {
    text: 'Client-side rendering (SPA) versus server-side rendering matters to a tester because:',
    options: [
      'Content may appear after the initial HTML, so waits and SEO checks differ',
      'SPAs cannot be automated',
      'SSR pages contain no JavaScript',
      'SPAs never make network requests',
    ],
    explanation:
      'In an SPA the DOM is assembled after the page load - the root cause of most flakiness in naive automation.',
  },

  // --- rest-http -------------------------------------------------------------
  'JR-HTTP-001': {
    text: 'Which family of HTTP status codes indicates a client-side error?',
    options: ['4xx', '2xx', '3xx', '5xx'],
    explanation:
      '4xx means the request was wrong (syntax, authorisation, not found). 5xx means the server failed while handling a valid request.',
  },
  'JR-HTTP-002': {
    text: 'What is the difference between 401 and 403?',
    options: [
      '401 - not authenticated; 403 - authenticated but not permitted',
      'They are interchangeable',
      '401 is a server error',
      '403 means the resource does not exist',
    ],
    explanation:
      'Returning 401 where 403 belongs is a real API defect: it tells the client to re-authenticate, which will never help.',
  },
  'JR-HTTP-003': {
    text: 'Which HTTP method is required to be idempotent?',
    options: ['PUT', 'POST', 'PATCH is always idempotent', 'None of them'],
    explanation:
      'GET, PUT and DELETE are idempotent: repeating them leaves the same state. POST is not, and PATCH is only if it was implemented that way.',
  },
  'JR-HTTP-004': {
    text: 'A POST that has successfully created a resource should normally return:',
    options: [
      '201 Created with a Location header',
      '200 OK with an empty body',
      '204 No Content',
      '302 Found',
    ],
    explanation:
      '201 plus Location tells the client both that creation succeeded and where the new resource lives.',
  },
  'JR-HTTP-005': {
    text: 'What does the header "Content-Type: application/json" tell the server?',
    options: [
      'The request body is JSON and should be parsed as such',
      'The response must be in JSON',
      'The connection is encrypted',
      'The request may be cached',
    ],
    explanation:
      'What the client wants back is stated by Accept; Content-Type describes what is being sent.',
  },
  'JR-HTTP-006': {
    text: 'HTTPS differs from HTTP in that it:',
    options: [
      'Encrypts traffic with TLS and authenticates the server certificate',
      'Is faster',
      'Uses a different dialect of HTML',
      'Does not use cookies',
    ],
    explanation:
      'HTTPS provides confidentiality, integrity and server authentication. Testing it covers certificate validity, the chain, and mixed-content checks.',
  },
  'JR-HTTP-007': {
    text: 'Which status code is correct when a request is syntactically valid but fails business validation?',
    options: [
      '422 Unprocessable Content (or 400 Bad Request)',
      '500 Internal Server Error',
      '404 Not Found',
      '204 No Content',
    ],
    explanation:
      'Returning 500 for a validation failure hides a client error behind a server-failure code and pollutes error monitoring.',
  },

  // --- story-verification ----------------------------------------------------
  'JR-STORY-001': {
    text: 'A story has five acceptance criteria. Four pass, one does not. The story should be:',
    options: [
      'Sent back to development as not done',
      'Accepted with a follow-up ticket',
      'Accepted, because 80% passed',
      'Accepted if the failing criterion is cosmetic',
    ],
    explanation:
      'Acceptance criteria are a conjunction, not a score. Partial acceptance quietly redefines done for the whole team.',
  },
  'JR-STORY-002': {
    text: 'While verifying a story you find behaviour that no acceptance criterion covers. You should:',
    options: [
      'Raise the gap with the product owner before deciding whether it is a defect',
      'Log a defect immediately',
      'Ignore it',
      'Change the acceptance criteria yourself',
    ],
    explanation:
      'Uncovered behaviour is first of all a requirements gap. Whether it becomes a defect depends on the intent, which the product owner knows.',
  },
  'JR-STORY-003': {
    text: 'Verifying "strictly against the acceptance criteria" means the tester:',
    options: [
      'Explicitly checks every criterion and records a result for each one',
      'Tests whatever looks risky',
      'Only runs the regression suite',
      'Relies on the developer’s demo',
    ],
    explanation:
      'Evidence per criterion is what makes acceptance auditable and stops "we thought that was covered" at release time.',
  },
  'JR-STORY-004': {
    text: 'The most appropriate moment to check acceptance criteria for testability is:',
    options: [
      'During refinement, before the story enters a sprint',
      'During the sprint review',
      'After the story has been coded',
      'At release',
    ],
    explanation:
      'Reviewing criteria at refinement is the cheapest defect prevention available to a tester.',
  },

  // --- rough-estimation ------------------------------------------------------
  'JR-EST-001': {
    text: 'A rough test estimate for a small story should account for:',
    options: [
      'Analysis, design, execution, defect reporting and retesting',
      'Execution time only',
      'Time to write test cases only',
      'Time to report defects only',
    ],
    explanation:
      'Estimates that count execution alone are consistently 2-3 times too low, because the long tail lives in reporting and retesting.',
  },
  'JR-EST-002': {
    text: 'You are asked to estimate a story whose requirements are still unclear. The professional answer is to:',
    options: [
      'Give a range with the assumptions stated, or ask for a timeboxed investigation first',
      'Give a single confident number',
      'Refuse to estimate',
      'Copy the estimate from a similar story',
    ],
    explanation:
      'A range conveys the uncertainty honestly. A single number invented from an unclear requirement becomes a commitment you never intended to make.',
  },
  'JR-EST-003': {
    text: 'Why must retesting and regression be included in a test estimate?',
    options: [
      'Defects will be found, fixed and need verification, and neighbouring areas need rechecking',
      'To inflate the estimate',
      'Because the customer asks for it',
      'Only on large projects',
    ],
    explanation:
      'Every defect found creates verification work later. An estimate that assumes zero defects assumes the testing was unnecessary.',
  },
  'JR-EST-004': {
    text: 'You have overrun your estimate halfway through a task. You should:',
    options: [
      'Report it straight away with the current status and a revised estimate',
      'Quietly work overtime',
      'Cut coverage without telling anyone',
      'Wait for the deadline and report it then',
    ],
    explanation:
      'An overrun is only a problem when it arrives as a surprise. Escalating early keeps everyone’s options open.',
  },

  // --- requirements-testing --------------------------------------------------
  'JR-REQ-001': {
    text: 'Which requirement defect is present in the statement "The system shall be user-friendly"?',
    options: [
      'It is not testable',
      'It is contradictory',
      'It is incomplete',
      'It is not traceable',
    ],
    explanation:
      'There is no test that would yield a pass or a fail. Testability is the first property a tester should check.',
  },
  'JR-REQ-002': {
    text: 'Two requirements state different maximum file sizes for the same upload. This is a defect of:',
    options: ['Consistency', 'Testability', 'Traceability', 'Feasibility'],
    explanation:
      'Contradictory requirements guarantee that one of them gets implemented and the other gets raised as a bug later.',
  },
  'JR-REQ-003': {
    text: 'Reviewing requirements before any code exists is valuable mainly because:',
    options: [
      'A defect removed there costs a fraction of the same defect in production',
      'It fills the tester’s time until a build appears',
      'ISO requires it',
      'It replaces system testing',
    ],
    explanation:
      'Static testing of requirements is the highest-return activity available to a tester, and it needs no environment.',
  },
  'JR-REQ-004': {
    text: 'A requirement says: "the report must load quickly for all users". The best tester response is to:',
    options: [
      'Ask for a measurable target: which percentile, what data volume, what network',
      'Accept it and test subjectively',
      'Reject the requirement outright',
      'Write a test case called "loads quickly"',
    ],
    explanation:
      'Turning a vague quality statement into a measurable one is requirements testing in its most practical form.',
  },

  // --- test-planning-tasks ---------------------------------------------------
  'JR-PLAN-001': {
    text: 'When planning the testing of a specific task, the first thing to determine is:',
    options: [
      'What the change affects and what risk it carries',
      'How many test cases to write',
      'Which tool to use',
      'Who will run the tests',
    ],
    explanation:
      'Scope and risk drive everything else. Picking a count or a tool first is planning backwards.',
  },
  'JR-PLAN-002': {
    text: 'You have two days to test a feature that would need five for full coverage. The right approach is to:',
    options: [
      'Prioritise by risk, name explicitly what will not be covered, and get that agreed',
      'Test everything superficially',
      'Test the first half thoroughly and stop',
      'Quietly move the deadline',
    ],
    explanation:
      'The output of a constrained plan is an explicit, agreed coverage gap rather than an implicit one nobody knows about.',
  },
  'JR-PLAN-003': {
    text: 'Which of the following is an entry criterion for starting test execution on a task?',
    options: [
      'The build is deployed to the test environment and smoke checks pass',
      'All defects are closed',
      'The test report is written',
      'The customer has signed off acceptance',
    ],
    explanation:
      'Entry criteria open execution, exit criteria close it. The remaining options all belong to the exit side.',
  },
  'JR-PLAN-004': {
    text: 'Test data preparation should be planned:',
    options: [
      'Together with test design, before execution starts',
      'During execution, as needed',
      'After execution',
      'Only for automated tests',
    ],
    explanation:
      'Data is one of the most common reasons execution gets blocked. Planning it late turns design time into idle time.',
  },
};
