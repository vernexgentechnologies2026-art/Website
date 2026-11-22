export interface NavItem {
  label: string;
  /** Section id on the homepage */
  sectionId: string;
}

export const mainNav: NavItem[] = [
  { label: 'Services', sectionId: 'services' },
  { label: 'Results', sectionId: 'work' },
  { label: 'Plans', sectionId: 'plans' },
  { label: 'Process', sectionId: 'process' },
  { label: 'FAQ', sectionId: 'faq' },
];

export const legalNav = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms and Conditions', to: '/terms-and-conditions' },
  { label: 'Cookies Policy', to: '/cookies-policy' },
] as const;
