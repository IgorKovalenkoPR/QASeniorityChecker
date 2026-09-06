import type { TranslationMap } from '../define.js';

/**
 * English side of the Senior / ISTQB Advanced Test Analyst set.
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
export const seniorCtalTaEn: TranslationMap = {
  'STA-001': {
    text: 'A legacy module has neither a specification nor tests and leaks defects steadily. The most effective analyst strategy is:',
    options: [
      'Build a defect taxonomy from its history and design defect-based tests around it',
      'Write exhaustive tests from the code',
      'Rewrite the specification first',
      'Rely on exploratory testing alone',
    ],
    explanation:
      'A history of escaped defects is the best oracle available when there is no specification, and a taxonomy turns it into repeatable coverage.',
  },
  'STA-002': {
    text: 'A risk assessment scores two areas identically. The tie-breaker most consistent with a risk-based approach is:',
    options: [
      'Detectability: favour the area where a defect would reach production unnoticed',
      'Alphabetical order',
      'Whichever is easier to test',
      'Whichever the developer picks',
    ],
    explanation:
      'Some risk models add detectability as a third factor precisely because an undetected failure carries a far higher actual impact.',
  },
  'STA-003': {
    text: 'When is collapsing a decision table by merging rules justified?',
    options: [
      'When a condition is proven unable to affect the outcome for those rules',
      'Whenever the table is large',
      'When time is short',
      'When the developer says so',
    ],
    explanation:
      'Collapsing on proven independence is analysis; collapsing under time pressure is the same guesswork with extra steps.',
  },
  'STA-004': {
    text: 'A feature passes every functional test, but users abandon it at one particular step. The most appropriate next investigation is:',
    options: [
      'A usability evaluation of that step with real users, or a task analysis',
      'More functional test cases',
      'Performance testing',
      'Static analysis',
    ],
    explanation:
      'The functional oracle is satisfied; the failure lies in suitability and usability, which functional tests cannot see.',
  },
  'STA-005': {
    text: 'Escaped defects cluster in the areas tested last, right before the deadline. The structural fix is:',
    options: [
      'Reorder the plan so high-risk areas are tested first rather than last',
      'Extend the schedule',
      'Add testers at the end',
      'Grow the regression suite',
    ],
    explanation:
      'Testing high risk last leaves the least time to react to what it finds. That is a planning defect, not a capacity shortfall.',
  },
  'STA-006': {
    text: 'Two techniques produce conflicting priorities for the same feature. The analyst should:',
    options: [
      'Reconcile them against the risk assessment, which is the deciding authority',
      'Choose the more formal technique',
      'Apply both in full regardless of cost',
      'Choose the faster technique',
    ],
    explanation:
      'Techniques are instruments; risk is the goal they serve.',
  },
  'STA-007': {
    text: 'Which coverage claim is honest for purely exploratory testing?',
    options: [
      'Charters completed and areas explored, with the unexplored ones named',
      'Percentage of requirements covered',
      'Statement coverage',
      'A claim that no defects remain',
    ],
    explanation:
      'Session-based reporting makes exploratory work accountable without pretending to a coverage it never measured.',
  },
  'STA-008': {
    text: 'A requirement is testable, but only by a test that would cost more than the feature itself. The analyst should:',
    options: [
      'Report the cost, propose a cheaper partial oracle, and let the risk owner decide',
      'Test it anyway',
      'Skip it silently',
      'Declare the requirement untestable',
    ],
    explanation:
      'The cost of verification is legitimate information for the risk owner, and hiding it means deciding on their behalf.',
  },
  'STA-009': {
    text: 'Security testing performed by a Test Analyst rather than a specialist should concentrate on:',
    options: [
      'Access control, input validation and error handling at the functional level',
      'Designing cryptographic algorithms',
      'Kernel exploitation',
      'Firmware analysis',
    ],
    explanation:
      'Broken access control and injection sit consistently at the top of the OWASP list and are reachable by ordinary functional testing.',
  },
  'STA-010': {
    text: 'A system integrates with five external services. The analyst’s most valuable tests are around:',
    options: [
      'Each integration’s failure modes: timeout, malformed response, partial failure',
      'Each integration’s happy path',
      'The UI of the integration screen',
      'The logging format',
    ],
    explanation:
      'Happy paths usually all pass. Nobody tests the timeout until production does it for them.',
  },
  'STA-011': {
    text: 'The same class of defect recurs across three consecutive releases despite being fixed each time. This points to:',
    options: [
      'A missing gate in the process rather than a coding problem',
      'Careless developers',
      'Insufficient regression testing',
      'Tooling limitations',
    ],
    explanation:
      'Recurrence of a class, rather than of an instance, is by definition a signal about the process.',
  },
  'STA-012': {
    text: 'Which quality characteristic is most often under-tested in web products and most visible to end users?',
    options: ['Accessibility', 'Maintainability', 'Portability', 'Modifiability'],
    explanation:
      'Accessibility failures are visible to users, frequently a legal obligation, and cheap to detect with a basic keyboard and contrast pass.',
  },
  'STA-013': {
    text: 'A regression suite has grown to 3,000 cases with unknown return. The analyst should first:',
    options: [
      'Measure which cases have ever failed and weigh that against risk before pruning',
      'Delete the oldest third',
      'Automate all of them',
      'Keep them all indefinitely',
    ],
    explanation:
      'Pruning without data cuts the wrong cases. Historical return plus risk is the evidence needed to defend the decision.',
  },
  'STA-014': {
    text: 'Boundary value analysis for a date field should include:',
    options: [
      'Month ends, leap days, daylight-saving transitions and time zone boundaries',
      'Only the first and last day of the year',
      'Only invalid formats',
      'Only the current date',
    ],
    explanation:
      'Date defects live in calendar arithmetic; naive numeric boundaries almost never fail.',
  },
  'STA-015': {
    text: 'A stakeholder insists on deep testing of a low-risk area. The analyst should:',
    options: [
      'Ask what risk they see and what the model missed, then update the model or explain the trade-off',
      'Comply silently',
      'Refuse',
      'Escalate immediately',
    ],
    explanation:
      'A stakeholder’s insistence is usually undocumented knowledge about risk. That is an input to the model, not an argument against it.',
  },
  'STA-016': {
    text: 'Testing the interaction between your system and a partner’s should prioritise:',
    options: [
      'Data format, versioning and error semantics at the boundary',
      'The quality of the partner’s internal code',
      'Your own UI',
      'The partner’s staffing',
    ],
    explanation:
      'The contract at the boundary is the only thing both sides can be held to.',
  },
  'STA-017': {
    text: 'A defect is closed as "cannot reproduce" for the third time, yet users keep reporting it. The analyst should:',
    options: [
      'Instrument that flow and gather production evidence to characterise the trigger',
      'Close it permanently',
      'Raise the severity and reopen it unchanged',
      'Ask users to write better reports',
    ],
    explanation:
      'Reopening the same report without new evidence changes nothing. Observability is the instrument for defects that only occur under production conditions.',
  },
  'STA-018': {
    text: 'Which argument most strongly supports keeping some tests manual in a mature automated suite?',
    options: [
      'Human judgement is needed for usability, suitability and fresh exploration',
      'Manual tests are cheaper',
      'Automation is unreliable',
      'Manual tests find more defects per hour',
    ],
    explanation:
      'Automation checks expectations that are already known. Human testing surfaces the expectations nobody wrote down.',
  },
  'STA-019': {
    text: 'A hundred per cent pass rate on a suite unchanged for a year most likely means that:',
    options: [
      'The suite has stopped producing information',
      'The product has no defects',
      'The tests are excellent',
      'Coverage is complete',
    ],
    explanation:
      'This is the pesticide paradox seen through a metric: a suite that never fails has stopped being a test and become a ritual.',
  },
  'STA-020': {
    text: 'The most valuable comment a Test Analyst can make in a user story review is usually:',
    options: [
      'Naming a concrete scenario the acceptance criteria do not decide',
      'A wording correction',
      'A suggestion about story points',
      'A request to change the formatting',
    ],
    explanation:
      'A concrete undecided scenario forces the gap in the requirement to be closed while closing it is still free.',
  },
  'STA-021': {
    text: 'A feature behaves differently across 12 user roles and 5 pricing tiers. The analyst should:',
    options: [
      'Model it as a combinatorial problem and apply pairwise testing or a classification tree',
      'Test all 60 combinations',
      'Test only the default role',
      'Test only the highest tier',
    ],
    explanation:
      'Sixty combinations are affordable once but not every release; pairwise makes it sustainable, and the risk model decides which full combinations are still worth testing.',
  },
  'STA-022': {
    text: 'Test analysis effort is best invested where:',
    options: [
      'Risk is high and the test basis is weakest',
      'Requirements are clearest',
      'The code is newest',
      'Developers ask for it',
    ],
    explanation:
      'Clear requirements at low risk need the least analysis; the opposite corner needs the most.',
  },
};
