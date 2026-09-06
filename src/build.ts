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
import { baseFor, document } from './lib/layout.ts';

const SRC = dirname(fileURLToPath(import.meta.url));
const ROOT = join(SRC, '..');

export async function build(): Promise<string[]> {
  const published = pages.filter((page) => !page.draft);

  const written = await Promise.all(
    published.map(async (page) => {
      const out = join(ROOT, page.slug);
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, document(page, page.render(baseFor(page.slug))), 'utf8');
      return page.slug;
    }),
  );

  await copyFile(join(SRC, 'styles.css'), join(ROOT, 'styles.css'));
  written.push('styles.css');

  const drafts = pages.filter((page) => page.draft).map((page) => page.slug);
  return [...written, ...drafts.map((slug) => `${slug} (draft, skipped)`)];
}

// Only run when invoked directly, so the dev server can import build().
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const results = await build();
  for (const line of results) console.log(`  ${line}`);
  console.log(`\nBuilt ${results.filter((r) => !r.includes('draft')).length} files.`);
}
