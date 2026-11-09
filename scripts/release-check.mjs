#!/usr/bin/env node
/**
 * Pre-release quality gate for MLB Portfolio.
 * Run locally or in a separately hosted CI runner, without custom GitHub Actions.
 * This script cannot enforce GitHub branch rules or certify deployment.
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const required = [
  'index.html', 'styles.css', 'app.js', 'resume.html', 'evidence.html',
  'Michael_Bolton_Resume_Nov_2026.pdf', 'ambassador-avatar.png',
];
let failures = 0;
for (const path of required) {
  if (!existsSync(resolve(root, path))) {
    console.error('FAIL missing release asset:', path);
    failures++;
  }
}
const commands = [
  ['--check', 'app.js'],
  ['--check', 'ambassador/worker.js'],
  ['--test', 'ambassador/test.mjs', 'ambassador/interview-eval.mjs'],
  ['tests/smoke.test.js'],
];
for (const args of commands) {
  console.log('\n$ node ' + args.join(' '));
  const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit' });
  if (result.status !== 0) {
    console.error('FAIL:', args.join(' '));
    failures++;
  }
}
if (failures) {
  console.error('\nRELEASE BLOCKED: ' + failures + ' failed checks.');
  process.exit(1);
}
console.log('\nPASS: local release gates. Branch protection and live deployment verification are separate.');
