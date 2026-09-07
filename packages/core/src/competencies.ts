import type { Competency } from './types.js';
import type { Locale } from './types.js';

/**
 * Кожен рядок навички з таблиці Performance Review ("QA roadmap employee copy"),
 * який можна оцінити письмовим тестом.
 *
 * `tier` зчитано з кольору заливки рядка у вихідній таблиці:
 *   #D9D9D9 сірий -> trainee, #D9EAD3 зелений -> junior,
 *   #FFF2CC жовтий -> middle, #F4CCCC червоний -> senior.
 *
 * `label` - українська назва для звіту кандидату, `sheetRow` - дослівний рядок
 * англійської таблиці, щоб рев’ювер міг зіставити будь-який рядок результату з
 * джерелом.
 *
 * Розділи "Books", "Certification/courses" і "Desired skills" тут навмисно
 * відсутні: прочитана книжка чи наявний сертифікат - це доказ, який збирають на
 * самому review, а не те, що може встановити тест із 20 питань. Рядки про
 * комунікацію із замовником (усна англійська, presale, звіти замовнику) з тієї
 * самої причини лишаються без питань, хоча й перелічені тут, бо вони є в
 * таблиці й можуть знадобитися для звітності.
 */
/**
 * The competency name in one language.
 *
 * The English side is `sheetRow` - the verbatim row from the Performance
 * Review sheet, which was already stored for traceability and is already
 * English. Using it rather than inventing a translation means the English
 * interface shows a candidate the exact wording their review will use, which
 * no translation of the Ukrainian label could guarantee.
 *
 * The coupling is deliberate but worth knowing: `sheetRow` is now read by the
 * UI as well as by the audit trail, so changing it changes both.
 */
export function competencyLabel(competency: Competency, locale: Locale): string {
  return locale === 'en' ? competency.sheetRow : competency.label;
}

