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
      'yet, because you are a freshman, but you will form them eventually, based on what you do. ',
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

const professionalManner: Article = {
  route: 'advice/keeping-a-professional-manner',
  title: 'Keeping a Professional Manner',
  body: [
    [
      'I have been working on a project that involves four PIs, where I am the only RA and the ',
      'only undergraduate. During the first meetings I was so afraid of saying something wrong, ',
      'and of them seeing me differently afterwards. I have gained a lot of confidence since ',
      'then, but somehow I still hold that feeling often.',
    ],
    [
      'I have also learned it the hard way, through my own mistakes: confusing ideas, not ',
      'grasping the research material well enough, not finishing a report or sending the meeting ',
      'recap on time. Those lessons have become a lot of the qualities and responsibilities I now ',
      'hold myself to, and I hope these tips are useful for you.',
    ],
    {
      list: [
        [
          'Always be on time with reports, and with meeting recaps. It is good to send a recap ',
          'right after a meeting, so you do not forget it later.',
        ],
        [
          'Keep communication clear and transparent. Do not assume other people have the same ',
          'thoughts as you. When you raise something, in person and especially over email, ',
          'include the context and what it is you want to bring up. Even after a meeting, people ',
          'leave with contradicting ideas about what they and you will be doing, which is exactly ',
          'why a recap is different. Be as clear and detailed as you can, and ask others for ',
          'clarification when you do not understand them either.',
        ],
        [
          'Keep everything well documented, including data, scripts and other documents. Having a ',
          'backup that is up to date matters in case of data loss or corruption, and your data, ',
          'scripts and results should be reproducible.',
        ],
        [
          'You do not always have to be serious. You can talk about daily life and joke with your ',
          'PIs and colleagues; just keep it professional when it comes to the work: explaining ',
          'concepts, raising problems. A relaxed environment makes everyone comfortable.',
        ],
      ],
    },
    [
      'More about the work I do: I am very fortunate to be the only RA on the project, and to be ',
      'advised directly by PIs who have come through top institutions and well-known companies. I ',
      'am happier still that they have said they want to train me to be independent and ',
      'autonomous for the future. That has surely shaped the way I work.',
    ],
  ],
};

export const articles: readonly Article[] = [breakingIntoResearch, professionalManner];
