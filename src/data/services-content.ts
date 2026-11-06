// Rich content for /services/<slug>. Keys match `services[].slug` in site.ts.
import {
  Palette, Gauge, Search, MousePointerClick, ShoppingCart, NotebookPen,
  SquareKanban, Inbox, BellRing, MessageCircle, Smartphone, ShieldCheck,
  UserPlus, CalendarCheck, CalendarDays, ReceiptIndianRupee, Target,
  Workflow, LayoutDashboard, Mail, TrendingUp, Landmark,
  Plug, Webhook, LayoutTemplate, ScanSearch, Lock,
} from '@lucide/astro';

export type Visual = 'browser' | 'kanban' | 'payroll' | 'dashboard' | 'api';

export type ServiceContent = {
  metaTitle: string;
  metaDescription: string;
  /** Short noun used in headings, e.g. "Planning a CRM project?" */
  noun: string;
  headline: string;
  highlight: string;
  intro: string;
  visual: Visual;
  deliverables: { icon: any; title: string; text: string }[];
  /** H2 above the problems grid */
  problemsTitle: string;
  problems: { problem: string; fix: string }[];
  steps: { title: string; text: string }[];
  products: string[];
  relatedServices: string[];
  faqs: { q: string; a: string }[];
};

export const servicesContent: Record<string, ServiceContent> = {
  'website-development': {
    metaTitle: 'Website Development: Company Sites & Online Stores',
    metaDescription:
      'Fast, SEO-ready company websites, landing pages and online stores for Indian businesses, with UPI payments, a simple CMS and enquiries sent to your CRM.',
    noun: 'website',
    headline: 'Websites that load fast and bring in enquiries',
    highlight: 'bring in enquiries',
    intro: 'Company sites, landing pages and online stores, fast on mid-range phones and wired to your CRM.',
    visual: 'browser',
    deliverables: [
      { icon: Palette, title: 'Design that fits your brand', text: 'Desktop and mobile designs that stay consistent as you add pages.' },
      { icon: Gauge, title: 'Fast build', text: 'Tested on mid-range Android phones over 4G.' },
      { icon: Search, title: 'SEO foundations', text: 'Clean URLs, schema, sitemaps and redirects from your old site.' },
      { icon: MousePointerClick, title: 'Lead capture', text: 'Forms, WhatsApp and call buttons that feed your CRM.' },
      { icon: ShoppingCart, title: 'Online store', text: 'Cart and checkout with UPI, cards and net banking.' },
      { icon: NotebookPen, title: 'Content you can edit', text: 'A simple CMS for blogs, offers and job posts.' },
    ],
    problemsTitle: 'Why company sites stop bringing in enquiries',
    problems: [
      { problem: 'Your site takes 8 seconds to open on a phone', fix: 'A static-first rebuild with lighter images and fewer scripts.' },
      { problem: 'Enquiries sit in a shared inbox', fix: 'Every form goes into your CRM and alerts the right person.' },
      { problem: 'You can’t change a line without the old agency', fix: 'A CMS for everyday edits, and the source code for the rest.' },
      { problem: 'Your pages don’t show up in search', fix: 'One focused page per product or city, with FAQs and schema.' },
    ],
    steps: [
      { title: 'Discovery and sitemap', text: 'The pages, who reads them and what each should do.' },
      { title: 'Design', text: 'Key templates for desktop and mobile, two rounds of changes.' },
      { title: 'Build and content', text: 'A staging link from the first week.' },
      { title: 'QA and launch', text: 'Device tests, redirects and speed checks.' },
      { title: 'After launch', text: 'Fixes and small changes from the same team.' },
    ],
    products: ['crm'],
    relatedServices: ['crm-development', 'data-analytics'],
    faqs: [
      { q: 'How long does a company website take?', a: 'A 6–10 page site typically takes 4–6 weeks, mostly depending on how fast content and feedback come in.' },
      { q: 'Can we edit the site ourselves?', a: 'Yes. You get a CMS for the parts you change often, and a short training session.' },
      { q: 'Will a redesign lose our search rankings?', a: 'We keep URLs where we can and redirect the rest, so any dip is short.' },
      { q: 'What does a website cost?', a: 'It depends on pages, integrations and whether you need a store. You get a fixed written quote after a call.' },
    ],
  },

  'crm-development': {
    metaTitle: 'Custom CRM Development for Sales & Field Teams',
    metaDescription:
      'Custom CRM development for Indian businesses: your pipeline stages, lead capture, follow-ups, WhatsApp and SMS, field visits and MIS.',
    noun: 'CRM',
    headline: 'A CRM with your stages, from first call to disbursal',
    highlight: 'your stages',
    intro: 'Leads, follow-ups, field visits and collections in one system, shaped to your stages and roles.',
    visual: 'kanban',
    deliverables: [
      { icon: SquareKanban, title: 'Your pipeline', text: 'Your stages, fields and rules, from enquiry to disbursal.' },
      { icon: Inbox, title: 'Leads from every source', text: 'Web forms, lead ads, IndiaMART and walk-ins in one queue.' },
      { icon: BellRing, title: 'Follow-ups that don’t slip', text: 'Auto-assignment, reminders and escalation.' },
      { icon: MessageCircle, title: 'WhatsApp, SMS and calls', text: 'Templates, DLT SMS and click-to-call from the lead.' },
      { icon: Smartphone, title: 'Field team app', text: 'Geo-tagged check-ins and photos, built for patchy networks.' },
      { icon: ShieldCheck, title: 'Roles and MIS', text: 'Branch and head-office views, daily MIS and an audit trail.' },
    ],
    problemsTitle: 'Where sales and loan pipelines leak',
    problems: [
      { problem: 'Leads live in Excel and WhatsApp groups', fix: 'One queue where every lead has an owner and a next step.' },
      { problem: 'Off-the-shelf CRMs don’t fit your loan stages', fix: 'Login, docs, credit review, sanction and disbursal, as you run them.' },
      { problem: 'You can’t tell if the field visit happened', fix: 'Geo-tagged check-ins with photo and time, on a map.' },
      { problem: 'Monday morning goes on building the MIS', fix: 'Reports built in and sent on schedule.' },
    ],
    steps: [
      { title: 'Process mapping', text: 'Stages, roles and the reports leadership reads.' },
      { title: 'Prototype', text: 'Clickable screens, reviewed by the people who’ll use them.' },
      { title: 'Build in sprints', text: 'A demo at the end of every two-week sprint.' },
      { title: 'Migration and training', text: 'Old leads imported, teams trained branch by branch.' },
      { title: 'Go-live and support', text: 'Fixes and new features from the same team.' },
    ],
    products: ['crm', 'maps-api'],
    relatedServices: ['custom-software', 'data-analytics'],
    faqs: [
      { q: 'Should we customise your CRM or build from scratch?', a: 'If your flow is close to a standard pipeline, starting from our CRM is faster and cheaper. We’ll tell you which on the first call.' },
      { q: 'Can it connect to our LMS, core system or ERP?', a: 'Usually, yes: through APIs, a database sync or a scheduled file exchange.' },
      { q: 'Will our field staff be able to use it?', a: 'Yes. Big buttons, few screens, and training in English or Hindi.' },
      { q: 'Can we export our data?', a: 'Yes, everything, at any time.' },
    ],
  },

  'hr-solutions': {
    metaTitle: 'HR & Payroll Software Development',
    metaDescription:
      'HR and payroll systems built to your policies: onboarding, attendance, leave, PF, ESI, PT and TDS, and appraisals. Or start on our HRMS.',
    noun: 'HR system',
    headline: 'HR and payroll that closes the month without spreadsheets',
    highlight: 'without spreadsheets',
    intro: 'Onboarding, attendance, leave, payroll and appraisals in one system, with PF, ESI, PT and TDS handled.',
    visual: 'payroll',
    deliverables: [
      { icon: UserPlus, title: 'Onboarding', text: 'Offer letters, documents and e-sign from day one.' },
      { icon: CalendarCheck, title: 'Attendance and shifts', text: 'Biometric imports, geo-fenced check-in and rosters.' },
      { icon: CalendarDays, title: 'Leave and holidays', text: 'Policies per location, approved on the phone.' },
      { icon: ReceiptIndianRupee, title: 'Payroll', text: 'PF, ESI, PT, TDS, payslips and bank transfer files.' },
      { icon: Target, title: 'Appraisals', text: 'Goals, check-ins and review cycles.' },
      { icon: Smartphone, title: 'Employee self-service', text: 'Payslips, leave and Form 16 on the phone.' },
    ],
    problemsTitle: 'Where month-end payroll goes wrong',
    problems: [
      { problem: 'Attendance comes from three places and never matches', fix: 'One register, with exceptions flagged before payroll.' },
      { problem: 'Payroll takes HR four days every month', fix: 'Attendance and leave feed payroll directly.' },
      { problem: 'Field staff mark attendance from home', fix: 'Geo-fenced check-in with a selfie.' },
      { problem: 'Statutory rule changes catch you out', fix: 'PF, ESI and PT rules set per state, with challan-ready reports.' },
    ],
    steps: [
      { title: 'Policy review', text: 'Salary structures, leave rules and approvals.' },
      { title: 'Configure or build', text: 'Our HRMS for standard needs, custom only where you differ.' },
      { title: 'Parallel payroll run', text: 'One cycle alongside your current process, reconciled.' },
      { title: 'Rollout', text: 'Data import, app rollout and HR training.' },
      { title: 'Support', text: 'Rule updates and new reports.' },
    ],
    products: ['hrms'],
    relatedServices: ['data-analytics', 'custom-software'],
    faqs: [
      { q: 'Does it handle PF, ESI, PT and TDS?', a: 'Yes, from your salary structures and state rules, with the reports your CA needs.' },
      { q: 'We have 40 employees. Is this overkill?', a: 'No. Our HRMS suits teams from about 10 people. At your size we’d configure it, not build.' },
      { q: 'Can you connect our biometric machines?', a: 'If they can export attendance, yes. We confirm your model in the demo.' },
      { q: 'How do we move off our payroll sheet?', a: 'We import your data and run one cycle in parallel before you switch.' },
    ],
  },

  'data-analytics': {
    metaTitle: 'Data & Analytics: Dashboards, MIS & Portfolio',
    metaDescription:
      'Data pipelines, leadership dashboards, automated MIS and lending portfolio analytics (DPD, buckets, vintage) built on your LMS, CRM and accounting data.',
    noun: 'analytics',
    headline: 'One disbursal number finance and sales agree on',
    highlight: 'One disbursal number',
    intro: 'Your LMS, CRM, accounts and spreadsheets in one clean store, with the few dashboards you check every Monday.',
    visual: 'dashboard',
    deliverables: [
      { icon: Workflow, title: 'Data pipelines', text: 'Scheduled pulls into one store, checked for gaps.' },
      { icon: LayoutDashboard, title: 'Leadership dashboards', text: 'Disbursals, collections and sales on one screen.' },
      { icon: Mail, title: 'Automated MIS', text: 'The reports you build by hand, sent on schedule.' },
      { icon: TrendingUp, title: 'Portfolio analytics', text: 'DPD buckets, roll rates and vintage curves.' },
      { icon: Landmark, title: 'Statement analytics', text: 'ABB and bounces from bank statements, using our BSA.' },
      { icon: ShieldCheck, title: 'One definition per KPI', text: 'Every number traced back to its source.' },
    ],
    problemsTitle: 'Why nobody trusts the Monday numbers',
    problems: [
      { problem: 'Every department has its own number for the same KPI', fix: 'One definition per metric, computed once.' },
      { problem: 'Your MIS is a 40-tab Excel only one person understands', fix: 'Pipelines rebuild it every morning.' },
      { problem: 'You learn about rising delinquency at month-end', fix: 'Daily bucket movement and early alerts by branch.' },
      { problem: 'Underwriters read statements line by line', fix: 'BSA turns the PDF into a one-page summary.' },
    ],
    steps: [
      { title: 'KPI workshop', text: 'The decisions you make and the numbers behind them.' },
      { title: 'Data audit', text: 'Sources, quality checks and agreed definitions.' },
      { title: 'Pipelines and storage', text: 'Scheduled, cleaned and fast to query.' },
      { title: 'Dashboards and MIS', text: 'Built in rounds with the people who use them.' },
      { title: 'Iteration', text: 'New metrics as the business asks for them.' },
    ],
    products: ['bank-statement-analyser', 'payslip-checker'],
    relatedServices: ['crm-development', 'custom-software'],
    faqs: [
      { q: 'Do we need a data warehouse?', a: 'Not always. One or two databases can run on a read replica. Several systems need a small warehouse.' },
      { q: 'Which dashboard tool do you use?', a: 'Usually Metabase or Superset, with no per-user fees. We can use your BI tool instead.' },
      { q: 'Can you work with data still in Excel?', a: 'Yes. A fixed template and an upload point, checked and loaded automatically.' },
      { q: 'How do you keep customer data safe?', a: 'Read-only access, and personal data masked outside production.' },
    ],
  },

  'custom-software': {
    metaTitle: 'Custom Software & API Development',
    metaDescription:
      'Custom software and API development in India: system integrations, documented REST APIs, workflow automation, partner portals and internal tools.',
    noun: 'software',
    headline: 'Custom software and APIs, built to spec and documented',
    highlight: 'built to spec',
    intro: 'Integrations between your systems, internal tools that replace spreadsheets, and APIs other teams can rely on.',
    visual: 'api',
    deliverables: [
      { icon: Plug, title: 'System integrations', text: 'LMS, CRM, accounts and payments, with no re-typing.' },
      { icon: Webhook, title: 'REST APIs and webhooks', text: 'Versioned, documented and secured.' },
      { icon: Workflow, title: 'Workflow automation', text: 'Approvals, reminders and documents on schedule.' },
      { icon: LayoutTemplate, title: 'Internal tools and portals', text: 'Admin panels and DSA or partner portals.' },
      { icon: ScanSearch, title: 'Document processing', text: 'PDF parsing, OCR and bulk jobs with logs.' },
      { icon: Lock, title: 'Security and monitoring', text: 'Access control, audit logs and alerts from day one.' },
    ],
    problemsTitle: 'Work your team still does by copy and paste',
    problems: [
      { problem: 'Ops re-types data from one system into another', fix: 'An integration that syncs both ways and alerts on failure.' },
      { problem: 'A partner wants an API and you don’t have one', fix: 'A documented API around your existing system.' },
      { problem: 'A key process runs on one person’s Excel macros', fix: 'A small web tool with logins and a history.' },
      { problem: 'Your old vendor left and nobody understands the code', fix: 'An audit and a plain plan to extend or rebuild.' },
    ],
    steps: [
      { title: 'Scoping', text: 'Requirements, integrations and what’s out of scope.' },
      { title: 'API design', text: 'Data model and contracts agreed before code.' },
      { title: 'Build in sprints', text: 'Working demos every two weeks.' },
      { title: 'Testing and handover', text: 'Automated tests, deployment and docs.' },
      { title: 'Support', text: 'Monitoring, fixes and small changes.' },
    ],
    products: ['maps-api', 'bank-statement-analyser', 'payslip-checker'],
    relatedServices: ['crm-development', 'data-analytics'],
    faqs: [
      { q: 'Can you work with our in-house developers?', a: 'Yes. We can own a module or work alongside your team.' },
      { q: 'What if requirements change mid-project?', a: 'Small changes fit in a sprint. Bigger ones get a written quote first.' },
      { q: 'Do you document what you build?', a: 'Yes: API docs, setup guides and notes your next developer can follow.' },
      { q: 'How small a job will you take?', a: 'A single integration or internal tool is fine.' },
    ],
  },
};
