import type { Article, Collection, ExperienceGroup, Inline, Prose } from '../types.ts';
import { site } from '../content/site.ts';
import {
  a, div, em, footer, h2, h3, header, hr, li, main, nav, p, section, span, ul,
  type Html,
} from './html.ts';

/** Renders typed inline prose: plain runs, links and emphasis. */
export function prose(text: Prose): Html {
  if (typeof text === 'string') return text;
  return text.map((piece: Inline) => {
    if (typeof piece === 'string') return piece;
    if ('href' in piece) return a({ href: piece.href, ...external(piece.href) }, piece.text);
    return em({}, piece.em);
  });
}

const external = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {};

function siteHeader(current?: string, base = ''): Html {
  return [
    header({ class: 'masthead' },
      a({ class: 'name', href: `${base}index.html` }, site.name),
      nav({ class: 'nav' },
        site.nav.flatMap((item, i) => [
          i > 0 ? span({ class: 'sep', 'aria-hidden': 'true' }, '|') : null,
          a(
            {
              href: `${base}${item.href}`,
              class: item.href === current ? 'current' : undefined,
              'aria-current': item.href === current ? 'page' : undefined,
            },
            item.label,
          ),
        ]),
      ),
    ),
    hr({}),
  ];
}

function siteFooter(): Html {
  return [
    hr({}),
    footer({ class: 'foot' },
      p({},
        site.socials.flatMap((social, i) => [
          i > 0 ? span({ class: 'sep', 'aria-hidden': 'true' }, '·') : null,
          a({ href: social.href, target: '_blank', rel: 'noopener' }, social.label),
        ]),
      ),
    ),
  ];
}

export function block(id: string, heading: string, ...children: Html[]): Html {
  return section({ id }, h2({}, heading), ...children);
}

/**
 * Two lines per entry, as on the CV: organisation and location, then role
 * and dates.
 */
export function experienceList(groups: readonly ExperienceGroup[]): Html {
  return groups.map((group) =>
    block(group.heading.toLowerCase(), group.heading,
      ul({ class: 'entries' },
        group.items.map((item) =>
          li({},
            div({ class: 'entry-head' },
              h3({}, item.org),
              item.location ? span({ class: 'year' }, item.location) : null,
            ),
            div({ class: 'entry-head sub' },
              span({ class: 'role' }, item.role),
              span({ class: 'year' }, item.period),
            ),
          ),
        ),
      ),
    ),
  );
}

/** Renders a set of materials or writings, or a note while it is still empty. */
export function resourceList(collection: Collection): Html {
  return [
    collection.intro ? p({}, prose(collection.intro)) : null,
    collection.items.length === 0
      ? p({ class: 'empty' }, collection.empty)
      : ul({ class: 'entries' },
          collection.items.map((item) =>
            li({},
              div({ class: 'entry-head' },
                h3({}, item.href ? a({ href: item.href, ...external(item.href) }, item.title) : item.title),
                item.date ? span({ class: 'year' }, item.date) : null,
              ),
              item.note ? p({ class: 'note' }, prose(item.note)) : null,
            ),
          ),
        ),
  ];
}

/**
 * Masks the @ — "an [AT] example.com" — so the address is obvious to a person
 * but not to an address harvester. Rendered as plain text rather than a
 * mailto link, since a scraper would just read the href.
 */
const maskAt = (address: string): string => address.replace(/@/g, ' [AT] ');

export function contactBlock(): Html {
  return block('contact', 'Contact',
    p({ class: 'addresses' },
      site.emails.map((email) => span({ class: 'address' }, maskAt(email.address))),
    ),
  );
}

export function page(current: string | undefined, base: string, ...content: Html[]): Html {
  return div({ class: 'container' }, siteHeader(current, base), main({}, ...content), siteFooter());
}

/** A single piece of writing, on its own page. */
export function articleView(item: Article): Html {
  return section({ id: 'article' },
    h2({}, item.title),
    item.date ? p({ class: 'byline' }, item.date) : null,
    item.body.map((paragraph) => p({}, prose(paragraph))),
  );
}
