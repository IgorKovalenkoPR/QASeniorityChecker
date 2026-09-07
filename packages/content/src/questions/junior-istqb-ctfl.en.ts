import type { TranslationMap } from '../define.js';

/**
 * English side of the Junior / ISTQB CTFL v4.0 set.
 *
 * Same rules as `senior-istqb-ctal-ta.en.ts`: standard ISTQB Foundation Level
 * terminology rather than a literal rendering of the Ukrainian, option order
 * untouched (correctness is stored as an index), distractors kept wrong for the
 * same reason they were wrong in Ukrainian, and explanations kept over the 40
 * character floor the bank test enforces in both languages.
 */
export const juniorCtflEn: TranslationMap = {
  // --- Chapter 1. Fundamentals of testing -----------------------------------
  'FL-1-001': {
    text: 'Which of the following is a typical test objective?',
    options: [
      'Building confidence in the level of quality of the test object',
      'Removing every defect from the code',
      'Proving the software is correct',
      'Guaranteeing that no incidents occur in production',
    ],
    explanation:
      'CTFL lists evaluating work products, causing failures, achieving coverage, reducing risk, verifying compliance with requirements and building confidence. Proving correctness is not among them.',
  },
  'FL-1-002': {
    text: 'A tester found no defects in a component. What follows from that?',
    options: [
      'Nothing about whether that component is free of defects',
      'The component has no defects',
      'The tests were poorly designed',
      'The component is ready for production',
    ],
    explanation:
      'Principle 1: testing shows the presence of defects, but never their absence. A result is one piece of information, not a verdict on quality.',
  },
  'FL-1-003': {
    text: 'A developer used the wrong comparison operator, the program computes an incorrect total, and the user sees a wrong invoice. Match the terms.',
    options: [
      'Error -> defect -> failure',
      'Failure -> defect -> error',
      'Defect -> error -> failure',
      'Error -> failure -> defect',
    ],
    explanation:
      'A human error introduces a defect into the code, and executing that defect may cause a failure the user sees. Not every defect leads to a failure.',
  },
  'FL-1-004': {
    text: 'Which activity belongs to test analysis rather than test design?',
    options: [
      'Deciding WHAT to test by evaluating the test basis',
      'Deciding HOW to test by creating test cases',
      'Creating test data and test procedures',
      'Executing a test suite',
    ],
    explanation:
      'Analysis identifies the testable features and defines test conditions. Design turns those conditions into test cases, and implementation creates the concrete data and procedures.',
  },
  'FL-1-005': {
    text: 'Which principle explains why regression suites have to be reviewed and updated?',
    options: [
      'Tests wear out',
      'Defects cluster together',
      'Testing is context dependent',
      'Early testing saves time and money',
    ],
    explanation:
      'The pesticide paradox: unchanged tests stop finding new defects, so the suite has to be reviewed and extended.',
  },
  'FL-1-006': {
    text: 'What distinguishes testing from debugging?',
    options: [
      'Testing finds failures; debugging locates and removes their causes',
      'They are synonyms',
      'Testing is done by developers and debugging by testers',
      'Debugging happens before testing',
    ],
    explanation:
      'CTFL v4 states plainly that these are different activities with different owners, even though confirmation testing follows debugging.',
  },
  'FL-1-007': {
    text: 'Traceability from test cases back to the test basis primarily supports:',
    options: [
      'Coverage assessment and impact analysis when the basis changes',
      'Faster test execution',
      'Lower test maintenance cost',
      'A higher defect detection percentage',
    ],
    explanation:
      'Traceability answers "what is covered" and "what has to be retested", and it is what makes progress reporting meaningful.',
  },

  // --- Chapter 2. Testing throughout the lifecycle --------------------------
  'FL-2-001': {
    text: 'What is good testing practice in ANY software development lifecycle model?',
    options: [
      'Every development activity has a corresponding test activity',
      'All testing happens after coding is complete',
      'Only the test team performs testing',
      'Test levels never overlap',
    ],
    explanation:
      'CTFL states that in every model each development activity should have a corresponding test activity, and that testers should review work products as soon as drafts exist.',
  },
  'FL-2-002': {
    text: 'Which test level focuses MOST on the interfaces and interactions between integrated components?',
    options: [
      'Component integration testing',
      'Component testing',
      'System testing',
      'Acceptance testing',
    ],
    explanation:
      'Component integration testing targets the interfaces between components. System integration testing targets the interfaces to other systems and external services.',
  },
  'FL-2-003': {
    text: 'Confirmation testing is performed in order to:',
    options: [
      'Check that a previously reported defect has actually been fixed',
      'Check that unchanged areas still work',
      'Measure the performance of the system',
      'Validate the requirements',
    ],
    explanation:
      'Confirmation testing (retesting) is about the fix itself. Regression testing is about the collateral damage that fix may have caused.',
  },
  'FL-2-004': {
    text: 'Which type of testing checks that a change has not adversely affected unchanged parts of the system?',
    options: [
      'Regression testing',
      'Confirmation testing',
      'Maintenance testing',
      'Smoke testing',
    ],
    explanation:
      'Maintenance testing is the context (a change to a deployed system); regression testing is the technique applied within it.',
  },
  'FL-2-005': {
    text: 'Shift-left testing means:',
    options: [
      'Performing test activities earlier in the lifecycle',
      'Moving the test team to another project',
      'Automating everything',
      'Testing only in production',
    ],
    explanation:
      'Shift left includes reviewing requirements, writing tests before the code and running static analysis in CI.',
  },
  'FL-2-006': {
    text: 'Which of the following is an example of operational acceptance testing?',
    options: [
      'Checking the backup and restore procedures',
      'Checking a business process with end users',
      'Checking compliance with a contract',
      'Checking one function in isolation',
    ],
    explanation:
      'Operational acceptance testing covers operational aspects: backup and restore, disaster recovery, user management, maintenance tasks and security checks.',
  },

  // --- Chapter 3. Static testing --------------------------------------------
  'FL-3-001': {
    text: 'Which benefit does static testing provide that dynamic testing cannot?',
    options: [
      'Defects can be found before any executable code exists',
      'Failures are observed under real load',
      'Response time is measured',
      'Memory leaks are detected',
    ],
    explanation:
      'Static testing examines work products without executing them, so it can start on a draft of the requirements.',
  },
  'FL-3-002': {
    text: 'Which review type is the MOST formal, with defined roles, entry criteria and metrics?',
    options: ['Inspection', 'Walkthrough', 'Informal review', 'Technical review'],
    explanation:
      'CTFL orders reviews by formality: informal review, walkthrough, technical review, inspection.',
  },
  'FL-3-003': {
    text: 'In a formal review, who runs the meeting and mediates between the participants?',
    options: ['The moderator (facilitator)', 'The author', 'The scribe', 'The manager'],
    explanation:
      'The author should not moderate a review of their own work product; the moderator keeps the discussion on the work product rather than on the person.',
  },
  'FL-3-004': {
    text: 'Static analysis tools typically detect:',
    options: [
      'Coding standard violations, unreachable code and suspicious constructs',
      'Slow database queries under load',
      'Usability problems',
      'Incorrect business rules',
    ],
    explanation:
      'Static analysis works on the structure of the code. It has no oracle for whether a business rule is correct.',
  },
  'FL-3-005': {
    text: 'The MOST important success factor for a review is that:',
    options: [
      'The objectives are clear and the participants have prepared',
      'The meeting is short',
      'The author defends the work product',
      'Managers attend',
    ],
    explanation:
      'Unprepared participants turn a review into reading aloud, which finds proofreading defects and nothing else.',
  },

  // --- Chapter 4. Test analysis and design (the largest chapter) ------------
  'FL-4-001': {
    text: 'Which of the following is a black-box technique?',
    options: [
      'Equivalence partitioning',
      'Statement testing',
      'Branch testing',
      'Decision testing',
    ],
    explanation:
      'Statement, branch and decision testing are white-box: they need the structure of the code. Equivalence partitioning works from the specification.',
  },
  'FL-4-002': {
    text: 'A system accepts amounts from 100 to 999. Using three-value boundary value analysis at the lower boundary, these are:',
    options: ['99, 100, 101', '100, 101, 102', '98, 99, 100', '99, 100, 999'],
    explanation:
      'The three-value approach takes the boundary itself together with its neighbours on both sides.',
  },
  'FL-4-003': {
    text: 'Which coverage is achieved when every statement in the code has been executed at least once?',
    options: [
      'Statement coverage',
      'Branch coverage',
      'Decision coverage',
      'Path coverage',
    ],
    explanation:
      '100% branch coverage implies 100% statement coverage, but not the other way round: a lone if without an else executes every statement without ever taking the false branch.',
  },
  'FL-4-004': {
    text: 'A decision table has 3 conditions, each either true or false. How many rules does the full (uncollapsed) table have?',
    options: ['8', '6', '9', '3'],
    explanation:
      '2^3 = 8. The table can then be collapsed by merging the rules where a condition does not affect the outcome.',
  },
  'FL-4-005': {
    text: 'Which technique fits BEST for an order that moves through the states Created, Paid, Shipped, Delivered?',
    options: [
      'State transition testing',
      'Equivalence partitioning',
      'Decision tables',
      'Statement testing',
    ],
    explanation:
      'The behaviour depends on the current state and the event, which is exactly what a state transition model captures - together with the invalid transitions worth testing.',
  },
  'FL-4-006': {
    text: 'Which of the following is an experience-based technique?',
    options: [
      'Exploratory testing',
      'Boundary value analysis',
      'Decision tables',
      'Branch testing',
    ],
    explanation:
      'CTFL v4 names error guessing, exploratory testing and checklist-based testing as the experience-based techniques.',
  },
  'FL-4-007': {
    text: 'What is the main purpose of a coverage criterion?',
    options: [
      'To give an objective measure of the thoroughness of a test suite',
      'To guarantee defect-free code',
      'To replace test design',
      'To estimate the testing effort',
    ],
    explanation:
      'Coverage measures what was executed, not quality: 100% statement coverage with weak checks can find nothing at all.',
  },
  'FL-4-008': {
    text: 'A field accepts a three-letter country code. Which of these is an INVALID equivalence partition?',
    options: [
      'A 4-character input',
      'The value USA',
      'The value GBR',
      'The value POL',
    ],
    explanation:
      'The partitioning attribute here is length: anything other than exactly three letters falls into the invalid partition.',
  },
  'FL-4-009': {
    text: 'Collaboration-based approaches such as ATDD produce:',
    options: [
      'Test cases derived collaboratively from user stories and acceptance criteria',
      'Only automated unit tests',
      'Only performance tests',
      'Only exploratory testing charters',
    ],
    explanation:
      'Acceptance test-driven development turns the three-amigos conversation into concrete acceptance tests before any code is written.',
  },
  'FL-4-010': {
    text: 'A login is locked after 3 failed attempts. Which test design technique yields test cases most directly?',
    options: [
      'State transition testing',
      'Boundary value analysis alone',
      'Statement testing',
      'Checklist-based testing',
    ],
    explanation:
      'The attempt counter is a state. The interesting cases are the transitions at 1, 2 and 3 failures and the reset after a successful login.',
  },
  'FL-4-011': {
    text: '100% branch coverage guarantees:',
    options: [
      '100% statement coverage',
      '100% path coverage',
      'That no defects remain',
      'That all requirements are covered',
    ],
    explanation:
      'Branch coverage subsumes statement coverage. Path coverage is strictly stronger than both and is usually unachievable.',
  },
  'FL-4-012': {
    text: 'Which is NOT a valid reason to use white-box techniques?',
    options: [
      'They validate that the software meets user needs',
      'They reveal code that has not been exercised',
      'They give objective coverage measures',
      'They can be automated in the pipeline',
    ],
    explanation:
      'Structural techniques say nothing about whether the implemented behaviour is the behaviour the user wanted.',
  },

  // --- Chapter 5. Managing the test activities ------------------------------
  'FL-5-001': {
    text: 'The level of risk is determined by:',
    options: [
      'The likelihood of the risk occurring and the impact if it does',
      'The number of defects found so far',
      'The size of the test team',
      'The number of requirements',
    ],
    explanation:
      'Risk = likelihood x impact. Both dimensions have to be assessed, because a catastrophic but impossible event and a certain but trivial one call for different responses.',
  },
  'FL-5-002': {
    text: 'A product risk is:',
    options: [
      'The risk that the product will not meet a stakeholder need',
      'The risk that the project will be late',
      'The risk that a supplier drops out',
      'The risk that the team lacks the skills',
    ],
    explanation:
      'Project risks (schedule, staffing, suppliers) threaten the ability to deliver; product risks threaten the quality of what is delivered.',
  },
  'FL-5-003': {
    text: 'What is normally part of a test plan?',
    options: [
      'Scope, objectives, risks, entry and exit criteria, test approach',
      'The full list of executed test cases with their results',
      'The source code of the automation framework',
      'The defect reports from the previous release',
    ],
    explanation:
      'A plan looks forward. Results belong in the test progress and test completion reports.',
  },
  'FL-5-004': {
    text: 'Exit criteria (the definition of done for a test level) exist in order to:',
    options: [
      'Determine objectively when enough testing has been done',
      'Set the start date of testing',
      'Decide who executes the tests',
      'Prioritise defects',
    ],
    explanation:
      'Without agreed exit criteria, "are we done testing yet?" becomes a negotiation under deadline pressure rather than a check against a rule.',
  },
  'FL-5-005': {
    text: 'Which metric best supports a release decision?',
    options: [
      'Residual risk, via coverage of high-risk areas and open defects by severity',
      'The total number of test cases written',
      'The number of hours spent on testing',
      'The number of testers on the team',
    ],
    explanation:
      'A release decision is a decision about risk. Effort and volume metrics describe the test team, not the product.',
  },
  'FL-5-006': {
    text: 'In risk-based testing, high-risk areas should be:',
    options: [
      'Tested earlier and more deeply',
      'Tested last, once the build is stable',
      'Tested only if there is time',
      'Excluded to save effort',
    ],
    explanation:
      'Testing the highest risks early maximises the information gained per unit of time and leaves room to react.',
  },
  'FL-5-007': {
    text: 'Which information in a defect report is key for prioritisation?',
    options: [
      'Severity, business impact and the steps to reproduce',
      'The tester’s name and mood',
      'Only the number of affected test cases',
      'The exact time of day',
    ],
    explanation:
      'CTFL lists identification, description, severity, priority, status, references and evidence among the expected contents.',
  },
  'FL-5-008': {
    text: 'A test approach describes:',
    options: [
      'How testing will be implemented for a particular product or project',
      'The exact steps of every test case',
      'The defect workflow in the tracker',
      'The configuration of the build pipeline',
    ],
    explanation:
      'The approach tailors the strategy to the context: which levels, which techniques, how much automation, which entry and exit criteria.',
  },
  'FL-5-009': {
    text: 'Test progress reporting should primarily communicate:',
    options: [
      'Status against the plan, product risks and impediments',
      'How many hours each tester logged',
      'How many defects each developer created',
      'How much documentation was produced',
    ],
    explanation:
      'The purpose of a progress report is to support the decisions of the stakeholders who read it.',
  },

  // --- Chapter 6. Test tools ------------------------------------------------
  'FL-6-001': {
    text: 'Which risk commonly accompanies the introduction of test automation?',
    options: [
      'Unrealistic expectations about the effort and the benefits',
      'Tests executing too quickly',
      'Excessive coverage',
      'A drop in the number of defects',
    ],
    explanation:
      'CTFL states plainly that automation costs are underestimated: maintenance, environments and skills dominate the total cost, not the initial scripting.',
  },
  'FL-6-002': {
    text: 'Which of the following is the best candidate for automation?',
    options: [
      'A stable regression check that is repeated often',
      'A one-off exploratory session',
      'A usability evaluation with real users',
      'A test whose expected result changes every week',
    ],
    explanation:
      'Automation pays back through repetition against a stable oracle. Volatile or judgement-based checks return a negative rate.',
  },
  'FL-6-003': {
    text: 'A pilot project before rolling out a new tool is recommended in order to:',
    options: [
      'Assess the fit with the existing process and technology at low cost',
      'Delay the decision',
      'Train the whole company at once',
      'Satisfy the vendor',
    ],
    explanation:
      'A pilot turns a procurement argument into evidence about your own codebase and your own team.',
  },
};
