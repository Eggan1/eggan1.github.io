/**
 * Static build. Emits one HTML file per published page into the repository
 * root, where GitHub Pages already serves from, plus the stylesheet.
 *
 *   node src/build.ts
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { pages } from './pages.ts';
import { document } from './lib/layout.ts';

const SRC = dirname(fileURLToPath(import.meta.url));
const ROOT = join(SRC, '..');

export async function build(): Promise<string[]> {
  const published = pages.filter((page) => !page.draft);

  const written = await Promise.all(
    published.map(async (page) => {
      // Every route is served as a directory index, so URLs carry no extension.
      const file = page.route === '' ? 'index.html' : join(page.route, 'index.html');
      const out = join(ROOT, file);
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, document(page, page.render()), 'utf8');
      return `/${page.route}`.replace(/\/$/, '/');
    }),
  );

  await copyFile(join(SRC, 'styles.css'), join(ROOT, 'styles.css'));
  written.push('styles.css');

  const drafts = pages.filter((page) => page.draft).map((page) => page.route);
  return [...written, ...drafts.map((route) => `/${route} (draft, skipped)`)];
}

// Only run when invoked directly, so the dev server can import build().
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const results = await build();
  for (const line of results) console.log(`  ${line}`);
  console.log(`\nBuilt ${results.filter((r) => !r.includes('draft')).length} files.`);
}
