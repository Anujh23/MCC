// Rich content for /industries/<slug>. Keys match `industries[].slug` in site.ts.
import { Calculator, Wallet, Repeat, Gauge, MapPin, HandCoins } from '@lucide/astro';

export type Status = 'ok' | 'warn' | 'info';

export type IndustryContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  /** Short name for tight spots like the industries index hero cards */
  short: string;
  headline: string;
  highlight: string;
  intro: string;
  /** Small demo card shown in the hero (sample data only) */
  heroCard: {
    title: string;
    subtitle: string;
    /** `short` is the label used on the industries index hero card */
    rows: { label: string; short?: string; value: string; status: Status }[];
    footer: { label: string; value: string };
  };
  /** Short bullets for the industries index */
  focus: string[];
  pairs: { challenge: string; help: string }[];
  deepDive?: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { icon: any; term: string; title: string; text: string; sample: string }[];
  };
  workflow: {
    title: string;
    intro: string;
    steps: { title: string; text: string; tools: { label: string; path: string }[] }[];
  };
  services: string[];
  products: string[];
  faqs: { q: string; a: string }[];
};

const T = {
  crm: { label: 'CRM', path: '/products/crm/' },
  bsa: { label: 'BSA', path: '/products/bank-statement-analyser/' },
  payslip: { label: 'Payslip Checker', path: '/products/payslip-checker/' },
  maps: { label: 'Maps API', path: '/products/maps-api/' },
  hrms: { label: 'HRMS', path: '/products/hrms/' },
  custom: { label: 'Custom integration', path: '/services/custom-software/' },
  rules: { label: 'Rules engine', path: '/services/custom-software/' },
  web: { label: 'Website', path: '/services/website-development/' },
  data: { label: 'Dashboards', path: '/services/data-analytics/' },
};

