import type { ExperienceGroup } from '../types.ts';

export const cv = { href: '/assets/CV.pdf', label: 'Full CV', updated: 'August 2026' };

export const experience: readonly ExperienceGroup[] = [
  {
    heading: 'Research',
    items: [
      {
        org: 'Swartz Center for Computational Neuroscience (SCCN), UC San Diego',
        location: 'La Jolla, CA',
        role: 'Visiting Research Student',
        period: 'Jun 2026 – Present',
      },
      {
        org: 'VinUniversity',
        location: 'Remote',
        role: 'Research Assistant — Urban Travel-Time & Routing Data',
        period: 'Jun 2026 – Present',
      },
      {
        org: 'LSM’s CoLab, VinUniversity / Lancaster University',
        location: 'Hanoi, Vietnam',
        role: 'Research Assistant — Robust Federated Learning',
        period: 'Feb 2026 – Present',
      },
    ],
  },
  {
    heading: 'Teaching',
    items: [
      {
        org: 'College of Arts and Sciences, VinUniversity',
        location: 'Hanoi, Vietnam',
        role: 'Tutor — STAT1011 Statistics for Social Sciences',
        period: 'Jan 2026 – Jun 2026',
      },
    ],
  },
  {
    heading: 'Work',
    items: [
      {
        org: 'VinUniversity Library',
        location: 'Hanoi, Vietnam',
        role: 'Technical Media Developer',
        period: 'Sep 2024 – Jan 2026',
      },
    ],
  },
];
