import type { TranslationMap } from '../define.js';

/**
 * English side of the Trainee / Performance Review set.
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
export const traineePrEn: TranslationMap = {
  // --- test-artifacts -------------------------------------------------------
  'TR-ART-001': {
    text: 'Which artifact describes one specific check, with preconditions, steps and an expected result?',
    options: ['Test plan', 'Test case', 'Checklist', 'Test policy'],
    explanation:
      'A test case is the smallest executable unit of test documentation: preconditions, steps, test data and an expected result. A checklist only names what to check; a test plan describes how testing will be organised.',
  },
  'TR-ART-002': {
    text: 'What is the main difference between a checklist and a set of test cases?',
    options: [
      'A checklist lists what to check without spelling out the exact steps',
      'A checklist can only be used for regression',
      'A checklist must contain test data',
      'Only the test lead writes checklists',
    ],
    explanation:
      'A checklist is a lightweight list of check points. It trades step-by-step reproducibility for speed and flexibility, which is exactly why it suits exploratory and smoke testing.',
  },
  'TR-ART-003': {
    text: 'Which of the following is NOT part of a well-formed defect report?',
    options: [
      'Steps to reproduce',
      'Actual result',
      'Expected result',
      'The name of the developer who should fix it',
    ],
    explanation:
      'Assigning an owner is a workflow decision in the tracker, not a descriptive attribute of the defect. Naming the developer in the report itself is presumptuous and goes stale quickly.',
  },
  'TR-ART-004': {
    text: 'A test scenario differs from a test case mainly in that it:',
    options: [
      'Describes a user flow at a higher level, without exhaustive step detail',
      'Is always automated',
      'Contains no expected result at all',
      'Can only be executed once',
    ],
    explanation:
      'A test scenario covers an end-to-end flow ("a user registers and makes a first purchase"). The test cases inside it spell out the concrete steps.',
  },
  'TR-ART-005': {
    text: 'Which of the following belongs to the test plan rather than to a test case?',
    options: [
      'Entry and exit criteria for a test phase',
      'The specific value typed into the login field',
      'The expected HTTP response code',
      'A precondition that an account already exists',
    ],
    explanation:
      'Entry and exit criteria, scope, schedule, environments and risks live at the planning level. Concrete data and expected results live in test cases.',
  },
  'TR-ART-006': {
    text: 'Why is it worth having exactly one expected result per step in a test case?',
    options: [
      'So that a failure points unambiguously to the step that caused it',
      'Because tools cannot store more than one',
      'So the case stays shorter than one page',
      'Because ISTQB forbids more than one',
    ],
    explanation:
      'One assertion per step makes defect localisation cheap. When a step carries three expectations, a red result says almost nothing about what actually broke.',
  },

  // --- severity-priority ----------------------------------------------------
  'TR-SEV-001': {
    text: 'The company name is misspelled on the home page of a public marketing site. The best-founded classification is:',
    options: [
      'Low severity, high priority',
      'High severity, low priority',
      'High severity, high priority',
      'Low severity, low priority',
    ],
    explanation:
      'Nothing is functionally broken, so severity is low. But this is the most visible page of a brand-driven site and it has to be fixed first: priority is high.',
  },
  'TR-SEV-002': {
    text: 'Severity is most precisely defined as:',
    options: [
      'The degree of impact a defect has on the system or its users',
      'How quickly the defect has to be fixed',
      'How often the defect reproduces',
      'How long the fix will take',
    ],
    explanation:
      'Severity measures impact and is usually set by the tester. Priority measures the urgency of the fix and is set by the product owner or the manager.',
  },
  'TR-SEV-003': {
    text: 'The application crashes when the settings screen is opened, and fewer than 0.1% of users ever go there. A sensible classification:',
    options: [
      'High severity, low priority',
      'Low severity, high priority',
      'Low severity, low priority',
      'Severity and priority are always the same',
    ],
    explanation:
      'A crash is high severity by definition. Since the affected path is barely used, the business can reasonably defer the fix, so priority is low.',
  },
  'TR-SEV-004': {
    text: 'Who normally has the final say on the priority of a defect?',
    options: [
      'The product owner or the project manager',
      'The tester who found it',
      'The developer who will fix it',
      'A support agent',
    ],
    explanation:
      'Priority is a scheduling and business decision. The tester proposes it; whoever owns the backlog decides it.',
  },
  'TR-SEV-005': {
    text: 'Which statement about severity and priority is correct?',
    options: [
      'They are independent attributes, and any combination of them is possible',
      'High severity always means high priority',
      'Low priority always means low severity',
      'Filling in just one of the two is enough',
    ],
    explanation:
      'All four combinations occur in practice. Collapsing them into a single field loses the difference between "how bad" and "how urgent".',
  },
  'TR-SEV-006': {
    text: 'A typo in a message that only internal administrators ever see. Most likely:',
    options: [
      'Low severity, low priority',
      'High severity, high priority',
      'High severity, low priority',
      'Low severity, high priority',
    ],
    explanation:
      'Cosmetic, internal only, blocking nothing: low on both axes. It should still go into the tracker so it can join a batch copy-review task later.',
  },

  // --- defect-lifecycle -----------------------------------------------------
  'TR-LIFE-001': {
    text: 'Which status does a defect usually get when the developer states that the described behaviour is intended?',
    options: ['Rejected / Not a bug', 'Deferred', 'Duplicate', 'Reopened'],
    explanation:
      '"Not a bug" (or "Works as designed") means the behaviour matches the requirement. The right response is to challenge the requirement itself if you disagree with it, not to reopen the ticket unchanged.',
  },
  'TR-LIFE-002': {
    text: 'A defect in status Fixed does not pass verification. The tester should:',
    options: [
      'Reopen it with new evidence',
      'Raise a new defect and close the old one',
      'Close it and mention the problem in the daily report',
      'Assign it to a different developer',
    ],
    explanation:
      'Reopening keeps the history, the discussion and the original context in one place. Creating a duplicate breaks that chain.',
  },
  'TR-LIFE-003': {
    text: 'What does the status "Deferred" mean?',
    options: [
      'The defect is real, but its fix is postponed to a later release',
      'The defect could not be reproduced',
      'The defect duplicates an existing one',
      'The defect is fixed but not verified yet',
    ],
    explanation:
      'Deferred is a deliberate business decision to carry a known defect forward. That status should always come with a target release or a review date.',
  },
  'TR-LIFE-004': {
    text: 'Which status ends the lifecycle of a defect that has been fixed and successfully verified?',
    options: ['Closed', 'Resolved', 'Verified in progress', 'Assigned'],
    explanation:
      'The usual flow is New -> Assigned -> Fixed/Resolved -> Retested -> Closed. Only the tester should move a ticket to Closed.',
  },
  'TR-LIFE-005': {
    text: 'A developer cannot reproduce a defect. The most useful next step for the tester:',
    options: [
      'Add environment details, the build number, logs and a video',
      'Close the defect straight away',
      'Raise its severity',
      'Reassign it to another developer',
    ],
    explanation:
      'A defect that will not reproduce almost always means missing information. Supply the missing context first, and escalate only after that.',
  },
  'TR-LIFE-006': {
    text: 'What is a valid reason to mark a defect as Duplicate?',
    options: [
      'Another open report describes the same underlying behaviour',
      'The defect has low severity',
      'The defect was found by a junior',
      'The defect is hard to reproduce',
    ],
    explanation:
      'Duplicate means the same underlying defect is already being tracked. Link the two tickets so the history stays whole.',
  },

  // --- testing-types --------------------------------------------------------
  'TR-TYPE-001': {
    text: 'What is the most accurate description of smoke testing?',
    options: [
      'A shallow, broad check of whether the build is stable enough for further testing',
      'An exhaustive check of a single module',
      'Testing performed only by the customer',
      'Testing that measures response time under load',
    ],
    explanation:
      'Smoke testing answers one question: is this build worth spending a day on. It is broad and shallow by design.',
  },
  'TR-TYPE-002': {
    text: 'What is regression testing?',
    options: [
      'Re-running tests to make sure a change has not broken existing behaviour',
      'Checking that a fixed defect really is fixed',
      'Testing a system with no documentation at all',
      'Testing only the newest feature',
    ],
    explanation:
      'Regression testing protects behaviour that already worked. Checking a specific fix is retesting (confirmation testing), a different activity.',
  },
  'TR-TYPE-003': {
    text: 'Which pair separates functional from non-functional testing correctly?',
    options: [
      'Functional: what the system does. Non-functional: how well it does it',
      'Functional: manual. Non-functional: automated',
      'Functional: by testers. Non-functional: by developers',
      'Functional: before release. Non-functional: after release',
    ],
    explanation:
      'Functional testing checks behaviour against the requirements; non-functional testing checks quality characteristics: performance, usability, security, portability.',
  },
  'TR-TYPE-004': {
    text: 'Usability testing primarily evaluates:',
    options: [
      'How easily and efficiently real users achieve their goals',
      'How many defects there are per module',
      'Whether the code follows the style guide',
      'Whether the database schema is normalised',
    ],
    explanation:
      'Usability is a non-functional quality characteristic, measured on real users performing real tasks rather than by counting defects.',
  },
  'TR-TYPE-005': {
    text: 'Sanity testing differs from smoke testing in that it:',
    options: [
      'Is narrowly focused on the area that changed',
      'Always covers the whole application',
      'Is always automated',
      'Is run in production only',
    ],
    explanation:
      'Smoke is broad and shallow across the whole build; sanity is narrow and deeper, aimed at the area the change touched.',
  },
  'TR-TYPE-006': {
    text: 'Which of the following is a NON-functional test type?',
    options: ['Load testing', 'Integration testing', 'Retesting', 'Acceptance testing'],
    explanation:
      'Load testing measures behaviour under the expected volume - a quality characteristic. Integration and acceptance are test levels, and retesting is a purpose.',
  },
  'TR-TYPE-007': {
    text: 'Exploratory testing is characterised by the fact that:',
    options: [
      'Learning, test design and execution happen at the same time',
      'Only pre-written test cases are executed',
      'Only automated checks are run',
      'Testing is done with no goal and no time limit',
    ],
    explanation:
      'Exploratory testing is structured and accountable - normally broken into charters and time-boxed sessions. It simply designs the tests while running them.',
  },

  // --- test-design-techniques ------------------------------------------------
  'TR-TDT-001': {
    text: 'A field accepts integers from 1 to 100. Which set is correct for two-value boundary value analysis?',
    options: ['0, 1, 100, 101', '1, 50, 100', '0, 50, 101', '1, 2, 99, 100'],
    explanation:
      'The two-value approach takes each boundary and its nearest neighbour outside the partition: 0 and 1 at the lower edge, 100 and 101 at the upper one.',
  },
  'TR-TDT-002': {
    text: 'Equivalence partitioning assumes that:',
    options: [
      'All values in a partition are handled the same way, so one value stands for them all',
      'Every possible value has to be tested',
      'Only invalid values need to be checked',
      'Partitions always contain exactly ten values',
    ],
    explanation:
      'The technique cuts the number of tests by relying on an assumption that the partition is uniform. Boundary value analysis then attacks the edges, where that assumption breaks.',
  },
  'TR-TDT-003': {
    text: 'A discount applies if the customer is a loyalty programme member AND the basket total is over 100. Which technique covers the combinations of these conditions most directly?',
    options: [
      'Decision table',
      'Boundary value analysis',
      'Statement coverage',
      'Error guessing',
    ],
    explanation:
      'Decision tables enumerate combinations of conditions and the resulting actions - exactly the shape of a business rule with several inputs.',
  },
  'TR-TDT-004': {
    text: 'State transition testing is a natural fit when:',
    options: [
      'The behaviour of the system depends on what happened before',
      'The inputs are independent numeric ranges',
      'There is no specification at all',
      'Only performance matters',
    ],
    explanation:
      'The technique models states, events, transitions and actions, and it is the right tool wherever history changes behaviour: order status, session state, device modes.',
  },
  'TR-TDT-005': {
    text: 'Which technique relies primarily on the experience of the tester rather than on a formal model?',
    options: [
      'Error guessing',
      'Equivalence partitioning',
      'Decision tables',
      'State transition testing',
    ],
    explanation:
      'Error guessing is an experience-based technique. It complements specification-based techniques but does not replace them.',
  },
  'TR-TDT-006': {
    text: 'A registration form has 6 optional checkboxes. Checking every combination means 64 cases. A pragmatic technique to cut that down:',
    options: [
      'Pairwise (all-pairs) testing',
      'Check every combination anyway',
      'Check the default state only',
      'Statement coverage',
    ],
    explanation:
      'Pairwise testing covers every pair of parameter values in a small number of cases, relying on the empirical observation that most combinatorial defects involve only two factors.',
  },
  'TR-TDT-007': {
    text: 'An age field accepts values from 18 to 65 inclusive. Which value represents the valid equivalence partition?',
    options: ['30', '17', '66', '-1'],
    explanation:
      '30 sits inside the valid partition. 17, 66 and -1 all belong to invalid partitions.',
  },

  // --- news-trends ----------------------------------------------------------
  'TR-NEWS-001': {
    text: 'Which source is the most reliable for the definition of a testing term?',
    options: [
      'The ISTQB Glossary',
      'The first search result on the internet',
      'What a colleague remembers',
      'A vendor marketing page',
    ],
    explanation:
      'The ISTQB Glossary is a maintained, versioned reference that the industry genuinely agrees on. Vendor pages define terms so that they fit the product.',
  },
  'TR-NEWS-002': {
    text: 'The team is offered a new tool. The most professional first step:',
    options: [
      'Run a small time-boxed pilot on real work and compare it with the current tool',
      'Adopt it because it is popular',
      'Reject it because the current tool works',
      'Wait until the customer asks for it',
    ],
    explanation:
      'A time-boxed pilot produces evidence. Blind adoption and blind refusal both substitute opinion for evidence in exactly the same way.',
  },
  'TR-NEWS-003': {
    text: 'Which of the following is a recognised vendor-independent certification scheme for testers?',
    options: ['ISTQB', 'AWS Certified Developer', 'PMP', 'CCNA'],
    explanation:
      'ISTQB is an international, vendor-independent certification body for software testing. The others certify cloud, project management and networking respectively.',
  },
  'TR-NEWS-004': {
    text: 'Keeping up with trends is part of the Performance Review because:',
    options: [
      'Testing practices and tools change, and an outdated practice quietly lowers quality',
      'Certificates are collected for the sake of certificates',
      'Managers need something to measure',
      'It replaces hands-on experience',
    ],
    explanation:
      'This competency exists to keep practice current. It is assessed by what the tester brings back to the team, not by how many articles were read.',
  },
  'TR-NEWS-005': {
    text: 'You read that some technique guarantees "100% bug-free software". The right professional reaction:',
    options: [
      'Treat the claim as false: exhaustive testing is impossible',
      'Put the technique to work immediately',
      'Forward it to the customer',
      'Add it to the test plan as a goal',
    ],
    explanation:
      'One of the seven testing principles states that exhaustive testing is impossible, so testing cannot prove the absence of defects.',
  },

  // --- html-css -------------------------------------------------------------
  'TR-HTML-001': {
    text: 'Which HTML attribute do automated tests most often use to locate an element reliably?',
    options: [
      'A dedicated data-testid attribute',
      'The class attribute',
      'The inline style attribute',
      'The title attribute',
    ],
    explanation:
      'Classes and styles change with every redesign. A dedicated test identifier is stable by agreement - which is exactly why teams add it for automation.',
  },
  'TR-HTML-002': {
    text: 'What does the CSS selector ".btn.primary" match?',
    options: [
      'Elements that carry both the btn and primary classes',
      'Elements with class btn inside elements with class primary',
      'Elements with either of those classes',
      'The element with id btn and class primary',
    ],
    explanation:
      'Chained classes with no space mean "all of these classes on one element". A space would express a descendant relationship instead.',
  },
  'TR-HTML-003': {
    text: 'Which option is semantically correct for a clickable navigation link?',
    options: ['<a href="...">', '<div onclick="...">', '<span role="link">', '<button href="...">'],
    explanation:
      'An <a> with href is focusable, keyboard-operable and announced as a link by screen readers, all for free. The rest do that badly or not at all.',
  },
  'TR-HTML-004': {
    text: 'The alt attribute on <img> exists primarily to:',
    options: [
      'Describe the image for assistive technology and for when it fails to load',
      'Improve the resolution of the image',
      'Set the width of the image',
      'Cache the image',
    ],
    explanation:
      'alt is about accessibility and resilience. A missing or meaningless alt is a real accessibility defect and worth reporting.',
  },
  'TR-HTML-005': {
    text: 'Which CSS property would you check first when an element is present in the DOM but not visible on screen?',
    options: ['display / visibility / opacity', 'font-family', 'cursor', 'letter-spacing'],
    explanation:
      'display:none, visibility:hidden and opacity:0 are the three usual causes. They behave differently for automation: display:none removes the element from the layout entirely.',
  },
  'TR-HTML-006': {
    text: 'What is the difference between id and class in HTML?',
    options: [
      'An id has to be unique in the document, a class may repeat',
      'A class has to be unique, an id may repeat',
      'Both have to be unique',
      'Neither has a uniqueness rule',
    ],
    explanation:
      'Duplicate ids are invalid HTML and a common source of flaky locators, because tools then pick the first occurrence non-deterministically.',
  },

  // --- mobile-platforms -----------------------------------------------------
  'TR-MOB-001': {
    text: 'Which file format is the installation package for an Android application?',
    options: ['.apk (or .aab for distribution)', '.ipa', '.exe', '.dmg'],
    explanation:
      'APK is the Android package; AAB is the publishing format Google Play expects. IPA is the iOS equivalent.',
  },
  'TR-MOB-002': {
    text: 'What is the most accurate description of a hybrid mobile application?',
    options: [
      'A web application wrapped in a native shell',
      'An application written twice, once for each platform',
      'An application that only works offline',
      'An application distributed outside the stores',
    ],
    explanation:
      'Hybrid apps render web content inside a native container (a WebView), which is why they often carry the same UI defects as the mobile web version.',
  },
  'TR-MOB-003': {
    text: 'Which check is specific to mobile testing and has no direct desktop equivalent?',
    options: [
      'Behaviour during an incoming call or a push notification',
      'Checking an error message',
      'Checking a mandatory field',
      'Validating a date format',
    ],
    explanation:
      'Interrupt testing - calls, notifications, low battery, network switches, backgrounding - is a mobile-specific category born of the platform lifecycle.',
  },
  'TR-MOB-004': {
    text: 'Why does it matter to a mobile tester that the application gets sent to the background?',
    options: [
      'The OS may kill or restore the process, and unsaved state is often lost',
      'Backgrounding is impossible on modern phones',
      'It only affects battery consumption',
      'It only matters for games',
    ],
    explanation:
      'Both Android and iOS reclaim memory from backgrounded apps. State restoration defects are among the most common and the most visible to users.',
  },
  'TR-MOB-005': {
    text: 'Device fragmentation is a bigger problem on Android than on iOS mainly because:',
    options: [
      'Many manufacturers ship many OS versions, screen sizes and custom skins',
      'Android has no emulators',
      'iOS apps are never updated',
      'Android does not support automation',
    ],
    explanation:
      'The matrix of combinations on Android is far larger - which is why device clouds and a prioritised device list matter.',
  },
  'TR-MOB-006': {
    text: 'Which is a purely mobile non-functional requirement?',
    options: [
      'Battery and mobile data consumption',
      'Response time',
      'Security',
      'Accessibility',
    ],
    explanation:
      'The other three matter everywhere. Battery drain and cellular data usage are constraints specific to a device a person carries around.',
  },

  // --- browser-architecture -------------------------------------------------
  'TR-BROW-001': {
    text: 'What is the practical difference between localStorage and sessionStorage?',
    options: [
      'sessionStorage is cleared when the tab is closed, localStorage persists',
      'localStorage is sent with every request',
      'sessionStorage is shared across all tabs',
      'localStorage has no size limit',
    ],
    explanation:
      'Both are key/value stores scoped to an origin. The difference is scope: sessionStorage lives within a tab and dies with it, localStorage survives a restart.',
  },
  'TR-BROW-002': {
    text: 'Which storage mechanism is automatically attached to every matching HTTP request?',
    options: ['Cookies', 'localStorage', 'sessionStorage', 'IndexedDB'],
    explanation:
      'Only cookies are sent by the browser automatically - which is why they carry session tokens and why CSRF exists at all.',
  },
  'TR-BROW-003': {
    text: 'The HttpOnly flag on a cookie means that:',
    options: [
      'JavaScript cannot read that cookie',
      'The cookie travels over HTTP only, never over HTTPS',
      'The cookie never expires',
      'The cookie is shared across domains',
    ],
    explanation:
      'HttpOnly keeps the cookie out of document.cookie, which weakens token theft via cross-site scripting. Requiring HTTPS is a different flag - Secure.',
  },
  'TR-BROW-004': {
    text: 'A hard refresh (Ctrl+Shift+R) differs from a normal one in that it:',
    options: [
      'Bypasses the browser cache and reloads the resources',
      'Clears all cookies',
      'Restarts the browser',
      'Opens the page in a new tab',
    ],
    explanation:
      'A hard refresh ignores cached resources. It is the first thing to try when a fix is deployed but the old bundle is still being served.',
  },
  'TR-BROW-005': {
    text: 'Which devtools tab do you open first to check whether the front end actually sent a request and what came back?',
    options: ['Network', 'Elements', 'Console', 'Sources'],
    explanation:
      'The Network tab shows the request, its headers, body, status and timings - the fastest way to decide whether a defect is front-end or back-end.',
  },
  'TR-BROW-006': {
    text: 'The DOM is:',
    options: [
      'An in-memory tree the browser builds from the HTML and that scripts can change',
      'The HTML file stored on the server',
      'The set of CSS rules on the page',
      "The browser's network cache",
    ],
    explanation:
      'Because the DOM is live, what you see in the Elements panel can differ from the served HTML. That gap explains many reports along the lines of "the markup is right but the page is not".',
  },

  // --- defect-reports-en ----------------------------------------------------
  'TR-REP-001': {
    text: 'Which English defect report title is the most useful?',
    options: [
      'Checkout: order total ignores the applied promo code on Safari 17',
      'Bug in checkout',
      'It does not work!!!',
      'Please fix urgently, customer is angry',
    ],
    explanation:
      'A good title names the area, the observed behaviour and, where it matters, the condition. It should be readable and searchable without opening the ticket.',
  },
  'TR-REP-002': {
    text: 'Above all, a defect report should let the reader answer one question:',
    options: [
      'How do I reproduce this?',
      'Who is to blame?',
      'How long will the fix take?',
      'Which sprint is this in?',
    ],
    explanation:
      'Reproducibility is the core value of a report. Everything else is metadata that can be added later.',
  },
  'TR-REP-003': {
    text: 'Which line is the better fit for "Actual result"?',
    options: [
      'The page returns HTTP 500 and no order is created',
      'The page is broken',
      'Nothing happens, probably a back-end issue',
      'Same as yesterday',
    ],
    explanation:
      'The actual result has to be observable and specific. A diagnosis ("probably back-end") is a hypothesis rather than an observation, and it belongs in a comment.',
  },
  'TR-REP-004': {
    text: 'Why should environment details (build, OS, browser, device) always be in the report?',
    options: [
      'Many defects reproduce only on one specific combination',
      'To make the report longer',
      'Because the tracker demands it',
      'To prove that the tester did the work',
    ],
    explanation:
      'The environment is often the difference between "cannot reproduce" and a fix within the hour.',
  },
  'TR-REP-005': {
    text: 'Which evidence is best to attach to a UI defect that only shows up now and then?',
    options: [
      'A screen recording together with console and network logs',
      'A single screenshot',
      'A description in words',
      'Just the test case id',
    ],
    explanation:
      'Intermittent defects need context over time. A recording alongside the logs lets the developer line up what was seen with what the system was doing.',
  },
  'TR-REP-006': {
    text: 'What makes a defect report harder rather than easier to work with?',
    options: [
      'Describing three unrelated problems in one ticket',
      'Numbering the steps to reproduce',
      'Stating the expected result explicitly',
      'Including the build number',
    ],
    explanation:
      'One defect, one report. Merged tickets cannot be assigned, prioritised, fixed and closed independently.',
  },

  // --- test-execution -------------------------------------------------------
  'TR-EXEC-001': {
    text: 'While running an existing test case the actual result differs from the expected one, but you believe the expected result is out of date. You:',
    options: [
      'Mark the case Failed and raise the question with the analyst or the product owner',
      'Quietly mark it Passed',
      'Edit the expected result yourself and mark it Passed',
      'Skip the case',
    ],
    explanation:
      'Never change the oracle on the quiet. Record the observation, then clarify the requirement; if it really did change, the case is updated deliberately and traceably.',
  },
  'TR-EXEC-002': {
    text: 'A test case gets the status Blocked when:',
    options: [
      'It cannot be run because of an external obstacle, such as a broken environment',
      'It fails on the last step',
      'It takes longer than estimated',
      'It has no test data',
    ],
    explanation:
      'Blocked is different from Failed: the case never got the chance to return a verdict. Mixing the two statuses corrupts the pass rate.',
  },
  'TR-EXEC-003': {
    text: 'What should a tester do before starting execution on a new build?',
    options: [
      'Confirm the build number and the environment, then run the smoke checks',
      'Start the longest test suite right away',
      'Close all previous defects',
      'Rewrite the test cases',
    ],
    explanation:
      'Checking what exactly you are testing, and whether it is stable enough, saves a whole day of results attributed to the wrong build.',
  },
  'TR-EXEC-004': {
    text: 'During execution you spot a defect outside the current test case. You:',
    options: [
      'Raise a separate defect report and carry on with the case',
      'Ignore it, because it is out of scope',
      'Stop and rewrite the test suite',
      'Mark the current case as Failed',
    ],
    explanation:
      'Observations outside the current case are valuable all the same. File them separately so the current case keeps an honest verdict.',
  },
  'TR-EXEC-005': {
    text: 'Test execution results should be recorded:',
    options: [
      'Immediately, case by case, with evidence for the failures',
      'At the end of the sprint, from memory',
      'Only when everything passes',
      'Only for automated tests',
    ],
    explanation:
      'Results written down later are results reconstructed from memory, and reconstruction loses exactly the details that make a failure diagnosable.',
  },
  'TR-EXEC-006': {
    text: "A test case passes on your machine and fails on a colleague's. What do you compare first?",
    options: [
      'The environment, the build and the test data',
      'Personal preferences',
      'Typing speed',
      'Screen resolution alone',
    ],
    explanation:
      'The environment, the build version and the state of the data explain the overwhelming majority of "works on my machine" cases.',
  },

  // --- daily-reports --------------------------------------------------------
  'TR-DAY-001': {
    text: 'The most useful daily report from a tester contains:',
    options: [
      'What was tested, the results, the blockers and what comes next',
      'The number of hours worked',
      'A list of every open defect on the project',
      'A copy of the test plan',
    ],
    explanation:
      'A status report exists so that somebody can take a decision. Progress, results, blockers and the next step are precisely what a decision needs.',
  },
  'TR-DAY-002': {
    text: 'A broken test environment is blocking you. When should that appear in a report?',
    options: [
      'Immediately, as soon as it blocked you',
      'In the weekly summary',
      'Only if it lasts more than two days',
      'Only if the manager asks',
    ],
    explanation:
      'Blockers lose their value with delay. Reporting on Friday one that started on Monday means four project days are already gone.',
  },
  'TR-DAY-003': {
    text: 'Which sentence belongs in a status report rather than in a defect report?',
    options: [
      'Smoke suite executed on build 1.4.2: 28 passed, 2 failed, 1 blocked',
      'Steps to reproduce: 1. Open the cart...',
      'Expected result: the total is recalculated',
      'Severity: Major',
    ],
    explanation:
      'Aggregated progress goes in the status report; per-defect detail goes in the tracker. Duplicating both guarantees they will drift apart.',
  },
  'TR-DAY-004': {
    text: 'A monthly report for management is best written:',
    options: [
      "In terms of product quality and risk, not as a list of the tester's activities",
      'As a list of every test case executed',
      'As the daily reports glued together',
      'As a plain list with no numbers at all',
    ],
    explanation:
      'The reader of that report is deciding about the product. An activity log answers a question they never asked.',
  },
  'TR-DAY-005': {
    text: 'The line "today I tested the application" is weak mainly because:',
    options: [
      'It names neither the scope, nor the result, nor the risk',
      'It is too short',
      'It is in the wrong tense',
      'It does not mention the tool',
    ],
    explanation:
      'That sentence cannot support any decision. Scope, result and risk are the minimum content of a useful status line.',
  },

  // --- test-documentation ---------------------------------------------------
  'TR-DOC-001': {
    text: 'What is the most accurate description of a good test case?',
    options: [
      'Independent, repeatable and unambiguous',
      'As long as possible',
      'Written for automation only',
      'Dependent on the previous case',
    ],
    explanation:
      'Independence is what lets cases be reordered, run in parallel and handed to someone who did not write them.',
  },
  'TR-DOC-002': {
    text: 'What is traceability in test documentation?',
    options: [
      'A recorded link between requirements and the tests that cover them',
      'Sequential numbering of test cases',
      'Keeping the documents in a single folder',
      'Keeping a change log for the test plan',
    ],
    explanation:
      'Traceability is what lets you answer "is this requirement covered?" and "what has to be retested if the requirement changes?".',
  },
  'TR-DOC-003': {
    text: 'A mind map is a good choice for test documentation when:',
    options: [
      'You need to explore and communicate coverage quickly, early on',
      'An auditor needs step-by-step reproducibility',
      'You need to store execution results',
      'You need to run the tests automatically',
    ],
    explanation:
      'Mind maps are excellent for structure and for a conversation about coverage. They are a poor substitute wherever detailed documented steps with evidence are contractually required.',
  },
  'TR-DOC-004': {
    text: 'Which argument is the strongest case for short test cases?',
    options: [
      'A short case fails for one understandable reason',
      'A short case is quicker to type',
      'A short case needs no review',
      'A short case can do without an expected result',
    ],
    explanation:
      'The goal is diagnosability. A 40-step case that failed says almost nothing about where the product actually broke.',
  },
  'TR-DOC-005': {
    text: 'Preconditions in a test case exist in order to:',
    options: [
      'State the system and data state required before step 1',
      'List the defects found earlier',
      'Name the author',
      'Record the execution date',
    ],
    explanation:
      'Preconditions are what make a case reproducible for someone who is not you, on a machine that is not yours.',
  },
  'TR-DOC-006': {
    text: 'Test documentation that has never been updated since the first release is:',
    options: [
      'A liability, because it reports coverage the product no longer has',
      'Still a fully valuable asset',
      'Only a minor problem',
      'Even better, because it is stable',
    ],
    explanation:
      'Stale documentation is worse than none: it gives confident and wrong answers about coverage.',
  },

  // --- english-reading ------------------------------------------------------
  'TR-ENG-001': {
    text: 'A requirement reads: "The system shall lock the account after three consecutive failed login attempts." Which test follows from it directly?',
    options: [
      'Enter wrong credentials three times in a row and check that the account is locked',
      'Get it wrong twice and check the warning email',
      'Log in successfully and check the session duration',
      'Check that the password reset link expires',
    ],
    explanation:
      '"Shall" marks a mandatory requirement. The condition (three consecutive failures) and the consequence (locking) map straight onto a single test.',
  },
  'TR-ENG-002': {
    text: 'In requirements written in English, the word "should" usually means:',
    options: [
      'A recommendation rather than a mandatory requirement',
      'A mandatory requirement',
      'A defect',
      'Deprecated functionality',
    ],
    explanation:
      'In the RFC 2119 style, "shall"/"must" are mandatory while "should" is recommended. That distinction decides whether a deviation is a defect at all.',
  },
  'TR-ENG-003': {
    text: 'A ticket says "Expected: the modal is dismissed on Esc". Here the word "dismissed" means:',
    options: ['Closed', 'Disabled', 'Rejected by the server', 'Sent to the background'],
    explanation:
      'In interface vocabulary, to dismiss a modal means to close it without completing the action.',
  },
  'TR-ENG-004': {
    text: 'Release notes say a feature is "deprecated". The correct reading:',
    options: [
      'It still works, but its use is discouraged and it will be removed later',
      'It has already been removed',
      'It is broken',
      'It has just been added',
    ],
    explanation:
      'Deprecated means removal is planned. Tests should keep covering it, and the removal date is worth tracking.',
  },
  'TR-ENG-005': {
    text: 'A specification says a value is "mandatory unless the user is a guest". Which case has to be in your set?',
    options: [
      'A guest, for whom the value may be empty',
      'Only a registered user with the value filled in',
      'Only an empty value for every user',
      'No separate case is needed',
    ],
    explanation:
      'The "unless" clause defines a second equivalence partition. Testing only the main condition leaves half of the rule uncovered.',
  },
};