export const industriesContent: Record<string, IndustryContent> = {
  'nbfc-lending': {
    metaTitle: 'Software for NBFCs & Lenders: Lead to Collections',
    metaDescription:
      'Lending software for NBFCs and DSAs: lead management, bank statement analysis, payslip checks, FOIR rules, field verification and collections.',
    eyebrow: 'NBFC & lending',
    short: 'NBFC & lending',
    headline: 'Lending software, from first lead to last EMI',
    highlight: 'last EMI',
    intro: 'Leads, document checks, underwriting rules, field verification and collections for NBFCs, lenders and DSAs.',
    heroCard: {
      title: 'Application LA-20481',
      subtitle: 'Personal loan · ₹3,00,000',
      rows: [
        { label: 'CIBIL score', short: 'CIBIL', value: '742', status: 'ok' },
        { label: 'FOIR (cap 55%)', short: 'FOIR', value: '41%', status: 'ok' },
        { label: 'ABB, last 6 months', short: 'ABB', value: '₹38,200', status: 'ok' },
        { label: 'ECS / NACH bounces', short: 'Bounces', value: '1 in 6 mo', status: 'warn' },
        { label: 'Payslip vs bank credit', value: 'Matches', status: 'ok' },
        { label: 'Field visit', value: 'Geo-tagged · 0.4 km', status: 'ok' },
      ],
      footer: { label: 'Rules engine', value: 'Refer to credit: 1 flag' },
    },
    focus: ['Bank statement analysis', 'Payslip checks and FOIR', 'Field verification', 'Collections'],
    pairs: [
      { challenge: 'Credit reads 30-page statements line by line.', help: 'BSA works out ABB, salary credits, EMIs and bounces, and flags edits.' },
      { challenge: 'Payslips get edited before they reach you.', help: 'Payslip Checker matches net pay with bank credits and flags tampering.' },
      { challenge: 'Every credit manager calculates FOIR differently.', help: 'A rules engine computes FOIR the same way every time.' },
      { challenge: 'Collections teams call the wrong accounts.', help: 'Daily DPD lists, priority scoring and route-planned visits.' },
    ],
    deepDive: {
      eyebrow: 'Underwriting',
      title: 'The checks we automate, the way your policy defines them',
      intro: 'Each check follows your credit policy, and every result is stored with the data behind it.',
      items: [
        { icon: Calculator, term: 'FOIR', title: 'Fixed obligations to income', text: 'Verified income against existing EMIs.', sample: 'e.g. 41% against a 55% cap' },
        { icon: Wallet, term: 'ABB', title: 'Average bank balance', text: 'On the dates your policy specifies.', sample: 'e.g. ₹38,200 over 6 months' },
        { icon: Repeat, term: 'Bounces', title: 'Cheque, ECS and NACH returns', text: 'Counted by month and reason.', sample: 'e.g. 1 NACH return in month 4' },
        { icon: Gauge, term: 'Bureau', title: 'Bureau pulls', text: 'Through your own bureau membership, parsed into the file.', sample: 'e.g. 742, no DPD in 24 months' },
        { icon: MapPin, term: 'FI', title: 'Field verification', text: 'GPS, time and photos against the declared address.', sample: 'e.g. 0.4 km from declared address' },
        { icon: HandCoins, term: 'Collections', title: 'Buckets and PTP', text: 'Allocation, promise-to-pay and UPI payment links.', sample: 'e.g. 1–30 DPD bucket, PTP on the 12th' },
      ],
    },
    workflow: {
      title: 'Where we fit in your loan journey',
      intro: 'Use the whole chain or only the pieces you need next to your LMS.',
      steps: [
        { title: 'Lead capture', text: 'Every source in one queue, deduped on PAN and mobile.', tools: [T.crm] },
        { title: 'Bank statement analysis', text: 'ABB, salary, EMIs, bounces and tamper flags.', tools: [T.bsa] },
        { title: 'Payslip check', text: 'Cross-checked against bank credits.', tools: [T.payslip] },
        { title: 'Field verification', text: 'Geo-tagged visits, assigned by distance.', tools: [T.crm, T.maps] },
        { title: 'Credit decision', text: 'Bureau, FOIR and policy rules; credit approves.', tools: [T.rules] },
        { title: 'Collections', text: 'DPD buckets, routes and UPI payment links.', tools: [T.crm, T.maps, T.data] },
      ],
    },
    services: ['crm-development', 'data-analytics', 'custom-software'],
    products: ['bank-statement-analyser', 'payslip-checker', 'crm', 'maps-api'],
    faqs: [
      { q: 'Can BSA read statements from every bank?', a: 'It’s built for Indian bank statements, including scans. Send a few masked samples and we’ll run them in the demo.' },
      { q: 'Do you integrate with CIBIL and the other bureaus?', a: 'Yes, through your own bureau membership. The report is parsed into the loan file.' },
      { q: 'Will this replace our LMS?', a: 'Usually not. We connect to it.' },
    ],
  },

  'retail-ecommerce': {
    metaTitle: 'Retail & E-commerce Software: Stores & Inventory',
    metaDescription:
      'Online stores with UPI checkout, inventory sync across outlets and marketplaces, tax invoicing and customer analytics for Indian retailers.',
    eyebrow: 'Retail & e-commerce',
    short: 'Retail',
    headline: 'Run your store, online and off, from one set of numbers',
    highlight: 'online and off',
    intro: 'Online stores, inventory sync, distributor ordering and customer analytics for brands and retailers.',
    heroCard: {
      title: 'Today at a glance',
      subtitle: 'Sample store',
      rows: [
        { label: 'Orders (web + store)', short: 'Orders today', value: '128', status: 'ok' },
        { label: 'Paid by UPI', value: '71%', status: 'info' },
        { label: 'COD pending confirmation', value: '9', status: 'warn' },
        { label: 'SKUs below reorder level', value: '6', status: 'warn' },
        { label: 'Returns this week', value: '2.3%', status: 'ok' },
      ],
      footer: { label: 'Tax invoices', value: 'All 128 generated' },
    },
    focus: ['Online stores', 'Inventory sync', 'Invoicing', 'Customer analytics'],
    pairs: [
      { challenge: 'Stock differs between the shop, the website and marketplaces.', help: 'One inventory that syncs everywhere, with low-stock alerts.' },
      { challenge: 'Customers drop off at checkout on their phones.', help: 'A fast mobile checkout with UPI, cards and COD rules.' },
      { challenge: 'Invoicing is done by hand at month-end.', help: 'Tax invoices generated with every order.' },
      { challenge: 'Distributors order over WhatsApp and calls.', help: 'A B2B portal with dealer pricing and order status.' },
    ],
    workflow: {
      title: 'From catalogue to repeat order',
      intro: 'The order flow we usually build.',
      steps: [
        { title: 'Catalogue', text: 'Managed once, published everywhere.', tools: [T.web] },
        { title: 'Order and payment', text: 'Web, counter and marketplace orders in one list.', tools: [T.custom] },
        { title: 'Inventory update', text: 'Stock reduced on every channel at once.', tools: [T.custom] },
        { title: 'Dispatch', text: 'Pin-code checks and delivery tracking.', tools: [T.maps] },
        { title: 'Returns', text: 'Tracked to refund.', tools: [T.crm] },
        { title: 'Repeat and analytics', text: 'Cohorts and repeat rates on one dashboard.', tools: [T.data] },
      ],
    },
    services: ['website-development', 'data-analytics', 'custom-software'],
    products: ['crm', 'maps-api'],
    faqs: [
      { q: 'Shopify or a custom-built store?', a: 'For a standard catalogue, Shopify or WooCommerce. Custom makes sense for B2B pricing or ERP integration.' },
      { q: 'Can you sync with marketplaces?', a: 'Yes, through seller APIs or a connector, depending on the marketplace.' },
      { q: 'Which payment gateways do you work with?', a: 'Razorpay, Cashfree, PayU and others. The merchant account is in your name.' },
    ],
  },

  'real-estate': {
    metaTitle: 'Real Estate CRM: Leads & Site-Visit Tracking',
    metaDescription:
      'Real estate CRM for developers and brokers: portal leads in one queue, site-visit scheduling with geo-tagged check-ins and channel partner tracking.',
    eyebrow: 'Real estate',
    short: 'Real estate',
    headline: 'From portal lead to site visit to booking, without the leaks',
    highlight: 'without the leaks',
    intro: 'Portal and ad leads in one place, assigned fast, with site visits and bookings tracked to handover.',
    heroCard: {
      title: 'Site visits · Saturday',
      subtitle: 'Sample project',
      rows: [
        { label: '10:30 · 2 BHK, Tower B', short: '10:30 · Tower B', value: 'Confirmed', status: 'ok' },
        { label: '11:45 · 3 BHK, Tower A', value: 'Pickup arranged', status: 'info' },
        { label: '13:00 · Plot 14', value: 'Rescheduled', status: 'warn' },
        { label: '15:30 · 2 BHK, Tower C', value: 'Checked in on site', status: 'ok' },
        { label: '17:00 · 3 BHK, Tower B', value: 'Confirmed', status: 'ok' },
      ],
      footer: { label: 'Uncalled leads', value: '0 over 15 min' },
    },
    focus: ['Portal lead capture', 'Site-visit tracking', 'Unit inventory', 'Channel partners'],
    pairs: [
      { challenge: 'Portal and ad leads arrive in five different inboxes.', help: 'One CRM queue within minutes, deduped by phone.' },
      { challenge: 'Hot leads go cold before anyone calls.', help: 'Auto-assignment and a call-within-15-minutes rule.' },
      { challenge: 'Site visits aren’t confirmed or tracked.', help: 'WhatsApp confirmations and geo-tagged check-in on site.' },
      { challenge: 'Channel partner payouts lead to disputes.', help: 'Attribution from the first touch, with payouts everyone can see.' },
    ],
    workflow: {
      title: 'The sales journey, step by step',
      intro: 'How an enquiry moves to booking.',
      steps: [
        { title: 'Enquiry', text: 'Every lead captured with its source.', tools: [T.crm, T.web] },
        { title: 'Qualification call', text: 'Budget, location and timeline.', tools: [T.crm] },
        { title: 'Site visit', text: 'Reminder, then geo-tagged check-in.', tools: [T.crm, T.maps] },
        { title: 'Hold and booking', text: 'Unit held, token paid by UPI.', tools: [T.custom] },
        { title: 'Reporting', text: 'Leads by source and visit-to-booking ratio.', tools: [T.data] },
      ],
    },
    services: ['crm-development', 'website-development', 'data-analytics'],
    products: ['crm', 'maps-api'],
    faqs: [
      { q: 'Can it pull leads from property portals?', a: 'Usually, yes, through the portal’s lead push, an email parser or an import.' },
      { q: 'Do you build project microsites?', a: 'Yes, with floor plans, EMI calculators and forms that feed the CRM.' },
      { q: 'Can the sales team use it on their phones?', a: 'Yes, including site-visit check-ins and photos.' },
    ],
  },

  healthcare: {
    metaTitle: 'Clinic & Hospital Software: Appointments to Billing',
    metaDescription:
      'Clinic and hospital software for India: appointments with tokens, patient records, billing and TPA claims, pharmacy stock with expiry tracking.',
    eyebrow: 'Healthcare',
    short: 'Healthcare',
    headline: 'Clinic and hospital workflows that free up the front desk',
    highlight: 'the front desk',
    intro: 'Appointments, patient records, billing and pharmacy stock for clinics and small hospitals.',
    heroCard: {
      title: 'OPD queue · Morning',
      subtitle: 'Sample clinic',
      rows: [
        { label: 'Token 14 · General OPD', short: 'Token 14', value: 'In consultation', status: 'ok' },
        { label: 'Token 15 · General OPD', value: 'Next, alert sent', status: 'info' },
        { label: 'Token 16 · Paediatrics', value: 'Waiting 12 min', status: 'warn' },
        { label: 'Token 17 · Orthopaedics', value: 'Booked online', status: 'info' },
        { label: 'Token 18 · General OPD', value: 'Checked in', status: 'ok' },
      ],
      footer: { label: 'Bills today', value: 'Cash + UPI matched' },
    },
    focus: ['Appointments and tokens', 'Patient records', 'Billing and TPA', 'Pharmacy stock'],
    pairs: [
      { challenge: 'Patients wait in a crowded lobby.', help: 'Token booking, with a WhatsApp message when their turn is close.' },
      { challenge: 'Patient history is scattered across paper files.', help: 'One record per patient, found by phone number.' },
      { challenge: 'Billing and insurance claims get mixed up.', help: 'Itemised bills, TPA tracking and daily reconciliation.' },
      { challenge: 'Medicines expire on the shelf.', help: 'Batch and expiry tracking with reorder alerts.' },
    ],
    workflow: {
      title: 'A patient visit, end to end',
      intro: 'The flow we build for outpatient clinics.',
      steps: [
        { title: 'Booking', text: 'Online, phone or walk-in.', tools: [T.web, T.custom] },
        { title: 'Registration', text: 'Patient found by phone, token issued.', tools: [T.custom] },
        { title: 'Consultation', text: 'Notes and prescription on the record.', tools: [T.custom] },
        { title: 'Billing and pharmacy', text: 'One bill; cash, card or UPI.', tools: [T.custom] },
        { title: 'Follow-up', text: 'Reminders for review visits.', tools: [T.crm] },
      ],
    },
    services: ['custom-software', 'website-development', 'data-analytics'],
    products: ['crm', 'hrms'],
    faqs: [
      { q: 'How is patient data protected?', a: 'Role-based access, encryption and audit logs.' },
      { q: 'We’re a single clinic. Is this too much?', a: 'No. Start with booking, records and billing.' },
      { q: 'Can patients book online?', a: 'Yes, from your website, a link or WhatsApp.' },
    ],
  },

  'startups-smes': {
    metaTitle: 'Software for Startups & SMEs: MVPs & Internal Tools',
    metaDescription:
      'A tech team for startups and SMEs without the hiring: websites, MVPs, internal tools, integrations and investor-ready MIS.',
    eyebrow: 'Startups & SMEs',
    short: 'Startups & SMEs',
    headline: 'Your first tech team, without the hiring',
    highlight: 'without the hiring',
    intro: 'Websites, MVPs, internal tools and dashboards for teams not ready to hire engineers.',
    heroCard: {
      title: 'MVP plan',
      subtitle: 'Sample project',
      rows: [
        { label: 'Scope written and signed off', short: 'Scope signed', value: 'Done', status: 'ok' },
        { label: 'Clickable prototype', value: 'Done', status: 'ok' },
        { label: 'Sprint 1 · Sign-up, payments', value: 'Demo Friday', status: 'info' },
        { label: 'Sprint 2 · Admin panel', value: 'Next', status: 'info' },
        { label: 'Launch checklist', value: 'Not started', status: 'warn' },
      ],
      footer: { label: 'Code', value: 'In your repository' },
    },
    focus: ['MVPs', 'Internal tools', 'Integrations', 'MIS and dashboards'],
    pairs: [
      { challenge: 'You need an MVP but can’t hire engineers yet.', help: 'A small team that builds the smallest useful version in weeks.' },
      { challenge: 'Operations run on WhatsApp groups and Excel.', help: 'A simple internal tool your team will use every day.' },
      { challenge: 'Investors ask for numbers you can’t pull quickly.', help: 'A clean MIS with revenue, unit economics and cash.' },
      { challenge: 'Your freelancer disappeared mid-project.', help: 'A code audit and a plain plan to fix or rebuild.' },
    ],
    workflow: {
      title: 'From idea to a product you can sell',
      intro: 'How a first build usually runs.',
      steps: [
        { title: 'Idea and scope', text: 'The smallest version that proves it.', tools: [T.custom] },
        { title: 'Prototype', text: 'Screens to show customers first.', tools: [T.web] },
        { title: 'MVP build', text: 'A working demo every two weeks.', tools: [T.custom] },
        { title: 'Launch', text: 'Website, payments and analytics.', tools: [T.web] },
        { title: 'Measure', text: 'Sign-ups and revenue on one dashboard.', tools: [T.data] },
      ],
    },
    services: ['website-development', 'custom-software', 'data-analytics'],
    products: ['hrms', 'crm'],
    faqs: [
      { q: 'How small a project will you take on?', a: 'A landing page or a single internal tool is fine.' },
      { q: 'What does an MVP cost?', a: 'It depends on scope. You get a fixed written quote for the first phase.' },
      { q: 'Can you help when we hire our own developers?', a: 'Yes. Everything is documented, and we walk your new hires through it.' },
    ],
  },
};
