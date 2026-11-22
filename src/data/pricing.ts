export interface Plan {
  name: string;
  audience: string;
  /** Price line. The featured plan shows "Tailored to you" (as in the mockup). */
  priceNote: string;
  features: string[];
  featured?: boolean;
}

export interface PlanCategory {
  id: 'marketing' | 'software';
  label: string;
  plans: Plan[];
}

export const planCategories: PlanCategory[] = [
  {
    id: 'marketing',
    label: 'Website & Marketing',
    plans: [
      {
        name: 'Launch',
        audience: 'For businesses getting online properly.',
        priceNote: 'Starts with a free audit',
        features: ['Business website (5 pages)', 'Basic SEO setup', 'Google Business profile', 'WhatsApp chat button'],
      },
      {
        name: 'Grow',
        audience: 'For businesses ready to get leads every month.',
        priceNote: 'Tailored to you',
        features: ['Website + landing pages', 'Monthly SEO & content', 'Google / Meta ads management', '12 social posts a month', 'Monthly results report'],
        featured: true,
      },
      {
        name: 'Scale',
        audience: 'For brands that want a full marketing team.',
        priceNote: 'Custom quote',
        features: ['Everything in Grow', 'Brand refresh', 'Multi-channel campaigns', 'Live marketing dashboard', 'Dedicated manager'],
      },
    ],
  },
  {
    id: 'software',
    label: 'Software & Automation',
    plans: [
      {
        name: 'Launch',
        audience: 'Automate your first big time-waster.',
        priceNote: 'Starts with a free audit',
        features: ['1 automation workflow', 'WhatsApp / email integration', 'Simple reporting', 'Training for your team'],
      },
      {
        name: 'Grow',
        audience: 'Run your core operations on one system.',
        priceNote: 'Tailored to you',
        features: ['Custom software module', 'Automation suite (5+ flows)', 'Live dashboard', 'Mobile access', '3 months support'],
        featured: true,
      },
      {
        name: 'Scale',
        audience: 'A complete system built for your business.',
        priceNote: 'Custom quote',
        features: ['Full ERP / CRM build', 'Unlimited workflows', 'Integrations with your tools', 'Priority support', 'Dedicated team'],
      },
    ],
  },
];
