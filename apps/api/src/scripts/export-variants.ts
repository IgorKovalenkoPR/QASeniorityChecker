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
  'pr-matrix': 'Performance Review matrix',
  'istqb-ctfl': 'ISTQB Foundation Level',
  'istqb-ctal-ta': 'ISTQB Test Analyst',
  'istqb-ctal-tm': 'ISTQB Test Manager',
  'istqb-glossary': 'ISTQB Glossary',
  'practice-dump': 'Practice-test style',
};

function main(): void {
  const problems = validateBank();
  if (problems.length > 0) {
    console.error('Question bank is invalid:');
    for (const problem of problems) console.error(`  - ${problem}`);
    process.exit(1);
  }

  const target = resolve(process.argv[2] ?? 'docs/variants.md');
  const stats = bankStats();
  const lines: string[] = [];

  lines.push('# Test variants - answer key');
  lines.push('');
  lines.push('> **Internal document.** Contains the correct answer for every question.');
  lines.push('> Do not circulate to anyone who may take the test.');
  lines.push('');
  lines.push(`Generated from the question bank by \`npm run export:variants\`.`);
  lines.push('The variants are deterministic, so an unchanged bank regenerates this file byte for byte.');
  lines.push('');
  lines.push('## Bank summary');
  lines.push('');
  lines.push(`- Questions in the bank: **${stats.total}**`);
  lines.push(`- Papers: **${VARIANTS.length}**, each of **${VARIANTS[0]?.questionIds.length ?? 0}** questions`);
  lines.push('');
  lines.push('| Tier | Questions in bank |');
  lines.push('| --- | --- |');
  for (const tier of TIERS) lines.push(`| ${tier} | ${stats.byTier[tier]} |`);
  lines.push('');
  lines.push('| Source | Questions in bank |');
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
    `Question reuse across the 50 papers: min ${Math.min(...counts)}, max ${Math.max(...counts)}, ` +
      `${usage.size} of ${QUESTION_BANK.length} questions in play.`,
  );
  lines.push('');
  lines.push('---');
  lines.push('');

  for (const variant of VARIANTS) {
    lines.push(`## Variant ${variant.number}`);
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
        const marker = q.correctOptionIds.includes(option.id) ? '**(correct)**' : '';
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
  console.log(`Wrote ${VARIANTS.length} variants (${lines.length} lines) to ${target}`);
}

main();
