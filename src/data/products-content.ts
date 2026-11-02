// Rich content for each product page, keyed by the slugs in site.ts `products`.
// Everything shown in mockups and API samples is sample data, not real customers.
// Products are built but have no clients yet: no production, track-record or time claims.
import {
  Upload, Tags, Calculator, ShieldAlert, FileSpreadsheet, LayoutDashboard, Timer, Scale, Eye, Plug,
  Webhook, FileLock, BadgeCheck, Landmark, ScanSearch, Building, Gauge, MapPin, MapPinned, Route,
  Camera, Crosshair, Radar, Signpost, LocateFixed, UserPlus, Workflow, Bell, Smartphone, ChartPie,
  Funnel, Inbox, CalendarCheck, Clock, Wallet, FileText, Star, ScanFace, ListChecks, Target,
  HandCoins, UserCheck, TrendingUp,
} from '@lucide/astro';

/** `visual` keys a mini-visual in components/products/FeatureVisual.astro (featured items only). */
export type Item = { title: string; text: string; icon: any; visual?: string };
export type Step = { title: string; text: string };
export type Faq = { q: string; a: string };

export type ProductContent = {
  meta: { title: string; description: string };
  /** secondary: the hero's second CTA. 'api' → "See the API" (#api), 'how' → "How it works" (#how). */
  hero: { title: string; highlight: string; intro: string; secondary: 'api' | 'how' };
  /** Short pitch + bullets for the products index showcase */
  card: { tagline: string; bullets: string[] };
  outcomes: Item[];
  /** The first two items are featured (with a mini-visual); the rest render as a plain list. */
  features: { title: string; highlight: string; intro: string; items: Item[] };
  steps: { title: string; items: Step[] };
  api: {
    title: string;
    intro: string;
    method: 'GET' | 'POST';
    endpoint: string;
    /** Raw HTTP request as shown in the code block */
    request: string;
    response: unknown;
    options: Item[];
  };
  /** Product-specific security points, shown alongside the common ones */
  security: string[];
  related: { slug: string; reason: string }[];
  faqs: Faq[];
  cta: { title: string; text: string };
};

/** Shared security & deployment capabilities, shown on every product page */
export const securityCommon: Item[] = [
  { title: 'Encrypted in transit and at rest', text: 'TLS for every request. Stored files are encrypted on disk.', icon: FileLock },
  { title: 'Role-based access', text: 'Each role sees only what it needs. Account and ID numbers are masked.', icon: UserCheck },
  { title: 'Audit logs', text: 'Who uploaded, viewed, exported or changed what, and when.', icon: ListChecks },
  { title: 'Retention you control', text: 'You set how long documents are kept. Then they are deleted.', icon: Timer },
];

