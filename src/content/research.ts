import type { Publication } from '../types.ts';

/** The author string to pick out in bold, as it is written in the lists below. */
export const SELF = 'K.A. Nguyen';

export const publications: readonly Publication[] = [
  {
    authors: [
      'Y. Zhang',
      SELF,
      'X. Tian',
      'Y. Xu',
      'K. Chang',
      'A. Padua',
      'Y.C. Wu',
      'G. Cauwenberghs',
      'T.-P. Jung',
    ],
    title:
      'GazeAgent: VLM-guided implicit gaze calibration from egocentric multimodal behavior for AI glasses.',
    venue: 'Preprint, 2026.',
    id: 'arXiv:2610.24364',
    href: 'https://arxiv.org/abs/2610.24364',
  },
];
