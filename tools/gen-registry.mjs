// Generates registry.json from the library source — the single source of truth
// for the Nexa UI component catalog (names, selectors, files).
// Usage: node tools/gen-registry.mjs
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lib = join(root, 'projects/nexa-ui/src/lib');
const SKIP = new Set(['theme', 'tokens', 'utils']);

const components = [];
for (const name of readdirSync(lib, { withFileTypes: true })) {
  if (!name.isDirectory() || SKIP.has(name.name)) continue;
  const dir = join(lib, name.name);
  const files = readdirSync(dir).filter((f) => f !== 'README.md').map((f) => `projects/nexa-ui/src/lib/${name.name}/${f}`);
  const selectors = [];
  const classes = [];
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.ts') || f.endsWith('.spec.ts')) continue;
    const src = readFileSync(join(dir, f), 'utf8');
    for (const m of src.matchAll(/selector:\s*'([^']+)'/g)) selectors.push(m[1]);
    for (const m of src.matchAll(/export class (\w+)/g)) classes.push(m[1]);
  }
  components.push({
    name: name.name,
    selectors,
    classes,
    files,
    readme: `projects/nexa-ui/src/lib/${name.name}/README.md`,
    hasReadme: existsSync(join(dir, 'README.md')),
  });
}
components.sort((a, b) => a.name.localeCompare(b.name));

const registry = {
  $schema: 'https://nexa-ui.dev/schema/registry.json',
  name: 'nexa-ui',
  version: JSON.parse(readFileSync(join(root, 'projects/nexa-ui/package.json'), 'utf8')).version,
  angular: '>=22.0.0',
  totalComponents: components.length,
  components,
};
writeFileSync(join(root, 'registry.json'), JSON.stringify(registry, null, 2) + '\n');
console.log(`registry.json written — ${components.length} components`);
const missing = components.filter((c) => !c.hasReadme).map((c) => c.name);
if (missing.length) console.log('missing README:', missing.join(', '));
