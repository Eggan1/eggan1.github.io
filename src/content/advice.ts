import type { Article } from '../types.ts';

export const adviceEmpty = 'Writing in progress.';

const breakingIntoResearch: Article = {
  route: 'advice/breaking-into-research',
  title: 'Breaking into Research as a Freshman',
  body: [
    'So you are a freshman who wants to break into research?',
    [
      'At ',
      { text: 'VinUniversity', href: 'https://vinuni.edu.vn/' },
      ' there are many opportunities. What follows is mostly about CECS, but you can adapt ',
      'the same approach for the other colleges.',
    ],
    [
      'CECS has its own research program, the Undergraduate Research Opportunity (UROP). The call ',
      'is sent straight to your student email every semester, so take a look and apply for it.',
    ],
    [
      'None of the projects align with your research interests? Then this post is for you. Here is ',
      'a way you can accelerate your research experience.',
    ],
    [
      'First, identify what your research interests are. I am sure you do not know what they are ',
      'yet, because you are a freshman — but you will form them eventually, based on what you do. ',
      'Trust me.',
    ],
    [
      'Principal Investigators (PIs) and professors are busy, so an email from a freshman is ',
      'likely to be ignored. Most of them will assume you are not experienced enough yet, and ',
      'that taking you on means having to babysit you.',
    ],
    [
      'So the best way in is to contact your Teaching Assistant (TA). Most of them are research ',
      'assistants for a PI. Approach them and ask them about opportunities. If you are on good ',
      'terms with them, they will refer you to the PI directly. Yes, this is networking.',
    ],
    [
      'So how do you network with a TA? The easiest way is to go to their office hours and say ',
      'what you would like to do. Most TAs are willing to help, so there is no need to worry.',
    ],
  ],
};

export const articles: readonly Article[] = [breakingIntoResearch];
