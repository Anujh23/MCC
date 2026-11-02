// Single source of truth for brand info + navigation. Edit here, every page updates.
import {
  Globe, Handshake, Users, ChartColumn, CodeXml,
  SquareKanban, Landmark, FileCheck, MapPin, IdCard,
  Banknote, ShoppingBag, Building, Stethoscope, Rocket,
  Info, Briefcase, Newspaper, Mail,
  PhoneCall, FileText, LifeBuoy,
} from '@lucide/astro';

export const site = {
  name: 'Manka Commerce & Consultancy',
  shortName: 'Manka',
  // Home H1 only. Don't reuse it elsewhere.
  tagline: 'We build the software your business runs on.',
  description:
    'Manka Commerce & Consultancy builds CRMs, HR systems, websites and lending tools like bank statement analysis and payslip verification for growing businesses.',
  // The only public contact detail is the mobile number (owner's choice: no email, LinkedIn,
  // CIN or address on the site). TODO: real number before going live. Read via `contact`.
  phone: '+91 95871 13160',
  email: '',
  location: 'India',
  linkedin: '',
  // Free key from https://web3forms.com (contact form posts there, works on GitHub Pages)
  formAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
};

// Placeholder values come back as null, so the UI can hide them until they're real.
const isPlaceholder = (v?: string | null) => !v || v === '#' || /yourdomain|0{5}|YOUR_/i.test(v);
const real = (v: string) => (isPlaceholder(v) ? null : v);

export const contact = {
  email: real(site.email),
  phone: real(site.phone),
  phoneHref: real(site.phone) ? `tel:${site.phone.replace(/\s/g, '')}` : null,
  linkedin: real(site.linkedin),
  formKey: real(site.formAccessKey),
};

