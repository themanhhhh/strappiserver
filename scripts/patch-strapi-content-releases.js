const fs = require('fs');
const path = require('path');

const migrationPath = path.join(
  __dirname,
  '..',
  'node_modules',
  '@strapi',
  'content-releases',
  'dist',
  'server',
  'migrations',
  'index.js',
);

if (!fs.existsSync(migrationPath)) {
  console.warn('Strapi content-releases migration file was not found; skipping patch.');
  process.exit(0);
}

const source = fs.readFileSync(migrationPath, 'utf8');
const before = 'if (oldContentTypes !== undefined && contentTypes !== undefined) {';
const after = 'if (oldContentTypes != null && contentTypes != null) {';

if (source.includes(after)) {
  process.exit(0);
}

if (!source.includes(before)) {
  console.warn('Strapi content-releases migration guard has changed; skipping patch.');
  process.exit(0);
}

fs.writeFileSync(migrationPath, source.replace(before, after));
console.log('Patched Strapi content-releases migration null guard.');
