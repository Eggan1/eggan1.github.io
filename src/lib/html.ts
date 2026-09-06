/**
 * A tiny typed element builder.
 *
 * Pages are written as TypeScript values, never as markup strings, so the
 * compiler catches a mistyped tag or a missing attribute and text is escaped
 * on the way out by default.
 */

export type Attrs = Readonly<Record<string, string | number | boolean | undefined>>;

export interface Element {
  readonly tag: string;
  readonly attrs: Attrs;
  readonly children: readonly Html[];
}

/** Pre-escaped markup. Only for things we author by hand, like inline SVG. */
export interface Raw {
  readonly raw: string;
}

export type Html = string | number | Element | Raw | readonly Html[] | null | undefined | false;

/** Tags that must not be given a closing tag. */
const VOID_TAGS = new Set(['area', 'base', 'br', 'col', 'hr', 'img', 'input', 'link', 'meta', 'source']);

/**
 * Tags that sit inside a line of prose. An element built only from text and
 * these is printed without added whitespace, so a link followed by a comma
 * does not pick up a space before the punctuation.
 */
const INLINE_TAGS = new Set(['a', 'em', 'strong', 'code', 'span', 'br', 'img', 'sup', 'sub', 'time']);

export const raw = (markup: string): Raw => ({ raw: markup });

export function h(tag: string, attrs: Attrs = {}, ...children: Html[]): Element {
  return { tag, attrs, children };
}

const isElement = (node: unknown): node is Element =>
  typeof node === 'object' && node !== null && 'tag' in node;

const isRaw = (node: unknown): node is Raw =>
  typeof node === 'object' && node !== null && 'raw' in node;

export function escape(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderAttrs(attrs: Attrs): string {
  return Object.entries(attrs)
    .filter(([, value]) => value !== undefined && value !== false)
    .map(([name, value]) => (value === true ? ` ${name}` : ` ${name}="${escape(String(value))}"`))
    .join('');
}

function isInline(node: Html): boolean {
  if (node === null || node === undefined || node === false) return true;
  if (typeof node === 'string' || typeof node === 'number' || isRaw(node)) return true;
  if (Array.isArray(node)) return node.every(isInline);
  return isElement(node) && INLINE_TAGS.has(node.tag);
}

/**
 * Serialises a tree to HTML. Block elements are indented for readability;
 * anything that sits inside a line of prose is printed flat, so no stray
 * whitespace appears between a link and the punctuation that follows it.
 */
export function render(node: Html, indent = 0, inline = false): string {
  if (node === null || node === undefined || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return escape(String(node));
  if (isRaw(node)) return node.raw;
  if (Array.isArray(node)) return node.map((child) => render(child, indent, inline)).join('');
  if (!isElement(node)) return '';

  const pad = inline ? '' : '  '.repeat(indent);
  const end = inline ? '' : '\n';
  const open = `${pad}<${node.tag}${renderAttrs(node.attrs)}>`;
  if (VOID_TAGS.has(node.tag)) return `${open}${end}`;

  // isInline recurses into nested arrays, so no flattening is needed here.
  const flat = node.children.every(isInline);
  const body = node.children.map((child) => render(child, flat ? 0 : indent + 1, flat)).join('');

  return flat
    ? `${open}${body}</${node.tag}>${end}`
    : `${open}\n${body}${pad}</${node.tag}>${end}`;
}

/** Shorthands, so page code reads as structure rather than as strings. */
const tag = (name: string) => (attrs: Attrs = {}, ...children: Html[]) => h(name, attrs, ...children);

export const html = tag('html');
export const head = tag('head');
export const body = tag('body');
export const title = tag('title');
export const meta = tag('meta');
export const link = tag('link');
export const header = tag('header');
export const nav = tag('nav');
export const main = tag('main');
export const footer = tag('footer');
export const section = tag('section');
export const article = tag('article');
export const div = tag('div');
export const span = tag('span');
export const p = tag('p');
export const a = tag('a');
export const em = tag('em');
export const strong = tag('strong');
export const code = tag('code');
export const ul = tag('ul');
export const ol = tag('ol');
export const li = tag('li');
export const dl = tag('dl');
export const dt = tag('dt');
export const dd = tag('dd');
export const h1 = tag('h1');
export const h2 = tag('h2');
export const h3 = tag('h3');
export const hr = tag('hr');
export const img = tag('img');
export const figure = tag('figure');
export const figcaption = tag('figcaption');
export const iframe = tag('iframe');
