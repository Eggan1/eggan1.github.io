import type { SiteConfig } from '../types.ts';

export const site: SiteConfig = {
  name: 'Khanh An Nguyen',
  lang: 'en',
  nav: [
    { label: 'About', href: '/' },
    { label: 'Research', href: '/research' },
    { label: 'Experience', href: '/experience' },
    { label: 'Teaching', href: '/teaching' },
    { label: 'Advice', href: '/advice' },
  ],
  emails: [
    { label: 'Personal', address: 'nguyenkhanhan0410@gmail.com' },
    { label: 'VinUniversity', address: '24an.nk@vinuni.edu.vn' },
    { label: 'UC San Diego', address: 'khn062@ucsd.edu' },
  ],
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/a-wandering-an-khanh-nguyen/' },
  ],
};