export const COMPETENCIES: readonly Competency[] = [
  // --- Теорія -------------------------------------------------------------
  { id: 'test-artifacts', label: 'Тест-кейс / чек-лист / тестовий сценарій / тест-план / баг-репорт', sheetRow: 'Test case/checklist/test scenario/test plan/bug/bug report', group: 'theory', tier: 'trainee' },
  { id: 'severity-priority', label: 'Severity та Priority', sheetRow: 'Severity vs Priority', group: 'theory', tier: 'trainee' },
  { id: 'defect-lifecycle', label: 'Життєвий цикл дефекту', sheetRow: 'Defect life cycle', group: 'theory', tier: 'trainee' },
  { id: 'testing-types', label: 'Види і підвиди тестування', sheetRow: 'Testing types and subtypes', group: 'theory', tier: 'trainee' },
  { id: 'test-design-techniques', label: 'Техніки тест-дизайну', sheetRow: 'Test design techniques', group: 'theory', tier: 'trainee' },
  { id: 'news-trends', label: 'Уміння стежити за новинами і трендами', sheetRow: 'Ability to keep up with news and trends', group: 'theory', tier: 'trainee' },
  { id: 'verification-validation', label: 'Верифікація та валідація', sheetRow: 'Verification & Validation', group: 'theory', tier: 'junior' },
  { id: 'acceptance-criteria', label: 'Критерії приймання / Definition of Done', sheetRow: 'Acceptance criteria/Definition of Done', group: 'theory', tier: 'junior' },
  { id: 'testing-phases-goals', label: 'Фази і цілі тестування', sheetRow: 'Phases of testing and Goals of testing', group: 'theory', tier: 'junior' },
  { id: 'sdlc-methodologies', label: 'Життєвий цикл розробки, методології, фреймворки', sheetRow: 'Software development life cycle/Methodologies/Frameworks', group: 'theory', tier: 'junior' },
  { id: 'testing-principles', label: 'Принципи тестування', sheetRow: 'Principles of testing', group: 'theory', tier: 'junior' },
  { id: 'defect-management-systems', label: 'Системи керування дефектами і проєктами', sheetRow: 'Defect management system/Project management system', group: 'theory', tier: 'junior' },
  { id: 'testing-levels', label: 'Рівні тестування', sheetRow: 'Levels of testing', group: 'theory', tier: 'junior' },
  { id: 'oop-principles', label: 'Принципи ООП', sheetRow: 'OOP principles', group: 'theory', tier: 'junior' },
  { id: 'api-theory', label: 'API', sheetRow: 'API', group: 'theory', tier: 'middle' },
  { id: 'risks-in-testing', label: 'Ризики в тестуванні', sheetRow: 'Risks in testing', group: 'theory', tier: 'middle' },
  { id: 'testing-metrics', label: 'Метрики тестування', sheetRow: 'Testing metrics', group: 'theory', tier: 'middle' },
  { id: 'estimates-forecasts', label: 'Оцінки та прогнози', sheetRow: 'Estimates & forecasts', group: 'theory', tier: 'senior' },

  // --- Технічні навички ---------------------------------------------------
  { id: 'html-css', label: 'Основи верстки (HTML, CSS)', sheetRow: 'Webpage markup basics (HTML, CSS)', group: 'technical', tier: 'trainee' },
  { id: 'mobile-platforms', label: 'Мобільні технології і платформи', sheetRow: 'Mobile technologies and platforms', group: 'technical', tier: 'trainee' },
  { id: 'browser-architecture', label: 'Архітектура браузера (куки, localStorage тощо)', sheetRow: 'Web browser architecture (cookies, localstorage, etc.)', group: 'technical', tier: 'trainee' },
  { id: 'ci-systems', label: 'Системи безперервної інтеграції', sheetRow: 'Continuous integration systems', group: 'technical', tier: 'junior' },
  { id: 'databases', label: 'Основи баз даних (SQL/NoSQL)', sheetRow: 'Database basics (SQL/NoSQL)', group: 'technical', tier: 'junior' },
  { id: 'web-app-architecture', label: 'Архітектура і структура вебзастосунків', sheetRow: 'Architecture and structure of web apps', group: 'technical', tier: 'junior' },
  { id: 'rest-http', label: 'REST API і протоколи HTTP/HTTPS', sheetRow: 'REST API and HTTP/HTTPS protocols', group: 'technical', tier: 'junior' },
  { id: 'json', label: 'JSON', sheetRow: 'JSON', group: 'technical', tier: 'middle' },
  { id: 'unix', label: 'Основи Unix', sheetRow: 'Unix basics', group: 'technical', tier: 'middle' },
  { id: 'virtualization', label: 'Віртуалізація (vagrant/docker)', sheetRow: 'Virtualization (vagrant/docker)', group: 'technical', tier: 'middle' },
  { id: 'dev-algorithms', label: 'Основи розробки та алгоритмів', sheetRow: 'The basics of development and algorithms', group: 'technical', tier: 'senior' },
  { id: 'vcs', label: 'Системи контролю версій', sheetRow: 'VCS', group: 'technical', tier: 'senior' },

  // --- Автоматизація ------------------------------------------------------
  { id: 'auto-web-ui', label: 'Автоматизація функціональних тестів WEB UI', sheetRow: 'Automation of WEB UI (functional) tests', group: 'automation', tier: 'middle' },
  { id: 'auto-mobile-ui', label: 'Автоматизація функціональних тестів Mobile UI', sheetRow: 'Automation of Mobile UI (functional) tests', group: 'automation', tier: 'middle' },
  { id: 'auto-performance', label: 'Автоматизація тестів продуктивності та навантаження', sheetRow: 'Automation of Performance/Load tests', group: 'automation', tier: 'middle' },
  { id: 'auto-api', label: 'Автоматизація тестів API', sheetRow: 'Automation of API tests', group: 'automation', tier: 'middle' },
  { id: 'auto-db', label: 'Автоматизоване тестування баз даних', sheetRow: 'Automated DB testing', group: 'automation', tier: 'middle' },
  { id: 'static-analysis', label: 'Уміння користуватися інструментами статичного аналізу коду', sheetRow: 'Ability to use tools for static code analysis', group: 'automation', tier: 'senior' },
  { id: 'unit-tests', label: 'Написання модульних тестів', sheetRow: 'Writing unit tests', group: 'automation', tier: 'senior' },
  { id: 'test-frameworks', label: 'Створення власних тестових фреймворків', sheetRow: 'Creating your own test frameworks', group: 'automation', tier: 'senior' },

  // --- Test executor ------------------------------------------------------
  { id: 'defect-reports-en', label: 'Створення баг-репортів (англійською)', sheetRow: 'Creating defect reports (in English)', group: 'test-executor', tier: 'trainee' },
  { id: 'test-execution', label: 'Виконання готових тест-кейсів, чек-листів і сценаріїв', sheetRow: 'Execution of ready test cases, checklists or test scenarios', group: 'test-executor', tier: 'trainee' },
  { id: 'daily-reports', label: 'Звіти про виконані задачі за день / тиждень / місяць', sheetRow: 'Creating reports about tasks accomplished during a day/a week/a month', group: 'test-executor', tier: 'trainee' },
  { id: 'story-verification', label: 'Перевірка сторі суворо за критеріями приймання', sheetRow: 'Verification of a story, in strict accordance with its acceptance criteria', group: 'test-executor', tier: 'junior' },
  { id: 'rough-estimation', label: 'Приблизна оцінка часу і вартості тестування задачі', sheetRow: 'Approximate estimation of time/cost to test a specific task/story', group: 'test-executor', tier: 'junior' },

  // --- Test analyst -------------------------------------------------------
  { id: 'test-documentation', label: 'Створення тестової документації (кейси, чек-листи, mind map)', sheetRow: 'Creating test documentation (test cases, checklists, mind maps etc.)', group: 'test-analyst', tier: 'trainee' },
  { id: 'requirements-testing', label: 'Тестування вимог', sheetRow: 'Requirements testing', group: 'test-analyst', tier: 'junior' },
  { id: 'test-planning-tasks', label: 'Планування тестування конкретних задач', sheetRow: 'Planning of testing activities for specific tasks', group: 'test-analyst', tier: 'junior' },
  { id: 'precise-estimation', label: 'Точна оцінка часу і вартості тестування (епіки, сторі, баги, види тестування)', sheetRow: 'Estimation of time/cost of testing activities (epics, stories, bugs, testing types)', group: 'test-analyst', tier: 'middle' },
  { id: 'process-analysis', label: 'Аналіз процесу тестування', sheetRow: 'Analysis of testing process', group: 'test-analyst', tier: 'middle' },
  { id: 'test-plan', label: 'Написання тест-плану', sheetRow: 'Writing a test plan', group: 'test-analyst', tier: 'senior' },
  { id: 'process-optimization', label: 'Оптимізація процесу тестування', sheetRow: 'Optimization of testing process', group: 'test-analyst', tier: 'senior' },
  { id: 'team-reports', label: 'Звіти про роботу команди за місяць / спринт / реліз', sheetRow: "Creating reports about your team's completed work during a month/sprint/release", group: 'test-analyst', tier: 'senior' },

  // --- Test manager -------------------------------------------------------
  { id: 'project-estimation', label: 'Оцінка часу і вартості тестування (проєкт цілком, задачі команди)', sheetRow: 'Estimation of time/cost of testing activities (full project, team tasks)', group: 'test-manager', tier: 'middle' },
  { id: 'onboarding-training', label: 'Онбординг і навчання членів команди', sheetRow: 'Onboarding and training team members', group: 'test-manager', tier: 'middle' },
  { id: 'test-doc-development', label: 'Розробка тестової документації', sheetRow: 'Development of test documentation', group: 'test-manager', tier: 'middle' },
  { id: 'customer-test-reports', label: 'Звіти про тестування з оцінкою якості продукту', sheetRow: 'Creating test reports which include the evaluation of the product quality', group: 'test-manager', tier: 'middle' },
  { id: 'presale', label: 'Участь у presale-активностях', sheetRow: 'Participation in presale activities (including communication with a customer)', group: 'test-manager', tier: 'senior' },
  { id: 'team-test-planning', label: 'Планування процесу тестування для всієї команди', sheetRow: 'Planning the testing process for the entire team', group: 'test-manager', tier: 'senior' },
  { id: 'role-distribution', label: 'Розподіл ролей усередині команди тестування', sheetRow: 'Distribution of roles within a test team', group: 'test-manager', tier: 'senior' },
  { id: 'people-management', label: 'Управління членами команди (не менше 2 осіб)', sheetRow: 'Managing team members (no less than 2 people)', group: 'test-manager', tier: 'senior' },
  { id: 'risk-management', label: 'Управління ризиками в тестуванні', sheetRow: 'Risk management in testing', group: 'test-manager', tier: 'senior' },

  // --- Англійська ---------------------------------------------------------
  { id: 'english-reading', label: 'Читання і розуміння тестової документації англійською', sheetRow: 'Can read and understand test documentation', group: 'english', tier: 'trainee' },
  { id: 'english-writing', label: 'Написання тестової документації англійською', sheetRow: 'Writing test documentation/emails to a customer', group: 'english', tier: 'junior' },
] as const;

export const COMPETENCY_BY_ID: ReadonlyMap<string, Competency> = new Map(
  COMPETENCIES.map((c) => [c.id, c]),
);
