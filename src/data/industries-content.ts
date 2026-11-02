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
  crm: { label: 'Manka CRM', path: '/products/crm/' },
  bsa: { label: 'BSA', path: '/products/bank-statement-analyser/' },
  payslip: { label: 'Payslip Checker', path: '/products/payslip-checker/' },
  maps: { label: 'Maps API', path: '/products/maps-api/' },
  hrms: { label: 'Manka HRMS', path: '/products/hrms/' },
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
    intro:
      'Lead management, document checks, underwriting rules, field verification and collections for NBFCs, fintech lenders and DSAs. Built around the numbers credit looks at: FOIR, ABB, bounces and bureau history.',
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
      { challenge: 'Bank statements arrive as 30-page PDFs and credit reads them line by line.', help: 'BSA parses the statement, computes ABB, salary credits, EMI obligations and bounces, and flags signs of editing.' },
      { challenge: 'Payslips get edited before they reach you.', help: 'Payslip Checker compares employer, net pay and dates against the bank credits and flags layout and font tampering.' },
      { challenge: 'Every credit manager calculates FOIR a little differently.', help: 'A rules engine computes FOIR from verified income and bureau obligations the same way every time, and records the policy version used.' },
      { challenge: 'Field verification reports can’t always be trusted.', help: 'Geo-tagged, time-stamped visits with photos, plotted against the applicant’s declared address through the Manka CRM field app and Maps API.' },
      { challenge: 'Collections teams spend the day on the wrong accounts.', help: 'Daily DPD bucket lists, priority scoring, route-planned field visits and promise-to-pay tracking with UPI payment links.' },
      { challenge: 'DSA leads arrive duplicated and with half the documents.', help: 'Dedupe on PAN and mobile, checklist-driven document collection, and a partner portal where DSAs see case status.' },
    ],
    deepDive: {
      eyebrow: 'Underwriting',
      title: 'The checks we automate, the way your policy defines them',
      intro: 'Each check is configured to your credit policy, and every result is stored with the data behind it, so you can always answer who approved a case and why.',
      items: [
        { icon: Calculator, term: 'FOIR', title: 'Fixed obligations to income', text: 'Net income from verified payslips and salary credits, against existing EMIs from the bureau report and the statement.', sample: 'e.g. 41% against a 55% cap' },
        { icon: Wallet, term: 'ABB', title: 'Average bank balance', text: 'Balances on the dates your policy specifies, such as the 5th, 15th and 25th, averaged over 6 or 12 months.', sample: 'e.g. ₹38,200 over 6 months' },
        { icon: Repeat, term: 'Bounces', title: 'Cheque, ECS and NACH returns', text: 'Inward and outward returns counted by month and reason, with return charges and their dates flagged.', sample: 'e.g. 1 NACH return in month 4' },
        { icon: Gauge, term: 'Bureau', title: 'CIBIL and bureau pull integration', text: 'API pulls through your NBFC’s own membership with CIBIL, Experian, CRIF High Mark or Equifax. Score, enquiries and DPD history parsed into the loan file.', sample: 'e.g. 742, no DPD in 24 months' },
        { icon: MapPin, term: 'FI', title: 'Field verification with geo-tagging', text: 'Residence and office visits with GPS location, timestamp, photos and distance from the declared address, plus the verifier’s remarks.', sample: 'e.g. 0.4 km from declared address' },
        { icon: HandCoins, term: 'Collections', title: 'Buckets, allocation and PTP', text: 'DPD buckets, agent allocation, promise-to-pay tracking, route-planned visits and payment links over UPI.', sample: 'e.g. 1–30 DPD bucket, PTP on the 12th' },
      ],
    },
    workflow: {
      title: 'Where Manka fits in your loan journey',
      intro: 'A typical retail lending flow. Use the whole chain or plug in only the pieces you need next to your existing LMS.',
      steps: [
        { title: 'Lead capture', text: 'Website, DSA, branch and campaign leads in one queue, deduped on PAN and mobile.', tools: [T.crm] },
        { title: 'KYC', text: 'PAN, Aadhaar-based eKYC and video KYC through your chosen KYC provider, with results stored on the file.', tools: [T.custom] },
        { title: 'Bank statement analysis', text: 'ABB, salary credits, existing EMIs, bounces and tampering flags from the uploaded PDF.', tools: [T.bsa] },
        { title: 'Payslip check', text: 'Payslip details cross-checked against bank credits and employer data.', tools: [T.payslip] },
        { title: 'Field verification', text: 'Geo-tagged residence and office visits, assigned by distance.', tools: [T.crm, T.maps] },
        { title: 'Bureau pull and credit decision', text: 'CIBIL pull, FOIR and policy rules produce a recommendation; credit approves with reasons logged.', tools: [T.rules] },
        { title: 'Disbursal', text: 'Sanction letter, Key Fact Statement, e-sign and e-NACH mandate, then the disbursal file to your bank.', tools: [T.custom] },
        { title: 'Collections', text: 'DPD buckets, agent allocation, route planning, PTP tracking and UPI payment links.', tools: [T.crm, T.maps, T.data] },
      ],
    },
    services: ['crm-development', 'data-analytics', 'custom-software'],
    products: ['bank-statement-analyser', 'payslip-checker', 'crm', 'maps-api'],
    faqs: [
      { q: 'Can BSA read statements from every bank?', a: 'BSA is built for Indian bank statements. Digital PDFs give the cleanest read. Scans and phone photos go through OCR, with low-confidence pages marked for review. Password-protected PDFs open with the password the applicant shares. Send us a few sample statements (masked is fine) and we’ll run them in the demo.' },
      { q: 'Do you integrate with CIBIL and the other bureaus?', a: 'Yes, through your NBFC’s own bureau membership and credentials. We build the API pull, parse the report into the loan file, and keep the raw response for audit.' },
      { q: 'Will this replace our LMS?', a: 'Usually not. We integrate with it: sanctioned cases go to your LMS through its API or a file exchange, and repayment status comes back for collections.' },
      { q: 'How do you handle customer data and regulatory expectations?', a: 'Custom builds run in accounts in your name; BSA and our other products run on our hosted setup or on your servers. Access is role-based, and every decision is logged with who made it and why. We build to your compliance team’s requirements; we don’t certify compliance ourselves.' },
    ],
  },

  'retail-ecommerce': {
    metaTitle: 'Retail & E-commerce Software: Stores & Inventory',
    metaDescription:
      'Online stores with UPI checkout, inventory sync across outlets and marketplaces, GST invoicing and customer analytics for Indian retailers.',
    eyebrow: 'Retail & e-commerce',
    short: 'Retail',
    headline: 'Run your store, online and off, from one set of numbers',
    highlight: 'online and off',
    intro:
      'Online stores, inventory sync across outlets and marketplaces, distributor ordering and customer analytics for D2C brands, retailers and distributors.',
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
      footer: { label: 'GST invoices', value: 'All 128 generated' },
    },
    focus: ['Online stores', 'Inventory sync', 'GST invoicing', 'Customer analytics'],
    pairs: [
      { challenge: 'Stock counts differ between the shop, the website and the marketplaces.', help: 'One inventory source that syncs to your store and marketplace listings, with low-stock alerts per SKU and location.' },
      { challenge: 'Customers drop off at checkout on their phones.', help: 'A fast, mobile-first checkout with UPI, cards, COD rules and pin-code serviceability checks.' },
      { challenge: 'GST invoicing is done by hand at month-end.', help: 'GST invoices generated per order with HSN codes, and reports your accountant can file from.' },
      { challenge: 'You don’t know who your repeat customers are.', help: 'Customer and cohort dashboards: repeat rate, basket size, and which campaigns bring buyers back.' },
      { challenge: 'Distributors place orders over WhatsApp and phone calls.', help: 'A B2B ordering portal with dealer-specific pricing, credit limits and order status.' },
    ],
    workflow: {
      title: 'From catalogue to repeat order',
      intro: 'The order flow we usually build for. Each step can connect to tools you already use.',
      steps: [
        { title: 'Catalogue and listings', text: 'Products, variants and prices managed once and published to your store and marketplaces.', tools: [T.web] },
        { title: 'Order', text: 'Orders from the website, the shop counter and marketplaces in one list.', tools: [T.custom] },
        { title: 'Payment', text: 'UPI, cards and COD, with payment status matched to the order automatically.', tools: [T.web] },
        { title: 'Inventory update', text: 'Stock reduced across every channel the moment an order is confirmed.', tools: [T.custom] },
        { title: 'Dispatch and delivery', text: 'Pin-code checks, delivery zones and shipping aggregator tracking.', tools: [T.maps] },
        { title: 'Returns and refunds', text: 'Return requests, pickup and refunds tracked to closure.', tools: [T.crm] },
        { title: 'Repeat and analytics', text: 'Cohorts, repeat rates and campaign results on one dashboard.', tools: [T.data] },
      ],
    },
    services: ['website-development', 'data-analytics', 'custom-software'],
    products: ['crm', 'maps-api'],
    faqs: [
      { q: 'Shopify or a custom-built store?', a: 'For a standard catalogue and a quick launch, Shopify or WooCommerce is usually the right call, and we’ll set it up properly. Custom builds make sense for B2B pricing, complex catalogues or deep ERP integration.' },
      { q: 'Can you sync with marketplaces?', a: 'Yes, through marketplace seller APIs or a connector service, depending on the marketplace and your order volume. We recommend an approach after looking at your setup.' },
      { q: 'Which payment gateways do you work with?', a: 'Razorpay, Cashfree, PayU and others with standard APIs. You open the merchant account in your name; we integrate it.' },
      { q: 'Can you help with delivery zones and pin-code checks?', a: 'Yes. We integrate shipping aggregators for rates and tracking, and use our Maps API for delivery zones and distance-based charges.' },
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
    intro:
      'Lead management for developers and brokers: capture enquiries from property portals and ads, assign them fast, schedule site visits, and track every booking through to handover.',
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
      { challenge: 'Portal and ad leads arrive in five different inboxes.', help: 'Leads from property portals, ads and your website land in one CRM queue within minutes, deduped by phone number.' },
      { challenge: 'Hot leads go cold before anyone calls.', help: 'Round-robin assignment, a call-within-15-minutes rule, and escalation to the sales head when it’s missed.' },
      { challenge: 'Site visits aren’t confirmed or tracked.', help: 'Visit scheduling with WhatsApp confirmations, pickup notes, and geo-tagged check-in when the buyer reaches the site.' },
      { challenge: 'Inventory and pricing live in a spreadsheet.', help: 'Live unit inventory by tower and floor, with holds, price lists and booking status.' },
      { challenge: 'Channel partner payouts lead to disputes.', help: 'Lead attribution by channel partner from the first touch, with payout calculations everyone can see.' },
    ],
    workflow: {
      title: 'The sales journey, step by step',
      intro: 'How an enquiry moves through to booking in a CRM we build or configure for you.',
      steps: [
        { title: 'Enquiry', text: 'Portal, ad, website and walk-in leads captured with their source.', tools: [T.crm, T.web] },
        { title: 'Qualification call', text: 'Budget, location and timeline captured on a short call script.', tools: [T.crm] },
        { title: 'Site visit', text: 'Scheduled slot, WhatsApp reminder, geo-tagged check-in at the site.', tools: [T.crm, T.maps] },
        { title: 'Negotiation and hold', text: 'Unit held for a set time, with approvals for any discount.', tools: [T.custom] },
        { title: 'Booking and payment', text: 'Booking form, token amount over UPI or cheque, receipt issued.', tools: [T.custom] },
        { title: 'Agreement and demands', text: 'Agreement status and construction-linked demand letters on schedule.', tools: [T.custom] },
        { title: 'Reporting', text: 'Leads by source, visit-to-booking ratio and channel partner performance.', tools: [T.data] },
      ],
    },
    services: ['crm-development', 'website-development', 'data-analytics'],
    products: ['crm', 'maps-api'],
    faqs: [
      { q: 'Can it pull leads from property portals automatically?', a: 'Usually, yes. Depending on the portal we use their lead push, an email parser or a scheduled import. We check your portal accounts during scoping.' },
      { q: 'Do you build project microsites?', a: 'Yes. Fast landing pages per project with floor plans, walkthrough videos, EMI calculators and enquiry forms that go straight into the CRM.' },
      { q: 'Can the sales team use it on their phones?', a: 'Yes. The CRM works on mobile, and the field app handles site-visit check-ins and photos.' },
      { q: 'Can we show RERA details per project?', a: 'Yes. RERA registration numbers can be stored per project and shown on project pages and documents, as your compliance team requires.' },
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
    intro:
      'Appointments, patient records, billing and pharmacy stock for clinics, diagnostic centres and small hospitals, built with patient privacy in mind.',
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
      { challenge: 'Patients wait in a crowded lobby because the queue is on paper.', help: 'Online and walk-in booking with token numbers, and a WhatsApp message when their turn is close.' },
      { challenge: 'Patient history is scattered across paper files.', help: 'One record per patient with visits, prescriptions, reports and allergies, searchable by phone number or ID.' },
      { challenge: 'Billing, packages and insurance claims get mixed up.', help: 'Itemised bills, package pricing, TPA claim tracking, and daily cash and UPI reconciliation.' },
      { challenge: 'Medicines expire on the shelf.', help: 'Pharmacy stock with batch and expiry tracking, reorder levels and alerts.' },
      { challenge: 'Owners can’t see how the clinic is doing.', help: 'Dashboards for footfall, revenue by department and doctor, and no-show rates.' },
    ],
    workflow: {
      title: 'A patient visit, end to end',
      intro: 'The flow we build for outpatient clinics. Hospitals add admissions and discharge on top.',
      steps: [
        { title: 'Booking', text: 'Online, phone or walk-in, with slots tied to each doctor’s schedule.', tools: [T.web, T.custom] },
        { title: 'Registration', text: 'New or returning patient found by phone number, token issued.', tools: [T.custom] },
        { title: 'Consultation', text: 'Notes, diagnosis and prescription on the patient record.', tools: [T.custom] },
        { title: 'Diagnostics', text: 'Lab and imaging orders, with reports attached when ready.', tools: [T.custom] },
        { title: 'Billing', text: 'Consultation, tests and packages on one bill; cash, card or UPI.', tools: [T.custom] },
        { title: 'Pharmacy', text: 'Prescription dispensed with batch and expiry recorded.', tools: [T.custom] },
        { title: 'Follow-up', text: 'Reminders for review visits and repeat prescriptions.', tools: [T.crm] },
      ],
    },
    services: ['custom-software', 'website-development', 'data-analytics'],
    products: ['crm', 'hrms'],
    faqs: [
      { q: 'How is patient data protected?', a: 'Role-based access, encryption, audit logs, and custom builds hosted in accounts in your name. We build to the data-protection requirements your team sets, including your obligations under the DPDP Act.' },
      { q: 'We’re a single clinic. Is this too much?', a: 'No. Start with booking, records and billing, and add pharmacy and dashboards when you need them.' },
      { q: 'Can patients book online?', a: 'Yes, from your website, a booking link or WhatsApp, with slots tied to each doctor’s schedule.' },
      { q: 'Can it work with our existing lab or billing software?', a: 'Often, depending on what that software exports or exposes. We check before you commit, and tell you plainly if an integration isn’t practical.' },
    ],
  },

  'startups-smes': {
    metaTitle: 'Software for Startups & SMEs: MVPs & Internal Tools',
    metaDescription:
      'A tech team for startups and SMEs without the hiring: websites, MVPs, internal tools, integrations and investor-ready MIS, with the code handed over.',
    eyebrow: 'Startups & SMEs',
    short: 'Startups & SMEs',
    headline: 'Your first tech team, without the hiring',
    highlight: 'without the hiring',
    intro:
      'Websites, MVPs, internal tools and dashboards for founders and growing businesses that need software built well, but aren’t ready to hire a full engineering team.',
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
      { challenge: 'You need an MVP but can’t hire engineers yet.', help: 'A small team that scopes the smallest useful version, builds it in weeks, and hands over clean code.' },
      { challenge: 'Operations run on WhatsApp groups and Excel.', help: 'A simple internal tool for orders, tasks or approvals that your team will use every day.' },
      { challenge: 'You pay for five SaaS tools that don’t talk to each other.', help: 'Integrations between them, or one tool that replaces several, whichever costs less over two years.' },
      { challenge: 'Investors and lenders ask for numbers you can’t pull quickly.', help: 'A clean MIS and dashboard with revenue, unit economics and cash, ready for board updates.' },
      { challenge: 'Your previous freelancer disappeared mid-project.', help: 'A code audit, documentation and a plain plan to stabilise or rebuild.' },
    ],
    workflow: {
      title: 'From idea to a product you can sell',
      intro: 'How a first build usually runs with us, so you can plan cash and time.',
      steps: [
        { title: 'Idea and scope', text: 'We cut the idea down to the smallest version that proves it.', tools: [T.custom] },
        { title: 'Clickable prototype', text: 'Screens you can show customers and investors before code.', tools: [T.web] },
        { title: 'MVP build', text: 'Two-week sprints with a working demo at the end of each.', tools: [T.custom] },
        { title: 'Launch', text: 'Website, payments, analytics and a launch checklist.', tools: [T.web] },
        { title: 'Measure', text: 'Sign-ups, activation and revenue on one dashboard.', tools: [T.data] },
        { title: 'Grow the team', text: 'Docs and walkthroughs so your own hires can take over.', tools: [T.hrms] },
      ],
    },
    services: ['website-development', 'custom-software', 'data-analytics'],
    products: ['hrms', 'crm'],
    faqs: [
      { q: 'How small a project will you take on?', a: 'A landing page or a single internal tool is fine. Starting small is a good way for both sides to see how we work together.' },
      { q: 'What does an MVP cost?', a: 'It depends on scope. After a call we send a written quote for a fixed first phase, so you know the number before we start.' },
      { q: 'Who owns the code and IP?', a: 'For custom builds, you do: the code sits in a repository in your name from the first commit. Products like Manka HRMS are licensed; your data is always yours.' },
      { q: 'Can you help when we hire our own developers?', a: 'Yes. Everything is documented, and we run walkthroughs with your new hires so the handover is smooth.' },
    ],
  },
};
