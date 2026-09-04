# Test variants - answer key

> **Internal document.** Contains the correct answer for every question.
> Do not circulate to anyone who may take the test.

Generated from the question bank by `npm run export:variants`.
The variants are deterministic, so an unchanged bank regenerates this file byte for byte.

## Bank summary

- Questions in the bank: **516**
- Papers: **50**, each of **20** questions

| Tier | Questions in bank |
| --- | --- |
| trainee | 113 |
| junior | 151 |
| middle | 143 |
| senior | 109 |

| Source | Questions in bank |
| --- | --- |
| Performance Review matrix | 288 |
| ISTQB Glossary | 45 |
| Practice-test style | 45 |
| ISTQB Foundation Level | 42 |
| ISTQB Test Analyst | 64 |
| ISTQB Test Manager | 32 |

Question reuse across the 50 papers: min 1, max 3, 515 of 516 questions in play.

---

## Variant 1

**1. In a classic three-tier web application, the tiers are:**  
<sub>JR-ARCH-001 &middot; junior &middot; Performance Review matrix &middot; Architecture and structure of web apps</sub>

- a) Presentation, application/business logic, and data **(correct)**
- b) HTML, CSS and JavaScript
- c) Frontend, backend and QA
- d) Development, staging and production

> The three-tier split is the mental model that lets a tester localise a defect to a layer before writing the report.

**2. Cone-of-uncertainty reasoning implies that an estimate given at project start should be:**  
<sub>SR-FC-004 &middot; senior &middot; Performance Review matrix &middot; Estimates & forecasts</sub>

- a) Expressed as a wide range and re-forecast as information accrues **(correct)**
- b) Given as a single committed number
- c) Refused
- d) Doubled as a safety margin

> A single number at the widest point of the cone is a commitment made with the least information anyone will ever have.

**3. ISTQB Glossary: the "test basis" is:**  
<sub>GL-T-010 &middot; trainee &middot; ISTQB Glossary &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) The body of knowledge used as the basis for test analysis and design **(correct)**
- b) The test environment
- c) The set of test data
- d) The test management tool

> Requirements, designs, code, risk analyses and even experience can all serve as a test basis.

**4. Escaped defects cluster in areas that were tested last, close to the deadline. The structural fix is:**  
<sub>STA-005 &middot; senior &middot; ISTQB Test Analyst &middot; Analysis of testing process</sub>

- a) Reorder the plan so high-risk areas are tested first, not last **(correct)**
- b) Extend the schedule
- c) Add testers at the end
- d) Increase the regression suite

> Testing high risk last means the least time to react to what you find. It is a planning defect, not a capacity defect.

**5. Which locator strategy is generally the most brittle?**  
<sub>MD-AWEB-004 &middot; middle &middot; Performance Review matrix &middot; Automation of WEB UI (functional) tests</sub>

- a) An absolute XPath through the DOM hierarchy **(correct)**
- b) A dedicated data-testid
- c) An element id
- d) An accessible role plus name

> Absolute XPath encodes the entire document structure, so any wrapper div added by a designer breaks it.

**6. Confirmation testing is performed to:**  
<sub>FL-2-003 &middot; junior &middot; ISTQB Foundation Level &middot; Testing types and subtypes</sub>

- a) Verify that a previously failing defect has actually been fixed **(correct)**
- b) Check that unchanged areas still work
- c) Measure system performance
- d) Validate the requirements

> Confirmation testing (retesting) is about the fix. Regression testing is about the collateral damage the fix may have caused.

**7. A feature flag lets a team:**  
<sub>SR-VCS-004 &middot; senior &middot; Performance Review matrix &middot; VCS</sub>

- a) Merge incomplete work to main while keeping it disabled in production **(correct)**
- b) Skip testing the feature
- c) Avoid version control
- d) Deploy without a pipeline

> Flags create a combinatorial test surface of their own: on, off, and the transition between them with existing data.

**8. What does the HTTP header "Content-Type: application/json" tell the server?**  
<sub>JR-HTTP-005 &middot; junior &middot; Performance Review matrix &middot; REST API and HTTP/HTTPS protocols</sub>

- a) The request body is JSON and should be parsed as such **(correct)**
- b) The response must be JSON
- c) The connection is encrypted
- d) The request is cacheable

> Accept is the header that states what the client wants back; Content-Type describes what is being sent.

**9. Which is the most reliable primary source for the definition of a testing term?**  
<sub>TR-NEWS-001 &middot; trainee &middot; Performance Review matrix &middot; Ability to keep up with news and trends</sub>

- a) The ISTQB Glossary **(correct)**
- b) The first result of a web search
- c) A colleague recollection
- d) A vendor marketing page

> The ISTQB Glossary is the maintained, versioned reference the industry actually agrees on. Vendor pages define terms to fit their product.

**10. The Page Object pattern primarily improves:**  
<sub>MD-AWEB-001 &middot; middle &middot; Performance Review matrix &middot; Automation of WEB UI (functional) tests</sub>

- a) Maintainability, by keeping locators and page behaviour in one place **(correct)**
- b) Execution speed
- c) Defect detection rate
- d) Browser compatibility

> When a locator changes, one file changes. Without it, the same selector is scattered across dozens of tests.

**11. A test policy differs from a test strategy in that the policy:**  
<sub>TM-001 &middot; senior &middot; ISTQB Test Manager &middot; Writing a test plan</sub>

- a) States why the organisation tests; the strategy states how, in general terms **(correct)**
- b) Is written per project
- c) Lists the test cases
- d) Defines the tools

> CTAL-TM orders the documents: policy (why) -> strategy (how, organisation-wide) -> test plan (this project) -> level test plans.

**12. A pilot project before rolling out a new test tool is recommended in order to:**  
<sub>FL-6-003 &middot; junior &middot; ISTQB Foundation Level &middot; Automation of WEB UI (functional) tests</sub>

- a) Evaluate fit with the existing process and technology at low cost **(correct)**
- b) Delay the decision
- c) Train the whole company at once
- d) Satisfy the vendor

> A pilot converts a purchasing argument into evidence about your own codebase and your own team.

**13. A hard refresh (Ctrl+Shift+R) differs from a normal refresh because it:**  
<sub>TR-BROW-004 &middot; trainee &middot; Performance Review matrix &middot; Web browser architecture (cookies, localstorage, etc.)</sub>

- a) Bypasses the browser cache and re-downloads resources **(correct)**
- b) Clears all cookies
- c) Restarts the browser
- d) Opens the page in a new tab

> Hard refresh ignores cached assets. It is the first thing to try when a fix is deployed but the old bundle is still being served.

**14. Test coverage of 90% of requirements tells you:**  
<sub>MD-MET-004 &middot; middle &middot; Performance Review matrix &middot; Testing metrics</sub>

- a) Which requirements have at least one test, and nothing about test quality **(correct)**
- b) That 90% of defects were found
- c) That the product is 90% ready
- d) That 10% of the code is broken

> Coverage counts links, not rigour. A weak test still marks a requirement covered.

**15. Acceptance criteria for a user story should be:**  
<sub>JR-AC-001 &middot; junior &middot; Performance Review matrix &middot; Acceptance criteria/Definition of Done</sub>

- a) Testable, unambiguous and agreed before development starts **(correct)**
- b) Written by the tester after the demo
- c) As general as possible to allow flexibility
- d) Optional for small stories

> Criteria agreed up front are a shared definition of done for that story. Criteria written afterwards describe what was built, which is not the same thing.

**16. A field accepts a date range where the end date must not precede the start date. The strongest test set covers:**  
<sub>TA-A-006 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) End before start, end equal to start, end after start, and both empty **(correct)**
- b) Only valid ranges
- c) Only the maximum range
- d) Only the minimum range

> The rule creates three relational partitions plus the missing-value case, and equal-to-start is the boundary most often implemented wrong.

**17. Two days before release, a critical defect is found in an area that was descoped as low risk. The right response is:**  
<sub>DP-M-006 &middot; middle &middot; Practice-test style &middot; Risks in testing</sub>

- a) Report it, reassess the risk model, and let the risk owner decide on the release **(correct)**
- b) Fix it quietly
- c) Delay the release unilaterally
- d) Close it as out of scope

> A miss in the risk model is information about the model. Concealing it removes the decision from the person who owns it.

**18. ISTQB Glossary: "maintenance testing" is testing:**  
<sub>GL-J-006 &middot; junior &middot; ISTQB Glossary &middot; Testing types and subtypes</sub>

- a) A modified operational system, or the impact of a changed environment on it **(correct)**
- b) Of a system still in development
- c) Performed by the maintenance team only
- d) Of the test environment

> It covers changes, migrations, retirements and environment upgrades, and it always includes regression testing.

**19. You are blocked by a broken test environment. When should this appear in your report?**  
<sub>TR-DAY-002 &middot; trainee &middot; Performance Review matrix &middot; Creating reports about tasks accomplished during a day/a week/a month</sub>

- a) Immediately, as soon as it blocks you **(correct)**
- b) In the weekly summary
- c) Only if it lasts more than two days
- d) Only if the customer asks

> Blockers lose value with delay. Reporting one on Friday that started on Monday has already cost the project four days.

**20. Root cause information in a defect report is valuable because it:**  
<sub>TA-D-003 &middot; middle &middot; ISTQB Test Analyst &middot; Defect management system/Project management system</sub>

- a) Enables process improvement across future projects **(correct)**
- b) Speeds up the current fix
- c) Changes the severity
- d) Satisfies the tracker workflow

> Individual fixes solve one instance; root cause data is what lets you stop producing the class.

---

## Variant 2

**1. Which principle explains why regression suites must be reviewed and updated?**  
<sub>FL-1-005 &middot; junior &middot; ISTQB Foundation Level &middot; Principles of testing</sub>

- a) Tests wear out **(correct)**
- b) Defects cluster together
- c) Testing is context dependent
- d) Early testing saves time and money

> The pesticide paradox: unchanged tests stop finding new defects, so the suite must be revised and extended over time.

**2. ISTQB Glossary: "quality assurance" focuses on:**  
<sub>GL-J-015 &middot; junior &middot; ISTQB Glossary &middot; Phases of testing and Goals of testing</sub>

- a) Providing confidence that quality requirements will be fulfilled, through process **(correct)**
- b) Finding defects in the product
- c) Executing test cases
- d) Fixing defects

> QA is process-oriented and preventive; testing (quality control) is product-oriented and detective.

**3. A discount engine: orders over 500 get 10%, loyalty members get an extra 5%, and expired cards are rejected. Which technique gives the most systematic coverage?**  
<sub>TA-A-001 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) A decision table over the three conditions **(correct)**
- b) Boundary value analysis alone
- c) State transition testing
- d) Exploratory testing alone

> Three independent conditions producing different actions is the textbook shape for a decision table; BVA then covers the 500 boundary inside it.

**4. The most useful output of a risk workshop for a tester is:**  
<sub>MD-RISK-003 &middot; middle &middot; Performance Review matrix &middot; Risks in testing</sub>

- a) A prioritised list of risk areas that determines depth of coverage **(correct)**
- b) A longer test plan
- c) A list of everyone who attended
- d) A fixed number of test cases per module

> Risk priority is what converts limited time into a defensible coverage decision.

**5. A user reports that they are logged out every time they close the browser, although "remember me" was checked. The most likely cause is:**  
<sub>DP-T-004 &middot; trainee &middot; Practice-test style &middot; Web browser architecture (cookies, localstorage, etc.)</sub>

- a) The session cookie has no expiry, so it is deleted at browser close **(correct)**
- b) The password is wrong
- c) The server is down
- d) JavaScript is disabled

> A cookie without Expires or Max-Age is a session cookie by definition, which is exactly the symptom described.

**6. Which is the strongest basis for a testing forecast?**  
<sub>SR-FC-003 &middot; senior &middot; Performance Review matrix &middot; Estimates & forecasts</sub>

- a) Historical velocity and defect data from comparable releases of the same product **(correct)**
- b) Industry benchmark ratios
- c) The project manager preference
- d) The size of the requirements document

> Your own history includes your team overheads, your domain and your codebase - none of which a benchmark ratio knows.

**7. A typo appears in an error message shown only to internal admins. Most likely:**  
<sub>TR-SEV-006 &middot; trainee &middot; Performance Review matrix &middot; Severity vs Priority</sub>

- a) Low severity, low priority **(correct)**
- b) High severity, high priority
- c) High severity, low priority
- d) Low severity, high priority

> Cosmetic, internal-only and non-blocking: low on both axes. It still belongs in the tracker so it can be batched into a text-cleanup task.

**8. Kanban differs from Scrum principally because it:**  
<sub>JR-SDLC-003 &middot; junior &middot; Performance Review matrix &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) Uses a continuous flow with WIP limits rather than fixed iterations **(correct)**
- b) Forbids daily meetings
- c) Has no board
- d) Requires no estimation ever

> Kanban optimises flow and limits work in progress; Scrum timeboxes work into sprints. Both use boards and both can estimate.

**9. A senior tester is disengaged after two years on the same regression suite. The most effective response is:**  
<sub>TM-031 &middot; senior &middot; ISTQB Test Manager &middot; Managing team members (no less than 2 people)</sub>

- a) Give them ownership of a meaningful improvement or a new technical area **(correct)**
- b) Increase their workload
- c) Move them to another project immediately
- d) Ignore it until they raise it

> Autonomy and mastery are what the situation lacks. More of the same work addresses neither.

**10. State transition testing is the natural fit when:**  
<sub>TR-TDT-004 &middot; trainee &middot; Performance Review matrix &middot; Test design techniques</sub>

- a) The system behaves differently depending on what happened before **(correct)**
- b) Inputs are independent numeric ranges
- c) There is no specification at all
- d) Only performance matters

> State transition testing models states, events, transitions and actions, and is the right tool whenever history changes behaviour (order status, session state, device modes).

**11. A Test Analyst notices that the test basis is untestable in several places. The correct action is:**  
<sub>TA-P-004 &middot; middle &middot; ISTQB Test Analyst &middot; Analysis of testing process</sub>

- a) Raise the issues as defects in the test basis before test design starts **(correct)**
- b) Design tests anyway and interpret freely
- c) Wait for the code and test against it
- d) Escalate to the customer directly

> Reporting test-basis defects is one of the highest-value activities the analyst performs, and it must happen before design effort is spent.

**12. Verification answers which question?**  
<sub>JR-VV-001 &middot; junior &middot; Performance Review matrix &middot; Verification & Validation</sub>

- a) Are we building the product right? **(correct)**
- b) Are we building the right product?
- c) Is the product profitable?
- d) Is the product fast enough?

> Verification checks the product against its specification. Validation checks it against the real user need - a product can pass verification completely and still be the wrong product.

**13. A test summary report at project close should include:**  
<sub>TM-024 &middot; senior &middot; ISTQB Test Manager &middot; Creating test reports which include the evaluation of the product quality</sub>

- a) What was tested, results, residual risk and lessons learned **(correct)**
- b) Only the defect count
- c) Only the pass rate
- d) Only the schedule variance

> The lessons-learned section is what makes the next project cheaper; it is also the first thing cut under pressure.

**14. Automation coverage rose from 40% to 80%, but escaped defects did not fall. The most likely explanation is:**  
<sub>DP-M-007 &middot; middle &middot; Practice-test style &middot; Testing metrics</sub>

- a) The new tests cover low-risk code or assert weakly **(correct)**
- b) The metric is wrong
- c) Escaped defects always lag by a year
- d) Manual testing was reduced too little

> Coverage that does not target where defects escape adds runtime cost without adding detection.

**15. Which acceptance criterion is untestable as written?**  
<sub>JR-AC-003 &middot; junior &middot; Performance Review matrix &middot; Acceptance criteria/Definition of Done</sub>

- a) The page should load reasonably fast **(correct)**
- b) The page loads within 2 seconds on a 4G connection
- c) An error message is shown when the email is invalid
- d) The user is redirected to /dashboard after login

> "Reasonably fast" has no oracle. A criterion that two people can read differently will be disputed at exactly the wrong moment.

**16. Preconditions in a test case exist to:**  
<sub>TR-DOC-005 &middot; trainee &middot; Performance Review matrix &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) State the system and data state required before step 1 **(correct)**
- b) List the defects found earlier
- c) Name the author
- d) Record the execution date

> Preconditions make a case reproducible by someone who is not you, on a machine that is not yours.

**17. The main difference between a container and a virtual machine is that a container:**  
<sub>MD-VIRT-001 &middot; middle &middot; Performance Review matrix &middot; Virtualization (vagrant/docker)</sub>

- a) Shares the host kernel instead of running a full guest OS **(correct)**
- b) Cannot be networked
- c) Is always slower
- d) Cannot run databases

> Sharing the kernel is what makes containers start in milliseconds and ship in megabytes rather than gigabytes.

**18. A high false-positive rate in a static analysis tool is dangerous because:**  
<sub>SR-SA-003 &middot; senior &middot; Performance Review matrix &middot; Ability to use tools for static code analysis</sub>

- a) Developers start suppressing findings wholesale, including the true ones **(correct)**
- b) The build gets slower
- c) It uses more licences
- d) It duplicates code review

> Tuning the ruleset down to a trusted core is more valuable than enabling every rule available.

**19. Which metric best supports a release decision?**  
<sub>FL-5-005 &middot; junior &middot; ISTQB Foundation Level &middot; Testing metrics</sub>

- a) Residual risk expressed through coverage of high-risk areas and open defects by severity **(correct)**
- b) Total number of test cases written
- c) Number of hours spent testing
- d) Number of testers on the team

> A release decision is a risk decision. Effort and volume metrics describe the test team, not the product.

**20. Automated API tests should clean up the data they create because:**  
<sub>MD-AAPI-003 &middot; middle &middot; Performance Review matrix &middot; Automation of API tests</sub>

- a) Accumulated state makes later runs non-deterministic **(correct)**
- b) Storage is expensive
- c) The API requires it
- d) It speeds up the tests

> Setup and teardown per test are what make a suite runnable a thousand times with the same result.

---

## Variant 3

**1. Two weeks of testing are cut to one. The risk-based response is to:**  
<sub>MD-RISK-005 &middot; middle &middot; Performance Review matrix &middot; Risks in testing</sub>

- a) Cut coverage of the lowest-risk areas and report the resulting residual risk **(correct)**
- b) Cut the depth of every area equally
- c) Cut regression entirely
- d) Keep the plan and work overtime

> Uniform cuts damage high-risk coverage as much as low-risk coverage, which is the opposite of what a risk model is for.

**2. In the fundamental test process, which activity comes immediately after test planning?**  
<sub>JR-PH-002 &middot; junior &middot; Performance Review matrix &middot; Phases of testing and Goals of testing</sub>

- a) Test monitoring and control, running alongside analysis and design **(correct)**
- b) Test execution
- c) Test closure
- d) Defect reporting

> ISTQB v4 lists planning, monitoring and control, analysis, design, implementation, execution and completion. Monitoring and control runs continuously from planning onward.

**3. Which coverage is achieved when every statement in the code has been executed at least once?**  
<sub>FL-4-003 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) Statement coverage **(correct)**
- b) Branch coverage
- c) Decision coverage
- d) Path coverage

> 100% branch coverage implies 100% statement coverage, but not the other way around: a lone if with no else reaches every statement without taking the false branch.

**4. Defect Removal Efficiency measures:**  
<sub>TM-018 &middot; senior &middot; ISTQB Test Manager &middot; Testing metrics</sub>

- a) The proportion of defects removed before release **(correct)**
- b) The speed of fixing
- c) The number of defects per developer
- d) The cost per defect

> DRE is a process-effectiveness metric and is one of the few that can justify investment in earlier testing.

**5. Which of the following belongs in a test plan rather than in a test case?**  
<sub>TR-ART-005 &middot; trainee &middot; Performance Review matrix &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) Entry and exit criteria for the test phase **(correct)**
- b) The exact value typed into the login field
- c) The expected HTTP status code
- d) The precondition that a user account exists

> Entry/exit criteria, scope, schedule, environments and risks are planning-level concerns. Concrete data and expected results live in test cases.

**6. Which metric is most easily gamed and therefore most dangerous as a target?**  
<sub>MD-MET-002 &middot; middle &middot; Performance Review matrix &middot; Testing metrics</sub>

- a) Number of test cases written **(correct)**
- b) Defect detection percentage
- c) Requirements coverage
- d) Escaped defects per release

> Case count rewards splitting one test into ten. Goodhart law applies: a measure that becomes a target stops being a measure.

**7. Effective feedback to a team member is:**  
<sub>SR-PM-002 &middot; senior &middot; Performance Review matrix &middot; Managing team members (no less than 2 people)</sub>

- a) Specific, timely, about observable behaviour and its impact **(correct)**
- b) General and delivered annually
- c) Given in front of the team
- d) Focused on personality

> Behaviour plus impact is actionable; personality is not, and the person cannot do anything with it.

**8. ISTQB Glossary: "white-box testing" derives tests from:**  
<sub>GL-J-011 &middot; junior &middot; ISTQB Glossary &middot; Testing types and subtypes</sub>

- a) The internal structure or implementation of the test object **(correct)**
- b) The specification only
- c) The tester experience
- d) The defect history

> Black-box derives from external descriptions; experience-based derives from knowledge and intuition.

**9. Which activity is validation rather than verification?**  
<sub>JR-VV-002 &middot; junior &middot; Performance Review matrix &middot; Verification & Validation</sub>

- a) User acceptance testing with real users on real scenarios **(correct)**
- b) A requirements review
- c) A code inspection
- d) Checking a design document against the spec

> Validation involves the actual need and the actual user. Reviews and inspections compare an artefact against another artefact, which is verification.

**10. A system has 4 boolean configuration flags and 3 user roles. Full combinatorial coverage requires 48 cases. Pairwise would need roughly:**  
<sub>TA-T-009 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Fewer than 15 **(correct)**
- b) Exactly 48
- c) Exactly 24
- d) More than 48

> Pairwise typically collapses such spaces by an order of magnitude while covering every pair of values at least once.

**11. ISTQB Glossary: "smoke test" is:**  
<sub>GL-T-012 &middot; trainee &middot; ISTQB Glossary &middot; Testing types and subtypes</sub>

- a) A subset of tests covering the main functionality to decide whether the build is testable **(correct)**
- b) An exhaustive test of one module
- c) A test of error handling
- d) A test executed by the customer

> It is a gate, not a quality assessment. A build that passes smoke has earned a day of testing, nothing more.

**12. A Test Analyst evaluating a test data preparation tool should weigh most heavily:**  
<sub>TA-X-001 &middot; middle &middot; ISTQB Test Analyst &middot; Automation of API tests</sub>

- a) Whether it can produce realistic, referentially consistent data at volume **(correct)**
- b) Its user interface colours
- c) Its licence popularity
- d) Whether it is open source

> Data that violates referential integrity produces test failures that teach the team to ignore failures.

**13. Test progress reporting should communicate primarily:**  
<sub>FL-5-009 &middot; junior &middot; ISTQB Foundation Level &middot; Testing metrics</sub>

- a) Status against the plan, product risks and impediments **(correct)**
- b) How many hours each tester logged
- c) The number of defects each developer created
- d) The volume of documentation produced

> The purpose of a progress report is to support a decision by the stakeholders reading it.

**14. You have two days to test a feature that would need five to cover fully. The right approach is to:**  
<sub>JR-PLAN-002 &middot; junior &middot; Performance Review matrix &middot; Planning of testing activities for specific tasks</sub>

- a) Prioritise by risk, state explicitly what will not be covered, and agree it **(correct)**
- b) Test everything superficially
- c) Test the first half thoroughly and stop
- d) Silently extend the deadline

> The deliverable of a constrained plan is an explicit, agreed coverage gap - not an implicit one nobody knows about.

**15. A regression suite has grown to 3,000 cases with an unknown failure yield. The analyst should first:**  
<sub>STA-013 &middot; senior &middot; ISTQB Test Analyst &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) Measure which cases have ever failed and correlate with risk before pruning **(correct)**
- b) Delete the oldest third
- c) Automate all of them
- d) Keep them all indefinitely

> Pruning without data removes the wrong cases. Historical yield plus risk is the evidence needed to defend the decision.

**16. A field accepts integers from 1 to 100. Using boundary value analysis with the two-value approach, which set is correct?**  
<sub>TR-TDT-001 &middot; trainee &middot; Performance Review matrix &middot; Test design techniques</sub>

- a) 0, 1, 100, 101 **(correct)**
- b) 1, 50, 100
- c) 0, 50, 101
- d) 1, 2, 99, 100

> The two-value approach takes each boundary and its nearest neighbour outside the partition: 0 and 1 at the lower edge, 100 and 101 at the upper edge.

**17. A high-likelihood, high-impact risk with no mitigation should be:**  
<sub>SR-RM-003 &middot; senior &middot; Performance Review matrix &middot; Risk management in testing</sub>

- a) Escalated immediately with options and a recommendation **(correct)**
- b) Monitored quietly
- c) Accepted silently
- d) Removed from the register

> Escalation with options is the deliverable; escalation with only a problem transfers work upwards without transferring information.

**18. ISTQB Glossary: "API testing" is:**  
<sub>GL-M-013 &middot; middle &middot; ISTQB Glossary &middot; API</sub>

- a) Testing performed by submitting commands to the interfaces of the test object **(correct)**
- b) Testing the UI of an application
- c) Testing the database schema
- d) Testing network throughput

> It is a test approach defined by the interface used, not by a particular test level.

**19. Which bug report title is the most useful?**  
<sub>TR-REP-001 &middot; trainee &middot; Performance Review matrix &middot; Creating defect reports (in English)</sub>

- a) Checkout: order total ignores the applied promo code on Safari 17 **(correct)**
- b) Bug in checkout
- c) It does not work!!!
- d) Please fix urgently, customer is angry

> A good title states area, observed behaviour and, when relevant, the condition. It should be readable and searchable without opening the ticket.

**20. What is idempotency and why does it matter when testing a payment API?**  
<sub>MD-API-003 &middot; middle &middot; Performance Review matrix &middot; API</sub>

- a) Repeating the same request must not create a second charge **(correct)**
- b) The request must always return 200
- c) The request must be encrypted
- d) The request must complete within one second

> Network retries are routine. An idempotency key on POST is the mechanism that stops one user click becoming two payments.

---

## Variant 4

**1. Usability testing primarily evaluates:**  
<sub>TR-TYPE-004 &middot; trainee &middot; Performance Review matrix &middot; Testing types and subtypes</sub>

- a) How easily and efficiently real users can achieve their goals **(correct)**
- b) How many defects per module exist
- c) Whether the code follows the style guide
- d) Whether the database schema is normalised

> Usability is a non-functional quality characteristic measured with real users performing real tasks, not by counting defects.

**2. A test scenario differs from a test case mainly in that it:**  
<sub>TR-ART-004 &middot; trainee &middot; Performance Review matrix &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) Describes a user flow at a higher level, without exhaustive step detail **(correct)**
- b) Is always automated
- c) Contains no expected result at all
- d) Can only be executed once

> A test scenario captures an end-to-end flow ("user registers and completes a first purchase"). Test cases underneath it spell out the concrete steps.

**3. A key limitation of testing exclusively on emulators and simulators is that they cannot faithfully reproduce:**  
<sub>MD-AMOB-002 &middot; middle &middot; Performance Review matrix &middot; Automation of Mobile UI (functional) tests</sub>

- a) Real hardware behaviour: sensors, performance, battery, network conditions **(correct)**
- b) Screen layout
- c) Button taps
- d) Application logic

> Layout and logic transfer well. Performance, thermal behaviour and radio conditions do not, which is why a real-device tier is required.

**4. An API returns "created_at": "2026-03-15T02:30:00" with no timezone. Why is this a defect?**  
<sub>DP-M-003 &middot; middle &middot; Practice-test style &middot; JSON</sub>

- a) The client cannot know the offset, so the same value renders differently per user **(correct)**
- b) JSON forbids date strings
- c) The format is too long
- d) It should be a number

> Missing offsets are one of the most common and most under-reported API contract defects.

**5. Reporting individual defect counts per tester in a team report is problematic because:**  
<sub>SR-TR-003 &middot; senior &middot; Performance Review matrix &middot; Creating reports about your team's completed work during a month/sprint/release</sub>

- a) It incentivises volume and discourages helping teammates **(correct)**
- b) It takes time to collect
- c) It is not accurate
- d) Managers do not read it

> It converts a collaborative activity into a competition measured by the least meaningful available number.

**6. During test analysis, the Test Analyst identifies test conditions. The best source when requirements are incomplete is:**  
<sub>TA-P-001 &middot; middle &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) A combination of stakeholders, existing systems and experience-based techniques **(correct)**
- b) Guessing what the developer implemented
- c) The defect tracker only
- d) The previous project test cases

> CTAL-TA expects the analyst to work with an imperfect test basis by combining available sources rather than waiting for perfect requirements.

**7. A story has five acceptance criteria. Four pass, one fails. The story should be:**  
<sub>JR-STORY-001 &middot; junior &middot; Performance Review matrix &middot; Verification of a story, in strict accordance with its acceptance criteria</sub>

- a) Returned to development as not done **(correct)**
- b) Accepted with a follow-up ticket
- c) Accepted because 80% passed
- d) Accepted if the failing criterion is cosmetic

> Acceptance criteria are a conjunction, not a score. Partial acceptance quietly redefines done for the whole team.

**8. A single person is the only one who can run the performance suite. This is:**  
<sub>SR-ROLE-002 &middot; senior &middot; Performance Review matrix &middot; Distribution of roles within a test team</sub>

- a) A key-person risk that should be mitigated by cross-training **(correct)**
- b) Efficient specialisation to preserve
- c) A staffing budget issue
- d) Not a testing concern

> Bus factor one on a critical capability is a project risk and belongs in the risk register.

**9. A defect cannot be reproduced by the developer. The most useful next step for the tester is to:**  
<sub>TR-LIFE-005 &middot; trainee &middot; Performance Review matrix &middot; Defect life cycle</sub>

- a) Add environment details, build number, logs and a video to the report **(correct)**
- b) Immediately close the defect
- c) Raise its severity
- d) Reassign it to a different developer

> Non-reproducibility is almost always an information gap. Supply the missing context before escalating.

**10. Your estimate is exceeded halfway through the task. You should:**  
<sub>JR-EST-004 &middot; junior &middot; Performance Review matrix &middot; Approximate estimation of time/cost to test a specific task/story</sub>

- a) Flag it immediately with the current status and a revised estimate **(correct)**
- b) Work overtime silently
- c) Reduce test coverage without telling anyone
- d) Wait until the deadline to report it

> Overruns are only a problem when they are a surprise. Early escalation preserves everyone options.

**11. When negotiating a reduced test budget, the Test Manager should present:**  
<sub>TM-023 &middot; senior &middot; ISTQB Test Manager &middot; Estimation of time/cost of testing activities (full project, team tasks)</sub>

- a) The specific coverage that will be dropped and the risk it exposes **(correct)**
- b) A refusal
- c) A silent acceptance
- d) A uniform reduction across all areas

> Making the trade explicit moves the decision to whoever owns the risk, which is where it belongs.

**12. A review checklist for user stories should include:**  
<sub>TA-V-002 &middot; middle &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) Independent, negotiable, valuable, estimable, small, testable (INVEST) **(correct)**
- b) Number of words
- c) Author seniority
- d) Story point value

> INVEST is a widely used checklist; the "testable" criterion is the one a Test Analyst must defend hardest.

**13. Which is a black-box test technique?**  
<sub>FL-4-001 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) Equivalence partitioning **(correct)**
- b) Statement testing
- c) Branch testing
- d) Decision testing

> Statement, branch and decision testing are white-box: they need the code structure. Equivalence partitioning works from the specification.

**14. Traceability from test cases back to the test basis primarily supports:**  
<sub>FL-1-007 &middot; junior &middot; ISTQB Foundation Level &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) Coverage assessment and impact analysis when the basis changes **(correct)**
- b) Faster test execution
- c) Reduced test maintenance cost
- d) Higher defect detection rate

> Traceability answers "what is covered" and "what must be retested", and it is what makes test progress reporting meaningful.

**15. The "pesticide paradox" states that:**  
<sub>JR-PRIN-001 &middot; junior &middot; Performance Review matrix &middot; Principles of testing</sub>

- a) Repeating the same tests eventually stops finding new defects **(correct)**
- b) Defects cluster in a few modules
- c) Testing cannot prove the absence of defects
- d) Early testing saves money

> Test suites lose yield over time and must be reviewed and extended. It is the principle that justifies rotating and refreshing regression suites.

**16. The most reliable indicator that a test process improvement worked is:**  
<sub>TM-027 &middot; senior &middot; ISTQB Test Manager &middot; Analysis of testing process</sub>

- a) A measured change in an outcome metric against the pre-change baseline **(correct)**
- b) Positive team sentiment
- c) More documentation produced
- d) A larger test suite

> Sentiment and volume both move for reasons unrelated to quality.

**17. Which test case title is best?**  
<sub>DP-T-015 &middot; trainee &middot; Practice-test style &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) Login fails with a clear message when the password is incorrect **(correct)**
- b) Login test 3
- c) Check login
- d) Password

> A title should state the condition and the expected outcome so a reader can decide whether to run it without opening it.

**18. ISTQB Glossary: "shift left" is:**  
<sub>GL-J-012 &middot; junior &middot; ISTQB Glossary &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) An approach performing testing and quality activities earlier in the lifecycle **(correct)**
- b) Moving tests to another team
- c) Reducing test scope
- d) Testing in production

> It covers requirement reviews, static analysis, TDD and early integration, not just "test sooner".

**19. An API returns 200 OK with a body of {"error": "user not found"}. This is a defect because:**  
<sub>MD-API-005 &middot; middle &middot; Performance Review matrix &middot; API</sub>

- a) The status code contradicts the payload, so clients cannot rely on HTTP semantics **(correct)**
- b) The body should be XML
- c) 200 is never valid for GET
- d) The message is in English

> Clients, proxies, caches and monitoring all key off the status code. Encoding failures in a 200 breaks every one of them.

**20. Which factor most increases a testing estimate for the same feature set?**  
<sub>MD-PROJ-003 &middot; middle &middot; Performance Review matrix &middot; Estimation of time/cost of testing activities (full project, team tasks)</sub>

- a) A regulated domain requiring evidence and traceability **(correct)**
- b) A larger monitor
- c) A newer test tool
- d) More frequent stand-ups

> Compliance overhead - documented evidence, sign-offs, audit trails - can double the cost of identical functional coverage.

---

## Variant 5

**1. Keeping up with trends is part of the Performance Review because:**  
<sub>TR-NEWS-004 &middot; trainee &middot; Performance Review matrix &middot; Ability to keep up with news and trends</sub>

- a) Testing practice and tooling change, and stale practice quietly lowers quality **(correct)**
- b) Certificates are collected for their own sake
- c) Managers need something to measure
- d) It replaces hands-on experience

> The competency exists to keep practice current. It is assessed by what a tester brings back into the team, not by how many articles they read.

**2. Metrics-based estimation is more defensible than expert-based estimation when:**  
<sub>TM-009 &middot; senior &middot; ISTQB Test Manager &middot; Estimation of time/cost of testing activities (full project, team tasks)</sub>

- a) The organisation has reliable historical data from comparable projects **(correct)**
- b) The project is entirely new in domain and technology
- c) The team has just been formed
- d) No data has been collected

> Without history, metrics-based estimation projects a number from nothing, which is expert judgement with false precision.

**3. A localisation defect that only appears in Turkish is most likely caused by:**  
<sub>TA-A-010 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Case conversion rules (the dotted and dotless i) **(correct)**
- b) Screen size
- c) Network latency
- d) Database indexing

> The Turkish locale breaks naive toUpperCase/toLowerCase comparisons, which is the classic locale-dependent logic defect.

**4. A requirement is testable but only with a test that would cost more than the feature. The analyst should:**  
<sub>STA-008 &middot; senior &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) Report the cost, propose a cheaper partial oracle and let the risk owner decide **(correct)**
- b) Test it anyway
- c) Skip it silently
- d) Declare the requirement untestable

> Cost of verification is legitimate information for the risk owner, and hiding it makes the decision for them.

**5. A user sees a 502 Bad Gateway. This most likely means:**  
<sub>DP-J-008 &middot; junior &middot; Practice-test style &middot; Architecture and structure of web apps</sub>

- a) An upstream server gave an invalid response to the proxy **(correct)**
- b) The user entered a wrong URL
- c) The browser cache is stale
- d) The request body was malformed

> 502 is a proxy-level fault: the gateway reached the upstream but got something it could not use.

**6. Which pair of activities are both verification?**  
<sub>JR-VV-004 &middot; junior &middot; Performance Review matrix &middot; Verification & Validation</sub>

- a) Static analysis and a design review **(correct)**
- b) Beta testing and a design review
- c) User acceptance testing and static analysis
- d) Beta testing and alpha testing

> Both compare an artefact to its specification without involving the end user need.

**7. What is traceability in test documentation?**  
<sub>TR-DOC-002 &middot; trainee &middot; Performance Review matrix &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) A recorded link between requirements and the tests that cover them **(correct)**
- b) Numbering the test cases sequentially
- c) Storing documents in one folder
- d) Keeping a change log of the test plan

> Traceability is what lets you answer "is this requirement covered?" and "what must be retested if this requirement changes?".

**8. Which is an experience-based test technique?**  
<sub>FL-4-006 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) Exploratory testing **(correct)**
- b) Boundary value analysis
- c) Decision table testing
- d) Branch testing

> CTFL v4 lists error guessing, exploratory testing and checklist-based testing as the experience-based techniques.

**9. A test management tool adds most value when it:**  
<sub>TA-X-003 &middot; middle &middot; ISTQB Test Analyst &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) Links requirements, tests, runs and defects so coverage is queryable **(correct)**
- b) Stores documents
- c) Sends email notifications
- d) Generates charts

> The traceability graph is the product; charts are a view of it.

**10. In written test documentation, the preferred style for steps is:**  
<sub>JR-ENGW-002 &middot; junior &middot; Performance Review matrix &middot; Writing test documentation/emails to a customer</sub>

- a) Short imperative sentences: "Open the cart", "Enter 5 in Quantity" **(correct)**
- b) Long descriptive paragraphs
- c) Past tense narration
- d) Questions to the reader

> Imperative steps are unambiguous, scannable and translate directly into automation.

**11. Given {"user": {"roles": ["admin", "qa"]}}, which JSONPath selects the second role?**  
<sub>MD-JSON-004 &middot; middle &middot; Performance Review matrix &middot; JSON</sub>

- a) $.user.roles[1] **(correct)**
- b) $.user.roles[2]
- c) $.roles[1]
- d) $.user[roles][1]

> JSONPath arrays are zero-indexed, so index 1 is the second element.

**12. Which is the strongest argument against building a custom framework from scratch?**  
<sub>SR-TF-003 &middot; senior &middot; Performance Review matrix &middot; Creating your own test frameworks</sub>

- a) The maintenance cost is permanent and falls on your team alone **(correct)**
- b) Custom code is always slower
- c) It cannot integrate with CI
- d) It cannot be documented

> Every custom abstraction is a product you now own, including its documentation, onboarding and defects.

**13. System testing verifies:**  
<sub>JR-LVL-003 &middot; junior &middot; Performance Review matrix &middot; Levels of testing</sub>

- a) The complete, integrated system against the specified requirements **(correct)**
- b) A single class in isolation
- c) Only the database layer
- d) Only performance characteristics

> System testing is the first level where the product is exercised end to end in a production-like environment.

**14. Which risk response is being applied when a team buys a device cloud rather than maintaining its own device lab?**  
<sub>SR-RM-004 &middot; senior &middot; Performance Review matrix &middot; Risk management in testing</sub>

- a) Transfer **(correct)**
- b) Avoid
- c) Accept
- d) Exploit

> The operational risk moves to the supplier. The residual risk (supplier availability) should then be recorded.

**15. Reporting "I tested the application today" is weak mainly because:**  
<sub>TR-DAY-005 &middot; trainee &middot; Performance Review matrix &middot; Creating reports about tasks accomplished during a day/a week/a month</sub>

- a) It states no scope, no result and no risk **(correct)**
- b) It is too short
- c) It is in the wrong tense
- d) It does not mention the tool used

> The sentence cannot support any decision. Scope, outcome and risk are the minimum content of a useful status line.

**16. An element is visible but a click does nothing. Which is the most likely front-end cause to check first?**  
<sub>DP-T-007 &middot; trainee &middot; Practice-test style &middot; Webpage markup basics (HTML, CSS)</sub>

- a) Another element overlaps it and receives the click **(correct)**
- b) The CSS colour is wrong
- c) The font failed to load
- d) The page title is missing

> A transparent overlay or a mispositioned modal backdrop is the classic cause, and devtools element inspection confirms it in seconds.

**17. You need the 20 most frequent error codes from a 4 GB log. The right approach is:**  
<sub>DP-M-004 &middot; middle &middot; Practice-test style &middot; Unix basics</sub>

- a) grep the pattern, cut the field, then sort | uniq -c | sort -rn | head -20 **(correct)**
- b) Open the file in an editor
- c) Copy it to a spreadsheet
- d) Read it with cat

> The standard pipeline streams the file instead of loading it, which is the difference between two seconds and a crashed editor.

**18. Which chmod value gives the owner read/write/execute and everyone else read/execute?**  
<sub>MD-UNIX-003 &middot; middle &middot; Performance Review matrix &middot; Unix basics</sub>

- a) 755 **(correct)**
- b) 777
- c) 644
- d) 700

> Digits are owner/group/other; 7 = rwx, 5 = r-x. 777 grants write to everyone and is almost always a misconfiguration.

**19. Static analysis tools typically detect:**  
<sub>FL-3-004 &middot; junior &middot; ISTQB Foundation Level &middot; Ability to use tools for static code analysis</sub>

- a) Coding standard violations, unreachable code and suspicious constructs **(correct)**
- b) Slow database queries under load
- c) Usability problems
- d) Incorrect business rules

> Static analysis works on the code structure. Business-rule correctness needs an oracle the tool does not have.

**20. The most effective first week for a new tester on a project is:**  
<sub>MD-ONB-001 &middot; middle &middot; Performance Review matrix &middot; Onboarding and training team members</sub>

- a) A guided tour of the domain plus a small real task with a named mentor **(correct)**
- b) Reading all documentation alone
- c) Immediately owning the regression suite
- d) Waiting until the next sprint starts

> A real task with support produces competence and confidence far faster than passive reading.

---

## Variant 6

**1. Root cause analysis of escaped defects is most useful when it produces:**  
<sub>MD-PROC-002 &middot; middle &middot; Performance Review matrix &middot; Analysis of testing process</sub>

- a) A process change that prevents the same class of defect **(correct)**
- b) A list of who made the mistake
- c) A longer regression suite
- d) A new metric

> RCA that ends in a name changes nothing. RCA that ends in a changed review, check or gate changes the outcome.

**2. Test data preparation should be planned:**  
<sub>JR-PLAN-004 &middot; junior &middot; Performance Review matrix &middot; Planning of testing activities for specific tasks</sub>

- a) Together with test design, before execution starts **(correct)**
- b) During execution as it is needed
- c) After execution
- d) Only for automated tests

> Data is one of the most common causes of blocked execution. Planning it late converts design time into idle time.

**3. Which check is specific to mobile testing and has no direct desktop equivalent?**  
<sub>TR-MOB-003 &middot; trainee &middot; Performance Review matrix &middot; Mobile technologies and platforms</sub>

- a) Behaviour on an incoming call or push interruption **(correct)**
- b) Verifying an error message
- c) Checking a mandatory field
- d) Validating a date format

> Interrupt testing - calls, notifications, low battery, network switch, backgrounding - is a mobile-specific category driven by the platform lifecycle.

**4. Which metric taken from the tracker is most misleading when used alone?**  
<sub>JR-DMS-004 &middot; junior &middot; Performance Review matrix &middot; Defect management system/Project management system</sub>

- a) Number of defects reported per tester **(correct)**
- b) Defect density per module
- c) Open defects by severity
- d) Average time to close

> Counting reports per tester rewards volume over value, and encourages splitting one defect into five tickets.

**5. Which is a valid reason for a defect management process to include a triage meeting?**  
<sub>TM-017 &middot; senior &middot; ISTQB Test Manager &middot; Defect management system/Project management system</sub>

- a) To agree priority and ownership across roles with the full context present **(correct)**
- b) To reduce the defect count
- c) To assign blame
- d) To speed up test execution

> Triage is where product, development and test reconcile severity with business priority in one place.

**6. Defect-based test design techniques use:**  
<sub>TA-T-006 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) A defect taxonomy to derive tests targeting known defect types **(correct)**
- b) The code structure
- c) The state model
- d) The performance profile

> A taxonomy built from your own escaped-defect history is one of the most productive test design inputs available.

**7. A static analysis gate in CI is most valuable when it:**  
<sub>SR-SA-001 &middot; senior &middot; Performance Review matrix &middot; Ability to use tools for static code analysis</sub>

- a) Fails the build on new violations while tolerating the existing baseline **(correct)**
- b) Reports thousands of legacy warnings on every run
- c) Runs only before release
- d) Is advisory only

> Ratcheting on new code makes the gate actionable. A wall of legacy warnings trains everyone to ignore it.

**8. Which statement about severity and priority is correct?**  
<sub>TR-SEV-005 &middot; trainee &middot; Performance Review matrix &middot; Severity vs Priority</sub>

- a) They are independent attributes and any combination is possible **(correct)**
- b) High severity always implies high priority
- c) Low priority always implies low severity
- d) Only one of the two needs to be filled in

> All four combinations occur in practice. Treating them as one field loses the distinction between "how bad" and "how soon".

**9. Which is a good testing practice in ANY software development lifecycle model?**  
<sub>FL-2-001 &middot; junior &middot; ISTQB Foundation Level &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) Every development activity has a corresponding test activity **(correct)**
- b) All testing happens after coding is complete
- c) Only the test team performs testing
- d) Test levels never overlap

> CTFL states that in every model each development activity should have a corresponding test activity, and testers should be involved in reviewing work products as soon as drafts exist.

**10. Which testing type verifies that a change has not adversely affected unchanged parts of the system?**  
<sub>FL-2-004 &middot; junior &middot; ISTQB Foundation Level &middot; Testing types and subtypes</sub>

- a) Regression testing **(correct)**
- b) Confirmation testing
- c) Maintenance testing
- d) Smoke testing

> Maintenance testing is the context (a change to a deployed system); regression testing is the technique used inside it.

**11. A state transition table is particularly good at exposing:**  
<sub>TA-T-005 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Invalid transitions that the specification never mentioned **(correct)**
- b) Performance bottlenecks
- c) Memory leaks
- d) Coding standard violations

> The table forces every state/event pair to be considered, including the ones the specification silently ignored.

**12. A project risk materialises: the only test environment is unavailable for two weeks. The Test Manager should first:**  
<sub>TM-019 &middot; senior &middot; ISTQB Test Manager &middot; Risk management in testing</sub>

- a) Execute the contingency plan and communicate the schedule impact **(correct)**
- b) Wait and see
- c) Reduce the test scope silently
- d) Ask testers to work overtime later

> The contingency was planned for exactly this. Silent scope reduction converts a schedule problem into a quality problem nobody agreed to.

**13. When planning testing for an entire team across several parallel streams, the primary constraint to model is:**  
<sub>SR-TTP-001 &middot; senior &middot; Performance Review matrix &middot; Planning the testing process for the entire team</sub>

- a) Shared bottlenecks: environments, test data and specialised skills **(correct)**
- b) Individual preferences
- c) Number of test cases
- d) Office seating

> Parallel streams fail on shared resources long before they fail on headcount.

**14. A high number of defects escaping to production while the internal pass rate is high indicates:**  
<sub>MD-PROC-001 &middot; middle &middot; Performance Review matrix &middot; Analysis of testing process</sub>

- a) The tests do not cover what users actually do **(correct)**
- b) Testers are working too slowly
- c) The product is too complex
- d) Developers write bad code

> A high pass rate with high escape rate is a coverage and oracle problem, and it is measurable through DDP.

**15. ISTQB Glossary: "root cause" is:**  
<sub>GL-T-015 &middot; trainee &middot; ISTQB Glossary &middot; Defect life cycle</sub>

- a) A source of a defect such that removing it prevents recurrence of that defect type **(correct)**
- b) The failing line of code
- c) The first symptom observed
- d) The developer who introduced it

> The definition itself contains the test of a real root cause: removing it must stop the class from recurring.

**16. In the V-model, which test level corresponds to the requirements specification?**  
<sub>JR-SDLC-001 &middot; junior &middot; Performance Review matrix &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) Acceptance testing **(correct)**
- b) Unit testing
- c) Integration testing
- d) Component testing

> The V-model pairs each development artefact with the test level that validates it. Requirements pair with acceptance; detailed design pairs with unit/component.

**17. A burndown of open defects that is flat while the defect find rate falls most likely indicates:**  
<sub>MD-MET-005 &middot; middle &middot; Performance Review matrix &middot; Testing metrics</sub>

- a) Fixing capacity, not test capacity, is the bottleneck **(correct)**
- b) The product is ready to release
- c) Testing has stopped
- d) The metric is wrong

> Reading two metrics together turns a chart into a diagnosis. Either one alone is ambiguous.

**18. A monthly report for a customer should be written:**  
<sub>TR-DAY-004 &middot; trainee &middot; Performance Review matrix &middot; Creating reports about tasks accomplished during a day/a week/a month</sub>

- a) In terms of product quality and risk, not raw tester activity **(correct)**
- b) As a list of every executed test case
- c) As a copy of the daily reports concatenated
- d) Only in bullet points with no numbers

> A customer buys confidence in the product. Activity logs answer a question they did not ask.

**19. A nightly data migration test passes on a copy from January but fails on production data. The likely reason is:**  
<sub>DP-M-011 &middot; middle &middot; Practice-test style &middot; Automated DB testing</sub>

- a) The production data contains cases the snapshot does not, such as legacy nulls **(correct)**
- b) The database is slower
- c) The migration script is non-deterministic
- d) The test framework is outdated

> Migrations fail on data variety, which is exactly what an old or trimmed snapshot lacks.

**20. ISTQB Glossary: "validation" is confirmation that:**  
<sub>GL-J-003 &middot; junior &middot; ISTQB Glossary &middot; Verification & Validation</sub>

- a) Requirements for a specific intended use or application have been fulfilled **(correct)**
- b) A work product matches its specification
- c) The code compiles
- d) A defect has been fixed

> Verification checks conformity to a specification; validation checks fitness for the intended use.

---

## Variant 7

**1. The principle "testing is context dependent" means:**  
<sub>JR-PRIN-005 &middot; junior &middot; Performance Review matrix &middot; Principles of testing</sub>

- a) A medical device and a marketing site require different testing approaches **(correct)**
- b) Every project must use the same process
- c) Context only matters for automation
- d) Only the customer decides the approach

> Risk profile, regulation, lifecycle and technology all change what good testing looks like. A single fixed process applied everywhere is a smell.

**2. Which technique is BEST for testing an order that moves through Created, Paid, Shipped and Delivered?**  
<sub>FL-4-005 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) State transition testing **(correct)**
- b) Equivalence partitioning
- c) Decision table testing
- d) Statement testing

> The behaviour depends on the current state and the event, which is exactly what a state transition model captures - including the invalid transitions worth testing.

**3. A registration form has 6 optional checkboxes. Testing all combinations means 64 cases. The pragmatic technique to reduce this is:**  
<sub>TR-TDT-006 &middot; trainee &middot; Performance Review matrix &middot; Test design techniques</sub>

- a) Pairwise (all-pairs) testing **(correct)**
- b) Testing every combination anyway
- c) Testing only the default state
- d) Statement coverage

> Pairwise testing covers every pair of parameter values in a small number of cases, on the empirical grounds that most combinatorial defects involve only two factors.

**4. A numeric id is returned as 9007199254740993 and the JavaScript client shows 9007199254740992. The cause is:**  
<sub>MD-JSON-005 &middot; middle &middot; Performance Review matrix &middot; JSON</sub>

- a) JavaScript numbers lose precision above 2^53-1 **(correct)**
- b) The API is broken
- c) JSON cannot hold large numbers
- d) The client rounded on purpose

> This is why large ids are transported as strings. It is a genuine, reproducible defect worth reporting against the API contract.

**5. Which requirement defect is present in "The system must be user-friendly"?**  
<sub>JR-REQ-001 &middot; junior &middot; Performance Review matrix &middot; Requirements testing</sub>

- a) It is not verifiable **(correct)**
- b) It is not consistent
- c) It is not complete
- d) It is not traceable

> There is no test that can produce a pass or a fail. Verifiability is the property a tester should check first.

**6. Which is the strongest argument for tracking escaped defects by root cause?**  
<sub>TM-032 &middot; senior &middot; ISTQB Test Manager &middot; Testing metrics</sub>

- a) It shows which process gate is failing and where to invest next **(correct)**
- b) It identifies which tester missed them
- c) It reduces the defect count
- d) It satisfies the customer

> Root cause by gate turns a defect list into an improvement backlog.

**7. Which trend is the strongest early warning in a release report?**  
<sub>SR-TR-002 &middot; senior &middot; Performance Review matrix &middot; Creating reports about your team's completed work during a month/sprint/release</sub>

- a) Defect arrival rate that has not yet flattened **(correct)**
- b) Total defect count
- c) Number of test cases executed
- d) Hours logged

> A non-saturating arrival curve says discovery is incomplete, whatever the absolute counts look like.

**8. Why is early testing (shift left) valuable?**  
<sub>JR-PH-004 &middot; junior &middot; Performance Review matrix &middot; Phases of testing and Goals of testing</sub>

- a) Defects found in requirements cost far less to fix than defects found in production **(correct)**
- b) It reduces the number of testers needed
- c) It removes the need for regression testing
- d) It guarantees on-time delivery

> The cost of a defect rises steeply with the phase in which it is found, which is why review of requirements is among the highest-return testing activities.

**9. A story says "the user can filter results". Which is the most important question before testing?**  
<sub>DP-J-004 &middot; junior &middot; Practice-test style &middot; Acceptance criteria/Definition of Done</sub>

- a) Filter by what, with what combination behaviour and what default? **(correct)**
- b) Which colour is the filter button?
- c) Who implemented it?
- d) When will it be released?

> Without the filter set and its combination semantics, no expected result can be stated.

**10. Which test strategy is characterised by deriving tests from a formal model of the system?**  
<sub>TM-002 &middot; senior &middot; ISTQB Test Manager &middot; Writing a test plan</sub>

- a) Analytical / model-based strategy **(correct)**
- b) Reactive strategy
- c) Consultative strategy
- d) Regression-averse strategy

> CTAL-TM lists analytical, model-based, methodical, process-compliant, directed/consultative, regression-averse and reactive strategies. Most real projects blend several.

**11. Exploratory testing is characterised by:**  
<sub>TR-TYPE-007 &middot; trainee &middot; Performance Review matrix &middot; Testing types and subtypes</sub>

- a) Simultaneous learning, test design and test execution **(correct)**
- b) Executing only pre-written test cases
- c) Running only automated checks
- d) Testing without any goal or timebox

> Exploratory testing is structured and accountable - usually timeboxed into charters and sessions - it simply designs the tests while running them.

**12. A product risk is:**  
<sub>FL-5-002 &middot; junior &middot; ISTQB Foundation Level &middot; Risks in testing</sub>

- a) A risk that the product may fail to satisfy a stakeholder need **(correct)**
- b) A risk that the project will be late
- c) A risk that a supplier withdraws
- d) A risk that the team lacks skills

> Project risks (schedule, staffing, suppliers) threaten the ability to deliver; product risks threaten the quality of what is delivered.

**13. Which JSON snippet is syntactically invalid?**  
<sub>MD-JSON-002 &middot; middle &middot; Performance Review matrix &middot; JSON</sub>

- a) {"a": 1,} **(correct)**
- b) {"a": 1}
- c) {"a": [1, 2]}
- d) {"a": {"b": null}}

> JSON forbids a trailing comma. Many parsers are lenient, which is exactly why the defect only shows up on one of them.

**14. A shopping cart keeps items for 30 days. The most valuable boundary tests are around:**  
<sub>TA-A-002 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Day 29, 30 and 31 of item age **(correct)**
- b) Day 1 only
- c) Day 15 only
- d) Item price

> The retention rule is the specification; its boundary is where the off-by-one lives, usually in a timezone-sensitive comparison.

**15. When designing a test documentation structure for a new project, the first decision should be:**  
<sub>MD-TDOC-001 &middot; middle &middot; Performance Review matrix &middot; Development of test documentation</sub>

- a) How much documentation the context and risk actually justify **(correct)**
- b) Which template the last project used
- c) Which tool the team prefers
- d) How many test cases to write per module

> A regulated medical product and an internal admin tool need different amounts of evidence. Copying a template skips that judgement.

**16. ISTQB Glossary: "test completion report" (test summary report) is:**  
<sub>GL-M-014 &middot; middle &middot; ISTQB Glossary &middot; Testing metrics</sub>

- a) A report summarising test activities and results, produced at a milestone **(correct)**
- b) A daily status update
- c) The test plan
- d) A defect report

> It is the artefact that carries residual risk and lessons learned into the next release.

**17. ISTQB Glossary: which term describes "testing to determine the ease with which users can learn to use a product"?**  
<sub>GL-T-008 &middot; trainee &middot; ISTQB Glossary &middot; Testing types and subtypes</sub>

- a) Learnability testing **(correct)**
- b) Usability testing in general
- c) Accessibility testing
- d) Operability testing

> Learnability, operability, user error protection and accessibility are all sub-characteristics under usability in ISO 25010.

**18. What does the status "Deferred" mean?**  
<sub>TR-LIFE-003 &middot; trainee &middot; Performance Review matrix &middot; Defect life cycle</sub>

- a) The defect is real but its fix is postponed to a later release **(correct)**
- b) The defect could not be reproduced
- c) The defect duplicates an existing one
- d) The defect was fixed but not yet verified

> Deferred is an explicit business decision to carry a known defect forward. It should always carry a target release or a review date.

**19. A team member consistently misses estimates. The most effective first step is:**  
<sub>SR-PM-001 &middot; senior &middot; Performance Review matrix &middot; Managing team members (no less than 2 people)</sub>

- a) A private conversation to understand the cause before acting **(correct)**
- b) Reducing their estimates for them
- c) Raising it in the team retrospective by name
- d) Reassigning all their work

> The cause could be skill, scope, blockers or estimation technique, and each has a different remedy. Public correction addresses none of them.

**20. A false positive in testing is:**  
<sub>TA-D-002 &middot; middle &middot; ISTQB Test Analyst &middot; Defect management system/Project management system</sub>

- a) A reported defect that turns out not to be a defect in the product **(correct)**
- b) A defect the tool failed to find
- c) A defect fixed twice
- d) A defect in the test environment

> A high false-positive rate erodes developer trust in the test suite faster than almost anything else.

---

## Variant 8

**1. You must test an endpoint that charges a card. In a shared test environment you should:**  
<sub>DP-M-014 &middot; middle &middot; Practice-test style &middot; Automation of API tests</sub>

- a) Use the provider sandbox with test cards and assert on the sandbox state **(correct)**
- b) Use a real card with a small amount
- c) Skip the test
- d) Mock the whole endpoint and assert nothing

> Sandboxes exist precisely so that payment paths can be covered end to end without moving money.

**2. Why is API-level testing usually cheaper and more stable than the same coverage at UI level?**  
<sub>MD-API-001 &middot; middle &middot; Performance Review matrix &middot; API</sub>

- a) It skips rendering and layout, so it is faster and not affected by cosmetic changes **(correct)**
- b) It requires no test data
- c) It needs no assertions
- d) It cannot produce false negatives

> This is the argument behind the test pyramid: push coverage down to the layer with the most stable contract and the fastest feedback.

**3. Why should environment details (build, OS, browser, device) always be in the report?**  
<sub>TR-REP-004 &middot; trainee &middot; Performance Review matrix &middot; Creating defect reports (in English)</sub>

- a) Many defects only reproduce on a specific combination **(correct)**
- b) To make the report longer
- c) Because the tracker requires it
- d) To prove the tester did the work

> Environment is often the difference between "cannot reproduce" and a fix in an hour.

**4. A field accepts a 3-letter country code. Which is an INVALID equivalence partition?**  
<sub>FL-4-008 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) A 4-character input **(correct)**
- b) The value USA
- c) The value GBR
- d) The value POL

> Length is the partitioning attribute here: anything other than exactly three letters falls into an invalid partition.

**5. The difference between mitigation and contingency is that mitigation:**  
<sub>SR-RM-002 &middot; senior &middot; Performance Review matrix &middot; Risk management in testing</sub>

- a) Reduces likelihood or impact in advance; contingency is the plan if it happens anyway **(correct)**
- b) Is cheaper
- c) Applies only to project risks
- d) Is the same thing

> Well-run projects fund both, because mitigation is never complete.

**6. Why is exhaustive testing impossible for realistic systems?**  
<sub>JR-PRIN-004 &middot; junior &middot; Performance Review matrix &middot; Principles of testing</sub>

- a) The number of input and precondition combinations is effectively unbounded **(correct)**
- b) Because tools are too slow
- c) Because budgets are always cut
- d) Because requirements are never complete

> Even a handful of fields with ordinary ranges produces a combination space no team could ever execute. This is why risk and technique-driven selection exist.

**7. Checklist-based testing is an experience-based technique whose main weakness is:**  
<sub>TA-T-007 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Coverage varies with the tester, and checklists go stale **(correct)**
- b) It cannot be documented
- c) It is too slow
- d) It requires source code

> Checklists must be maintained from real findings, otherwise they encode the risks of three years ago.

**8. Which assertion set is the minimum for a meaningful automated API test?**  
<sub>MD-AAPI-001 &middot; middle &middot; Performance Review matrix &middot; Automation of API tests</sub>

- a) Status code, response schema and the business-critical field values **(correct)**
- b) Status code only
- c) Response time only
- d) That the response is not empty

> Status alone passes on a 200 with a wrong body; schema alone passes on schema-valid nonsense.

**9. A common risk when introducing test automation is:**  
<sub>FL-6-001 &middot; junior &middot; ISTQB Foundation Level &middot; Automation of WEB UI (functional) tests</sub>

- a) Unrealistic expectations about the effort and benefits **(correct)**
- b) Tests running too fast
- c) Too much coverage
- d) Reduced defect counts

> CTFL is explicit that automation costs are underestimated: maintenance, environment and skills dominate the total cost, not the initial scripting.

**10. Which HTML attribute is most commonly used by automated tests to locate an element reliably?**  
<sub>TR-HTML-001 &middot; trainee &middot; Performance Review matrix &middot; Webpage markup basics (HTML, CSS)</sub>

- a) A dedicated data-testid attribute **(correct)**
- b) The class attribute
- c) The inline style attribute
- d) The title attribute

> Classes and styles change whenever design changes. A dedicated test id is stable by contract, which is why teams add one specifically for automation.

**11. In risk-based testing, which activity does the Test Manager own?**  
<sub>TM-004 &middot; senior &middot; ISTQB Test Manager &middot; Risk management in testing</sub>

- a) Establishing and running the risk management process across the project **(correct)**
- b) Writing every test case
- c) Executing the regression suite
- d) Reviewing the source code

> The manager owns identification, analysis, mitigation planning and monitoring; the analysts supply the technical and domain judgement.

**12. A test case is Blocked when:**  
<sub>TR-EXEC-002 &middot; trainee &middot; Performance Review matrix &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) It cannot be executed because of an external obstacle such as a broken environment **(correct)**
- b) It fails on the last step
- c) It takes longer than estimated
- d) It has no test data

> Blocked is distinct from Failed: it means the case never got a chance to produce a verdict. Mixing the two corrupts the pass-rate metric.

**13. ISTQB Glossary: "priority" of a defect refers to:**  
<sub>GL-T-011 &middot; trainee &middot; ISTQB Glossary &middot; Severity vs Priority</sub>

- a) The level of business importance assigned to fixing it **(correct)**
- b) The degree of impact on the system
- c) How often it occurs
- d) How hard it is to fix

> Severity is impact; priority is urgency. The two are set by different people for different reasons.

**14. ISTQB Glossary: "risk" is:**  
<sub>GL-J-014 &middot; junior &middot; ISTQB Glossary &middot; Risks in testing</sub>

- a) A factor that could result in future negative consequences **(correct)**
- b) A defect found in testing
- c) A failed test case
- d) An open incident

> The definition is future-oriented, which is what separates a risk from an issue that has already occurred.

**15. The main benefit of the Test Analyst participating in reviews early is:**  
<sub>TA-V-003 &middot; middle &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) Defects are prevented rather than detected later **(correct)**
- b) It fills time before the build
- c) It reduces documentation
- d) It replaces test design

> Prevention is orders of magnitude cheaper than detection, and it is the highest-leverage use of an analyst time.

**16. The main testing drawback of a pure Waterfall model is that:**  
<sub>JR-SDLC-004 &middot; junior &middot; Performance Review matrix &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) Testing starts late, so defects are found when they are most expensive **(correct)**
- b) Testing is impossible
- c) There is no documentation to test against
- d) Requirements are never written

> Waterfall front-loads specification and back-loads verification, which is exactly the wrong shape for defect economics.

**17. Why should retesting and regression be included in a testing estimate?**  
<sub>JR-EST-003 &middot; junior &middot; Performance Review matrix &middot; Approximate estimation of time/cost to test a specific task/story</sub>

- a) Defects will be found, fixed and must be verified, and neighbours must be rechecked **(correct)**
- b) To inflate the estimate
- c) Because the customer asks for it
- d) Only for large projects

> Every defect found generates verification work later. An estimate assuming zero defects is an estimate assuming the testing was unnecessary.

**18. In a contractual acceptance testing context, the Test Manager must ensure that:**  
<sub>TM-029 &middot; senior &middot; ISTQB Test Manager &middot; Participation in presale activities (including communication with a customer)</sub>

- a) Acceptance criteria and the evidence required are agreed in writing beforehand **(correct)**
- b) Testing is done only by the supplier
- c) Only functional tests are run
- d) The customer writes all test cases

> Contractual acceptance disputes are almost always about evidence that was never agreed.

**19. A UI test fails once in every ten runs with no product change. The correct handling is:**  
<sub>MD-AWEB-003 &middot; middle &middot; Performance Review matrix &middot; Automation of WEB UI (functional) tests</sub>

- a) Diagnose the race condition and fix it, quarantining the test meanwhile **(correct)**
- b) Add a retry so it goes green
- c) Increase every sleep
- d) Delete the test

> Blanket retries hide real intermittent product defects, which are exactly the ones users report and nobody can reproduce.

**20. The most persuasive presale material for a QA service is usually:**  
<sub>SR-PRE-002 &middot; senior &middot; Performance Review matrix &middot; Participation in presale activities (including communication with a customer)</sub>

- a) A relevant case study with the problem, approach and measured outcome **(correct)**
- b) A list of tools
- c) The team size
- d) The number of years in business

> Buyers are matching your evidence against their own problem. Tool lists say nothing about outcomes.

---

## Variant 9

**1. A test report intended for a customer should lead with:**  
<sub>MD-CREP-001 &middot; middle &middot; Performance Review matrix &middot; Creating test reports which include the evaluation of the product quality</sub>

- a) An assessment of product quality and the risks of releasing **(correct)**
- b) The number of test cases executed
- c) The list of testers involved
- d) The tools used

> The customer needs to make a release decision. Everything else is supporting detail.

**2. In Scrum, who is responsible for the quality of the increment?**  
<sub>JR-SDLC-006 &middot; junior &middot; Performance Review matrix &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) The whole development team **(correct)**
- b) Only the testers
- c) Only the Scrum Master
- d) Only the Product Owner

> Scrum defines a single, cross-functional Developers accountability. A team that treats quality as "the tester job" has recreated a hand-off gate inside the sprint.

**3. Risk level is determined by:**  
<sub>FL-5-001 &middot; junior &middot; ISTQB Foundation Level &middot; Risks in testing</sub>

- a) The likelihood of the risk occurring and the impact if it does **(correct)**
- b) The number of defects found so far
- c) The size of the test team
- d) The number of requirements

> Risk = likelihood x impact. Both dimensions must be assessed, since a catastrophic but impossible event and a certain but trivial one need different responses.

**4. When estimating testing for a whole project, which is most often underestimated?**  
<sub>MD-PROJ-001 &middot; middle &middot; Performance Review matrix &middot; Estimation of time/cost of testing activities (full project, team tasks)</sub>

- a) Environment setup, test data and communication overhead **(correct)**
- b) Test case execution
- c) Test case writing
- d) Defect reporting

> Execution is visible and easy to count; the surrounding work is invisible and dominates the variance.

**5. Which tag pair is semantically correct for a clickable navigation link?**  
<sub>TR-HTML-003 &middot; trainee &middot; Performance Review matrix &middot; Webpage markup basics (HTML, CSS)</sub>

- a) <a href="..."> **(correct)**
- b) <div onclick="...">
- c) <span role="link">
- d) <button href="...">

> An anchor with href is focusable, keyboard-operable and announced as a link by screen readers, all for free. The others reimplement that badly or not at all.

**6. Smoke testing is best described as:**  
<sub>TR-TYPE-001 &middot; trainee &middot; Performance Review matrix &middot; Testing types and subtypes</sub>

- a) A shallow, broad check that the build is stable enough to test further **(correct)**
- b) An exhaustive check of one module
- c) Testing performed only by the customer
- d) Testing that measures response time under load

> Smoke testing answers one question: is this build worth spending a day on? It is broad and shallow by design.

**7. The defect clustering principle implies which practical action?**  
<sub>JR-PRIN-002 &middot; junior &middot; Performance Review matrix &middot; Principles of testing</sub>

- a) Focus extra effort on the modules that historically produce the most defects **(correct)**
- b) Test every module equally
- c) Stop testing modules with defects
- d) Automate everything

> Defects are not uniformly distributed. Clustering is the empirical basis for risk-based test prioritisation.

**8. Two techniques give conflicting priorities for the same feature. The analyst should:**  
<sub>STA-006 &middot; senior &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Reconcile them against the risk assessment, which is the tie-breaking authority **(correct)**
- b) Use the more formal technique
- c) Use both fully regardless of cost
- d) Use the faster technique

> Techniques are instruments; risk is the objective they serve.

**9. Test closure activities include:**  
<sub>JR-PH-003 &middot; junior &middot; Performance Review matrix &middot; Phases of testing and Goals of testing</sub>

- a) Collecting lessons learned and archiving testware **(correct)**
- b) Writing the first test cases
- c) Setting up the environment
- d) Executing the regression suite

> Closure is where the team converts the experience into something reusable. Skipping it means paying to learn the same lesson next release.

**10. Compatibility testing in ISO 25010 covers:**  
<sub>TA-Q-004 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Co-existence with other software and interoperability with other systems **(correct)**
- b) Response time under load
- c) Fault tolerance
- d) Code readability

> Co-existence defects (two apps fighting over a port or a driver) are routinely missed because each product is tested alone.

**11. Testers spend 40% of their time on environment problems. The most valuable improvement is:**  
<sub>DP-M-010 &middot; middle &middot; Practice-test style &middot; Analysis of testing process</sub>

- a) Containerise the environment so it is reproducible and disposable **(correct)**
- b) Hire more testers
- c) Write more test cases
- d) Reduce the scope of testing

> Forty percent of capacity is the largest single lever available, and it is a solved problem.

**12. A GET request to /api/users/999 returns 200 with an empty body for a user that does not exist. This is:**  
<sub>DP-J-001 &middot; junior &middot; Practice-test style &middot; REST API and HTTP/HTTPS protocols</sub>

- a) A defect: it should return 404 **(correct)**
- b) Correct behaviour
- c) A performance issue
- d) A front-end defect

> Clients cannot distinguish "no such user" from "user with no data". The status code is the contract.

**13. Which item belongs in the test plan rather than in the test strategy?**  
<sub>SR-TP-004 &middot; senior &middot; Performance Review matrix &middot; Writing a test plan</sub>

- a) The specific environments and schedule for this release **(correct)**
- b) The organisation-wide approach to automation
- c) The general defect classification scheme
- d) The company testing policy

> Strategy is organisation-level and durable; the plan is project-level and time-bound.

**14. Which is an example of operational acceptance testing?**  
<sub>FL-2-006 &middot; junior &middot; ISTQB Foundation Level &middot; Levels of testing</sub>

- a) Verifying backup and restore procedures **(correct)**
- b) Verifying a business workflow with end users
- c) Verifying compliance with a contract
- d) Verifying a single function in isolation

> Operational acceptance testing covers the operational aspects: backup/restore, disaster recovery, user management, maintenance tasks and security checks.

**15. Which is the key difference between REST and SOAP?**  
<sub>MD-API-002 &middot; middle &middot; Performance Review matrix &middot; API</sub>

- a) REST is an architectural style over HTTP; SOAP is a protocol with a strict XML envelope **(correct)**
- b) REST cannot use XML
- c) SOAP cannot be tested automatically
- d) REST always uses GraphQL

> SOAP brings WSDL, a fixed envelope and built-in standards (WS-Security). REST relies on HTTP semantics and is far lighter, at the cost of a formal contract unless OpenAPI is added.

**16. A risk-mitigation activity for a high-impact, low-likelihood risk is best described as:**  
<sub>TA-R-002 &middot; middle &middot; ISTQB Test Analyst &middot; Risks in testing</sub>

- a) Targeted deep testing of that specific area, even though it is rare **(correct)**
- b) Ignoring it because it is unlikely
- c) Uniform coverage across all areas
- d) Deferring it to production monitoring only

> Impact dominates when the consequence is unacceptable, which is why rare catastrophic paths still get dedicated tests.

**17. Release notes say a feature is "deprecated". The correct reading is:**  
<sub>TR-ENG-004 &middot; trainee &middot; Performance Review matrix &middot; Can read and understand test documentation</sub>

- a) It still works but is discouraged and will be removed later **(correct)**
- b) It has already been removed
- c) It is broken
- d) It is newly added

> Deprecated means scheduled for removal. Tests should still cover it, and its removal date should be tracked.

**18. ISTQB Glossary: a "test condition" is:**  
<sub>GL-T-006 &middot; trainee &middot; ISTQB Glossary &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) A testable aspect of a component or system identified as a basis for testing **(correct)**
- b) A precondition of a test case
- c) The environment configuration
- d) A defect status

> Test conditions are the output of test analysis; test cases are the output of test design.

**19. A senior tester proposes automating a manual suite. The strongest justification is:**  
<sub>SR-OPT-003 &middot; senior &middot; Performance Review matrix &middot; Optimization of testing process</sub>

- a) A calculated payback based on run frequency, stability and maintenance cost **(correct)**
- b) Automation is a best practice
- c) Manual testing is boring
- d) Competitors automate

> Automation that runs twice a year rarely repays its maintenance. The frequency and stability numbers make or break the case.

**20. A test progress report to senior management should emphasise:**  
<sub>TM-016 &middot; senior &middot; ISTQB Test Manager &middot; Creating test reports which include the evaluation of the product quality</sub>

- a) Status against objectives, residual risk and decisions required **(correct)**
- b) Detailed defect descriptions
- c) Test case level results
- d) Tool configuration

> Report at the altitude of the decision the reader has to make.

---

## Variant 10

**1. Which is typically included in a test plan?**  
<sub>FL-5-003 &middot; junior &middot; ISTQB Foundation Level &middot; Writing a test plan</sub>

- a) Scope, objectives, risks, entry and exit criteria, and the test approach **(correct)**
- b) The full list of executed test cases with results
- c) The source code of the automation framework
- d) The defect reports of the previous release

> A plan is forward-looking. Results belong in the test progress and completion reports.

**2. Which standard is commonly referenced for test documentation content?**  
<sub>TM-030 &middot; senior &middot; ISTQB Test Manager &middot; Development of test documentation</sub>

- a) ISO/IEC/IEEE 29119 **(correct)**
- b) ISO 9001 only
- c) IEEE 802.11
- d) ISO 14001

> 29119 replaced IEEE 829 as the reference for test process and documentation templates.

**3. ISTQB Glossary: "reliability" is the degree to which a system:**  
<sub>GL-M-007 &middot; middle &middot; ISTQB Glossary &middot; Testing types and subtypes</sub>

- a) Performs specified functions under specified conditions for a specified period **(correct)**
- b) Responds quickly
- c) Is easy to use
- d) Can be moved between environments

> Reliability sub-characteristics include maturity, availability, fault tolerance and recoverability.

**4. Which statement matches the "absence-of-errors fallacy"?**  
<sub>JR-PRIN-003 &middot; junior &middot; Performance Review matrix &middot; Principles of testing</sub>

- a) A system can be defect-free and still fail to meet user needs **(correct)**
- b) Finding no defects means the software is perfect
- c) All defects can be found
- d) Testing early is unnecessary

> Fixing everything found is not the same as building something useful. This principle is the bridge from verification to validation.

**5. Reading the implementation before designing tests is most defensible when:**  
<sub>SR-ALG-004 &middot; senior &middot; Performance Review matrix &middot; The basics of development and algorithms</sub>

- a) You are designing structural tests or hunting for a suspected defect class **(correct)**
- b) You want to save time on analysis
- c) The specification exists and is clear
- d) You are doing acceptance testing

> Code knowledge biases black-box design towards what was built. It is a deliberate tool for white-box work, not a default.

**6. A build is delivered at 17:00 and the release is tomorrow. Which testing do you run first?**  
<sub>DP-T-002 &middot; trainee &middot; Practice-test style &middot; Testing types and subtypes</sub>

- a) Smoke tests on the critical paths **(correct)**
- b) The full regression suite
- c) Usability testing
- d) Performance testing

> The first question is whether the build is viable at all. Everything else is wasted if it is not.

**7. Contract testing between two services primarily protects against:**  
<sub>MD-API-004 &middot; middle &middot; Performance Review matrix &middot; API</sub>

- a) One service changing its interface in a way that breaks its consumers **(correct)**
- b) Slow response times
- c) Database corruption
- d) UI layout regressions

> Contract tests give the fast, targeted feedback that a full end-to-end suite gives slowly and flakily.

**8. What is the practical difference between localStorage and sessionStorage?**  
<sub>TR-BROW-001 &middot; trainee &middot; Performance Review matrix &middot; Web browser architecture (cookies, localstorage, etc.)</sub>

- a) sessionStorage is cleared when the tab closes; localStorage persists **(correct)**
- b) localStorage is sent with every request
- c) sessionStorage is shared across all tabs
- d) localStorage has no size limit

> Both are per-origin key/value stores. Scope is the difference: sessionStorage is per tab and dies with it; localStorage survives restarts.

**9. A JSON Schema is used in API testing to:**  
<sub>MD-JSON-003 &middot; middle &middot; Performance Review matrix &middot; JSON</sub>

- a) Validate the structure and types of a response automatically **(correct)**
- b) Compress the payload
- c) Encrypt sensitive fields
- d) Generate the UI

> Schema validation catches whole classes of contract regressions with one assertion instead of dozens of field-by-field checks.

**10. Which storage mechanism is automatically attached to every matching HTTP request?**  
<sub>TR-BROW-002 &middot; trainee &middot; Performance Review matrix &middot; Web browser architecture (cookies, localstorage, etc.)</sub>

- a) Cookies **(correct)**
- b) localStorage
- c) sessionStorage
- d) IndexedDB

> Only cookies are transmitted automatically by the browser, which is exactly why they carry session tokens and why CSRF exists.

**11. What is the difference between acceptance criteria and the Definition of Done?**  
<sub>JR-AC-002 &middot; junior &middot; Performance Review matrix &middot; Acceptance criteria/Definition of Done</sub>

- a) Criteria are per story; the DoD applies to every story in the team **(correct)**
- b) They are two names for the same thing
- c) The DoD is written by the customer only
- d) Criteria apply only to bugs

> The DoD is the team-wide quality bar (code reviewed, tests written, deployed to staging). Acceptance criteria describe what this particular story must do.

**12. When a report must deliver bad news, the most effective structure is:**  
<sub>SR-TR-004 &middot; senior &middot; Performance Review matrix &middot; Creating reports about your team's completed work during a month/sprint/release</sub>

- a) Situation, impact, options with trade-offs, and a recommendation **(correct)**
- b) The bad news alone
- c) The good news first and the bad news buried
- d) A request for more time

> Arriving with options rather than only a problem is what distinguishes a senior report from an escalation.

**13. A defect burndown that flattens while new defects keep arriving indicates:**  
<sub>TM-007 &middot; senior &middot; ISTQB Test Manager &middot; Testing metrics</sub>

- a) Discovery is outpacing fixing, so the release date is at risk **(correct)**
- b) Testing is complete
- c) The product is stable
- d) The metric should be discarded

> Arrival and closure rates must be read together; either alone supports the wrong conclusion.

**14. Which factor most influences the level of detail in test conditions?**  
<sub>TA-P-002 &middot; middle &middot; ISTQB Test Analyst &middot; Planning of testing activities for specific tasks</sub>

- a) The level of risk and the intended reuse of the tests **(correct)**
- b) The number of testers
- c) The tool licence
- d) The sprint length

> High-risk, reusable and audited tests justify detail. Low-risk one-off exploration does not.

**15. A test case passes on your machine but fails on a colleague machine. The first thing to compare is:**  
<sub>TR-EXEC-006 &middot; trainee &middot; Performance Review matrix &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) Environment, build and test data **(correct)**
- b) Personal preferences
- c) Typing speed
- d) Screen resolution only

> Environment, build version and data state explain the overwhelming majority of "works on my machine" cases.

**16. Exit criteria (definition of done for a test level) exist to:**  
<sub>FL-5-004 &middot; junior &middot; ISTQB Foundation Level &middot; Testing metrics</sub>

- a) Define objectively when enough testing has been done **(correct)**
- b) Set the start date of testing
- c) Determine who executes the tests
- d) Prioritise defects

> Without agreed exit criteria, "are we done testing?" becomes a negotiation under deadline pressure rather than a check against a rule.

**17. When testing pagination on a REST collection endpoint, the most important edge cases are:**  
<sub>MD-API-006 &middot; middle &middot; Performance Review matrix &middot; API</sub>

- a) Empty result, single page, exact page boundary and out-of-range page **(correct)**
- b) Only the first page
- c) Only very large pages
- d) Only the sort order

> Off-by-one at the page boundary and behaviour past the last page are where pagination defects actually live.

**18. ISTQB Glossary: a "test driver" is:**  
<sub>GL-J-001 &middot; junior &middot; ISTQB Glossary &middot; Levels of testing</sub>

- a) A temporary component that replaces a calling component in order to invoke the code under test **(correct)**
- b) A component that replaces a called component
- c) A tool that manages test data
- d) The person executing the tests

> A driver calls down into the unit; a stub stands in for what the unit calls. Confusing them makes integration discussions circular.

**19. Given/When/Then is a common format for acceptance criteria because it:**  
<sub>JR-AC-005 &middot; junior &middot; Performance Review matrix &middot; Acceptance criteria/Definition of Done</sub>

- a) Forces a precondition, an action and an observable outcome **(correct)**
- b) Is required by Scrum
- c) Makes stories shorter
- d) Can only be used with automation tools

> The three clauses map directly onto precondition, step and expected result, which is why they translate so cleanly into test cases.

**20. In session-based test management, a charter defines:**  
<sub>TA-T-008 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) The mission and scope of a timeboxed exploratory session **(correct)**
- b) The exact steps to execute
- c) The expected results in advance
- d) The defect severity scale

> The charter makes exploratory testing plannable and reportable without turning it into scripted testing.

---

## Variant 11

**1. A developer types the wrong comparison operator; the program then computes a wrong total; the user sees an incorrect invoice. Match the terms.**  
<sub>FL-1-003 &middot; junior &middot; ISTQB Foundation Level &middot; Defect life cycle</sub>

- a) Error -> defect -> failure **(correct)**
- b) Failure -> defect -> error
- c) Defect -> error -> failure
- d) Error -> failure -> defect

> A human error introduces a defect in the code, and executing that defect may cause a failure that the user observes. Not every defect produces a failure.

**2. Which HTTP status code family indicates a client-side error?**  
<sub>JR-HTTP-001 &middot; junior &middot; Performance Review matrix &middot; REST API and HTTP/HTTPS protocols</sub>

- a) 4xx **(correct)**
- b) 2xx
- c) 3xx
- d) 5xx

> 4xx means the request was wrong (bad syntax, unauthorised, not found). 5xx means the server failed while handling a valid request.

**3. Which browser devtools tab would you open first to check whether the front end actually sent a request and what came back?**  
<sub>TR-BROW-005 &middot; trainee &middot; Performance Review matrix &middot; Web browser architecture (cookies, localstorage, etc.)</sub>

- a) Network **(correct)**
- b) Elements
- c) Console
- d) Sources

> The Network tab shows the request, its headers, payload, status and timing - the fastest way to decide whether a defect is front-end or back-end.

**4. Testing a database migration should always include:**  
<sub>MD-ADB-003 &middot; middle &middot; Performance Review matrix &middot; Automated DB testing</sub>

- a) A rollback path and a check on existing production-like data **(correct)**
- b) Only the forward migration on an empty schema
- c) Only a syntax check
- d) Only performance measurement

> Migrations fail on real data, not on empty schemas, and a migration without a tested rollback is an unrecoverable deployment.

**5. HTTPS differs from HTTP because it:**  
<sub>JR-HTTP-006 &middot; junior &middot; Performance Review matrix &middot; REST API and HTTP/HTTPS protocols</sub>

- a) Encrypts the traffic with TLS and authenticates the server certificate **(correct)**
- b) Is faster
- c) Uses a different HTML dialect
- d) Does not use cookies

> HTTPS provides confidentiality, integrity and server authentication. Testing it includes certificate validity, chain and mixed-content checks.

**6. Which standard is commonly referenced for test documentation content?**  
<sub>TM-030 &middot; senior &middot; ISTQB Test Manager &middot; Development of test documentation</sub>

- a) ISO/IEC/IEEE 29119 **(correct)**
- b) ISO 9001 only
- c) IEEE 802.11
- d) ISO 14001

> 29119 replaced IEEE 829 as the reference for test process and documentation templates.

**7. An automated database test should verify that:**  
<sub>MD-ADB-001 &middot; middle &middot; Performance Review matrix &middot; Automated DB testing</sub>

- a) The persisted data matches the business rules after the operation **(correct)**
- b) The UI displays a green message
- c) The query executes without syntax errors only
- d) The table exists

> The point of a DB-level check is to confirm what was actually stored, independent of what the UI chose to display.

**8. A service is unresponsive. Which single command gives the most immediate diagnostic value?**  
<sub>DP-M-015 &middot; middle &middot; Practice-test style &middot; Unix basics</sub>

- a) journalctl -u <service> -n 200 --no-pager (or tail on its log) **(correct)**
- b) ls -la /
- c) df -h
- d) whoami

> The recent log lines usually name the fault directly; disk and identity checks come after the log gives no answer.

**9. Which technique relies primarily on the tester experience rather than on a formal model?**  
<sub>TR-TDT-005 &middot; trainee &middot; Performance Review matrix &middot; Test design techniques</sub>

- a) Error guessing **(correct)**
- b) Equivalence partitioning
- c) Decision table testing
- d) State transition testing

> Error guessing is an experience-based technique. It complements, but does not replace, specification-based techniques.

**10. A project risk materialises: the only test environment is unavailable for two weeks. The Test Manager should first:**  
<sub>TM-019 &middot; senior &middot; ISTQB Test Manager &middot; Risk management in testing</sub>

- a) Execute the contingency plan and communicate the schedule impact **(correct)**
- b) Wait and see
- c) Reduce the test scope silently
- d) Ask testers to work overtime later

> The contingency was planned for exactly this. Silent scope reduction converts a schedule problem into a quality problem nobody agreed to.

**11. Which statement belongs under "Steps to reproduce"?**  
<sub>DP-T-012 &middot; trainee &middot; Practice-test style &middot; Creating defect reports (in English)</sub>

- a) 1. Open /cart with 2 items. 2. Apply code SAVE10. 3. Click Checkout. **(correct)**
- b) The total is wrong
- c) This is a regression from build 42
- d) Severity: Major

> Steps are the numbered actions only. Observations, history and metadata belong in their own fields.

**12. The difference between a stub and a mock is that a mock:**  
<sub>SR-UT-002 &middot; senior &middot; Performance Review matrix &middot; Writing unit tests</sub>

- a) Also verifies that the expected interactions occurred **(correct)**
- b) Is always slower
- c) Cannot return values
- d) Is used only in UI tests

> A stub supplies canned answers; a mock additionally asserts on how it was called. Over-mocking couples tests to implementation.

**13. Which review type is the MOST formal, with defined roles, entry criteria and metrics?**  
<sub>FL-3-002 &middot; junior &middot; ISTQB Foundation Level &middot; Requirements testing</sub>

- a) Inspection **(correct)**
- b) Walkthrough
- c) Informal review
- d) Technical review

> CTFL orders reviews by formality: informal review, walkthrough, technical review, inspection.

**14. ISTQB Glossary: "component testing" is also known as:**  
<sub>GL-J-013 &middot; junior &middot; ISTQB Glossary &middot; Levels of testing</sub>

- a) Unit testing or module testing **(correct)**
- b) System testing
- c) Acceptance testing
- d) Integration testing

> The three names describe the same test level; different communities inherited different vocabulary.

**15. When should a Test Analyst combine several techniques on the same feature?**  
<sub>TA-T-010 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) When the feature has both complex business rules and stateful behaviour **(correct)**
- b) Never - one technique per feature
- c) Only when time allows
- d) Only for automated tests

> Decision tables cover the rules, state transition covers the history, and boundary analysis covers the numeric edges. They are complementary, not alternatives.

**16. The main purpose of a one-to-one with a team member is:**  
<sub>SR-PM-004 &middot; senior &middot; Performance Review matrix &middot; Managing team members (no less than 2 people)</sub>

- a) To understand blockers, growth and context that status meetings never surface **(correct)**
- b) To review their task list
- c) To deliver performance ratings
- d) To assign new work

> Status is already visible on the board. The one-to-one is for what the board cannot show.

**17. The system must behave correctly when a downstream service times out. This is primarily:**  
<sub>TA-A-005 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Reliability (fault tolerance) testing **(correct)**
- b) Usability testing
- c) Portability testing
- d) Maintainability testing

> Fault tolerance is a reliability sub-characteristic, and it needs deliberate fault injection rather than happy-path testing.

**18. Which HTTP method is expected to be idempotent?**  
<sub>JR-HTTP-003 &middot; junior &middot; Performance Review matrix &middot; REST API and HTTP/HTTPS protocols</sub>

- a) PUT **(correct)**
- b) POST
- c) PATCH is always idempotent
- d) None of them

> GET, PUT and DELETE are idempotent: repeating them leaves the same state. POST is not, and PATCH is only if written that way.

**19. A defect marked Fixed fails verification. The tester should:**  
<sub>TR-LIFE-002 &middot; trainee &middot; Performance Review matrix &middot; Defect life cycle</sub>

- a) Reopen it with the new evidence **(correct)**
- b) Create a brand-new defect and close the old one
- c) Close it and mention the problem in the daily report
- d) Assign it to another developer

> Reopening keeps the history, the discussion and the original context in one place. Filing a duplicate fragments the trail.

**20. Why are containers valuable for test environments?**  
<sub>MD-VIRT-002 &middot; middle &middot; Performance Review matrix &middot; Virtualization (vagrant/docker)</sub>

- a) They make the environment reproducible and disposable **(correct)**
- b) They remove the need for test data
- c) They guarantee no defects
- d) They replace CI

> A disposable environment eliminates the "it passed because of yesterday state" class of false results.

---

## Variant 12

**1. ISTQB Glossary: "portability" is the degree to which a system:**  
<sub>GL-M-011 &middot; middle &middot; ISTQB Glossary &middot; Testing types and subtypes</sub>

- a) Can be transferred from one environment to another **(correct)**
- b) Recovers from faults
- c) Protects data
- d) Uses resources efficiently

> Adaptability, installability and replaceability are its sub-characteristics.

**2. In requirements written in English, the word "should" typically indicates:**  
<sub>TR-ENG-002 &middot; trainee &middot; Performance Review matrix &middot; Can read and understand test documentation</sub>

- a) A recommendation rather than a mandatory requirement **(correct)**
- b) A mandatory requirement
- c) A defect
- d) A deprecated feature

> In RFC 2119 style, "shall"/"must" are mandatory and "should" is recommended. The distinction changes whether a deviation is a defect.

**3. Parallel execution support must be designed in from the start because:**  
<sub>SR-TF-004 &middot; senior &middot; Performance Review matrix &middot; Creating your own test frameworks</sub>

- a) Shared state and fixed test data make retrofitting parallelism very expensive **(correct)**
- b) It is a licence requirement
- c) It changes the language
- d) Reports cannot be merged otherwise

> Data isolation and statelessness are architectural properties. Adding them to a mature suite usually means rewriting its fixtures.

**4. In a contractual acceptance testing context, the Test Manager must ensure that:**  
<sub>TM-029 &middot; senior &middot; ISTQB Test Manager &middot; Participation in presale activities (including communication with a customer)</sub>

- a) Acceptance criteria and the evidence required are agreed in writing beforehand **(correct)**
- b) Testing is done only by the supplier
- c) Only functional tests are run
- d) The customer writes all test cases

> Contractual acceptance disputes are almost always about evidence that was never agreed.

**5. Which is the strongest reason to keep some tests manual in a mature automated suite?**  
<sub>STA-018 &middot; senior &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Human judgement is required for usability, appropriateness and novel exploration **(correct)**
- b) Manual tests are cheaper
- c) Automation is unreliable
- d) Manual tests find more defects per hour

> Automation checks known expectations. Human testing is what discovers expectations nobody wrote down.

**6. ISTQB Glossary: "test data" is:**  
<sub>GL-T-007 &middot; trainee &middot; ISTQB Glossary &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) Data created or selected to satisfy the input requirements for executing tests **(correct)**
- b) The output of a test
- c) The test results
- d) The defect log

> Test data management is one of the largest hidden costs in a mature test process.

**7. Which of the following is a NON-functional test type?**  
<sub>TR-TYPE-006 &middot; trainee &middot; Performance Review matrix &middot; Testing types and subtypes</sub>

- a) Load testing **(correct)**
- b) Integration testing
- c) Retesting
- d) Acceptance testing

> Load testing measures behaviour under expected volume, a quality characteristic. Integration and acceptance are test levels; retesting is a purpose.

**8. Why does algorithmic complexity matter to a senior tester?**  
<sub>SR-ALG-002 &middot; senior &middot; Performance Review matrix &middot; The basics of development and algorithms</sub>

- a) It predicts which features will degrade as production data grows **(correct)**
- b) It determines the UI layout
- c) It replaces performance testing
- d) It defines the test levels

> Knowing that a feature is quadratic tells you to test it at production volume rather than with 20 rows.

**9. Classification tree analysis is most closely related to which other technique?**  
<sub>TA-T-001 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Equivalence partitioning combined with combinatorial testing **(correct)**
- b) Statement coverage
- c) State transition testing
- d) Error guessing

> The tree structures the input space into classes, and the combination table then selects the combinations to execute.

**10. In a two-week sprint, when should testing of a story start?**  
<sub>DP-J-011 &middot; junior &middot; Practice-test style &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) As soon as the story is testable, in parallel with development **(correct)**
- b) In the last two days
- c) After the sprint review
- d) Only when all stories are done

> Batching testing to the sprint end recreates a waterfall inside the sprint and guarantees carry-over.

**11. An application crashes when a user opens a settings screen that fewer than 0.1% of users ever visit. Reasonable classification:**  
<sub>TR-SEV-003 &middot; trainee &middot; Performance Review matrix &middot; Severity vs Priority</sub>

- a) High severity, low priority **(correct)**
- b) Low severity, high priority
- c) Low severity, low priority
- d) Severity and priority are always equal

> A crash is high severity by definition. Because the affected path is almost never used, the business may legitimately schedule the fix later, so priority is low.

**12. Which test level is MOST focused on interfaces and interactions between integrated components?**  
<sub>FL-2-002 &middot; junior &middot; ISTQB Foundation Level &middot; Levels of testing</sub>

- a) Component integration testing **(correct)**
- b) Component testing
- c) System testing
- d) Acceptance testing

> Component integration testing targets the interfaces between components. System integration testing targets interfaces to other systems and external services.

**13. A use case test is derived from:**  
<sub>TA-T-004 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) The basic flow plus the alternative and exception flows **(correct)**
- b) The database schema
- c) The source code branches
- d) The defect history only

> Use case testing is strong at finding integration and workflow defects because it follows how the system is actually used.

**14. Which status code is correct when a request is well-formed but fails business validation?**  
<sub>JR-HTTP-007 &middot; junior &middot; Performance Review matrix &middot; REST API and HTTP/HTTPS protocols</sub>

- a) 422 Unprocessable Content (or 400 Bad Request) **(correct)**
- b) 500 Internal Server Error
- c) 404 Not Found
- d) 204 No Content

> Returning 500 for a validation failure hides a client mistake behind a server-fault code and pollutes error monitoring.

**15. A test suite in CI fails intermittently without any code change. The correct first response is to:**  
<sub>JR-CI-002 &middot; junior &middot; Performance Review matrix &middot; Continuous integration systems</sub>

- a) Investigate and fix the flakiness, quarantining it explicitly if needed **(correct)**
- b) Re-run the pipeline until it is green
- c) Delete the test
- d) Ignore it if the failure rate is under 50%

> A tolerated flaky test trains the whole team to ignore red pipelines, which is far more expensive than the test itself.

**16. The difference between DELETE and TRUNCATE is that:**  
<sub>JR-DB-003 &middot; junior &middot; Performance Review matrix &middot; Database basics (SQL/NoSQL)</sub>

- a) DELETE removes rows one by one and can be filtered; TRUNCATE empties the table wholesale **(correct)**
- b) They are identical
- c) TRUNCATE can use a WHERE clause
- d) DELETE removes the table structure

> TRUNCATE is faster but unfilterable, and in many engines it cannot be rolled back and resets identity counters. DROP is what removes the structure.

**17. Appium is able to drive both Android and iOS because it:**  
<sub>MD-AMOB-001 &middot; middle &middot; Performance Review matrix &middot; Automation of Mobile UI (functional) tests</sub>

- a) Speaks the WebDriver protocol on top of each platform native automation framework **(correct)**
- b) Recompiles the application
- c) Requires the source code
- d) Only works on emulators

> Appium wraps UiAutomator2/Espresso on Android and XCUITest on iOS behind one client API.

**18. A customer asks for a fixed-price testing estimate on a project with unstable requirements. The professional response is:**  
<sub>MD-PROJ-002 &middot; middle &middot; Performance Review matrix &middot; Estimation of time/cost of testing activities (full project, team tasks)</sub>

- a) Propose a timeboxed discovery phase or a range with explicit assumptions **(correct)**
- b) Give a low number to win the deal
- c) Give a very high number to be safe
- d) Refuse to quote

> Both a lowball and a padded number destroy trust later. Naming the assumption is what makes the number defensible.

**19. A project risk, as opposed to a product risk, is:**  
<sub>MD-RISK-002 &middot; middle &middot; Performance Review matrix &middot; Risks in testing</sub>

- a) The only automation engineer is leaving next month **(correct)**
- b) The payment module may miscalculate VAT
- c) The app may be slow on 3G
- d) The export may lose Unicode characters

> Project risks threaten the ability to deliver; product risks threaten the quality of what is delivered.

**20. Which of the following is NOT a valid reason to use white-box techniques?**  
<sub>FL-4-012 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) They validate that the software meets user needs **(correct)**
- b) They reveal untested code
- c) They provide objective coverage measures
- d) They can be automated in the pipeline

> Structure-based techniques say nothing about whether the implemented behaviour is the behaviour the user wanted.

---

## Variant 13

**1. What should a tester do before starting execution on a new build?**  
<sub>TR-EXEC-003 &middot; trainee &middot; Performance Review matrix &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) Confirm the build number and environment, then run smoke checks **(correct)**
- b) Immediately start the longest test suite
- c) Close all previous defects
- d) Rewrite the test cases

> Verifying what you are testing, and that it is stable enough to test, prevents a whole day of results being attributed to the wrong build.

**2. An app works on Android 14 but crashes on Android 9. The report must include:**  
<sub>DP-T-010 &middot; trainee &middot; Practice-test style &middot; Mobile technologies and platforms</sub>

- a) The OS versions, devices and the crash log or stack trace **(correct)**
- b) Only the crash description
- c) Only the Android 9 device model
- d) Only a screenshot

> Version-specific crashes are usually API-level defects, and the stack trace is what identifies the call.

**3. The regression suite takes 8 hours and blocks daily releases. The best first optimisation is:**  
<sub>SR-OPT-001 &middot; senior &middot; Performance Review matrix &middot; Optimization of testing process</sub>

- a) Identify and parallelise or prune the slowest, lowest-value tests using risk and history **(correct)**
- b) Delete half the tests
- c) Run it weekly instead
- d) Add more testers

> Measure first: suite time is usually dominated by a small number of tests, and value is usually concentrated elsewhere.

**4. A test approach describes:**  
<sub>FL-5-008 &middot; junior &middot; ISTQB Foundation Level &middot; Writing a test plan</sub>

- a) How testing will be implemented for a particular product or project **(correct)**
- b) The exact steps of every test case
- c) The defect workflow in the tracker
- d) The build pipeline configuration

> The approach tailors the strategy to the context: which levels, which techniques, which automation, which entry and exit criteria.

**5. Metrics-based estimation is more defensible than expert-based estimation when:**  
<sub>TM-009 &middot; senior &middot; ISTQB Test Manager &middot; Estimation of time/cost of testing activities (full project, team tasks)</sub>

- a) The organisation has reliable historical data from comparable projects **(correct)**
- b) The project is entirely new in domain and technology
- c) The team has just been formed
- d) No data has been collected

> Without history, metrics-based estimation projects a number from nothing, which is expert judgement with false precision.

**6. Inheritance in a Page Object framework is most commonly used to:**  
<sub>JR-OOP-004 &middot; junior &middot; Performance Review matrix &middot; OOP principles</sub>

- a) Share common page behaviour in a base page class **(correct)**
- b) Duplicate locators across pages
- c) Avoid writing assertions
- d) Replace the test runner

> A BasePage typically carries the driver, waits and navigation helpers, and every concrete page extends it.

**7. Pairwise testing is justified by the empirical observation that:**  
<sub>TA-T-002 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Most combinatorial defects are triggered by interactions of only two parameters **(correct)**
- b) All defects are single-parameter
- c) Exhaustive combinations are cheap
- d) Parameters never interact

> Pairwise gives a large reduction in test count for a small loss of theoretical coverage - the classic risk-informed trade.

**8. A good measure that onboarding worked is:**  
<sub>MD-ONB-003 &middot; middle &middot; Performance Review matrix &middot; Onboarding and training team members</sub>

- a) The new tester completes representative tasks with decreasing supervision **(correct)**
- b) The number of documents they read
- c) The number of meetings attended
- d) How quickly they stopped asking questions

> Questions stopping can mean understanding or disengagement. Independent delivery on real work distinguishes the two.

**9. Which mobile automation problem is caused by the platform rather than by the test code?**  
<sub>MD-AMOB-003 &middot; middle &middot; Performance Review matrix &middot; Automation of Mobile UI (functional) tests</sub>

- a) Permission dialogs appearing on a fresh install **(correct)**
- b) A misspelled locator
- c) A missing assertion
- d) A hardcoded sleep

> System dialogs sit outside the app view hierarchy and must be handled explicitly in the automation setup.

**10. Reviewing requirements before code exists is valuable mainly because:**  
<sub>JR-REQ-003 &middot; junior &middot; Performance Review matrix &middot; Requirements testing</sub>

- a) A defect removed there costs a fraction of the same defect in production **(correct)**
- b) It fills tester time before the build arrives
- c) It is required by ISO
- d) It replaces system testing

> Static testing of requirements is the highest-leverage activity available to a tester, and it needs no environment.

**11. Planning poker reduces estimation bias mainly by:**  
<sub>MD-PEST-004 &middot; middle &middot; Performance Review matrix &middot; Estimation of time/cost of testing activities (epics, stories, bugs, testing types)</sub>

- a) Having estimators commit independently before discussion **(correct)**
- b) Averaging everyone number
- c) Letting the most senior person decide
- d) Using Fibonacci values

> Simultaneous reveal is the mechanism; the card values are just a scale. Anchoring is what it defends against.

**12. A test summary report at project close should include:**  
<sub>TM-024 &middot; senior &middot; ISTQB Test Manager &middot; Creating test reports which include the evaluation of the product quality</sub>

- a) What was tested, results, residual risk and lessons learned **(correct)**
- b) Only the defect count
- c) Only the pass rate
- d) Only the schedule variance

> The lessons-learned section is what makes the next project cheaper; it is also the first thing cut under pressure.

**13. Which field is NOT part of a well-formed bug report?**  
<sub>TR-ART-003 &middot; trainee &middot; Performance Review matrix &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) Steps to reproduce
- b) Actual result
- c) Expected result
- d) The name of the developer who should fix it **(correct)**

> Assignment is a workflow decision made in the tracker, not a descriptive attribute of the defect. Naming a developer in the report itself is presumptuous and ages badly.

**14. A tester finds no defects in a component. What can be concluded?**  
<sub>FL-1-002 &middot; junior &middot; ISTQB Foundation Level &middot; Principles of testing</sub>

- a) Nothing about the absence of defects in that component **(correct)**
- b) The component is defect-free
- c) The tests were badly designed
- d) The component is ready for production

> Principle 2: testing shows the presence of defects, never their absence. The result is one piece of information, not a verdict on quality.

**15. ISTQB Glossary: "test progress report" is produced:**  
<sub>GL-M-006 &middot; middle &middot; ISTQB Glossary &middot; Testing metrics</sub>

- a) Periodically during testing, to summarise status against the plan **(correct)**
- b) Only at the end of testing
- c) Only when defects are found
- d) Only for regulated projects

> The end-of-testing document is the test completion (summary) report, which is a different artefact.

**16. Exit criteria should be defined:**  
<sub>SR-TP-003 &middot; senior &middot; Performance Review matrix &middot; Writing a test plan</sub>

- a) Before execution starts, together with the stakeholders who will use them **(correct)**
- b) At the end, based on what was achieved
- c) By the test team alone
- d) Only for regulated projects

> Criteria written after the fact describe the outcome instead of governing it, and they cannot support a release argument.

**17. Which usability defect would a heuristic evaluation find that a scripted functional test would not?**  
<sub>TA-Q-006 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) The user has no way to recognise which step of the process they are on **(correct)**
- b) A button returns a 500 error
- c) A field accepts 300 characters instead of 200
- d) A total is calculated incorrectly

> Heuristic evaluation targets exactly the class of problems where nothing is technically broken but the user is lost.

**18. Which sentence is clearest in a test summary?**  
<sub>JR-ENGW-004 &middot; junior &middot; Performance Review matrix &middot; Writing test documentation/emails to a customer</sub>

- a) 3 of 45 regression cases failed; all three relate to the discount calculation **(correct)**
- b) There were some failures in regression
- c) Regression was mostly fine
- d) Almost everything passed

> Numbers plus a stated pattern let the reader act. Hedged summaries force them to ask a follow-up question.

**19. The pipeline is green but a defect reached production in a covered area. The most useful investigation is:**  
<sub>DP-J-006 &middot; junior &middot; Practice-test style &middot; Continuous integration systems</sub>

- a) Whether the test asserted the right thing, not just that it ran **(correct)**
- b) Whether the pipeline was fast enough
- c) Which developer merged it
- d) How many tests exist

> A passing test with a weak or wrong assertion is indistinguishable from coverage until something escapes.

**20. Which CSS property would you check first when an element is present in the DOM but invisible on screen?**  
<sub>TR-HTML-005 &middot; trainee &middot; Performance Review matrix &middot; Webpage markup basics (HTML, CSS)</sub>

- a) display / visibility / opacity **(correct)**
- b) font-family
- c) cursor
- d) letter-spacing

> display:none, visibility:hidden and opacity:0 are the three usual causes. They also behave differently for automation: display:none removes the element from layout entirely.

---

## Variant 14

**1. When is it justified to reduce a decision table by collapsing rules?**  
<sub>STA-003 &middot; senior &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) When a condition demonstrably cannot affect the outcome for those rules **(correct)**
- b) Whenever the table is large
- c) When time is short
- d) When the developer says so

> Collapsing on a demonstrated independence is analysis; collapsing under time pressure is guessing with extra steps.

**2. Which check belongs to compatibility testing?**  
<sub>DP-T-014 &middot; trainee &middot; Practice-test style &middot; Testing types and subtypes</sub>

- a) The same flow on Chrome, Firefox and Safari at three viewport widths **(correct)**
- b) Response time under 500 concurrent users
- c) Password strength enforcement
- d) Database backup and restore

> Compatibility covers browsers, devices, OS versions and co-existing software.

**3. Which leadership behaviour most improves defect reporting quality across a team?**  
<sub>TM-022 &middot; senior &middot; ISTQB Test Manager &middot; Managing team members (no less than 2 people)</sub>

- a) Reviewing reports constructively and publishing shared examples of good ones **(correct)**
- b) Setting a minimum defect quota
- c) Ranking testers by defect count
- d) Rejecting weak reports without comment

> Quotas and rankings optimise for volume. Shared exemplars change the standard everyone writes to.

**4. Which clause filters rows AFTER aggregation in SQL?**  
<sub>JR-DB-006 &middot; junior &middot; Performance Review matrix &middot; Database basics (SQL/NoSQL)</sub>

- a) HAVING **(correct)**
- b) WHERE
- c) ORDER BY
- d) GROUP BY

> WHERE filters rows before grouping; HAVING filters the aggregated groups. Using WHERE on an aggregate is a classic error.

**5. A decision table has 3 conditions, each true or false. How many rules does the full (non-collapsed) table have?**  
<sub>FL-4-004 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) 8 **(correct)**
- b) 6
- c) 9
- d) 3

> 2^3 = 8. The table can then be collapsed by merging rules where a condition does not affect the outcome.

**6. What is regression testing?**  
<sub>TR-TYPE-002 &middot; trainee &middot; Performance Review matrix &middot; Testing types and subtypes</sub>

- a) Re-running tests to confirm that a change did not break existing behaviour **(correct)**
- b) Testing that a fixed defect is really fixed
- c) Testing the system without any documentation
- d) Testing only the newest feature

> Regression testing protects behaviour that already worked. Confirming a specific fix is retesting (confirmation testing), which is a different activity.

**7. Which of these is a form of acceptance testing?**  
<sub>JR-LVL-004 &middot; junior &middot; Performance Review matrix &middot; Levels of testing</sub>

- a) Operational acceptance testing (backup, restore, disaster recovery) **(correct)**
- b) Component integration testing
- c) Unit testing
- d) Static analysis

> ISTQB lists user acceptance, operational acceptance, contractual/regulatory acceptance, and alpha/beta testing as forms of acceptance testing.

**8. Verifying "in strict accordance with acceptance criteria" means the tester:**  
<sub>JR-STORY-003 &middot; junior &middot; Performance Review matrix &middot; Verification of a story, in strict accordance with its acceptance criteria</sub>

- a) Checks every criterion explicitly and records the result per criterion **(correct)**
- b) Tests whatever seems risky
- c) Runs only the regression suite
- d) Relies on the developer demo

> Per-criterion evidence is what makes acceptance auditable and what stops "we thought that was covered" at release time.

**9. ISTQB Glossary: "test automation" is:**  
<sub>GL-M-004 &middot; middle &middot; ISTQB Glossary &middot; Automation of WEB UI (functional) tests</sub>

- a) The use of software to perform or support test activities **(correct)**
- b) Writing test scripts only
- c) Running tests in CI only
- d) Recording and replaying user actions

> The definition covers management, generation, execution and reporting - not just script execution.

**10. Which of these is NOT a valid JSON value type?**  
<sub>MD-JSON-001 &middot; middle &middot; Performance Review matrix &middot; JSON</sub>

- a) Date **(correct)**
- b) Number
- c) Boolean
- d) null

> JSON has objects, arrays, strings, numbers, booleans and null. Dates are transported as strings (usually ISO 8601), which is why timezone defects are so common.

**11. Before optimising a testing process you should:**  
<sub>SR-OPT-002 &middot; senior &middot; Performance Review matrix &middot; Optimization of testing process</sub>

- a) Measure the current baseline so improvement can be demonstrated **(correct)**
- b) Change the tooling
- c) Reorganise the team
- d) Increase the number of test cases

> Without a baseline, an "improvement" is an opinion, and it cannot be defended when the next deadline arrives.

**12. A spec says a value is "mandatory unless the user is a guest". Which case must exist in your suite?**  
<sub>TR-ENG-005 &middot; trainee &middot; Performance Review matrix &middot; Can read and understand test documentation</sub>

- a) A guest user for whom the value may be empty **(correct)**
- b) Only a registered user with the value filled
- c) Only an empty value for every user
- d) No case is needed

> The "unless" clause defines a second equivalence partition. Testing only the main clause leaves half the rule uncovered.

**13. Two streams need the same test environment in the same week. The best plan is:**  
<sub>SR-TTP-002 &middot; senior &middot; Performance Review matrix &middot; Planning the testing process for the entire team</sub>

- a) Sequence them explicitly, or provision an isolated environment, and state the cost **(correct)**
- b) Let the teams work it out
- c) Ignore it and react when it happens
- d) Cancel one stream

> Surfacing the conflict as a decision with a price is the planning act; leaving it implicit guarantees a lost week.

**14. While executing a ready test case, the actual result differs from the expected result, but you believe the expected result is outdated. You should:**  
<sub>TR-EXEC-001 &middot; trainee &middot; Performance Review matrix &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) Mark the case Failed and raise the question with the analyst or product owner **(correct)**
- b) Silently pass the case
- c) Edit the expected result yourself and pass it
- d) Skip the case

> Never quietly change the oracle. Record what you observed, then get the requirement clarified; if it changed, the case is updated deliberately and traceably.

**15. A defect taxonomy is used to:**  
<sub>TA-D-001 &middot; middle &middot; ISTQB Test Analyst &middot; Defect management system/Project management system</sub>

- a) Categorise defects so patterns and process weaknesses become visible **(correct)**
- b) Assign blame
- c) Speed up fixes
- d) Replace severity

> Once defects are classified, the same category appearing repeatedly points at a missing gate in the process.

**16. Which is a symptom of a testing process problem rather than a product problem?**  
<sub>MD-PROC-004 &middot; middle &middot; Performance Review matrix &middot; Analysis of testing process</sub>

- a) The same defect is reported by three testers independently **(correct)**
- b) A module has high defect density
- c) A performance target is missed
- d) A requirement is ambiguous

> Duplicate reports mean coverage is uncoordinated and the tracker is not being searched - both process issues.

**17. Domain analysis extends boundary value analysis and equivalence partitioning by:**  
<sub>TA-T-003 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Considering combinations of interacting variables using on/off/in/out points **(correct)**
- b) Removing the need for boundaries
- c) Only testing invalid values
- d) Working only on single variables

> Domain analysis is the technique to reach for when two or more numeric fields constrain each other.

**18. ISTQB Glossary: an "equivalence partition" is:**  
<sub>GL-J-008 &middot; junior &middot; ISTQB Glossary &middot; Test design techniques</sub>

- a) A subset of the value domain processed in the same way by the component **(correct)**
- b) A group of test cases
- c) A set of boundary values
- d) A defect category

> The partition is defined by the processing, not by the data type - which is why partitions can cross type boundaries.

**19. What distinguishes testing from debugging?**  
<sub>FL-1-006 &middot; junior &middot; ISTQB Foundation Level &middot; Testing types and subtypes</sub>

- a) Testing finds failures; debugging locates and removes their causes **(correct)**
- b) They are synonyms
- c) Testing is done by developers, debugging by testers
- d) Debugging happens before testing

> CTFL v4 is explicit that they are different activities with different owners, even though a confirmation test follows a debug.

**20. Which practice keeps automated DB tests independent of each other?**  
<sub>MD-ADB-002 &middot; middle &middot; Performance Review matrix &middot; Automated DB testing</sub>

- a) Each test creates its own data and rolls back or deletes it afterwards **(correct)**
- b) Tests share one fixed dataset
- c) Tests run in a fixed alphabetical order
- d) Tests read production data

> Shared mutable state makes a suite order-dependent, which is the hardest kind of flakiness to diagnose.

---

## Variant 15

**1. Which statement belongs in a customer-facing quality assessment?**  
<sub>MD-CREP-002 &middot; middle &middot; Performance Review matrix &middot; Creating test reports which include the evaluation of the product quality</sub>

- a) Checkout and payment are stable; reporting has 3 open major defects affecting export **(correct)**
- b) We executed 412 test cases
- c) Two testers were on holiday
- d) The build server was slow on Tuesday

> Name the areas, their state and the concrete risk. Internal logistics do not belong in a quality assessment.

**2. ISTQB Glossary: "test strategy" describes:**  
<sub>GL-M-009 &middot; middle &middot; ISTQB Glossary &middot; Writing a test plan</sub>

- a) The generalised approach to testing, usually at organisation or programme level **(correct)**
- b) The schedule of a single test level
- c) The list of test cases
- d) The environment configuration

> The project-specific instantiation is the test plan; the reason for testing at all is the test policy.

**3. A system accepts amounts from 100 to 999. Using three-value boundary value analysis on the lower boundary, the values are:**  
<sub>FL-4-002 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) 99, 100, 101 **(correct)**
- b) 100, 101, 102
- c) 98, 99, 100
- d) 99, 100, 999

> The three-value approach takes the boundary and its neighbours on both sides.

**4. Risk mitigation through testing works by:**  
<sub>TM-005 &middot; senior &middot; ISTQB Test Manager &middot; Risk management in testing</sub>

- a) Reducing the likelihood of undetected defects in high-risk areas **(correct)**
- b) Reducing the impact of a failure in production
- c) Eliminating the risk entirely
- d) Transferring the risk to the customer

> Testing addresses the likelihood side of the equation. Impact is reduced by design, redundancy and operational measures.

**5. Which is the correct order of steps in risk-based testing?**  
<sub>MD-RISK-001 &middot; middle &middot; Performance Review matrix &middot; Risks in testing</sub>

- a) Identify risks, analyse (likelihood x impact), prioritise, allocate effort, monitor **(correct)**
- b) Write test cases, then look for risks
- c) Execute tests, then rank the defects found
- d) Estimate first, then identify risks

> Risk analysis drives the plan. Running risk analysis after the tests are written turns it into documentation rather than a decision tool.

**6. Which of these is a recognised, vendor-neutral certification scheme for testers?**  
<sub>TR-NEWS-003 &middot; trainee &middot; Performance Review matrix &middot; Ability to keep up with news and trends</sub>

- a) ISTQB **(correct)**
- b) AWS Certified Developer
- c) PMP
- d) CCNA

> ISTQB is the international, vendor-neutral certification body for software testing. The others certify cloud, project management and networking respectively.

**7. Which information is essential in a defect report to allow prioritisation?**  
<sub>FL-5-007 &middot; junior &middot; ISTQB Foundation Level &middot; Defect life cycle</sub>

- a) Severity, impact on the business and steps to reproduce **(correct)**
- b) The tester name and mood
- c) The number of test cases affected only
- d) The exact time of day

> CTFL lists identification, description, severity, priority, status, references and evidence among the expected contents.

**8. In risk-based testing, the Test Analyst usually contributes primarily to:**  
<sub>TA-R-001 &middot; middle &middot; ISTQB Test Analyst &middot; Risks in testing</sub>

- a) Identifying and assessing product risks from the business and user perspective **(correct)**
- b) Setting the project budget
- c) Assigning developers to modules
- d) Choosing the CI server

> The Test Manager owns the process; the Test Analyst supplies the domain judgement about likelihood and impact.

**9. Which of these should be caught by unit tests rather than by manual testing?**  
<sub>DP-J-013 &middot; junior &middot; Practice-test style &middot; Levels of testing</sub>

- a) An off-by-one error in a date calculation function **(correct)**
- b) A confusing button label
- c) A slow page under load
- d) A broken third-party integration

> Deterministic pure logic is the cheapest thing to cover at unit level and the most expensive to cover manually.

**10. In Docker, what is the difference between an image and a container?**  
<sub>MD-VIRT-003 &middot; middle &middot; Performance Review matrix &middot; Virtualization (vagrant/docker)</sub>

- a) An image is the immutable template; a container is a running instance of it **(correct)**
- b) They are the same
- c) A container is stored in a registry
- d) An image has a writable layer

> The writable layer belongs to the container. Data written there disappears with the container unless a volume is mounted.

**11. A rough estimate for testing a small story should account for:**  
<sub>JR-EST-001 &middot; junior &middot; Performance Review matrix &middot; Approximate estimation of time/cost to test a specific task/story</sub>

- a) Analysis, design, execution, defect reporting and retesting **(correct)**
- b) Execution time only
- c) Only the time to write test cases
- d) Only the time to report defects

> Estimates that count only execution are consistently 2-3x low, because reporting and retesting are where the tail actually lives.

**12. Why should automated tests live in the same repository as the code they test?**  
<sub>SR-VCS-002 &middot; senior &middot; Performance Review matrix &middot; VCS</sub>

- a) A single commit keeps code and its tests in a consistent, reviewable state **(correct)**
- b) It saves disk space
- c) It is faster to clone
- d) Tools require it

> Split repositories drift: the test suite at HEAD no longer corresponds to any particular version of the product.

**13. The best evidence to attach to a UI defect that appears only intermittently is:**  
<sub>TR-REP-005 &middot; trainee &middot; Performance Review matrix &middot; Creating defect reports (in English)</sub>

- a) A screen recording plus console and network logs **(correct)**
- b) A single screenshot
- c) A verbal description
- d) The test case id only

> Intermittent defects need timing context. A recording paired with logs lets a developer align what was seen with what the system did.

**14. Risk-based test prioritisation breaks down when:**  
<sub>SR-RM-005 &middot; senior &middot; Performance Review matrix &middot; Risk management in testing</sub>

- a) Risk assessments are made once and never revisited as the product changes **(correct)**
- b) Risks are documented
- c) Stakeholders are involved
- d) Impact is estimated

> A stale risk model directs effort at last quarter product, which is indistinguishable from no risk model at all.

**15. ISTQB Glossary: "coverage" is:**  
<sub>GL-T-013 &middot; trainee &middot; ISTQB Glossary &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) The degree to which specified coverage items are exercised by a test suite **(correct)**
- b) The number of test cases
- c) The percentage of defects found
- d) The size of the test basis

> Coverage is always relative to a stated coverage item: statements, branches, requirements, risks.

**16. TMMi and TPI are examples of:**  
<sub>TM-013 &middot; senior &middot; ISTQB Test Manager &middot; Optimization of testing process</sub>

- a) Test process improvement models **(correct)**
- b) Test design techniques
- c) Defect taxonomies
- d) Automation frameworks

> TMMi is a staged maturity model; TPI Next is a continuous model with key areas assessed independently.

**17. Usability testing that measures whether a user can complete a task at all is evaluating:**  
<sub>TA-Q-002 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Effectiveness **(correct)**
- b) Efficiency
- c) Satisfaction
- d) Learnability

> Effectiveness = can they finish; efficiency = at what cost in time and effort; satisfaction = how it felt.

**18. Why should a defect be linked to the requirement or story it violates?**  
<sub>JR-DMS-003 &middot; junior &middot; Performance Review matrix &middot; Defect management system/Project management system</sub>

- a) It makes impact analysis and coverage reporting possible **(correct)**
- b) It is required by Jira
- c) It speeds up the fix
- d) It changes the severity

> Links turn a pile of tickets into a queryable model of product risk.

**19. Which of these is a valid reason to mark a defect as Duplicate?**  
<sub>TR-LIFE-006 &middot; trainee &middot; Performance Review matrix &middot; Defect life cycle</sub>

- a) Another open report describes the same root behaviour **(correct)**
- b) The defect has low severity
- c) The defect was reported by a junior tester
- d) The defect is hard to reproduce

> Duplicate means the same underlying defect is already tracked. Link the two so the history stays connected.

**20. Which is the most appropriate opening for an email to a customer reporting a release risk?**  
<sub>JR-ENGW-001 &middot; junior &middot; Performance Review matrix &middot; Writing test documentation/emails to a customer</sub>

- a) We found an issue in the payment flow that may affect Friday release. Details and options below. **(correct)**
- b) Hi! Bad news again...
- c) The developers broke payments once more.
- d) FYI, there might be something wrong somewhere.

> State the subject, the impact and the fact that options follow. Blame and vagueness both cost the reader time and cost you credibility.

---

## Variant 16

**1. A request without a token returns 200 and the requested data. This is:**  
<sub>DP-J-012 &middot; junior &middot; Practice-test style &middot; REST API and HTTP/HTTPS protocols</sub>

- a) A critical security defect - broken access control **(correct)**
- b) Correct if the endpoint is fast
- c) A minor documentation issue
- d) Expected for GET requests

> Broken access control is consistently the top item in the OWASP Top 10, and it is reachable by ordinary functional testing.

**2. The alt attribute on an <img> exists primarily to:**  
<sub>TR-HTML-004 &middot; trainee &middot; Performance Review matrix &middot; Webpage markup basics (HTML, CSS)</sub>

- a) Describe the image for assistive technology and when the image fails to load **(correct)**
- b) Improve the image resolution
- c) Set the image width
- d) Cache the image

> alt is an accessibility and resilience feature. A missing or meaningless alt is a genuine, reportable accessibility defect.

**3. Which status closes the life cycle of a defect that was fixed and successfully retested?**  
<sub>TR-LIFE-004 &middot; trainee &middot; Performance Review matrix &middot; Defect life cycle</sub>

- a) Closed **(correct)**
- b) Resolved
- c) Verified in progress
- d) Assigned

> Typical flow: New -> Assigned -> Fixed/Resolved -> Retested -> Closed. Only the tester should move a ticket to Closed.

**4. Which is a defining characteristic of a NoSQL document store such as MongoDB?**  
<sub>JR-DB-004 &middot; junior &middot; Performance Review matrix &middot; Database basics (SQL/NoSQL)</sub>

- a) Schema-flexible documents rather than fixed relational tables **(correct)**
- b) Strict foreign key enforcement
- c) Support for SQL joins only
- d) Data must be normalised to third normal form

> Document stores trade rigid schema and joins for flexibility and horizontal scale, which changes what a tester must check about data consistency.

**5. What is the main difference between a checklist and a set of test cases?**  
<sub>TR-ART-002 &middot; trainee &middot; Performance Review matrix &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) A checklist lists what to check without prescribing the exact steps **(correct)**
- b) A checklist can only be used for regression
- c) A checklist must always contain test data
- d) A checklist is written only by the test lead

> A checklist is a lightweight list of verification points. It trades step-by-step reproducibility for speed and flexibility, which is why it suits exploratory and smoke testing.

**6. ISTQB Glossary: "root cause analysis" is:**  
<sub>GL-M-005 &middot; middle &middot; ISTQB Glossary &middot; Analysis of testing process</sub>

- a) An analysis technique to identify the causes of defects in order to prevent recurrence **(correct)**
- b) A method to prioritise defects
- c) A technique to estimate effort
- d) A way to classify severity

> Prevention of recurrence, not explanation of one incident, is the stated purpose.

**7. Which is a benefit of static testing that dynamic testing cannot offer?**  
<sub>FL-3-001 &middot; junior &middot; ISTQB Foundation Level &middot; Requirements testing</sub>

- a) Defects can be found before any code is executable **(correct)**
- b) Failures are observed under real load
- c) Response times are measured
- d) Memory leaks are detected

> Static testing examines work products without executing them, which is why it can start on a requirements draft.

**8. ISTQB Glossary: which term means "an event in which a component or system does not perform a required function within specified limits"?**  
<sub>GL-T-001 &middot; trainee &middot; ISTQB Glossary &middot; Defect life cycle</sub>

- a) Failure **(correct)**
- b) Defect
- c) Error
- d) Mistake

> Failure is the observed event. Defect is the flaw in the work product; error is the human action that produced it.

**9. docker-compose is most useful in testing for:**  
<sub>MD-VIRT-005 &middot; middle &middot; Performance Review matrix &middot; Virtualization (vagrant/docker)</sub>

- a) Bringing up an application plus its dependencies as one reproducible stack **(correct)**
- b) Running unit tests faster
- c) Replacing the CI server
- d) Generating test data

> App plus database plus queue plus mock services, started identically on every machine, is exactly the integration-test problem compose solves.

**10. A tester lacks the skills a high-risk area demands. The Test Manager should:**  
<sub>TM-012 &middot; senior &middot; ISTQB Test Manager &middot; Managing team members (no less than 2 people)</sub>

- a) Pair them with an experienced tester and plan the skill development explicitly **(correct)**
- b) Assign the area to someone else permanently
- c) Assign it anyway and hope
- d) Remove the area from scope

> Pairing mitigates the immediate risk and removes the future one; permanent reassignment mitigates only the first.

**11. Why does OOP knowledge matter for a manual tester moving toward automation?**  
<sub>JR-OOP-003 &middot; junior &middot; Performance Review matrix &middot; OOP principles</sub>

- a) Test frameworks are built from classes, inheritance and interfaces **(correct)**
- b) It is required to write a bug report
- c) It speeds up manual execution
- d) It replaces test design techniques

> Page Objects, base test classes, fixtures and custom assertions are all straightforward OOP once the four pillars are understood.

**12. Rotating testers across modules periodically helps because:**  
<sub>SR-ROLE-003 &middot; senior &middot; Performance Review matrix &middot; Distribution of roles within a test team</sub>

- a) Fresh eyes find defects that familiarity hides, and knowledge spreads **(correct)**
- b) It is fairer
- c) It reduces documentation
- d) It shortens onboarding

> It costs some ramp-up time and buys both defect detection and resilience.

**13. Functional appropriateness, as a quality sub-characteristic, is about:**  
<sub>TA-Q-001 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Whether the functions facilitate the accomplishment of the user tasks **(correct)**
- b) Whether the function returns the right value
- c) Whether all specified functions are present
- d) Whether the system is fast

> ISO 25010 splits functional suitability into completeness (all present), correctness (right results) and appropriateness (actually helps the task).

**14. Accessibility testing should verify, at minimum:**  
<sub>TA-Q-005 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Keyboard operability, text alternatives and sufficient contrast **(correct)**
- b) Only screen reader support
- c) Only colour contrast
- d) Only font size

> WCAG covers perceivable, operable, understandable and robust. Testing only one of the four leaves the majority of barriers in place.

**15. You must report that a critical defect remains open the day before release. The right approach is to:**  
<sub>MD-CREP-003 &middot; middle &middot; Performance Review matrix &middot; Creating test reports which include the evaluation of the product quality</sub>

- a) State the defect, its impact, the workaround and the options, without softening the risk **(correct)**
- b) Omit it to avoid alarming the customer
- c) Mention it verbally only
- d) Report it as medium severity

> Concealing known risk at a release gate is the fastest way to lose a client permanently, and it removes their right to decide.

**16. Which is a prerequisite for a meaningful performance test?**  
<sub>MD-APERF-004 &middot; middle &middot; Performance Review matrix &middot; Automation of Performance/Load tests</sub>

- a) A production-like environment and realistic data volume **(correct)**
- b) A brand-new empty database
- c) A single test user
- d) Running from a developer laptop

> Performance is dominated by data volume, indexes, caches and infrastructure. An empty database measures nothing useful.

**17. Collaboration-based test approaches such as ATDD produce:**  
<sub>FL-4-009 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) Test cases derived collaboratively from user stories and acceptance criteria **(correct)**
- b) Only automated unit tests
- c) Only performance tests
- d) Only exploratory charters

> Acceptance test-driven development turns the three-amigos conversation into concrete acceptance tests before the code is written.

**18. Reporting to a customer that "testing is 80% complete" is weak because:**  
<sub>TM-028 &middot; senior &middot; ISTQB Test Manager &middot; Creating reports about your team's completed work during a month/sprint/release</sub>

- a) Percentage of executed cases says nothing about risk covered or defects open **(correct)**
- b) It is too precise
- c) It should be a fraction
- d) Customers dislike percentages

> Eighty percent of the cases can leave one hundred percent of the highest risk untested.

**19. A CDN in front of an application primarily affects testing because:**  
<sub>JR-ARCH-004 &middot; junior &middot; Performance Review matrix &middot; Architecture and structure of web apps</sub>

- a) Cached content can mask a fresh deployment **(correct)**
- b) It changes the database schema
- c) It rewrites the business logic
- d) It removes the need for HTTPS

> Verifying against a stale CDN copy is a routine source of false "the fix did not work" reports.

**20. A risk register entry is complete when it contains:**  
<sub>SR-RM-001 &middot; senior &middot; Performance Review matrix &middot; Risk management in testing</sub>

- a) Description, likelihood, impact, owner, mitigation and contingency **(correct)**
- b) Description and severity
- c) Description only
- d) Description and a due date

> Without an owner and a contingency, a register is a list of worries rather than a management tool.

---

## Variant 17

**1. A requirement says "the export must support large files". Your first action is:**  
<sub>DP-J-015 &middot; junior &middot; Practice-test style &middot; Requirements testing</sub>

- a) Ask for a number: how large, in what format, within what time **(correct)**
- b) Test with a 1 GB file
- c) Mark the requirement as passed
- d) Skip it

> Picking your own threshold quietly invents the requirement and guarantees an argument at acceptance.

**2. A user story says "As an admin I want to export users so that I can analyse them". The most important missing information for a Test Analyst is:**  
<sub>TA-A-003 &middot; middle &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) The acceptance criteria: format, fields, volume limits and permissions **(correct)**
- b) The developer assigned
- c) The story point estimate
- d) The sprint number

> Without those, any export satisfies the story, and any defect report about it is arguable.

**3. Which is the strongest argument for tracking escaped defects by root cause?**  
<sub>TM-032 &middot; senior &middot; ISTQB Test Manager &middot; Testing metrics</sub>

- a) It shows which process gate is failing and where to invest next **(correct)**
- b) It identifies which tester missed them
- c) It reduces the defect count
- d) It satisfies the customer

> Root cause by gate turns a defect list into an improvement backlog.

**4. Device fragmentation is a bigger testing problem on Android than on iOS mainly because:**  
<sub>TR-MOB-005 &middot; trainee &middot; Performance Review matrix &middot; Mobile technologies and platforms</sub>

- a) Many manufacturers ship many OS versions, screen sizes and custom skins **(correct)**
- b) Android has no emulators
- c) iOS apps are never updated
- d) Android does not support automation

> The combination matrix on Android is far larger, which is why device-cloud testing and a prioritised device list matter so much.

**5. During execution you notice a defect that is outside the scope of the case you are running. You should:**  
<sub>TR-EXEC-004 &middot; trainee &middot; Performance Review matrix &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) Report it as a separate defect and continue the case **(correct)**
- b) Ignore it because it is out of scope
- c) Stop and rewrite the test suite
- d) Mark the current case as Failed

> Observations outside the current case are still valuable. Report them separately so the current case keeps a truthful verdict.

**6. In a shell pipeline, what does "2>&1" do?**  
<sub>MD-UNIX-005 &middot; middle &middot; Performance Review matrix &middot; Unix basics</sub>

- a) Redirects standard error into standard output **(correct)**
- b) Runs the command twice
- c) Redirects output to file 2
- d) Suppresses all output

> Without it, stderr bypasses the pipe and never reaches the next command or the log file.

**7. What is the difference between an id and a class in HTML?**  
<sub>TR-HTML-006 &middot; trainee &middot; Performance Review matrix &middot; Webpage markup basics (HTML, CSS)</sub>

- a) An id must be unique in the document; a class may repeat **(correct)**
- b) A class must be unique; an id may repeat
- c) Both must be unique
- d) Neither has any uniqueness rule

> Duplicate ids are invalid HTML and a common cause of flaky locators, because tools then match the first occurrence non-deterministically.

**8. What does "grep -i -c error app.log" return?**  
<sub>MD-UNIX-002 &middot; middle &middot; Performance Review matrix &middot; Unix basics</sub>

- a) The count of lines containing "error", case-insensitively **(correct)**
- b) The matching lines only
- c) The first matching line
- d) The file size

> -i ignores case, -c prints the count instead of the lines.

**9. Which coverage measure is most meaningful to report to a business stakeholder?**  
<sub>TA-A-008 &middot; middle &middot; ISTQB Test Analyst &middot; Testing metrics</sub>

- a) Coverage of prioritised requirements and risks **(correct)**
- b) Statement coverage
- c) Number of test cases
- d) Lines of test code

> Business stakeholders reason about features and risks; code-level coverage is an engineering diagnostic.

**10. Which negative case is most often missing from API test suites?**  
<sub>MD-AAPI-004 &middot; middle &middot; Performance Review matrix &middot; Automation of API tests</sub>

- a) Malformed payloads and wrong content types **(correct)**
- b) The happy path
- c) A valid GET request
- d) A successful login

> Error handling is where APIs leak stack traces, return 500 for client errors and expose internal field names.

**11. Code coverage measured by unit tests should be treated as:**  
<sub>SR-SA-004 &middot; senior &middot; Performance Review matrix &middot; Ability to use tools for static code analysis</sub>

- a) A diagnostic that finds untested code, not a quality target **(correct)**
- b) A contractual quality guarantee
- c) A replacement for review
- d) A measure of defect density

> Coverage as a mandated target reliably produces assertion-free tests that execute code without checking anything.

**12. A senior tester is disengaged after two years on the same regression suite. The most effective response is:**  
<sub>TM-031 &middot; senior &middot; ISTQB Test Manager &middot; Managing team members (no less than 2 people)</sub>

- a) Give them ownership of a meaningful improvement or a new technical area **(correct)**
- b) Increase their workload
- c) Move them to another project immediately
- d) Ignore it until they raise it

> Autonomy and mastery are what the situation lacks. More of the same work addresses neither.

**13. ISTQB Glossary: "defect triage" is:**  
<sub>GL-M-010 &middot; middle &middot; ISTQB Glossary &middot; Defect management system/Project management system</sub>

- a) The process of assessing, prioritising and assigning reported defects **(correct)**
- b) The process of fixing defects
- c) The process of reproducing defects
- d) The process of closing defects

> Triage brings the roles with the necessary context together so priority reflects business reality.

**14. Which SQL statement returns customers who have never placed an order?**  
<sub>JR-DB-001 &middot; junior &middot; Performance Review matrix &middot; Database basics (SQL/NoSQL)</sub>

- a) SELECT c.* FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL **(correct)**
- b) SELECT c.* FROM customers c INNER JOIN orders o ON o.customer_id = c.id
- c) SELECT c.* FROM customers c, orders o WHERE c.id = o.customer_id
- d) SELECT c.* FROM customers c RIGHT JOIN orders o ON o.customer_id = c.id

> A LEFT JOIN keeps every customer; filtering for a NULL on the right-hand side isolates those with no match. The other three all require a matching order.

**15. Which is the best example of negative testing?**  
<sub>DP-T-008 &middot; trainee &middot; Practice-test style &middot; Testing types and subtypes</sub>

- a) Submitting a form with the email field set to "abc" **(correct)**
- b) Submitting a valid form
- c) Measuring the submit time
- d) Checking the button colour

> Negative testing supplies input the system should reject, and verifies that it rejects it gracefully.

**16. The MOST important success factor for a review is that:**  
<sub>FL-3-005 &middot; junior &middot; ISTQB Foundation Level &middot; Requirements testing</sub>

- a) Objectives are clear and participants are prepared **(correct)**
- b) The meeting is short
- c) The author defends the work product
- d) Managers attend

> Unprepared participants turn a review into a reading session, which finds the defects a proof-reader would find and no others.

**17. What does a PRIMARY KEY guarantee?**  
<sub>JR-DB-002 &middot; junior &middot; Performance Review matrix &middot; Database basics (SQL/NoSQL)</sub>

- a) Uniqueness and non-nullability of the column combination **(correct)**
- b) That the column is indexed alphabetically
- c) That values are sequential
- d) That the column references another table

> A foreign key is what references another table. A primary key identifies the row uniquely and can never be NULL.

**18. A search that takes 1 ms on 1,000 records and 1 s on 1,000,000 records most likely has complexity:**  
<sub>SR-ALG-001 &middot; senior &middot; Performance Review matrix &middot; The basics of development and algorithms</sub>

- a) O(n) **(correct)**
- b) O(1)
- c) O(log n)
- d) O(n^2)

> A 1000x increase in data producing a 1000x increase in time is linear. O(n^2) would have grown a millionfold.

**19. Which activity is part of test analysis rather than test design?**  
<sub>FL-1-004 &middot; junior &middot; ISTQB Foundation Level &middot; Phases of testing and Goals of testing</sub>

- a) Deciding WHAT to test by evaluating the test basis **(correct)**
- b) Deciding HOW to test by producing test cases
- c) Creating test data and test procedures
- d) Executing the test suite

> Analysis identifies testable features and defines test conditions. Design turns those conditions into test cases; implementation creates the concrete data and procedures.

**20. Encapsulation means:**  
<sub>JR-OOP-001 &middot; junior &middot; Performance Review matrix &middot; OOP principles</sub>

- a) Internal state is hidden and accessed only through a defined interface **(correct)**
- b) One class inherits from another
- c) The same method behaves differently per type
- d) Details are hidden behind an abstract concept

> Encapsulation is about controlled access to state. Inheritance, polymorphism and abstraction are the other three pillars.

---

## Variant 18

**1. ISTQB Glossary: "error guessing" is:**  
<sub>GL-M-008 &middot; middle &middot; ISTQB Glossary &middot; Test design techniques</sub>

- a) A technique in which experience is used to anticipate defects **(correct)**
- b) A structural coverage technique
- c) A formal specification-based technique
- d) A defect prioritisation method

> It is a recognised experience-based technique, most effective when combined with a defect taxonomy.

**2. A defect report must always let a reader answer one question above all others:**  
<sub>TR-REP-002 &middot; trainee &middot; Performance Review matrix &middot; Creating defect reports (in English)</sub>

- a) How do I reproduce this? **(correct)**
- b) Who is to blame?
- c) How long will the fix take?
- d) Which sprint is it in?

> Reproducibility is the report core value. Everything else is metadata that can be added later.

**3. A good unit test is characterised by:**  
<sub>SR-UT-001 &middot; senior &middot; Performance Review matrix &middot; Writing unit tests</sub>

- a) Fast, isolated, deterministic and testing one behaviour **(correct)**
- b) Covering the whole system end to end
- c) Using the real database
- d) Depending on the previous test

> The FIRST properties. A unit test that touches the network is an integration test wearing the wrong label.

**4. While verifying a story you find behaviour that is not covered by any acceptance criterion. You should:**  
<sub>JR-STORY-002 &middot; junior &middot; Performance Review matrix &middot; Verification of a story, in strict accordance with its acceptance criteria</sub>

- a) Raise the gap with the product owner before deciding whether it is a defect **(correct)**
- b) Report it as a defect immediately
- c) Ignore it
- d) Change the acceptance criteria yourself

> An uncovered behaviour is first a requirements gap. Whether it becomes a defect depends on the intent, which the product owner holds.

**5. Which coverage claim is honest for an exploratory-only test effort?**  
<sub>STA-007 &middot; senior &middot; ISTQB Test Analyst &middot; Testing metrics</sub>

- a) Charters completed and areas explored, with explicitly unexplored areas named **(correct)**
- b) Percentage of requirements covered
- c) Statement coverage
- d) A defect-free assertion

> Session-based reporting makes exploratory work accountable without pretending to a coverage number it never measured.

**6. When reviewing requirements, the Test Analyst is best placed to check:**  
<sub>TA-V-001 &middot; middle &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) Testability, completeness and consistency from a user perspective **(correct)**
- b) Compiler warnings
- c) Database indexes
- d) Deployment scripts

> The analyst brings the question "how would I prove this?" which is precisely the question that exposes untestable requirements.

**7. Test-driven development influences design because:**  
<sub>SR-UT-004 &middot; senior &middot; Performance Review matrix &middot; Writing unit tests</sub>

- a) Code that is hard to test tends to get refactored towards looser coupling **(correct)**
- b) It removes the need for design
- c) It guarantees no defects
- d) It replaces integration testing

> The design pressure is the main long-term benefit; the tests themselves are a valuable by-product.

**8. A defect appears only when module A and module B run together, though each passes its own unit tests. The level that should have caught it is:**  
<sub>DP-J-003 &middot; junior &middot; Practice-test style &middot; Levels of testing</sub>

- a) Integration testing **(correct)**
- b) Component testing
- c) Acceptance testing
- d) Unit testing

> Interface and interaction defects are the definition of what integration testing targets.

**9. A documentation standard is worth introducing mainly because it:**  
<sub>MD-TDOC-002 &middot; middle &middot; Performance Review matrix &middot; Development of test documentation</sub>

- a) Makes test artefacts reviewable and reusable across the team **(correct)**
- b) Makes documents longer
- c) Satisfies the customer
- d) Reduces the need for testing

> The benefit is that a case written by one tester can be executed and maintained by another without a conversation.

**10. Given a login that locks after 3 failed attempts, which test design technique most directly derives the test cases?**  
<sub>FL-4-010 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) State transition testing **(correct)**
- b) Boundary value analysis alone
- c) Statement testing
- d) Checklist-based testing

> Attempt count is state. The interesting cases are the transitions at 1, 2, 3 failures and the reset on a successful login.

**11. Which is the strongest candidate for automation?**  
<sub>FL-6-002 &middot; junior &middot; ISTQB Foundation Level &middot; Automation of WEB UI (functional) tests</sub>

- a) A stable, frequently repeated regression check **(correct)**
- b) A one-off exploratory session
- c) A usability evaluation with real users
- d) A test whose expected result changes weekly

> Automation pays back through repetition against a stable oracle. Volatile or judgement-based checks pay negative interest.

**12. In the test pyramid, UI end-to-end tests should be:**  
<sub>MD-AWEB-005 &middot; middle &middot; Performance Review matrix &middot; Automation of WEB UI (functional) tests</sub>

- a) The smallest layer, covering critical user journeys only **(correct)**
- b) The largest layer
- c) The only layer
- d) Equal in size to unit tests

> E2E tests are the slowest and most brittle per unit of coverage, so they are spent on the journeys that must never break.

**13. Equivalence partitioning assumes that:**  
<sub>TR-TDT-002 &middot; trainee &middot; Performance Review matrix &middot; Test design techniques</sub>

- a) All values in a partition are processed the same way, so one value represents them all **(correct)**
- b) Every possible input must be tested
- c) Only invalid inputs need to be tested
- d) Partitions must always contain exactly ten values

> The technique reduces test count by exploiting the assumption that a partition behaves uniformly. Boundary value analysis then attacks the edges where that assumption breaks.

**14. A feature matches the specification exactly, but users cannot complete their task with it. This is:**  
<sub>JR-VV-003 &middot; junior &middot; Performance Review matrix &middot; Verification & Validation</sub>

- a) A validation failure **(correct)**
- b) A verification failure
- c) Not a defect at all
- d) A performance defect

> The build is right; the requirement was wrong. This is precisely the failure mode that validation activities exist to catch, and it should be reported, not dismissed.

**15. A key characteristic of Scrum is:**  
<sub>JR-SDLC-002 &middot; junior &middot; Performance Review matrix &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) Fixed-length iterations delivering a potentially shippable increment **(correct)**
- b) A single test phase after all development
- c) No requirements documentation of any kind
- d) A dedicated QA sign-off gate between phases

> The sprint boundary and the increment are the two structural commitments of Scrum. Testing happens inside the sprint, not after it.

**16. When automating a REST API, authentication tokens should be:**  
<sub>MD-AAPI-002 &middot; middle &middot; Performance Review matrix &middot; Automation of API tests</sub>

- a) Obtained at setup and injected from configuration or a secret store **(correct)**
- b) Hardcoded in the test file
- c) Committed to the repository
- d) Copied from the browser manually each run

> Hardcoded tokens expire, leak and break the suite for everyone else.

**17. Two stakeholders describe the same feature differently. The Test Analyst should first:**  
<sub>TA-A-007 &middot; middle &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) Surface the conflict explicitly and get it resolved before designing tests **(correct)**
- b) Test both interpretations
- c) Pick the more senior stakeholder version
- d) Test neither until documentation arrives

> Designing tests over an unresolved conflict guarantees a dispute at the acceptance gate, when it is most expensive.

**18. Reporting to a customer that "testing is 80% complete" is weak because:**  
<sub>TM-028 &middot; senior &middot; ISTQB Test Manager &middot; Creating reports about your team's completed work during a month/sprint/release</sub>

- a) Percentage of executed cases says nothing about risk covered or defects open **(correct)**
- b) It is too precise
- c) It should be a fraction
- d) Customers dislike percentages

> Eighty percent of the cases can leave one hundred percent of the highest risk untested.

**19. The DOM is:**  
<sub>TR-BROW-006 &middot; trainee &middot; Performance Review matrix &middot; Web browser architecture (cookies, localstorage, etc.)</sub>

- a) The in-memory tree the browser builds from the HTML, which scripts can change **(correct)**
- b) The HTML file stored on the server
- c) The CSS rules of a page
- d) The browser network cache

> Because the DOM is live, what you see in the Elements panel can differ from the source HTML. That difference explains many "the markup is right but the page is wrong" reports.

**20. ISTQB Glossary: "regression" refers to:**  
<sub>GL-T-014 &middot; trainee &middot; ISTQB Glossary &middot; Testing types and subtypes</sub>

- a) Degradation of previously working functionality caused by a change **(correct)**
- b) A defect found in a new feature
- c) A performance decrease under load
- d) A failed deployment

> The word names the phenomenon; regression testing is the activity that looks for it.

---

## Variant 19

**1. The most reliable input to a testing estimate is:**  
<sub>MD-PEST-002 &middot; middle &middot; Performance Review matrix &middot; Estimation of time/cost of testing activities (epics, stories, bugs, testing types)</sub>

- a) Historical actuals from comparable work in the same context **(correct)**
- b) Management expectation
- c) The developer estimate multiplied by a fixed factor
- d) A round number that sounds credible

> Calibration against your own past data beats every rule of thumb, because it silently includes your team overheads.

**2. Which is a purely mobile non-functional concern?**  
<sub>TR-MOB-006 &middot; trainee &middot; Performance Review matrix &middot; Mobile technologies and platforms</sub>

- a) Battery and data consumption **(correct)**
- b) Response time
- c) Security
- d) Accessibility

> The other three matter everywhere. Battery drain and cellular data usage are constraints specific to a device carried on a person.

**3. A DELETE request is sent twice for the same resource. The second call should return:**  
<sub>DP-J-005 &middot; junior &middot; Practice-test style &middot; REST API and HTTP/HTTPS protocols</sub>

- a) 404 or 204 - but never create a side effect **(correct)**
- b) 500
- c) 201
- d) A duplicate deletion error that changes state

> DELETE is idempotent: repeating it must leave the same state. Either 204 or 404 is defensible; a side effect is not.

**4. In risk-based testing, high-risk areas should be:**  
<sub>FL-5-006 &middot; junior &middot; ISTQB Foundation Level &middot; Risks in testing</sub>

- a) Tested earlier and more deeply **(correct)**
- b) Tested last, when the build is stable
- c) Tested only if time permits
- d) Excluded to save effort

> Testing early on the highest risks maximises the information gained per unit of time, and leaves room to react.

**5. Shift-left testing means:**  
<sub>FL-2-005 &middot; junior &middot; ISTQB Foundation Level &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) Performing testing activities earlier in the lifecycle **(correct)**
- b) Moving the test team to another project
- c) Automating everything
- d) Testing only in production

> Shift left includes reviewing requirements, writing tests before code, and running static analysis in CI.

**6. ISTQB Glossary: a "test case" consists of:**  
<sub>GL-T-003 &middot; trainee &middot; ISTQB Glossary &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) Preconditions, inputs, actions, expected results and postconditions **(correct)**
- b) A list of features to test
- c) A summary of testing performed
- d) The schedule for a test level

> The postcondition is the part most often omitted, and its absence is why cases leave the system in a state that breaks the next case.

**7. An API test suite passes locally and fails in CI with intermittent 401s. The most likely cause is:**  
<sub>DP-M-001 &middot; middle &middot; Practice-test style &middot; Automation of API tests</sub>

- a) A token obtained once and reused past its expiry across parallel workers **(correct)**
- b) A slow CI machine
- c) A wrong assertion
- d) A missing test case

> Shared, cached credentials across parallel workers is the classic source of intermittent auth failures in CI only.

**8. The primary purpose of a defect management system is to:**  
<sub>JR-DMS-001 &middot; junior &middot; Performance Review matrix &middot; Defect management system/Project management system</sub>

- a) Track each defect from discovery to closure with a full history **(correct)**
- b) Measure tester productivity
- c) Replace direct communication
- d) Store test cases

> The tracker is the single source of truth for defect state. Using it as a productivity scoreboard reliably corrupts the data it holds.

**9. Reporting only the average response time is misleading because:**  
<sub>MD-APERF-002 &middot; middle &middot; Performance Review matrix &middot; Automation of Performance/Load tests</sub>

- a) It hides the tail; percentiles show what the slowest users actually experience **(correct)**
- b) Averages cannot be computed reliably
- c) It ignores the number of requests
- d) It requires more data

> A 200 ms mean can coexist with a 4 s 99th percentile. Users experience the tail, not the mean.

**10. Polymorphism allows:**  
<sub>JR-OOP-002 &middot; junior &middot; Performance Review matrix &middot; OOP principles</sub>

- a) A single interface to be backed by different implementations **(correct)**
- b) A class to have private fields
- c) Code to be compiled faster
- d) Objects to be serialised

> This is the property that lets a Page Object framework treat a WebPage and a MobilePage through one interface.

**11. A prospect asks for something your team cannot deliver well. You should:**  
<sub>SR-PRE-003 &middot; senior &middot; Performance Review matrix &middot; Participation in presale activities (including communication with a customer)</sub>

- a) Say so plainly and propose the closest thing you can deliver well **(correct)**
- b) Agree and figure it out later
- c) Refer them to a competitor immediately
- d) Ignore the question

> Overcommitting in presale is repaid with interest during delivery, usually by the people who were not in the room.

**12. A test progress report to senior management should emphasise:**  
<sub>TM-016 &middot; senior &middot; ISTQB Test Manager &middot; Creating test reports which include the evaluation of the product quality</sub>

- a) Status against objectives, residual risk and decisions required **(correct)**
- b) Detailed defect descriptions
- c) Test case level results
- d) Tool configuration

> Report at the altitude of the decision the reader has to make.

**13. When a specification is missing entirely, the most defensible approach is:**  
<sub>TA-A-009 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Exploratory testing under charters, plus documenting the discovered behaviour as a draft oracle **(correct)**
- b) Not testing at all
- c) Testing only what the developer describes
- d) Waiting indefinitely

> The session output becomes the first version of the specification, which is a deliverable in its own right.

**14. Which question is most valuable to ask a prospect early?**  
<sub>SR-PRE-004 &middot; senior &middot; Performance Review matrix &middot; Participation in presale activities (including communication with a customer)</sub>

- a) What does a successful outcome look like to you in six months? **(correct)**
- b) Which tools do you use?
- c) How large is your team?
- d) What is your budget?

> The success definition is what lets you scope, price and later demonstrate value. Everything else is detail underneath it.

**15. Which is a portability sub-characteristic relevant to a Test Analyst?**  
<sub>TA-Q-003 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Installability **(correct)**
- b) Maturity
- c) Time behaviour
- d) Confidentiality

> Portability covers adaptability, installability and replaceability. Maturity is reliability, time behaviour is performance efficiency, confidentiality is security.

**16. Which statement about risk-based testing is FALSE?**  
<sub>TM-026 &middot; senior &middot; ISTQB Test Manager &middot; Risk management in testing</sub>

- a) It guarantees that all high-risk defects will be found **(correct)**
- b) It allocates effort proportionally to risk
- c) It supports release decisions
- d) It requires periodic reassessment

> It improves the odds and makes the trade explicit; it does not remove the possibility of an escaped defect.

**17. The testing process takes longer every sprint although scope is constant. The most likely cause to investigate first is:**  
<sub>MD-PROC-003 &middot; middle &middot; Performance Review matrix &middot; Analysis of testing process</sub>

- a) Growing regression suite and manual repetition **(correct)**
- b) Testers becoming slower
- c) Requirements getting harder
- d) Tooling licence limits

> Regression cost grows monotonically with product size unless it is actively automated or pruned.

**18. A POST that successfully creates a resource should normally return:**  
<sub>JR-HTTP-004 &middot; junior &middot; Performance Review matrix &middot; REST API and HTTP/HTTPS protocols</sub>

- a) 201 Created with a Location header **(correct)**
- b) 200 OK with an empty body
- c) 204 No Content
- d) 302 Found

> 201 plus Location tells the client both that creation succeeded and where the new resource lives.

**19. What does the CSS selector ".btn.primary" match?**  
<sub>TR-HTML-002 &middot; trainee &middot; Performance Review matrix &middot; Webpage markup basics (HTML, CSS)</sub>

- a) Elements that have both the btn and primary classes **(correct)**
- b) Elements with the btn class inside elements with the primary class
- c) Elements with either class
- d) An element with id btn and class primary

> Chained class selectors with no space mean "all of these classes on the same element". A space would mean a descendant relationship.

**20. Which is the strongest argument for keeping test cases short?**  
<sub>TR-DOC-004 &middot; trainee &middot; Performance Review matrix &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) Short cases fail for one identifiable reason **(correct)**
- b) Short cases are faster to type
- c) Short cases need no review
- d) Short cases can skip the expected result

> Diagnosability is the goal. A 40-step case that fails tells you almost nothing about where the product broke.

---

## Variant 20

**1. ISTQB Glossary: "load testing" evaluates behaviour under:**  
<sub>GL-M-003 &middot; middle &middot; ISTQB Glossary &middot; Automation of Performance/Load tests</sub>

- a) Anticipated conditions of varying load, usually between expected and peak **(correct)**
- b) Conditions beyond the specified limits
- c) Sustained load over a long period
- d) Sudden extreme spikes

> Beyond the limits is stress testing; long duration is endurance; sudden jumps are spike testing.

**2. Which wait strategy produces the most reliable UI tests?**  
<sub>MD-AWEB-002 &middot; middle &middot; Performance Review matrix &middot; Automation of WEB UI (functional) tests</sub>

- a) Explicit waits on a specific expected condition **(correct)**
- b) Fixed Thread.sleep calls
- c) Implicit waits set globally to a large value
- d) No waits at all

> Explicit conditions state what you are waiting for, so the test fails with a meaningful message instead of after an arbitrary timeout.

**3. What is the difference between 401 and 403?**  
<sub>JR-HTTP-002 &middot; junior &middot; Performance Review matrix &middot; REST API and HTTP/HTTPS protocols</sub>

- a) 401 means not authenticated; 403 means authenticated but not permitted **(correct)**
- b) They are interchangeable
- c) 401 is a server error
- d) 403 means the resource does not exist

> Sending 401 where 403 belongs is a real, reportable API defect: it tells a client to retry authentication that would never help.

**4. Escaped defects are concentrated in integrations with third-party services. The most effective analyst response is:**  
<sub>TA-A-004 &middot; middle &middot; ISTQB Test Analyst &middot; Analysis of testing process</sub>

- a) Add contract and negative tests around those integrations and their failure modes **(correct)**
- b) Add more UI end-to-end tests
- c) Increase the size of the regression suite
- d) Increase exploratory time uniformly

> Target the mitigation at the observed cluster. Uniform increases spend effort where defects are not.

**5. Which change most reliably shortens feedback time in a mature process?**  
<sub>SR-OPT-004 &middot; senior &middot; Performance Review matrix &middot; Optimization of testing process</sub>

- a) Moving coverage down the pyramid from UI to API and unit level **(correct)**
- b) Adding more end-to-end tests
- c) Hiring more manual testers
- d) Increasing the sprint length

> The same behaviour verified at a lower level runs in seconds instead of minutes and fails for one identifiable reason.

**6. What does a load balancer do?**  
<sub>JR-ARCH-002 &middot; junior &middot; Performance Review matrix &middot; Architecture and structure of web apps</sub>

- a) Distributes incoming requests across several server instances **(correct)**
- b) Compresses images
- c) Caches database queries
- d) Encrypts passwords

> Load balancers also affect testing: sticky sessions, or their absence, explain many "I was logged out at random" reports.

**7. Three-point estimation (optimistic, most likely, pessimistic) is useful because it:**  
<sub>MD-PEST-001 &middot; middle &middot; Performance Review matrix &middot; Estimation of time/cost of testing activities (epics, stories, bugs, testing types)</sub>

- a) Expresses uncertainty explicitly instead of hiding it in one number **(correct)**
- b) Always produces a smaller estimate
- c) Removes the need for historical data
- d) Guarantees the deadline

> The spread itself is information: a wide range is a signal that the requirement needs clarification before it is committed.

**8. Which quality characteristic is most often under-tested in web products and most visible to end users?**  
<sub>STA-012 &middot; senior &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Accessibility **(correct)**
- b) Maintainability
- c) Portability
- d) Modifiability

> Accessibility failures are user-visible, frequently legally binding, and inexpensive to catch with a basic keyboard and contrast pass.

**9. You read that a technique guarantees "100% bug-free software". The correct professional reaction is:**  
<sub>TR-NEWS-005 &middot; trainee &middot; Performance Review matrix &middot; Ability to keep up with news and trends</sub>

- a) Treat the claim as false: exhaustive testing is impossible **(correct)**
- b) Adopt it immediately
- c) Forward it to the customer
- d) Add it to the test plan as a goal

> One of the seven testing principles states that exhaustive testing is impossible, so absence of defects can never be proven by testing.

**10. In a Page Object framework, putting an assertion inside a page class is usually a mistake because:**  
<sub>DP-J-014 &middot; junior &middot; Practice-test style &middot; OOP principles</sub>

- a) Pages should describe capability; verdicts belong in the tests **(correct)**
- b) Assertions are slow
- c) It breaks inheritance
- d) It prevents parallel execution

> Keeping verdicts in the test keeps the page reusable by tests with different expectations.

**11. A retrospective produces the same action items every sprint. This most likely means:**  
<sub>TM-015 &middot; senior &middot; ISTQB Test Manager &middot; Optimization of testing process</sub>

- a) Actions are not being owned, sized and tracked to completion **(correct)**
- b) The team lacks ideas
- c) Retrospectives are unnecessary
- d) The process is already optimal

> An action without an owner and a due date is a wish. Repetition is the symptom.

**12. ISTQB Glossary: a "defect" is best defined as:**  
<sub>GL-T-002 &middot; trainee &middot; ISTQB Glossary &middot; Defect life cycle</sub>

- a) An imperfection in a work product that may cause it to fail to meet its requirements **(correct)**
- b) The observed incorrect behaviour
- c) A human action producing an incorrect result
- d) A failed test case

> A defect can exist for years without ever causing a failure, if the code path is never executed with the triggering data.

**13. Risk levels should be reassessed:**  
<sub>TA-R-003 &middot; middle &middot; ISTQB Test Analyst &middot; Risks in testing</sub>

- a) Throughout the project as new information arrives **(correct)**
- b) Once, at the start
- c) Only after a production incident
- d) Only when the customer asks

> A risk register written once and never revisited becomes a historical document rather than a planning tool.

**14. Test reports should be issued:**  
<sub>MD-CREP-004 &middot; middle &middot; Performance Review matrix &middot; Creating test reports which include the evaluation of the product quality</sub>

- a) On a regular agreed cadence and at every release decision point **(correct)**
- b) Only when something goes wrong
- c) Only at the end of the project
- d) Only when the customer asks

> Predictable reporting builds trust; reports that appear only with bad news train the reader to dread them.

**15. Which sentence is the better "Actual result" line?**  
<sub>TR-REP-003 &middot; trainee &middot; Performance Review matrix &middot; Creating defect reports (in English)</sub>

- a) The page returns HTTP 500 and no order is created **(correct)**
- b) The page is broken
- c) Nothing happens, probably a back-end issue
- d) Same as yesterday

> The actual result should be observable and specific. Diagnosis ("probably back-end") is a hypothesis, not an observation, and belongs in a comment.

**16. A ticket states "Expected: the modal is dismissed on Esc". "Dismissed" here means:**  
<sub>TR-ENG-003 &middot; trainee &middot; Performance Review matrix &middot; Can read and understand test documentation</sub>

- a) Closed **(correct)**
- b) Disabled
- c) Rejected by the server
- d) Moved to the background

> In UI vocabulary, dismissing a modal means closing it without completing its action.

**17. What is the main purpose of a coverage criterion?**  
<sub>FL-4-007 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) To provide an objective measure of the thoroughness of a test suite **(correct)**
- b) To guarantee defect-free code
- c) To replace test design
- d) To estimate test effort

> Coverage is a measure of what was exercised, not of quality: 100% statement coverage with weak assertions can find nothing.

**18. In a formal review, who leads the meeting and mediates between participants?**  
<sub>FL-3-003 &middot; junior &middot; ISTQB Foundation Level &middot; Requirements testing</sub>

- a) The moderator (facilitator) **(correct)**
- b) The author
- c) The scribe
- d) The manager

> The author must not moderate their own review; the moderator keeps it about the work product rather than the person.

**19. Client-side rendering (SPA) versus server-side rendering matters to a tester because:**  
<sub>JR-ARCH-005 &middot; junior &middot; Performance Review matrix &middot; Architecture and structure of web apps</sub>

- a) Content may appear after the initial HTML, so waits and SEO checks differ **(correct)**
- b) SPAs cannot be automated
- c) SSR pages have no JavaScript
- d) SPAs never make network calls

> In an SPA the DOM is assembled after load, which is the root cause of most naive-automation timing flakiness.

**20. The most important section of a test plan for stakeholders is usually:**  
<sub>SR-TP-001 &middot; senior &middot; Performance Review matrix &middot; Writing a test plan</sub>

- a) Scope, risks and exit criteria **(correct)**
- b) The tool list
- c) The team CVs
- d) The document revision history

> Those three answer what will and will not be tested, what could go wrong, and how we will know we are done.

---

## Variant 21

**1. Trunk-based development affects testing mainly because it:**  
<sub>SR-VCS-003 &middot; senior &middot; Performance Review matrix &middot; VCS</sub>

- a) Requires fast, reliable automated checks on every small merge to main **(correct)**
- b) Removes the need for regression testing
- c) Eliminates merge conflicts
- d) Requires long-lived feature branches

> The whole model depends on a pipeline trustworthy enough to gate main. Without it, trunk-based development just breaks main faster.

**2. Which test level is normally executed by developers on their own code?**  
<sub>JR-LVL-002 &middot; junior &middot; Performance Review matrix &middot; Levels of testing</sub>

- a) Component (unit) testing **(correct)**
- b) System testing
- c) Acceptance testing
- d) Operational acceptance testing

> Unit tests live with the code, run in the pipeline and are maintained by the people who change the code.

**3. A risk assessment rates two areas equally. The tie-break most consistent with risk-based testing is:**  
<sub>STA-002 &middot; senior &middot; ISTQB Test Analyst &middot; Risks in testing</sub>

- a) Detectability: prefer the area where a defect would reach production unnoticed **(correct)**
- b) Alphabetical order
- c) Whichever is easier to test
- d) Whichever the developer prefers

> Some risk models add detectability as a third factor precisely because an undetectable failure has a much higher effective impact.

**4. When planning testing for a specific task, the first thing to establish is:**  
<sub>JR-PLAN-001 &middot; junior &middot; Performance Review matrix &middot; Planning of testing activities for specific tasks</sub>

- a) What the change affects and what risk it carries **(correct)**
- b) How many test cases to write
- c) Which tool to use
- d) Who will execute the tests

> Scope and risk determine everything downstream. Deciding the count or the tool first is planning backwards.

**5. A company logo is misspelled on the home page of a public marketing site. The most defensible classification is:**  
<sub>TR-SEV-001 &middot; trainee &middot; Performance Review matrix &middot; Severity vs Priority</sub>

- a) Low severity, high priority **(correct)**
- b) High severity, low priority
- c) High severity, high priority
- d) Low severity, low priority

> Nothing is functionally broken, so severity is low. It is on the most visible page of a brand-facing site, so it must be fixed first: priority is high.

**6. Which pair of metrics together give the most honest picture of test effectiveness?**  
<sub>DP-M-013 &middot; middle &middot; Practice-test style &middot; Testing metrics</sub>

- a) Defect detection percentage and escaped defect severity **(correct)**
- b) Test cases executed and pass rate
- c) Automation coverage and suite runtime
- d) Hours logged and defects reported

> One measures how much was caught, the other measures how much what got through actually mattered.

**7. Integration testing focuses on:**  
<sub>JR-LVL-001 &middot; junior &middot; Performance Review matrix &middot; Levels of testing</sub>

- a) The interfaces and interactions between components **(correct)**
- b) The internal logic of a single function
- c) The system as a whole against business requirements
- d) The user acceptance of the product

> Integration testing targets the seams. Most integration defects are contract mismatches - format, order, timing, error handling - rather than logic errors.

**8. Which estimation technique uses the collective judgement of experts converging over rounds?**  
<sub>TM-008 &middot; senior &middot; ISTQB Test Manager &middot; Estimation of time/cost of testing activities (full project, team tasks)</sub>

- a) Wideband Delphi **(correct)**
- b) Function point analysis
- c) Three-point estimation
- d) Test point analysis

> Wideband Delphi is a consensus technique; function point and test point analysis are metric-based; three-point is a distribution technique.

**9. Which command shows the last 100 lines of a log and keeps following it?**  
<sub>MD-UNIX-001 &middot; middle &middot; Performance Review matrix &middot; Unix basics</sub>

- a) tail -n 100 -f app.log **(correct)**
- b) head -n 100 app.log
- c) cat -f app.log
- d) less -f app.log

> tail -f is the standard way to watch a log while reproducing a defect.

**10. Keyword-driven testing is attractive for a Test Analyst because:**  
<sub>TA-X-002 &middot; middle &middot; ISTQB Test Analyst &middot; Automation of WEB UI (functional) tests</sub>

- a) Test cases can be authored in business terms without scripting **(correct)**
- b) It removes the need for maintenance
- c) It runs faster than scripted tests
- d) It requires no framework

> The trade is that a developer-level engineer must build and maintain the keyword layer underneath.

**11. A password field accepts 8 to 16 characters. Which set of lengths gives the best boundary coverage?**  
<sub>DP-T-001 &middot; trainee &middot; Practice-test style &middot; Test design techniques</sub>

- a) 7, 8, 16, 17 **(correct)**
- b) 8, 12, 16
- c) 1, 8, 16, 100
- d) 0, 8, 16

> Each boundary is paired with its nearest invalid neighbour. 12 adds nothing that 8 and 16 do not already represent.

**12. Assigning roles inside a test team should be driven primarily by:**  
<sub>SR-ROLE-001 &middot; senior &middot; Performance Review matrix &middot; Distribution of roles within a test team</sub>

- a) Project risk and required skills, balanced against individual growth **(correct)**
- b) Seniority alone
- c) Who volunteers first
- d) Alphabetical rotation

> Risk decides what must be covered by experience; growth decides where to place the person who will be senior next year.

**13. A test suite passes locally but fails in the container. The first thing to compare is:**  
<sub>MD-VIRT-004 &middot; middle &middot; Performance Review matrix &middot; Virtualization (vagrant/docker)</sub>

- a) Environment variables, mounted volumes, timezone and locale **(correct)**
- b) The tester keyboard layout
- c) The Docker logo version
- d) The host screen resolution

> Timezone and locale differences alone account for a large share of container-only failures in date and number formatting.

**14. Why should a test case have exactly one expected result per step?**  
<sub>TR-ART-006 &middot; trainee &middot; Performance Review matrix &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) So that a failure points unambiguously at the step that produced it **(correct)**
- b) Because tools cannot store more than one
- c) To keep the case shorter than one page
- d) Because ISTQB forbids more than one

> One assertion per step keeps failure localisation cheap. When a step carries three expectations, a red result tells you almost nothing about what broke.

**15. ISTQB Glossary: a "test oracle" is:**  
<sub>GL-J-004 &middot; junior &middot; ISTQB Glossary &middot; Phases of testing and Goals of testing</sub>

- a) A source to determine the expected result of a test **(correct)**
- b) A tool that generates test data
- c) A defect prediction model
- d) A test management system

> When no oracle exists, testing degrades into observing behaviour without being able to judge it - the oracle problem.

**16. Branch coverage of 100% guarantees:**  
<sub>FL-4-011 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) 100% statement coverage **(correct)**
- b) 100% path coverage
- c) No defects remain
- d) All requirements are covered

> Branch coverage subsumes statement coverage. Path coverage is strictly stronger than both and is usually infeasible.

**17. Which of the following is a typical objective of testing?**  
<sub>FL-1-001 &middot; junior &middot; ISTQB Foundation Level &middot; Phases of testing and Goals of testing</sub>

- a) Building confidence in the level of quality of the test object **(correct)**
- b) Removing all defects from the code
- c) Proving that the software is correct
- d) Guaranteeing zero production incidents

> CTFL lists evaluating work products, causing failures, ensuring coverage, reducing risk, complying with requirements and building confidence among the objectives. Proof of correctness is not among them.

**18. Defect Detection Percentage (DDP) is calculated as:**  
<sub>MD-MET-001 &middot; middle &middot; Performance Review matrix &middot; Testing metrics</sub>

- a) Defects found by testing / (defects found by testing + defects found after release) **(correct)**
- b) Defects found / test cases executed
- c) Defects fixed / defects reported
- d) Test cases passed / test cases executed

> DDP measures how much of the total defect population the test process caught, which is one of the few metrics that says something about test effectiveness.

**19. A good test case is best described as:**  
<sub>TR-DOC-001 &middot; trainee &middot; Performance Review matrix &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) Independent, repeatable and unambiguous **(correct)**
- b) As long as possible
- c) Written only for automation
- d) Dependent on the previous case

> Independence is what allows cases to be reordered, parallelised and executed by someone who did not write them.

**20. Low-level (concrete) test cases are preferred over high-level (logical) ones when:**  
<sub>TA-P-003 &middot; middle &middot; ISTQB Test Analyst &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) The testers are less experienced or the results must be auditable and repeatable **(correct)**
- b) The requirements change every day
- c) Time is very short
- d) The system is exploratory in nature

> Concrete cases cost more to maintain but survive being executed by someone who does not know the system.

---

## Variant 22

**1. A hybrid mobile application is best described as:**  
<sub>TR-MOB-002 &middot; trainee &middot; Performance Review matrix &middot; Mobile technologies and platforms</sub>

- a) A web application wrapped in a native shell **(correct)**
- b) An application written twice, once per platform
- c) An application that runs only offline
- d) An application distributed outside the stores

> Hybrid apps render web content inside a native container (WebView), which is why they often share UI defects with the mobile web version.

**2. When estimating a bug fix verification, you should include:**  
<sub>MD-PEST-003 &middot; middle &middot; Performance Review matrix &middot; Estimation of time/cost of testing activities (epics, stories, bugs, testing types)</sub>

- a) Retest of the fix plus regression around the affected area **(correct)**
- b) Retest of the fix only
- c) The developer fixing time
- d) Nothing, it is negligible

> The regression radius, not the retest, is the part that varies from ten minutes to two days.

**3. What is an artefact in a CI pipeline?**  
<sub>JR-CI-004 &middot; junior &middot; Performance Review matrix &middot; Continuous integration systems</sub>

- a) A build output stored for later stages, such as a package or a report **(correct)**
- b) A defect found during the build
- c) A configuration error
- d) A test case

> Artefacts are what one stage passes to the next: binaries, containers, coverage and test reports.

**4. What is the main purpose of a coverage criterion?**  
<sub>FL-4-007 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) To provide an objective measure of the thoroughness of a test suite **(correct)**
- b) To guarantee defect-free code
- c) To replace test design
- d) To estimate test effort

> Coverage is a measure of what was exercised, not of quality: 100% statement coverage with weak assertions can find nothing.

**5. Entry criteria for a test level should be enforced because:**  
<sub>TM-020 &middot; senior &middot; ISTQB Test Manager &middot; Planning the testing process for the entire team</sub>

- a) Starting on an unready build wastes effort and produces misleading results **(correct)**
- b) They are required by the standard
- c) They shorten the schedule
- d) They reduce documentation

> Testing an unstable build generates defects about the build rather than about the product.

**6. A mind map is a good choice for test documentation when:**  
<sub>TR-DOC-003 &middot; trainee &middot; Performance Review matrix &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) You need to explore and communicate coverage quickly at an early stage **(correct)**
- b) You need step-by-step reproducibility for an auditor
- c) You need to store execution results
- d) You need to run tests automatically

> Mind maps excel at structure and coverage conversations. They are a poor substitute when detailed, evidenced steps are contractually required.

**7. You are asked for an estimate on a story whose requirements are still unclear. The professional answer is:**  
<sub>JR-EST-002 &middot; junior &middot; Performance Review matrix &middot; Approximate estimation of time/cost to test a specific task/story</sub>

- a) Give a range with stated assumptions, or ask for a timeboxed spike first **(correct)**
- b) Give a single confident number
- c) Refuse to estimate
- d) Copy the estimate of a similar story

> A range communicates uncertainty honestly. A single number invented from an unclear requirement becomes a commitment you did not intend to make.

**8. A user story says "As an admin I want to export users so that I can analyse them". The most important missing information for a Test Analyst is:**  
<sub>TA-A-003 &middot; middle &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) The acceptance criteria: format, fields, volume limits and permissions **(correct)**
- b) The developer assigned
- c) The story point estimate
- d) The sprint number

> Without those, any export satisfies the story, and any defect report about it is arguable.

**9. ISTQB Glossary: "test process improvement" refers to:**  
<sub>GL-M-012 &middot; middle &middot; ISTQB Glossary &middot; Optimization of testing process</sub>

- a) A programme to improve the quality and efficiency of testing activities **(correct)**
- b) Adding more test cases
- c) Buying a new test tool
- d) Increasing the size of the test team

> TMMi and TPI Next are the two most widely used reference models for it.

**10. Which is NOT a typical goal of testing?**  
<sub>JR-PH-001 &middot; junior &middot; Performance Review matrix &middot; Phases of testing and Goals of testing</sub>

- a) Proving that the software has no defects **(correct)**
- b) Finding defects
- c) Reducing risk
- d) Providing information for decision making

> Testing can show the presence of defects but never their absence. A goal stated as "prove there are no bugs" is unachievable by definition.

**11. Traceability from test cases back to the test basis primarily supports:**  
<sub>FL-1-007 &middot; junior &middot; ISTQB Foundation Level &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) Coverage assessment and impact analysis when the basis changes **(correct)**
- b) Faster test execution
- c) Reduced test maintenance cost
- d) Higher defect detection rate

> Traceability answers "what is covered" and "what must be retested", and it is what makes test progress reporting meaningful.

**12. A new Test Manager inherits a team with no documented process. The best first move is:**  
<sub>TM-025 &middot; senior &middot; ISTQB Test Manager &middot; Onboarding and training team members</sub>

- a) Observe and baseline the current way of working before changing it **(correct)**
- b) Introduce a full standard process immediately
- c) Replace the tooling
- d) Reassign every role

> Undocumented does not mean absent. Changing an unmeasured process makes any later improvement unprovable.

**13. The difference between load testing and stress testing is that stress testing:**  
<sub>MD-APERF-001 &middot; middle &middot; Performance Review matrix &middot; Automation of Performance/Load tests</sub>

- a) Pushes the system beyond its expected capacity to find the breaking point **(correct)**
- b) Uses the expected number of users
- c) Runs for a long duration at normal load
- d) Measures only response time

> Load = expected volume; stress = beyond it; soak/endurance = normal load for a long time; spike = sudden jumps.

**14. Which file format is the installable package for an Android application?**  
<sub>TR-MOB-001 &middot; trainee &middot; Performance Review matrix &middot; Mobile technologies and platforms</sub>

- a) .apk (or .aab for distribution) **(correct)**
- b) .ipa
- c) .exe
- d) .dmg

> APK is the Android package; AAB is the publishing format Google Play expects. IPA is the iOS equivalent.

**15. Defect arrival is still rising three days before the planned release. The most defensible forecast statement is:**  
<sub>SR-FC-002 &middot; senior &middot; Performance Review matrix &middot; Estimates & forecasts</sub>

- a) Discovery has not saturated; the current date carries material risk, with these options **(correct)**
- b) We will be ready, the team will work harder
- c) We cannot say anything until the last day
- d) Testing is complete

> A rising arrival curve is evidence that discovery is incomplete. Reporting the shape of the curve converts a gut feeling into a defensible position.

**16. The "Buy now" button is invisible on iPhone Safari only. Classification:**  
<sub>DP-T-003 &middot; trainee &middot; Practice-test style &middot; Severity vs Priority</sub>

- a) High severity, high priority **(correct)**
- b) Low severity, low priority
- c) High severity, low priority
- d) Low severity, high priority

> Revenue path plus a major browser share: both impact and urgency are high.

**17. A framework should provide a shared reporting and logging layer mainly because:**  
<sub>SR-TF-002 &middot; senior &middot; Performance Review matrix &middot; Creating your own test frameworks</sub>

- a) Failure diagnosis time dominates the cost of a large suite **(correct)**
- b) Reports look professional
- c) It is required by CI
- d) It reduces the number of tests

> A failure that takes 30 minutes to diagnose, times a hundred failures, is where automation budgets actually go.

**18. ISTQB Glossary: "exit criteria" are:**  
<sub>GL-J-009 &middot; junior &middot; ISTQB Glossary &middot; Testing metrics</sub>

- a) Conditions for officially completing a defined task **(correct)**
- b) Conditions for starting testing
- c) The definition of a defect
- d) The test schedule

> Entry criteria gate the start, exit criteria gate the finish. Both must be agreed with the people who will invoke them.

**19. Residual risk means:**  
<sub>MD-RISK-004 &middot; middle &middot; Performance Review matrix &middot; Risks in testing</sub>

- a) The risk that remains after the planned mitigation has been applied **(correct)**
- b) A risk nobody identified
- c) A risk that already occurred
- d) A risk with zero impact

> Communicating residual risk honestly at release time is the single most valuable thing a test report does.

**20. Keyword-driven testing is attractive for a Test Analyst because:**  
<sub>TA-X-002 &middot; middle &middot; ISTQB Test Analyst &middot; Automation of WEB UI (functional) tests</sub>

- a) Test cases can be authored in business terms without scripting **(correct)**
- b) It removes the need for maintenance
- c) It runs faster than scripted tests
- d) It requires no framework

> The trade is that a developer-level engineer must build and maintain the keyword layer underneath.

---

## Variant 23

**1. Defect density is normally expressed as:**  
<sub>MD-MET-003 &middot; middle &middot; Performance Review matrix &middot; Testing metrics</sub>

- a) Defects per size unit, such as per KLOC or per function point **(correct)**
- b) Defects per tester
- c) Defects per sprint
- d) Defects per environment

> Normalising by size lets you compare modules of different sizes and spot the clusters worth extra attention.

**2. The most valuable review comment a Test Analyst can make on a user story is usually:**  
<sub>STA-020 &middot; senior &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) Naming a concrete scenario the acceptance criteria do not decide **(correct)**
- b) A wording correction
- c) A story point suggestion
- d) A formatting request

> A concrete undecided scenario forces the requirement gap to be closed while it is still free to close.

**3. Which suite belongs in the fastest CI stage, triggered on every commit?**  
<sub>JR-CI-003 &middot; junior &middot; Performance Review matrix &middot; Continuous integration systems</sub>

- a) Unit tests and a short smoke suite **(correct)**
- b) The full regression suite
- c) Manual exploratory sessions
- d) Full load tests

> The first stage exists to fail fast. Long suites run later, on a schedule or before release.

**4. Which command finds which process is listening on port 8080?**  
<sub>MD-UNIX-004 &middot; middle &middot; Performance Review matrix &middot; Unix basics</sub>

- a) lsof -i :8080  (or ss -ltnp | grep 8080) **(correct)**
- b) ps -ef | grep 8080
- c) netcat 8080
- d) kill -9 8080

> ps only matches the command line. lsof and ss inspect the actual socket table.

**5. The core idea of continuous integration is that:**  
<sub>JR-CI-001 &middot; junior &middot; Performance Review matrix &middot; Continuous integration systems</sub>

- a) Changes are merged and verified automatically and frequently **(correct)**
- b) Code is deployed to production every hour
- c) Testers no longer run manual tests
- d) Releases happen only at the end of a project

> CI is about integrating often and getting fast feedback. Continuous delivery and deployment are separate, later steps.

**6. Which is a benefit of static testing that dynamic testing cannot offer?**  
<sub>FL-3-001 &middot; junior &middot; ISTQB Foundation Level &middot; Requirements testing</sub>

- a) Defects can be found before any code is executable **(correct)**
- b) Failures are observed under real load
- c) Response times are measured
- d) Memory leaks are detected

> Static testing examines work products without executing them, which is why it can start on a requirements draft.

**7. The most appropriate moment to review acceptance criteria for testability is:**  
<sub>JR-STORY-004 &middot; junior &middot; Performance Review matrix &middot; Verification of a story, in strict accordance with its acceptance criteria</sub>

- a) During refinement, before the story enters a sprint **(correct)**
- b) During the sprint review
- c) After the story is coded
- d) At release

> Reviewing criteria at refinement is the cheapest defect prevention available to a tester.

**8. You are asked to sign off a story whose acceptance criteria were changed after development finished. You should:**  
<sub>DP-J-009 &middot; junior &middot; Practice-test style &middot; Verification of a story, in strict accordance with its acceptance criteria</sub>

- a) Verify against the current agreed criteria and flag that they changed mid-story **(correct)**
- b) Verify against the original criteria
- c) Sign off without verification
- d) Refuse to verify

> The current agreement is the oracle, but a silent mid-story change is a process signal worth raising.

**9. A discount applies when a customer is a member AND the basket is over 100. Which technique most directly covers the combinations of these two conditions?**  
<sub>TR-TDT-003 &middot; trainee &middot; Performance Review matrix &middot; Test design techniques</sub>

- a) Decision table testing **(correct)**
- b) Boundary value analysis
- c) Statement coverage
- d) Error guessing

> Decision tables enumerate combinations of conditions and their resulting actions, which is exactly the shape of business rules with several inputs.

**10. Test execution results should be recorded:**  
<sub>TR-EXEC-005 &middot; trainee &middot; Performance Review matrix &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) As they happen, per case, with evidence for failures **(correct)**
- b) At the end of the sprint from memory
- c) Only when everything passes
- d) Only for automated tests

> Results recorded later are results reconstructed, and reconstruction loses exactly the details that make a failure diagnosable.

**11. A test that passes on 10 records and times out on 100,000 indicates:**  
<sub>SR-ALG-003 &middot; senior &middot; Performance Review matrix &middot; The basics of development and algorithms</sub>

- a) A scalability defect that must be reported with the volume that triggers it **(correct)**
- b) A test data problem only
- c) A flaky test
- d) Nothing, the volume is unrealistic

> The volume is only unrealistic until production reaches it. Report it with the threshold you measured.

**12. The strongest argument for keeping test documentation in a version-controlled, tool-supported form is:**  
<sub>MD-TDOC-003 &middot; middle &middot; Performance Review matrix &middot; Development of test documentation</sub>

- a) Changes are traceable and documentation evolves with the product **(correct)**
- b) It looks more professional
- c) It uses less disk space
- d) It is required by ISTQB

> Untracked documents drift silently; tracked ones make the drift visible and reviewable.

**13. A test case has 12 steps and fails at step 3. You should:**  
<sub>DP-T-009 &middot; trainee &middot; Practice-test style &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) Record the failure with evidence at step 3 and report it **(correct)**
- b) Continue to step 12 and then report
- c) Mark the whole case as blocked
- d) Skip to the last step

> The verdict is Failed at step 3. Whether you continue is a judgement call; the report must state where it failed.

**14. A UI suite of 400 tests takes 90 minutes serially. The cheapest large win is usually:**  
<sub>DP-M-009 &middot; middle &middot; Practice-test style &middot; Automation of WEB UI (functional) tests</sub>

- a) Run in parallel across isolated workers with independent data **(correct)**
- b) Rewrite the framework
- c) Reduce the number of assertions
- d) Increase the timeouts

> Parallelism converts wall-clock time into machine time. It only works if the data isolation is already there.

**15. Which artefact describes a single, concrete verification with preconditions, steps and an expected result?**  
<sub>TR-ART-001 &middot; trainee &middot; Performance Review matrix &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) Test plan
- b) Test case **(correct)**
- c) Checklist
- d) Test policy

> A test case is the smallest executable unit of test documentation: preconditions, steps, test data and an expected result. A checklist only names what to verify; a test plan describes how testing will be organised.

**16. Which is a black-box test technique?**  
<sub>FL-4-001 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) Equivalence partitioning **(correct)**
- b) Statement testing
- c) Branch testing
- d) Decision testing

> Statement, branch and decision testing are white-box: they need the code structure. Equivalence partitioning works from the specification.

**17. Which usability defect would a heuristic evaluation find that a scripted functional test would not?**  
<sub>TA-Q-006 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) The user has no way to recognise which step of the process they are on **(correct)**
- b) A button returns a 500 error
- c) A field accepts 300 characters instead of 200
- d) A total is calculated incorrectly

> Heuristic evaluation targets exactly the class of problems where nothing is technically broken but the user is lost.

**18. TMMi and TPI are examples of:**  
<sub>TM-013 &middot; senior &middot; ISTQB Test Manager &middot; Optimization of testing process</sub>

- a) Test process improvement models **(correct)**
- b) Test design techniques
- c) Defect taxonomies
- d) Automation frameworks

> TMMi is a staged maturity model; TPI Next is a continuous model with key areas assessed independently.

**19. A review checklist for user stories should include:**  
<sub>TA-V-002 &middot; middle &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) Independent, negotiable, valuable, estimable, small, testable (INVEST) **(correct)**
- b) Number of words
- c) Author seniority
- d) Story point value

> INVEST is a widely used checklist; the "testable" criterion is the one a Test Analyst must defend hardest.

**20. A team plan should allocate contingency because:**  
<sub>SR-TTP-003 &middot; senior &middot; Performance Review matrix &middot; Planning the testing process for the entire team</sub>

- a) Defect fixing, retesting and environment issues are certain but not schedulable **(correct)**
- b) It makes the plan look longer
- c) The customer expects it
- d) It is a standard percentage

> Contingency is not padding; it is the budget for known-uncertain work, and it should be named as such.

---

## Variant 24

**1. ISTQB Glossary: "defect density" is:**  
<sub>GL-M-001 &middot; middle &middot; ISTQB Glossary &middot; Testing metrics</sub>

- a) The number of defects per size unit of the work product **(correct)**
- b) The number of defects per tester
- c) The rate at which defects are fixed
- d) The proportion of defects found before release

> Normalising by size is what makes two modules comparable; the proportion found before release is defect detection percentage.

**2. Which is a legitimate reason to tailor a standard test process for a project?**  
<sub>TM-021 &middot; senior &middot; ISTQB Test Manager &middot; Writing a test plan</sub>

- a) The project risk profile, lifecycle and regulatory context differ **(correct)**
- b) The team prefers fewer documents
- c) The deadline is tight
- d) The customer has not asked for it

> Tailoring is expected; tailoring justified only by schedule pressure is scope reduction in disguise.

**3. When you do not yet know the cause of a defect, the honest phrasing in a customer-facing update is:**  
<sub>JR-ENGW-003 &middot; junior &middot; Performance Review matrix &middot; Writing test documentation/emails to a customer</sub>

- a) We are investigating and will confirm the root cause by end of day **(correct)**
- b) It is a back-end problem
- c) Nothing serious, it will fix itself
- d) The developers are looking into their mistake

> Commit to a time for the next update rather than to a cause you have not established.

**4. ISTQB Glossary: a "stub" is:**  
<sub>GL-J-002 &middot; junior &middot; ISTQB Glossary &middot; Levels of testing</sub>

- a) A skeletal implementation of a called component used during integration testing **(correct)**
- b) A component that invokes the code under test
- c) A tool for load generation
- d) A defect report template

> Stubs let a component be tested before its dependencies exist, which is what makes top-down integration possible.

**5. A soak (endurance) test is designed to reveal:**  
<sub>MD-APERF-003 &middot; middle &middot; Performance Review matrix &middot; Automation of Performance/Load tests</sub>

- a) Memory leaks and resource exhaustion over time **(correct)**
- b) The maximum throughput
- c) The breaking point
- d) The cold start time

> Degradation that only appears after hours of steady traffic is invisible to a 10-minute load test.

**6. Which is a good testing practice in ANY software development lifecycle model?**  
<sub>FL-2-001 &middot; junior &middot; ISTQB Foundation Level &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) Every development activity has a corresponding test activity **(correct)**
- b) All testing happens after coding is complete
- c) Only the test team performs testing
- d) Test levels never overlap

> CTFL states that in every model each development activity should have a corresponding test activity, and testers should be involved in reviewing work products as soon as drafts exist.

**7. A test management tool adds most value when it:**  
<sub>TA-X-003 &middot; middle &middot; ISTQB Test Analyst &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) Links requirements, tests, runs and defects so coverage is queryable **(correct)**
- b) Stores documents
- c) Sends email notifications
- d) Generates charts

> The traceability graph is the product; charts are a view of it.

**8. Which of the following makes a defect report harder, not easier, to act on?**  
<sub>TR-REP-006 &middot; trainee &middot; Performance Review matrix &middot; Creating defect reports (in English)</sub>

- a) Reporting three unrelated problems in one ticket **(correct)**
- b) Numbering the reproduction steps
- c) Stating the expected result explicitly
- d) Adding the build number

> One defect per report. Bundled tickets cannot be assigned, prioritised, fixed or closed independently.

**9. A monthly test report for a whole team should be built around:**  
<sub>SR-TR-001 &middot; senior &middot; Performance Review matrix &middot; Creating reports about your team's completed work during a month/sprint/release</sub>

- a) Product quality trends, risk and impediments over the period **(correct)**
- b) Individual tester output
- c) The number of meetings
- d) The list of executed cases

> The audience is deciding about the product and the process, not evaluating individuals.

**10. A page shows old content after a deployment. Which check comes first?**  
<sub>DP-T-013 &middot; trainee &middot; Practice-test style &middot; Web browser architecture (cookies, localstorage, etc.)</sub>

- a) Hard refresh and inspect whether assets are served from cache **(correct)**
- b) Reinstall the browser
- c) Report a back-end defect
- d) Clear the database

> Cache is the overwhelmingly likely cause, and it takes ten seconds to rule out.

**11. Which of these is an entry criterion for starting test execution on a task?**  
<sub>JR-PLAN-003 &middot; junior &middot; Performance Review matrix &middot; Planning of testing activities for specific tasks</sub>

- a) The build is deployed to the test environment and smoke checks pass **(correct)**
- b) All defects are closed
- c) The test report is written
- d) The customer has signed off

> Entry criteria gate the start of execution; exit criteria gate its end. The other three options are exit-side concerns.

**12. An API returns 200 OK with a body of {"error": "user not found"}. This is a defect because:**  
<sub>MD-API-005 &middot; middle &middot; Performance Review matrix &middot; API</sub>

- a) The status code contradicts the payload, so clients cannot rely on HTTP semantics **(correct)**
- b) The body should be XML
- c) 200 is never valid for GET
- d) The message is in English

> Clients, proxies, caches and monitoring all key off the status code. Encoding failures in a 200 breaks every one of them.

**13. Which pair correctly separates functional from non-functional testing?**  
<sub>TR-TYPE-003 &middot; trainee &middot; Performance Review matrix &middot; Testing types and subtypes</sub>

- a) Functional: what the system does. Non-functional: how well it does it **(correct)**
- b) Functional: manual. Non-functional: automated
- c) Functional: by testers. Non-functional: by developers
- d) Functional: before release. Non-functional: after release

> Functional testing checks behaviour against requirements; non-functional testing checks quality characteristics such as performance, usability, security and portability.

**14. A test plan that is never updated during the project is:**  
<sub>SR-TP-002 &middot; senior &middot; Performance Review matrix &middot; Writing a test plan</sub>

- a) A document about a project that no longer exists **(correct)**
- b) Still fully useful
- c) Ideal, since it is stable
- d) Required by ISTQB

> Plans are living artefacts. An unchanged plan through a changing project means nobody is using it to decide anything.

**15. Why must a mobile tester care about the app being sent to the background?**  
<sub>TR-MOB-004 &middot; trainee &middot; Performance Review matrix &middot; Mobile technologies and platforms</sub>

- a) The OS may kill or restore the process, and unsaved state is often lost **(correct)**
- b) Backgrounding is impossible on modern phones
- c) It only affects battery consumption
- d) It only matters for games

> Android and iOS both reclaim memory from backgrounded apps. State restoration bugs are among the most common and most user-visible mobile defects.

**16. Which test level is MOST focused on interfaces and interactions between integrated components?**  
<sub>FL-2-002 &middot; junior &middot; ISTQB Foundation Level &middot; Levels of testing</sub>

- a) Component integration testing **(correct)**
- b) Component testing
- c) System testing
- d) Acceptance testing

> Component integration testing targets the interfaces between components. System integration testing targets interfaces to other systems and external services.

**17. Which coverage measure is most meaningful to report to a business stakeholder?**  
<sub>TA-A-008 &middot; middle &middot; ISTQB Test Analyst &middot; Testing metrics</sub>

- a) Coverage of prioritised requirements and risks **(correct)**
- b) Statement coverage
- c) Number of test cases
- d) Lines of test code

> Business stakeholders reason about features and risks; code-level coverage is an engineering diagnostic.

**18. A requirement says "the report must load quickly for all users". The best tester response is:**  
<sub>JR-REQ-004 &middot; junior &middot; Performance Review matrix &middot; Requirements testing</sub>

- a) Ask for a measurable target: which percentile, which data volume, which network **(correct)**
- b) Accept it and test subjectively
- c) Reject the requirement outright
- d) Write a test case that says "loads quickly"

> Turning a vague quality statement into a measurable one is requirements testing in its most practical form.

**19. A tester lacks the skills a high-risk area demands. The Test Manager should:**  
<sub>TM-012 &middot; senior &middot; ISTQB Test Manager &middot; Managing team members (no less than 2 people)</sub>

- a) Pair them with an experienced tester and plan the skill development explicitly **(correct)**
- b) Assign the area to someone else permanently
- c) Assign it anyway and hope
- d) Remove the area from scope

> Pairing mitigates the immediate risk and removes the future one; permanent reassignment mitigates only the first.

**20. When a mentee reports a defect that is actually correct behaviour, the best response is to:**  
<sub>MD-ONB-002 &middot; middle &middot; Performance Review matrix &middot; Onboarding and training team members</sub>

- a) Walk through the requirement together so they learn to find the oracle **(correct)**
- b) Close it silently
- c) Tell them to be more careful
- d) Ask someone else to review their reports from now on

> The goal is a tester who checks the oracle next time, not one who reports less.

---

## Variant 25

**1. A customer asks for a fixed-price testing estimate on a project with unstable requirements. The professional response is:**  
<sub>MD-PROJ-002 &middot; middle &middot; Performance Review matrix &middot; Estimation of time/cost of testing activities (full project, team tasks)</sub>

- a) Propose a timeboxed discovery phase or a range with explicit assumptions **(correct)**
- b) Give a low number to win the deal
- c) Give a very high number to be safe
- d) Refuse to quote

> Both a lowball and a padded number destroy trust later. Naming the assumption is what makes the number defensible.

**2. In risk-based testing, which activity does the Test Manager own?**  
<sub>TM-004 &middot; senior &middot; ISTQB Test Manager &middot; Risk management in testing</sub>

- a) Establishing and running the risk management process across the project **(correct)**
- b) Writing every test case
- c) Executing the regression suite
- d) Reviewing the source code

> The manager owns identification, analysis, mitigation planning and monitoring; the analysts supply the technical and domain judgement.

**3. The HttpOnly flag on a cookie means:**  
<sub>TR-BROW-003 &middot; trainee &middot; Performance Review matrix &middot; Web browser architecture (cookies, localstorage, etc.)</sub>

- a) JavaScript cannot read the cookie **(correct)**
- b) The cookie is sent only over HTTP, never HTTPS
- c) The cookie never expires
- d) The cookie is shared across domains

> HttpOnly removes the cookie from document.cookie, which blunts token theft via cross-site scripting. Secure is the flag that requires HTTPS.

**4. Which of the following is a typical objective of testing?**  
<sub>FL-1-001 &middot; junior &middot; ISTQB Foundation Level &middot; Phases of testing and Goals of testing</sub>

- a) Building confidence in the level of quality of the test object **(correct)**
- b) Removing all defects from the code
- c) Proving that the software is correct
- d) Guaranteeing zero production incidents

> CTFL lists evaluating work products, causing failures, ensuring coverage, reducing risk, complying with requirements and building confidence among the objectives. Proof of correctness is not among them.

**5. Who normally has the final say on a defect priority?**  
<sub>TR-SEV-004 &middot; trainee &middot; Performance Review matrix &middot; Severity vs Priority</sub>

- a) The product owner or project manager **(correct)**
- b) The tester who found it
- c) The developer who will fix it
- d) The customer support agent

> Priority is a scheduling and business decision. The tester proposes it; the person who owns the backlog decides it.

**6. Two testers disagree publicly about test coverage. As their lead you should:**  
<sub>SR-PM-003 &middot; senior &middot; Performance Review matrix &middot; Managing team members (no less than 2 people)</sub>

- a) Facilitate a decision based on risk and evidence, then record it **(correct)**
- b) Decide for them immediately
- c) Let them continue until one gives up
- d) Escalate to the customer

> A recorded, evidence-based decision resolves the current dispute and gives the team a precedent for the next one.

**7. Which is the key difference between REST and SOAP?**  
<sub>MD-API-002 &middot; middle &middot; Performance Review matrix &middot; API</sub>

- a) REST is an architectural style over HTTP; SOAP is a protocol with a strict XML envelope **(correct)**
- b) REST cannot use XML
- c) SOAP cannot be tested automatically
- d) REST always uses GraphQL

> SOAP brings WSDL, a fixed envelope and built-in standards (WS-Security). REST relies on HTTP semantics and is far lighter, at the cost of a formal contract unless OpenAPI is added.

**8. During a presale call the customer asks for a firm testing price with almost no information. The strongest professional response is:**  
<sub>SR-PRE-001 &middot; senior &middot; Performance Review matrix &middot; Participation in presale activities (including communication with a customer)</sub>

- a) Offer a discovery phase, plus a ranged indication with the assumptions stated **(correct)**
- b) Quote a low figure to secure the deal
- c) Quote a very high figure to be safe
- d) Decline to answer

> A number given without a basis becomes an expectation you cannot meet, and the correction costs more trust than the delay would have.

**9. Response times are: p50 120 ms, p95 400 ms, p99 6 s. The most important finding to report is:**  
<sub>DP-M-002 &middot; middle &middot; Practice-test style &middot; Automation of Performance/Load tests</sub>

- a) 1% of requests take 6 seconds - investigate the tail before the mean **(correct)**
- b) The average is acceptable
- c) p95 is the only relevant number
- d) No issue exists

> A 6-second p99 on a busy endpoint is thousands of bad experiences a day, and it usually signals a lock, a cold cache or a slow query path.

**10. ISTQB Glossary: a "test suite" is:**  
<sub>GL-T-009 &middot; trainee &middot; ISTQB Glossary &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) A set of test cases or test procedures to be executed in a specific context **(correct)**
- b) A tool that runs tests
- c) A report of results
- d) A single test case

> A suite is the unit of scheduling and reporting; a case is the unit of verdict.

**11. Which information is essential in a defect report to allow prioritisation?**  
<sub>FL-5-007 &middot; junior &middot; ISTQB Foundation Level &middot; Defect life cycle</sub>

- a) Severity, impact on the business and steps to reproduce **(correct)**
- b) The tester name and mood
- c) The number of test cases affected only
- d) The exact time of day

> CTFL lists identification, description, severity, priority, status, references and evidence among the expected contents.

**12. A shopping cart keeps items for 30 days. The most valuable boundary tests are around:**  
<sub>TA-A-002 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Day 29, 30 and 31 of item age **(correct)**
- b) Day 1 only
- c) Day 15 only
- d) Item price

> The retention rule is the specification; its boundary is where the off-by-one lives, usually in a timezone-sensitive comparison.

**13. Severity is best defined as:**  
<sub>TR-SEV-002 &middot; trainee &middot; Performance Review matrix &middot; Severity vs Priority</sub>

- a) The degree of impact the defect has on the system or its users **(correct)**
- b) How soon the defect must be fixed
- c) How often the defect reproduces
- d) How long the fix will take

> Severity measures impact and is normally set by the tester. Priority measures urgency of the fix and is normally set by the product owner or manager.

**14. The most reliable indicator that a test process improvement worked is:**  
<sub>TM-027 &middot; senior &middot; ISTQB Test Manager &middot; Analysis of testing process</sub>

- a) A measured change in an outcome metric against the pre-change baseline **(correct)**
- b) Positive team sentiment
- c) More documentation produced
- d) A larger test suite

> Sentiment and volume both move for reasons unrelated to quality.

**15. Why should a tester be able to query the database directly?**  
<sub>JR-DB-005 &middot; junior &middot; Performance Review matrix &middot; Database basics (SQL/NoSQL)</sub>

- a) To verify what the system actually stored, not just what the UI displays **(correct)**
- b) To fix production data
- c) To replace API testing
- d) To speed up the UI

> The UI can display a cached or transformed value. Direct verification separates a presentation defect from a persistence defect.

**16. In Jira, what is the difference between a workflow and an issue type?**  
<sub>JR-DMS-002 &middot; junior &middot; Performance Review matrix &middot; Defect management system/Project management system</sub>

- a) The issue type says what it is; the workflow says which statuses it can move through **(correct)**
- b) They are the same thing
- c) Workflows apply only to bugs
- d) Issue types define permissions

> A project can have several issue types sharing a workflow, or one issue type with a specialised workflow. Confusing the two makes tracker configuration debates go in circles.

**17. docker-compose is most useful in testing for:**  
<sub>MD-VIRT-005 &middot; middle &middot; Performance Review matrix &middot; Virtualization (vagrant/docker)</sub>

- a) Bringing up an application plus its dependencies as one reproducible stack **(correct)**
- b) Running unit tests faster
- c) Replacing the CI server
- d) Generating test data

> App plus database plus queue plus mock services, started identically on every machine, is exactly the integration-test problem compose solves.

**18. A microservice architecture makes which testing activity noticeably harder?**  
<sub>JR-ARCH-003 &middot; junior &middot; Performance Review matrix &middot; Architecture and structure of web apps</sub>

- a) End-to-end testing across service boundaries **(correct)**
- b) Unit testing
- c) Static analysis
- d) Code review

> Independent deployability multiplies the number of version combinations, which is why contract testing became popular.

**19. A defect taxonomy is used to:**  
<sub>TA-D-001 &middot; middle &middot; ISTQB Test Analyst &middot; Defect management system/Project management system</sub>

- a) Categorise defects so patterns and process weaknesses become visible **(correct)**
- b) Assign blame
- c) Speed up fixes
- d) Replace severity

> Once defects are classified, the same category appearing repeatedly points at a missing gate in the process.

**20. ISTQB Glossary: "incident" (or anomaly) refers to:**  
<sub>GL-J-010 &middot; junior &middot; ISTQB Glossary &middot; Defect management system/Project management system</sub>

- a) Any event occurring that requires investigation **(correct)**
- b) A confirmed defect
- c) A test failure only
- d) A production outage only

> An incident may turn out to be a defect, a test error, an environment problem or expected behaviour.

---

## Variant 26

**1. Shift-left testing means:**  
<sub>FL-2-005 &middot; junior &middot; ISTQB Foundation Level &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) Performing testing activities earlier in the lifecycle **(correct)**
- b) Moving the test team to another project
- c) Automating everything
- d) Testing only in production

> Shift left includes reviewing requirements, writing tests before code, and running static analysis in CI.

**2. Sanity testing differs from smoke testing in that it:**  
<sub>TR-TYPE-005 &middot; trainee &middot; Performance Review matrix &middot; Testing types and subtypes</sub>

- a) Focuses narrowly on the specific area that was changed **(correct)**
- b) Always covers the entire application
- c) Is always automated
- d) Is performed only in production

> Smoke is broad and shallow across the build; sanity is narrow and deeper, aimed at the area a change touched.

**3. ISTQB Glossary: "alpha testing" is performed:**  
<sub>GL-J-007 &middot; junior &middot; ISTQB Glossary &middot; Testing types and subtypes</sub>

- a) At the developing organisation site, but not by the development team **(correct)**
- b) At the customer site by real users
- c) By the development team only
- d) Automatically in CI

> Beta testing is the same idea moved to the customer environment and audience.

**4. Which leadership behaviour most improves defect reporting quality across a team?**  
<sub>TM-022 &middot; senior &middot; ISTQB Test Manager &middot; Managing team members (no less than 2 people)</sub>

- a) Reviewing reports constructively and publishing shared examples of good ones **(correct)**
- b) Setting a minimum defect quota
- c) Ranking testers by defect count
- d) Rejecting weak reports without comment

> Quotas and rankings optimise for volume. Shared exemplars change the standard everyone writes to.

**5. Which command shows the last 100 lines of a log and keeps following it?**  
<sub>MD-UNIX-001 &middot; middle &middot; Performance Review matrix &middot; Unix basics</sub>

- a) tail -n 100 -f app.log **(correct)**
- b) head -n 100 app.log
- c) cat -f app.log
- d) less -f app.log

> tail -f is the standard way to watch a log while reproducing a defect.

**6. Tests pass on the developer machine and fail in the container with date-format assertions. The first thing to check is:**  
<sub>DP-M-005 &middot; middle &middot; Practice-test style &middot; Virtualization (vagrant/docker)</sub>

- a) The container TZ and locale environment variables **(correct)**
- b) The container CPU limit
- c) The Docker version
- d) The network mode

> Containers commonly default to UTC and the C locale, which changes both formatting and parsing.

**7. You must report that a critical defect remains open the day before release. The right approach is to:**  
<sub>MD-CREP-003 &middot; middle &middot; Performance Review matrix &middot; Creating test reports which include the evaluation of the product quality</sub>

- a) State the defect, its impact, the workaround and the options, without softening the risk **(correct)**
- b) Omit it to avoid alarming the customer
- c) Mention it verbally only
- d) Report it as medium severity

> Concealing known risk at a release gate is the fastest way to lose a client permanently, and it removes their right to decide.

**8. What does "shift right" mean in a testing context?**  
<sub>JR-SDLC-005 &middot; junior &middot; Performance Review matrix &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) Extending quality activities into production: monitoring, canaries, real-user feedback **(correct)**
- b) Moving all testing to the end of the project
- c) Handing testing to developers
- d) Delaying the release

> Shift right complements shift left: some failures only appear under real traffic, real data and real infrastructure.

**9. A forecast differs from an estimate in that a forecast:**  
<sub>SR-FC-001 &middot; senior &middot; Performance Review matrix &middot; Estimates & forecasts</sub>

- a) Projects a future outcome from observed trend data **(correct)**
- b) Is always more accurate
- c) Requires no assumptions
- d) Is produced only by managers

> An estimate is a judgement about work not yet started; a forecast extrapolates from what is already being observed, such as burn rate or defect arrival.

**10. The most useful daily status report from a tester contains:**  
<sub>TR-DAY-001 &middot; trainee &middot; Performance Review matrix &middot; Creating reports about tasks accomplished during a day/a week/a month</sub>

- a) What was tested, results, blockers and what is planned next **(correct)**
- b) The number of hours worked
- c) A list of all open defects in the project
- d) A copy of the test plan

> A status report exists so that someone else can make a decision. Progress, results, blockers and the next step are the four things a decision needs.

**11. During test analysis, the Test Analyst identifies test conditions. The best source when requirements are incomplete is:**  
<sub>TA-P-001 &middot; middle &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) A combination of stakeholders, existing systems and experience-based techniques **(correct)**
- b) Guessing what the developer implemented
- c) The defect tracker only
- d) The previous project test cases

> CTAL-TA expects the analyst to work with an imperfect test basis by combining available sources rather than waiting for perfect requirements.

**12. The most effective first week for a new tester on a project is:**  
<sub>MD-ONB-001 &middot; middle &middot; Performance Review matrix &middot; Onboarding and training team members</sub>

- a) A guided tour of the domain plus a small real task with a named mentor **(correct)**
- b) Reading all documentation alone
- c) Immediately owning the regression suite
- d) Waiting until the next sprint starts

> A real task with support produces competence and confidence far faster than passive reading.

**13. A stub or a mock is typically needed at which test level?**  
<sub>JR-LVL-005 &middot; junior &middot; Performance Review matrix &middot; Levels of testing</sub>

- a) Component and integration testing **(correct)**
- b) Acceptance testing
- c) Beta testing
- d) Usability testing

> Test doubles substitute for collaborators that are unavailable, slow or non-deterministic - a lower-level concern by definition.

**14. ISTQB Glossary: "test execution" is:**  
<sub>GL-T-005 &middot; trainee &middot; ISTQB Glossary &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) The process of running a test on the component or system under test **(correct)**
- b) The process of designing tests
- c) The process of writing a test plan
- d) The process of reporting defects

> Execution produces actual results, which are then compared with the expected results.

**15. An age field accepts 18 to 65 inclusive. Which value is a valid equivalence-class representative?**  
<sub>TR-TDT-007 &middot; trainee &middot; Performance Review matrix &middot; Test design techniques</sub>

- a) 30 **(correct)**
- b) 17
- c) 66
- d) -1

> 30 sits inside the valid partition. 17, 66 and -1 all belong to invalid partitions.

**16. Domain analysis extends boundary value analysis and equivalence partitioning by:**  
<sub>TA-T-003 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Considering combinations of interacting variables using on/off/in/out points **(correct)**
- b) Removing the need for boundaries
- c) Only testing invalid values
- d) Working only on single variables

> Domain analysis is the technique to reach for when two or more numeric fields constrain each other.

**17. A story is demoed and works, but the team has not written the automated tests its DoD requires. The story is:**  
<sub>JR-AC-004 &middot; junior &middot; Performance Review matrix &middot; Acceptance criteria/Definition of Done</sub>

- a) Not done **(correct)**
- b) Done, since it works
- c) Done, if the customer approves
- d) Done, but with a follow-up ticket

> The DoD is binary and team-wide. Allowing exceptions turns it into a suggestion, and the debt accumulates silently.

**18. When designing a custom test framework, the most important early decision is:**  
<sub>SR-TF-001 &middot; senior &middot; Performance Review matrix &middot; Creating your own test frameworks</sub>

- a) The layering: tests, business actions, and technical driver kept separate **(correct)**
- b) The programming language
- c) The report colour scheme
- d) The number of test cases

> Layering is what lets the driver be replaced without rewriting tests. It is also the decision that is most expensive to change later.

**19. The IDEAL model for process improvement stands for:**  
<sub>TM-014 &middot; senior &middot; ISTQB Test Manager &middot; Optimization of testing process</sub>

- a) Initiating, Diagnosing, Establishing, Acting, Learning **(correct)**
- b) Identify, Design, Execute, Analyse, Log
- c) Investigate, Decide, Evaluate, Adjust, Leave
- d) Improve, Deliver, Estimate, Assess, Learn

> The Learning phase is the one most often skipped, which is why organisations repeat the same improvement cycle.

**20. Which is an example of operational acceptance testing?**  
<sub>FL-2-006 &middot; junior &middot; ISTQB Foundation Level &middot; Levels of testing</sub>

- a) Verifying backup and restore procedures **(correct)**
- b) Verifying a business workflow with end users
- c) Verifying compliance with a contract
- d) Verifying a single function in isolation

> Operational acceptance testing covers the operational aspects: backup/restore, disaster recovery, user management, maintenance tasks and security checks.

---

## Variant 27

**1. When should a Test Analyst combine several techniques on the same feature?**  
<sub>TA-T-010 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) When the feature has both complex business rules and stateful behaviour **(correct)**
- b) Never - one technique per feature
- c) Only when time allows
- d) Only for automated tests

> Decision tables cover the rules, state transition covers the history, and boundary analysis covers the numeric edges. They are complementary, not alternatives.

**2. Which is an experience-based test technique?**  
<sub>FL-4-006 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) Exploratory testing **(correct)**
- b) Boundary value analysis
- c) Decision table testing
- d) Branch testing

> CTFL v4 lists error guessing, exploratory testing and checklist-based testing as the experience-based techniques.

**3. When a senior tester reviews a unit test suite, the strongest warning sign is:**  
<sub>SR-UT-003 &middot; senior &middot; Performance Review matrix &middot; Writing unit tests</sub>

- a) Tests with high coverage but few meaningful assertions **(correct)**
- b) Tests that use fixtures
- c) Tests grouped by class
- d) Tests with descriptive names

> Coverage without assertions is the classic way to hit a mandated number while verifying nothing.

**4. Risk level is determined by:**  
<sub>FL-5-001 &middot; junior &middot; ISTQB Foundation Level &middot; Risks in testing</sub>

- a) The likelihood of the risk occurring and the impact if it does **(correct)**
- b) The number of defects found so far
- c) The size of the test team
- d) The number of requirements

> Risk = likelihood x impact. Both dimensions must be assessed, since a catastrophic but impossible event and a certain but trivial one need different responses.

**5. A UI shows a total of 100.00 but the database stores 99.995. The most likely defect is:**  
<sub>DP-J-010 &middot; junior &middot; Practice-test style &middot; Database basics (SQL/NoSQL)</sub>

- a) Rounding or a floating-point type used for money **(correct)**
- b) A UI caching problem
- c) A network error
- d) A permissions issue

> Money in a binary floating-point type is a recurring defect class; decimal or integer minor units is the fix.

**6. Which status does a defect normally receive when the developer states that the described behaviour is intentional?**  
<sub>TR-LIFE-001 &middot; trainee &middot; Performance Review matrix &middot; Defect life cycle</sub>

- a) Rejected / Not a bug **(correct)**
- b) Deferred
- c) Duplicate
- d) Reopened

> "Not a bug" (or "Works as designed") means the behaviour matches the requirement. The right response is to challenge the requirement if you disagree, not to reopen the ticket unchanged.

**7. Two requirements state different maximum file sizes for the same upload. This is a defect of:**  
<sub>JR-REQ-002 &middot; junior &middot; Performance Review matrix &middot; Requirements testing</sub>

- a) Consistency **(correct)**
- b) Verifiability
- c) Traceability
- d) Feasibility

> Contradictory requirements guarantee that one of them will be implemented and the other reported as a bug later.

**8. ISTQB Glossary: "risk level" is determined by:**  
<sub>GL-M-002 &middot; middle &middot; ISTQB Glossary &middot; Risks in testing</sub>

- a) The combination of risk likelihood and risk impact **(correct)**
- b) The number of affected requirements
- c) The severity of related defects
- d) The time to fix

> Both factors are required; either alone produces a ranking that misallocates effort.

**9. Which of these is an entry criterion for starting test execution on a task?**  
<sub>JR-PLAN-003 &middot; junior &middot; Performance Review matrix &middot; Planning of testing activities for specific tasks</sub>

- a) The build is deployed to the test environment and smoke checks pass **(correct)**
- b) All defects are closed
- c) The test report is written
- d) The customer has signed off

> Entry criteria gate the start of execution; exit criteria gate its end. The other three options are exit-side concerns.

**10. Boundary value analysis on a date field should include:**  
<sub>STA-014 &middot; senior &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Month ends, leap days, DST transitions and timezone boundaries **(correct)**
- b) Only the first and last day of the year
- c) Only invalid formats
- d) Only the current date

> Calendar arithmetic is where date defects live; the naive numeric boundaries almost never fail.

**11. Which locator strategy is generally the most brittle?**  
<sub>MD-AWEB-004 &middot; middle &middot; Performance Review matrix &middot; Automation of WEB UI (functional) tests</sub>

- a) An absolute XPath through the DOM hierarchy **(correct)**
- b) A dedicated data-testid
- c) An element id
- d) An accessible role plus name

> Absolute XPath encodes the entire document structure, so any wrapper div added by a designer breaks it.

**12. Which defect class is static analysis genuinely good at finding?**  
<sub>SR-SA-002 &middot; senior &middot; Performance Review matrix &middot; Ability to use tools for static code analysis</sub>

- a) Null dereferences, resource leaks and injection-prone string concatenation **(correct)**
- b) Wrong business rules
- c) Poor usability
- d) Missing requirements

> Static tools reason about structure and data flow. They have no oracle for intent.

**13. A test report intended for a customer should lead with:**  
<sub>MD-CREP-001 &middot; middle &middot; Performance Review matrix &middot; Creating test reports which include the evaluation of the product quality</sub>

- a) An assessment of product quality and the risks of releasing **(correct)**
- b) The number of test cases executed
- c) The list of testers involved
- d) The tools used

> The customer needs to make a release decision. Everything else is supporting detail.

**14. Test documentation that is never updated after the first release is:**  
<sub>TR-DOC-006 &middot; trainee &middot; Performance Review matrix &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) A liability, because it reports coverage the product no longer has **(correct)**
- b) Still fully valuable
- c) Only a minor problem
- d) Preferable, since it is stable

> Stale documentation is worse than none: it produces confident, wrong answers about coverage.

**15. Which metric set best supports a go/no-go release decision?**  
<sub>TM-006 &middot; senior &middot; ISTQB Test Manager &middot; Testing metrics</sub>

- a) Risk coverage, open defects weighted by severity and residual risk **(correct)**
- b) Test cases executed and hours spent
- c) Number of automated tests
- d) Lines of code covered

> The decision is about acceptable residual risk, so the metrics must be expressed in risk terms.

**16. Why is API-level testing usually cheaper and more stable than the same coverage at UI level?**  
<sub>MD-API-001 &middot; middle &middot; Performance Review matrix &middot; API</sub>

- a) It skips rendering and layout, so it is faster and not affected by cosmetic changes **(correct)**
- b) It requires no test data
- c) It needs no assertions
- d) It cannot produce false negatives

> This is the argument behind the test pyramid: push coverage down to the layer with the most stable contract and the fastest feedback.

**17. A requirement says: "The system shall lock the account after three consecutive failed login attempts." Which test is directly implied?**  
<sub>TR-ENG-001 &middot; trainee &middot; Performance Review matrix &middot; Can read and understand test documentation</sub>

- a) Fail login three times in a row and verify the account is locked **(correct)**
- b) Fail login twice and verify a warning email
- c) Log in successfully and verify the session length
- d) Verify the password reset link expires

> "Shall" marks a mandatory requirement. The condition (three consecutive failures) and the outcome (lock) map straight onto one test.

**18. Which clause filters rows AFTER aggregation in SQL?**  
<sub>JR-DB-006 &middot; junior &middot; Performance Review matrix &middot; Database basics (SQL/NoSQL)</sub>

- a) HAVING **(correct)**
- b) WHERE
- c) ORDER BY
- d) GROUP BY

> WHERE filters rows before grouping; HAVING filters the aggregated groups. Using WHERE on an aggregate is a classic error.

**19. Which of these is the best expected result for a login test?**  
<sub>DP-T-005 &middot; trainee &middot; Practice-test style &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) The user is redirected to /dashboard and the header shows their name **(correct)**
- b) Login works
- c) No errors appear
- d) The page loads

> A verifiable, observable outcome. "Works" cannot be failed by anyone but its author.

**20. Risk levels should be reassessed:**  
<sub>TA-R-003 &middot; middle &middot; ISTQB Test Analyst &middot; Risks in testing</sub>

- a) Throughout the project as new information arrives **(correct)**
- b) Once, at the start
- c) Only after a production incident
- d) Only when the customer asks

> A risk register written once and never revisited becomes a historical document rather than a planning tool.

---

## Variant 28

**1. Classification tree analysis is most closely related to which other technique?**  
<sub>TA-T-001 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Equivalence partitioning combined with combinatorial testing **(correct)**
- b) Statement coverage
- c) State transition testing
- d) Error guessing

> The tree structures the input space into classes, and the combination table then selects the combinations to execute.

**2. Residual risk means:**  
<sub>MD-RISK-004 &middot; middle &middot; Performance Review matrix &middot; Risks in testing</sub>

- a) The risk that remains after the planned mitigation has been applied **(correct)**
- b) A risk nobody identified
- c) A risk that already occurred
- d) A risk with zero impact

> Communicating residual risk honestly at release time is the single most valuable thing a test report does.

**3. Entry criteria for a test level should be enforced because:**  
<sub>TM-020 &middot; senior &middot; ISTQB Test Manager &middot; Planning the testing process for the entire team</sub>

- a) Starting on an unready build wastes effort and produces misleading results **(correct)**
- b) They are required by the standard
- c) They shorten the schedule
- d) They reduce documentation

> Testing an unstable build generates defects about the build rather than about the product.

**4. A key limitation of testing exclusively on emulators and simulators is that they cannot faithfully reproduce:**  
<sub>MD-AMOB-002 &middot; middle &middot; Performance Review matrix &middot; Automation of Mobile UI (functional) tests</sub>

- a) Real hardware behaviour: sensors, performance, battery, network conditions **(correct)**
- b) Screen layout
- c) Button taps
- d) Application logic

> Layout and logic transfer well. Performance, thermal behaviour and radio conditions do not, which is why a real-device tier is required.

**5. A CDN in front of an application primarily affects testing because:**  
<sub>JR-ARCH-004 &middot; junior &middot; Performance Review matrix &middot; Architecture and structure of web apps</sub>

- a) Cached content can mask a fresh deployment **(correct)**
- b) It changes the database schema
- c) It rewrites the business logic
- d) It removes the need for HTTPS

> Verifying against a stale CDN copy is a routine source of false "the fix did not work" reports.

**6. The team asks you to guarantee that the release has no defects. The correct answer is:**  
<sub>DP-J-007 &middot; junior &middot; Practice-test style &middot; Principles of testing</sub>

- a) I can report the risks and coverage; no testing can guarantee the absence of defects **(correct)**
- b) Yes, if I test everything
- c) Yes, if we automate everything
- d) No, testing is pointless

> This is the second testing principle stated as a professional boundary rather than as trivia.

**7. A dropdown has 5 options and a text field accepts 3 valid formats. The minimum number of tests for single-value coverage of both is:**  
<sub>DP-T-011 &middot; trainee &middot; Practice-test style &middot; Test design techniques</sub>

- a) 5 **(correct)**
- b) 15
- c) 8
- d) 3

> Covering each value of each parameter at least once needs max(5, 3) = 5 tests, pairing them up. Fifteen would be full combinatorial coverage.

**8. A high-likelihood, high-impact risk with no mitigation should be:**  
<sub>SR-RM-003 &middot; senior &middot; Performance Review matrix &middot; Risk management in testing</sub>

- a) Escalated immediately with options and a recommendation **(correct)**
- b) Monitored quietly
- c) Accepted silently
- d) Removed from the register

> Escalation with options is the deliverable; escalation with only a problem transfers work upwards without transferring information.

**9. The Page Object pattern primarily improves:**  
<sub>MD-AWEB-001 &middot; middle &middot; Performance Review matrix &middot; Automation of WEB UI (functional) tests</sub>

- a) Maintainability, by keeping locators and page behaviour in one place **(correct)**
- b) Execution speed
- c) Defect detection rate
- d) Browser compatibility

> When a locator changes, one file changes. Without it, the same selector is scattered across dozens of tests.

**10. A new tool is proposed for the team. The most professional first step is to:**  
<sub>TR-NEWS-002 &middot; trainee &middot; Performance Review matrix &middot; Ability to keep up with news and trends</sub>

- a) Run a small, timeboxed pilot on a real task and compare it against the current tool **(correct)**
- b) Adopt it because it is popular
- c) Reject it because the current tool works
- d) Wait until the customer asks for it

> A bounded pilot produces evidence. Both blind adoption and blind rejection substitute opinion for evidence.

**11. Security testing performed by a Test Analyst (not a specialist) should focus on:**  
<sub>STA-009 &middot; senior &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Access control, input validation and error handling at the functional level **(correct)**
- b) Cryptographic algorithm design
- c) Kernel exploitation
- d) Firmware analysis

> Broken access control and injection are consistently top of the OWASP list and are within functional test reach.

**12. What does "git rebase" do that "git merge" does not?**  
<sub>SR-VCS-001 &middot; senior &middot; Performance Review matrix &middot; VCS</sub>

- a) Replays commits onto a new base, producing linear history and new commit hashes **(correct)**
- b) Deletes branches
- c) Pushes to the remote
- d) Resolves conflicts automatically

> Because hashes change, rebasing a branch other people have pulled rewrites shared history and breaks their checkouts.

**13. Which sentence is the better "Actual result" line?**  
<sub>TR-REP-003 &middot; trainee &middot; Performance Review matrix &middot; Creating defect reports (in English)</sub>

- a) The page returns HTTP 500 and no order is created **(correct)**
- b) The page is broken
- c) Nothing happens, probably a back-end issue
- d) Same as yesterday

> The actual result should be observable and specific. Diagnosis ("probably back-end") is a hypothesis, not an observation, and belongs in a comment.

**14. Which sentence belongs in a status report rather than in a defect report?**  
<sub>TR-DAY-003 &middot; trainee &middot; Performance Review matrix &middot; Creating reports about tasks accomplished during a day/a week/a month</sub>

- a) Smoke suite executed on build 1.4.2: 28 passed, 2 failed, 1 blocked **(correct)**
- b) Steps to reproduce: 1. Open cart...
- c) Expected result: total is recalculated
- d) Severity: Major

> Aggregated progress belongs in the status report; per-defect detail belongs in the tracker. Repeating the detail in both places guarantees they will diverge.

**15. A partner API begins returning an extra field in its response. Your suite fails on strict schema validation. The correct action is:**  
<sub>DP-M-008 &middot; middle &middot; Practice-test style &middot; API</sub>

- a) Confirm the contract, then relax the schema to allow additive changes if that is the agreement **(correct)**
- b) Delete the schema validation
- c) Ignore the failure
- d) Block the release immediately

> Additive changes are usually allowed by contract. The schema should encode the actual contract, not the current response.

**16. Which requirement defect is present in "The system must be user-friendly"?**  
<sub>JR-REQ-001 &middot; junior &middot; Performance Review matrix &middot; Requirements testing</sub>

- a) It is not verifiable **(correct)**
- b) It is not consistent
- c) It is not complete
- d) It is not traceable

> There is no test that can produce a pass or a fail. Verifiability is the property a tester should check first.

**17. A developer types the wrong comparison operator; the program then computes a wrong total; the user sees an incorrect invoice. Match the terms.**  
<sub>FL-1-003 &middot; junior &middot; ISTQB Foundation Level &middot; Defect life cycle</sub>

- a) Error -> defect -> failure **(correct)**
- b) Failure -> defect -> error
- c) Defect -> error -> failure
- d) Error -> failure -> defect

> A human error introduces a defect in the code, and executing that defect may cause a failure that the user observes. Not every defect produces a failure.

**18. What does a load balancer do?**  
<sub>JR-ARCH-002 &middot; junior &middot; Performance Review matrix &middot; Architecture and structure of web apps</sub>

- a) Distributes incoming requests across several server instances **(correct)**
- b) Compresses images
- c) Caches database queries
- d) Encrypts passwords

> Load balancers also affect testing: sticky sessions, or their absence, explain many "I was logged out at random" reports.

**19. A product risk is:**  
<sub>FL-5-002 &middot; junior &middot; ISTQB Foundation Level &middot; Risks in testing</sub>

- a) A risk that the product may fail to satisfy a stakeholder need **(correct)**
- b) A risk that the project will be late
- c) A risk that a supplier withdraws
- d) A risk that the team lacks skills

> Project risks (schedule, staffing, suppliers) threaten the ability to deliver; product risks threaten the quality of what is delivered.

**20. Root cause information in a defect report is valuable because it:**  
<sub>TA-D-003 &middot; middle &middot; ISTQB Test Analyst &middot; Defect management system/Project management system</sub>

- a) Enables process improvement across future projects **(correct)**
- b) Speeds up the current fix
- c) Changes the severity
- d) Satisfies the tracker workflow

> Individual fixes solve one instance; root cause data is what lets you stop producing the class.

---

## Variant 29

**1. Branch coverage of 100% guarantees:**  
<sub>FL-4-011 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) 100% statement coverage **(correct)**
- b) 100% path coverage
- c) No defects remain
- d) All requirements are covered

> Branch coverage subsumes statement coverage. Path coverage is strictly stronger than both and is usually infeasible.

**2. Which CSS property would you check first when an element is present in the DOM but invisible on screen?**  
<sub>TR-HTML-005 &middot; trainee &middot; Performance Review matrix &middot; Webpage markup basics (HTML, CSS)</sub>

- a) display / visibility / opacity **(correct)**
- b) font-family
- c) cursor
- d) letter-spacing

> display:none, visibility:hidden and opacity:0 are the three usual causes. They also behave differently for automation: display:none removes the element from layout entirely.

**3. Why should automated tests live in the same repository as the code they test?**  
<sub>SR-VCS-002 &middot; senior &middot; Performance Review matrix &middot; VCS</sub>

- a) A single commit keeps code and its tests in a consistent, reviewable state **(correct)**
- b) It saves disk space
- c) It is faster to clone
- d) Tools require it

> Split repositories drift: the test suite at HEAD no longer corresponds to any particular version of the product.

**4. When designing a custom test framework, the most important early decision is:**  
<sub>SR-TF-001 &middot; senior &middot; Performance Review matrix &middot; Creating your own test frameworks</sub>

- a) The layering: tests, business actions, and technical driver kept separate **(correct)**
- b) The programming language
- c) The report colour scheme
- d) The number of test cases

> Layering is what lets the driver be replaced without rewriting tests. It is also the decision that is most expensive to change later.

**5. Why should retesting and regression be included in a testing estimate?**  
<sub>JR-EST-003 &middot; junior &middot; Performance Review matrix &middot; Approximate estimation of time/cost to test a specific task/story</sub>

- a) Defects will be found, fixed and must be verified, and neighbours must be rechecked **(correct)**
- b) To inflate the estimate
- c) Because the customer asks for it
- d) Only for large projects

> Every defect found generates verification work later. An estimate assuming zero defects is an estimate assuming the testing was unnecessary.

**6. A test case is Blocked when:**  
<sub>TR-EXEC-002 &middot; trainee &middot; Performance Review matrix &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) It cannot be executed because of an external obstacle such as a broken environment **(correct)**
- b) It fails on the last step
- c) It takes longer than estimated
- d) It has no test data

> Blocked is distinct from Failed: it means the case never got a chance to produce a verdict. Mixing the two corrupts the pass-rate metric.

**7. Which of these is NOT a valid JSON value type?**  
<sub>MD-JSON-001 &middot; middle &middot; Performance Review matrix &middot; JSON</sub>

- a) Date **(correct)**
- b) Number
- c) Boolean
- d) null

> JSON has objects, arrays, strings, numbers, booleans and null. Dates are transported as strings (usually ISO 8601), which is why timezone defects are so common.

**8. Which estimation technique uses the collective judgement of experts converging over rounds?**  
<sub>TM-008 &middot; senior &middot; ISTQB Test Manager &middot; Estimation of time/cost of testing activities (full project, team tasks)</sub>

- a) Wideband Delphi **(correct)**
- b) Function point analysis
- c) Three-point estimation
- d) Test point analysis

> Wideband Delphi is a consensus technique; function point and test point analysis are metric-based; three-point is a distribution technique.

**9. Which pair of activities are both verification?**  
<sub>JR-VV-004 &middot; junior &middot; Performance Review matrix &middot; Verification & Validation</sub>

- a) Static analysis and a design review **(correct)**
- b) Beta testing and a design review
- c) User acceptance testing and static analysis
- d) Beta testing and alpha testing

> Both compare an artefact to its specification without involving the end user need.

**10. Which metric best supports a release decision?**  
<sub>FL-5-005 &middot; junior &middot; ISTQB Foundation Level &middot; Testing metrics</sub>

- a) Residual risk expressed through coverage of high-risk areas and open defects by severity **(correct)**
- b) Total number of test cases written
- c) Number of hours spent testing
- d) Number of testers on the team

> A release decision is a risk decision. Effort and volume metrics describe the test team, not the product.

**11. ISTQB Glossary: "retesting" (confirmation testing) means:**  
<sub>GL-T-004 &middot; trainee &middot; ISTQB Glossary &middot; Testing types and subtypes</sub>

- a) Testing that runs test cases that failed the last time, to verify a fix **(correct)**
- b) Testing unchanged areas after a change
- c) Running the whole suite again
- d) Testing by a second tester

> Retesting targets the fix; regression testing targets the neighbourhood of the fix.

**12. Which tag pair is semantically correct for a clickable navigation link?**  
<sub>TR-HTML-003 &middot; trainee &middot; Performance Review matrix &middot; Webpage markup basics (HTML, CSS)</sub>

- a) <a href="..."> **(correct)**
- b) <div onclick="...">
- c) <span role="link">
- d) <button href="...">

> An anchor with href is focusable, keyboard-operable and announced as a link by screen readers, all for free. The others reimplement that badly or not at all.

**13. When forming a test team, the Test Manager should consider:**  
<sub>TM-011 &middot; senior &middot; ISTQB Test Manager &middot; Distribution of roles within a test team</sub>

- a) The mix of skills required by the risks, and the development of each individual **(correct)**
- b) Only technical skills
- c) Only availability
- d) Only cost

> CTAL-TM treats team composition as a risk mitigation decision, not just a staffing one.

**14. ISTQB Glossary: "test harness" means:**  
<sub>GL-J-005 &middot; junior &middot; ISTQB Glossary &middot; Levels of testing</sub>

- a) A test environment comprising stubs and drivers needed to execute a test **(correct)**
- b) The test management tool
- c) The defect tracker
- d) The CI server

> The harness is what makes a component executable outside its real surroundings.

**15. A risk-mitigation activity for a high-impact, low-likelihood risk is best described as:**  
<sub>TA-R-002 &middot; middle &middot; ISTQB Test Analyst &middot; Risks in testing</sub>

- a) Targeted deep testing of that specific area, even though it is rare **(correct)**
- b) Ignoring it because it is unlikely
- c) Uniform coverage across all areas
- d) Deferring it to production monitoring only

> Impact dominates when the consequence is unacceptable, which is why rare catastrophic paths still get dedicated tests.

**16. Which metric taken from the tracker is most misleading when used alone?**  
<sub>JR-DMS-004 &middot; junior &middot; Performance Review matrix &middot; Defect management system/Project management system</sub>

- a) Number of defects reported per tester **(correct)**
- b) Defect density per module
- c) Open defects by severity
- d) Average time to close

> Counting reports per tester rewards volume over value, and encourages splitting one defect into five tickets.

**17. In Docker, what is the difference between an image and a container?**  
<sub>MD-VIRT-003 &middot; middle &middot; Performance Review matrix &middot; Virtualization (vagrant/docker)</sub>

- a) An image is the immutable template; a container is a running instance of it **(correct)**
- b) They are the same
- c) A container is stored in a registry
- d) An image has a writable layer

> The writable layer belongs to the container. Data written there disappears with the container unless a volume is mounted.

**18. ISTQB Glossary: "service virtualization" enables:**  
<sub>GL-M-015 &middot; middle &middot; ISTQB Glossary &middot; Virtualization (vagrant/docker)</sub>

- a) Testing components that depend on unavailable or hard-to-access services **(correct)**
- b) Faster CI builds only
- c) Running tests on virtual machines
- d) Automated deployment

> It removes third-party availability from the critical path of a test environment.

**19. Accessibility testing should verify, at minimum:**  
<sub>TA-Q-005 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Keyboard operability, text alternatives and sufficient contrast **(correct)**
- b) Only screen reader support
- c) Only colour contrast
- d) Only font size

> WCAG covers perceivable, operable, understandable and robust. Testing only one of the four leaves the majority of barriers in place.

**20. Which is a prerequisite for a meaningful performance test?**  
<sub>MD-APERF-004 &middot; middle &middot; Performance Review matrix &middot; Automation of Performance/Load tests</sub>

- a) A production-like environment and realistic data volume **(correct)**
- b) A brand-new empty database
- c) A single test user
- d) Running from a developer laptop

> Performance is dominated by data volume, indexes, caches and infrastructure. An empty database measures nothing useful.

---

## Variant 30

**1. A system accepts amounts from 100 to 999. Using three-value boundary value analysis on the lower boundary, the values are:**  
<sub>FL-4-002 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) 99, 100, 101 **(correct)**
- b) 100, 101, 102
- c) 98, 99, 100
- d) 99, 100, 999

> The three-value approach takes the boundary and its neighbours on both sides.

**2. Contract testing between two services primarily protects against:**  
<sub>MD-API-004 &middot; middle &middot; Performance Review matrix &middot; API</sub>

- a) One service changing its interface in a way that breaks its consumers **(correct)**
- b) Slow response times
- c) Database corruption
- d) UI layout regressions

> Contract tests give the fast, targeted feedback that a full end-to-end suite gives slowly and flakily.

**3. A field accepts a date range where the end date must not precede the start date. The strongest test set covers:**  
<sub>TA-A-006 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) End before start, end equal to start, end after start, and both empty **(correct)**
- b) Only valid ranges
- c) Only the maximum range
- d) Only the minimum range

> The rule creates three relational partitions plus the missing-value case, and equal-to-start is the boundary most often implemented wrong.

**4. Which query counts orders per customer, including customers with none?**  
<sub>DP-J-002 &middot; junior &middot; Practice-test style &middot; Database basics (SQL/NoSQL)</sub>

- a) SELECT c.id, COUNT(o.id) FROM customers c LEFT JOIN orders o ON o.customer_id = c.id GROUP BY c.id **(correct)**
- b) SELECT c.id, COUNT(*) FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.id
- c) SELECT c.id, COUNT(o.id) FROM customers c, orders o GROUP BY c.id
- d) SELECT COUNT(*) FROM orders GROUP BY customer_id

> LEFT JOIN keeps the zero-order customers, and COUNT(o.id) counts only non-NULL rows, so they correctly show 0. COUNT(*) would show 1.

**5. A microservice architecture makes which testing activity noticeably harder?**  
<sub>JR-ARCH-003 &middot; junior &middot; Performance Review matrix &middot; Architecture and structure of web apps</sub>

- a) End-to-end testing across service boundaries **(correct)**
- b) Unit testing
- c) Static analysis
- d) Code review

> Independent deployability multiplies the number of version combinations, which is why contract testing became popular.

**6. What is regression testing?**  
<sub>TR-TYPE-002 &middot; trainee &middot; Performance Review matrix &middot; Testing types and subtypes</sub>

- a) Re-running tests to confirm that a change did not break existing behaviour **(correct)**
- b) Testing that a fixed defect is really fixed
- c) Testing the system without any documentation
- d) Testing only the newest feature

> Regression testing protects behaviour that already worked. Confirming a specific fix is retesting (confirmation testing), which is a different activity.

**7. A test manager must plan testing for a distributed team across three time zones. The most important planning decision is:**  
<sub>TM-010 &middot; senior &middot; ISTQB Test Manager &middot; Planning the testing process for the entire team</sub>

- a) Explicit handover, ownership and communication protocols **(correct)**
- b) Identical working hours for everyone
- c) A single shared test environment
- d) One common spoken language only

> Distributed testing fails on ambiguity of ownership far more often than on tooling.

**8. Confirmation testing is performed to:**  
<sub>FL-2-003 &middot; junior &middot; ISTQB Foundation Level &middot; Testing types and subtypes</sub>

- a) Verify that a previously failing defect has actually been fixed **(correct)**
- b) Check that unchanged areas still work
- c) Measure system performance
- d) Validate the requirements

> Confirmation testing (retesting) is about the fix. Regression testing is about the collateral damage the fix may have caused.

**9. Which is a legitimate reason to tailor a standard test process for a project?**  
<sub>TM-021 &middot; senior &middot; ISTQB Test Manager &middot; Writing a test plan</sub>

- a) The project risk profile, lifecycle and regulatory context differ **(correct)**
- b) The team prefers fewer documents
- c) The deadline is tight
- d) The customer has not asked for it

> Tailoring is expected; tailoring justified only by schedule pressure is scope reduction in disguise.

**10. Reading the implementation before designing tests is most defensible when:**  
<sub>SR-ALG-004 &middot; senior &middot; Performance Review matrix &middot; The basics of development and algorithms</sub>

- a) You are designing structural tests or hunting for a suspected defect class **(correct)**
- b) You want to save time on analysis
- c) The specification exists and is clear
- d) You are doing acceptance testing

> Code knowledge biases black-box design towards what was built. It is a deliberate tool for white-box work, not a default.

**11. You reported a defect yesterday. Today the build changed and the defect no longer reproduces, but nothing in the changelog relates to it. You should:**  
<sub>DP-T-006 &middot; trainee &middot; Practice-test style &middot; Defect life cycle</sub>

- a) Retest carefully, then note the finding in the ticket rather than closing it silently **(correct)**
- b) Close it as not reproducible
- c) Delete the ticket
- d) Raise its priority

> A defect that vanishes without a known fix usually means the trigger conditions changed, not that the defect is gone.

**12. The primary purpose of a defect management system is to:**  
<sub>JR-DMS-001 &middot; junior &middot; Performance Review matrix &middot; Defect management system/Project management system</sub>

- a) Track each defect from discovery to closure with a full history **(correct)**
- b) Measure tester productivity
- c) Replace direct communication
- d) Store test cases

> The tracker is the single source of truth for defect state. Using it as a productivity scoreboard reliably corrupts the data it holds.

**13. The principle "testing is context dependent" means:**  
<sub>JR-PRIN-005 &middot; junior &middot; Performance Review matrix &middot; Principles of testing</sub>

- a) A medical device and a marketing site require different testing approaches **(correct)**
- b) Every project must use the same process
- c) Context only matters for automation
- d) Only the customer decides the approach

> Risk profile, regulation, lifecycle and technology all change what good testing looks like. A single fixed process applied everywhere is a smell.

**14. Pairwise testing is justified by the empirical observation that:**  
<sub>TA-T-002 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Most combinatorial defects are triggered by interactions of only two parameters **(correct)**
- b) All defects are single-parameter
- c) Exhaustive combinations are cheap
- d) Parameters never interact

> Pairwise gives a large reduction in test count for a small loss of theoretical coverage - the classic risk-informed trade.

**15. You estimated 5 days; after 3 days you are 30% done. The professional action is:**  
<sub>DP-M-012 &middot; middle &middot; Practice-test style &middot; Estimation of time/cost of testing activities (epics, stories, bugs, testing types)</sub>

- a) Report a revised forecast of about 10 days now, with the reason **(correct)**
- b) Say nothing and try to catch up
- c) Report on day 5
- d) Reduce the scope silently

> At 30% in 60% of the budget, the trend is the forecast. Reporting it on day 3 leaves options; reporting it on day 5 leaves none.

**16. While executing a ready test case, the actual result differs from the expected result, but you believe the expected result is outdated. You should:**  
<sub>TR-EXEC-001 &middot; trainee &middot; Performance Review matrix &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) Mark the case Failed and raise the question with the analyst or product owner **(correct)**
- b) Silently pass the case
- c) Edit the expected result yourself and pass it
- d) Skip the case

> Never quietly change the oracle. Record what you observed, then get the requirement clarified; if it changed, the case is updated deliberately and traceably.

**17. Which field is NOT part of a well-formed bug report?**  
<sub>TR-ART-003 &middot; trainee &middot; Performance Review matrix &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) Steps to reproduce
- b) Actual result
- c) Expected result
- d) The name of the developer who should fix it **(correct)**

> Assignment is a workflow decision made in the tracker, not a descriptive attribute of the defect. Naming a developer in the report itself is presumptuous and ages badly.

**18. A monthly test report for a whole team should be built around:**  
<sub>SR-TR-001 &middot; senior &middot; Performance Review matrix &middot; Creating reports about your team's completed work during a month/sprint/release</sub>

- a) Product quality trends, risk and impediments over the period **(correct)**
- b) Individual tester output
- c) The number of meetings
- d) The list of executed cases

> The audience is deciding about the product and the process, not evaluating individuals.

**19. Automated API tests should clean up the data they create because:**  
<sub>MD-AAPI-003 &middot; middle &middot; Performance Review matrix &middot; Automation of API tests</sub>

- a) Accumulated state makes later runs non-deterministic **(correct)**
- b) Storage is expensive
- c) The API requires it
- d) It speeds up the tests

> Setup and teardown per test are what make a suite runnable a thousand times with the same result.

**20. Appium is able to drive both Android and iOS because it:**  
<sub>MD-AMOB-001 &middot; middle &middot; Performance Review matrix &middot; Automation of Mobile UI (functional) tests</sub>

- a) Speaks the WebDriver protocol on top of each platform native automation framework **(correct)**
- b) Recompiles the application
- c) Requires the source code
- d) Only works on emulators

> Appium wraps UiAutomator2/Espresso on Android and XCUITest on iOS behind one client API.

---

## Variant 31

**1. A UI test fails once in every ten runs with no product change. The correct handling is:**  
<sub>MD-AWEB-003 &middot; middle &middot; Performance Review matrix &middot; Automation of WEB UI (functional) tests</sub>

- a) Diagnose the race condition and fix it, quarantining the test meanwhile **(correct)**
- b) Add a retry so it goes green
- c) Increase every sleep
- d) Delete the test

> Blanket retries hide real intermittent product defects, which are exactly the ones users report and nobody can reproduce.

**2. Exit criteria (definition of done for a test level) exist to:**  
<sub>FL-5-004 &middot; junior &middot; ISTQB Foundation Level &middot; Testing metrics</sub>

- a) Define objectively when enough testing has been done **(correct)**
- b) Set the start date of testing
- c) Determine who executes the tests
- d) Prioritise defects

> Without agreed exit criteria, "are we done testing?" becomes a negotiation under deadline pressure rather than a check against a rule.

**3. A system has 4 boolean configuration flags and 3 user roles. Full combinatorial coverage requires 48 cases. Pairwise would need roughly:**  
<sub>TA-T-009 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Fewer than 15 **(correct)**
- b) Exactly 48
- c) Exactly 24
- d) More than 48

> Pairwise typically collapses such spaces by an order of magnitude while covering every pair of values at least once.

**4. A requirement says "the report must load quickly for all users". The best tester response is:**  
<sub>JR-REQ-004 &middot; junior &middot; Performance Review matrix &middot; Requirements testing</sub>

- a) Ask for a measurable target: which percentile, which data volume, which network **(correct)**
- b) Accept it and test subjectively
- c) Reject the requirement outright
- d) Write a test case that says "loads quickly"

> Turning a vague quality statement into a measurable one is requirements testing in its most practical form.

**5. A defect burndown that flattens while new defects keep arriving indicates:**  
<sub>TM-007 &middot; senior &middot; ISTQB Test Manager &middot; Testing metrics</sub>

- a) Discovery is outpacing fixing, so the release date is at risk **(correct)**
- b) Testing is complete
- c) The product is stable
- d) The metric should be discarded

> Arrival and closure rates must be read together; either alone supports the wrong conclusion.

**6. Automation coverage rose from 40% to 80%, but escaped defects did not fall. The most likely explanation is:**  
<sub>DP-M-007 &middot; middle &middot; Practice-test style &middot; Testing metrics</sub>

- a) The new tests cover low-risk code or assert weakly **(correct)**
- b) The metric is wrong
- c) Escaped defects always lag by a year
- d) Manual testing was reduced too little

> Coverage that does not target where defects escape adds runtime cost without adding detection.

**7. A discount engine: orders over 500 get 10%, loyalty members get an extra 5%, and expired cards are rejected. Which technique gives the most systematic coverage?**  
<sub>TA-A-001 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) A decision table over the three conditions **(correct)**
- b) Boundary value analysis alone
- c) State transition testing
- d) Exploratory testing alone

> Three independent conditions producing different actions is the textbook shape for a decision table; BVA then covers the 500 boundary inside it.

**8. Which of these is a form of acceptance testing?**  
<sub>JR-LVL-004 &middot; junior &middot; Performance Review matrix &middot; Levels of testing</sub>

- a) Operational acceptance testing (backup, restore, disaster recovery) **(correct)**
- b) Component integration testing
- c) Unit testing
- d) Static analysis

> ISTQB lists user acceptance, operational acceptance, contractual/regulatory acceptance, and alpha/beta testing as forms of acceptance testing.

**9. Device fragmentation is a bigger testing problem on Android than on iOS mainly because:**  
<sub>TR-MOB-005 &middot; trainee &middot; Performance Review matrix &middot; Mobile technologies and platforms</sub>

- a) Many manufacturers ship many OS versions, screen sizes and custom skins **(correct)**
- b) Android has no emulators
- c) iOS apps are never updated
- d) Android does not support automation

> The combination matrix on Android is far larger, which is why device-cloud testing and a prioritised device list matter so much.

**10. A key characteristic of Scrum is:**  
<sub>JR-SDLC-002 &middot; junior &middot; Performance Review matrix &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) Fixed-length iterations delivering a potentially shippable increment **(correct)**
- b) A single test phase after all development
- c) No requirements documentation of any kind
- d) A dedicated QA sign-off gate between phases

> The sprint boundary and the increment are the two structural commitments of Scrum. Testing happens inside the sprint, not after it.

**11. Equivalence partitioning assumes that:**  
<sub>TR-TDT-002 &middot; trainee &middot; Performance Review matrix &middot; Test design techniques</sub>

- a) All values in a partition are processed the same way, so one value represents them all **(correct)**
- b) Every possible input must be tested
- c) Only invalid inputs need to be tested
- d) Partitions must always contain exactly ten values

> The technique reduces test count by exploiting the assumption that a partition behaves uniformly. Boundary value analysis then attacks the edges where that assumption breaks.

**12. A senior tester proposes automating a manual suite. The strongest justification is:**  
<sub>SR-OPT-003 &middot; senior &middot; Performance Review matrix &middot; Optimization of testing process</sub>

- a) A calculated payback based on run frequency, stability and maintenance cost **(correct)**
- b) Automation is a best practice
- c) Manual testing is boring
- d) Competitors automate

> Automation that runs twice a year rarely repays its maintenance. The frequency and stability numbers make or break the case.

**13. A tester finds no defects in a component. What can be concluded?**  
<sub>FL-1-002 &middot; junior &middot; ISTQB Foundation Level &middot; Principles of testing</sub>

- a) Nothing about the absence of defects in that component **(correct)**
- b) The component is defect-free
- c) The tests were badly designed
- d) The component is ready for production

> Principle 2: testing shows the presence of defects, never their absence. The result is one piece of information, not a verdict on quality.

**14. Which browser devtools tab would you open first to check whether the front end actually sent a request and what came back?**  
<sub>TR-BROW-005 &middot; trainee &middot; Performance Review matrix &middot; Web browser architecture (cookies, localstorage, etc.)</sub>

- a) Network **(correct)**
- b) Elements
- c) Console
- d) Sources

> The Network tab shows the request, its headers, payload, status and timing - the fastest way to decide whether a defect is front-end or back-end.

**15. The main difference between a container and a virtual machine is that a container:**  
<sub>MD-VIRT-001 &middot; middle &middot; Performance Review matrix &middot; Virtualization (vagrant/docker)</sub>

- a) Shares the host kernel instead of running a full guest OS **(correct)**
- b) Cannot be networked
- c) Is always slower
- d) Cannot run databases

> Sharing the kernel is what makes containers start in milliseconds and ship in megabytes rather than gigabytes.

**16. A request without a token returns 200 and the requested data. This is:**  
<sub>DP-J-012 &middot; junior &middot; Practice-test style &middot; REST API and HTTP/HTTPS protocols</sub>

- a) A critical security defect - broken access control **(correct)**
- b) Correct if the endpoint is fast
- c) A minor documentation issue
- d) Expected for GET requests

> Broken access control is consistently the top item in the OWASP Top 10, and it is reachable by ordinary functional testing.

**17. An element is visible but a click does nothing. Which is the most likely front-end cause to check first?**  
<sub>DP-T-007 &middot; trainee &middot; Practice-test style &middot; Webpage markup basics (HTML, CSS)</sub>

- a) Another element overlaps it and receives the click **(correct)**
- b) The CSS colour is wrong
- c) The font failed to load
- d) The page title is missing

> A transparent overlay or a mispositioned modal backdrop is the classic cause, and devtools element inspection confirms it in seconds.

**18. Which statement about risk-based testing is FALSE?**  
<sub>TM-026 &middot; senior &middot; ISTQB Test Manager &middot; Risk management in testing</sub>

- a) It guarantees that all high-risk defects will be found **(correct)**
- b) It allocates effort proportionally to risk
- c) It supports release decisions
- d) It requires periodic reassessment

> It improves the odds and makes the trade explicit; it does not remove the possibility of an escaped defect.

**19. Cone-of-uncertainty reasoning implies that an estimate given at project start should be:**  
<sub>SR-FC-004 &middot; senior &middot; Performance Review matrix &middot; Estimates & forecasts</sub>

- a) Expressed as a wide range and re-forecast as information accrues **(correct)**
- b) Given as a single committed number
- c) Refused
- d) Doubled as a safety margin

> A single number at the widest point of the cone is a commitment made with the least information anyone will ever have.

**20. The most useful output of a risk workshop for a tester is:**  
<sub>MD-RISK-003 &middot; middle &middot; Performance Review matrix &middot; Risks in testing</sub>

- a) A prioritised list of risk areas that determines depth of coverage **(correct)**
- b) A longer test plan
- c) A list of everyone who attended
- d) A fixed number of test cases per module

> Risk priority is what converts limited time into a defensible coverage decision.

---

## Variant 32

**1. A reactive test strategy is appropriate when:**  
<sub>TM-003 &middot; senior &middot; ISTQB Test Manager &middot; Writing a test plan</sub>

- a) The test basis is poor or unavailable and feedback must be fast **(correct)**
- b) The system is safety critical with a full specification
- c) Regulatory evidence is required
- d) The product is stable and unchanged

> Reactive strategies (exploratory, defect-based) respond to the system as delivered rather than to a document that does not exist.

**2. A test manager must plan testing for a distributed team across three time zones. The most important planning decision is:**  
<sub>TM-010 &middot; senior &middot; ISTQB Test Manager &middot; Planning the testing process for the entire team</sub>

- a) Explicit handover, ownership and communication protocols **(correct)**
- b) Identical working hours for everyone
- c) A single shared test environment
- d) One common spoken language only

> Distributed testing fails on ambiguity of ownership far more often than on tooling.

**3. You need the 20 most frequent error codes from a 4 GB log. The right approach is:**  
<sub>DP-M-004 &middot; middle &middot; Practice-test style &middot; Unix basics</sub>

- a) grep the pattern, cut the field, then sort | uniq -c | sort -rn | head -20 **(correct)**
- b) Open the file in an editor
- c) Copy it to a spreadsheet
- d) Read it with cat

> The standard pipeline streams the file instead of loading it, which is the difference between two seconds and a crashed editor.

**4. A UI shows a total of 100.00 but the database stores 99.995. The most likely defect is:**  
<sub>DP-J-010 &middot; junior &middot; Practice-test style &middot; Database basics (SQL/NoSQL)</sub>

- a) Rounding or a floating-point type used for money **(correct)**
- b) A UI caching problem
- c) A network error
- d) A permissions issue

> Money in a binary floating-point type is a recurring defect class; decimal or integer minor units is the fix.

**5. Test reports should be issued:**  
<sub>MD-CREP-004 &middot; middle &middot; Performance Review matrix &middot; Creating test reports which include the evaluation of the product quality</sub>

- a) On a regular agreed cadence and at every release decision point **(correct)**
- b) Only when something goes wrong
- c) Only at the end of the project
- d) Only when the customer asks

> Predictable reporting builds trust; reports that appear only with bad news train the reader to dread them.

**6. A good measure that onboarding worked is:**  
<sub>MD-ONB-003 &middot; middle &middot; Performance Review matrix &middot; Onboarding and training team members</sub>

- a) The new tester completes representative tasks with decreasing supervision **(correct)**
- b) The number of documents they read
- c) The number of meetings attended
- d) How quickly they stopped asking questions

> Questions stopping can mean understanding or disengagement. Independent delivery on real work distinguishes the two.

**7. A defect cannot be reproduced by the developer. The most useful next step for the tester is to:**  
<sub>TR-LIFE-005 &middot; trainee &middot; Performance Review matrix &middot; Defect life cycle</sub>

- a) Add environment details, build number, logs and a video to the report **(correct)**
- b) Immediately close the defect
- c) Raise its severity
- d) Reassign it to a different developer

> Non-reproducibility is almost always an information gap. Supply the missing context before escalating.

**8. Which test level is normally executed by developers on their own code?**  
<sub>JR-LVL-002 &middot; junior &middot; Performance Review matrix &middot; Levels of testing</sub>

- a) Component (unit) testing **(correct)**
- b) System testing
- c) Acceptance testing
- d) Operational acceptance testing

> Unit tests live with the code, run in the pipeline and are maintained by the people who change the code.

**9. In risk-based testing, high-risk areas should be:**  
<sub>FL-5-006 &middot; junior &middot; ISTQB Foundation Level &middot; Risks in testing</sub>

- a) Tested earlier and more deeply **(correct)**
- b) Tested last, when the build is stable
- c) Tested only if time permits
- d) Excluded to save effort

> Testing early on the highest risks maximises the information gained per unit of time, and leaves room to react.

**10. Inheritance in a Page Object framework is most commonly used to:**  
<sub>JR-OOP-004 &middot; junior &middot; Performance Review matrix &middot; OOP principles</sub>

- a) Share common page behaviour in a base page class **(correct)**
- b) Duplicate locators across pages
- c) Avoid writing assertions
- d) Replace the test runner

> A BasePage typically carries the driver, waits and navigation helpers, and every concrete page extends it.

**11. The main benefit of the Test Analyst participating in reviews early is:**  
<sub>TA-V-003 &middot; middle &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) Defects are prevented rather than detected later **(correct)**
- b) It fills time before the build
- c) It reduces documentation
- d) It replaces test design

> Prevention is orders of magnitude cheaper than detection, and it is the highest-leverage use of an analyst time.

**12. A Test Analyst evaluating a test data preparation tool should weigh most heavily:**  
<sub>TA-X-001 &middot; middle &middot; ISTQB Test Analyst &middot; Automation of API tests</sub>

- a) Whether it can produce realistic, referentially consistent data at volume **(correct)**
- b) Its user interface colours
- c) Its licence popularity
- d) Whether it is open source

> Data that violates referential integrity produces test failures that teach the team to ignore failures.

**13. A high false-positive rate in a static analysis tool is dangerous because:**  
<sub>SR-SA-003 &middot; senior &middot; Performance Review matrix &middot; Ability to use tools for static code analysis</sub>

- a) Developers start suppressing findings wholesale, including the true ones **(correct)**
- b) The build gets slower
- c) It uses more licences
- d) It duplicates code review

> Tuning the ruleset down to a trusted core is more valuable than enabling every rule available.

**14. ISTQB Glossary: "priority" of a defect refers to:**  
<sub>GL-T-011 &middot; trainee &middot; ISTQB Glossary &middot; Severity vs Priority</sub>

- a) The level of business importance assigned to fixing it **(correct)**
- b) The degree of impact on the system
- c) How often it occurs
- d) How hard it is to fix

> Severity is impact; priority is urgency. The two are set by different people for different reasons.

**15. A test scenario differs from a test case mainly in that it:**  
<sub>TR-ART-004 &middot; trainee &middot; Performance Review matrix &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) Describes a user flow at a higher level, without exhaustive step detail **(correct)**
- b) Is always automated
- c) Contains no expected result at all
- d) Can only be executed once

> A test scenario captures an end-to-end flow ("user registers and completes a first purchase"). Test cases underneath it spell out the concrete steps.

**16. Who normally has the final say on a defect priority?**  
<sub>TR-SEV-004 &middot; trainee &middot; Performance Review matrix &middot; Severity vs Priority</sub>

- a) The product owner or project manager **(correct)**
- b) The tester who found it
- c) The developer who will fix it
- d) The customer support agent

> Priority is a scheduling and business decision. The tester proposes it; the person who owns the backlog decides it.

**17. A prospect asks for something your team cannot deliver well. You should:**  
<sub>SR-PRE-003 &middot; senior &middot; Performance Review matrix &middot; Participation in presale activities (including communication with a customer)</sub>

- a) Say so plainly and propose the closest thing you can deliver well **(correct)**
- b) Agree and figure it out later
- c) Refer them to a competitor immediately
- d) Ignore the question

> Overcommitting in presale is repaid with interest during delivery, usually by the people who were not in the room.

**18. Your estimate is exceeded halfway through the task. You should:**  
<sub>JR-EST-004 &middot; junior &middot; Performance Review matrix &middot; Approximate estimation of time/cost to test a specific task/story</sub>

- a) Flag it immediately with the current status and a revised estimate **(correct)**
- b) Work overtime silently
- c) Reduce test coverage without telling anyone
- d) Wait until the deadline to report it

> Overruns are only a problem when they are a surprise. Early escalation preserves everyone options.

**19. Which of the following is NOT a valid reason to use white-box techniques?**  
<sub>FL-4-012 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) They validate that the software meets user needs **(correct)**
- b) They reveal untested code
- c) They provide objective coverage measures
- d) They can be automated in the pipeline

> Structure-based techniques say nothing about whether the implemented behaviour is the behaviour the user wanted.

**20. Which chmod value gives the owner read/write/execute and everyone else read/execute?**  
<sub>MD-UNIX-003 &middot; middle &middot; Performance Review matrix &middot; Unix basics</sub>

- a) 755 **(correct)**
- b) 777
- c) 644
- d) 700

> Digits are owner/group/other; 7 = rwx, 5 = r-x. 777 grants write to everyone and is almost always a misconfiguration.

---

## Variant 33

**1. A story is demoed and works, but the team has not written the automated tests its DoD requires. The story is:**  
<sub>JR-AC-004 &middot; junior &middot; Performance Review matrix &middot; Acceptance criteria/Definition of Done</sub>

- a) Not done **(correct)**
- b) Done, since it works
- c) Done, if the customer approves
- d) Done, but with a follow-up ticket

> The DoD is binary and team-wide. Allowing exceptions turns it into a suggestion, and the debt accumulates silently.

**2. Defect density is normally expressed as:**  
<sub>MD-MET-003 &middot; middle &middot; Performance Review matrix &middot; Testing metrics</sub>

- a) Defects per size unit, such as per KLOC or per function point **(correct)**
- b) Defects per tester
- c) Defects per sprint
- d) Defects per environment

> Normalising by size lets you compare modules of different sizes and spot the clusters worth extra attention.

**3. Metrics-based estimation is more defensible than expert-based estimation when:**  
<sub>TM-009 &middot; senior &middot; ISTQB Test Manager &middot; Estimation of time/cost of testing activities (full project, team tasks)</sub>

- a) The organisation has reliable historical data from comparable projects **(correct)**
- b) The project is entirely new in domain and technology
- c) The team has just been formed
- d) No data has been collected

> Without history, metrics-based estimation projects a number from nothing, which is expert judgement with false precision.

**4. A field accepts integers from 1 to 100. Using boundary value analysis with the two-value approach, which set is correct?**  
<sub>TR-TDT-001 &middot; trainee &middot; Performance Review matrix &middot; Test design techniques</sub>

- a) 0, 1, 100, 101 **(correct)**
- b) 1, 50, 100
- c) 0, 50, 101
- d) 1, 2, 99, 100

> The two-value approach takes each boundary and its nearest neighbour outside the partition: 0 and 1 at the lower edge, 100 and 101 at the upper edge.

**5. Why should environment details (build, OS, browser, device) always be in the report?**  
<sub>TR-REP-004 &middot; trainee &middot; Performance Review matrix &middot; Creating defect reports (in English)</sub>

- a) Many defects only reproduce on a specific combination **(correct)**
- b) To make the report longer
- c) Because the tracker requires it
- d) To prove the tester did the work

> Environment is often the difference between "cannot reproduce" and a fix in an hour.

**6. Which suite belongs in the fastest CI stage, triggered on every commit?**  
<sub>JR-CI-003 &middot; junior &middot; Performance Review matrix &middot; Continuous integration systems</sub>

- a) Unit tests and a short smoke suite **(correct)**
- b) The full regression suite
- c) Manual exploratory sessions
- d) Full load tests

> The first stage exists to fail fast. Long suites run later, on a schedule or before release.

**7. You must test an endpoint that charges a card. In a shared test environment you should:**  
<sub>DP-M-014 &middot; middle &middot; Practice-test style &middot; Automation of API tests</sub>

- a) Use the provider sandbox with test cards and assert on the sandbox state **(correct)**
- b) Use a real card with a small amount
- c) Skip the test
- d) Mock the whole endpoint and assert nothing

> Sandboxes exist precisely so that payment paths can be covered end to end without moving money.

**8. In a formal review, who leads the meeting and mediates between participants?**  
<sub>FL-3-003 &middot; junior &middot; ISTQB Foundation Level &middot; Requirements testing</sub>

- a) The moderator (facilitator) **(correct)**
- b) The author
- c) The scribe
- d) The manager

> The author must not moderate their own review; the moderator keeps it about the work product rather than the person.

**9. Usability testing that measures whether a user can complete a task at all is evaluating:**  
<sub>TA-Q-002 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Effectiveness **(correct)**
- b) Efficiency
- c) Satisfaction
- d) Learnability

> Effectiveness = can they finish; efficiency = at what cost in time and effort; satisfaction = how it felt.

**10. Which JSON snippet is syntactically invalid?**  
<sub>MD-JSON-002 &middot; middle &middot; Performance Review matrix &middot; JSON</sub>

- a) {"a": 1,} **(correct)**
- b) {"a": 1}
- c) {"a": [1, 2]}
- d) {"a": {"b": null}}

> JSON forbids a trailing comma. Many parsers are lenient, which is exactly why the defect only shows up on one of them.

**11. A new Test Manager inherits a team with no documented process. The best first move is:**  
<sub>TM-025 &middot; senior &middot; ISTQB Test Manager &middot; Onboarding and training team members</sub>

- a) Observe and baseline the current way of working before changing it **(correct)**
- b) Introduce a full standard process immediately
- c) Replace the tooling
- d) Reassign every role

> Undocumented does not mean absent. Changing an unmeasured process makes any later improvement unprovable.

**12. A JSON Schema is used in API testing to:**  
<sub>MD-JSON-003 &middot; middle &middot; Performance Review matrix &middot; JSON</sub>

- a) Validate the structure and types of a response automatically **(correct)**
- b) Compress the payload
- c) Encrypt sensitive fields
- d) Generate the UI

> Schema validation catches whole classes of contract regressions with one assertion instead of dozens of field-by-field checks.

**13. Before optimising a testing process you should:**  
<sub>SR-OPT-002 &middot; senior &middot; Performance Review matrix &middot; Optimization of testing process</sub>

- a) Measure the current baseline so improvement can be demonstrated **(correct)**
- b) Change the tooling
- c) Reorganise the team
- d) Increase the number of test cases

> Without a baseline, an "improvement" is an opinion, and it cannot be defended when the next deadline arrives.

**14. Sanity testing differs from smoke testing in that it:**  
<sub>TR-TYPE-005 &middot; trainee &middot; Performance Review matrix &middot; Testing types and subtypes</sub>

- a) Focuses narrowly on the specific area that was changed **(correct)**
- b) Always covers the entire application
- c) Is always automated
- d) Is performed only in production

> Smoke is broad and shallow across the build; sanity is narrow and deeper, aimed at the area a change touched.

**15. In a two-week sprint, when should testing of a story start?**  
<sub>DP-J-011 &middot; junior &middot; Practice-test style &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) As soon as the story is testable, in parallel with development **(correct)**
- b) In the last two days
- c) After the sprint review
- d) Only when all stories are done

> Batching testing to the sprint end recreates a waterfall inside the sprint and guarantees carry-over.

**16. A test approach describes:**  
<sub>FL-5-008 &middot; junior &middot; ISTQB Foundation Level &middot; Writing a test plan</sub>

- a) How testing will be implemented for a particular product or project **(correct)**
- b) The exact steps of every test case
- c) The defect workflow in the tracker
- d) The build pipeline configuration

> The approach tailors the strategy to the context: which levels, which techniques, which automation, which entry and exit criteria.

**17. The regression suite takes 8 hours and blocks daily releases. The best first optimisation is:**  
<sub>SR-OPT-001 &middot; senior &middot; Performance Review matrix &middot; Optimization of testing process</sub>

- a) Identify and parallelise or prune the slowest, lowest-value tests using risk and history **(correct)**
- b) Delete half the tests
- c) Run it weekly instead
- d) Add more testers

> Measure first: suite time is usually dominated by a small number of tests, and value is usually concentrated elsewhere.

**18. A page shows old content after a deployment. Which check comes first?**  
<sub>DP-T-013 &middot; trainee &middot; Practice-test style &middot; Web browser architecture (cookies, localstorage, etc.)</sub>

- a) Hard refresh and inspect whether assets are served from cache **(correct)**
- b) Reinstall the browser
- c) Report a back-end defect
- d) Clear the database

> Cache is the overwhelmingly likely cause, and it takes ten seconds to rule out.

**19. In session-based test management, a charter defines:**  
<sub>TA-T-008 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) The mission and scope of a timeboxed exploratory session **(correct)**
- b) The exact steps to execute
- c) The expected results in advance
- d) The defect severity scale

> The charter makes exploratory testing plannable and reportable without turning it into scripted testing.

**20. Reviewing requirements before code exists is valuable mainly because:**  
<sub>JR-REQ-003 &middot; junior &middot; Performance Review matrix &middot; Requirements testing</sub>

- a) A defect removed there costs a fraction of the same defect in production **(correct)**
- b) It fills tester time before the build arrives
- c) It is required by ISO
- d) It replaces system testing

> Static testing of requirements is the highest-leverage activity available to a tester, and it needs no environment.

---

## Variant 34

**1. In a Page Object framework, putting an assertion inside a page class is usually a mistake because:**  
<sub>DP-J-014 &middot; junior &middot; Practice-test style &middot; OOP principles</sub>

- a) Pages should describe capability; verdicts belong in the tests **(correct)**
- b) Assertions are slow
- c) It breaks inheritance
- d) It prevents parallel execution

> Keeping verdicts in the test keeps the page reusable by tests with different expectations.

**2. ISTQB Glossary: a "test condition" is:**  
<sub>GL-T-006 &middot; trainee &middot; ISTQB Glossary &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) A testable aspect of a component or system identified as a basis for testing **(correct)**
- b) A precondition of a test case
- c) The environment configuration
- d) A defect status

> Test conditions are the output of test analysis; test cases are the output of test design.

**3. Which HTTP status code family indicates a client-side error?**  
<sub>JR-HTTP-001 &middot; junior &middot; Performance Review matrix &middot; REST API and HTTP/HTTPS protocols</sub>

- a) 4xx **(correct)**
- b) 2xx
- c) 3xx
- d) 5xx

> 4xx means the request was wrong (bad syntax, unauthorised, not found). 5xx means the server failed while handling a valid request.

**4. Which storage mechanism is automatically attached to every matching HTTP request?**  
<sub>TR-BROW-002 &middot; trainee &middot; Performance Review matrix &middot; Web browser architecture (cookies, localstorage, etc.)</sub>

- a) Cookies **(correct)**
- b) localStorage
- c) sessionStorage
- d) IndexedDB

> Only cookies are transmitted automatically by the browser, which is exactly why they carry session tokens and why CSRF exists.

**5. A numeric id is returned as 9007199254740993 and the JavaScript client shows 9007199254740992. The cause is:**  
<sub>MD-JSON-005 &middot; middle &middot; Performance Review matrix &middot; JSON</sub>

- a) JavaScript numbers lose precision above 2^53-1 **(correct)**
- b) The API is broken
- c) JSON cannot hold large numbers
- d) The client rounded on purpose

> This is why large ids are transported as strings. It is a genuine, reproducible defect worth reporting against the API contract.

**6. Trunk-based development affects testing mainly because it:**  
<sub>SR-VCS-003 &middot; senior &middot; Performance Review matrix &middot; VCS</sub>

- a) Requires fast, reliable automated checks on every small merge to main **(correct)**
- b) Removes the need for regression testing
- c) Eliminates merge conflicts
- d) Requires long-lived feature branches

> The whole model depends on a pipeline trustworthy enough to gate main. Without it, trunk-based development just breaks main faster.

**7. Why are containers valuable for test environments?**  
<sub>MD-VIRT-002 &middot; middle &middot; Performance Review matrix &middot; Virtualization (vagrant/docker)</sub>

- a) They make the environment reproducible and disposable **(correct)**
- b) They remove the need for test data
- c) They guarantee no defects
- d) They replace CI

> A disposable environment eliminates the "it passed because of yesterday state" class of false results.

**8. You read that a technique guarantees "100% bug-free software". The correct professional reaction is:**  
<sub>TR-NEWS-005 &middot; trainee &middot; Performance Review matrix &middot; Ability to keep up with news and trends</sub>

- a) Treat the claim as false: exhaustive testing is impossible **(correct)**
- b) Adopt it immediately
- c) Forward it to the customer
- d) Add it to the test plan as a goal

> One of the seven testing principles states that exhaustive testing is impossible, so absence of defects can never be proven by testing.

**9. A retrospective produces the same action items every sprint. This most likely means:**  
<sub>TM-015 &middot; senior &middot; ISTQB Test Manager &middot; Optimization of testing process</sub>

- a) Actions are not being owned, sized and tracked to completion **(correct)**
- b) The team lacks ideas
- c) Retrospectives are unnecessary
- d) The process is already optimal

> An action without an owner and a due date is a wish. Repetition is the symptom.

**10. Which activity is validation rather than verification?**  
<sub>JR-VV-002 &middot; junior &middot; Performance Review matrix &middot; Verification & Validation</sub>

- a) User acceptance testing with real users on real scenarios **(correct)**
- b) A requirements review
- c) A code inspection
- d) Checking a design document against the spec

> Validation involves the actual need and the actual user. Reviews and inspections compare an artefact against another artefact, which is verification.

**11. When estimating testing for a whole project, which is most often underestimated?**  
<sub>MD-PROJ-001 &middot; middle &middot; Performance Review matrix &middot; Estimation of time/cost of testing activities (full project, team tasks)</sub>

- a) Environment setup, test data and communication overhead **(correct)**
- b) Test case execution
- c) Test case writing
- d) Defect reporting

> Execution is visible and easy to count; the surrounding work is invisible and dominates the variance.

**12. Which defect class is static analysis genuinely good at finding?**  
<sub>SR-SA-002 &middot; senior &middot; Performance Review matrix &middot; Ability to use tools for static code analysis</sub>

- a) Null dereferences, resource leaks and injection-prone string concatenation **(correct)**
- b) Wrong business rules
- c) Poor usability
- d) Missing requirements

> Static tools reason about structure and data flow. They have no oracle for intent.

**13. A test manager must plan testing for a distributed team across three time zones. The most important planning decision is:**  
<sub>TM-010 &middot; senior &middot; ISTQB Test Manager &middot; Planning the testing process for the entire team</sub>

- a) Explicit handover, ownership and communication protocols **(correct)**
- b) Identical working hours for everyone
- c) A single shared test environment
- d) One common spoken language only

> Distributed testing fails on ambiguity of ownership far more often than on tooling.

**14. Test execution results should be recorded:**  
<sub>TR-EXEC-005 &middot; trainee &middot; Performance Review matrix &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) As they happen, per case, with evidence for failures **(correct)**
- b) At the end of the sprint from memory
- c) Only when everything passes
- d) Only for automated tests

> Results recorded later are results reconstructed, and reconstruction loses exactly the details that make a failure diagnosable.

**15. Which SQL statement returns customers who have never placed an order?**  
<sub>JR-DB-001 &middot; junior &middot; Performance Review matrix &middot; Database basics (SQL/NoSQL)</sub>

- a) SELECT c.* FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL **(correct)**
- b) SELECT c.* FROM customers c INNER JOIN orders o ON o.customer_id = c.id
- c) SELECT c.* FROM customers c, orders o WHERE c.id = o.customer_id
- d) SELECT c.* FROM customers c RIGHT JOIN orders o ON o.customer_id = c.id

> A LEFT JOIN keeps every customer; filtering for a NULL on the right-hand side isolates those with no match. The other three all require a matching order.

**16. A false positive in testing is:**  
<sub>TA-D-002 &middot; middle &middot; ISTQB Test Analyst &middot; Defect management system/Project management system</sub>

- a) A reported defect that turns out not to be a defect in the product **(correct)**
- b) A defect the tool failed to find
- c) A defect fixed twice
- d) A defect in the test environment

> A high false-positive rate erodes developer trust in the test suite faster than almost anything else.

**17. Which factor most influences the level of detail in test conditions?**  
<sub>TA-P-002 &middot; middle &middot; ISTQB Test Analyst &middot; Planning of testing activities for specific tasks</sub>

- a) The level of risk and the intended reuse of the tests **(correct)**
- b) The number of testers
- c) The tool licence
- d) The sprint length

> High-risk, reusable and audited tests justify detail. Low-risk one-off exploration does not.

**18. ISTQB Glossary: "portability" is the degree to which a system:**  
<sub>GL-M-011 &middot; middle &middot; ISTQB Glossary &middot; Testing types and subtypes</sub>

- a) Can be transferred from one environment to another **(correct)**
- b) Recovers from faults
- c) Protects data
- d) Uses resources efficiently

> Adaptability, installability and replaceability are its sub-characteristics.

**19. The MOST important success factor for a review is that:**  
<sub>FL-3-005 &middot; junior &middot; ISTQB Foundation Level &middot; Requirements testing</sub>

- a) Objectives are clear and participants are prepared **(correct)**
- b) The meeting is short
- c) The author defends the work product
- d) Managers attend

> Unprepared participants turn a review into a reading session, which finds the defects a proof-reader would find and no others.

**20. Which principle explains why regression suites must be reviewed and updated?**  
<sub>FL-1-005 &middot; junior &middot; ISTQB Foundation Level &middot; Principles of testing</sub>

- a) Tests wear out **(correct)**
- b) Defects cluster together
- c) Testing is context dependent
- d) Early testing saves time and money

> The pesticide paradox: unchanged tests stop finding new defects, so the suite must be revised and extended over time.

---

## Variant 35

**1. Escaped defects are concentrated in integrations with third-party services. The most effective analyst response is:**  
<sub>TA-A-004 &middot; middle &middot; ISTQB Test Analyst &middot; Analysis of testing process</sub>

- a) Add contract and negative tests around those integrations and their failure modes **(correct)**
- b) Add more UI end-to-end tests
- c) Increase the size of the regression suite
- d) Increase exploratory time uniformly

> Target the mitigation at the observed cluster. Uniform increases spend effort where defects are not.

**2. Collaboration-based test approaches such as ATDD produce:**  
<sub>FL-4-009 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) Test cases derived collaboratively from user stories and acceptance criteria **(correct)**
- b) Only automated unit tests
- c) Only performance tests
- d) Only exploratory charters

> Acceptance test-driven development turns the three-amigos conversation into concrete acceptance tests before the code is written.

**3. Encapsulation means:**  
<sub>JR-OOP-001 &middot; junior &middot; Performance Review matrix &middot; OOP principles</sub>

- a) Internal state is hidden and accessed only through a defined interface **(correct)**
- b) One class inherits from another
- c) The same method behaves differently per type
- d) Details are hidden behind an abstract concept

> Encapsulation is about controlled access to state. Inheritance, polymorphism and abstraction are the other three pillars.

**4. The main purpose of a one-to-one with a team member is:**  
<sub>SR-PM-004 &middot; senior &middot; Performance Review matrix &middot; Managing team members (no less than 2 people)</sub>

- a) To understand blockers, growth and context that status meetings never surface **(correct)**
- b) To review their task list
- c) To deliver performance ratings
- d) To assign new work

> Status is already visible on the board. The one-to-one is for what the board cannot show.

**5. Usability testing primarily evaluates:**  
<sub>TR-TYPE-004 &middot; trainee &middot; Performance Review matrix &middot; Testing types and subtypes</sub>

- a) How easily and efficiently real users can achieve their goals **(correct)**
- b) How many defects per module exist
- c) Whether the code follows the style guide
- d) Whether the database schema is normalised

> Usability is a non-functional quality characteristic measured with real users performing real tasks, not by counting defects.

**6. A forecast differs from an estimate in that a forecast:**  
<sub>SR-FC-001 &middot; senior &middot; Performance Review matrix &middot; Estimates & forecasts</sub>

- a) Projects a future outcome from observed trend data **(correct)**
- b) Is always more accurate
- c) Requires no assumptions
- d) Is produced only by managers

> An estimate is a judgement about work not yet started; a forecast extrapolates from what is already being observed, such as burn rate or defect arrival.

**7. Which statement belongs under "Steps to reproduce"?**  
<sub>DP-T-012 &middot; trainee &middot; Practice-test style &middot; Creating defect reports (in English)</sub>

- a) 1. Open /cart with 2 items. 2. Apply code SAVE10. 3. Click Checkout. **(correct)**
- b) The total is wrong
- c) This is a regression from build 42
- d) Severity: Major

> Steps are the numbered actions only. Observations, history and metadata belong in their own fields.

**8. The testing process takes longer every sprint although scope is constant. The most likely cause to investigate first is:**  
<sub>MD-PROC-003 &middot; middle &middot; Performance Review matrix &middot; Analysis of testing process</sub>

- a) Growing regression suite and manual repetition **(correct)**
- b) Testers becoming slower
- c) Requirements getting harder
- d) Tooling licence limits

> Regression cost grows monotonically with product size unless it is actively automated or pruned.

**9. A field accepts a 3-letter country code. Which is an INVALID equivalence partition?**  
<sub>FL-4-008 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) A 4-character input **(correct)**
- b) The value USA
- c) The value GBR
- d) The value POL

> Length is the partitioning attribute here: anything other than exactly three letters falls into an invalid partition.

**10. When forming a test team, the Test Manager should consider:**  
<sub>TM-011 &middot; senior &middot; ISTQB Test Manager &middot; Distribution of roles within a test team</sub>

- a) The mix of skills required by the risks, and the development of each individual **(correct)**
- b) Only technical skills
- c) Only availability
- d) Only cost

> CTAL-TM treats team composition as a risk mitigation decision, not just a staffing one.

**11. ISTQB Glossary: a "test driver" is:**  
<sub>GL-J-001 &middot; junior &middot; ISTQB Glossary &middot; Levels of testing</sub>

- a) A temporary component that replaces a calling component in order to invoke the code under test **(correct)**
- b) A component that replaces a called component
- c) A tool that manages test data
- d) The person executing the tests

> A driver calls down into the unit; a stub stands in for what the unit calls. Confusing them makes integration discussions circular.

**12. Smoke testing is best described as:**  
<sub>TR-TYPE-001 &middot; trainee &middot; Performance Review matrix &middot; Testing types and subtypes</sub>

- a) A shallow, broad check that the build is stable enough to test further **(correct)**
- b) An exhaustive check of one module
- c) Testing performed only by the customer
- d) Testing that measures response time under load

> Smoke testing answers one question: is this build worth spending a day on? It is broad and shallow by design.

**13. ISTQB Glossary: "defect density" is:**  
<sub>GL-M-001 &middot; middle &middot; ISTQB Glossary &middot; Testing metrics</sub>

- a) The number of defects per size unit of the work product **(correct)**
- b) The number of defects per tester
- c) The rate at which defects are fixed
- d) The proportion of defects found before release

> Normalising by size is what makes two modules comparable; the proportion found before release is defect detection percentage.

**14. Which statement about severity and priority is correct?**  
<sub>TR-SEV-005 &middot; trainee &middot; Performance Review matrix &middot; Severity vs Priority</sub>

- a) They are independent attributes and any combination is possible **(correct)**
- b) High severity always implies high priority
- c) Low priority always implies low severity
- d) Only one of the two needs to be filled in

> All four combinations occur in practice. Treating them as one field loses the distinction between "how bad" and "how soon".

**15. Kanban differs from Scrum principally because it:**  
<sub>JR-SDLC-003 &middot; junior &middot; Performance Review matrix &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) Uses a continuous flow with WIP limits rather than fixed iterations **(correct)**
- b) Forbids daily meetings
- c) Has no board
- d) Requires no estimation ever

> Kanban optimises flow and limits work in progress; Scrum timeboxes work into sprints. Both use boards and both can estimate.

**16. The system must behave correctly when a downstream service times out. This is primarily:**  
<sub>TA-A-005 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Reliability (fault tolerance) testing **(correct)**
- b) Usability testing
- c) Portability testing
- d) Maintainability testing

> Fault tolerance is a reliability sub-characteristic, and it needs deliberate fault injection rather than happy-path testing.

**17. Which metric is most easily gamed and therefore most dangerous as a target?**  
<sub>MD-MET-002 &middot; middle &middot; Performance Review matrix &middot; Testing metrics</sub>

- a) Number of test cases written **(correct)**
- b) Defect detection percentage
- c) Requirements coverage
- d) Escaped defects per release

> Case count rewards splitting one test into ten. Goodhart law applies: a measure that becomes a target stops being a measure.

**18. What is the difference between acceptance criteria and the Definition of Done?**  
<sub>JR-AC-002 &middot; junior &middot; Performance Review matrix &middot; Acceptance criteria/Definition of Done</sub>

- a) Criteria are per story; the DoD applies to every story in the team **(correct)**
- b) They are two names for the same thing
- c) The DoD is written by the customer only
- d) Criteria apply only to bugs

> The DoD is the team-wide quality bar (code reviewed, tests written, deployed to staging). Acceptance criteria describe what this particular story must do.

**19. A high number of defects escaping to production while the internal pass rate is high indicates:**  
<sub>MD-PROC-001 &middot; middle &middot; Performance Review matrix &middot; Analysis of testing process</sub>

- a) The tests do not cover what users actually do **(correct)**
- b) Testers are working too slowly
- c) The product is too complex
- d) Developers write bad code

> A high pass rate with high escape rate is a coverage and oracle problem, and it is measurable through DDP.

**20. Which metric set best supports a go/no-go release decision?**  
<sub>TM-006 &middot; senior &middot; ISTQB Test Manager &middot; Testing metrics</sub>

- a) Risk coverage, open defects weighted by severity and residual risk **(correct)**
- b) Test cases executed and hours spent
- c) Number of automated tests
- d) Lines of code covered

> The decision is about acceptable residual risk, so the metrics must be expressed in risk terms.

---

## Variant 36

**1. A decision table has 3 conditions, each true or false. How many rules does the full (non-collapsed) table have?**  
<sub>FL-4-004 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) 8 **(correct)**
- b) 6
- c) 9
- d) 3

> 2^3 = 8. The table can then be collapsed by merging rules where a condition does not affect the outcome.

**2. A stub or a mock is typically needed at which test level?**  
<sub>JR-LVL-005 &middot; junior &middot; Performance Review matrix &middot; Levels of testing</sub>

- a) Component and integration testing **(correct)**
- b) Acceptance testing
- c) Beta testing
- d) Usability testing

> Test doubles substitute for collaborators that are unavailable, slow or non-deterministic - a lower-level concern by definition.

**3. Defect Detection Percentage (DDP) is calculated as:**  
<sub>MD-MET-001 &middot; middle &middot; Performance Review matrix &middot; Testing metrics</sub>

- a) Defects found by testing / (defects found by testing + defects found after release) **(correct)**
- b) Defects found / test cases executed
- c) Defects fixed / defects reported
- d) Test cases passed / test cases executed

> DDP measures how much of the total defect population the test process caught, which is one of the few metrics that says something about test effectiveness.

**4. ISTQB Glossary: "risk" is:**  
<sub>GL-J-014 &middot; junior &middot; ISTQB Glossary &middot; Risks in testing</sub>

- a) A factor that could result in future negative consequences **(correct)**
- b) A defect found in testing
- c) A failed test case
- d) An open incident

> The definition is future-oriented, which is what separates a risk from an issue that has already occurred.

**5. Which activity is part of test analysis rather than test design?**  
<sub>FL-1-004 &middot; junior &middot; ISTQB Foundation Level &middot; Phases of testing and Goals of testing</sub>

- a) Deciding WHAT to test by evaluating the test basis **(correct)**
- b) Deciding HOW to test by producing test cases
- c) Creating test data and test procedures
- d) Executing the test suite

> Analysis identifies testable features and defines test conditions. Design turns those conditions into test cases; implementation creates the concrete data and procedures.

**6. When a senior tester reviews a unit test suite, the strongest warning sign is:**  
<sub>SR-UT-003 &middot; senior &middot; Performance Review matrix &middot; Writing unit tests</sub>

- a) Tests with high coverage but few meaningful assertions **(correct)**
- b) Tests that use fixtures
- c) Tests grouped by class
- d) Tests with descriptive names

> Coverage without assertions is the classic way to hit a mandated number while verifying nothing.

**7. A test policy differs from a test strategy in that the policy:**  
<sub>TM-001 &middot; senior &middot; ISTQB Test Manager &middot; Writing a test plan</sub>

- a) States why the organisation tests; the strategy states how, in general terms **(correct)**
- b) Is written per project
- c) Lists the test cases
- d) Defines the tools

> CTAL-TM orders the documents: policy (why) -> strategy (how, organisation-wide) -> test plan (this project) -> level test plans.

**8. A typo appears in an error message shown only to internal admins. Most likely:**  
<sub>TR-SEV-006 &middot; trainee &middot; Performance Review matrix &middot; Severity vs Priority</sub>

- a) Low severity, low priority **(correct)**
- b) High severity, high priority
- c) High severity, low priority
- d) Low severity, high priority

> Cosmetic, internal-only and non-blocking: low on both axes. It still belongs in the tracker so it can be batched into a text-cleanup task.

**9. What should a tester do before starting execution on a new build?**  
<sub>TR-EXEC-003 &middot; trainee &middot; Performance Review matrix &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) Confirm the build number and environment, then run smoke checks **(correct)**
- b) Immediately start the longest test suite
- c) Close all previous defects
- d) Rewrite the test cases

> Verifying what you are testing, and that it is stable enough to test, prevents a whole day of results being attributed to the wrong build.

**10. Functional appropriateness, as a quality sub-characteristic, is about:**  
<sub>TA-Q-001 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Whether the functions facilitate the accomplishment of the user tasks **(correct)**
- b) Whether the function returns the right value
- c) Whether all specified functions are present
- d) Whether the system is fast

> ISO 25010 splits functional suitability into completeness (all present), correctness (right results) and appropriateness (actually helps the task).

**11. Which change most reliably shortens feedback time in a mature process?**  
<sub>SR-OPT-004 &middot; senior &middot; Performance Review matrix &middot; Optimization of testing process</sub>

- a) Moving coverage down the pyramid from UI to API and unit level **(correct)**
- b) Adding more end-to-end tests
- c) Hiring more manual testers
- d) Increasing the sprint length

> The same behaviour verified at a lower level runs in seconds instead of minutes and fails for one identifiable reason.

**12. Which is a symptom of a testing process problem rather than a product problem?**  
<sub>MD-PROC-004 &middot; middle &middot; Performance Review matrix &middot; Analysis of testing process</sub>

- a) The same defect is reported by three testers independently **(correct)**
- b) A module has high defect density
- c) A performance target is missed
- d) A requirement is ambiguous

> Duplicate reports mean coverage is uncoordinated and the tracker is not being searched - both process issues.

**13. Which pair of metrics together give the most honest picture of test effectiveness?**  
<sub>DP-M-013 &middot; middle &middot; Practice-test style &middot; Testing metrics</sub>

- a) Defect detection percentage and escaped defect severity **(correct)**
- b) Test cases executed and pass rate
- c) Automation coverage and suite runtime
- d) Hours logged and defects reported

> One measures how much was caught, the other measures how much what got through actually mattered.

**14. A defect is closed as "cannot reproduce" for the third time, but users keep reporting it. The analyst should:**  
<sub>STA-017 &middot; senior &middot; ISTQB Test Analyst &middot; Defect management system/Project management system</sub>

- a) Instrument the flow and collect production evidence to characterise the trigger **(correct)**
- b) Close it permanently
- c) Raise its severity and reopen unchanged
- d) Ask users for better reports

> Reopening the same report without new evidence changes nothing. Observability is the tool for defects that only occur in production conditions.

**15. Polymorphism allows:**  
<sub>JR-OOP-002 &middot; junior &middot; Performance Review matrix &middot; OOP principles</sub>

- a) A single interface to be backed by different implementations **(correct)**
- b) A class to have private fields
- c) Code to be compiled faster
- d) Objects to be serialised

> This is the property that lets a Page Object framework treat a WebPage and a MobilePage through one interface.

**16. A state transition table is particularly good at exposing:**  
<sub>TA-T-005 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Invalid transitions that the specification never mentioned **(correct)**
- b) Performance bottlenecks
- c) Memory leaks
- d) Coding standard violations

> The table forces every state/event pair to be considered, including the ones the specification silently ignored.

**17. A dropdown has 5 options and a text field accepts 3 valid formats. The minimum number of tests for single-value coverage of both is:**  
<sub>DP-T-011 &middot; trainee &middot; Practice-test style &middot; Test design techniques</sub>

- a) 5 **(correct)**
- b) 15
- c) 8
- d) 3

> Covering each value of each parameter at least once needs max(5, 3) = 5 tests, pairing them up. Fifteen would be full combinatorial coverage.

**18. When automating a REST API, authentication tokens should be:**  
<sub>MD-AAPI-002 &middot; middle &middot; Performance Review matrix &middot; Automation of API tests</sub>

- a) Obtained at setup and injected from configuration or a secret store **(correct)**
- b) Hardcoded in the test file
- c) Committed to the repository
- d) Copied from the browser manually each run

> Hardcoded tokens expire, leak and break the suite for everyone else.

**19. When planning testing for a specific task, the first thing to establish is:**  
<sub>JR-PLAN-001 &middot; junior &middot; Performance Review matrix &middot; Planning of testing activities for specific tasks</sub>

- a) What the change affects and what risk it carries **(correct)**
- b) How many test cases to write
- c) Which tool to use
- d) Who will execute the tests

> Scope and risk determine everything downstream. Deciding the count or the tool first is planning backwards.

**20. You are blocked by a broken test environment. When should this appear in your report?**  
<sub>TR-DAY-002 &middot; trainee &middot; Performance Review matrix &middot; Creating reports about tasks accomplished during a day/a week/a month</sub>

- a) Immediately, as soon as it blocks you **(correct)**
- b) In the weekly summary
- c) Only if it lasts more than two days
- d) Only if the customer asks

> Blockers lose value with delay. Reporting one on Friday that started on Monday has already cost the project four days.

---

## Variant 37

**1. Which command finds which process is listening on port 8080?**  
<sub>MD-UNIX-004 &middot; middle &middot; Performance Review matrix &middot; Unix basics</sub>

- a) lsof -i :8080  (or ss -ltnp | grep 8080) **(correct)**
- b) ps -ef | grep 8080
- c) netcat 8080
- d) kill -9 8080

> ps only matches the command line. lsof and ss inspect the actual socket table.

**2. ISTQB Glossary: "quality assurance" focuses on:**  
<sub>GL-J-015 &middot; junior &middot; ISTQB Glossary &middot; Phases of testing and Goals of testing</sub>

- a) Providing confidence that quality requirements will be fulfilled, through process **(correct)**
- b) Finding defects in the product
- c) Executing test cases
- d) Fixing defects

> QA is process-oriented and preventive; testing (quality control) is product-oriented and detective.

**3. Tests pass on the developer machine and fail in the container with date-format assertions. The first thing to check is:**  
<sub>DP-M-005 &middot; middle &middot; Practice-test style &middot; Virtualization (vagrant/docker)</sub>

- a) The container TZ and locale environment variables **(correct)**
- b) The container CPU limit
- c) The Docker version
- d) The network mode

> Containers commonly default to UTC and the C locale, which changes both formatting and parsing.

**4. Low-level (concrete) test cases are preferred over high-level (logical) ones when:**  
<sub>TA-P-003 &middot; middle &middot; ISTQB Test Analyst &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) The testers are less experienced or the results must be auditable and repeatable **(correct)**
- b) The requirements change every day
- c) Time is very short
- d) The system is exploratory in nature

> Concrete cases cost more to maintain but survive being executed by someone who does not know the system.

**5. When reviewing requirements, the Test Analyst is best placed to check:**  
<sub>TA-V-001 &middot; middle &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) Testability, completeness and consistency from a user perspective **(correct)**
- b) Compiler warnings
- c) Database indexes
- d) Deployment scripts

> The analyst brings the question "how would I prove this?" which is precisely the question that exposes untestable requirements.

**6. Which testing type verifies that a change has not adversely affected unchanged parts of the system?**  
<sub>FL-2-004 &middot; junior &middot; ISTQB Foundation Level &middot; Testing types and subtypes</sub>

- a) Regression testing **(correct)**
- b) Confirmation testing
- c) Maintenance testing
- d) Smoke testing

> Maintenance testing is the context (a change to a deployed system); regression testing is the technique used inside it.

**7. A company logo is misspelled on the home page of a public marketing site. The most defensible classification is:**  
<sub>TR-SEV-001 &middot; trainee &middot; Performance Review matrix &middot; Severity vs Priority</sub>

- a) Low severity, high priority **(correct)**
- b) High severity, low priority
- c) High severity, high priority
- d) Low severity, low priority

> Nothing is functionally broken, so severity is low. It is on the most visible page of a brand-facing site, so it must be fixed first: priority is high.

**8. Client-side rendering (SPA) versus server-side rendering matters to a tester because:**  
<sub>JR-ARCH-005 &middot; junior &middot; Performance Review matrix &middot; Architecture and structure of web apps</sub>

- a) Content may appear after the initial HTML, so waits and SEO checks differ **(correct)**
- b) SPAs cannot be automated
- c) SSR pages have no JavaScript
- d) SPAs never make network calls

> In an SPA the DOM is assembled after load, which is the root cause of most naive-automation timing flakiness.

**9. A test plan that is never updated during the project is:**  
<sub>SR-TP-002 &middot; senior &middot; Performance Review matrix &middot; Writing a test plan</sub>

- a) A document about a project that no longer exists **(correct)**
- b) Still fully useful
- c) Ideal, since it is stable
- d) Required by ISTQB

> Plans are living artefacts. An unchanged plan through a changing project means nobody is using it to decide anything.

**10. Reporting "I tested the application today" is weak mainly because:**  
<sub>TR-DAY-005 &middot; trainee &middot; Performance Review matrix &middot; Creating reports about tasks accomplished during a day/a week/a month</sub>

- a) It states no scope, no result and no risk **(correct)**
- b) It is too short
- c) It is in the wrong tense
- d) It does not mention the tool used

> The sentence cannot support any decision. Scope, outcome and risk are the minimum content of a useful status line.

**11. When forming a test team, the Test Manager should consider:**  
<sub>TM-011 &middot; senior &middot; ISTQB Test Manager &middot; Distribution of roles within a test team</sub>

- a) The mix of skills required by the risks, and the development of each individual **(correct)**
- b) Only technical skills
- c) Only availability
- d) Only cost

> CTAL-TM treats team composition as a risk mitigation decision, not just a staffing one.

**12. Why should a defect be linked to the requirement or story it violates?**  
<sub>JR-DMS-003 &middot; junior &middot; Performance Review matrix &middot; Defect management system/Project management system</sub>

- a) It makes impact analysis and coverage reporting possible **(correct)**
- b) It is required by Jira
- c) It speeds up the fix
- d) It changes the severity

> Links turn a pile of tickets into a queryable model of product risk.

**13. When testing pagination on a REST collection endpoint, the most important edge cases are:**  
<sub>MD-API-006 &middot; middle &middot; Performance Review matrix &middot; API</sub>

- a) Empty result, single page, exact page boundary and out-of-range page **(correct)**
- b) Only the first page
- c) Only very large pages
- d) Only the sort order

> Off-by-one at the page boundary and behaviour past the last page are where pagination defects actually live.

**14. The most appropriate moment to review acceptance criteria for testability is:**  
<sub>JR-STORY-004 &middot; junior &middot; Performance Review matrix &middot; Verification of a story, in strict accordance with its acceptance criteria</sub>

- a) During refinement, before the story enters a sprint **(correct)**
- b) During the sprint review
- c) After the story is coded
- d) At release

> Reviewing criteria at refinement is the cheapest defect prevention available to a tester.

**15. A stakeholder insists a low-risk area receives deep testing. The analyst should:**  
<sub>STA-015 &middot; senior &middot; ISTQB Test Analyst &middot; Risks in testing</sub>

- a) Ask what risk they perceive that the model missed, then update the model or explain the trade **(correct)**
- b) Comply silently
- c) Refuse
- d) Escalate immediately

> Stakeholder insistence is usually undocumented risk knowledge. It is an input to the model, not an argument against it.

**16. Static analysis tools typically detect:**  
<sub>FL-3-004 &middot; junior &middot; ISTQB Foundation Level &middot; Ability to use tools for static code analysis</sub>

- a) Coding standard violations, unreachable code and suspicious constructs **(correct)**
- b) Slow database queries under load
- c) Usability problems
- d) Incorrect business rules

> Static analysis works on the code structure. Business-rule correctness needs an oracle the tool does not have.

**17. Which check belongs to compatibility testing?**  
<sub>DP-T-014 &middot; trainee &middot; Practice-test style &middot; Testing types and subtypes</sub>

- a) The same flow on Chrome, Firefox and Safari at three viewport widths **(correct)**
- b) Response time under 500 concurrent users
- c) Password strength enforcement
- d) Database backup and restore

> Compatibility covers browsers, devices, OS versions and co-existing software.

**18. Which artefact describes a single, concrete verification with preconditions, steps and an expected result?**  
<sub>TR-ART-001 &middot; trainee &middot; Performance Review matrix &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) Test plan
- b) Test case **(correct)**
- c) Checklist
- d) Test policy

> A test case is the smallest executable unit of test documentation: preconditions, steps, test data and an expected result. A checklist only names what to verify; a test plan describes how testing will be organised.

**19. Reporting only the average response time is misleading because:**  
<sub>MD-APERF-002 &middot; middle &middot; Performance Review matrix &middot; Automation of Performance/Load tests</sub>

- a) It hides the tail; percentiles show what the slowest users actually experience **(correct)**
- b) Averages cannot be computed reliably
- c) It ignores the number of requests
- d) It requires more data

> A 200 ms mean can coexist with a 4 s 99th percentile. Users experience the tail, not the mean.

**20. A framework should provide a shared reporting and logging layer mainly because:**  
<sub>SR-TF-002 &middot; senior &middot; Performance Review matrix &middot; Creating your own test frameworks</sub>

- a) Failure diagnosis time dominates the cost of a large suite **(correct)**
- b) Reports look professional
- c) It is required by CI
- d) It reduces the number of tests

> A failure that takes 30 minutes to diagnose, times a hundred failures, is where automation budgets actually go.

---

## Variant 38

**1. What distinguishes testing from debugging?**  
<sub>FL-1-006 &middot; junior &middot; ISTQB Foundation Level &middot; Testing types and subtypes</sub>

- a) Testing finds failures; debugging locates and removes their causes **(correct)**
- b) They are synonyms
- c) Testing is done by developers, debugging by testers
- d) Debugging happens before testing

> CTFL v4 is explicit that they are different activities with different owners, even though a confirmation test follows a debug.

**2. Severity is best defined as:**  
<sub>TR-SEV-002 &middot; trainee &middot; Performance Review matrix &middot; Severity vs Priority</sub>

- a) The degree of impact the defect has on the system or its users **(correct)**
- b) How soon the defect must be fixed
- c) How often the defect reproduces
- d) How long the fix will take

> Severity measures impact and is normally set by the tester. Priority measures urgency of the fix and is normally set by the product owner or manager.

**3. ISTQB Glossary: "service virtualization" enables:**  
<sub>GL-M-015 &middot; middle &middot; ISTQB Glossary &middot; Virtualization (vagrant/docker)</sub>

- a) Testing components that depend on unavailable or hard-to-access services **(correct)**
- b) Faster CI builds only
- c) Running tests on virtual machines
- d) Automated deployment

> It removes third-party availability from the critical path of a test environment.

**4. The IDEAL model for process improvement stands for:**  
<sub>TM-014 &middot; senior &middot; ISTQB Test Manager &middot; Optimization of testing process</sub>

- a) Initiating, Diagnosing, Establishing, Acting, Learning **(correct)**
- b) Identify, Design, Execute, Analyse, Log
- c) Investigate, Decide, Evaluate, Adjust, Leave
- d) Improve, Deliver, Estimate, Assess, Learn

> The Learning phase is the one most often skipped, which is why organisations repeat the same improvement cycle.

**5. Two testers disagree publicly about test coverage. As their lead you should:**  
<sub>SR-PM-003 &middot; senior &middot; Performance Review matrix &middot; Managing team members (no less than 2 people)</sub>

- a) Facilitate a decision based on risk and evidence, then record it **(correct)**
- b) Decide for them immediately
- c) Let them continue until one gives up
- d) Escalate to the customer

> A recorded, evidence-based decision resolves the current dispute and gives the team a precedent for the next one.

**6. Defect-based test design techniques use:**  
<sub>TA-T-006 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) A defect taxonomy to derive tests targeting known defect types **(correct)**
- b) The code structure
- c) The state model
- d) The performance profile

> A taxonomy built from your own escaped-defect history is one of the most productive test design inputs available.

**7. An app works on Android 14 but crashes on Android 9. The report must include:**  
<sub>DP-T-010 &middot; trainee &middot; Practice-test style &middot; Mobile technologies and platforms</sub>

- a) The OS versions, devices and the crash log or stack trace **(correct)**
- b) Only the crash description
- c) Only the Android 9 device model
- d) Only a screenshot

> Version-specific crashes are usually API-level defects, and the stack trace is what identifies the call.

**8. Test data preparation should be planned:**  
<sub>JR-PLAN-004 &middot; junior &middot; Performance Review matrix &middot; Planning of testing activities for specific tasks</sub>

- a) Together with test design, before execution starts **(correct)**
- b) During execution as it is needed
- c) After execution
- d) Only for automated tests

> Data is one of the most common causes of blocked execution. Planning it late converts design time into idle time.

**9. The best evidence to attach to a UI defect that appears only intermittently is:**  
<sub>TR-REP-005 &middot; trainee &middot; Performance Review matrix &middot; Creating defect reports (in English)</sub>

- a) A screen recording plus console and network logs **(correct)**
- b) A single screenshot
- c) A verbal description
- d) The test case id only

> Intermittent defects need timing context. A recording paired with logs lets a developer align what was seen with what the system did.

**10. Which of these should be caught by unit tests rather than by manual testing?**  
<sub>DP-J-013 &middot; junior &middot; Practice-test style &middot; Levels of testing</sub>

- a) An off-by-one error in a date calculation function **(correct)**
- b) A confusing button label
- c) A slow page under load
- d) A broken third-party integration

> Deterministic pure logic is the cheapest thing to cover at unit level and the most expensive to cover manually.

**11. The strongest argument for keeping test documentation in a version-controlled, tool-supported form is:**  
<sub>MD-TDOC-003 &middot; middle &middot; Performance Review matrix &middot; Development of test documentation</sub>

- a) Changes are traceable and documentation evolves with the product **(correct)**
- b) It looks more professional
- c) It uses less disk space
- d) It is required by ISTQB

> Untracked documents drift silently; tracked ones make the drift visible and reviewable.

**12. Which is a purely mobile non-functional concern?**  
<sub>TR-MOB-006 &middot; trainee &middot; Performance Review matrix &middot; Mobile technologies and platforms</sub>

- a) Battery and data consumption **(correct)**
- b) Response time
- c) Security
- d) Accessibility

> The other three matter everywhere. Battery drain and cellular data usage are constraints specific to a device carried on a person.

**13. Which statement matches the "absence-of-errors fallacy"?**  
<sub>JR-PRIN-003 &middot; junior &middot; Performance Review matrix &middot; Principles of testing</sub>

- a) A system can be defect-free and still fail to meet user needs **(correct)**
- b) Finding no defects means the software is perfect
- c) All defects can be found
- d) Testing early is unnecessary

> Fixing everything found is not the same as building something useful. This principle is the bridge from verification to validation.

**14. Which mobile automation problem is caused by the platform rather than by the test code?**  
<sub>MD-AMOB-003 &middot; middle &middot; Performance Review matrix &middot; Automation of Mobile UI (functional) tests</sub>

- a) Permission dialogs appearing on a fresh install **(correct)**
- b) A misspelled locator
- c) A missing assertion
- d) A hardcoded sleep

> System dialogs sit outside the app view hierarchy and must be handled explicitly in the automation setup.

**15. A feature flag lets a team:**  
<sub>SR-VCS-004 &middot; senior &middot; Performance Review matrix &middot; VCS</sub>

- a) Merge incomplete work to main while keeping it disabled in production **(correct)**
- b) Skip testing the feature
- c) Avoid version control
- d) Deploy without a pipeline

> Flags create a combinatorial test surface of their own: on, off, and the transition between them with existing data.

**16. Why is exhaustive testing impossible for realistic systems?**  
<sub>JR-PRIN-004 &middot; junior &middot; Performance Review matrix &middot; Principles of testing</sub>

- a) The number of input and precondition combinations is effectively unbounded **(correct)**
- b) Because tools are too slow
- c) Because budgets are always cut
- d) Because requirements are never complete

> Even a handful of fields with ordinary ranges produces a combination space no team could ever execute. This is why risk and technique-driven selection exist.

**17. A new Test Manager inherits a team with no documented process. The best first move is:**  
<sub>TM-025 &middot; senior &middot; ISTQB Test Manager &middot; Onboarding and training team members</sub>

- a) Observe and baseline the current way of working before changing it **(correct)**
- b) Introduce a full standard process immediately
- c) Replace the tooling
- d) Reassign every role

> Undocumented does not mean absent. Changing an unmeasured process makes any later improvement unprovable.

**18. Which technique is BEST for testing an order that moves through Created, Paid, Shipped and Delivered?**  
<sub>FL-4-005 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) State transition testing **(correct)**
- b) Equivalence partitioning
- c) Decision table testing
- d) Statement testing

> The behaviour depends on the current state and the event, which is exactly what a state transition model captures - including the invalid transitions worth testing.

**19. When a specification is missing entirely, the most defensible approach is:**  
<sub>TA-A-009 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Exploratory testing under charters, plus documenting the discovered behaviour as a draft oracle **(correct)**
- b) Not testing at all
- c) Testing only what the developer describes
- d) Waiting indefinitely

> The session output becomes the first version of the specification, which is a deliverable in its own right.

**20. An automated database test should verify that:**  
<sub>MD-ADB-001 &middot; middle &middot; Performance Review matrix &middot; Automated DB testing</sub>

- a) The persisted data matches the business rules after the operation **(correct)**
- b) The UI displays a green message
- c) The query executes without syntax errors only
- d) The table exists

> The point of a DB-level check is to confirm what was actually stored, independent of what the UI chose to display.

---

## Variant 39

**1. In Jira, what is the difference between a workflow and an issue type?**  
<sub>JR-DMS-002 &middot; junior &middot; Performance Review matrix &middot; Defect management system/Project management system</sub>

- a) The issue type says what it is; the workflow says which statuses it can move through **(correct)**
- b) They are the same thing
- c) Workflows apply only to bugs
- d) Issue types define permissions

> A project can have several issue types sharing a workflow, or one issue type with a specialised workflow. Confusing the two makes tracker configuration debates go in circles.

**2. You have two days to test a feature that would need five to cover fully. The right approach is to:**  
<sub>JR-PLAN-002 &middot; junior &middot; Performance Review matrix &middot; Planning of testing activities for specific tasks</sub>

- a) Prioritise by risk, state explicitly what will not be covered, and agree it **(correct)**
- b) Test everything superficially
- c) Test the first half thoroughly and stop
- d) Silently extend the deadline

> The deliverable of a constrained plan is an explicit, agreed coverage gap - not an implicit one nobody knows about.

**3. Response times are: p50 120 ms, p95 400 ms, p99 6 s. The most important finding to report is:**  
<sub>DP-M-002 &middot; middle &middot; Practice-test style &middot; Automation of Performance/Load tests</sub>

- a) 1% of requests take 6 seconds - investigate the tail before the mean **(correct)**
- b) The average is acceptable
- c) p95 is the only relevant number
- d) No issue exists

> A 6-second p99 on a busy endpoint is thousands of bad experiences a day, and it usually signals a lock, a cold cache or a slow query path.

**4. ISTQB Glossary: "maintenance testing" is testing:**  
<sub>GL-J-006 &middot; junior &middot; ISTQB Glossary &middot; Testing types and subtypes</sub>

- a) A modified operational system, or the impact of a changed environment on it **(correct)**
- b) Of a system still in development
- c) Performed by the maintenance team only
- d) Of the test environment

> It covers changes, migrations, retirements and environment upgrades, and it always includes regression testing.

**5. Test progress reporting should communicate primarily:**  
<sub>FL-5-009 &middot; junior &middot; ISTQB Foundation Level &middot; Testing metrics</sub>

- a) Status against the plan, product risks and impediments **(correct)**
- b) How many hours each tester logged
- c) The number of defects each developer created
- d) The volume of documentation produced

> The purpose of a progress report is to support a decision by the stakeholders reading it.

**6. When planning testing for an entire team across several parallel streams, the primary constraint to model is:**  
<sub>SR-TTP-001 &middot; senior &middot; Performance Review matrix &middot; Planning the testing process for the entire team</sub>

- a) Shared bottlenecks: environments, test data and specialised skills **(correct)**
- b) Individual preferences
- c) Number of test cases
- d) Office seating

> Parallel streams fail on shared resources long before they fail on headcount.

**7. A use case test is derived from:**  
<sub>TA-T-004 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) The basic flow plus the alternative and exception flows **(correct)**
- b) The database schema
- c) The source code branches
- d) The defect history only

> Use case testing is strong at finding integration and workflow defects because it follows how the system is actually used.

**8. Risk mitigation through testing works by:**  
<sub>TM-005 &middot; senior &middot; ISTQB Test Manager &middot; Risk management in testing</sub>

- a) Reducing the likelihood of undetected defects in high-risk areas **(correct)**
- b) Reducing the impact of a failure in production
- c) Eliminating the risk entirely
- d) Transferring the risk to the customer

> Testing addresses the likelihood side of the equation. Impact is reduced by design, redundancy and operational measures.

**9. Compatibility testing in ISO 25010 covers:**  
<sub>TA-Q-004 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Co-existence with other software and interoperability with other systems **(correct)**
- b) Response time under load
- c) Fault tolerance
- d) Code readability

> Co-existence defects (two apps fighting over a port or a driver) are routinely missed because each product is tested alone.

**10. Which file format is the installable package for an Android application?**  
<sub>TR-MOB-001 &middot; trainee &middot; Performance Review matrix &middot; Mobile technologies and platforms</sub>

- a) .apk (or .aab for distribution) **(correct)**
- b) .ipa
- c) .exe
- d) .dmg

> APK is the Android package; AAB is the publishing format Google Play expects. IPA is the iOS equivalent.

**11. Which is the correct order of steps in risk-based testing?**  
<sub>MD-RISK-001 &middot; middle &middot; Performance Review matrix &middot; Risks in testing</sub>

- a) Identify risks, analyse (likelihood x impact), prioritise, allocate effort, monitor **(correct)**
- b) Write test cases, then look for risks
- c) Execute tests, then rank the defects found
- d) Estimate first, then identify risks

> Risk analysis drives the plan. Running risk analysis after the tests are written turns it into documentation rather than a decision tool.

**12. When negotiating a reduced test budget, the Test Manager should present:**  
<sub>TM-023 &middot; senior &middot; ISTQB Test Manager &middot; Estimation of time/cost of testing activities (full project, team tasks)</sub>

- a) The specific coverage that will be dropped and the risk it exposes **(correct)**
- b) A refusal
- c) A silent acceptance
- d) A uniform reduction across all areas

> Making the trade explicit moves the decision to whoever owns the risk, which is where it belongs.

**13. Which sentence belongs in a status report rather than in a defect report?**  
<sub>TR-DAY-003 &middot; trainee &middot; Performance Review matrix &middot; Creating reports about tasks accomplished during a day/a week/a month</sub>

- a) Smoke suite executed on build 1.4.2: 28 passed, 2 failed, 1 blocked **(correct)**
- b) Steps to reproduce: 1. Open cart...
- c) Expected result: total is recalculated
- d) Severity: Major

> Aggregated progress belongs in the status report; per-defect detail belongs in the tracker. Repeating the detail in both places guarantees they will diverge.

**14. A good test case is best described as:**  
<sub>TR-DOC-001 &middot; trainee &middot; Performance Review matrix &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) Independent, repeatable and unambiguous **(correct)**
- b) As long as possible
- c) Written only for automation
- d) Dependent on the previous case

> Independence is what allows cases to be reordered, parallelised and executed by someone who did not write them.

**15. Test closure activities include:**  
<sub>JR-PH-003 &middot; junior &middot; Performance Review matrix &middot; Phases of testing and Goals of testing</sub>

- a) Collecting lessons learned and archiving testware **(correct)**
- b) Writing the first test cases
- c) Setting up the environment
- d) Executing the regression suite

> Closure is where the team converts the experience into something reusable. Skipping it means paying to learn the same lesson next release.

**16. In the test pyramid, UI end-to-end tests should be:**  
<sub>MD-AWEB-005 &middot; middle &middot; Performance Review matrix &middot; Automation of WEB UI (functional) tests</sub>

- a) The smallest layer, covering critical user journeys only **(correct)**
- b) The largest layer
- c) The only layer
- d) Equal in size to unit tests

> E2E tests are the slowest and most brittle per unit of coverage, so they are spent on the journeys that must never break.

**17. The "Buy now" button is invisible on iPhone Safari only. Classification:**  
<sub>DP-T-003 &middot; trainee &middot; Practice-test style &middot; Severity vs Priority</sub>

- a) High severity, high priority **(correct)**
- b) Low severity, low priority
- c) High severity, low priority
- d) Low severity, high priority

> Revenue path plus a major browser share: both impact and urgency are high.

**18. Which review type is the MOST formal, with defined roles, entry criteria and metrics?**  
<sub>FL-3-002 &middot; junior &middot; ISTQB Foundation Level &middot; Requirements testing</sub>

- a) Inspection **(correct)**
- b) Walkthrough
- c) Informal review
- d) Technical review

> CTFL orders reviews by formality: informal review, walkthrough, technical review, inspection.

**19. Which assertion set is the minimum for a meaningful automated API test?**  
<sub>MD-AAPI-001 &middot; middle &middot; Performance Review matrix &middot; Automation of API tests</sub>

- a) Status code, response schema and the business-critical field values **(correct)**
- b) Status code only
- c) Response time only
- d) That the response is not empty

> Status alone passes on a 200 with a wrong body; schema alone passes on schema-valid nonsense.

**20. Rotating testers across modules periodically helps because:**  
<sub>SR-ROLE-003 &middot; senior &middot; Performance Review matrix &middot; Distribution of roles within a test team</sub>

- a) Fresh eyes find defects that familiarity hides, and knowledge spreads **(correct)**
- b) It is fairer
- c) It reduces documentation
- d) It shortens onboarding

> It costs some ramp-up time and buys both defect detection and resilience.

---

## Variant 40

**1. Which coverage is achieved when every statement in the code has been executed at least once?**  
<sub>FL-4-003 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) Statement coverage **(correct)**
- b) Branch coverage
- c) Decision coverage
- d) Path coverage

> 100% branch coverage implies 100% statement coverage, but not the other way around: a lone if with no else reaches every statement without taking the false branch.

**2. Which negative case is most often missing from API test suites?**  
<sub>MD-AAPI-004 &middot; middle &middot; Performance Review matrix &middot; Automation of API tests</sub>

- a) Malformed payloads and wrong content types **(correct)**
- b) The happy path
- c) A valid GET request
- d) A successful login

> Error handling is where APIs leak stack traces, return 500 for client errors and expose internal field names.

**3. ISTQB Glossary: "reliability" is the degree to which a system:**  
<sub>GL-M-007 &middot; middle &middot; ISTQB Glossary &middot; Testing types and subtypes</sub>

- a) Performs specified functions under specified conditions for a specified period **(correct)**
- b) Responds quickly
- c) Is easy to use
- d) Can be moved between environments

> Reliability sub-characteristics include maturity, availability, fault tolerance and recoverability.

**4. Preconditions in a test case exist to:**  
<sub>TR-DOC-005 &middot; trainee &middot; Performance Review matrix &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) State the system and data state required before step 1 **(correct)**
- b) List the defects found earlier
- c) Name the author
- d) Record the execution date

> Preconditions make a case reproducible by someone who is not you, on a machine that is not yours.

**5. Three-point estimation (optimistic, most likely, pessimistic) is useful because it:**  
<sub>MD-PEST-001 &middot; middle &middot; Performance Review matrix &middot; Estimation of time/cost of testing activities (epics, stories, bugs, testing types)</sub>

- a) Expresses uncertainty explicitly instead of hiding it in one number **(correct)**
- b) Always produces a smaller estimate
- c) Removes the need for historical data
- d) Guarantees the deadline

> The spread itself is information: a wide range is a signal that the requirement needs clarification before it is committed.

**6. Which is a portability sub-characteristic relevant to a Test Analyst?**  
<sub>TA-Q-003 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Installability **(correct)**
- b) Maturity
- c) Time behaviour
- d) Confidentiality

> Portability covers adaptability, installability and replaceability. Maturity is reliability, time behaviour is performance efficiency, confidentiality is security.

**7. Which is the strongest candidate for automation?**  
<sub>FL-6-002 &middot; junior &middot; ISTQB Foundation Level &middot; Automation of WEB UI (functional) tests</sub>

- a) A stable, frequently repeated regression check **(correct)**
- b) A one-off exploratory session
- c) A usability evaluation with real users
- d) A test whose expected result changes weekly

> Automation pays back through repetition against a stable oracle. Volatile or judgement-based checks pay negative interest.

**8. A DELETE request is sent twice for the same resource. The second call should return:**  
<sub>DP-J-005 &middot; junior &middot; Practice-test style &middot; REST API and HTTP/HTTPS protocols</sub>

- a) 404 or 204 - but never create a side effect **(correct)**
- b) 500
- c) 201
- d) A duplicate deletion error that changes state

> DELETE is idempotent: repeating it must leave the same state. Either 204 or 404 is defensible; a side effect is not.

**9. Which metric set best supports a go/no-go release decision?**  
<sub>TM-006 &middot; senior &middot; ISTQB Test Manager &middot; Testing metrics</sub>

- a) Risk coverage, open defects weighted by severity and residual risk **(correct)**
- b) Test cases executed and hours spent
- c) Number of automated tests
- d) Lines of code covered

> The decision is about acceptable residual risk, so the metrics must be expressed in risk terms.

**10. Code coverage measured by unit tests should be treated as:**  
<sub>SR-SA-004 &middot; senior &middot; Performance Review matrix &middot; Ability to use tools for static code analysis</sub>

- a) A diagnostic that finds untested code, not a quality target **(correct)**
- b) A contractual quality guarantee
- c) A replacement for review
- d) A measure of defect density

> Coverage as a mandated target reliably produces assertion-free tests that execute code without checking anything.

**11. A spec says a value is "mandatory unless the user is a guest". Which case must exist in your suite?**  
<sub>TR-ENG-005 &middot; trainee &middot; Performance Review matrix &middot; Can read and understand test documentation</sub>

- a) A guest user for whom the value may be empty **(correct)**
- b) Only a registered user with the value filled
- c) Only an empty value for every user
- d) No case is needed

> The "unless" clause defines a second equivalence partition. Testing only the main clause leaves half the rule uncovered.

**12. A Test Analyst notices that the test basis is untestable in several places. The correct action is:**  
<sub>TA-P-004 &middot; middle &middot; ISTQB Test Analyst &middot; Analysis of testing process</sub>

- a) Raise the issues as defects in the test basis before test design starts **(correct)**
- b) Design tests anyway and interpret freely
- c) Wait for the code and test against it
- d) Escalate to the customer directly

> Reporting test-basis defects is one of the highest-value activities the analyst performs, and it must happen before design effort is spent.

**13. Release notes say a feature is "deprecated". The correct reading is:**  
<sub>TR-ENG-004 &middot; trainee &middot; Performance Review matrix &middot; Can read and understand test documentation</sub>

- a) It still works but is discouraged and will be removed later **(correct)**
- b) It has already been removed
- c) It is broken
- d) It is newly added

> Deprecated means scheduled for removal. Tests should still cover it, and its removal date should be tracked.

**14. Two requirements state different maximum file sizes for the same upload. This is a defect of:**  
<sub>JR-REQ-002 &middot; junior &middot; Performance Review matrix &middot; Requirements testing</sub>

- a) Consistency **(correct)**
- b) Verifiability
- c) Traceability
- d) Feasibility

> Contradictory requirements guarantee that one of them will be implemented and the other reported as a bug later.

**15. A rough estimate for testing a small story should account for:**  
<sub>JR-EST-001 &middot; junior &middot; Performance Review matrix &middot; Approximate estimation of time/cost to test a specific task/story</sub>

- a) Analysis, design, execution, defect reporting and retesting **(correct)**
- b) Execution time only
- c) Only the time to write test cases
- d) Only the time to report defects

> Estimates that count only execution are consistently 2-3x low, because reporting and retesting are where the tail actually lives.

**16. In the V-model, which test level corresponds to the requirements specification?**  
<sub>JR-SDLC-001 &middot; junior &middot; Performance Review matrix &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) Acceptance testing **(correct)**
- b) Unit testing
- c) Integration testing
- d) Component testing

> The V-model pairs each development artefact with the test level that validates it. Requirements pair with acceptance; detailed design pairs with unit/component.

**17. ISTQB Glossary: which term means "an event in which a component or system does not perform a required function within specified limits"?**  
<sub>GL-T-001 &middot; trainee &middot; ISTQB Glossary &middot; Defect life cycle</sub>

- a) Failure **(correct)**
- b) Defect
- c) Error
- d) Mistake

> Failure is the observed event. Defect is the flaw in the work product; error is the human action that produced it.

**18. A test summary report at project close should include:**  
<sub>TM-024 &middot; senior &middot; ISTQB Test Manager &middot; Creating test reports which include the evaluation of the product quality</sub>

- a) What was tested, results, residual risk and lessons learned **(correct)**
- b) Only the defect count
- c) Only the pass rate
- d) Only the schedule variance

> The lessons-learned section is what makes the next project cheaper; it is also the first thing cut under pressure.

**19. Defect arrival is still rising three days before the planned release. The most defensible forecast statement is:**  
<sub>SR-FC-002 &middot; senior &middot; Performance Review matrix &middot; Estimates & forecasts</sub>

- a) Discovery has not saturated; the current date carries material risk, with these options **(correct)**
- b) We will be ready, the team will work harder
- c) We cannot say anything until the last day
- d) Testing is complete

> A rising arrival curve is evidence that discovery is incomplete. Reporting the shape of the curve converts a gut feeling into a defensible position.

**20. A documentation standard is worth introducing mainly because it:**  
<sub>MD-TDOC-002 &middot; middle &middot; Performance Review matrix &middot; Development of test documentation</sub>

- a) Makes test artefacts reviewable and reusable across the team **(correct)**
- b) Makes documents longer
- c) Satisfies the customer
- d) Reduces the need for testing

> The benefit is that a case written by one tester can be executed and maintained by another without a conversation.

---

## Variant 41

**1. Two streams need the same test environment in the same week. The best plan is:**  
<sub>SR-TTP-002 &middot; senior &middot; Performance Review matrix &middot; Planning the testing process for the entire team</sub>

- a) Sequence them explicitly, or provision an isolated environment, and state the cost **(correct)**
- b) Let the teams work it out
- c) Ignore it and react when it happens
- d) Cancel one stream

> Surfacing the conflict as a decision with a price is the planning act; leaving it implicit guarantees a lost week.

**2. In Scrum, who is responsible for the quality of the increment?**  
<sub>JR-SDLC-006 &middot; junior &middot; Performance Review matrix &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) The whole development team **(correct)**
- b) Only the testers
- c) Only the Scrum Master
- d) Only the Product Owner

> Scrum defines a single, cross-functional Developers accountability. A team that treats quality as "the tester job" has recreated a hand-off gate inside the sprint.

**3. Which status does a defect normally receive when the developer states that the described behaviour is intentional?**  
<sub>TR-LIFE-001 &middot; trainee &middot; Performance Review matrix &middot; Defect life cycle</sub>

- a) Rejected / Not a bug **(correct)**
- b) Deferred
- c) Duplicate
- d) Reopened

> "Not a bug" (or "Works as designed") means the behaviour matches the requirement. The right response is to challenge the requirement if you disagree, not to reopen the ticket unchanged.

**4. A common risk when introducing test automation is:**  
<sub>FL-6-001 &middot; junior &middot; ISTQB Foundation Level &middot; Automation of WEB UI (functional) tests</sub>

- a) Unrealistic expectations about the effort and benefits **(correct)**
- b) Tests running too fast
- c) Too much coverage
- d) Reduced defect counts

> CTFL is explicit that automation costs are underestimated: maintenance, environment and skills dominate the total cost, not the initial scripting.

**5. Two stakeholders describe the same feature differently. The Test Analyst should first:**  
<sub>TA-A-007 &middot; middle &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) Surface the conflict explicitly and get it resolved before designing tests **(correct)**
- b) Test both interpretations
- c) Pick the more senior stakeholder version
- d) Test neither until documentation arrives

> Designing tests over an unresolved conflict guarantees a dispute at the acceptance gate, when it is most expensive.

**6. The DOM is:**  
<sub>TR-BROW-006 &middot; trainee &middot; Performance Review matrix &middot; Web browser architecture (cookies, localstorage, etc.)</sub>

- a) The in-memory tree the browser builds from the HTML, which scripts can change **(correct)**
- b) The HTML file stored on the server
- c) The CSS rules of a page
- d) The browser network cache

> Because the DOM is live, what you see in the Elements panel can differ from the source HTML. That difference explains many "the markup is right but the page is wrong" reports.

**7. A project risk, as opposed to a product risk, is:**  
<sub>MD-RISK-002 &middot; middle &middot; Performance Review matrix &middot; Risks in testing</sub>

- a) The only automation engineer is leaving next month **(correct)**
- b) The payment module may miscalculate VAT
- c) The app may be slow on 3G
- d) The export may lose Unicode characters

> Project risks threaten the ability to deliver; product risks threaten the quality of what is delivered.

**8. Which leadership behaviour most improves defect reporting quality across a team?**  
<sub>TM-022 &middot; senior &middot; ISTQB Test Manager &middot; Managing team members (no less than 2 people)</sub>

- a) Reviewing reports constructively and publishing shared examples of good ones **(correct)**
- b) Setting a minimum defect quota
- c) Ranking testers by defect count
- d) Rejecting weak reports without comment

> Quotas and rankings optimise for volume. Shared exemplars change the standard everyone writes to.

**9. Given a login that locks after 3 failed attempts, which test design technique most directly derives the test cases?**  
<sub>FL-4-010 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) State transition testing **(correct)**
- b) Boundary value analysis alone
- c) Statement testing
- d) Checklist-based testing

> Attempt count is state. The interesting cases are the transitions at 1, 2, 3 failures and the reset on a successful login.

**10. ISTQB Glossary: "coverage" is:**  
<sub>GL-T-013 &middot; trainee &middot; ISTQB Glossary &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) The degree to which specified coverage items are exercised by a test suite **(correct)**
- b) The number of test cases
- c) The percentage of defects found
- d) The size of the test basis

> Coverage is always relative to a stated coverage item: statements, branches, requirements, risks.

**11. What is an artefact in a CI pipeline?**  
<sub>JR-CI-004 &middot; junior &middot; Performance Review matrix &middot; Continuous integration systems</sub>

- a) A build output stored for later stages, such as a package or a report **(correct)**
- b) A defect found during the build
- c) A configuration error
- d) A test case

> Artefacts are what one stage passes to the next: binaries, containers, coverage and test reports.

**12. A legacy module has no specification, no tests and a high escaped-defect rate. The most effective analyst strategy is:**  
<sub>STA-001 &middot; senior &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Build a defect taxonomy from its history and design defect-based tests around it **(correct)**
- b) Write exhaustive tests from the code
- c) Rewrite the specification first
- d) Rely on exploratory testing alone

> The escaped-defect history is the best available oracle in the absence of a specification, and a taxonomy converts it into repeatable coverage.

**13. Checklist-based testing is an experience-based technique whose main weakness is:**  
<sub>TA-T-007 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Coverage varies with the tester, and checklists go stale **(correct)**
- b) It cannot be documented
- c) It is too slow
- d) It requires source code

> Checklists must be maintained from real findings, otherwise they encode the risks of three years ago.

**14. A mind map is a good choice for test documentation when:**  
<sub>TR-DOC-003 &middot; trainee &middot; Performance Review matrix &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) You need to explore and communicate coverage quickly at an early stage **(correct)**
- b) You need step-by-step reproducibility for an auditor
- c) You need to store execution results
- d) You need to run tests automatically

> Mind maps excel at structure and coverage conversations. They are a poor substitute when detailed, evidenced steps are contractually required.

**15. What is idempotency and why does it matter when testing a payment API?**  
<sub>MD-API-003 &middot; middle &middot; Performance Review matrix &middot; API</sub>

- a) Repeating the same request must not create a second charge **(correct)**
- b) The request must always return 200
- c) The request must be encrypted
- d) The request must complete within one second

> Network retries are routine. An idempotency key on POST is the mechanism that stops one user click becoming two payments.

**16. Verification answers which question?**  
<sub>JR-VV-001 &middot; junior &middot; Performance Review matrix &middot; Verification & Validation</sub>

- a) Are we building the product right? **(correct)**
- b) Are we building the right product?
- c) Is the product profitable?
- d) Is the product fast enough?

> Verification checks the product against its specification. Validation checks it against the real user need - a product can pass verification completely and still be the wrong product.

**17. A test suite passes locally but fails in the container. The first thing to compare is:**  
<sub>MD-VIRT-004 &middot; middle &middot; Performance Review matrix &middot; Virtualization (vagrant/docker)</sub>

- a) Environment variables, mounted volumes, timezone and locale **(correct)**
- b) The tester keyboard layout
- c) The Docker logo version
- d) The host screen resolution

> Timezone and locale differences alone account for a large share of container-only failures in date and number formatting.

**18. The difference between mitigation and contingency is that mitigation:**  
<sub>SR-RM-002 &middot; senior &middot; Performance Review matrix &middot; Risk management in testing</sub>

- a) Reduces likelihood or impact in advance; contingency is the plan if it happens anyway **(correct)**
- b) Is cheaper
- c) Applies only to project risks
- d) Is the same thing

> Well-run projects fund both, because mitigation is never complete.

**19. ISTQB Glossary: "error guessing" is:**  
<sub>GL-M-008 &middot; middle &middot; ISTQB Glossary &middot; Test design techniques</sub>

- a) A technique in which experience is used to anticipate defects **(correct)**
- b) A structural coverage technique
- c) A formal specification-based technique
- d) A defect prioritisation method

> It is a recognised experience-based technique, most effective when combined with a defect taxonomy.

**20. ISTQB Glossary: "exit criteria" are:**  
<sub>GL-J-009 &middot; junior &middot; ISTQB Glossary &middot; Testing metrics</sub>

- a) Conditions for officially completing a defined task **(correct)**
- b) Conditions for starting testing
- c) The definition of a defect
- d) The test schedule

> Entry criteria gate the start, exit criteria gate the finish. Both must be agreed with the people who will invoke them.

---

## Variant 42

**1. When designing a test documentation structure for a new project, the first decision should be:**  
<sub>MD-TDOC-001 &middot; middle &middot; Performance Review matrix &middot; Development of test documentation</sub>

- a) How much documentation the context and risk actually justify **(correct)**
- b) Which template the last project used
- c) Which tool the team prefers
- d) How many test cases to write per module

> A regulated medical product and an internal admin tool need different amounts of evidence. Copying a template skips that judgement.

**2. A pilot project before rolling out a new test tool is recommended in order to:**  
<sub>FL-6-003 &middot; junior &middot; ISTQB Foundation Level &middot; Automation of WEB UI (functional) tests</sub>

- a) Evaluate fit with the existing process and technology at low cost **(correct)**
- b) Delay the decision
- c) Train the whole company at once
- d) Satisfy the vendor

> A pilot converts a purchasing argument into evidence about your own codebase and your own team.

**3. When a mentee reports a defect that is actually correct behaviour, the best response is to:**  
<sub>MD-ONB-002 &middot; middle &middot; Performance Review matrix &middot; Onboarding and training team members</sub>

- a) Walk through the requirement together so they learn to find the oracle **(correct)**
- b) Close it silently
- c) Tell them to be more careful
- d) Ask someone else to review their reports from now on

> The goal is a tester who checks the oracle next time, not one who reports less.

**4. A localisation defect that only appears in Turkish is most likely caused by:**  
<sub>TA-A-010 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Case conversion rules (the dotted and dotless i) **(correct)**
- b) Screen size
- c) Network latency
- d) Database indexing

> The Turkish locale breaks naive toUpperCase/toLowerCase comparisons, which is the classic locale-dependent logic defect.

**5. Which technique relies primarily on the tester experience rather than on a formal model?**  
<sub>TR-TDT-005 &middot; trainee &middot; Performance Review matrix &middot; Test design techniques</sub>

- a) Error guessing **(correct)**
- b) Equivalence partitioning
- c) Decision table testing
- d) State transition testing

> Error guessing is an experience-based technique. It complements, but does not replace, specification-based techniques.

**6. Which practice keeps automated DB tests independent of each other?**  
<sub>MD-ADB-002 &middot; middle &middot; Performance Review matrix &middot; Automated DB testing</sub>

- a) Each test creates its own data and rolls back or deletes it afterwards **(correct)**
- b) Tests share one fixed dataset
- c) Tests run in a fixed alphabetical order
- d) Tests read production data

> Shared mutable state makes a suite order-dependent, which is the hardest kind of flakiness to diagnose.

**7. A defect burndown that flattens while new defects keep arriving indicates:**  
<sub>TM-007 &middot; senior &middot; ISTQB Test Manager &middot; Testing metrics</sub>

- a) Discovery is outpacing fixing, so the release date is at risk **(correct)**
- b) Testing is complete
- c) The product is stable
- d) The metric should be discarded

> Arrival and closure rates must be read together; either alone supports the wrong conclusion.

**8. In risk-based testing, the Test Analyst usually contributes primarily to:**  
<sub>TA-R-001 &middot; middle &middot; ISTQB Test Analyst &middot; Risks in testing</sub>

- a) Identifying and assessing product risks from the business and user perspective **(correct)**
- b) Setting the project budget
- c) Assigning developers to modules
- d) Choosing the CI server

> The Test Manager owns the process; the Test Analyst supplies the domain judgement about likelihood and impact.

**9. A defect marked Fixed fails verification. The tester should:**  
<sub>TR-LIFE-002 &middot; trainee &middot; Performance Review matrix &middot; Defect life cycle</sub>

- a) Reopen it with the new evidence **(correct)**
- b) Create a brand-new defect and close the old one
- c) Close it and mention the problem in the daily report
- d) Assign it to another developer

> Reopening keeps the history, the discussion and the original context in one place. Filing a duplicate fragments the trail.

**10. Which is typically included in a test plan?**  
<sub>FL-5-003 &middot; junior &middot; ISTQB Foundation Level &middot; Writing a test plan</sub>

- a) Scope, objectives, risks, entry and exit criteria, and the test approach **(correct)**
- b) The full list of executed test cases with results
- c) The source code of the automation framework
- d) The defect reports of the previous release

> A plan is forward-looking. Results belong in the test progress and completion reports.

**11. A good unit test is characterised by:**  
<sub>SR-UT-001 &middot; senior &middot; Performance Review matrix &middot; Writing unit tests</sub>

- a) Fast, isolated, deterministic and testing one behaviour **(correct)**
- b) Covering the whole system end to end
- c) Using the real database
- d) Depending on the previous test

> The FIRST properties. A unit test that touches the network is an integration test wearing the wrong label.

**12. In a classic three-tier web application, the tiers are:**  
<sub>JR-ARCH-001 &middot; junior &middot; Performance Review matrix &middot; Architecture and structure of web apps</sub>

- a) Presentation, application/business logic, and data **(correct)**
- b) HTML, CSS and JavaScript
- c) Frontend, backend and QA
- d) Development, staging and production

> The three-tier split is the mental model that lets a tester localise a defect to a layer before writing the report.

**13. State transition testing is the natural fit when:**  
<sub>TR-TDT-004 &middot; trainee &middot; Performance Review matrix &middot; Test design techniques</sub>

- a) The system behaves differently depending on what happened before **(correct)**
- b) Inputs are independent numeric ranges
- c) There is no specification at all
- d) Only performance matters

> State transition testing models states, events, transitions and actions, and is the right tool whenever history changes behaviour (order status, session state, device modes).

**14. Which sentence is clearest in a test summary?**  
<sub>JR-ENGW-004 &middot; junior &middot; Performance Review matrix &middot; Writing test documentation/emails to a customer</sub>

- a) 3 of 45 regression cases failed; all three relate to the discount calculation **(correct)**
- b) There were some failures in regression
- c) Regression was mostly fine
- d) Almost everything passed

> Numbers plus a stated pattern let the reader act. Hedged summaries force them to ask a follow-up question.

**15. ISTQB Glossary: "smoke test" is:**  
<sub>GL-T-012 &middot; trainee &middot; ISTQB Glossary &middot; Testing types and subtypes</sub>

- a) A subset of tests covering the main functionality to decide whether the build is testable **(correct)**
- b) An exhaustive test of one module
- c) A test of error handling
- d) A test executed by the customer

> It is a gate, not a quality assessment. A build that passes smoke has earned a day of testing, nothing more.

**16. A team member consistently misses estimates. The most effective first step is:**  
<sub>SR-PM-001 &middot; senior &middot; Performance Review matrix &middot; Managing team members (no less than 2 people)</sub>

- a) A private conversation to understand the cause before acting **(correct)**
- b) Reducing their estimates for them
- c) Raising it in the team retrospective by name
- d) Reassigning all their work

> The cause could be skill, scope, blockers or estimation technique, and each has a different remedy. Public correction addresses none of them.

**17. The same defect class recurs across three releases despite being fixed each time. This indicates:**  
<sub>STA-011 &middot; senior &middot; ISTQB Test Analyst &middot; Analysis of testing process</sub>

- a) A missing gate in the process, not a coding problem **(correct)**
- b) Careless developers
- c) Insufficient regression testing
- d) A tooling limitation

> Recurrence of a class, rather than of an instance, is by definition a process signal.

**18. A partner API begins returning an extra field in its response. Your suite fails on strict schema validation. The correct action is:**  
<sub>DP-M-008 &middot; middle &middot; Practice-test style &middot; API</sub>

- a) Confirm the contract, then relax the schema to allow additive changes if that is the agreement **(correct)**
- b) Delete the schema validation
- c) Ignore the failure
- d) Block the release immediately

> Additive changes are usually allowed by contract. The schema should encode the actual contract, not the current response.

**19. You are asked to sign off a story whose acceptance criteria were changed after development finished. You should:**  
<sub>DP-J-009 &middot; junior &middot; Practice-test style &middot; Verification of a story, in strict accordance with its acceptance criteria</sub>

- a) Verify against the current agreed criteria and flag that they changed mid-story **(correct)**
- b) Verify against the original criteria
- c) Sign off without verification
- d) Refuse to verify

> The current agreement is the oracle, but a silent mid-story change is a process signal worth raising.

**20. While verifying a story you find behaviour that is not covered by any acceptance criterion. You should:**  
<sub>JR-STORY-002 &middot; junior &middot; Performance Review matrix &middot; Verification of a story, in strict accordance with its acceptance criteria</sub>

- a) Raise the gap with the product owner before deciding whether it is a defect **(correct)**
- b) Report it as a defect immediately
- c) Ignore it
- d) Change the acceptance criteria yourself

> An uncovered behaviour is first a requirements gap. Whether it becomes a defect depends on the intent, which the product owner holds.

---

## Variant 43

**1. Compatibility testing in ISO 25010 covers:**  
<sub>TA-Q-004 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Co-existence with other software and interoperability with other systems **(correct)**
- b) Response time under load
- c) Fault tolerance
- d) Code readability

> Co-existence defects (two apps fighting over a port or a driver) are routinely missed because each product is tested alone.

**2. A hard refresh (Ctrl+Shift+R) differs from a normal refresh because it:**  
<sub>TR-BROW-004 &middot; trainee &middot; Performance Review matrix &middot; Web browser architecture (cookies, localstorage, etc.)</sub>

- a) Bypasses the browser cache and re-downloads resources **(correct)**
- b) Clears all cookies
- c) Restarts the browser
- d) Opens the page in a new tab

> Hard refresh ignores cached assets. It is the first thing to try when a fix is deployed but the old bundle is still being served.

**3. The core idea of continuous integration is that:**  
<sub>JR-CI-001 &middot; junior &middot; Performance Review matrix &middot; Continuous integration systems</sub>

- a) Changes are merged and verified automatically and frequently **(correct)**
- b) Code is deployed to production every hour
- c) Testers no longer run manual tests
- d) Releases happen only at the end of a project

> CI is about integrating often and getting fast feedback. Continuous delivery and deployment are separate, later steps.

**4. During a presale call the customer asks for a firm testing price with almost no information. The strongest professional response is:**  
<sub>SR-PRE-001 &middot; senior &middot; Performance Review matrix &middot; Participation in presale activities (including communication with a customer)</sub>

- a) Offer a discovery phase, plus a ranged indication with the assumptions stated **(correct)**
- b) Quote a low figure to secure the deal
- c) Quote a very high figure to be safe
- d) Decline to answer

> A number given without a basis becomes an expectation you cannot meet, and the correction costs more trust than the delay would have.

**5. Accessibility testing should verify, at minimum:**  
<sub>TA-Q-005 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Keyboard operability, text alternatives and sufficient contrast **(correct)**
- b) Only screen reader support
- c) Only colour contrast
- d) Only font size

> WCAG covers perceivable, operable, understandable and robust. Testing only one of the four leaves the majority of barriers in place.

**6. Which test strategy is characterised by deriving tests from a formal model of the system?**  
<sub>TM-002 &middot; senior &middot; ISTQB Test Manager &middot; Writing a test plan</sub>

- a) Analytical / model-based strategy **(correct)**
- b) Reactive strategy
- c) Consultative strategy
- d) Regression-averse strategy

> CTAL-TM lists analytical, model-based, methodical, process-compliant, directed/consultative, regression-averse and reactive strategies. Most real projects blend several.

**7. A static analysis gate in CI is most valuable when it:**  
<sub>SR-SA-001 &middot; senior &middot; Performance Review matrix &middot; Ability to use tools for static code analysis</sub>

- a) Fails the build on new violations while tolerating the existing baseline **(correct)**
- b) Reports thousands of legacy warnings on every run
- c) Runs only before release
- d) Is advisory only

> Ratcheting on new code makes the gate actionable. A wall of legacy warnings trains everyone to ignore it.

**8. ISTQB Glossary: "shift left" is:**  
<sub>GL-J-012 &middot; junior &middot; ISTQB Glossary &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) An approach performing testing and quality activities earlier in the lifecycle **(correct)**
- b) Moving tests to another team
- c) Reducing test scope
- d) Testing in production

> It covers requirement reviews, static analysis, TDD and early integration, not just "test sooner".

**9. Planning poker reduces estimation bias mainly by:**  
<sub>MD-PEST-004 &middot; middle &middot; Performance Review matrix &middot; Estimation of time/cost of testing activities (epics, stories, bugs, testing types)</sub>

- a) Having estimators commit independently before discussion **(correct)**
- b) Averaging everyone number
- c) Letting the most senior person decide
- d) Using Fibonacci values

> Simultaneous reveal is the mechanism; the card values are just a scale. Anchoring is what it defends against.

**10. Exploratory testing is characterised by:**  
<sub>TR-TYPE-007 &middot; trainee &middot; Performance Review matrix &middot; Testing types and subtypes</sub>

- a) Simultaneous learning, test design and test execution **(correct)**
- b) Executing only pre-written test cases
- c) Running only automated checks
- d) Testing without any goal or timebox

> Exploratory testing is structured and accountable - usually timeboxed into charters and sessions - it simply designs the tests while running them.

**11. Which activity is part of test analysis rather than test design?**  
<sub>FL-1-004 &middot; junior &middot; ISTQB Foundation Level &middot; Phases of testing and Goals of testing</sub>

- a) Deciding WHAT to test by evaluating the test basis **(correct)**
- b) Deciding HOW to test by producing test cases
- c) Creating test data and test procedures
- d) Executing the test suite

> Analysis identifies testable features and defines test conditions. Design turns those conditions into test cases; implementation creates the concrete data and procedures.

**12. Root cause analysis of escaped defects is most useful when it produces:**  
<sub>MD-PROC-002 &middot; middle &middot; Performance Review matrix &middot; Analysis of testing process</sub>

- a) A process change that prevents the same class of defect **(correct)**
- b) A list of who made the mistake
- c) A longer regression suite
- d) A new metric

> RCA that ends in a name changes nothing. RCA that ends in a changed review, check or gate changes the outcome.

**13. ISTQB Glossary: "defect triage" is:**  
<sub>GL-M-010 &middot; middle &middot; ISTQB Glossary &middot; Defect management system/Project management system</sub>

- a) The process of assessing, prioritising and assigning reported defects **(correct)**
- b) The process of fixing defects
- c) The process of reproducing defects
- d) The process of closing defects

> Triage brings the roles with the necessary context together so priority reflects business reality.

**14. HTTPS differs from HTTP because it:**  
<sub>JR-HTTP-006 &middot; junior &middot; Performance Review matrix &middot; REST API and HTTP/HTTPS protocols</sub>

- a) Encrypts the traffic with TLS and authenticates the server certificate **(correct)**
- b) Is faster
- c) Uses a different HTML dialect
- d) Does not use cookies

> HTTPS provides confidentiality, integrity and server authentication. Testing it includes certificate validity, chain and mixed-content checks.

**15. A soak (endurance) test is designed to reveal:**  
<sub>MD-APERF-003 &middot; middle &middot; Performance Review matrix &middot; Automation of Performance/Load tests</sub>

- a) Memory leaks and resource exhaustion over time **(correct)**
- b) The maximum throughput
- c) The breaking point
- d) The cold start time

> Degradation that only appears after hours of steady traffic is invisible to a 10-minute load test.

**16. A developer types the wrong comparison operator; the program then computes a wrong total; the user sees an incorrect invoice. Match the terms.**  
<sub>FL-1-003 &middot; junior &middot; ISTQB Foundation Level &middot; Defect life cycle</sub>

- a) Error -> defect -> failure **(correct)**
- b) Failure -> defect -> error
- c) Defect -> error -> failure
- d) Error -> failure -> defect

> A human error introduces a defect in the code, and executing that defect may cause a failure that the user observes. Not every defect produces a failure.

**17. In risk-based testing, which activity does the Test Manager own?**  
<sub>TM-004 &middot; senior &middot; ISTQB Test Manager &middot; Risk management in testing</sub>

- a) Establishing and running the risk management process across the project **(correct)**
- b) Writing every test case
- c) Executing the regression suite
- d) Reviewing the source code

> The manager owns identification, analysis, mitigation planning and monitoring; the analysts supply the technical and domain judgement.

**18. A POST that successfully creates a resource should normally return:**  
<sub>JR-HTTP-004 &middot; junior &middot; Performance Review matrix &middot; REST API and HTTP/HTTPS protocols</sub>

- a) 201 Created with a Location header **(correct)**
- b) 200 OK with an empty body
- c) 204 No Content
- d) 302 Found

> 201 plus Location tells the client both that creation succeeded and where the new resource lives.

**19. Which is the best example of negative testing?**  
<sub>DP-T-008 &middot; trainee &middot; Practice-test style &middot; Testing types and subtypes</sub>

- a) Submitting a form with the email field set to "abc" **(correct)**
- b) Submitting a valid form
- c) Measuring the submit time
- d) Checking the button colour

> Negative testing supplies input the system should reject, and verifies that it rejects it gracefully.

**20. A new tool is proposed for the team. The most professional first step is to:**  
<sub>TR-NEWS-002 &middot; trainee &middot; Performance Review matrix &middot; Ability to keep up with news and trends</sub>

- a) Run a small, timeboxed pilot on a real task and compare it against the current tool **(correct)**
- b) Adopt it because it is popular
- c) Reject it because the current tool works
- d) Wait until the customer asks for it

> A bounded pilot produces evidence. Both blind adoption and blind rejection substitute opinion for evidence.

---

## Variant 44

**1. A service is unresponsive. Which single command gives the most immediate diagnostic value?**  
<sub>DP-M-015 &middot; middle &middot; Practice-test style &middot; Unix basics</sub>

- a) journalctl -u <service> -n 200 --no-pager (or tail on its log) **(correct)**
- b) ls -la /
- c) df -h
- d) whoami

> The recent log lines usually name the fault directly; disk and identity checks come after the log gives no answer.

**2. The most reliable indicator that a test process improvement worked is:**  
<sub>TM-027 &middot; senior &middot; ISTQB Test Manager &middot; Analysis of testing process</sub>

- a) A measured change in an outcome metric against the pre-change baseline **(correct)**
- b) Positive team sentiment
- c) More documentation produced
- d) A larger test suite

> Sentiment and volume both move for reasons unrelated to quality.

**3. Which HTML attribute is most commonly used by automated tests to locate an element reliably?**  
<sub>TR-HTML-001 &middot; trainee &middot; Performance Review matrix &middot; Webpage markup basics (HTML, CSS)</sub>

- a) A dedicated data-testid attribute **(correct)**
- b) The class attribute
- c) The inline style attribute
- d) The title attribute

> Classes and styles change whenever design changes. A dedicated test id is stable by contract, which is why teams add one specifically for automation.

**4. A single person is the only one who can run the performance suite. This is:**  
<sub>SR-ROLE-002 &middot; senior &middot; Performance Review matrix &middot; Distribution of roles within a test team</sub>

- a) A key-person risk that should be mitigated by cross-training **(correct)**
- b) Efficient specialisation to preserve
- c) A staffing budget issue
- d) Not a testing concern

> Bus factor one on a critical capability is a project risk and belongs in the risk register.

**5. Which question is most valuable to ask a prospect early?**  
<sub>SR-PRE-004 &middot; senior &middot; Performance Review matrix &middot; Participation in presale activities (including communication with a customer)</sub>

- a) What does a successful outcome look like to you in six months? **(correct)**
- b) Which tools do you use?
- c) How large is your team?
- d) What is your budget?

> The success definition is what lets you scope, price and later demonstrate value. Everything else is detail underneath it.

**6. ISTQB Glossary: a "test case" consists of:**  
<sub>GL-T-003 &middot; trainee &middot; ISTQB Glossary &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) Preconditions, inputs, actions, expected results and postconditions **(correct)**
- b) A list of features to test
- c) A summary of testing performed
- d) The schedule for a test level

> The postcondition is the part most often omitted, and its absence is why cases leave the system in a state that breaks the next case.

**7. Which coverage is achieved when every statement in the code has been executed at least once?**  
<sub>FL-4-003 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) Statement coverage **(correct)**
- b) Branch coverage
- c) Decision coverage
- d) Path coverage

> 100% branch coverage implies 100% statement coverage, but not the other way around: a lone if with no else reaches every statement without taking the false branch.

**8. Which is a defining characteristic of a NoSQL document store such as MongoDB?**  
<sub>JR-DB-004 &middot; junior &middot; Performance Review matrix &middot; Database basics (SQL/NoSQL)</sub>

- a) Schema-flexible documents rather than fixed relational tables **(correct)**
- b) Strict foreign key enforcement
- c) Support for SQL joins only
- d) Data must be normalised to third normal form

> Document stores trade rigid schema and joins for flexibility and horizontal scale, which changes what a tester must check about data consistency.

**9. Given {"user": {"roles": ["admin", "qa"]}}, which JSONPath selects the second role?**  
<sub>MD-JSON-004 &middot; middle &middot; Performance Review matrix &middot; JSON</sub>

- a) $.user.roles[1] **(correct)**
- b) $.user.roles[2]
- c) $.roles[1]
- d) $.user[roles][1]

> JSONPath arrays are zero-indexed, so index 1 is the second element.

**10. Which factor most increases a testing estimate for the same feature set?**  
<sub>MD-PROJ-003 &middot; middle &middot; Performance Review matrix &middot; Estimation of time/cost of testing activities (full project, team tasks)</sub>

- a) A regulated domain requiring evidence and traceability **(correct)**
- b) A larger monitor
- c) A newer test tool
- d) More frequent stand-ups

> Compliance overhead - documented evidence, sign-offs, audit trails - can double the cost of identical functional coverage.

**11. Which status code is correct when a request is well-formed but fails business validation?**  
<sub>JR-HTTP-007 &middot; junior &middot; Performance Review matrix &middot; REST API and HTTP/HTTPS protocols</sub>

- a) 422 Unprocessable Content (or 400 Bad Request) **(correct)**
- b) 500 Internal Server Error
- c) 404 Not Found
- d) 204 No Content

> Returning 500 for a validation failure hides a client mistake behind a server-fault code and pollutes error monitoring.

**12. Why must a mobile tester care about the app being sent to the background?**  
<sub>TR-MOB-004 &middot; trainee &middot; Performance Review matrix &middot; Mobile technologies and platforms</sub>

- a) The OS may kill or restore the process, and unsaved state is often lost **(correct)**
- b) Backgrounding is impossible on modern phones
- c) It only affects battery consumption
- d) It only matters for games

> Android and iOS both reclaim memory from backgrounded apps. State restoration bugs are among the most common and most user-visible mobile defects.

**13. Verifying "in strict accordance with acceptance criteria" means the tester:**  
<sub>JR-STORY-003 &middot; junior &middot; Performance Review matrix &middot; Verification of a story, in strict accordance with its acceptance criteria</sub>

- a) Checks every criterion explicitly and records the result per criterion **(correct)**
- b) Tests whatever seems risky
- c) Runs only the regression suite
- d) Relies on the developer demo

> Per-criterion evidence is what makes acceptance auditable and what stops "we thought that was covered" at release time.

**14. A shopping cart keeps items for 30 days. The most valuable boundary tests are around:**  
<sub>TA-A-002 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Day 29, 30 and 31 of item age **(correct)**
- b) Day 1 only
- c) Day 15 only
- d) Item price

> The retention rule is the specification; its boundary is where the off-by-one lives, usually in a timezone-sensitive comparison.

**15. A user sees a 502 Bad Gateway. This most likely means:**  
<sub>DP-J-008 &middot; junior &middot; Practice-test style &middot; Architecture and structure of web apps</sub>

- a) An upstream server gave an invalid response to the proxy **(correct)**
- b) The user entered a wrong URL
- c) The browser cache is stale
- d) The request body was malformed

> 502 is a proxy-level fault: the gateway reached the upstream but got something it could not use.

**16. Which is an experience-based test technique?**  
<sub>FL-4-006 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) Exploratory testing **(correct)**
- b) Boundary value analysis
- c) Decision table testing
- d) Branch testing

> CTFL v4 lists error guessing, exploratory testing and checklist-based testing as the experience-based techniques.

**17. A system integrates with five external services. The highest-value analyst-designed tests are around:**  
<sub>STA-010 &middot; senior &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Failure modes of each integration: timeout, malformed response, partial failure **(correct)**
- b) The happy path of each integration
- c) The UI of the integration screen
- d) The logging format

> Happy paths are usually exercised by everyone. Nobody exercises the timeout until production does.

**18. What does "grep -i -c error app.log" return?**  
<sub>MD-UNIX-002 &middot; middle &middot; Performance Review matrix &middot; Unix basics</sub>

- a) The count of lines containing "error", case-insensitively **(correct)**
- b) The matching lines only
- c) The first matching line
- d) The file size

> -i ignores case, -c prints the count instead of the lines.

**19. The most useful daily status report from a tester contains:**  
<sub>TR-DAY-001 &middot; trainee &middot; Performance Review matrix &middot; Creating reports about tasks accomplished during a day/a week/a month</sub>

- a) What was tested, results, blockers and what is planned next **(correct)**
- b) The number of hours worked
- c) A list of all open defects in the project
- d) A copy of the test plan

> A status report exists so that someone else can make a decision. Progress, results, blockers and the next step are the four things a decision needs.

**20. A false positive in testing is:**  
<sub>TA-D-002 &middot; middle &middot; ISTQB Test Analyst &middot; Defect management system/Project management system</sub>

- a) A reported defect that turns out not to be a defect in the product **(correct)**
- b) A defect the tool failed to find
- c) A defect fixed twice
- d) A defect in the test environment

> A high false-positive rate erodes developer trust in the test suite faster than almost anything else.

---

## Variant 45

**1. A system accepts amounts from 100 to 999. Using three-value boundary value analysis on the lower boundary, the values are:**  
<sub>FL-4-002 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) 99, 100, 101 **(correct)**
- b) 100, 101, 102
- c) 98, 99, 100
- d) 99, 100, 999

> The three-value approach takes the boundary and its neighbours on both sides.

**2. A state transition table is particularly good at exposing:**  
<sub>TA-T-005 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Invalid transitions that the specification never mentioned **(correct)**
- b) Performance bottlenecks
- c) Memory leaks
- d) Coding standard violations

> The table forces every state/event pair to be considered, including the ones the specification silently ignored.

**3. Given/When/Then is a common format for acceptance criteria because it:**  
<sub>JR-AC-005 &middot; junior &middot; Performance Review matrix &middot; Acceptance criteria/Definition of Done</sub>

- a) Forces a precondition, an action and an observable outcome **(correct)**
- b) Is required by Scrum
- c) Makes stories shorter
- d) Can only be used with automation tools

> The three clauses map directly onto precondition, step and expected result, which is why they translate so cleanly into test cases.

**4. ISTQB Glossary: "validation" is confirmation that:**  
<sub>GL-J-003 &middot; junior &middot; ISTQB Glossary &middot; Verification & Validation</sub>

- a) Requirements for a specific intended use or application have been fulfilled **(correct)**
- b) A work product matches its specification
- c) The code compiles
- d) A defect has been fixed

> Verification checks conformity to a specification; validation checks fitness for the intended use.

**5. A defect report must always let a reader answer one question above all others:**  
<sub>TR-REP-002 &middot; trainee &middot; Performance Review matrix &middot; Creating defect reports (in English)</sub>

- a) How do I reproduce this? **(correct)**
- b) Who is to blame?
- c) How long will the fix take?
- d) Which sprint is it in?

> Reproducibility is the report core value. Everything else is metadata that can be added later.

**6. The most reliable input to a testing estimate is:**  
<sub>MD-PEST-002 &middot; middle &middot; Performance Review matrix &middot; Estimation of time/cost of testing activities (epics, stories, bugs, testing types)</sub>

- a) Historical actuals from comparable work in the same context **(correct)**
- b) Management expectation
- c) The developer estimate multiplied by a fixed factor
- d) A round number that sounds credible

> Calibration against your own past data beats every rule of thumb, because it silently includes your team overheads.

**7. Effective feedback to a team member is:**  
<sub>SR-PM-002 &middot; senior &middot; Performance Review matrix &middot; Managing team members (no less than 2 people)</sub>

- a) Specific, timely, about observable behaviour and its impact **(correct)**
- b) General and delivered annually
- c) Given in front of the team
- d) Focused on personality

> Behaviour plus impact is actionable; personality is not, and the person cannot do anything with it.

**8. A feature passes all functional tests but users abandon it at a specific step. The most appropriate next investigation is:**  
<sub>STA-004 &middot; senior &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Usability evaluation of that step with real users or task analysis **(correct)**
- b) More functional test cases
- c) Performance testing
- d) Static analysis

> The functional oracle is satisfied; the failure is in appropriateness and usability, which functional tests cannot observe.

**9. Checklist-based testing is an experience-based technique whose main weakness is:**  
<sub>TA-T-007 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Coverage varies with the tester, and checklists go stale **(correct)**
- b) It cannot be documented
- c) It is too slow
- d) It requires source code

> Checklists must be maintained from real findings, otherwise they encode the risks of three years ago.

**10. An API returns "created_at": "2026-03-15T02:30:00" with no timezone. Why is this a defect?**  
<sub>DP-M-003 &middot; middle &middot; Practice-test style &middot; JSON</sub>

- a) The client cannot know the offset, so the same value renders differently per user **(correct)**
- b) JSON forbids date strings
- c) The format is too long
- d) It should be a number

> Missing offsets are one of the most common and most under-reported API contract defects.

**11. Which is a black-box test technique?**  
<sub>FL-4-001 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) Equivalence partitioning **(correct)**
- b) Statement testing
- c) Branch testing
- d) Decision testing

> Statement, branch and decision testing are white-box: they need the code structure. Equivalence partitioning works from the specification.

**12. The IDEAL model for process improvement stands for:**  
<sub>TM-014 &middot; senior &middot; ISTQB Test Manager &middot; Optimization of testing process</sub>

- a) Initiating, Diagnosing, Establishing, Acting, Learning **(correct)**
- b) Identify, Design, Execute, Analyse, Log
- c) Investigate, Decide, Evaluate, Adjust, Leave
- d) Improve, Deliver, Estimate, Assess, Learn

> The Learning phase is the one most often skipped, which is why organisations repeat the same improvement cycle.

**13. When you do not yet know the cause of a defect, the honest phrasing in a customer-facing update is:**  
<sub>JR-ENGW-003 &middot; junior &middot; Performance Review matrix &middot; Writing test documentation/emails to a customer</sub>

- a) We are investigating and will confirm the root cause by end of day **(correct)**
- b) It is a back-end problem
- c) Nothing serious, it will fix itself
- d) The developers are looking into their mistake

> Commit to a time for the next update rather than to a cause you have not established.

**14. A burndown of open defects that is flat while the defect find rate falls most likely indicates:**  
<sub>MD-MET-005 &middot; middle &middot; Performance Review matrix &middot; Testing metrics</sub>

- a) Fixing capacity, not test capacity, is the bottleneck **(correct)**
- b) The product is ready to release
- c) Testing has stopped
- d) The metric is wrong

> Reading two metrics together turns a chart into a diagnosis. Either one alone is ambiguous.

**15. An age field accepts 18 to 65 inclusive. Which value is a valid equivalence-class representative?**  
<sub>TR-TDT-007 &middot; trainee &middot; Performance Review matrix &middot; Test design techniques</sub>

- a) 30 **(correct)**
- b) 17
- c) 66
- d) -1

> 30 sits inside the valid partition. 17, 66 and -1 all belong to invalid partitions.

**16. Which of the following belongs in a test plan rather than in a test case?**  
<sub>TR-ART-005 &middot; trainee &middot; Performance Review matrix &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) Entry and exit criteria for the test phase **(correct)**
- b) The exact value typed into the login field
- c) The expected HTTP status code
- d) The precondition that a user account exists

> Entry/exit criteria, scope, schedule, environments and risks are planning-level concerns. Concrete data and expected results live in test cases.

**17. Which wait strategy produces the most reliable UI tests?**  
<sub>MD-AWEB-002 &middot; middle &middot; Performance Review matrix &middot; Automation of WEB UI (functional) tests</sub>

- a) Explicit waits on a specific expected condition **(correct)**
- b) Fixed Thread.sleep calls
- c) Implicit waits set globally to a large value
- d) No waits at all

> Explicit conditions state what you are waiting for, so the test fails with a meaningful message instead of after an arbitrary timeout.

**18. In written test documentation, the preferred style for steps is:**  
<sub>JR-ENGW-002 &middot; junior &middot; Performance Review matrix &middot; Writing test documentation/emails to a customer</sub>

- a) Short imperative sentences: "Open the cart", "Enter 5 in Quantity" **(correct)**
- b) Long descriptive paragraphs
- c) Past tense narration
- d) Questions to the reader

> Imperative steps are unambiguous, scannable and translate directly into automation.

**19. ISTQB Glossary: "root cause" is:**  
<sub>GL-T-015 &middot; trainee &middot; ISTQB Glossary &middot; Defect life cycle</sub>

- a) A source of a defect such that removing it prevents recurrence of that defect type **(correct)**
- b) The failing line of code
- c) The first symptom observed
- d) The developer who introduced it

> The definition itself contains the test of a real root cause: removing it must stop the class from recurring.

**20. Risk-based test prioritisation breaks down when:**  
<sub>SR-RM-005 &middot; senior &middot; Performance Review matrix &middot; Risk management in testing</sub>

- a) Risk assessments are made once and never revisited as the product changes **(correct)**
- b) Risks are documented
- c) Stakeholders are involved
- d) Impact is estimated

> A stale risk model directs effort at last quarter product, which is indistinguishable from no risk model at all.

---

## Variant 46

**1. Exit criteria should be defined:**  
<sub>SR-TP-003 &middot; senior &middot; Performance Review matrix &middot; Writing a test plan</sub>

- a) Before execution starts, together with the stakeholders who will use them **(correct)**
- b) At the end, based on what was achieved
- c) By the test team alone
- d) Only for regulated projects

> Criteria written after the fact describe the outcome instead of governing it, and they cannot support a release argument.

**2. Which of the following is a typical objective of testing?**  
<sub>FL-1-001 &middot; junior &middot; ISTQB Foundation Level &middot; Phases of testing and Goals of testing</sub>

- a) Building confidence in the level of quality of the test object **(correct)**
- b) Removing all defects from the code
- c) Proving that the software is correct
- d) Guaranteeing zero production incidents

> CTFL lists evaluating work products, causing failures, ensuring coverage, reducing risk, complying with requirements and building confidence among the objectives. Proof of correctness is not among them.

**3. A requirement says: "The system shall lock the account after three consecutive failed login attempts." Which test is directly implied?**  
<sub>TR-ENG-001 &middot; trainee &middot; Performance Review matrix &middot; Can read and understand test documentation</sub>

- a) Fail login three times in a row and verify the account is locked **(correct)**
- b) Fail login twice and verify a warning email
- c) Log in successfully and verify the session length
- d) Verify the password reset link expires

> "Shall" marks a mandatory requirement. The condition (three consecutive failures) and the outcome (lock) map straight onto one test.

**4. Which pair correctly separates functional from non-functional testing?**  
<sub>TR-TYPE-003 &middot; trainee &middot; Performance Review matrix &middot; Testing types and subtypes</sub>

- a) Functional: what the system does. Non-functional: how well it does it **(correct)**
- b) Functional: manual. Non-functional: automated
- c) Functional: by testers. Non-functional: by developers
- d) Functional: before release. Non-functional: after release

> Functional testing checks behaviour against requirements; non-functional testing checks quality characteristics such as performance, usability, security and portability.

**5. Which is the strongest argument for keeping test cases short?**  
<sub>TR-DOC-004 &middot; trainee &middot; Performance Review matrix &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) Short cases fail for one identifiable reason **(correct)**
- b) Short cases are faster to type
- c) Short cases need no review
- d) Short cases can skip the expected result

> Diagnosability is the goal. A 40-step case that fails tells you almost nothing about where the product broke.

**6. Which factor most influences the level of detail in test conditions?**  
<sub>TA-P-002 &middot; middle &middot; ISTQB Test Analyst &middot; Planning of testing activities for specific tasks</sub>

- a) The level of risk and the intended reuse of the tests **(correct)**
- b) The number of testers
- c) The tool licence
- d) The sprint length

> High-risk, reusable and audited tests justify detail. Low-risk one-off exploration does not.

**7. Test coverage of 90% of requirements tells you:**  
<sub>MD-MET-004 &middot; middle &middot; Performance Review matrix &middot; Testing metrics</sub>

- a) Which requirements have at least one test, and nothing about test quality **(correct)**
- b) That 90% of defects were found
- c) That the product is 90% ready
- d) That 10% of the code is broken

> Coverage counts links, not rigour. A weak test still marks a requirement covered.

**8. A system has 4 boolean configuration flags and 3 user roles. Full combinatorial coverage requires 48 cases. Pairwise would need roughly:**  
<sub>TA-T-009 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Fewer than 15 **(correct)**
- b) Exactly 48
- c) Exactly 24
- d) More than 48

> Pairwise typically collapses such spaces by an order of magnitude while covering every pair of values at least once.

**9. Test progress reporting should communicate primarily:**  
<sub>FL-5-009 &middot; junior &middot; ISTQB Foundation Level &middot; Testing metrics</sub>

- a) Status against the plan, product risks and impediments **(correct)**
- b) How many hours each tester logged
- c) The number of defects each developer created
- d) The volume of documentation produced

> The purpose of a progress report is to support a decision by the stakeholders reading it.

**10. ISTQB Glossary: a "test oracle" is:**  
<sub>GL-J-004 &middot; junior &middot; ISTQB Glossary &middot; Phases of testing and Goals of testing</sub>

- a) A source to determine the expected result of a test **(correct)**
- b) A tool that generates test data
- c) A defect prediction model
- d) A test management system

> When no oracle exists, testing degrades into observing behaviour without being able to judge it - the oracle problem.

**11. A test that passes on 10 records and times out on 100,000 indicates:**  
<sub>SR-ALG-003 &middot; senior &middot; Performance Review matrix &middot; The basics of development and algorithms</sub>

- a) A scalability defect that must be reported with the volume that triggers it **(correct)**
- b) A test data problem only
- c) A flaky test
- d) Nothing, the volume is unrealistic

> The volume is only unrealistic until production reaches it. Report it with the threshold you measured.

**12. You are asked for an estimate on a story whose requirements are still unclear. The professional answer is:**  
<sub>JR-EST-002 &middot; junior &middot; Performance Review matrix &middot; Approximate estimation of time/cost to test a specific task/story</sub>

- a) Give a range with stated assumptions, or ask for a timeboxed spike first **(correct)**
- b) Give a single confident number
- c) Refuse to estimate
- d) Copy the estimate of a similar story

> A range communicates uncertainty honestly. A single number invented from an unclear requirement becomes a commitment you did not intend to make.

**13. In a shell pipeline, what does "2>&1" do?**  
<sub>MD-UNIX-005 &middot; middle &middot; Performance Review matrix &middot; Unix basics</sub>

- a) Redirects standard error into standard output **(correct)**
- b) Runs the command twice
- c) Redirects output to file 2
- d) Suppresses all output

> Without it, stderr bypasses the pipe and never reaches the next command or the log file.

**14. Which standard is commonly referenced for test documentation content?**  
<sub>TM-030 &middot; senior &middot; ISTQB Test Manager &middot; Development of test documentation</sub>

- a) ISO/IEC/IEEE 29119 **(correct)**
- b) ISO 9001 only
- c) IEEE 802.11
- d) ISO 14001

> 29119 replaced IEEE 829 as the reference for test process and documentation templates.

**15. Two weeks of testing are cut to one. The risk-based response is to:**  
<sub>MD-RISK-005 &middot; middle &middot; Performance Review matrix &middot; Risks in testing</sub>

- a) Cut coverage of the lowest-risk areas and report the resulting residual risk **(correct)**
- b) Cut the depth of every area equally
- c) Cut regression entirely
- d) Keep the plan and work overtime

> Uniform cuts damage high-risk coverage as much as low-risk coverage, which is the opposite of what a risk model is for.

**16. Why should a tester be able to query the database directly?**  
<sub>JR-DB-005 &middot; junior &middot; Performance Review matrix &middot; Database basics (SQL/NoSQL)</sub>

- a) To verify what the system actually stored, not just what the UI displays **(correct)**
- b) To fix production data
- c) To replace API testing
- d) To speed up the UI

> The UI can display a cached or transformed value. Direct verification separates a presentation defect from a persistence defect.

**17. ISTQB Glossary: "risk level" is determined by:**  
<sub>GL-M-002 &middot; middle &middot; ISTQB Glossary &middot; Risks in testing</sub>

- a) The combination of risk likelihood and risk impact **(correct)**
- b) The number of affected requirements
- c) The severity of related defects
- d) The time to fix

> Both factors are required; either alone produces a ranking that misallocates effort.

**18. Interoperability testing between your system and a partner system should prioritise:**  
<sub>STA-016 &middot; senior &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Data format, versioning and error semantics at the boundary **(correct)**
- b) The partner internal code quality
- c) Your own UI
- d) The partner staffing

> The contract at the boundary is the only thing both sides can be held to.

**19. What does "shift right" mean in a testing context?**  
<sub>JR-SDLC-005 &middot; junior &middot; Performance Review matrix &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) Extending quality activities into production: monitoring, canaries, real-user feedback **(correct)**
- b) Moving all testing to the end of the project
- c) Handing testing to developers
- d) Delaying the release

> Shift right complements shift left: some failures only appear under real traffic, real data and real infrastructure.

**20. ISTQB Glossary: "test execution" is:**  
<sub>GL-T-005 &middot; trainee &middot; ISTQB Glossary &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) The process of running a test on the component or system under test **(correct)**
- b) The process of designing tests
- c) The process of writing a test plan
- d) The process of reporting defects

> Execution produces actual results, which are then compared with the expected results.

---

## Variant 47

**1. Which is a benefit of static testing that dynamic testing cannot offer?**  
<sub>FL-3-001 &middot; junior &middot; ISTQB Foundation Level &middot; Requirements testing</sub>

- a) Defects can be found before any code is executable **(correct)**
- b) Failures are observed under real load
- c) Response times are measured
- d) Memory leaks are detected

> Static testing examines work products without executing them, which is why it can start on a requirements draft.

**2. Why is early testing (shift left) valuable?**  
<sub>JR-PH-004 &middot; junior &middot; Performance Review matrix &middot; Phases of testing and Goals of testing</sub>

- a) Defects found in requirements cost far less to fix than defects found in production **(correct)**
- b) It reduces the number of testers needed
- c) It removes the need for regression testing
- d) It guarantees on-time delivery

> The cost of a defect rises steeply with the phase in which it is found, which is why review of requirements is among the highest-return testing activities.

**3. What does the CSS selector ".btn.primary" match?**  
<sub>TR-HTML-002 &middot; trainee &middot; Performance Review matrix &middot; Webpage markup basics (HTML, CSS)</sub>

- a) Elements that have both the btn and primary classes **(correct)**
- b) Elements with the btn class inside elements with the primary class
- c) Elements with either class
- d) An element with id btn and class primary

> Chained class selectors with no space mean "all of these classes on the same element". A space would mean a descendant relationship.

**4. A reactive test strategy is appropriate when:**  
<sub>TM-003 &middot; senior &middot; ISTQB Test Manager &middot; Writing a test plan</sub>

- a) The test basis is poor or unavailable and feedback must be fast **(correct)**
- b) The system is safety critical with a full specification
- c) Regulatory evidence is required
- d) The product is stable and unchanged

> Reactive strategies (exploratory, defect-based) respond to the system as delivered rather than to a document that does not exist.

**5. Which statement belongs in a customer-facing quality assessment?**  
<sub>MD-CREP-002 &middot; middle &middot; Performance Review matrix &middot; Creating test reports which include the evaluation of the product quality</sub>

- a) Checkout and payment are stable; reporting has 3 open major defects affecting export **(correct)**
- b) We executed 412 test cases
- c) Two testers were on holiday
- d) The build server was slow on Tuesday

> Name the areas, their state and the concrete risk. Internal logistics do not belong in a quality assessment.

**6. ISTQB Glossary: "retesting" (confirmation testing) means:**  
<sub>GL-T-004 &middot; trainee &middot; ISTQB Glossary &middot; Testing types and subtypes</sub>

- a) Testing that runs test cases that failed the last time, to verify a fix **(correct)**
- b) Testing unchanged areas after a change
- c) Running the whole suite again
- d) Testing by a second tester

> Retesting targets the fix; regression testing targets the neighbourhood of the fix.

**7. When a specification is missing entirely, the most defensible approach is:**  
<sub>TA-A-009 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) Exploratory testing under charters, plus documenting the discovered behaviour as a draft oracle **(correct)**
- b) Not testing at all
- c) Testing only what the developer describes
- d) Waiting indefinitely

> The session output becomes the first version of the specification, which is a deliverable in its own right.

**8. Which item belongs in the test plan rather than in the test strategy?**  
<sub>SR-TP-004 &middot; senior &middot; Performance Review matrix &middot; Writing a test plan</sub>

- a) The specific environments and schedule for this release **(correct)**
- b) The organisation-wide approach to automation
- c) The general defect classification scheme
- d) The company testing policy

> Strategy is organisation-level and durable; the plan is project-level and time-bound.

**9. ISTQB Glossary: "component testing" is also known as:**  
<sub>GL-J-013 &middot; junior &middot; ISTQB Glossary &middot; Levels of testing</sub>

- a) Unit testing or module testing **(correct)**
- b) System testing
- c) Acceptance testing
- d) Integration testing

> The three names describe the same test level; different communities inherited different vocabulary.

**10. Which technique is BEST for testing an order that moves through Created, Paid, Shipped and Delivered?**  
<sub>FL-4-005 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) State transition testing **(correct)**
- b) Equivalence partitioning
- c) Decision table testing
- d) Statement testing

> The behaviour depends on the current state and the event, which is exactly what a state transition model captures - including the invalid transitions worth testing.

**11. A monthly report for a customer should be written:**  
<sub>TR-DAY-004 &middot; trainee &middot; Performance Review matrix &middot; Creating reports about tasks accomplished during a day/a week/a month</sub>

- a) In terms of product quality and risk, not raw tester activity **(correct)**
- b) As a list of every executed test case
- c) As a copy of the daily reports concatenated
- d) Only in bullet points with no numbers

> A customer buys confidence in the product. Activity logs answer a question they did not ask.

**12. ISTQB Glossary: "test strategy" describes:**  
<sub>GL-M-009 &middot; middle &middot; ISTQB Glossary &middot; Writing a test plan</sub>

- a) The generalised approach to testing, usually at organisation or programme level **(correct)**
- b) The schedule of a single test level
- c) The list of test cases
- d) The environment configuration

> The project-specific instantiation is the test plan; the reason for testing at all is the test policy.

**13. The "pesticide paradox" states that:**  
<sub>JR-PRIN-001 &middot; junior &middot; Performance Review matrix &middot; Principles of testing</sub>

- a) Repeating the same tests eventually stops finding new defects **(correct)**
- b) Defects cluster in a few modules
- c) Testing cannot prove the absence of defects
- d) Early testing saves money

> Test suites lose yield over time and must be reviewed and extended. It is the principle that justifies rotating and refreshing regression suites.

**14. A Test Analyst notices that the test basis is untestable in several places. The correct action is:**  
<sub>TA-P-004 &middot; middle &middot; ISTQB Test Analyst &middot; Analysis of testing process</sub>

- a) Raise the issues as defects in the test basis before test design starts **(correct)**
- b) Design tests anyway and interpret freely
- c) Wait for the code and test against it
- d) Escalate to the customer directly

> Reporting test-basis defects is one of the highest-value activities the analyst performs, and it must happen before design effort is spent.

**15. When estimating a bug fix verification, you should include:**  
<sub>MD-PEST-003 &middot; middle &middot; Performance Review matrix &middot; Estimation of time/cost of testing activities (epics, stories, bugs, testing types)</sub>

- a) Retest of the fix plus regression around the affected area **(correct)**
- b) Retest of the fix only
- c) The developer fixing time
- d) Nothing, it is negligible

> The regression radius, not the retest, is the part that varies from ten minutes to two days.

**16. Which of these is a valid reason to mark a defect as Duplicate?**  
<sub>TR-LIFE-006 &middot; trainee &middot; Performance Review matrix &middot; Defect life cycle</sub>

- a) Another open report describes the same root behaviour **(correct)**
- b) The defect has low severity
- c) The defect was reported by a junior tester
- d) The defect is hard to reproduce

> Duplicate means the same underlying defect is already tracked. Link the two so the history stays connected.

**17. Which is the strongest argument for tracking escaped defects by root cause?**  
<sub>TM-032 &middot; senior &middot; ISTQB Test Manager &middot; Testing metrics</sub>

- a) It shows which process gate is failing and where to invest next **(correct)**
- b) It identifies which tester missed them
- c) It reduces the defect count
- d) It satisfies the customer

> Root cause by gate turns a defect list into an improvement backlog.

**18. The difference between load testing and stress testing is that stress testing:**  
<sub>MD-APERF-001 &middot; middle &middot; Performance Review matrix &middot; Automation of Performance/Load tests</sub>

- a) Pushes the system beyond its expected capacity to find the breaking point **(correct)**
- b) Uses the expected number of users
- c) Runs for a long duration at normal load
- d) Measures only response time

> Load = expected volume; stress = beyond it; soak/endurance = normal load for a long time; spike = sudden jumps.

**19. What does the HTTP header "Content-Type: application/json" tell the server?**  
<sub>JR-HTTP-005 &middot; junior &middot; Performance Review matrix &middot; REST API and HTTP/HTTPS protocols</sub>

- a) The request body is JSON and should be parsed as such **(correct)**
- b) The response must be JSON
- c) The connection is encrypted
- d) The request is cacheable

> Accept is the header that states what the client wants back; Content-Type describes what is being sent.

**20. The difference between a stub and a mock is that a mock:**  
<sub>SR-UT-002 &middot; senior &middot; Performance Review matrix &middot; Writing unit tests</sub>

- a) Also verifies that the expected interactions occurred **(correct)**
- b) Is always slower
- c) Cannot return values
- d) Is used only in UI tests

> A stub supplies canned answers; a mock additionally asserts on how it was called. Over-mocking couples tests to implementation.

---

## Variant 48

**1. ISTQB Glossary: "test process improvement" refers to:**  
<sub>GL-M-012 &middot; middle &middot; ISTQB Glossary &middot; Optimization of testing process</sub>

- a) A programme to improve the quality and efficiency of testing activities **(correct)**
- b) Adding more test cases
- c) Buying a new test tool
- d) Increasing the size of the test team

> TMMi and TPI Next are the two most widely used reference models for it.

**2. ISTQB Glossary: "test harness" means:**  
<sub>GL-J-005 &middot; junior &middot; ISTQB Glossary &middot; Levels of testing</sub>

- a) A test environment comprising stubs and drivers needed to execute a test **(correct)**
- b) The test management tool
- c) The defect tracker
- d) The CI server

> The harness is what makes a component executable outside its real surroundings.

**3. Which metric best supports a release decision?**  
<sub>FL-5-005 &middot; junior &middot; ISTQB Foundation Level &middot; Testing metrics</sub>

- a) Residual risk expressed through coverage of high-risk areas and open defects by severity **(correct)**
- b) Total number of test cases written
- c) Number of hours spent testing
- d) Number of testers on the team

> A release decision is a risk decision. Effort and volume metrics describe the test team, not the product.

**4. Test-driven development influences design because:**  
<sub>SR-UT-004 &middot; senior &middot; Performance Review matrix &middot; Writing unit tests</sub>

- a) Code that is hard to test tends to get refactored towards looser coupling **(correct)**
- b) It removes the need for design
- c) It guarantees no defects
- d) It replaces integration testing

> The design pressure is the main long-term benefit; the tests themselves are a valuable by-product.

**5. Residual risk means:**  
<sub>MD-RISK-004 &middot; middle &middot; Performance Review matrix &middot; Risks in testing</sub>

- a) The risk that remains after the planned mitigation has been applied **(correct)**
- b) A risk nobody identified
- c) A risk that already occurred
- d) A risk with zero impact

> Communicating residual risk honestly at release time is the single most valuable thing a test report does.

**6. Which is the most appropriate opening for an email to a customer reporting a release risk?**  
<sub>JR-ENGW-001 &middot; junior &middot; Performance Review matrix &middot; Writing test documentation/emails to a customer</sub>

- a) We found an issue in the payment flow that may affect Friday release. Details and options below. **(correct)**
- b) Hi! Bad news again...
- c) The developers broke payments once more.
- d) FYI, there might be something wrong somewhere.

> State the subject, the impact and the fact that options follow. Blame and vagueness both cost the reader time and cost you credibility.

**7. A user story says "As an admin I want to export users so that I can analyse them". The most important missing information for a Test Analyst is:**  
<sub>TA-A-003 &middot; middle &middot; ISTQB Test Analyst &middot; Requirements testing</sub>

- a) The acceptance criteria: format, fields, volume limits and permissions **(correct)**
- b) The developer assigned
- c) The story point estimate
- d) The sprint number

> Without those, any export satisfies the story, and any defect report about it is arguable.

**8. Test analysis effort is best invested where:**  
<sub>STA-022 &middot; senior &middot; ISTQB Test Analyst &middot; Optimization of testing process</sub>

- a) Risk is high and the test basis is weakest **(correct)**
- b) Requirements are clearest
- c) The code is newest
- d) The developers ask for it

> Clear requirements over low risk need the least analysis; the opposite corner needs the most.

**9. When automating a REST API, authentication tokens should be:**  
<sub>MD-AAPI-002 &middot; middle &middot; Performance Review matrix &middot; Automation of API tests</sub>

- a) Obtained at setup and injected from configuration or a secret store **(correct)**
- b) Hardcoded in the test file
- c) Committed to the repository
- d) Copied from the browser manually each run

> Hardcoded tokens expire, leak and break the suite for everyone else.

**10. Why does OOP knowledge matter for a manual tester moving toward automation?**  
<sub>JR-OOP-003 &middot; junior &middot; Performance Review matrix &middot; OOP principles</sub>

- a) Test frameworks are built from classes, inheritance and interfaces **(correct)**
- b) It is required to write a bug report
- c) It speeds up manual execution
- d) It replaces test design techniques

> Page Objects, base test classes, fixtures and custom assertions are all straightforward OOP once the four pillars are understood.

**11. What does the status "Deferred" mean?**  
<sub>TR-LIFE-003 &middot; trainee &middot; Performance Review matrix &middot; Defect life cycle</sub>

- a) The defect is real but its fix is postponed to a later release **(correct)**
- b) The defect could not be reproduced
- c) The defect duplicates an existing one
- d) The defect was fixed but not yet verified

> Deferred is an explicit business decision to carry a known defect forward. It should always carry a target release or a review date.

**12. The alt attribute on an <img> exists primarily to:**  
<sub>TR-HTML-004 &middot; trainee &middot; Performance Review matrix &middot; Webpage markup basics (HTML, CSS)</sub>

- a) Describe the image for assistive technology and when the image fails to load **(correct)**
- b) Improve the image resolution
- c) Set the image width
- d) Cache the image

> alt is an accessibility and resilience feature. A missing or meaningless alt is a genuine, reportable accessibility defect.

**13. Reporting to a customer that "testing is 80% complete" is weak because:**  
<sub>TM-028 &middot; senior &middot; ISTQB Test Manager &middot; Creating reports about your team's completed work during a month/sprint/release</sub>

- a) Percentage of executed cases says nothing about risk covered or defects open **(correct)**
- b) It is too precise
- c) It should be a fraction
- d) Customers dislike percentages

> Eighty percent of the cases can leave one hundred percent of the highest risk untested.

**14. Which of these is the best expected result for a login test?**  
<sub>DP-T-005 &middot; trainee &middot; Practice-test style &middot; Test case/checklist/test scenario/test plan/bug/bug report</sub>

- a) The user is redirected to /dashboard and the header shows their name **(correct)**
- b) Login works
- c) No errors appear
- d) The page loads

> A verifiable, observable outcome. "Works" cannot be failed by anyone but its author.

**15. Escaped defects are concentrated in integrations with third-party services. The most effective analyst response is:**  
<sub>TA-A-004 &middot; middle &middot; ISTQB Test Analyst &middot; Analysis of testing process</sub>

- a) Add contract and negative tests around those integrations and their failure modes **(correct)**
- b) Add more UI end-to-end tests
- c) Increase the size of the regression suite
- d) Increase exploratory time uniformly

> Target the mitigation at the observed cluster. Uniform increases spend effort where defects are not.

**16. Which acceptance criterion is untestable as written?**  
<sub>JR-AC-003 &middot; junior &middot; Performance Review matrix &middot; Acceptance criteria/Definition of Done</sub>

- a) The page should load reasonably fast **(correct)**
- b) The page loads within 2 seconds on a 4G connection
- c) An error message is shown when the email is invalid
- d) The user is redirected to /dashboard after login

> "Reasonably fast" has no oracle. A criterion that two people can read differently will be disputed at exactly the wrong moment.

**17. Testing a database migration should always include:**  
<sub>MD-ADB-003 &middot; middle &middot; Performance Review matrix &middot; Automated DB testing</sub>

- a) A rollback path and a check on existing production-like data **(correct)**
- b) Only the forward migration on an empty schema
- c) Only a syntax check
- d) Only performance measurement

> Migrations fail on real data, not on empty schemas, and a migration without a tested rollback is an unrecoverable deployment.

**18. Keeping up with trends is part of the Performance Review because:**  
<sub>TR-NEWS-004 &middot; trainee &middot; Performance Review matrix &middot; Ability to keep up with news and trends</sub>

- a) Testing practice and tooling change, and stale practice quietly lowers quality **(correct)**
- b) Certificates are collected for their own sake
- c) Managers need something to measure
- d) It replaces hands-on experience

> The competency exists to keep practice current. It is assessed by what a tester brings back into the team, not by how many articles they read.

**19. Collaboration-based test approaches such as ATDD produce:**  
<sub>FL-4-009 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) Test cases derived collaboratively from user stories and acceptance criteria **(correct)**
- b) Only automated unit tests
- c) Only performance tests
- d) Only exploratory charters

> Acceptance test-driven development turns the three-amigos conversation into concrete acceptance tests before the code is written.

**20. The most persuasive presale material for a QA service is usually:**  
<sub>SR-PRE-002 &middot; senior &middot; Performance Review matrix &middot; Participation in presale activities (including communication with a customer)</sub>

- a) A relevant case study with the problem, approach and measured outcome **(correct)**
- b) A list of tools
- c) The team size
- d) The number of years in business

> Buyers are matching your evidence against their own problem. Tool lists say nothing about outcomes.

---

## Variant 49

**1. A pass rate of 100% on a suite that has not changed in a year most likely means:**  
<sub>STA-019 &middot; senior &middot; ISTQB Test Analyst &middot; Testing metrics</sub>

- a) The suite has stopped providing information **(correct)**
- b) The product is defect-free
- c) The tests are excellent
- d) Coverage is complete

> This is the pesticide paradox observed in the metric: a suite that never fails is no longer a test, it is a ritual.

**2. ISTQB Glossary: a "defect" is best defined as:**  
<sub>GL-T-002 &middot; trainee &middot; ISTQB Glossary &middot; Defect life cycle</sub>

- a) An imperfection in a work product that may cause it to fail to meet its requirements **(correct)**
- b) The observed incorrect behaviour
- c) A human action producing an incorrect result
- d) A failed test case

> A defect can exist for years without ever causing a failure, if the code path is never executed with the triggering data.

**3. A Test Analyst evaluating a test data preparation tool should weigh most heavily:**  
<sub>TA-X-001 &middot; middle &middot; ISTQB Test Analyst &middot; Automation of API tests</sub>

- a) Whether it can produce realistic, referentially consistent data at volume **(correct)**
- b) Its user interface colours
- c) Its licence popularity
- d) Whether it is open source

> Data that violates referential integrity produces test failures that teach the team to ignore failures.

**4. The difference between load testing and stress testing is that stress testing:**  
<sub>MD-APERF-001 &middot; middle &middot; Performance Review matrix &middot; Automation of Performance/Load tests</sub>

- a) Pushes the system beyond its expected capacity to find the breaking point **(correct)**
- b) Uses the expected number of users
- c) Runs for a long duration at normal load
- d) Measures only response time

> Load = expected volume; stress = beyond it; soak/endurance = normal load for a long time; spike = sudden jumps.

**5. The main testing drawback of a pure Waterfall model is that:**  
<sub>JR-SDLC-004 &middot; junior &middot; Performance Review matrix &middot; Software development life cycle/Methodologies/Frameworks</sub>

- a) Testing starts late, so defects are found when they are most expensive **(correct)**
- b) Testing is impossible
- c) There is no documentation to test against
- d) Requirements are never written

> Waterfall front-loads specification and back-loads verification, which is exactly the wrong shape for defect economics.

**6. Branch coverage of 100% guarantees:**  
<sub>FL-4-011 &middot; junior &middot; ISTQB Foundation Level &middot; Test design techniques</sub>

- a) 100% statement coverage **(correct)**
- b) 100% path coverage
- c) No defects remain
- d) All requirements are covered

> Branch coverage subsumes statement coverage. Path coverage is strictly stronger than both and is usually infeasible.

**7. Which trend is the strongest early warning in a release report?**  
<sub>SR-TR-002 &middot; senior &middot; Performance Review matrix &middot; Creating reports about your team's completed work during a month/sprint/release</sub>

- a) Defect arrival rate that has not yet flattened **(correct)**
- b) Total defect count
- c) Number of test cases executed
- d) Hours logged

> A non-saturating arrival curve says discovery is incomplete, whatever the absolute counts look like.

**8. Which risk response is being applied when a team buys a device cloud rather than maintaining its own device lab?**  
<sub>SR-RM-004 &middot; senior &middot; Performance Review matrix &middot; Risk management in testing</sub>

- a) Transfer **(correct)**
- b) Avoid
- c) Accept
- d) Exploit

> The operational risk moves to the supplier. The residual risk (supplier availability) should then be recorded.

**9. A story says "the user can filter results". Which is the most important question before testing?**  
<sub>DP-J-004 &middot; junior &middot; Practice-test style &middot; Acceptance criteria/Definition of Done</sub>

- a) Filter by what, with what combination behaviour and what default? **(correct)**
- b) Which colour is the filter button?
- c) Who implemented it?
- d) When will it be released?

> Without the filter set and its combination semantics, no expected result can be stated.

**10. Which of the following makes a defect report harder, not easier, to act on?**  
<sub>TR-REP-006 &middot; trainee &middot; Performance Review matrix &middot; Creating defect reports (in English)</sub>

- a) Reporting three unrelated problems in one ticket **(correct)**
- b) Numbering the reproduction steps
- c) Stating the expected result explicitly
- d) Adding the build number

> One defect per report. Bundled tickets cannot be assigned, prioritised, fixed or closed independently.

**11. When designing a test documentation structure for a new project, the first decision should be:**  
<sub>MD-TDOC-001 &middot; middle &middot; Performance Review matrix &middot; Development of test documentation</sub>

- a) How much documentation the context and risk actually justify **(correct)**
- b) Which template the last project used
- c) Which tool the team prefers
- d) How many test cases to write per module

> A regulated medical product and an internal admin tool need different amounts of evidence. Copying a template skips that judgement.

**12. A story has five acceptance criteria. Four pass, one fails. The story should be:**  
<sub>JR-STORY-001 &middot; junior &middot; Performance Review matrix &middot; Verification of a story, in strict accordance with its acceptance criteria</sub>

- a) Returned to development as not done **(correct)**
- b) Accepted with a follow-up ticket
- c) Accepted because 80% passed
- d) Accepted if the failing criterion is cosmetic

> Acceptance criteria are a conjunction, not a score. Partial acceptance quietly redefines done for the whole team.

**13. Contract testing between two services primarily protects against:**  
<sub>MD-API-004 &middot; middle &middot; Performance Review matrix &middot; API</sub>

- a) One service changing its interface in a way that breaks its consumers **(correct)**
- b) Slow response times
- c) Database corruption
- d) UI layout regressions

> Contract tests give the fast, targeted feedback that a full end-to-end suite gives slowly and flakily.

**14. Two days before release, a critical defect is found in an area that was descoped as low risk. The right response is:**  
<sub>DP-M-006 &middot; middle &middot; Practice-test style &middot; Risks in testing</sub>

- a) Report it, reassess the risk model, and let the risk owner decide on the release **(correct)**
- b) Fix it quietly
- c) Delay the release unilaterally
- d) Close it as out of scope

> A miss in the risk model is information about the model. Concealing it removes the decision from the person who owns it.

**15. Which is NOT a typical goal of testing?**  
<sub>JR-PH-001 &middot; junior &middot; Performance Review matrix &middot; Phases of testing and Goals of testing</sub>

- a) Proving that the software has no defects **(correct)**
- b) Finding defects
- c) Reducing risk
- d) Providing information for decision making

> Testing can show the presence of defects but never their absence. A goal stated as "prove there are no bugs" is unachievable by definition.

**16. Which statement about risk-based testing is FALSE?**  
<sub>TM-026 &middot; senior &middot; ISTQB Test Manager &middot; Risk management in testing</sub>

- a) It guarantees that all high-risk defects will be found **(correct)**
- b) It allocates effort proportionally to risk
- c) It supports release decisions
- d) It requires periodic reassessment

> It improves the odds and makes the trade explicit; it does not remove the possibility of an escaped defect.

**17. Functional appropriateness, as a quality sub-characteristic, is about:**  
<sub>TA-Q-001 &middot; middle &middot; ISTQB Test Analyst &middot; Testing types and subtypes</sub>

- a) Whether the functions facilitate the accomplishment of the user tasks **(correct)**
- b) Whether the function returns the right value
- c) Whether all specified functions are present
- d) Whether the system is fast

> ISO 25010 splits functional suitability into completeness (all present), correctness (right results) and appropriateness (actually helps the task).

**18. Which of the following is a NON-functional test type?**  
<sub>TR-TYPE-006 &middot; trainee &middot; Performance Review matrix &middot; Testing types and subtypes</sub>

- a) Load testing **(correct)**
- b) Integration testing
- c) Retesting
- d) Acceptance testing

> Load testing measures behaviour under expected volume, a quality characteristic. Integration and acceptance are test levels; retesting is a purpose.

**19. The MOST important success factor for a review is that:**  
<sub>FL-3-005 &middot; junior &middot; ISTQB Foundation Level &middot; Requirements testing</sub>

- a) Objectives are clear and participants are prepared **(correct)**
- b) The meeting is short
- c) The author defends the work product
- d) Managers attend

> Unprepared participants turn a review into a reading session, which finds the defects a proof-reader would find and no others.

**20. A test case passes on your machine but fails on a colleague machine. The first thing to compare is:**  
<sub>TR-EXEC-006 &middot; trainee &middot; Performance Review matrix &middot; Execution of ready test cases, checklists or test scenarios</sub>

- a) Environment, build and test data **(correct)**
- b) Personal preferences
- c) Typing speed
- d) Screen resolution only

> Environment, build version and data state explain the overwhelming majority of "works on my machine" cases.

---

## Variant 50

**1. Parallel execution support must be designed in from the start because:**  
<sub>SR-TF-004 &middot; senior &middot; Performance Review matrix &middot; Creating your own test frameworks</sub>

- a) Shared state and fixed test data make retrofitting parallelism very expensive **(correct)**
- b) It is a licence requirement
- c) It changes the language
- d) Reports cannot be merged otherwise

> Data isolation and statelessness are architectural properties. Adding them to a mature suite usually means rewriting its fixtures.

**2. Root cause analysis of escaped defects is most useful when it produces:**  
<sub>MD-PROC-002 &middot; middle &middot; Performance Review matrix &middot; Analysis of testing process</sub>

- a) A process change that prevents the same class of defect **(correct)**
- b) A list of who made the mistake
- c) A longer regression suite
- d) A new metric

> RCA that ends in a name changes nothing. RCA that ends in a changed review, check or gate changes the outcome.

**3. A search that takes 1 ms on 1,000 records and 1 s on 1,000,000 records most likely has complexity:**  
<sub>SR-ALG-001 &middot; senior &middot; Performance Review matrix &middot; The basics of development and algorithms</sub>

- a) O(n) **(correct)**
- b) O(1)
- c) O(log n)
- d) O(n^2)

> A 1000x increase in data producing a 1000x increase in time is linear. O(n^2) would have grown a millionfold.

**4. A ticket states "Expected: the modal is dismissed on Esc". "Dismissed" here means:**  
<sub>TR-ENG-003 &middot; trainee &middot; Performance Review matrix &middot; Can read and understand test documentation</sub>

- a) Closed **(correct)**
- b) Disabled
- c) Rejected by the server
- d) Moved to the background

> In UI vocabulary, dismissing a modal means closing it without completing its action.

**5. When negotiating a reduced test budget, the Test Manager should present:**  
<sub>TM-023 &middot; senior &middot; ISTQB Test Manager &middot; Estimation of time/cost of testing activities (full project, team tasks)</sub>

- a) The specific coverage that will be dropped and the risk it exposes **(correct)**
- b) A refusal
- c) A silent acceptance
- d) A uniform reduction across all areas

> Making the trade explicit moves the decision to whoever owns the risk, which is where it belongs.

**6. What does a PRIMARY KEY guarantee?**  
<sub>JR-DB-002 &middot; junior &middot; Performance Review matrix &middot; Database basics (SQL/NoSQL)</sub>

- a) Uniqueness and non-nullability of the column combination **(correct)**
- b) That the column is indexed alphabetically
- c) That values are sequential
- d) That the column references another table

> A foreign key is what references another table. A primary key identifies the row uniquely and can never be NULL.

**7. You estimated 5 days; after 3 days you are 30% done. The professional action is:**  
<sub>DP-M-012 &middot; middle &middot; Practice-test style &middot; Estimation of time/cost of testing activities (epics, stories, bugs, testing types)</sub>

- a) Report a revised forecast of about 10 days now, with the reason **(correct)**
- b) Say nothing and try to catch up
- c) Report on day 5
- d) Reduce the scope silently

> At 30% in 60% of the budget, the trend is the forecast. Reporting it on day 3 leaves options; reporting it on day 5 leaves none.

**8. Which status closes the life cycle of a defect that was fixed and successfully retested?**  
<sub>TR-LIFE-004 &middot; trainee &middot; Performance Review matrix &middot; Defect life cycle</sub>

- a) Closed **(correct)**
- b) Resolved
- c) Verified in progress
- d) Assigned

> Typical flow: New -> Assigned -> Fixed/Resolved -> Retested -> Closed. Only the tester should move a ticket to Closed.

**9. Given {"user": {"roles": ["admin", "qa"]}}, which JSONPath selects the second role?**  
<sub>MD-JSON-004 &middot; middle &middot; Performance Review matrix &middot; JSON</sub>

- a) $.user.roles[1] **(correct)**
- b) $.user.roles[2]
- c) $.roles[1]
- d) $.user[roles][1]

> JSONPath arrays are zero-indexed, so index 1 is the second element.

**10. The difference between DELETE and TRUNCATE is that:**  
<sub>JR-DB-003 &middot; junior &middot; Performance Review matrix &middot; Database basics (SQL/NoSQL)</sub>

- a) DELETE removes rows one by one and can be filtered; TRUNCATE empties the table wholesale **(correct)**
- b) They are identical
- c) TRUNCATE can use a WHERE clause
- d) DELETE removes the table structure

> TRUNCATE is faster but unfilterable, and in many engines it cannot be rolled back and resets identity counters. DROP is what removes the structure.

**11. In session-based test management, a charter defines:**  
<sub>TA-T-008 &middot; middle &middot; ISTQB Test Analyst &middot; Test design techniques</sub>

- a) The mission and scope of a timeboxed exploratory session **(correct)**
- b) The exact steps to execute
- c) The expected results in advance
- d) The defect severity scale

> The charter makes exploratory testing plannable and reportable without turning it into scripted testing.

**12. ISTQB Glossary: a "stub" is:**  
<sub>GL-J-002 &middot; junior &middot; ISTQB Glossary &middot; Levels of testing</sub>

- a) A skeletal implementation of a called component used during integration testing **(correct)**
- b) A component that invokes the code under test
- c) A tool for load generation
- d) A defect report template

> Stubs let a component be tested before its dependencies exist, which is what makes top-down integration possible.

**13. A password field accepts 8 to 16 characters. Which set of lengths gives the best boundary coverage?**  
<sub>DP-T-001 &middot; trainee &middot; Practice-test style &middot; Test design techniques</sub>

- a) 7, 8, 16, 17 **(correct)**
- b) 8, 12, 16
- c) 1, 8, 16, 100
- d) 0, 8, 16

> Each boundary is paired with its nearest invalid neighbour. 12 adds nothing that 8 and 16 do not already represent.

**14. Which is a valid reason for a defect management process to include a triage meeting?**  
<sub>TM-017 &middot; senior &middot; ISTQB Test Manager &middot; Defect management system/Project management system</sub>

- a) To agree priority and ownership across roles with the full context present **(correct)**
- b) To reduce the defect count
- c) To assign blame
- d) To speed up test execution

> Triage is where product, development and test reconcile severity with business priority in one place.

**15. The Page Object pattern primarily improves:**  
<sub>MD-AWEB-001 &middot; middle &middot; Performance Review matrix &middot; Automation of WEB UI (functional) tests</sub>

- a) Maintainability, by keeping locators and page behaviour in one place **(correct)**
- b) Execution speed
- c) Defect detection rate
- d) Browser compatibility

> When a locator changes, one file changes. Without it, the same selector is scattered across dozens of tests.

**16. Which is an example of operational acceptance testing?**  
<sub>FL-2-006 &middot; junior &middot; ISTQB Foundation Level &middot; Levels of testing</sub>

- a) Verifying backup and restore procedures **(correct)**
- b) Verifying a business workflow with end users
- c) Verifying compliance with a contract
- d) Verifying a single function in isolation

> Operational acceptance testing covers the operational aspects: backup/restore, disaster recovery, user management, maintenance tasks and security checks.

**17. Test documentation that is never updated after the first release is:**  
<sub>TR-DOC-006 &middot; trainee &middot; Performance Review matrix &middot; Creating test documentation (test cases, checklists, mind maps etc.)</sub>

- a) A liability, because it reports coverage the product no longer has **(correct)**
- b) Still fully valuable
- c) Only a minor problem
- d) Preferable, since it is stable

> Stale documentation is worse than none: it produces confident, wrong answers about coverage.

**18. Keyword-driven testing is attractive for a Test Analyst because:**  
<sub>TA-X-002 &middot; middle &middot; ISTQB Test Analyst &middot; Automation of WEB UI (functional) tests</sub>

- a) Test cases can be authored in business terms without scripting **(correct)**
- b) It removes the need for maintenance
- c) It runs faster than scripted tests
- d) It requires no framework

> The trade is that a developer-level engineer must build and maintain the keyword layer underneath.

**19. Exit criteria (definition of done for a test level) exist to:**  
<sub>FL-5-004 &middot; junior &middot; ISTQB Foundation Level &middot; Testing metrics</sub>

- a) Define objectively when enough testing has been done **(correct)**
- b) Set the start date of testing
- c) Determine who executes the tests
- d) Prioritise defects

> Without agreed exit criteria, "are we done testing?" becomes a negotiation under deadline pressure rather than a check against a rule.

**20. The defect clustering principle implies which practical action?**  
<sub>JR-PRIN-002 &middot; junior &middot; Performance Review matrix &middot; Principles of testing</sub>

- a) Focus extra effort on the modules that historically produce the most defects **(correct)**
- b) Test every module equally
- c) Stop testing modules with defects
- d) Automate everything

> Defects are not uniformly distributed. Clustering is the empirical basis for risk-based test prioritisation.

---

