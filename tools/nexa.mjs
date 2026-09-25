#!/usr/bin/env node
// Nexa UI CLI (stub) — explore the catalog and copy components into your app.
// Usage:
//   node tools/nexa.mjs list                 list all components
//   node tools/nexa.mjs info <name>           show selectors, files, README path
//   node tools/nexa.mjs add <name> --dest <dir>  copy component files to <dir>/<name>
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const registry = JSON.parse(readFileSync(join(root, 'registry.json'), 'utf8'));
const [cmd, arg, ...rest] = process.argv.slice(2);

if (cmd === 'list') {
  console.log(`Nexa UI v${registry.version} — ${registry.totalComponents} components\n`);
  for (const c of registry.components) console.log(`  ${c.name.padEnd(18)} ${c.selectors.join(', ')}`);
} else if (cmd === 'info') {
  const c = registry.components.find((x) => x.name === arg);
  if (!c) {
    console.error(`Unknown component "${arg}". Run "list" to see all.`);
    process.exit(1);
  }
  console.log(`# ${c.name}\nSelectors: ${c.selectors.join(', ')}\nClasses:   ${c.classes.join(', ')}\nFiles:`);
  for (const f of c.files) console.log(`  ${f}`);
  console.log(`Docs:     ${c.readme}`);
} else if (cmd === 'add') {
  const c = registry.components.find((x) => x.name === arg);
  if (!c) {
    console.error(`Unknown component "${arg}". Run "list" to see all.`);
    process.exit(1);
  }
  const destFlag = rest.indexOf('--dest');
  const dest = destFlag === -1 ? null : rest[destFlag + 1];
  if (!dest) {
    console.log(`Files to copy for "${c.name}":`);
    for (const f of c.files) console.log(`  ${f}`);
    console.log('\nRe-run with --dest <dir> to copy them.');
    process.exit(0);
  }
  const outDir = join(process.cwd(), dest, c.name);
  mkdirSync(outDir, { recursive: true });
  for (const f of c.files) {
    const base = f.split('/').pop();
    copyFileSync(join(root, f), join(outDir, base));
  }
  const readmeSrc = join(root, c.readme);
  if (existsSync(readmeSrc)) copyFileSync(readmeSrc, join(outDir, 'README.md'));
  console.log(`Copied ${c.name} (${c.files.length} files + README) to ${outDir}`);
  console.log('Note: some components import shared utils/tokens — copy projects/nexa-ui/src/lib/{utils,tokens} too, or install the package.');
} else {
  console.log('Nexa UI CLI\n  node tools/nexa.mjs list | info <name> | add <name> [--dest <dir>]');
  process.exit(cmd ? 1 : 0);
}
