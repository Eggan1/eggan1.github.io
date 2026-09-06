import type { About } from '../types.ts';

export const about: About = {
  paragraphs: [
    [
      'I am a junior at ',
      { text: 'VinUniversity', href: 'https://vinuni.edu.vn/' },
      ' in Hanoi, reading for a BSc in Data Science with a minor in Economics.',
    ],
    [
      'My research interests are in computational neuroscience, ranging from the statistical side ',
      '— computational methods, algorithms — through to human–computer interaction: eye tracking, ',
      'brain–computer interfaces, and EEG.',
    ],
    [
      'Besides research, I have a keen interest in teaching. It motivates me, and it is where new ',
      'ideas come to me most easily. I feel happy and fascinated whenever I get the chance to see ',
      'the moment someone truly understands something. That is why I want to do a PhD.',
    ],
    [
      'Are you an undergrad who needs advice on research? Go to ',
      { text: 'Advice', href: 'advice.html' },
      '.',
    ],
  ],
  portrait: {
    src: 'assets/prof_pic.JPG',
    alt: 'Portrait of Khanh An Nguyen',
  },
};
