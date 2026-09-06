import type { Collection } from '../types.ts';

const dir = 'assets/stat1011';

export const teaching: Collection = {
  intro: [
    'Revision guides and practice material I wrote while tutoring STAT1011 — Statistics for ',
    'Social Sciences at VinUniversity, Spring 2026. The curriculum follows ',
    { text: 'OpenStax Introductory Statistics', href: 'https://openstax.org/details/books/introductory-statistics' },
    '.',
  ],
  empty: 'Materials coming soon.',
  items: [
    {
      title: 'A Summary of Statistics for Social Sciences',
      href: `${dir}/stats_summary.pdf`,
      note: 'Condensed notes across the whole course, written to be read before an exam.',
    },
    {
      title: 'Week 1 – Week 4 Revision',
      href: `${dir}/Revision_Week1_4.pdf`,
      note: 'Multiple-choice and written questions with worked solutions, from sampling and data onwards.',
    },
    {
      title: 'Midterm Revision Test 1',
      href: `${dir}/midterm_mock.pdf`,
      note: 'A mock midterm paper with worked answers.',
    },
    {
      title: 'Hypothesis Testing: One Sample and Two Samples',
      href: `${dir}/hypothesis_testing.pdf`,
      note: 'Concept summaries, decision flowcharts, rejection regions and p-values, and step-by-step procedures.',
    },
    {
      title: 'The Chi-Square Distribution',
      href: `${dir}/chi_square_distribution.pdf`,
      note: 'Goodness-of-fit, independence, homogeneity and single-variance tests, with a formula sheet and answer keys.',
    },
    {
      title: 'Linear Regression and Correlation',
      href: `${dir}/linear_reg_corr.pdf`,
      note: 'Chapter 12: scatter plots, the correlation coefficient, and fitting and reading a regression line.',
    },
    {
      title: 'F Distribution and One-Way ANOVA',
      href: `${dir}/f_distribution_one_way_anova.pdf`,
      note: 'Chapter 13 revision guide.',
    },
    {
      title: 'Final Exam Revision Guide',
      href: `${dir}/final_exam_revision_guide.pdf`,
      note: 'Comprehensive coverage of Chapters 1 through 13, with concept summaries and strategies for every chapter.',
    },
  ],
};
