export type ServiceIconKey = 'software' | 'automation' | 'dashboards' | 'websites' | 'branding' | 'content' | 'marketing';

export interface Service {
  id: string;
  name: string;
  icon: ServiceIconKey;
  description: string;
  tags: string[];
  outcome: string;
}

export const services: Service[] = [
  {
    id: 'business-software',
    name: 'Business Software',
    icon: 'software',
    description: 'Custom tools built around how your team works — billing, inventory, CRM, HR and more.',
    tags: ['Billing & inventory', 'CRM', 'Mobile-ready', 'Secure cloud'],
    outcome: 'Replace spreadsheets',
  },
  {
    id: 'automation-systems',
    name: 'Automation Systems',
    icon: 'automation',
    description: 'Repetitive work handled without manual effort — follow-ups, reminders and reports run themselves.',
    tags: ['WhatsApp & email flows', 'Auto reports', 'Integrations'],
    outcome: 'Save 20–40 hrs a week',
  },
  {
    id: 'dashboards',
    name: 'Dashboards',
    icon: 'dashboards',
    description: 'Your numbers in one clear, live view — sales, marketing and operations together.',
    tags: ['Live data', 'KPIs & alerts', 'Mobile view'],
    outcome: 'Decide faster',
  },
  {
    id: 'websites',
    name: 'Websites',
    icon: 'websites',
    description: 'Fast, clear websites that turn visitors into leads and rank on Google.',
    tags: ['Under 2s load', 'SEO-ready', 'Lead forms', 'WhatsApp chat'],
    outcome: 'More enquiries',
  },
  {
    id: 'branding',
    name: 'Branding',
    icon: 'branding',
    description: 'A consistent, premium identity across every touchpoint your customers see.',
    tags: ['Logo & identity', 'Brand guide', 'Templates'],
    outcome: 'Look established',
  },
  {
    id: 'content',
    name: 'Content',
    icon: 'content',
    description: 'Words, videos and visuals that explain what you do and why customers should choose you.',
    tags: ['Website copy', 'Reels & posts', 'Brochures'],
    outcome: 'Build trust',
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    icon: 'marketing',
    description: 'SEO, Google & Meta ads and social campaigns that bring the right customers in.',
    tags: ['Google & Meta ads', 'SEO', 'Monthly reports'],
    outcome: 'Grow every month',
  },
];

/** Industries appended to the marquee after the service names. */
export const industries = ['Retail', 'Healthcare', 'Education', 'Manufacturing', 'Real Estate'];

/** DOM id of a service card; also used as the URL hash (e.g. "/#service-websites"). */
export const serviceAnchorId = (serviceId: string) => `service-${serviceId}`;

/** Index of the service a URL hash points to (e.g. "#service-websites"), or -1. */
export const serviceIndexFromHash = (hash: string) =>
  services.findIndex((s) => `#${serviceAnchorId(s.id)}` === decodeURIComponent(hash));

const byId = (id: string): Service => {
  const service = services.find((s) => s.id === id);
  if (!service) throw new Error(`Unknown service id "${id}"`);
  return service;
};

/** Footer service groupings (as in the approved footer). */
export const footerServiceGroups = [
  { title: 'Build', items: ['business-software', 'dashboards', 'websites'].map(byId) },
  { title: 'Automate & Grow', items: ['automation-systems', 'branding', 'content', 'digital-marketing'].map(byId) },
];
