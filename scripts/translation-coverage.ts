/**
 * How much of the question bank has an English side.
 *
 * The bank was written Ukrainian-first and the English translation lands file
 * by file. A question with no translation falls back to its Ukrainian text -
 * which keeps the test working, and is exactly why the gap needs counting
 * rather than eyeballing: an English-speaking candidate would meet a Ukrainian
 * question and nothing would look broken.
 *
 * `npm run coverage:translation` prints the state; the bank test asserts it is
 * complete, so a half-finished translation cannot ship quietly.
 */
import { QUESTION_BANK, untranslatedQuestionIds } from '@qasc/content';

function main(): void {
  const missing = untranslatedQuestionIds();
  const total = QUESTION_BANK.length;
  const done = total - missing.length;
  const pct = total === 0 ? 100 : Math.round((done / total) * 1000) / 10;

  console.log(`Translated: ${done}/${total} (${pct}%)`);

  if (missing.length === 0) {
    console.log('Every question has an English side.');
    return;
  }

  // Grouped by the prefix of the question id, which is how the bank is filed,
  // so the output says which file to pick up next rather than listing 300 ids.
  const byPrefix = new Map<string, number>();
  for (const id of missing) {
    const prefix = id.replace(/-\d+$/, '');
    byPrefix.set(prefix, (byPrefix.get(prefix) ?? 0) + 1);
  }

  console.log('\nStill Ukrainian-only, by question-id prefix:');
  for (const [prefix, count] of [...byPrefix].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${prefix.padEnd(14)} ${count}`);
  }
  process.exitCode = 1;
}

main();
