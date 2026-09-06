import type { Page } from '../types.ts';
import { site } from '../content/site.ts';
import { head, html, link, meta, raw, render, title, body, type Html } from './html.ts';

const FONT = 'https://fonts.googleapis.com/css2?family=Piazzolla:ital,wght@0,400;0,600;0,700;1,400&display=swap';

/** How many `../` steps a page needs to reach the site root. */
export const baseFor = (slug: string): string => '../'.repeat(slug.split('/').length - 1);

export function document(pageDef: Page, content: Html): string {
  const base = baseFor(pageDef.slug);
  const doc = html({ lang: site.lang },
    head({},
      meta({ charset: 'utf-8' }),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      title({}, `${pageDef.title} — ${site.name}`),
      link({ rel: 'preconnect', href: 'https://fonts.googleapis.com' }),
      link({ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }),
      link({ rel: 'stylesheet', href: FONT }),
      link({ rel: 'stylesheet', href: `${base}styles.css` }),
    ),
    body({}, content),
  );

  return `<!doctype html>\n${render(doc)}`;
}
