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
  eyebrow: string;
  /** Short noun used in headings, e.g. "Planning a CRM project?" */
  noun: string;
  headline: string;
  highlight: string;
  intro: string;
  visual: Visual;
  /** Short bullets used on the services index bento */
  included: string[];
  /** "Start from a product" callout under the hero (CRM and HR) */
  productCallout?: { slug: string; name: string };
  deliverables: { icon: any; title: string; text: string }[];
  /** H2 above the problems grid */
  problemsTitle: string;
  problems: { problem: string; fix: string }[];
  steps: { title: string; duration: string; text: string }[];
  tech: { group: string; items: string[] }[];
  engagementNote: string;
  products: string[];
  relatedServices: string[];
  faqs: { q: string; a: string }[];
};

export const servicesContent: Record<string, ServiceContent> = {
  'website-development': {
    metaTitle: 'Website Development: Company Sites & Online Stores',
    metaDescription:
      'Fast, SEO-ready company websites, landing pages and online stores for Indian businesses, with UPI payments, a simple CMS and enquiries wired to your CRM.',
    eyebrow: 'Website development',
    noun: 'website',
    headline: 'Websites that load fast and bring in enquiries',
    highlight: 'bring in enquiries',
    intro:
      'Company sites, landing pages and online stores, tuned for speed on mid-range phones and for search, and wired to your CRM so no enquiry sits unread in an inbox.',
    visual: 'browser',
    included: ['Design and build', 'SEO and page speed', 'Editable CMS', 'Payments and lead capture'],
    deliverables: [
      { icon: Palette, title: 'Design that fits your brand', text: 'Page designs for desktop and mobile on a small component kit, so every new page you add stays consistent.' },
      { icon: Gauge, title: 'Fast, responsive build', text: 'Static-first builds tuned for Core Web Vitals and tested on mid-range Android phones over 4G, where most of your visitors are.' },
      { icon: Search, title: 'SEO foundations', text: 'Clean URLs, meta tags, schema markup, sitemaps, and redirects from your old site so existing rankings carry over.' },
      { icon: MousePointerClick, title: 'Lead capture', text: 'Forms, WhatsApp click-to-chat and call buttons that send every enquiry to your CRM or inbox, tagged with the page it came from.' },
      { icon: ShoppingCart, title: 'Online store and payments', text: 'Catalogue, cart and checkout with UPI, cards and net banking through gateways like Razorpay or Cashfree, plus GST-ready invoices.' },
      { icon: NotebookPen, title: 'Content you can edit', text: 'A simple CMS for blogs, offers and job posts, so routine updates don’t need a developer.' },
    ],
    problemsTitle: 'Why company sites stop bringing in enquiries',
    problems: [
      { problem: 'Your site takes 8 seconds to open on a phone', fix: 'We rebuild on a static-first stack, compress images and cut third-party scripts, then test on real mid-range devices.' },
      { problem: 'Enquiries land in a shared inbox and nobody follows up', fix: 'Every form posts into your CRM with source and page, and the right person gets a WhatsApp or email alert.' },
      { problem: 'You can’t change a line of text without the old agency', fix: 'You get a CMS for everyday edits and the source code for everything else.' },
      { problem: 'Your product and loan pages don’t show up in search', fix: 'One focused page per product or city where it makes sense, with EMI calculators, FAQs and schema markup.' },
    ],
    steps: [
      { title: 'Discovery and sitemap', duration: 'typically 1 week', text: 'We map the pages, who reads them, and the one action each page should drive.' },
      { title: 'Design', duration: 'typically 1–2 weeks', text: 'Homepage and key templates for desktop and mobile, with two rounds of revisions.' },
      { title: 'Build and content', duration: 'typically 2–4 weeks', text: 'Development, CMS setup, forms and integrations. You see a staging link from the first week.' },
      { title: 'QA and launch', duration: 'typically 3–5 days', text: 'Cross-device testing, redirects and speed checks, then go-live on your domain.' },
      { title: 'Care after launch', duration: 'ongoing, if you want it', text: 'Bug-fix support for a period agreed up front, then an optional AMC for updates and small changes.' },
    ],
    tech: [
      { group: 'Frontend', items: ['Astro', 'Next.js', 'React', 'Tailwind CSS', 'TypeScript'] },
      { group: 'CMS and commerce', items: ['WordPress', 'WooCommerce', 'Shopify', 'Strapi', 'Headless CMS'] },
      { group: 'Payments', items: ['UPI', 'Razorpay', 'Cashfree', 'PayU'] },
      { group: 'Delivery', items: ['Node.js', 'Nginx', 'Docker', 'Linux VPS', 'CDN caching'] },
    ],
    engagementNote: 'Most website projects run as a fixed-scope project, with an optional AMC after launch.',
    products: ['crm'],
    relatedServices: ['crm-development', 'data-analytics'],
    faqs: [
      { q: 'How long does a company website take?', a: 'A 6–10 page company site typically takes 4–6 weeks from kickoff to launch, depending mostly on how quickly content and feedback come in. Online stores and portals take longer. You get a dated plan after the scoping call.' },
      { q: 'Will we be able to edit the site ourselves?', a: 'Yes. We set up a CMS for the sections you change often, like blogs, careers and offers, and walk your team through it in a short session.' },
      { q: 'Can you redesign our site without losing search rankings?', a: 'We keep URLs where we can, set up 301 redirects where we can’t, carry over titles and descriptions, and submit a fresh sitemap. Rankings can wobble for a few weeks after any migration; good redirects keep that short.' },
      { q: 'What does a website cost?', a: 'It depends on the number of pages, integrations and whether you need a store. After a 30-minute call we send a written quote for a fixed scope, so you know the number before we start.' },
    ],
  },

  'crm-development': {
    metaTitle: 'Custom CRM Development for Sales & Field Teams',
    metaDescription:
      'Custom CRM development for Indian businesses: your pipeline stages, lead capture, follow-ups, WhatsApp and SMS, field visits and MIS. You own the code.',
    eyebrow: 'CRM development',
    noun: 'CRM',
    headline: 'A CRM with your stages, from first call to disbursal',
    highlight: 'your stages',
    intro:
      'Lead capture, follow-ups, field visits and collections in one system, shaped to your stages and roles instead of a generic template. Start from Manka CRM or build from scratch.',
    visual: 'kanban',
    included: ['Your stages and fields', 'Lead capture from every source', 'Field app with geo-tagging', 'WhatsApp, SMS and calls'],
    productCallout: { slug: 'crm', name: 'Manka CRM' },
    deliverables: [
      { icon: SquareKanban, title: 'Pipelines that match your process', text: 'Your stages, fields and rules, from first enquiry to sale, disbursal or delivery.' },
      { icon: Inbox, title: 'Leads from every source', text: 'Website forms, social lead ads, IndiaMART, JustDial, walk-ins and bulk uploads into one queue, deduped by mobile number.' },
      { icon: BellRing, title: 'Follow-ups that don’t slip', text: 'Auto-assignment by branch or product, task reminders, and escalation when a lead sits untouched.' },
      { icon: MessageCircle, title: 'WhatsApp, SMS and calls', text: 'WhatsApp Business API templates, DLT-registered SMS, and click-to-call with call logs on the lead.' },
      { icon: Smartphone, title: 'Field team app', text: 'An Android app for field staff with geo-tagged check-ins and photo capture, built for patchy networks. Offline capture is available on request.' },
      { icon: ShieldCheck, title: 'Roles, MIS and audit trail', text: 'Branch, region and head-office views, daily MIS, and a log of who changed what and when.' },
    ],
    problemsTitle: 'Where sales and loan pipelines leak',
    problems: [
      { problem: 'Leads live in Excel sheets and WhatsApp groups', fix: 'One queue with source tagging and auto-assignment, so every lead has an owner and a next-action date.' },
      { problem: 'Off-the-shelf CRMs don’t fit your loan stages', fix: 'We model your real flow (login, docs pending, credit review, sanction, disbursal) with the fields each stage needs.' },
      { problem: 'You can’t tell whether field staff made the visit', fix: 'Geo-tagged check-ins with photo and timestamp, plotted on a map against the customer’s address.' },
      { problem: 'Managers spend Monday morning building the MIS', fix: 'Daily and weekly reports built in and emailed on schedule, with drill-down by branch and executive.' },
    ],
    steps: [
      { title: 'Process mapping', duration: 'typically 1–2 weeks', text: 'We sit with sales, operations and managers to map stages, roles and the reports leadership reads.' },
      { title: 'Prototype', duration: 'typically 1–2 weeks', text: 'Clickable screens of the pipeline and lead view, reviewed with the people who will use them daily.' },
      { title: 'Build in sprints', duration: 'typically 6–12 weeks', text: 'Two-week sprints with a demo at the end of each. Integrations come in as they’re ready.' },
      { title: 'Migration and training', duration: 'typically 1–2 weeks', text: 'We import existing leads and customers, then train teams branch by branch.' },
      { title: 'Go-live and support', duration: 'ongoing', text: 'Bug-fix support for a period agreed up front, then an AMC for fixes and new features.' },
    ],
    tech: [
      { group: 'Backend', items: ['Python', 'Django', 'FastAPI', 'Node.js', 'NestJS'] },
      { group: 'Data', items: ['PostgreSQL', 'Redis', 'Elasticsearch'] },
      { group: 'Web and mobile', items: ['React', 'TypeScript', 'Flutter', 'Android'] },
      { group: 'Integrations', items: ['WhatsApp Business API', 'DLT SMS', 'Cloud telephony', 'Payment links', 'Email (SMTP)'] },
    ],
    engagementNote: 'CRM builds usually start as a fixed-scope first version, then move to a dedicated team or AMC as features grow.',
    products: ['crm', 'maps-api'],
    relatedServices: ['custom-software', 'data-analytics'],
    faqs: [
      { q: 'Should we customise Manka CRM or build from scratch?', a: 'If your flow is close to a standard lead-to-sale or lead-to-disbursal pipeline, starting from Manka CRM is faster and cheaper. If your process is unusual or needs deep integration with an existing core system, a custom build makes more sense. We’ll tell you which on the first call.' },
      { q: 'Can it connect to our LMS, core system or ERP?', a: 'Usually, yes: through APIs, a database sync or a scheduled file exchange. We look at what your system exposes and pick the most reliable option.' },
      { q: 'Will our field staff be able to use it?', a: 'The field app is designed for people who mostly use WhatsApp: large buttons, few screens, and built for patchy networks, with offline capture on request. Training in English or Hindi, on request.' },
      { q: 'Who owns the data?', a: 'You do. A custom build runs in accounts in your name. If we start from Manka CRM, it’s hosted on our setup or on your servers. Either way, you can export everything at any time.' },
    ],
  },

  'hr-solutions': {
    metaTitle: 'HR & Payroll Software Development',
    metaDescription:
      'Custom HR and payroll systems built to your policies: onboarding, attendance, leave, PF, ESI, PT and TDS, appraisals. Or start on Manka HRMS.',
    eyebrow: 'HR solutions',
    noun: 'HR system',
    headline: 'HR and payroll that closes the month without spreadsheets',
    highlight: 'without spreadsheets',
    intro:
      'Onboarding, attendance, leave, payroll and appraisals in one system, with PF, ESI, professional tax and TDS handled the Indian way. Use Manka HRMS as it is, or have us tailor it.',
    visual: 'payroll',
    included: ['Attendance and leave', 'Payroll with PF, ESI, PT, TDS', 'Employee self-service app', 'Appraisals and goals'],
    productCallout: { slug: 'hrms', name: 'Manka HRMS' },
    deliverables: [
      { icon: UserPlus, title: 'Onboarding and documents', text: 'Offer letters, document collection, e-sign and a digital employee file from day one.' },
      { icon: CalendarCheck, title: 'Attendance and shifts', text: 'Attendance imported from biometric devices that export it, geo-fenced mobile check-in for field staff, shift rosters and overtime.' },
      { icon: CalendarDays, title: 'Leave and holidays', text: 'Leave policies per location, approvals on the phone, and state-wise holiday calendars.' },
      { icon: ReceiptIndianRupee, title: 'Payroll and statutory', text: 'Salary structures, PF, ESI, professional tax, TDS and payslips, with bank transfer files ready to upload.' },
      { icon: Target, title: 'Appraisals and goals', text: 'Goal setting, quarterly check-ins and appraisal cycles with self and manager reviews.' },
      { icon: Smartphone, title: 'Employee self-service', text: 'Payslips, leave balance, Form 16 and reimbursements on the phone, so HR stops answering the same questions.' },
    ],
    problemsTitle: 'Where month-end payroll goes wrong',
    problems: [
      { problem: 'Attendance comes from three places and never matches', fix: 'Biometric, mobile and manual entries flow into one register, with exceptions flagged before payroll runs.' },
      { problem: 'Payroll takes HR four days every month', fix: 'Attendance, leave and salary structures feed payroll directly. HR reviews exceptions instead of rebuilding a sheet.' },
      { problem: 'Field staff mark attendance from home', fix: 'Geo-fenced check-in with a selfie, so attendance counts only at the branch or the customer’s location.' },
      { problem: 'Statutory rule changes catch you out', fix: 'PF, ESI and PT rules configured per state, updated under your support plan, with challan-ready reports.' },
    ],
    steps: [
      { title: 'Policy review', duration: 'typically 1 week', text: 'We document salary structures, leave rules, shifts and approval chains as they work today.' },
      { title: 'Configure or build', duration: 'typically 2–6 weeks', text: 'Configure Manka HRMS for standard needs, and build custom modules only where your policies differ.' },
      { title: 'Parallel payroll run', duration: 'typically 1 payroll cycle', text: 'We run one cycle alongside your current process and reconcile every rupee before you switch.' },
      { title: 'Rollout', duration: 'typically 1–2 weeks', text: 'Employee data import, device setup, app rollout and training for the HR team.' },
      { title: 'Support', duration: 'ongoing', text: 'Help desk for HR, rule updates and new reports under an AMC.' },
    ],
    tech: [
      { group: 'Platform', items: ['Python', 'Django', 'PostgreSQL', 'React', 'TypeScript'] },
      { group: 'Mobile', items: ['Flutter', 'Android', 'iOS', 'Geo-fencing'] },
      { group: 'Integrations', items: ['Biometric devices', 'Bank bulk-payment files', 'Tally export', 'e-Sign', 'Email and WhatsApp alerts'] },
    ],
    engagementNote: 'Most HR projects start by configuring Manka HRMS under a fixed scope, with an AMC to cover rule changes.',
    products: ['hrms'],
    relatedServices: ['data-analytics', 'custom-software'],
    faqs: [
      { q: 'Does it handle PF, ESI, PT and TDS?', a: 'Yes. Statutory deductions are calculated from salary structures and state rules, and the system produces the reports your CA or compliance team needs for filings.' },
      { q: 'We have 40 employees. Is this overkill?', a: 'No. Manka HRMS suits teams from about 10 people upwards. Tell us your headcount and we’ll confirm fit. At your size we’d usually configure the product rather than build anything custom.' },
      { q: 'Can you connect our existing biometric machines?', a: 'We import attendance from biometric devices that export it. Send us the make and model, and we’ll confirm your model in the demo.' },
      { q: 'How do we move off our current payroll sheet?', a: 'We import the employee master and salary structures, then run one payroll cycle in parallel so you can compare results line by line before switching over.' },
    ],
  },

  'data-analytics': {
    metaTitle: 'Data & Analytics: Dashboards, MIS & Portfolio',
    metaDescription:
      'Data pipelines, leadership dashboards, automated MIS and lending portfolio analytics (DPD, buckets, vintage) built on your LMS, CRM and accounting data.',
    eyebrow: 'Data & analytics',
    noun: 'analytics',
    headline: 'One disbursal number finance and sales agree on',
    highlight: 'One disbursal number',
    intro:
      'We pull data out of your LMS, CRM, accounting and spreadsheets into one clean store, then build the few dashboards that answer the questions you ask every Monday.',
    visual: 'dashboard',
    included: ['Data pipelines', 'Leadership dashboards', 'Automated daily MIS', 'Portfolio and risk analytics'],
    deliverables: [
      { icon: Workflow, title: 'Data pipelines', text: 'Scheduled pulls from your databases, APIs and Excel drops into one store, with checks for missing and duplicate rows.' },
      { icon: LayoutDashboard, title: 'Leadership dashboards', text: 'Disbursals, collections, sales and cash on one screen, with drill-down to branch and person.' },
      { icon: Mail, title: 'Automated MIS', text: 'The daily and monthly reports your team builds by hand, generated and emailed on schedule.' },
      { icon: TrendingUp, title: 'Portfolio and risk analytics', text: 'DPD buckets, roll rates and vintage curves for lending; cohorts and repeat rates for retail.' },
      { icon: Landmark, title: 'Statement analytics', text: 'Cash-flow scoring, ABB and bounce detection from bank statements, powered by our BSA product.' },
      { icon: ShieldCheck, title: 'One definition per KPI', text: 'Documented metric definitions, role-based access, and a trail back to the source of every number.' },
    ],
    problemsTitle: 'Why nobody trusts the Monday numbers',
    problems: [
      { problem: 'Every department has a different number for the same KPI', fix: 'One definition per metric, computed once, so finance and sales see the same disbursal figure.' },
      { problem: 'Your MIS is a 40-tab Excel file that one person understands', fix: 'Pipelines rebuild the numbers every morning, and the report goes out without anyone touching it.' },
      { problem: 'You learn about rising delinquency at month-end', fix: 'Daily bucket movement and early-warning alerts by branch, so collections can act in the first week.' },
      { problem: 'Underwriters read bank statements line by line', fix: 'BSA parses the PDF, computes ABB, obligations and bounces, and gives credit a one-page summary.' },
    ],
    steps: [
      { title: 'KPI workshop', duration: 'typically 1 week', text: 'We list the decisions leadership makes and the numbers each one depends on.' },
      { title: 'Data audit', duration: 'typically 1–2 weeks', text: 'We map sources, check data quality and agree metric definitions with each team.' },
      { title: 'Pipelines and storage', duration: 'typically 2–4 weeks', text: 'Scheduled extraction, cleaning and modelling into a store that’s fast to query.' },
      { title: 'Dashboards and MIS', duration: 'typically 2–3 weeks', text: 'Built in rounds with the people who use them, starting with the most-asked questions.' },
      { title: 'Handover and iteration', duration: 'ongoing', text: 'Docs for your team, plus new metrics and reports as the business asks for them.' },
    ],
    tech: [
      { group: 'Processing', items: ['Python', 'pandas', 'SQL', 'Apache Airflow', 'dbt'] },
      { group: 'Storage', items: ['PostgreSQL', 'ClickHouse', 'DuckDB'] },
      { group: 'Dashboards', items: ['Metabase', 'Apache Superset', 'Custom React dashboards'] },
      { group: 'Delivery', items: ['Scheduled email reports', 'Excel and CSV exports', 'Alerts on WhatsApp'] },
    ],
    engagementNote: 'Analytics usually starts fixed-scope for the first set of dashboards, then continues under a dedicated team or AMC.',
    products: ['bank-statement-analyser', 'payslip-checker'],
    relatedServices: ['crm-development', 'custom-software'],
    faqs: [
      { q: 'Do we need a data warehouse?', a: 'Not always. If your data sits in one or two databases, dashboards can run on a read replica. Once you combine several systems, a small warehouse keeps things fast and consistent.' },
      { q: 'Which dashboard tool do you use?', a: 'Usually open-source tools like Metabase or Superset, so there are no per-user licence fees. If your team already uses another BI tool, we can build for that instead.' },
      { q: 'Can you work with data that’s still in Excel?', a: 'Yes. We set up a fixed template and an upload point, validate each file, and load it automatically. Over time, we move those sources to direct feeds.' },
      { q: 'How do you keep customer data safe?', a: 'We work on your infrastructure wherever possible, use read-only access, mask personal data outside production, and sign an NDA before we see anything.' },
    ],
  },

  'custom-software': {
    metaTitle: 'Custom Software & API Development',
    metaDescription:
      'Custom software and API development in India: system integrations, documented REST APIs, workflow automation, partner portals and internal tools.',
    eyebrow: 'Custom software & APIs',
    noun: 'software',
    headline: 'Custom software and APIs, built to spec and documented',
    highlight: 'built to spec',
    intro:
      'Integrations between the systems you already run, internal tools that replace spreadsheet workflows, and APIs other teams can rely on. Written scope, versioned code and docs your next developer can read.',
    visual: 'api',
    included: ['System integrations', 'REST APIs and webhooks', 'Workflow automation', 'Internal tools and portals'],
    deliverables: [
      { icon: Plug, title: 'System integrations', text: 'Connect your LMS, CRM, accounting, payment gateway and partner APIs so data moves without re-typing.' },
      { icon: Webhook, title: 'REST APIs and webhooks', text: 'Versioned APIs with OpenAPI docs, authentication, rate limits and test keys for partners.' },
      { icon: Workflow, title: 'Workflow automation', text: 'Approvals, reminders, document generation and file exchanges that run on schedule, not by hand.' },
      { icon: LayoutTemplate, title: 'Internal tools and portals', text: 'Admin panels, DSA and partner portals, and customer self-service screens.' },
      { icon: ScanSearch, title: 'Document processing', text: 'PDF parsing, OCR, report generation and bulk data jobs with retries and logs.' },
      { icon: Lock, title: 'Security and monitoring', text: 'Role-based access, encrypted secrets, audit logs, error alerts and uptime checks from day one.' },
    ],
    problemsTitle: 'Work your team still does by copy and paste',
    problems: [
      { problem: 'Operations re-types data from one system into another', fix: 'An integration that syncs records both ways, with a log of every transfer and alerts when one fails.' },
      { problem: 'A partner wants an API and you don’t have one', fix: 'We wrap your existing system in a documented, versioned API and give the partner a test environment to build against.' },
      { problem: 'A critical process depends on one person’s Excel macros', fix: 'We turn it into a small web tool with logins, validations and a history of every run.' },
      { problem: 'Your old vendor left and nobody understands the code', fix: 'We audit, document and stabilise the codebase, then decide with you whether to extend it or rebuild.' },
    ],
    steps: [
      { title: 'Scoping', duration: 'typically 1 week', text: 'Written requirements, integration points, and a clear list of what is out of scope.' },
      { title: 'Architecture and API design', duration: 'typically 1 week', text: 'Data model, API contracts and a test plan agreed before any code is written.' },
      { title: 'Build in sprints', duration: 'typically 4–12 weeks', text: 'Two-week sprints with working demos, code reviews and a shared staging environment.' },
      { title: 'Testing and handover', duration: 'typically 1–2 weeks', text: 'Automated tests, load checks on key endpoints, deployment to your servers, and documentation.' },
      { title: 'Support', duration: 'ongoing', text: 'Monitoring, fixes and small enhancements under an AMC.' },
    ],
    tech: [
      { group: 'Languages', items: ['Python', 'TypeScript', 'Go', 'SQL'] },
      { group: 'Frameworks', items: ['FastAPI', 'Django', 'Node.js', 'NestJS', 'React'] },
      { group: 'Data and messaging', items: ['PostgreSQL', 'Redis', 'RabbitMQ'] },
      { group: 'Delivery', items: ['Docker', 'Nginx', 'CI/CD pipelines', 'OpenAPI', 'OAuth 2.0'] },
    ],
    engagementNote: 'Well-defined integrations fit a fixed scope. Ongoing platforms work better with a dedicated team.',
    products: ['maps-api', 'bank-statement-analyser', 'payslip-checker'],
    relatedServices: ['crm-development', 'data-analytics'],
    faqs: [
      { q: 'Do we get the source code?', a: 'Yes. For custom builds, you own the code and IP: it lives in a repository in your name from the first commit, with documentation and deployment scripts. Products are licensed; your data is always yours.' },
      { q: 'Can you work with our in-house developers?', a: 'Yes. We can own a module end to end, or work alongside your team with shared code reviews and standups.' },
      { q: 'Where will the software run?', a: 'Custom builds run in accounts in your name: your own servers, a VPS, or the hosting provider you already use. We package everything in Docker so it moves easily.' },
      { q: 'What if requirements change mid-project?', a: 'They usually do. Small changes fit inside a sprint; bigger ones get a written change note with time and cost before we start on them.' },
    ],
  },
};
