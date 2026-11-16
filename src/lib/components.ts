import type {
  Article, Block, Collection, ExperienceGroup, Inline, List, Prose, Publication,
} from '../types.ts';
import { site } from '../content/site.ts';
import { SELF } from '../content/research.ts';
import {
  a, div, em, footer, h2, h3, header, hr, li, main, nav, ol, p, section, span, ul,
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

function siteHeader(current?: string): Html {
  return [
    header({ class: 'masthead' },
      a({ class: 'name', href: '/' }, site.name),
      nav({ class: 'nav' },
        site.nav.flatMap((item, i) => [
          // A real space between items is the only place the nav may wrap; the
          // separator is tied to the link before it so it never starts a line.
          i > 0 ? ' ' : null,
          span({ class: 'nav-item' },
            a(
              {
                href: item.href,
                class: item.href === current ? 'current' : undefined,
                'aria-current': item.href === current ? 'page' : undefined,
              },
              item.label,
            ),
            i < site.nav.length - 1 ? span({ class: 'sep', 'aria-hidden': 'true' }, '|') : null,
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

export function page(current: string | undefined, ...content: Html[]): Html {
  return div({ class: 'container' }, siteHeader(current), main({}, ...content), siteFooter());
}
/** Renders a body of paragraphs and lists. Shared by articles and research. */
function blocks(body: readonly Block[]): Html {
  return body.map((block) => {
    if (!isList(block)) return p({}, prose(block));
    const items = block.list.map((entry) => li({}, prose(entry)));
    return block.ordered === false
      ? ul({ class: 'points' }, items)
      : ol({ class: 'points' }, items);
  });
}

/** A list is an object; a paragraph is a string or an array of inline runs. */
const isList = (block: Block): block is List =>
  typeof block === 'object' && block !== null && !Array.isArray(block);

/** A single piece of writing, on its own page. */
export function articleView(item: Article): Html {
  return section({ id: 'article' },
    h2({}, item.title),
    item.date ? p({ class: 'byline' }, item.date) : null,
    blocks(item.body),
  );
}

export function publicationList(items: readonly Publication[]): Html {
  return ol({ class: 'citations' },
    items.map((item) =>
      li({},
        span({ class: 'authors' },
          item.authors.flatMap((name, i) => [
            i > 0 ? ', ' : null,
            name === SELF ? span({ class: 'me' }, name) : name,
          ]),
          '. ',
        ),
        item.title,
        ' ',
        item.venue,
        item.id
          ? [
              ' ',
              item.href
                ? a({ href: item.href, target: '_blank', rel: 'noopener' }, item.id)
                : item.id,
            ]
          : null,
      ),
    ),
  );
}
