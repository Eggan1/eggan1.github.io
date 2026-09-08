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
  route: '',
  title: 'About',
  render: () =>
    page('/',
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
  route: 'experience',
  title: 'Experience',
  render: () =>
    page('/experience',
      p({ class: 'lede' },
        `Updated ${cv.updated}. `,
        a({ href: cv.href, target: '_blank', rel: 'noopener' }, cv.label),
        '.',
      ),
      experienceList(experience),
    ),
};

const teachingPage: Page = {
  route: 'teaching',
  title: 'Teaching',
  render: () => page('/teaching', block('teaching', 'Teaching', resourceList(teaching))),
};

const advicePage: Page = {
  route: 'advice',
  title: 'Advice',
  render: () =>
    page('/advice',
      block('advice', 'Advice',
        resourceList({
          empty: adviceEmpty,
          items: articles.map((article) => ({
            title: article.title,
            href: `/${article.route}`,
            date: article.date,
          })),
        }),
      ),
    ),
};

/** Each piece of writing becomes its own page under advice/. */
const articlePages: readonly Page[] = articles.map((article) => ({
  route: article.route,
  title: article.title,
  render: () => page('/advice', articleView(article)),
}));

export const pages: readonly Page[] = [
  home,
  experiencePage,
  teachingPage,
  advicePage,
  ...articlePages,
];