// Prefixes the GitHub Pages base path (e.g. /repo-name) and adds the canonical trailing slash.
// '/about#x' → '/about/#x', '/contact?interest=crm' → '/contact/?interest=crm', '/favicon.svg' unchanged.
// External URLs, mailto/tel, bare '#hash' and already-prefixed paths pass through untouched.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (path: string) => {
  if (/^([a-z][a-z0-9+.-]*:|#|\?|\/\/)/i.test(path)) return path;
  if (base && (path === base || path.startsWith(`${base}/`))) return path;
  const i = path.search(/[?#]/);
  const p = (i === -1 ? path : path.slice(0, i)) || '/';
  const rest = i === -1 ? '' : path.slice(i);
  const withSlash = p.endsWith('/') || /\.[a-z0-9]+$/i.test(p) ? p : `${p}/`;
  return `${base}${withSlash}${rest}`;
};

// Industry pages have no form option of their own, so they map to the closest one.
export const industryInterest: Record<string, string> = {
  'nbfc-lending': 'lending-stack',
  'retail-ecommerce': 'website-development',
  'real-estate': 'crm-development',
  healthcare: 'custom-software',
  'startups-smes': 'custom-software',
};

// '/contact/?interest=…' without the base path (for props that run through href()).
export const contactPath = (interest?: string) => {
  const key = interest ? (industryInterest[interest] ?? interest) : '';
  return key ? `/contact/?interest=${encodeURIComponent(key)}` : '/contact/';
};
// Full link to the contact form, pre-filled when an interest is given. Use this in templates.
export const contactHref = (interest?: string) => href(contactPath(interest));

// CTA labels. Use these instead of typing labels.
export const cta = {
  call: 'Book a free call',
  demo: 'Request a demo',
  api: 'See the API',
  how: 'How it works',
  apiDocs: 'Request API docs',
  model: 'Discuss this model',
  ask: 'Ask an engineer',
  email: 'Email us',
  cv: 'Send your CV',
  introduce: 'Introduce yourself',
  allServices: 'See all services',
  allProducts: 'See all products',
  allIndustries: 'See all industries',
  explore: (name: string) => `Explore ${name}`,
};

// Hidden sections. Flip to true once the owner supplies the real content.
export const flags = { founderStory: false, team: false };

export const productStatus = 'Now onboarding first clients';

// icon is a Lucide Astro component: render with <item.icon size={20} />
// short: the product name to use in running copy ("Explore BSA", "Request a BSA demo").
export type NavItem = { title: string; slug: string; blurb: string; icon: any; short?: string };

export const services: NavItem[] = [
  { title: 'Website Development', slug: 'website-development', blurb: 'Fast, SEO-ready company sites, landing pages and online stores.', icon: Globe },
  { title: 'CRM Development', slug: 'crm-development', blurb: 'Lead-to-collection pipelines with your stages.', icon: Handshake },
  { title: 'HR Solutions', slug: 'hr-solutions', blurb: 'Onboarding, attendance, payroll and appraisals in one place.', icon: Users },
  { title: 'Data & Analytics', slug: 'data-analytics', blurb: 'Dashboards and MIS finance and sales agree on.', icon: ChartColumn },
  { title: 'Custom Software & APIs', slug: 'custom-software', blurb: 'Integrations, automations and internal tools, built to spec.', icon: CodeXml },
];

export const products: NavItem[] = [
  { title: 'Manka CRM', short: 'Manka CRM', slug: 'crm', blurb: 'Leads, follow-ups and field teams on one screen.', icon: SquareKanban },
  { title: 'BSA: Bank Statement Analyser', short: 'BSA', slug: 'bank-statement-analyser', blurb: 'Parse statements, score cash flow and flag bounces before sanction.', icon: Landmark },
  { title: 'Payslip Checker', short: 'Payslip Checker', slug: 'payslip-checker', blurb: 'Verify salary slips and catch tampered documents before you lend.', icon: FileCheck },
  { title: 'Maps API', short: 'Maps API', slug: 'maps-api', blurb: 'Geocoding, distance and territory mapping for field operations.', icon: MapPin },
  { title: 'Manka HRMS', short: 'Manka HRMS', slug: 'hrms', blurb: 'Attendance, leave and Indian payroll, set up with your HR team.', icon: IdCard },
];

export const industries: NavItem[] = [
  { title: 'NBFC & Lending', slug: 'nbfc-lending', blurb: 'Underwriting, collections and compliance tooling.', icon: Banknote },
  { title: 'Retail & E-commerce', slug: 'retail-ecommerce', blurb: 'Storefronts, inventory and customer analytics.', icon: ShoppingBag },
  { title: 'Real Estate', slug: 'real-estate', blurb: 'Lead management and site-visit tracking.', icon: Building },
  { title: 'Healthcare', slug: 'healthcare', blurb: 'Patient records, billing and clinic workflows.', icon: Stethoscope },
  { title: 'Startups & SMEs', slug: 'startups-smes', blurb: 'Your first tech team, without the hiring.', icon: Rocket },
];

export const company: NavItem[] = [
  { title: 'About Us', slug: 'about', blurb: 'Who we are and how we work.', icon: Info },
  { title: 'Careers', slug: 'careers', blurb: 'Build products that ship.', icon: Briefcase },
  { title: 'Insights', slug: 'insights', blurb: 'Notes from the work.', icon: Newspaper },
  { title: 'Contact', slug: 'contact', blurb: 'Talk to an engineer, not a salesperson.', icon: Mail },
];

export const nav = [
  { label: 'Services', base: '/services', all: 'All services', items: services },
  { label: 'Products', base: '/products', all: 'All products', items: products },
  { label: 'Industries', base: '/industries', all: 'All industries', items: industries },
  { label: 'Company', base: '', all: null, items: company },
];

// Options for the contact form's "What can we help with?" select. `value` is what ?interest= carries.
export type Interest = { value: string; label: string; kind: 'service' | 'product' | 'other' };
export const interests: Interest[] = [
  ...services.map((s) => ({ value: s.slug, label: s.title, kind: 'service' as const })),
  ...products.map((p) => ({ value: p.slug, label: p.title, kind: 'product' as const })),
  { value: 'lending-stack', label: 'Lending stack (BSA + Payslip Checker + Manka CRM)', kind: 'other' },
  { value: 'careers', label: 'Careers', kind: 'other' },
  { value: 'other', label: 'Something else', kind: 'other' },
];

// The 5-step engagement process. Used on home and the services index via ui/Steps.
export const howWeWork = [
  { icon: PhoneCall, title: 'Free scoping call', text: 'Thirty minutes with an engineer on the problem, your users and the systems you already run.' },
  { icon: FileText, title: 'Written scope and quote', text: 'One fixed price in ₹ for project work, GST shown separately. Ongoing teams get a monthly rate agreed in writing.' },
  { icon: CodeXml, title: 'Build with regular demos', text: 'Short cycles with a demo at the end of each, on a staging link you can try yourself. Changes are quoted before they’re done.' },
  { icon: Rocket, title: 'Launch and handover', text: 'Data migration, user training and go-live. For custom builds, you get the code and the handover docs.' },
  { icon: LifeBuoy, title: 'Support', text: 'Bug-fix support after launch, with the length agreed up front. After that, an AMC is available.' },
];

// Cards for ui/RelatedCards from product and service slugs, in the order given.
export type RelatedItem = { kind: 'product' | 'service'; title: string; name?: string; blurb: string; path: string; icon: any };
export const relatedFrom = (productSlugs: string[] = [], serviceSlugs: string[] = []): RelatedItem[] => [
  ...productSlugs.flatMap((s) => {
    const p = products.find((x) => x.slug === s);
    return p ? [{ kind: 'product' as const, title: p.title, name: p.short ?? p.title, blurb: p.blurb, path: `/products/${p.slug}/`, icon: p.icon }] : [];
  }),
  ...serviceSlugs.flatMap((s) => {
    const p = services.find((x) => x.slug === s);
    return p ? [{ kind: 'service' as const, title: p.title, blurb: p.blurb, path: `/services/${p.slug}/`, icon: p.icon }] : [];
  }),
];
