import type { TranslationMap } from '../define.js';

/**
 * English side of the Senior / Performance Review set.
 *
 * Kept beside the Ukrainian file rather than inside it: the question tuples are
 * dense, and interleaving two languages would make every reword touch both and
 * every diff unreadable.
 *
 * Rules this file follows, and the rest of the bank's translations follow too:
 *
 *   - Standard ISTQB and industry English terminology, not a literal rendering
 *     of the Ukrainian. The Ukrainian was itself written from the English
 *     concepts, so the translation recovers the term actually used in practice.
 *   - Option order is untouched. Correctness is stored as an index, so
 *     reordering options here would silently change the answer key.
 *   - A distractor stays wrong for the same reason it was wrong in Ukrainian.
 *     A distractor that becomes defensible in English changes what the
 *     question measures.
 *   - Explanations keep their point and stay over 40 characters, which the
 *     bank test enforces in both languages.
 */
export const seniorPrEn: TranslationMap = {
  'SR-FC-001': {
    text: 'A forecast differs from an estimate in that a forecast:',
    options: [
      'Projects a future outcome from observed trend data',
      'Is always more accurate',
      'Needs no assumptions',
      'Is made only by managers',
    ],
    explanation:
      'An estimate is a judgement about work that has not started; a forecast extrapolates what is already being observed, such as burn rate or defect arrival.',
  },
  'SR-FC-002': {
    text: 'Three days before the planned release, defect arrival is still rising. The best-founded way to state the forecast is:',
    options: [
      'Detection has not levelled off; the current date carries substantial risk, and here are the options',
      'We will make it, the team will work harder',
      'Nothing can be said until the last day',
      'Testing is complete',
    ],
    explanation:
      'A rising curve is evidence that detection is incomplete. Describing the shape of the curve turns a feeling into a position that can be defended.',
  },
  'SR-FC-003': {
    text: 'What is the most reliable basis for a test forecast?',
    options: [
      'Historical velocity and defect data from comparable releases of the same product',
      'Industry benchmark ratios',
      'The project manager’s preference',
      'The size of the requirements document',
    ],
    explanation:
      'Your own history includes your team’s overheads, your domain and your codebase - none of which a benchmark knows anything about.',
  },
  'SR-FC-004': {
    text: 'Cone of uncertainty reasoning means that an estimate given at the start of a project should be:',
    options: [
      'Expressed as a wide range and revised as information arrives',
      'Given as a single committed number',
      'Refused',
      'Doubled as a buffer',
    ],
    explanation:
      'A single number at the widest point of the cone is a commitment made with the least information there will ever be.',
  },
  'SR-ALG-001': {
    text: 'A search takes 1 ms over 1,000 records and 1 s over 1,000,000 records. The most likely complexity is:',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
    explanation:
      'A thousandfold growth in data produced a thousandfold growth in time, which is linear. O(n^2) would have produced a millionfold increase.',
  },
  'SR-ALG-002': {
    text: 'Why does algorithmic complexity matter to a senior tester?',
    options: [
      'It predicts which features will degrade as production data grows',
      'It determines the UI layout',
      'It replaces performance testing',
      'It determines the test levels',
    ],
    explanation:
      'Knowing that a function is quadratic tells you to test it at production volumes rather than on 20 rows.',
  },
  'SR-ALG-003': {
    text: 'A test passes on 10 records and times out on 100,000. This means:',
    options: [
      'A scalability defect, to be raised with the volume that triggers it',
      'Only a test data problem',
      'A flaky test',
      'Nothing, the volume is unrealistic',
    ],
    explanation:
      'The volume is unrealistic exactly until production reaches it. Raise the defect with the measured threshold.',
  },
  'SR-ALG-004': {
    text: 'Reading the implementation before designing tests is most justified when:',
    options: [
      'You are designing structural tests or hunting a suspected class of defect',
      'You want to save time on analysis',
      'The specification exists and is clear',
      'You are doing acceptance testing',
    ],
    explanation:
      'Knowing the code biases black-box design towards what has already been built. It is a deliberate white-box instrument, not a default practice.',
  },
  'SR-VCS-001': {
    text: 'What does "git rebase" do that "git merge" does not?',
    options: [
      'Replays commits onto a new base, giving a linear history and new commit hashes',
      'Deletes branches',
      'Pushes to the remote repository',
      'Resolves conflicts automatically',
    ],
    explanation:
      'Because the hashes change, rebasing a branch others have already pulled rewrites shared history and breaks their working copies.',
  },
  'SR-VCS-002': {
    text: 'Why should automated tests live in the same repository as the code they test?',
    options: [
      'A single commit keeps the code and its tests in one consistent, reviewable state',
      'It saves disk space',
      'It is faster to clone',
      'The tooling requires it',
    ],
    explanation:
      'Separate repositories drift apart: the suite at HEAD no longer corresponds to any particular version of the product.',
  },
  'SR-VCS-003': {
    text: 'Trunk-based development affects testing mainly by:',
    options: [
      'Requiring fast, reliable automated checks on every small merge into main',
      'Removing the need for regression testing',
      'Eliminating merge conflicts',
      'Requiring long-lived feature branches',
    ],
    explanation:
      'The whole model rests on a pipeline trusted enough to guard main. Without one, trunk-based development simply breaks main faster.',
  },
  'SR-VCS-004': {
    text: 'A feature flag lets a team:',
    options: [
      'Merge unfinished work into main while keeping it switched off in production',
      'Skip testing a feature',
      'Do without version control',
      'Deploy without a pipeline',
    ],
    explanation:
      'Flags create a combinatorial test surface of their own: on, off, and the transition between states over existing data.',
  },
  'SR-SA-001': {
    text: 'A static analysis gate in CI is most valuable when it:',
    options: [
      'Fails the build on new violations while tolerating the existing baseline',
      'Shows thousands of old warnings on every run',
      'Runs only before a release',
      'Is advisory only',
    ],
    explanation:
      'A ratchet on new code makes the gate actionable. A wall of legacy warnings teaches everyone to ignore it.',
  },
  'SR-SA-002': {
    text: 'Which class of defect is static analysis genuinely good at finding?',
    options: [
      'Null dereferences, resource leaks and injection-prone string concatenation',
      'Wrong business rules',
      'Poor usability',
      'Missing requirements',
    ],
    explanation:
      'Static tools reason about structure and data flow. They have no oracle for intent.',
  },
  'SR-SA-003': {
    text: 'A high false positive rate from a static analyser is dangerous because:',
    options: [
      'Developers start suppressing findings wholesale, the real ones included',
      'The build becomes slower',
      'More licences are consumed',
      'It duplicates code review',
    ],
    explanation:
      'Tuning the rule set down to a trusted core is worth more than switching on every rule available.',
  },
  'SR-SA-004': {
    text: 'Code coverage measured by unit tests should be treated as:',
    options: [
      'A diagnostic that finds untested code, not a quality target',
      'A contractual quality guarantee',
      'A replacement for review',
      'A measure of defect density',
    ],
    explanation:
      'Coverage as a mandated target reliably produces assertion-free tests that execute code without checking anything.',
  },
  'SR-UT-001': {
    text: 'A good unit test is characterised by being:',
    options: [
      'Fast, isolated, deterministic, and checking one behaviour',
      'Covering the whole system end to end',
      'Using a real database',
      'Depending on a previous test',
    ],
    explanation:
      'The FIRST properties. A unit test that reaches out to the network is an integration test with the wrong label.',
  },
  'SR-UT-002': {
    text: 'The difference between a stub and a mock is that a mock:',
    options: [
      'Also verifies that the expected interactions actually happened',
      'Is always slower',
      'Cannot return values',
      'Is used only in UI tests',
    ],
    explanation:
      'A stub returns canned answers; a mock additionally checks how it was called. Over-mocking ties the tests to the implementation.',
  },
  'SR-UT-003': {
    text: 'When a senior tester reviews a unit test suite, the most worrying signal is:',
    options: [
      'Tests with high coverage and almost no meaningful assertions',
      'Tests that use fixtures',
      'Tests grouped by class',
      'Tests with descriptive names',
    ],
    explanation:
      'Coverage without assertions is the classic way to reach a mandated number while verifying nothing.',
  },
  'SR-UT-004': {
    text: 'Test-driven development (TDD) influences design because:',
    options: [
      'Code that is hard to test usually gets refactored towards looser coupling',
      'It removes the need for design',
      'It guarantees the absence of defects',
      'It replaces integration testing',
    ],
    explanation:
      'The design pressure is the main long-term benefit; the tests themselves are a valuable by-product.',
  },
  'SR-TF-001': {
    text: 'When designing your own test framework, the most important early decision is:',
    options: [
      'Layering: tests, business actions and the technical driver kept separate',
      'The programming language',
      'The colour scheme of the reports',
      'The number of test cases',
    ],
    explanation:
      'Layering is what lets you swap the driver without rewriting the tests. It is also the decision that is most expensive to change later.',
  },
  'SR-TF-002': {
    text: 'A framework should provide a shared reporting and logging layer mainly because:',
    options: [
      'The cost of a large suite is dominated by the time spent diagnosing failures',
      'Reports look professional',
      'CI requires it',
      'It reduces the number of tests',
    ],
    explanation:
      'A failure that takes 30 minutes to diagnose, multiplied by a hundred failures, is exactly where the automation budget goes.',
  },
  'SR-TF-003': {
    text: 'Which argument weighs most strongly against building your own framework from scratch?',
    options: [
      'The maintenance cost is permanent and falls on your team alone',
      'Custom code is always slower',
      'It will not integrate with CI',
      'It cannot be documented',
    ],
    explanation:
      'Every custom abstraction is a product you now own, together with its documentation, onboarding and defects.',
  },
  'SR-TF-004': {
    text: 'Support for parallel execution has to be designed in from the start because:',
    options: [
      'Shared state and fixed test data make retrofitting parallelism very expensive',
      'It is a licensing requirement',
      'It changes the language',
      'Reports cannot be merged otherwise',
    ],
    explanation:
      'Data isolation and statelessness are architectural properties. Adding them to a mature suite usually means rewriting its fixtures.',
  },
  'SR-TP-001': {
    text: 'The most important section of a test plan for stakeholders is usually:',
    options: [
      'Scope, risks and exit criteria',
      'The list of tools',
      'Team member biographies',
      'The document revision history',
    ],
    explanation:
      'Those three answer what will and will not be tested, what could go wrong, and how we will know we are done.',
  },
  'SR-TP-002': {
    text: 'A test plan that was never updated during the project is:',
    options: [
      'A document about a project that no longer exists',
      'Still a fully useful document',
      'Ideal, because it is stable',
      'An ISTQB requirement',
    ],
    explanation:
      'A plan is a living artefact. An unchanged plan on a changing project means nobody is using it to make decisions.',
  },
  'SR-TP-003': {
    text: 'Exit criteria should be defined:',
    options: [
      'Before execution starts, together with the stakeholders who will use them',
      'At the end, from whatever was actually achieved',
      'By the test team alone',
      'Only for regulated projects',
    ],
    explanation:
      'Criteria written after the fact describe the outcome instead of governing it, and cannot support a release argument.',
  },
  'SR-TP-004': {
    text: 'Which belongs to a test plan rather than to a test strategy?',
    options: [
      'The specific environments and schedule for this release',
      'The organisation-wide approach to automation',
      'The general defect classification scheme',
      'The company test policy',
    ],
    explanation:
      'A strategy is organisational and long-lived; a plan is project-level and time-bounded.',
  },
  'SR-OPT-001': {
    text: 'The regression suite takes 8 hours and blocks daily releases. The best first optimisation is:',
    options: [
      'Identify and either parallelise or thin out the slowest, least valuable tests by risk and history',
      'Delete half the tests',
      'Run it once a week',
      'Add testers',
    ],
    explanation:
      'Measure first: a small number of tests usually dominates the runtime, and the value usually sits in different ones.',
  },
  'SR-OPT-002': {
    text: 'Before optimising a test process, you should:',
    options: [
      'Measure the current baseline so the improvement can be demonstrated',
      'Change the tooling',
      'Reorganise the team',
      'Increase the number of test cases',
    ],
    explanation:
      'Without a baseline an "improvement" is an opinion, and it cannot be defended when the next deadline arrives.',
  },
  'SR-OPT-003': {
    text: 'A senior tester proposes automating a manual suite. The strongest justification is:',
    options: [
      'A calculated return that accounts for run frequency, stability and maintenance cost',
      'Automation is a best practice',
      'Manual testing is boring',
      'Competitors are automating',
    ],
    explanation:
      'Automation that runs twice a year rarely repays its maintenance. The frequency and stability numbers are what settle it.',
  },
  'SR-OPT-004': {
    text: 'Which change most reliably shortens feedback time in a mature process?',
    options: [
      'Pushing coverage down the pyramid from the UI to the API and unit levels',
      'Adding yet more end-to-end tests',
      'Hiring more manual testers',
      'Lengthening the sprint',
    ],
    explanation:
      'The same behaviour checked at a lower level runs in seconds instead of minutes and fails for one comprehensible reason.',
  },
  'SR-TR-001': {
    text: 'A monthly test report for the whole team should be built around:',
    options: [
      'Product quality trends, risks and impediments for the period',
      'Individual tester productivity',
      'The number of meetings',
      'A list of executed cases',
    ],
    explanation:
      'The audience decides about the product and the process; it does not appraise individual people.',
  },
  'SR-TR-002': {
    text: 'Which trend is the strongest early warning in a release report?',
    options: [
      'A defect arrival rate that has not yet levelled off',
      'The total defect count',
      'The number of executed test cases',
      'Logged hours',
    ],
    explanation:
      'An arrival curve that has not saturated says detection is incomplete, whatever the absolute numbers look like.',
  },
  'SR-TR-003': {
    text: 'Reporting defect counts per tester in a team report is problematic because:',
    options: [
      'It rewards volume and discourages helping colleagues',
      'It takes a long time to collect',
      'It is inaccurate',
      'Managers do not read it',
    ],
    explanation:
      'It turns a collaborative activity into a contest measured by the least meaningful number available.',
  },
  'SR-TR-004': {
    text: 'When a report has to deliver bad news, the most effective structure is:',
    options: [
      'Situation, impact, options with their trade-offs, and a recommendation',
      'The bad news on its own',
      'Good news first, the bad news buried at the end',
      'A request for more time',
    ],
    explanation:
      'Arriving with options rather than with the problem alone is exactly what separates a senior’s report from an escalation.',
  },
  'SR-TTP-001': {
    text: 'When planning testing for a whole team across several parallel workstreams, the main constraint to model is:',
    options: [
      'Shared bottlenecks: environments, test data and scarce skills',
      'Personal preferences',
      'The number of test cases',
      'The office seating plan',
    ],
    explanation:
      'Parallel streams hit shared resources long before they hit the number of people available.',
  },
  'SR-TTP-002': {
    text: 'Two workstreams need the same test environment in the same week. The best plan is:',
    options: [
      'Explicitly stagger them in time, or provision an isolated environment and state its cost',
      'Let the teams sort it out themselves',
      'Ignore it and react when it happens',
      'Cancel one of the workstreams',
    ],
    explanation:
      'Surfacing the conflict as a decision with a price attached is the act of planning; leaving it implicit guarantees a lost week.',
  },
  'SR-TTP-003': {
    text: 'A team plan should include contingency buffer because:',
    options: [
      'Defect fixing, retesting and environment problems are inevitable but cannot be planned item by item',
      'It makes the plan look longer',
      'The customer expects it',
      'It is a standard percentage',
    ],
    explanation:
      'Buffer is not padding but a budget for known-uncertain work, and it should be labelled as exactly that.',
  },
  'SR-ROLE-001': {
    text: 'Role distribution inside a test team should be driven primarily by:',
    options: [
      'Project risks and the skills they demand, balanced against people’s development',
      'Seniority alone',
      'Whoever volunteered first',
      'Alphabetical rotation',
    ],
    explanation:
      'Risk decides what has to be covered by experience; development decides where to place the person who becomes senior next year.',
  },
  'SR-ROLE-002': {
    text: 'Only one person knows how to run the performance test suite. This is:',
    options: [
      'A key person risk to be reduced by cross-training',
      'Efficient specialisation worth preserving',
      'A staffing budget question',
      'Not a testing concern',
    ],
    explanation:
      'A bus factor of one on a critical capability is a project risk, and it belongs in the risk register.',
  },
  'SR-ROLE-003': {
    text: 'Rotating testers between modules periodically is useful because:',
    options: [
      'Fresh eyes find the defects habit hides, and knowledge spreads',
      'It is fairer',
      'It reduces the amount of documentation',
      'It shortens onboarding',
    ],
    explanation:
      'It costs some ramp-up time and buys defect detection and team resilience at the same time.',
  },
  'SR-PM-001': {
    text: 'A team member consistently overruns their estimates. The most effective first step is:',
    options: [
      'A private conversation to understand the cause before acting',
      'Quietly cutting their estimates yourself',
      'Raising it by name at the retrospective',
      'Reassigning all of their work',
    ],
    explanation:
      'The cause may be skill, scope, blockers or estimation technique, and each needs a different remedy. A public callout cures none of them.',
  },
  'SR-PM-002': {
    text: 'Effective feedback to a team member is:',
    options: [
      'Specific, timely, and about observable behaviour and its consequences',
      'General and given once a year',
      'Delivered in front of the whole team',
      'Focused on personality traits',
    ],
    explanation:
      'Behaviour plus consequence gives something to act on; traits do not, and the person can do nothing about them.',
  },
  'SR-PM-003': {
    text: 'Two testers are arguing publicly about coverage. As their lead you should:',
    options: [
      'Help them reach a decision based on risk and evidence, then record it',
      'Decide for them straight away',
      'Let them argue until one gives in',
      'Escalate to the customer',
    ],
    explanation:
      'A recorded, evidence-based decision settles the current argument and gives the team a precedent for the next one.',
  },
  'SR-PM-004': {
    text: 'The main purpose of a one-to-one with a team member is:',
    options: [
      'To understand blockers, development and context that never surface in status meetings',
      'To review their task list',
      'To announce their performance rating',
      'To hand out new work',
    ],
    explanation:
      'Status is already visible on the board. The one-to-one exists for what the board cannot show.',
  },
  'SR-RM-001': {
    text: 'A risk register entry is complete when it contains:',
    options: [
      'Description, likelihood, impact, owner, mitigation and a contingency plan',
      'Description and severity',
      'Description only',
      'Description and a deadline',
    ],
    explanation:
      'Without an owner and a contingency plan the register is a list of worries rather than a management instrument.',
  },
  'SR-RM-002': {
    text: 'The difference between mitigation and contingency is that mitigation:',
    options: [
      'Reduces likelihood or impact in advance; contingency is the plan if the risk occurs anyway',
      'Is cheaper',
      'Applies only to project risks',
      'They are the same thing',
    ],
    explanation:
      'Well-run projects fund both, because mitigation is never complete.',
  },
  'SR-RM-003': {
    text: 'A high-likelihood, high-impact risk with no mitigation available should be:',
    options: [
      'Escalated immediately, with options and a recommendation',
      'Monitored quietly',
      'Accepted silently',
      'Removed from the register',
    ],
    explanation:
      'Escalation with options is a deliverable; escalation with the problem alone passes the work upwards without passing any information.',
  },
  'SR-RM-004': {
    text: 'Which risk response applies when a team buys a device cloud instead of maintaining its own lab?',
    options: ['Transfer', 'Avoidance', 'Acceptance', 'Exploiting an opportunity'],
    explanation:
      'The operational risk moves to the supplier. The residual risk - supplier availability - then has to be recorded.',
  },
  'SR-RM-005': {
    text: 'Risk-based test prioritisation breaks down when:',
    options: [
      'Risk assessments are done once and never revisited as the product changes',
      'Risks are documented',
      'Stakeholders are involved',
      'Impact is assessed',
    ],
    explanation:
      'A stale risk model directs effort at last quarter’s product, which is no different from having no model at all.',
  },
};
