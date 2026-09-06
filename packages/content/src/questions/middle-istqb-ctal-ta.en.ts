import type { TranslationMap } from '../define.js';

/**
 * English side of the Middle / ISTQB Advanced Test Analyst set.
 *
 * Same syllabus as `senior-istqb-ctal-ta.en.ts`, one level lower, so the
 * terminology here is kept word-for-word consistent with that file: risk
 * assessment, test basis, defect taxonomy, pairwise testing, fault tolerance.
 *
 * Same rules as the rest of the bank's translations: standard ISTQB English
 * terminology rather than a literal rendering of the Ukrainian, option order
 * untouched (correctness is stored as an index), distractors kept wrong for the
 * same reason they were wrong in Ukrainian, and explanations kept over the 40
 * character floor the bank test enforces in both languages.
 */
export const middleCtalTaEn: TranslationMap = {
  // --- The test process for a Test Analyst ----------------------------------
  'TA-P-001': {
    text: 'During test analysis a Test Analyst defines test conditions. The best source when the requirements are incomplete:',
    options: [
      'A combination of stakeholders, existing systems and experience-based techniques',
      'Guesses about what the developer implemented',
      'The defect tracker alone',
      'Test cases from a previous project',
    ],
    explanation:
      'CTAL-TA expects the analyst to work with an imperfect test basis by combining the available sources, rather than waiting for perfect requirements.',
  },
  'TA-P-002': {
    text: 'Which factor most influences the level of detail of the test conditions?',
    options: [
      'The level of risk and whether the tests are meant to be reused',
      'The number of testers',
      'The tool licence',
      'The length of the sprint',
    ],
    explanation:
      'High-risk, reusable and auditable tests justify the detail. A low-risk one-off investigation does not.',
  },
  'TA-P-003': {
    text: 'Low-level (concrete) test cases are preferable to high-level (logical) ones when:',
    options: [
      'The testers are less experienced, or the results have to be auditable and reproducible',
      'The requirements change daily',
      'There is very little time',
      'The system is exploratory by nature',
    ],
    explanation:
      'Concrete cases cost more to maintain, but they survive execution by someone who does not know the system.',
  },
  'TA-P-004': {
    text: 'A Test Analyst notices that the test basis is untestable in several places. The correct action:',
    options: [
      'Raise these as test basis defects before test design starts',
      'Design the tests anyway and interpret it freely',
      'Wait for the code and test against it',
      'Escalate straight to the customer',
    ],
    explanation:
      'Reporting test basis defects is one of the analyst’s most valuable activities, and it has to happen before the cost of design is incurred.',
  },

  // --- Risk-based testing for a Test Analyst --------------------------------
  'TA-R-001': {
    text: 'In risk-based testing, a Test Analyst normally contributes primarily to:',
    options: [
      'Identifying and assessing product risks from the business and user perspective',
      'Setting the project budget',
      'Assigning developers to modules',
      'Choosing the CI server',
    ],
    explanation:
      'The Test Manager owns the process; the Test Analyst supplies the domain judgement about likelihood and impact.',
  },
  'TA-R-002': {
    text: 'How is the response to a high-impact, low-likelihood risk best described?',
    options: [
      'Targeted deep testing of that very area, despite how rarely it occurs',
      'Ignoring it, because it is unlikely',
      'Spreading coverage evenly across all areas',
      'Deferring it to production monitoring',
    ],
    explanation:
      'When the consequence is unacceptable, impact dominates - so rare catastrophic paths still get tests of their own.',
  },
  'TA-R-003': {
    text: 'Risk levels should be reassessed:',
    options: [
      'Throughout the project, as new information arrives',
      'Once, at the start',
      'Only after a production incident',
      'Only when the customer asks',
    ],
    explanation:
      'A risk register written once and never revisited becomes a historical document rather than a planning instrument.',
  },

  // --- Test techniques ------------------------------------------------------
  'TA-T-001': {
    text: 'Classification tree analysis is most closely related to which other technique?',
    options: [
      'Equivalence partitioning combined with combinatorial testing',
      'Statement coverage',
      'State transition testing',
      'Error guessing',
    ],
    explanation:
      'The tree structures the input space into partitions, and the combination table then selects which combinations will actually be executed.',
  },
  'TA-T-002': {
    text: 'Pairwise testing is justified by the empirical observation that:',
    options: [
      'Most combinatorial defects are caused by the interaction of only two parameters',
      'All defects are single-parameter',
      'Exhaustive combinations are cheap',
      'Parameters never interact',
    ],
    explanation:
      'Pairwise testing gives a large reduction in the number of tests for a small loss of theoretical coverage - the classic risk-weighted trade-off.',
  },
  'TA-T-003': {
    text: 'Domain analysis extends boundary value analysis and equivalence partitioning by:',
    options: [
      'Handling combinations of interdependent variables through on/off/in/out points',
      'Removing the need for boundaries',
      'Testing only invalid values',
      'Working with a single variable only',
    ],
    explanation:
      'Domain analysis is the technique to reach for when two or more numeric fields constrain each other.',
  },
  'TA-T-004': {
    text: 'A use case based test is derived from:',
    options: [
      'The main flow plus the alternative and exception flows',
      'The database schema',
      'The branches of the source code',
      'Defect history alone',
    ],
    explanation:
      'Use case testing is good at finding integration and workflow defects, because it follows how the system is actually used.',
  },
  'TA-T-005': {
    text: 'A state transition table is particularly good at revealing:',
    options: [
      'Invalid transitions the specification never even mentioned',
      'Performance bottlenecks',
      'Memory leaks',
      'Coding standard violations',
    ],
    explanation:
      'The table forces every state/event pair to be considered, including the ones the specification silently ignored.',
  },
  'TA-T-006': {
    text: 'Defect-based test design techniques use:',
    options: [
      'A defect taxonomy to derive tests for known defect types',
      'The structure of the code',
      'A state model',
      'A performance profile',
    ],
    explanation:
      'A taxonomy built from your own history of escaped defects is one of the most productive sources for test design.',
  },
  'TA-T-007': {
    text: 'Checklist-based testing is an experience-based technique whose main weakness is:',
    options: [
      'Coverage depends on the tester, and checklists go stale',
      'It cannot be documented',
      'It is too slow',
      'It requires the source code',
    ],
    explanation:
      'Checklists have to be maintained from real findings, otherwise they encode the risks of three years ago.',
  },
  'TA-T-008': {
    text: 'In session-based test management, a charter defines:',
    options: [
      'The mission and scope of a time-boxed exploratory session',
      'The exact steps to execute',
      'The expected results in advance',
      'The defect severity scale',
    ],
    explanation:
      'A charter makes exploratory testing plannable and reportable without turning it into scripted testing.',
  },
  'TA-T-009': {
    text: 'A system has 4 boolean configuration flags and 3 user roles. Full combinatorial coverage is 48 cases. Pairwise would need roughly:',
    options: ['Fewer than 15', 'Exactly 48', 'Exactly 24', 'More than 48'],
    explanation:
      'Pairwise usually compresses spaces like this by an order of magnitude, while still covering every pair of values at least once.',
  },
  'TA-T-010': {
    text: 'When should a Test Analyst combine several techniques on one feature?',
    options: [
      'When the feature has both complex business rules and state-dependent behaviour',
      'Never - one technique per feature',
      'Only when time allows',
      'Only for automated tests',
    ],
    explanation:
      'Decision tables cover the rules, state transitions cover the history, boundary analysis covers the numeric edges. They complement each other rather than replace each other.',
  },

  // --- Testing quality characteristics --------------------------------------
  'TA-Q-001': {
    text: 'Functional appropriateness as a quality sub-characteristic is about:',
    options: [
      'Whether the functions help the user accomplish their task',
      'Whether a function returns the correct value',
      'Whether all the specified functions are present',
      'Whether the system is fast',
    ],
    explanation:
      'ISO 25010 splits functional suitability into completeness (everything is present), correctness (right results) and appropriateness (it genuinely helps the task).',
  },
  'TA-Q-002': {
    text: 'Usability testing that measures whether the user can complete the task at all assesses:',
    options: ['Effectiveness', 'Efficiency', 'Satisfaction', 'Learnability'],
    explanation:
      'Effectiveness = could they complete it; efficiency = at what cost in time and effort; satisfaction = how it felt.',
  },
  'TA-Q-003': {
    text: 'Which portability sub-characteristic is relevant to a Test Analyst?',
    options: ['Installability', 'Maturity', 'Time behaviour', 'Confidentiality'],
    explanation:
      'Portability covers adaptability, installability and replaceability. Maturity belongs to reliability, time behaviour to performance efficiency, confidentiality to security.',
  },
  'TA-Q-004': {
    text: 'Compatibility testing in ISO 25010 covers:',
    options: [
      'Co-existence with other software and interoperability with other systems',
      'Response time under load',
      'Fault tolerance',
      'Code readability',
    ],
    explanation:
      'Co-existence defects (two applications fighting over a port or a driver) are missed routinely, because each product is tested on its own.',
  },
  'TA-Q-005': {
    text: 'Accessibility testing should at minimum check:',
    options: [
      'Keyboard operability, text alternatives and sufficient contrast',
      'Screen reader support only',
      'Colour contrast only',
      'Font size only',
    ],
    explanation:
      'WCAG covers perceivable, operable, understandable and robust. Checking only one of the four leaves most of the barriers in place.',
  },
  'TA-Q-006': {
    text: 'Which usability defect will a heuristic evaluation find and a scripted functional test will not?',
    options: [
      'The user has no way of telling which step of the process they are on',
      'A button returns a 500 error',
      'A field accepts 300 characters instead of 200',
      'A total is calculated incorrectly',
    ],
    explanation:
      'Heuristic evaluation targets exactly the class of problem where nothing is technically broken but the user is lost.',
  },

  // --- Reviews --------------------------------------------------------------
  'TA-V-001': {
    text: 'When reviewing requirements, a Test Analyst is best placed to check:',
    options: [
      'Testability, completeness and consistency from the user’s perspective',
      'Compiler warnings',
      'Database indexes',
      'Deployment scripts',
    ],
    explanation:
      'The analyst brings the question "how would I prove this?", and that is precisely what exposes untestable requirements.',
  },
  'TA-V-002': {
    text: 'A review checklist for user stories should include:',
    options: [
      'Independent, Negotiable, Valuable, Estimable, Small, Testable (INVEST)',
      'The word count',
      'The seniority of the author',
      'The story point value',
    ],
    explanation:
      'INVEST is a widely used checklist, and "testable" is the criterion a Test Analyst should defend most fiercely.',
  },
  'TA-V-003': {
    text: 'The main benefit of involving a Test Analyst in reviews early is:',
    options: [
      'Defects are prevented rather than detected later',
      'It fills the time until a build exists',
      'It reduces the amount of documentation',
      'It replaces test design',
    ],
    explanation:
      'Prevention is orders of magnitude cheaper than detection, and it is the most profitable use of the analyst’s time.',
  },

  // --- Defect management ----------------------------------------------------
  'TA-D-001': {
    text: 'A defect taxonomy is used in order to:',
    options: [
      'Categorise defects so that patterns and process weaknesses become visible',
      'Assign blame',
      'Speed up the fixes',
      'Replace severity',
    ],
    explanation:
      'Once defects are classified, a recurring category points at a missing gate in the process.',
  },
  'TA-D-002': {
    text: 'A false positive in testing is:',
    options: [
      'A reported defect that turns out not to be a defect in the product',
      'A defect the tool failed to find',
      'A defect that was fixed twice',
      'A defect in the test environment',
    ],
    explanation:
      'A high rate of false positives destroys developers’ trust in a test suite faster than almost anything else.',
  },
  'TA-D-003': {
    text: 'Root cause information in a defect report is valuable because it:',
    options: [
      'Makes process improvement possible on future projects',
      'Speeds up the current fix',
      'Changes the severity',
      'Satisfies the tracker workflow',
    ],
    explanation:
      'Individual fixes resolve one instance; root cause data is what allows a whole class to stop being produced.',
  },

  // --- Tools ----------------------------------------------------------------
  'TA-X-001': {
    text: 'When evaluating a test data preparation tool, a Test Analyst should weigh most heavily:',
    options: [
      'Whether it can create realistic, referentially consistent data at the volume needed',
      'The colours of its interface',
      'The popularity of its licence',
      'Whether it is open source',
    ],
    explanation:
      'Data that breaks referential integrity produces test failures that train the team to ignore failures.',
  },
  'TA-X-002': {
    text: 'Keyword-driven testing appeals to a Test Analyst because:',
    options: [
      'Test cases can be written in business terms without programming',
      'It removes the need for maintenance',
      'It runs faster than scripted tests',
      'It needs no framework',
    ],
    explanation:
      'The price of the approach is that the keyword layer underneath has to be built and maintained by a developer-level engineer.',
  },
  'TA-X-003': {
    text: 'A test management tool delivers the most value when it:',
    options: [
      'Links requirements, tests, runs and defects so that coverage can be queried',
      'Stores documents',
      'Sends email notifications',
      'Draws charts',
    ],
    explanation:
      'The product is the traceability graph; the charts are only one view of it.',
  },

  // --- Applied analysis -----------------------------------------------------
  'TA-A-001': {
    text: 'A discount engine: orders above 500 get 10%, loyalty programme members get a further 5%, expired cards are rejected. Which technique gives the most systematic coverage?',
    options: [
      'A decision table over the three conditions',
      'Boundary value analysis alone',
      'State transition testing',
      'Exploratory testing alone',
    ],
    explanation:
      'Three independent conditions producing different actions is the textbook shape for a decision table; boundary analysis then covers the 500 boundary inside it.',
  },
  'TA-A-002': {
    text: 'A shopping cart keeps items for 30 days. The most valuable boundary tests are around:',
    options: [
      'Day 29, 30 and 31 after the item was added',
      'Day 1 only',
      'Day 15 only',
      'The price of the item',
    ],
    explanation:
      'The retention rule is the specification, and the off-by-one lives on its boundary - usually in a comparison that is sensitive to the time zone.',
  },
  'TA-A-003': {
    text: 'A user story reads: "As an administrator I want to export users so that I can analyse them." Which information is the Test Analyst missing most?',
    options: [
      'Acceptance criteria: format, fields, volume limits and access rights',
      'The assigned developer',
      'The story point estimate',
      'The sprint number',
    ],
    explanation:
      'Without them any export satisfies the story, and any defect report about it becomes a matter of opinion.',
  },
  'TA-A-004': {
    text: 'Escaped defects cluster in the integrations with third-party services. The analyst’s most effective response:',
    options: [
      'Add contract and negative tests around those integrations and their failure modes',
      'Add more end-to-end UI tests',
      'Increase the size of the regression suite',
      'Increase exploratory testing time evenly',
    ],
    explanation:
      'Aim the response at the cluster that was actually observed. Even increases spend effort where the defects are not.',
  },
  'TA-A-005': {
    text: 'The system has to behave correctly when a downstream service fails to respond in time. This is primarily:',
    options: [
      'Reliability testing (fault tolerance)',
      'Usability testing',
      'Portability testing',
      'Maintainability testing',
    ],
    explanation:
      'Fault tolerance is a sub-characteristic of reliability, and it calls for deliberate fault injection rather than happy path testing.',
  },
  'TA-A-006': {
    text: 'A field accepts a date range where the end date cannot precede the start date. The strongest set of tests covers:',
    options: [
      'End before start, end equal to start, end after start, and both empty',
      'Valid ranges only',
      'The maximum range only',
      'The minimum range only',
    ],
    explanation:
      'The rule creates three relational partitions plus the missing-value case, and "equal to start" is the boundary implemented incorrectly most often.',
  },
  'TA-A-007': {
    text: 'Two stakeholders describe the same feature differently. The Test Analyst should first:',
    options: [
      'Surface the contradiction explicitly and get it resolved before test design',
      'Test both interpretations',
      'Take the version of the more senior person',
      'Test nothing until documentation appears',
    ],
    explanation:
      'Designing tests on top of an unresolved contradiction guarantees an argument at acceptance, when it is most expensive.',
  },
  'TA-A-008': {
    text: 'Which coverage measure is the most meaningful to a business stakeholder?',
    options: [
      'Coverage of prioritised requirements and risks',
      'Statement coverage',
      'The number of test cases',
      'Lines of test code',
    ],
    explanation:
      'The business thinks in features and risks; code-level coverage is engineering diagnostics.',
  },
  'TA-A-009': {
    text: 'When there is no specification at all, the most defensible approach is:',
    options: [
      'Chartered exploratory testing plus documenting the observed behaviour as a draft oracle',
      'Not testing at all',
      'Testing only what the developer described',
      'Waiting indefinitely',
    ],
    explanation:
      'The output of those sessions becomes the first version of the specification, and that is a valuable artefact in its own right.',
  },
  'TA-A-010': {
    text: 'A localisation defect that appears only in Turkish is most likely caused by:',
    options: [
      'Case conversion rules (the Turkish dotted and dotless i)',
      'Screen size',
      'Network latency',
      'Database indexing',
    ],
    explanation:
      'The Turkish locale breaks naive comparisons through toUpperCase/toLowerCase - the classic locale-dependent logic defect.',
  },
};