export const productsContent: Record<string, ProductContent> = {
  /* ---------------------------------------------------------------- BSA */
  'bank-statement-analyser': {
    meta: {
      title: 'BSA: Bank Statement Analyser for Lenders',
      description:
        'Upload PDF or scanned bank statements and get ABB, inflows and outflows, salary regularity, EMIs for FOIR, bounces and fraud flags. Dashboard or API.',
    },
    hero: {
      title: 'A 30-page statement, down to ABB, EMIs and bounces',
      highlight: 'EMIs and bounces',
      intro:
        'Upload a PDF, a scan or a password-protected statement. BSA (Bank Statement Analyser) puts ABB, EMIs, bounces and fraud flags on one screen.',
      secondary: 'api',
    },
    card: {
      tagline: 'Cash-flow underwriting from raw statements.',
      bullets: ['ABB, inflow/outflow and FOIR inputs', 'Bounce and cheque-return detection', 'Circular and round-figure fraud flags'],
    },
    outcomes: [
      { title: 'No calculator work', text: 'Every transaction is read and totalled on upload.', icon: Calculator },
      { title: 'One method, every file', text: 'ABB and FOIR worked out the same way every time.', icon: Scale },
      { title: 'Fraud signals up front', text: 'Suspicious patterns flagged before sanction.', icon: ShieldAlert },
      { title: 'Fits how you work', text: 'Dashboard, Excel export or API.', icon: Plug },
    ],
    features: {
      title: 'Statement reading and maths, done for you',
      highlight: 'done for you',
      intro: 'BSA does the reading and the maths. Your credit team does the judgement.',
      items: [
        { title: 'ABB and monthly cash flow', text: 'ABB on the dates your policy uses, plus monthly inflow, outflow and closing balance.', icon: Calculator, visual: 'bsa-flow' },
        { title: 'Fraud and tamper flags', text: 'Circular transactions, round-figure deposits, edited PDF metadata and balances that don’t add up.', icon: ShieldAlert, visual: 'bsa-flags' },
        { title: 'PDFs, scans and photos', text: 'Scans go through OCR, with unclear pages marked for review.', icon: Upload },
        { title: 'Transaction categories', text: 'Salary, EMI, UPI, NEFT/IMPS, cash, cheque returns and charges.', icon: Tags },
        { title: 'EMI obligations for FOIR', text: 'Recurring EMIs pulled out and totalled for your FOIR check.', icon: HandCoins },
        { title: 'Dashboard, Excel and API', text: 'Review on screen, export to Excel, or pull JSON into your LOS.', icon: LayoutDashboard },
      ],
    },
    steps: { title: 'From upload to decision in four steps', items: [
      { title: 'Upload', text: 'From the dashboard or through the API.' },
      { title: 'Extract', text: 'BSA identifies the bank and pulls out every transaction.' },
      { title: 'Analyse', text: 'Categories, ABB, cash flow and fraud checks.' },
      { title: 'Decide', text: 'Your analyst or your LOS applies your policy.' },
    ] },
    api: {
      title: 'Send a statement, get structured JSON back',
      intro: 'Post the statement from your LOS. The result comes back to your webhook.',
      method: 'POST',
      endpoint: '/v1/bsa/analyse',
      request: `POST /v1/bsa/analyse
Authorization: Bearer <your-api-key>
Content-Type: multipart/form-data

file=@statement_apr-sep.pdf
password=********
applicant_ref=APP-2026-00418
callback_url=https://lms.example.in/hooks/bsa`,
      response: {
        analysis_id: 'bsa_7Hk2Qm',
        status: 'completed',
        account: {
          bank: 'Sample Bank',
          account_no: 'XXXX4821',
          holder: 'R Sharma',
          period: { from: '2026-04-01', to: '2026-09-30' },
        },
        summary: {
          abb: 84250,
          avg_monthly_credit: 61900,
          avg_monthly_debit: 58450,
          emi_obligation_monthly: 14300,
          outward_bounces: 2,
        },
        salary: { detected: true, employer: 'SAMPLE TRADERS PVT', avg_credit: 48300, months: 6 },
        flags: [
          { type: 'round_figure_deposit', date: '2026-09-22', amount: 50000, severity: 'medium' },
          { type: 'emi_bounce', date: '2026-09-05', amount: 14300, severity: 'high' },
        ],
        excel_url: '/v1/bsa/analyses/bsa_7Hk2Qm/export.xlsx',
      },
      options: [
        { title: 'Webhooks', text: 'A callback when an analysis is ready.', icon: Webhook },
        { title: 'Excel export', text: 'Summary, monthly table and flags in one workbook.', icon: FileSpreadsheet },
        { title: 'Web dashboard', text: 'No integration needed.', icon: LayoutDashboard },
      ],
    },
    security: [
      'Statement passwords are used once to unlock the file and are never stored.',
      'Account numbers are masked on screen and in exports by default.',
    ],
    related: [
      { slug: 'payslip-checker', reason: 'Match payslip net pay against the salary credits BSA finds in the statement.' },
      { slug: 'crm', reason: 'Trigger analysis from a lead and show the summary on the loan file.' },
      { slug: 'maps-api', reason: 'Verify the applicant’s address and field visit alongside the cash-flow check.' },
    ],
    faqs: [
      { q: 'Which banks does BSA support?', a: 'The major public, private and co-operative banks used in Indian lending. Send a sample statement and we’ll run it in the demo.' },
      { q: 'Can it read scanned statements?', a: 'Yes. Scans and photos go through OCR, and unclear pages are marked for an analyst to check.' },
      { q: 'Does BSA make the credit decision?', a: 'No. It gives you the numbers and the flags. Your credit policy decides.' },
      { q: 'Do we need a tech team to start?', a: 'No. Start with the dashboard and Excel export, and move to the API when your LOS team is ready.' },
    ],
    cta: { title: 'Send us a statement. See the analysis.', text: 'Bring a sample statement to a 30-minute demo.' },
  },

  /* ---------------------------------------------------------- Payslip */
  'payslip-checker': {
    meta: {
      title: 'Payslip Checker: Salary Slip Verification',
      description:
        'Verify salary slips before you lend: OCR, arithmetic and PF, PT and TDS checks, tamper detection, employer matching and a salary-credit cross-check.',
    },
    hero: {
      title: 'Catch an edited payslip before it becomes a bad loan',
      highlight: 'edited payslip',
      intro:
        'Payslip Checker redoes the maths, checks PF, PT and TDS, looks for edits and matches net pay with the salary credited to the bank.',
      secondary: 'api',
    },
    card: {
      tagline: 'Income proof, checked line by line.',
      bullets: ['Arithmetic and statutory checks', 'Font, metadata and edit detection', 'Net pay vs bank salary credit'],
    },
    outcomes: [
      { title: 'Same checks, every slip', text: 'No more depending on who looked that day.', icon: ListChecks },
      { title: 'Reasons, not just a score', text: 'Each warning says which line failed.', icon: Eye },
      { title: 'Proof matched with money', text: 'The slip compared with what reached the bank.', icon: Landmark },
      { title: 'Checked on upload', text: 'Before it reaches a credit officer.', icon: Timer },
    ],
    features: {
      title: 'The checks a sharp credit officer would do',
      highlight: 'sharp credit officer',
      intro: 'Every check shows pass, warn or fail, and your team can overrule it.',
      items: [
        { title: 'Arithmetic checks', text: 'Gross must equal earnings. Net must equal gross minus deductions.', icon: Calculator, visual: 'ps-math' },
        { title: 'Tamper detection', text: 'Font changes, edited regions and PDF metadata from editing tools.', icon: ScanSearch, visual: 'ps-tamper' },
        { title: 'PF check', text: 'Employee PF compared with 12% of basic.', icon: Scale },
        { title: 'Professional tax by state', text: 'PT checked against the state slab.', icon: Building },
        { title: 'Bank credit cross-check', text: 'With BSA, net pay is matched with salary credits.', icon: Landmark },
        { title: 'Risk score with reasons', text: 'One score for triage, with the checks behind it.', icon: Gauge },
      ],
    },
    steps: { title: 'From upload to verdict in four steps', items: [
      { title: 'Upload the slip', text: 'PDF or image, from the dashboard or your LOS.' },
      { title: 'Read and recompute', text: 'Every total is recalculated.' },
      { title: 'Check', text: 'Statutory, tamper and bank credit checks run.' },
      { title: 'Review', text: 'Warnings go to a person, with the reason shown.' },
    ] },
    api: {
      title: 'Send a slip, get every check back',
      intro: 'Send the payslip, plus a BSA analysis ID for the bank credit check.',
      method: 'POST',
      endpoint: '/v1/payslip/verify',
      request: `POST /v1/payslip/verify
Authorization: Bearer <your-api-key>
Content-Type: multipart/form-data

file=@payslip_sep-2026.pdf
state=MH
bsa_analysis_id=bsa_7Hk2Qm
applicant_ref=APP-2026-00418`,
      response: {
        verification_id: 'psv_3Lr9Xa',
        employer: 'Sample Traders Pvt Ltd',
        month: '2026-09',
        extracted: { basic: 30000, gross: 60100, deductions: 3800, net: 56300 },
        checks: [
          { id: 'gross_equals_components', result: 'pass' },
          { id: 'pf_12pct_basic', result: 'pass', expected: 3600 },
          { id: 'pt_state_slab', result: 'pass', state: 'MH' },
          { id: 'font_consistency', result: 'warn', fields: ['special_allowance', 'net_pay'] },
          { id: 'net_vs_bank_credit', result: 'fail', bank_credit: 48300, gap: 8000 },
        ],
        risk: { score: 72, band: 'high' },
      },
      options: [
        { title: 'Webhooks', text: 'Results posted back when checks finish.', icon: Webhook },
        { title: 'PDF report', text: 'One page for the credit file.', icon: FileSpreadsheet },
        { title: 'Web dashboard', text: 'Edited regions highlighted on screen.', icon: LayoutDashboard },
      ],
    },
    security: [
      'Salary and identity fields are masked in logs.',
      'Original files can be auto-deleted once the verification report is saved.',
    ],
    related: [
      { slug: 'bank-statement-analyser', reason: 'Turn on the net pay vs salary credit cross-check.' },
      { slug: 'crm', reason: 'Attach verification results to the lead and move it to the next stage.' },
      { slug: 'hrms', reason: 'Our HRMS makes clean payslips for your own staff.' },
    ],
    faqs: [
      { q: 'Does it work with our applicants’ payslip formats?', a: 'Most formats, yes, with no template per employer. Send a few samples and we’ll run them in the demo.' },
      { q: 'What if the slip is a poor photo?', a: 'Unclear fields are marked instead of guessed, so your team can ask for a better copy.' },
      { q: 'Is a high risk score a rejection?', a: 'No. It’s for triage. Your credit team decides.' },
      { q: 'Do we need BSA as well?', a: 'No. Adding BSA turns on the strongest check: net pay against the salary that reached the bank.' },
    ],
    cta: { title: 'See it catch an edited slip.', text: 'Bring a few sample payslips to a 30-minute demo.' },
  },

  /* ------------------------------------------------------------- Maps */
  'maps-api': {
    meta: {
      title: 'Maps API for India: Geocoding & Pincode Lookup',
      description:
        'Geocode messy Indian addresses, resolve pincodes to district and state, get distance and ETA, and geo-tag field visits. REST API for field teams.',
    },
    hero: {
      title: 'Turn messy Indian addresses into points on a map',
      highlight: 'messy Indian addresses',
      intro:
        '“Near Hanuman mandir, behind the school” is how addresses get written. Maps API turns it into a location, checks if your branch serves it and verifies the field visit.',
      secondary: 'api',
    },
    card: {
      tagline: 'Location checks built for Indian addresses.',
      bullets: ['Geocoding of landmark-style addresses', 'Pincode, branch and serviceability checks', 'Geo-tagged visits with address match score'],
    },
    outcomes: [
      { title: 'Fewer wasted visits', text: 'Know if an address is in your area first.', icon: Route },
      { title: 'Visits you can verify', text: 'Photo, location and time on every visit.', icon: Camera },
      { title: 'Clean location data', text: 'Pincode, district and state on capture.', icon: MapPinned },
      { title: 'One API for field ops', text: 'Geocoding, distance and territories.', icon: Plug },
    ],
    features: {
      title: 'Location data your field and credit teams can rely on',
      highlight: 'can rely on',
      intro: 'Built for how addresses are actually written in India.',
      items: [
        { title: 'Geocoding for messy addresses', text: 'Landmarks, missing pincodes and Hinglish, with a confidence level.', icon: MapPin, visual: 'maps-geo' },
        { title: 'Address match score', text: 'KYC address against where the visit happened.', icon: Crosshair, visual: 'maps-match' },
        { title: 'Pincode lookup', text: 'Pincode to district and state, with mismatches flagged.', icon: Signpost },
        { title: 'Distance and ETA', text: 'Road distance and travel time for visit planning.', icon: Route },
        { title: 'Territories', text: 'Each lead mapped to the right branch.', icon: Radar },
        { title: 'Serviceability checks', text: 'Inside your area or not, with the nearest branch.', icon: LocateFixed },
      ],
    },
    steps: { title: 'From a typed address to a verified visit', items: [
      { title: 'Send an address', text: 'As typed. No cleaning needed.' },
      { title: 'Get a location', text: 'Coordinates, pincode and district.' },
      { title: 'Check serviceability', text: 'Against your branch territories.' },
      { title: 'Verify the visit', text: 'The geo-tagged photo is matched and scored.' },
    ] },
    api: {
      title: 'Send an address as typed, get a location back',
      intro: 'Send the address exactly as the applicant wrote it.',
      method: 'POST',
      endpoint: '/v1/geo/geocode',
      request: `POST /v1/geo/geocode
Authorization: Bearer <your-api-key>
Content-Type: application/json

{
  "address": "Flat 3B, Shiv Krupa CHS, nr Hanuman mandir, Kothrud, Pune",
  "check_serviceability": true
}`,
      response: {
        location: { lat: 18.5074, lng: 73.8077 },
        confidence: 'high',
        pincode: '411038',
        district: 'Pune',
        state: 'Maharashtra',
        serviceable: true,
        nearest_branch: { code: 'BR-014', name: 'Kothrud', distance_km: 3.2, eta_min: 14 },
      },
      options: [
        { title: 'Visit webhooks', text: 'Each visit and its score, sent to you.', icon: Webhook },
        { title: 'Excel batch', text: 'A sheet of addresses, geocoded.', icon: FileSpreadsheet },
        { title: 'Map dashboard', text: 'Branches and visits on one map.', icon: LayoutDashboard },
      ],
    },
    security: [
      'Agent locations are captured only during a visit, not tracked all day.',
      'Visit photos are stored encrypted and linked to the lead, not to a public URL.',
    ],
    related: [
      { slug: 'crm', reason: 'Auto-assign leads to the right branch and plan field visits.' },
      { slug: 'hrms', reason: 'Geo-fenced attendance for field staff uses the same location engine.' },
      { slug: 'bank-statement-analyser', reason: 'Combine address verification with cash-flow checks on the same file.' },
    ],
    faqs: [
      { q: 'What about addresses without a pincode?', a: 'It uses the locality, landmarks and city, and fills in the pincode. When it isn’t sure, the confidence level says so.' },
      { q: 'Do field agents need a separate app?', a: 'No. Visits work inside our CRM’s field app, or in your own app through the API.' },
      { q: 'How is the match score worked out?', a: 'From the distance between the KYC address and the visit. You set what counts as a match.' },
      { q: 'Can we define our own territories?', a: 'Yes: a radius per branch, a list of pincodes, or boundaries drawn on the map.' },
    ],
    cta: { title: 'Try it on your hardest addresses.', text: 'Bring a sheet of addresses to a 30-minute demo.' },
  },

  /* -------------------------------------------------------------- CRM */
  crm: {
    meta: {
      title: 'Lending CRM for NBFCs, DSAs & Sales Teams',
      description:
        'Lending CRM for NBFCs, DSAs and sales teams: capture leads from web, WhatsApp and DSA portals, auto-assign, and track every file to disbursal.',
    },
    hero: {
      title: 'Every lead, follow-up and loan file on one pipeline',
      highlight: 'one pipeline',
      intro:
        'Leads from your website, WhatsApp, Excel and DSA partners land in one place and go to the right person. Lending files are tracked to disbursal.',
      secondary: 'how',
    },
    card: {
      tagline: 'Sales pipeline with a lending mode built in.',
      bullets: ['Leads from web, WhatsApp, Excel and DSAs', 'Auto-assignment and follow-up reminders', 'Lead → login → sanction → disbursal'],
    },
    outcomes: [
      { title: 'No lead left in a sheet', text: 'Every source in one pipeline.', icon: Inbox },
      { title: 'Follow-ups that don’t slip', text: 'Reminders and overdue lists.', icon: Bell },
      { title: 'Managers see the real picture', text: 'Live pipeline by stage and branch.', icon: ChartPie },
      { title: 'Field and office in sync', text: 'Field check-ins on the office dashboard.', icon: Smartphone },
    ],
    features: {
      title: 'Built for teams that sell on the phone and in the field',
      highlight: 'in the field',
      intro: 'Set up around your stages, products and branches.',
      items: [
        { title: 'Your pipeline stages', text: 'Stages per product, with required fields and documents.', icon: Workflow, visual: 'crm-stages' },
        { title: 'Auto-assignment', text: 'By pincode, branch or product. Duplicates caught on mobile number.', icon: Funnel, visual: 'crm-assign' },
        { title: 'Leads from everywhere', text: 'Website, WhatsApp, Excel, DSA portals and walk-ins.', icon: UserPlus },
        { title: 'Follow-up reminders', text: 'A daily list for every salesperson.', icon: Bell },
        { title: 'Field-sales app', text: 'Visits, location check-in and photos, built for patchy networks.', icon: Smartphone },
        { title: 'Role-based dashboards', text: 'Salesperson, branch and leadership views.', icon: ChartPie },
        { title: 'Lending stages', text: 'Lead → login → sanction → disbursal, with TAT at each stage.', icon: Landmark },
      ],
    },
    steps: { title: 'Live in four steps, set up around your team', items: [
      { title: 'Map your process', text: 'Stages, products, branches and roles.' },
      { title: 'Connect your sources', text: 'Forms, WhatsApp and your old Excel sheets.' },
      { title: 'Train the team', text: 'Short sessions for each role.' },
      { title: 'Go live', text: 'Then adjust rules as you learn.' },
    ] },
    api: {
      title: 'Push leads in, read the pipeline back',
      intro: 'Push leads from any system and read status back.',
      method: 'POST',
      endpoint: '/v1/crm/leads',
      request: `POST /v1/crm/leads
Authorization: Bearer <your-api-key>
Content-Type: application/json

{
  "name": "Amit Kulkarni",
  "mobile": "98XXXXXX21",
  "product": "business_loan",
  "amount": 800000,
  "pincode": "411038",
  "source": "dsa_portal",
  "partner_code": "DSA-0192"
}`,
      response: {
        lead_id: 'LD-2026-10457',
        stage: 'new',
        duplicate: false,
        assigned_to: { name: 'Neha P', branch: 'Kothrud', rule: 'pincode' },
        follow_up_at: '2026-10-31T16:30:00+05:30',
      },
      options: [
        { title: 'Stage webhooks', text: 'Tell your LOS when a file moves.', icon: Webhook },
        { title: 'Excel import and export', text: 'Old lead sheets in on day one.', icon: FileSpreadsheet },
        { title: 'Dashboards', text: 'Pipeline and conversion by person and branch.', icon: LayoutDashboard },
      ],
    },
    security: [
      'Mobile numbers can be masked for roles that do not need to see them.',
      'Bulk export can be restricted to managers and logged.',
    ],
    related: [
      { slug: 'bank-statement-analyser', reason: 'Run statement analysis from the lead and see the summary on the file.' },
      { slug: 'maps-api', reason: 'Assign leads by territory and verify field visits.' },
      { slug: 'payslip-checker', reason: 'Verify income documents as part of the login stage.' },
    ],
    faqs: [
      { q: 'Can it match our exact sales process?', a: 'Yes. Stages, fields, rules and roles are set up for you, and our engineers build anything custom.' },
      { q: 'Can we import our existing leads?', a: 'Yes, from Excel or CSV, with duplicates flagged by mobile number.' },
      { q: 'Is it only for lenders?', a: 'No. It works for any sales team. Lenders also get login, sanction and disbursal stages.' },
      { q: 'Can it connect to our LOS or accounting system?', a: 'Yes, through the API and webhooks. We can build the connector for you.' },
    ],
    cta: { title: 'See your pipeline in our CRM.', text: 'Tell us your stages. We’ll show them in a 30-minute demo.' },
  },

  /* ------------------------------------------------------------- HRMS */
  hrms: {
    meta: {
      title: 'HRMS for Attendance, Leave & Indian Payroll',
      description:
        'HRMS for Indian teams: geo-fenced selfie attendance, shifts, leave, payroll with PF, ESI, PT and TDS, payslips, appraisals and an employee app.',
    },
    hero: {
      title: 'Attendance to payslip, without the spreadsheets',
      highlight: 'without the spreadsheets',
      intro:
        'Selfie and geo-fenced attendance, shifts and leave feed straight into payroll, with PF, ESI, PT and TDS worked out.',
      secondary: 'how',
    },
    card: {
      tagline: 'Indian payroll, set up with your HR team.',
      bullets: ['Selfie and geo-fenced attendance', 'Payroll with PF, ESI, PT and TDS', 'Employee self-service app'],
    },
    outcomes: [
      { title: 'Calm month end', text: 'Attendance is already in payroll.', icon: CalendarCheck },
      { title: 'Fewer salary queries', text: 'Staff see their own payslips.', icon: Smartphone },
      { title: 'Statutory maths by rule', text: 'PF, ESI, PT and TDS, not formula cells.', icon: Calculator },
      { title: 'Field staff included', text: 'Selfie check-in on site.', icon: MapPin },
    ],
    features: {
      title: 'The whole employee lifecycle in one system',
      highlight: 'in one system',
      intro: 'From offer letter to full and final, set up for Indian payroll.',
      items: [
        { title: 'Selfie and geo-fenced attendance', text: 'Check-in inside an office radius, with a selfie to stop proxy punches.', icon: ScanFace, visual: 'hr-attend' },
        { title: 'Payroll with statutory deductions', text: 'Salary structures, PF, ESI, PT by state and TDS.', icon: Wallet, visual: 'hr-payroll' },
        { title: 'Shifts and rosters', text: 'Rotating and night shifts, late marks and overtime.', icon: Clock },
        { title: 'Leave', text: 'Leave types and holiday calendars, approved on the phone.', icon: CalendarCheck },
        { title: 'Payslips', text: 'Published to the employee app every month.', icon: FileText },
        { title: 'Appraisals', text: 'Goals and reviews on a cycle you define.', icon: Star },
        { title: 'Employee app', text: 'Attendance, leave and payslips in one app.', icon: Smartphone },
      ],
    },
    steps: { title: 'From setup to your first payroll run', items: [
      { title: 'Set up your company', text: 'Locations, salary structures and holidays.' },
      { title: 'Import employees', text: 'From your Excel sheet.' },
      { title: 'Roll out the app', text: 'Staff start checking in.' },
      { title: 'Run payroll', text: 'Review, approve and publish payslips.' },
    ] },
    api: {
      title: 'Push employees in, pull payroll out',
      intro: 'Read payroll runs and push employees from your other systems.',
      method: 'GET',
      endpoint: '/v1/hrms/payroll/runs/2026-09',
      request: `GET /v1/hrms/payroll/runs/2026-09
Authorization: Bearer <your-api-key>
Accept: application/json`,
      response: {
        run_id: 'PR-2026-09',
        status: 'approved',
        employees: 148,
        totals: { gross: 6842000, pf: 412600, esi: 38900, pt: 29400, tds: 286500, net: 6074600 },
        payslips: { generated: 148, published: true },
        bank_file: '/v1/hrms/payroll/runs/2026-09/bank-transfer.xlsx',
      },
      options: [
        { title: 'Webhooks', text: 'Joiners, exits and payroll approval.', icon: Webhook },
        { title: 'Excel and bank files', text: 'Statutory reports and salary transfer files.', icon: FileSpreadsheet },
        { title: 'HR dashboard', text: 'Headcount and payroll cost at a glance.', icon: LayoutDashboard },
      ],
    },
    security: [
      'Salary data is visible only to payroll roles; managers see attendance, not pay.',
      'Selfie images are used for check-in verification and kept only for the period you set.',
    ],
    related: [
      { slug: 'maps-api', reason: 'Geo-fences and field check-ins run on the same location engine.' },
      { slug: 'crm', reason: 'Field check-ins in our CRM can count as attendance.' },
      { slug: 'payslip-checker', reason: 'For lenders checking salary slips.' },
    ],
    faqs: [
      { q: 'Which statutory deductions does payroll handle?', a: 'PF, ESI, professional tax by state, LWF and TDS, with the reports your accountant needs.' },
      { q: 'Can we use our biometric devices?', a: 'If the device can export attendance, yes. We confirm your model in the demo.' },
      { q: 'How big a team does it suit?', a: 'Teams from about 10 people upwards, in one or many locations.' },
      { q: 'Can we switch payroll mid-year?', a: 'Yes. We import year-to-date figures so TDS stays correct.' },
    ],
    cta: { title: 'Run your next payroll on our HRMS.', text: 'See a sample payroll run in a 30-minute demo.' },
  },
};

/** Journey shown on the products index: how the lending tools chain together */
export const lendingJourney = [
  { slug: 'crm', stage: 'Lead', title: 'Lead captured and assigned', text: 'Our CRM dedupes the lead and assigns it to a branch officer.', icon: UserPlus },
  { slug: 'maps-api', stage: 'Visit', title: 'Address and visit verified', text: 'Address geocoded, field visit geo-tagged and scored.', icon: MapPin },
  { slug: 'payslip-checker', stage: 'Income', title: 'Payslip verified', text: 'Maths, statutory and tamper checks on each slip.', icon: BadgeCheck },
  { slug: 'bank-statement-analyser', stage: 'Cash flow', title: 'Statement analysed', text: 'ABB, EMIs and bounces; salary matched with the payslip.', icon: TrendingUp },
  { slug: 'crm', stage: 'Decision', title: 'Sanction and disbursal', text: 'Every result sits on the loan file. Your credit team decides.', icon: Target },
];
