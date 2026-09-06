import type { TranslationMap } from '../define.js';

/**
 * English side of the ISTQB glossary sets (trainee / junior / middle).
 *
 * One map per `defineQuestions` call in `glossary.ts`: the definition rejects a
 * translation keyed to an id it does not contain, so the three maps stay
 * separate rather than merged into one.
 *
 * These questions test exact definitions, so the translation returns the
 * canonical English term and the canonical phrasing of its definition rather
 * than a literal rendering of the Ukrainian. Where the Ukrainian carried the
 * English term in brackets, that bracketed term is the one the option now uses.
 *
 * As elsewhere in the bank: option order is untouched (correctness is an
 * index), and a distractor stays wrong for the same reason it was wrong in
 * Ukrainian - here that usually means it must remain an accurate definition of
 * a *neighbouring* term rather than becoming vague.
 */
export const glossaryTraineeEn: TranslationMap = {
  'GL-T-001': {
    text: 'ISTQB glossary: which term denotes an event in which a component or system does not perform a required function within specified limits?',
    options: ['Failure', 'Defect', 'Error', 'Deviation'],
    explanation:
      'A failure is the observable event. A defect is the flaw in the work product; an error is the human action that introduced it.',
  },
  'GL-T-002': {
    text: 'ISTQB glossary: how is a "defect" most precisely defined?',
    options: [
      'An imperfection in a work product that may cause it to fail to meet its requirements',
      'Observable incorrect behaviour',
      'A human action that produces an incorrect result',
      'A test case that failed',
    ],
    explanation:
      'A defect can exist for years without ever causing a failure, if that branch of the code is never executed with the triggering data.',
  },
  'GL-T-003': {
    text: 'ISTQB glossary: what does a "test case" consist of?',
    options: [
      'Preconditions, inputs, actions, expected results and postconditions',
      'A list of features to be tested',
      'A summary of the testing that was performed',
      'A schedule for a test level',
    ],
    explanation:
      'The postcondition is the part most often left out, and its absence is what leaves the system in a state that breaks the next case.',
  },
  'GL-T-004': {
    text: 'ISTQB glossary: what does "confirmation testing" (retesting) mean?',
    options: [
      'Running the test cases that failed last time, to verify the fix',
      'Testing unchanged areas after a change',
      'Re-running the entire test suite',
      'Testing done by a second tester',
    ],
    explanation:
      'Confirmation testing aims at the fix; regression testing aims at everything around the fix.',
  },
  'GL-T-005': {
    text: 'ISTQB glossary: "test execution" is:',
    options: [
      'The process of running a test on the component or system under test',
      'The process of designing tests',
      'The process of writing a test plan',
      'The process of reporting defects',
    ],
    explanation:
      'Execution produces the actual results, which are then compared with the expected ones.',
  },
  'GL-T-006': {
    text: 'ISTQB glossary: a "test condition" is:',
    options: [
      'A testable aspect of a component or system identified as a basis for testing',
      'A precondition of a test case',
      'An environment configuration',
      'A defect status',
    ],
    explanation:
      'Test conditions are the output of test analysis; test cases are the output of test design.',
  },
  'GL-T-007': {
    text: 'ISTQB glossary: "test data" is:',
    options: [
      'Data created or selected to satisfy the input requirements for executing tests',
      'The result of a test',
      'The results of testing',
      'The defect log',
    ],
    explanation:
      'Test data management is one of the largest hidden costs in a mature test process.',
  },
  'GL-T-008': {
    text: 'ISTQB glossary: which term describes testing how easily users can learn to work with the product?',
    options: [
      'Learnability testing',
      'Usability testing in general',
      'Accessibility testing',
      'Operability testing',
    ],
    explanation:
      'Learnability, operability, user error protection and accessibility are all usability sub-characteristics in ISO 25010.',
  },
  'GL-T-009': {
    text: 'ISTQB glossary: a "test suite" is:',
    options: [
      'A set of test cases or test procedures to be executed in a specific context',
      'A tool that runs tests',
      'A report of the results',
      'A single test case',
    ],
    explanation:
      'The suite is the unit of planning and reporting; the case is the unit of verdict.',
  },
  'GL-T-010': {
    text: 'ISTQB glossary: the "test basis" is:',
    options: [
      'The body of knowledge used as the basis for test analysis and design',
      'The test environment',
      'A set of test data',
      'A test management system',
    ],
    explanation:
      'Requirements, design, code, risk analysis and even experience can all serve as the test basis.',
  },
  'GL-T-011': {
    text: 'ISTQB glossary: the "priority" of a defect means:',
    options: [
      'The level of business importance assigned to fixing it',
      'The degree of its impact on the system',
      'How often it occurs',
      'How difficult it is to fix',
    ],
    explanation:
      'Severity is impact; priority is urgency. They are set by different people for different reasons.',
  },
  'GL-T-012': {
    text: 'ISTQB glossary: a "smoke test" is:',
    options: [
      'A subset of tests covering the main functionality, to decide whether the build is fit for testing at all',
      'An exhaustive test of a single module',
      'A test of error handling',
      'A test performed by the customer',
    ],
    explanation:
      'It is a gate, not a quality assessment. A build that passes the smoke test has earned a day of testing, and nothing more.',
  },
  'GL-T-013': {
    text: 'ISTQB glossary: "coverage" is:',
    options: [
      'The degree to which specified coverage items are exercised by a test suite',
      'The number of test cases',
      'The percentage of defects found',
      'The size of the test basis',
    ],
    explanation:
      'Coverage is always relative to a stated coverage item: statements, branches, requirements, risks.',
  },
  'GL-T-014': {
    text: 'ISTQB glossary: "regression" means:',
    options: [
      'A degradation of previously working functionality caused by a change',
      'A defect found in a new feature',
      'A drop in performance under load',
      'A failed deployment',
    ],
    explanation:
      'The word names the phenomenon itself; regression testing is the activity that looks for it.',
  },
  'GL-T-015': {
    text: 'ISTQB glossary: a "root cause" is:',
    options: [
      'A source of a defect such that removing it prevents defects of that type from recurring',
      'The line of code that failed',
      'The first symptom noticed',
      'The developer who introduced it',
    ],
    explanation:
      'The definition itself contains the test for a genuine root cause: removing it must stop the class from recurring.',
  },
};

