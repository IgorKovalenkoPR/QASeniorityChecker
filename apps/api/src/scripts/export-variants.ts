/**
 * Writes a reviewer-facing copy of all 50 test papers, with the answer key.
 *
 *   npm run export:variants            -> docs/variants.md
 *   npm run export:variants -- out.md  -> custom path
 *
 * This file is for the QA lead reviewing the bank, NOT for candidates: it
 * contains every correct answer. It is deliberately not served by the API and
 * not written into the web bundle. Regenerate it whenever the bank changes; the
 * variants are deterministic, so an unchanged bank produces an identical file.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { COMPETENCY_BY_ID, TIERS } from '@qasc/core';
import { QUESTION_BANK, QUESTION_BY_ID, VARIANTS, bankStats, validateBank } from '@qasc/content';

const SOURCE_LABELS: Record<string, string> = {
  'pr-matrix': 'Матриця Performance Review',
  'istqb-ctfl': 'ISTQB Foundation Level',
  'istqb-ctal-ta': 'ISTQB Test Analyst',
  'istqb-ctal-tm': 'ISTQB Test Manager',
  'istqb-glossary': 'Глосарій ISTQB',
  'practice-dump': 'Практичний формат',
};

function main(): void {
  const problems = validateBank();
  if (problems.length > 0) {
    console.error('Банк питань невалідний:');
    for (const problem of problems) console.error(`  - ${problem}`);
    process.exit(1);
  }

  const target = resolve(process.argv[2] ?? 'docs/variants.md');
  const stats = bankStats();
  const lines: string[] = [];

  lines.push('# Варіанти тестів - з правильними відповідями');
  lines.push('');
  lines.push('> **Внутрішній документ.** Містить правильну відповідь на кожне питання.');
  lines.push('> Не поширюйте серед тих, хто може проходити тест.');
  lines.push('');
  lines.push('Згенеровано з банку питань командою `npm run export:variants`.');
  lines.push('Варіанти детерміновані, тож незмінний банк відтворює цей файл байт у байт.');
  lines.push('');
  lines.push('## Зведення по банку');
  lines.push('');
  lines.push(`- Питань у банку: **${stats.total}**`);
  lines.push(`- Варіантів: **${VARIANTS.length}**, у кожному по **${VARIANTS[0]?.questionIds.length ?? 0}** питань`);
  lines.push('');
  lines.push('| Рівень | Питань у банку |');
  lines.push('| --- | --- |');
  for (const tier of TIERS) lines.push(`| ${tier} | ${stats.byTier[tier]} |`);
  lines.push('');
  lines.push('| Джерело | Питань у банку |');
  lines.push('| --- | --- |');
  for (const [source, count] of Object.entries(stats.bySource)) {
    lines.push(`| ${SOURCE_LABELS[source] ?? source} | ${count} |`);
  }
  lines.push('');

  const usage = new Map<string, number>();
  for (const variant of VARIANTS) {
    for (const id of variant.questionIds) usage.set(id, (usage.get(id) ?? 0) + 1);
  }
  const counts = [...usage.values()];
  lines.push(
    `Повторюваність питань у ${VARIANTS.length} варіантах: мін. ${Math.min(...counts)}, ` +
      `макс. ${Math.max(...counts)}; задіяно ${usage.size} із ${QUESTION_BANK.length} питань.`,
  );
  lines.push('');
  lines.push('---');
  lines.push('');

  for (const variant of VARIANTS) {
    lines.push(`## Варіант ${variant.number}`);
    lines.push('');
    variant.questionIds.forEach((id, index) => {
      const q = QUESTION_BY_ID.get(id);
      if (!q) throw new Error(`Variant ${variant.number} references unknown question ${id}`);
      const competency = COMPETENCY_BY_ID.get(q.competencyId);
      lines.push(
        `**${index + 1}. ${q.text}**  ` +
          `\n<sub>${q.id} &middot; ${q.tier} &middot; ${SOURCE_LABELS[q.source] ?? q.source} ` +
          `&middot; ${competency?.label ?? q.competencyId}</sub>`,
      );
      lines.push('');
      for (const option of q.options) {
        const marker = q.correctOptionIds.includes(option.id) ? '**(правильна)**' : '';
        lines.push(`- ${option.id}) ${option.text} ${marker}`.trimEnd());
      }
      lines.push('');
      lines.push(`> ${q.explanation}`);
      lines.push('');
    });
    lines.push('---');
    lines.push('');
  }

  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, `${lines.join('\n')}\n`, 'utf8');
  console.log(`Записано ${VARIANTS.length} варіантів (${lines.length} рядків) у ${target}`);
}

main();
