import { GithubIcon, InstagramIcon, LinkedInIcon } from 'client/svgs';
import { TMenuItem, TSocialItem } from 'client/types/common';

export const NAVIGATE_MENU: TMenuItem[] = [
  {
    id: 'home',
    label: 'home',
    url: '/',
    urlMatch: '/',
  },
  {
    id: 'about-me',
    label: 'about-me',
    url: '/#about-me',
    urlMatch: '/#about-me',
  },
  {
    id: 'projects',
    label: 'projects',
    url: '/#projects',
    urlMatch: '/#projects',
  },
  {
    id: 'contacts',
    label: 'contacts',
    url: '/#contacts',
    urlMatch: '/#contacts',
  },
];

export const LIST_SOCIAL: TSocialItem[] = [
  {
    id: 'github',
    Icon: GithubIcon,
    link: '/#instagram',
  },
  {
    id: 'instagram',
    Icon: InstagramIcon,
    link: '#instagram',
  },
  {
    id: 'linkedin',
    Icon: LinkedInIcon,
    link: '#linkedin',
  },
];
