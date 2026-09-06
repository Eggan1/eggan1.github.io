import type { Html } from './lib/html.ts';

/**
 * Inline prose. Written as an array so a link inside a sentence stays typed
 * data rather than embedded markup.
 */
export type Inline = string | { readonly text: string; readonly href: string } | { readonly em: string };

export type Prose = string | readonly Inline[];

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface Link {
  readonly label: string;
  readonly href: string;
}

export interface Email {
  readonly label: string;
  readonly address: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly nav: readonly NavItem[];
  /** Shown in the Contact section, in this order. */
  readonly emails: readonly [Email, ...Email[]];
  readonly socials: readonly Link[];
  readonly lang: string;
}

export interface Portrait {
  readonly src: string;
  readonly alt: string;
}

export interface About {
  readonly paragraphs: readonly Prose[];
  readonly portrait?: Portrait;
}

export interface ExperienceItem {
  readonly org: string;
  readonly location?: string;
  readonly role: string;
  readonly period: string;
}

/** Experience is grouped the way the CV groups it: research, teaching, work. */
export interface ExperienceGroup {
  readonly heading: string;
  readonly items: readonly ExperienceItem[];
}

/** A linked item: a set of course materials, or a piece of writing. */
export interface Resource {
  readonly title: string;
  /** Omit while the item is not yet published; it then reads as plain text. */
  readonly href?: string;
  readonly date?: string;
  readonly note?: Prose;
}

export interface Collection {
  readonly intro?: Prose;
  /** Shown in place of the list while `items` is empty. */
  readonly empty: string;
  readonly items: readonly Resource[];
}

/** A piece of writing that gets its own page. */
export interface Article {
  /** Output path, e.g. `advice/breaking-into-research.html`. */
  readonly slug: string;
  readonly title: string;
  readonly date?: string;
  /** One line shown on the index that links to it. */
  readonly blurb?: Prose;
  readonly body: readonly Prose[];
}

export interface Page {
  /** Output filename, e.g. `index.html`. */
  readonly slug: string;
  /** Browser tab title, appended with the site name. */
  readonly title: string;
  /** Which nav entry to mark as current. */
  readonly navHref?: string;
  /** Skipped by the build. Use for pages that are not ready to publish. */
  readonly draft?: boolean;
  /** `base` is the prefix back to the site root, e.g. `../` one level down. */
  readonly render: (base: string) => Html;
}
