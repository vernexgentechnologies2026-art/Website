/** Goal selector (hero "Quick plan" card). */
export interface Goal {
  icon: string;
  label: string;
  services: string[];
  target: string;
  timeline: string;
}

export const goals: Goal[] = [
  { icon: '📈', label: 'Get more leads', services: ['Websites', 'Digital Marketing', 'Content'], target: '2–3× enquiries', timeline: '60–90 days' },
  { icon: '⏱', label: 'Save time', services: ['Automation Systems', 'Business Software'], target: '20–40 hrs / week', timeline: '4–6 weeks' },
  { icon: '✦', label: 'Look premium', services: ['Branding', 'Content', 'Websites'], target: 'A brand people trust', timeline: '3–5 weeks' },
  { icon: '▦', label: 'See my numbers', services: ['Dashboards', 'Business Software'], target: 'One live view', timeline: '3–4 weeks' },
];

/** Hero statistics strip. */
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 120, suffix: '+', label: 'Projects delivered' },
  { value: 7, suffix: '', label: 'Services under one roof' },
  { value: 40, suffix: '%', label: 'Less manual work for clients' },
  { value: 24, suffix: 'h', label: 'Reply time, guaranteed' },
];

/** Results section — sample projects from the approved mockup. */
export interface ResultCase {
  industry: string;
  services: string;
  metric: string;
  metricSuffix: string;
  headline: string;
  detail: string;
  /** Progress bar fill, 0–100 */
  bar: number;
}

export const results: ResultCase[] = [
  {
    industry: 'Retail',
    services: 'Software + Automation',
    metric: '30',
    metricSuffix: 'h',
    headline: 'saved every week',
    detail: 'Replaced spreadsheets with a billing, stock and CRM system. Orders and invoices now update automatically.',
    bar: 82,
  },
  {
    industry: 'Healthcare',
    services: 'Website + Ads',
    metric: '2.4',
    metricSuffix: '×',
    headline: 'more enquiries',
    detail: 'New fast website, Google Business and local ads that bring patients from nearby areas.',
    bar: 70,
  },
  {
    industry: 'Education',
    services: 'Automation',
    metric: '<1',
    metricSuffix: 'm',
    headline: 'reply to every lead',
    detail: 'Every enquiry gets an instant WhatsApp reply and goes straight to the admissions team.',
    bar: 95,
  },
];

/** Process steps. */
export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  when: string;
  items: string[];
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'We learn your business, customers and current tools — and find exactly where growth is stuck.',
    when: 'Free · 30 min',
    items: ['Business & goal review', 'Website & tools audit', 'Competitor check'],
  },
  {
    number: '02',
    title: 'Plan',
    description: 'You get a clear roadmap: what we build, by when, what it costs and the results we aim for.',
    when: 'Week 1',
    items: ['Scope & timeline', 'Fixed quote', 'Success metrics'],
  },
  {
    number: '03',
    title: 'Build & Launch',
    description: 'We design and build with weekly demos, so you see progress and nothing is a surprise.',
    when: 'Weeks 2–8',
    items: ['Design & development', 'Weekly demos', 'Testing & launch'],
  },
  {
    number: '04',
    title: 'Grow',
    description: 'After launch we track the numbers, report monthly and keep improving what works.',
    when: 'Ongoing',
    items: ['Monthly reports', 'Optimisation', 'Support'],
  },
];

/** Testimonials — placeholders from the approved mockup; replace with real client quotes. */
export interface Testimonial {
  quote: string;
  initials: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Vernex replaced five tools and a pile of spreadsheets with one system. Our team now spends time selling, not updating sheets.',
    initials: 'RK',
    name: 'Client Name',
    role: 'Founder, Retail Business',
  },
  {
    quote: 'Our new website and ads more than doubled enquiries — and the dashboard shows exactly where each lead came from.',
    initials: 'SM',
    name: 'Client Name',
    role: 'Director, Healthcare Clinic',
  },
  {
    quote: 'Every enquiry now gets a WhatsApp reply in seconds. We stopped losing students to slow follow-ups.',
    initials: 'AP',
    name: 'Client Name',
    role: 'Owner, Education Institute',
  },
];

/** FAQ. */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  { question: 'How much does a project cost?', answer: 'It depends on what you need. After a free call we send a fixed quote — no hidden costs, no surprises.' },
  { question: 'How long does a project take?', answer: 'Websites usually take 2–4 weeks. Software and automation projects take 4–8 weeks, with weekly demos.' },
  { question: 'Do you work with small businesses?', answer: 'Yes. Most of our clients are small and growing businesses that want to scale without hiring a large team.' },
  { question: 'Can you work with the tools we already use?', answer: 'Yes. We connect to your existing software, WhatsApp, email, Google Sheets and more wherever possible.' },
  { question: 'What happens after launch?', answer: 'We offer monthly support and growth plans — reports, improvements and help whenever you need it.' },
];

/** Booking section selling points. */
export const bookingPoints = [
  'Review of your website, tools and marketing',
  '3 quick wins you can act on right away',
  'A clear plan and quote if you want our help',
];
