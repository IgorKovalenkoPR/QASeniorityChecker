/**
 * Fails if the built web bundle contains anything from the answer key.
 *
 *   npm run check:bundle        (after `npm run build`)
 *
 * The product's central security claim is that a candidate cannot read the
 * correct answers out of the JavaScript their browser downloaded. That holds
 * only because `@qasc/content` is imported by the API and never by the SPA -
 * an import chain that a single careless `import { QUESTION_BANK }` in a React
 * component would silently break, with no test failing and no reviewer
 * necessarily noticing in a 60-file diff.
 *
 * So this checks the artefact rather than the source: it greps the actual
 * built bundle for question ids, explanation prose and the key field name. It
 * has to run after a build, which is why it is a script invoked by CI rather
 * than a vitest case - a unit test that silently passes when `dist/` is absent
 * would be worse than no test at all.
 */
import { globSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { QUESTION_BANK } from '@qasc/content';

const WEB_DIST = resolve(process.cwd(), 'apps/web/dist/assets');

function bundleFiles(): string[] {
  const files = globSync('*.js', { cwd: WEB_DIST }).map((f) => resolve(WEB_DIST, f));
  if (files.length === 0) {
    console.error(
      `No built bundle found in ${WEB_DIST}.\n` +
        'Run `npm run build` first - this check inspects the artefact, not the source.',
    );
    process.exit(1);
  }
  return files;
}

/** Distinctive strings that must never appear in anything served to a browser. */
function forbiddenStrings(): { label: string; needle: string }[] {
  const needles: { label: string; needle: string }[] = [
    // The key field itself, and the per-question rationale shown only after
    // submission.
    { label: 'answer-key field name', needle: 'correctOptionIds' },
  ];

  // Sample across the bank rather than testing all 504: enough to catch a
  // wholesale import, cheap enough to run on every push. Question ids are the
  // strongest signal - they exist nowhere else in the codebase.
  const step = Math.max(1, Math.floor(QUESTION_BANK.length / 40));
  for (let i = 0; i < QUESTION_BANK.length; i += step) {
    const q = QUESTION_BANK[i]!;
    needles.push({ label: `question id ${q.id}`, needle: q.id });
    // Explanations are long and unique, so a substring is unambiguous.
    needles.push({
      label: `explanation of ${q.id}`,
      needle: q.explanation.slice(0, 40),
    });
  }
  return needles;
}

function main(): void {
  const files = bundleFiles();
  const needles = forbiddenStrings();
  const leaks: string[] = [];

  for (const file of files) {
    const contents = readFileSync(file, 'utf8');
    for (const { label, needle } of needles) {
      if (contents.includes(needle)) {
        leaks.push(`${file}: leaks ${label}`);
      }
    }
  }

  if (leaks.length > 0) {
    console.error('Answer key material found in the client bundle:');
    for (const leak of leaks) console.error(`  - ${leak}`);
    console.error(
      '\nThe SPA must not import @qasc/content. Correct answers are served only\n' +
        'by the API, after an attempt is submitted.',
    );
    process.exit(1);
  }

  console.log(
    `Bundle clean: checked ${files.length} file(s) against ${needles.length} ` +
      `answer-key markers from a bank of ${QUESTION_BANK.length} questions.`,
  );
}

main();
