import type { TranslationMap } from '../define.js';

/**
 * English side of the Senior / ISTQB Advanced Test Manager set.
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
export const seniorCtalTmEn: TranslationMap = {
  'TM-001': {
    text: 'A test policy differs from a test strategy in that the policy:',
    options: [
      'Explains WHY the organisation tests; the strategy explains HOW, in general terms',
      'Is written for each project',
      'Lists test cases',
      'Defines the tooling',
    ],
    explanation:
      'CTAL-TM stacks the documents as policy (why) -> strategy (how, at organisation level) -> test plan (this project) -> test level plans.',
  },
  'TM-002': {
    text: 'Which test strategy is characterised by deriving tests from a formal model of the system?',
    options: [
      'The analytical / model-based strategy',
      'A reactive strategy',
      'A consultative strategy',
      'A regression-averse strategy',
    ],
    explanation:
      'CTAL-TM lists analytical, model-based, methodical, process-compliant, consultative, regression-averse and reactive strategies. Most real projects blend them.',
  },
  'TM-003': {
    text: 'A reactive test strategy is appropriate when:',
    options: [
      'The test basis is poor or absent and feedback is needed quickly',
      'The system is safety-critical and fully specified',
      'Evidence is needed for a regulator',
      'The product is stable and unchanging',
    ],
    explanation:
      'Reactive strategies - exploratory and defect-based - respond to the system as delivered rather than to a document that does not exist.',
  },
  'TM-004': {
    text: 'In risk-based testing, what is the Test Manager specifically accountable for?',
    options: [
      'Establishing and running the risk management process on the project',
      'Writing every test case',
      'Executing the regression suite',
      'Reviewing the source code',
    ],
    explanation:
      'The manager owns identification, analysis, mitigation planning and monitoring; the analysts supply the technical and business judgement.',
  },
  'TM-005': {
    text: 'Risk mitigation through testing works because:',
    options: [
      'It reduces the likelihood of undetected defects in high-risk areas',
      'It reduces the impact of a production failure',
      'It removes the risk entirely',
      'It transfers the risk to the customer',
    ],
    explanation:
      'Testing acts on the likelihood side. Impact is reduced by design, redundancy and operational measures.',
  },
  'TM-006': {
    text: 'Which set of metrics best supports a release go/no-go decision?',
    options: [
      'Risk coverage, open defects weighted by severity, and residual risk',
      'Executed test cases and hours spent',
      'The number of automated tests',
      'Lines of code covered',
    ],
    explanation:
      'The decision is about acceptable residual risk, so the metrics have to be expressed in terms of risk as well.',
  },
  'TM-007': {
    text: 'The defect closure curve has flattened while new defects keep arriving. This means:',
    options: [
      'Detection is outpacing fixing, so the release date is at risk',
      'Testing is complete',
      'The product is stable',
      'The metric should be discarded',
    ],
    explanation:
      'Arrival and closure rates have to be read together; either one on its own leads to the wrong conclusion.',
  },
  'TM-008': {
    text: 'Which estimation technique relies on collective expert judgement converging over several rounds?',
    options: [
      'Wideband Delphi',
      'Function point analysis',
      'Three-point estimation',
      'Test point analysis',
    ],
    explanation:
      'Wideband Delphi is a consensus technique; function point and test point analysis are metrics-based; three-point estimation works with a distribution.',
  },
  'TM-009': {
    text: 'Metrics-based estimation is better founded than expert estimation when:',
    options: [
      'The organisation has reliable historical data from comparable projects',
      'The project is entirely new in both domain and technology',
      'The team has only just been formed',
      'No data has been collected',
    ],
    explanation:
      'Without history, metrics-based estimation derives a number from nothing, which is the same expert judgement dressed in false precision.',
  },
  'TM-010': {
    text: 'A Test Manager is planning testing for a distributed team across three time zones. The most important decision is:',
    options: [
      'Explicit handover, ownership and communication protocols',
      'Identical working hours for everyone',
      'A single shared test environment',
      'A single common working language',
    ],
    explanation:
      'Distributed testing fails through ambiguous ownership far more often than it fails through tooling.',
  },
  'TM-011': {
    text: 'When forming a test team, the Test Manager should take into account:',
    options: [
      'The skill set the risks demand, and each person’s development',
      'Technical skills only',
      'Availability only',
      'Cost only',
    ],
    explanation:
      'CTAL-TM treats team composition as a risk mitigation decision, not merely as a staffing one.',
  },
  'TM-012': {
    text: 'A tester lacks the skills a high-risk area demands. The Test Manager should:',
    options: [
      'Pair them with an experienced colleague and plan the skill development explicitly',
      'Hand that area to someone else permanently',
      'Assign them anyway and hope for the best',
      'Remove the area from scope',
    ],
    explanation:
      'Pairing reduces both the present risk and the future one; permanent reassignment reduces only the first.',
  },
  'TM-013': {
    text: 'TMMi and TPI are examples of:',
    options: [
      'Test process improvement models',
      'Test design techniques',
      'Defect taxonomies',
      'Automation frameworks',
    ],
    explanation:
      'TMMi is a staged maturity model; TPI Next is a continuous one, where key areas are assessed independently.',
  },
  'TM-014': {
    text: 'The IDEAL model for process improvement stands for:',
    options: [
      'Initiating, Diagnosing, Establishing, Acting, Learning',
      'Identify, Design, Execute, Analyse, Log',
      'Investigate, Decide, Evaluate, Adjust, Leave',
      'Improve, Deliver, Estimate, Assess, Learn',
    ],
    explanation:
      'The Learning phase is the one most often skipped, which is precisely why organisations repeat the same improvement cycle.',
  },
  'TM-015': {
    text: 'Every sprint retrospective produces the same action items. This most likely means that:',
    options: [
      'The actions get no owner, no estimate and no tracking through to completion',
      'The team is short of ideas',
      'Retrospectives are unnecessary',
      'The process is already optimal',
    ],
    explanation:
      'An action with no owner and no date is a wish. The repetition is the symptom.',
  },
  'TM-016': {
    text: 'A test progress report for senior management should emphasise:',
    options: [
      'Status against objectives, residual risk and the decisions required',
      'Detailed defect descriptions',
      'Results at individual test case level',
      'Tool configuration',
    ],
    explanation:
      'Report at the altitude at which the reader actually makes decisions.',
  },
  'TM-017': {
    text: 'What is a valid reason to include triage in the defect management process?',
    options: [
      'To align priority and ownership across roles while the full context is present',
      'To reduce the number of defects',
      'To assign blame',
      'To speed up test execution',
    ],
    explanation:
      'Triage is where product, development and testing sit in one room and reconcile severity with business priority.',
  },
  'TM-018': {
    text: 'Defect Removal Efficiency measures:',
    options: [
      'The proportion of defects removed before release',
      'Fixing speed',
      'Defects per developer',
      'The cost of a single defect',
    ],
    explanation:
      'DRE is a process effectiveness metric and one of the few able to justify investing in earlier testing.',
  },
  'TM-019': {
    text: 'A project risk has materialised: the only test environment is unavailable for two weeks. The Test Manager should first:',
    options: [
      'Execute the contingency plan and communicate the schedule impact',
      'Wait and see',
      'Quietly cut the test scope',
      'Ask the testers to work overtime later on',
    ],
    explanation:
      'The contingency was planned for exactly this. A quiet scope cut turns a schedule problem into a quality problem nobody agreed to.',
  },
  'TM-020': {
    text: 'Entry criteria for a test level should be enforced because:',
    options: [
      'Starting on an unready build wastes effort and produces misleading results',
      'A standard requires it',
      'It shortens the schedule',
      'It reduces the amount of documentation',
    ],
    explanation:
      'Testing an unstable build generates defects about the build itself rather than about the product.',
  },
  'TM-021': {
    text: 'What is a legitimate reason to tailor the standard test process for a project?',
    options: [
      'The risk profile, life cycle and regulatory context differ',
      'The team wants fewer documents',
      'The deadline is tight',
      'The customer did not ask for it',
    ],
    explanation:
      'Tailoring is expected; tailoring justified by schedule pressure alone is scope cutting under another name.',
  },
  'TM-022': {
    text: 'Which leadership behaviour most improves the quality of defect reports in a team?',
    options: [
      'Constructive review of reports and publishing shared examples of good ones',
      'Setting a minimum defect quota',
      'Ranking testers by defect count',
      'Rejecting weak reports without comment',
    ],
    explanation:
      'Quotas and rankings optimise volume. Shared examples move the bar everyone aims at.',
  },
  'TM-023': {
    text: 'When negotiating a reduced test budget, the Test Manager should present:',
    options: [
      'The specific coverage being given up and the risk that opens up',
      'A refusal',
      'Silent agreement',
      'An even cut across all areas',
    ],
    explanation:
      'Making the trade-off explicit hands the decision to whoever owns the risk, which is exactly where it belongs.',
  },
  'TM-024': {
    text: 'A test summary report at project closure should include:',
    options: [
      'What was tested, the results, the residual risk and the lessons learned',
      'The defect count only',
      'The pass rate only',
      'The schedule variance only',
    ],
    explanation:
      'The lessons learned section is what makes the next project cheaper, and it is also the first one cut under pressure.',
  },
  'TM-025': {
    text: 'A new Test Manager inherits a team with no documented process. The best first step is:',
    options: [
      'Observe and record how the work is done today before changing it',
      'Impose a full standard process immediately',
      'Replace the tooling',
      'Reassign every role',
    ],
    explanation:
      'Undocumented does not mean absent. Changing an unmeasured process makes any later improvement impossible to prove.',
  },
  'TM-026': {
    text: 'Which statement about risk-based testing is FALSE?',
    options: [
      'It guarantees that all high-risk defects will be found',
      'It allocates effort in proportion to risk',
      'It supports the release decision',
      'It requires periodic review',
    ],
    explanation:
      'It improves the odds and makes the trade-off explicit, but it does not remove the possibility of an escaped defect.',
  },
  'TM-027': {
    text: 'The most reliable sign that a test process improvement has worked is:',
    options: [
      'A measured change in the outcome metric against the pre-change baseline',
      'Positive team sentiment',
      'More documentation produced',
      'A larger test suite',
    ],
    explanation:
      'Both sentiment and volume move for reasons that have nothing to do with quality.',
  },
  'TM-028': {
    text: 'Reporting that "testing is 80% done" is weak because:',
    options: [
      'A percentage of executed cases says nothing about risk covered or defects open',
      'It is too precise',
      'It should be given as a fraction',
      'People dislike percentages',
    ],
    explanation:
      'Eighty per cent of the cases can leave one hundred per cent of the highest risk unexercised.',
  },
  'TM-029': {
    text: 'In the context of contractual acceptance testing, the Test Manager must ensure that:',
    options: [
      'The acceptance criteria and the required evidence are agreed in writing in advance',
      'Only the supplier performs the testing',
      'Only functional tests are run',
      'The customer writes all the test cases',
    ],
    explanation:
      'Contractual acceptance disputes are almost always about evidence that was never agreed on.',
  },
  'TM-030': {
    text: 'Which standard is usually referenced for the content of test documentation?',
    options: ['ISO/IEC/IEEE 29119', 'ISO 9001 only', 'IEEE 802.11', 'ISO 14001'],
    explanation:
      '29119 superseded IEEE 829 as the reference for the test process and documentation templates.',
  },
  'TM-031': {
    text: 'An experienced tester has disengaged after two years on the same regression suite. The most effective response is:',
    options: [
      'Give them ownership of a meaningful improvement or of a new technical area',
      'Increase their workload',
      'Move them to another project immediately',
      'Ignore it until they raise it themselves',
    ],
    explanation:
      'The situation lacks autonomy and mastery. More of the same work supplies neither of them.',
  },
  'TM-032': {
    text: 'Which argument most strongly supports tracking escaped defects by root cause?',
    options: [
      'It shows which process gate is failing and where to invest next',
      'It reveals which tester let them through',
      'It reduces the number of defects',
      'It keeps the customer happy',
    ],
    explanation:
      'Root causes grouped by gate turn a list of defects into an improvement backlog.',
  },
};
