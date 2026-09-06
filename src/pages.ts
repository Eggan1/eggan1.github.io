import type { Page } from './types.ts';
import { about } from './content/about.ts';
import { experience, cv } from './content/experience.ts';
import { teaching } from './content/teaching.ts';
import { adviceEmpty, articles } from './content/advice.ts';
import {
  articleView, block, contactBlock, experienceList, page, prose, resourceList,
} from './lib/components.ts';
import { a, figure, img, p } from './lib/html.ts';

const home: Page = {
  slug: 'index.html',
  title: 'About',
  render: (base) =>
    page('index.html', base,
      block('about', 'About',
        about.portrait
          ? figure({ class: 'portrait' },
              img({ src: about.portrait.src, alt: about.portrait.alt, loading: 'lazy' }))
          : null,
        about.paragraphs.map((paragraph) => p({}, prose(paragraph))),
      ),
      contactBlock(),
    ),
};

const experiencePage: Page = {
  slug: 'experience.html',
  title: 'Experience',
  render: (base) =>
    page('experience.html', base,
      p({ class: 'lede' },
        `Updated ${cv.updated}. `,
        a({ href: cv.href, target: '_blank', rel: 'noopener' }, cv.label),
        '.',
      ),
      experienceList(experience),
    ),
};

const teachingPage: Page = {
  slug: 'teaching.html',
  title: 'Teaching',
  render: (base) =>
    page('teaching.html', base, block('teaching', 'Teaching', resourceList(teaching))),
};

const advicePage: Page = {
  slug: 'advice.html',
  title: 'Advice',
  render: (base) =>
    page('advice.html', base,
      block('advice', 'Advice',
        resourceList({
          empty: adviceEmpty,
          items: articles.map((article) => ({
            title: article.title,
            href: article.slug,
            date: article.date,
          })),
        }),
      ),
    ),
};

/** Each piece of writing becomes its own page under advice/. */
const articlePages: readonly Page[] = articles.map((article) => ({
  slug: article.slug,
  title: article.title,
  render: (base) => page('advice.html', base, articleView(article)),
}));

export const pages: readonly Page[] = [
  home,
  experiencePage,
  teachingPage,
  advicePage,
  ...articlePages,
];