export const glossaryJuniorEn: TranslationMap = {
  'GL-J-001': {
    text: 'ISTQB glossary: a "test driver" is:',
    options: [
      'A temporary component that replaces the calling component, in order to invoke the code under test',
      'A component that replaces a called component',
      'A test data management tool',
      'A person who executes tests',
    ],
    explanation:
      'A driver calls the module from above; a stub stands in for what the module calls. Confusing the two makes integration discussions endless.',
  },
  'GL-J-002': {
    text: 'ISTQB glossary: a "stub" is:',
    options: [
      'A skeletal implementation of a called component, used during integration testing',
      'A component that calls the code under test',
      'A load generation tool',
      'A bug report template',
    ],
    explanation:
      'Stubs make it possible to test a component before its dependencies exist - which is what makes top-down integration workable.',
  },
  'GL-J-003': {
    text: 'ISTQB glossary: "validation" is confirmation that:',
    options: [
      'The requirements for a specific intended use have been fulfilled',
      'The work product conforms to its specification',
      'The code compiles',
      'A defect has been fixed',
    ],
    explanation:
      'Verification checks conformance to the specification; validation checks fitness for the intended use.',
  },
  'GL-J-004': {
    text: 'ISTQB glossary: a "test oracle" is:',
    options: [
      'A source for determining the expected result of a test',
      'A test data generation tool',
      'A defect prediction model',
      'A test management system',
    ],
    explanation:
      'With no oracle, testing degenerates into watching behaviour without being able to judge it - that is the oracle problem.',
  },
  'GL-J-005': {
    text: 'ISTQB glossary: a "test harness" means:',
    options: [
      'A test environment comprising the stubs and drivers needed to execute a test',
      'A test management tool',
      'A defect tracker',
      'A CI server',
    ],
    explanation:
      'The harness is what makes a component executable outside its real surroundings.',
  },
  'GL-J-006': {
    text: 'ISTQB glossary: "maintenance testing" is testing of:',
    options: [
      'A modified operational system, or the impact of a changed environment on it',
      'A system still under development',
      'Anything performed only by the maintenance team',
      'The test environment',
    ],
    explanation:
      'It covers changes, migrations, retirement and environment upgrades, and it always includes regression testing.',
  },
  'GL-J-007': {
    text: 'ISTQB glossary: "alpha testing" is performed:',
    options: [
      'At the developing organization’s site, but not by the development team',
      'At the customer’s site by real users',
      'Only by the development team',
      'Automatically in CI',
    ],
    explanation:
      'Beta testing is the same idea moved into the customer’s environment and audience.',
  },
  'GL-J-008': {
    text: 'ISTQB glossary: an "equivalence partition" (equivalence class) is:',
    options: [
      'A subset of the value domain that the component processes in the same way',
      'A group of test cases',
      'A set of boundary values',
      'A category of defects',
    ],
    explanation:
      'A partition is defined by how the values are processed, not by their data type - which is why partitions can cross type boundaries.',
  },
  'GL-J-009': {
    text: 'ISTQB glossary: "exit criteria" are:',
    options: [
      'The conditions for officially completing a defined task',
      'The conditions for starting testing',
      'The definition of a defect',
      'The test schedule',
    ],
    explanation:
      'Entry criteria open the start, exit criteria close the finish. Both have to be agreed with the people who will be held to them.',
  },
  'GL-J-010': {
    text: 'ISTQB glossary: an "incident" (anomaly) means:',
    options: [
      'Any occurrence that requires investigation',
      'A confirmed defect',
      'A failed test only',
      'A production outage only',
    ],
    explanation:
      'An incident may turn out to be a defect, a faulty test, an environment problem, or expected behaviour.',
  },
  'GL-J-011': {
    text: 'ISTQB glossary: white-box testing derives its tests from:',
    options: [
      'The internal structure or implementation of the test object',
      'The specification only',
      'The tester’s experience',
      'Defect history',
    ],
    explanation:
      'Black-box testing derives them from external descriptions; the experience-based approach derives them from knowledge and intuition.',
  },
  'GL-J-012': {
    text: 'ISTQB glossary: "shift left" is:',
    options: [
      'An approach in which testing and quality activities are performed earlier in the lifecycle',
      'Handing the tests over to another team',
      'Reducing the scope of testing',
      'Testing in production',
    ],
    explanation:
      'It covers requirements reviews, static analysis, TDD and early integration, not merely "test sooner".',
  },
  'GL-J-013': {
    text: 'ISTQB glossary: "component testing" is also known as:',
    options: [
      'Unit testing',
      'System testing',
      'Acceptance testing',
      'Integration testing',
    ],
    explanation:
      'Both names describe the same test level; different communities inherited different vocabulary.',
  },
  'GL-J-014': {
    text: 'ISTQB glossary: a "risk" is:',
    options: [
      'A factor that could result in future negative consequences',
      'A defect found during testing',
      'A failed test case',
      'An open incident',
    ],
    explanation:
      'The definition points at the future - that is exactly what separates a risk from a problem that has already happened.',
  },
  'GL-J-015': {
    text: 'ISTQB glossary: "quality assurance" (QA) is focused on:',
    options: [
      'Providing confidence that quality requirements will be fulfilled, through process',
      'Finding defects in the product',
      'Executing test cases',
      'Fixing defects',
    ],
    explanation:
      'QA is process-oriented and preventive; testing (quality control) is product-oriented and detective.',
  },
};

