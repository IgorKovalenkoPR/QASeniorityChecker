import type { Competency } from './types.js';

/**
 * Every skill row of the "QA roadmap employee copy" Performance Review sheet
 * that can be assessed by a written test.
 *
 * `tier` is read from the row's fill colour in the source spreadsheet:
 *   #D9D9D9 grey -> trainee, #D9EAD3 green -> junior,
 *   #FFF2CC yellow -> middle, #F4CCCC red -> senior.
 *
 * The "Books", "Certification/courses" and "Desired skills" sections of the
 * sheet are intentionally absent: reading a book or holding a certificate is
 * evidence gathered during the review itself, not something a 20-question
 * knowledge test can establish. The English rows are represented only by the
 * two that a written test can actually observe (reading and writing);
 * conversational English stays with the reviewer.
 */
export const COMPETENCIES: readonly Competency[] = [
  // --- Theory -------------------------------------------------------------
  { id: 'test-artifacts', label: 'Test case/checklist/test scenario/test plan/bug/bug report', group: 'theory', tier: 'trainee' },
  { id: 'severity-priority', label: 'Severity vs Priority', group: 'theory', tier: 'trainee' },
  { id: 'defect-lifecycle', label: 'Defect life cycle', group: 'theory', tier: 'trainee' },
  { id: 'testing-types', label: 'Testing types and subtypes', group: 'theory', tier: 'trainee' },
  { id: 'test-design-techniques', label: 'Test design techniques', group: 'theory', tier: 'trainee' },
  { id: 'news-trends', label: 'Ability to keep up with news and trends', group: 'theory', tier: 'trainee' },
  { id: 'verification-validation', label: 'Verification & Validation', group: 'theory', tier: 'junior' },
  { id: 'acceptance-criteria', label: 'Acceptance criteria/Definition of Done', group: 'theory', tier: 'junior' },
  { id: 'testing-phases-goals', label: 'Phases of testing and Goals of testing', group: 'theory', tier: 'junior' },
  { id: 'sdlc-methodologies', label: 'Software development life cycle/Methodologies/Frameworks', group: 'theory', tier: 'junior' },
  { id: 'testing-principles', label: 'Principles of testing', group: 'theory', tier: 'junior' },
  { id: 'defect-management-systems', label: 'Defect management system/Project management system', group: 'theory', tier: 'junior' },
  { id: 'testing-levels', label: 'Levels of testing', group: 'theory', tier: 'junior' },
  { id: 'oop-principles', label: 'OOP principles', group: 'theory', tier: 'junior' },
  { id: 'api-theory', label: 'API', group: 'theory', tier: 'middle' },
  { id: 'risks-in-testing', label: 'Risks in testing', group: 'theory', tier: 'middle' },
  { id: 'testing-metrics', label: 'Testing metrics', group: 'theory', tier: 'middle' },
  { id: 'estimates-forecasts', label: 'Estimates & forecasts', group: 'theory', tier: 'senior' },

  // --- Technical skills ---------------------------------------------------
  { id: 'html-css', label: 'Webpage markup basics (HTML, CSS)', group: 'technical', tier: 'trainee' },
  { id: 'mobile-platforms', label: 'Mobile technologies and platforms', group: 'technical', tier: 'trainee' },
  { id: 'browser-architecture', label: 'Web browser architecture (cookies, localstorage, etc.)', group: 'technical', tier: 'trainee' },
  { id: 'ci-systems', label: 'Continuous integration systems', group: 'technical', tier: 'junior' },
  { id: 'databases', label: 'Database basics (SQL/NoSQL)', group: 'technical', tier: 'junior' },
  { id: 'web-app-architecture', label: 'Architecture and structure of web apps', group: 'technical', tier: 'junior' },
  { id: 'rest-http', label: 'REST API and HTTP/HTTPS protocols', group: 'technical', tier: 'junior' },
  { id: 'json', label: 'JSON', group: 'technical', tier: 'middle' },
  { id: 'unix', label: 'Unix basics', group: 'technical', tier: 'middle' },
  { id: 'virtualization', label: 'Virtualization (vagrant/docker)', group: 'technical', tier: 'middle' },
  { id: 'dev-algorithms', label: 'The basics of development and algorithms', group: 'technical', tier: 'senior' },
  { id: 'vcs', label: 'VCS', group: 'technical', tier: 'senior' },

  // --- Automation ---------------------------------------------------------
  { id: 'auto-web-ui', label: 'Automation of WEB UI (functional) tests', group: 'automation', tier: 'middle' },
  { id: 'auto-mobile-ui', label: 'Automation of Mobile UI (functional) tests', group: 'automation', tier: 'middle' },
  { id: 'auto-performance', label: 'Automation of Performance/Load tests', group: 'automation', tier: 'middle' },
  { id: 'auto-api', label: 'Automation of API tests', group: 'automation', tier: 'middle' },
  { id: 'auto-db', label: 'Automated DB testing', group: 'automation', tier: 'middle' },
  { id: 'static-analysis', label: 'Ability to use tools for static code analysis', group: 'automation', tier: 'senior' },
  { id: 'unit-tests', label: 'Writing unit tests', group: 'automation', tier: 'senior' },
  { id: 'test-frameworks', label: 'Creating your own test frameworks', group: 'automation', tier: 'senior' },

  // --- Test executor ------------------------------------------------------
  { id: 'defect-reports-en', label: 'Creating defect reports (in English)', group: 'test-executor', tier: 'trainee' },
  { id: 'test-execution', label: 'Execution of ready test cases, checklists or test scenarios', group: 'test-executor', tier: 'trainee' },
  { id: 'daily-reports', label: 'Creating reports about tasks accomplished during a day/a week/a month', group: 'test-executor', tier: 'trainee' },
  { id: 'story-verification', label: 'Verification of a story, in strict accordance with its acceptance criteria', group: 'test-executor', tier: 'junior' },
  { id: 'rough-estimation', label: 'Approximate estimation of time/cost to test a specific task/story', group: 'test-executor', tier: 'junior' },

  // --- Test analyst -------------------------------------------------------
  { id: 'test-documentation', label: 'Creating test documentation (test cases, checklists, mind maps etc.)', group: 'test-analyst', tier: 'trainee' },
  { id: 'requirements-testing', label: 'Requirements testing', group: 'test-analyst', tier: 'junior' },
  { id: 'test-planning-tasks', label: 'Planning of testing activities for specific tasks', group: 'test-analyst', tier: 'junior' },
  { id: 'precise-estimation', label: 'Estimation of time/cost of testing activities (epics, stories, bugs, testing types)', group: 'test-analyst', tier: 'middle' },
  { id: 'process-analysis', label: 'Analysis of testing process', group: 'test-analyst', tier: 'middle' },
  { id: 'test-plan', label: 'Writing a test plan', group: 'test-analyst', tier: 'senior' },
  { id: 'process-optimization', label: 'Optimization of testing process', group: 'test-analyst', tier: 'senior' },
  { id: 'team-reports', label: "Creating reports about your team's completed work during a month/sprint/release", group: 'test-analyst', tier: 'senior' },

  // --- Test manager -------------------------------------------------------
  { id: 'project-estimation', label: 'Estimation of time/cost of testing activities (full project, team tasks)', group: 'test-manager', tier: 'middle' },
  { id: 'onboarding-training', label: 'Onboarding and training team members', group: 'test-manager', tier: 'middle' },
  { id: 'test-doc-development', label: 'Development of test documentation', group: 'test-manager', tier: 'middle' },
  { id: 'customer-test-reports', label: 'Creating test reports which include the evaluation of the product quality', group: 'test-manager', tier: 'middle' },
  { id: 'presale', label: 'Participation in presale activities (including communication with a customer)', group: 'test-manager', tier: 'senior' },
  { id: 'team-test-planning', label: 'Planning the testing process for the entire team', group: 'test-manager', tier: 'senior' },
  { id: 'role-distribution', label: 'Distribution of roles within a test team', group: 'test-manager', tier: 'senior' },
  { id: 'people-management', label: 'Managing team members (no less than 2 people)', group: 'test-manager', tier: 'senior' },
  { id: 'risk-management', label: 'Risk management in testing', group: 'test-manager', tier: 'senior' },

  // --- English ------------------------------------------------------------
  { id: 'english-reading', label: 'Can read and understand test documentation', group: 'english', tier: 'trainee' },
  { id: 'english-writing', label: 'Writing test documentation/emails to a customer', group: 'english', tier: 'junior' },
] as const;

export const COMPETENCY_BY_ID: ReadonlyMap<string, Competency> = new Map(
  COMPETENCIES.map((c) => [c.id, c]),
);