export const glossaryMiddleEn: TranslationMap = {
  'GL-M-001': {
    text: 'ISTQB glossary: "defect density" is:',
    options: [
      'The number of defects per unit of size of a work product',
      'The number of defects per tester',
      'The rate at which defects are fixed',
      'The share of defects found before release',
    ],
    explanation:
      'Normalizing by size makes two modules comparable; the share found before release is measured by defect detection percentage.',
  },
  'GL-M-002': {
    text: 'ISTQB glossary: "risk level" is determined by:',
    options: [
      'The combination of the likelihood of the risk and its impact',
      'The number of requirements affected',
      'The severity of the related defects',
      'The time needed to fix it',
    ],
    explanation:
      'Both factors are needed; either one on its own produces a ranking that misallocates effort.',
  },
  'GL-M-003': {
    text: 'ISTQB glossary: load testing evaluates behaviour under:',
    options: [
      'Expected conditions of varying load, usually between anticipated and peak',
      'Conditions beyond the specified limits',
      'Sustained load over a long period',
      'Sudden extreme spikes',
    ],
    explanation:
      'Beyond the limits is stress testing; a long duration is endurance testing; sudden spikes are spike testing.',
  },
  'GL-M-004': {
    text: 'ISTQB glossary: "test automation" is:',
    options: [
      'The use of software to perform or support test activities',
      'Writing test scripts only',
      'Running tests in CI only',
      'Recording and replaying user actions',
    ],
    explanation:
      'The definition covers management, generation, execution and reporting - not just running scripts.',
  },
  'GL-M-005': {
    text: 'ISTQB glossary: "root cause analysis" is:',
    options: [
      'An analysis technique for identifying the causes of defects in order to prevent them from recurring',
      'A method of prioritizing defects',
      'An effort estimation technique',
      'A way of classifying severity',
    ],
    explanation:
      'The stated goal is preventing recurrence, not explaining a single incident.',
  },
  'GL-M-006': {
    text: 'ISTQB glossary: a "test progress report" is produced:',
    options: [
      'Periodically during testing, to summarize status against the plan',
      'Only at the end of testing',
      'Only when defects are found',
      'Only for regulated projects',
    ],
    explanation:
      'The document produced at the end of testing is the test completion report, which is a different artefact.',
  },
  'GL-M-007': {
    text: 'ISTQB glossary: "reliability" is the degree to which a system:',
    options: [
      'Performs specified functions under specified conditions for a specified period of time',
      'Responds quickly',
      'Is easy to use',
      'Can be transferred between environments',
    ],
    explanation:
      'The sub-characteristics of reliability include maturity, availability, fault tolerance and recoverability.',
  },
  'GL-M-008': {
    text: 'ISTQB glossary: "error guessing" is:',
    options: [
      'A technique in which experience is used to anticipate defects',
      'A structural coverage technique',
      'A formal specification-based technique',
      'A method of prioritizing defects',
    ],
    explanation:
      'It is a recognized experience-based technique, and it works best when paired with a defect taxonomy.',
  },
  'GL-M-009': {
    text: 'ISTQB glossary: a "test strategy" describes:',
    options: [
      'A generalized approach to testing, usually at organization or programme level',
      'The schedule for a single test level',
      'A list of test cases',
      'An environment configuration',
    ],
    explanation:
      'The project-specific instantiation is the test plan; the reason for testing at all is the test policy.',
  },
  'GL-M-010': {
    text: 'ISTQB glossary: "defect triage" is:',
    options: [
      'The process of assessing, prioritizing and assigning reported defects',
      'The process of fixing defects',
      'The process of reproducing defects',
      'The process of closing defects',
    ],
    explanation:
      'Triage brings together the roles that hold the necessary context, so that priority reflects business reality.',
  },
  'GL-M-011': {
    text: 'ISTQB glossary: "portability" is the degree to which a system:',
    options: [
      'Can be transferred from one environment to another',
      'Can be recovered after failures',
      'Protects data',
      'Uses resources efficiently',
    ],
    explanation:
      'Its sub-characteristics are adaptability, installability and replaceability.',
  },
  'GL-M-012': {
    text: 'ISTQB glossary: "test process improvement" means:',
    options: [
      'A programme for raising the quality and efficiency of test activities',
      'Adding more test cases',
      'Buying a new test tool',
      'Growing the test team',
    ],
    explanation:
      'TMMi and TPI Next are the two most widely used reference models for it.',
  },
  'GL-M-013': {
    text: 'ISTQB glossary: "API testing" is:',
    options: [
      'Testing performed by submitting commands to the interfaces of the test object',
      'Testing the UI of the application',
      'Testing the database schema',
      'Testing network throughput',
    ],
    explanation:
      'It is an approach defined by the interface used, not a separate test level.',
  },
  'GL-M-014': {
    text: 'ISTQB glossary: a "test completion report" (summary report) is:',
    options: [
      'A report summarizing test activities and results, produced at a milestone',
      'A daily status update',
      'A test plan',
      'A bug report',
    ],
    explanation:
      'This is the artefact that carries residual risk and lessons learned forward into the next release.',
  },
  'GL-M-015': {
    text: 'ISTQB glossary: "service virtualization" makes it possible to:',
    options: [
      'Test components that depend on unavailable or hard-to-access services',
      'Only speed up builds in CI',
      'Run tests on virtual machines',
      'Automate deployment',
    ],
    explanation:
      'It takes the availability of third-party services off the critical path of the test environment.',
  },
};
