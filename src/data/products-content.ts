// Rich content for each product page, keyed by the slugs in site.ts `products`.
// Everything shown in mockups and API samples is sample data, not real customers.
// Products are built but have no clients yet: no production, track-record or time claims.
import {
  Upload, ScanText, Tags, Calculator, ShieldAlert, FileSpreadsheet, LayoutDashboard,
  Repeat, Banknote, Timer, Scale, Eye, Plug, Webhook, FileLock,
  BadgeCheck, Receipt, Landmark, ScanSearch, Building, Gauge, MapPin, MapPinned, Route,
  Camera, Navigation, Crosshair, Radar, Signpost, LocateFixed, UserPlus, Workflow, Bell,
  Smartphone, MessageCircle, ChartPie, Users, Funnel, Inbox, CalendarCheck, Clock, Wallet,
  FileText, ClipboardCheck, Star, ScanFace, ListChecks, Layers, Target, Download,
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
  /** Service callout for products that have a custom-build twin. */
  custom?: { label: string; path: string };
  faqs: Faq[];
  cta: { title: string; text: string };
};

/** Shared security & deployment capabilities, shown on every product page */
export const securityCommon: Item[] = [
  { title: 'Encrypted in transit and at rest', text: 'TLS for every request and upload. Stored files and extracted data are encrypted on disk.', icon: FileLock },
  { title: 'Role-based access', text: 'Analysts, credit managers, ops and admins see only what their role allows. Masking for account and ID numbers.', icon: UserCheck },
  { title: 'Audit logs', text: 'Who uploaded, viewed, exported or changed what, and when. Exportable for your internal audit team.', icon: ListChecks },
  { title: 'Your servers or ours', text: 'Run it on our hosted setup, or on your own servers so data stays inside your network.', icon: Layers },
  { title: 'Retention you control', text: 'Set how long documents and results are kept. Auto-delete after the window, or purge a file on request.', icon: Timer },
  { title: 'API keys and IP allow-lists', text: 'Separate keys per environment, rotation on demand, and calls restricted to the IPs you approve.', icon: Plug },
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
        'Upload a digital PDF, a scan or a password-protected statement. BSA (Bank Statement Analyser) puts ABB, EMIs, bounces and fraud flags on one screen for credit.',
      secondary: 'api',
    },
    card: {
      tagline: 'Cash-flow underwriting from raw statements.',
      bullets: ['ABB, inflow/outflow and FOIR inputs', 'Bounce and cheque-return detection', 'Circular and round-figure fraud flags'],
    },
    outcomes: [
      { title: 'No pen-and-calculator work', text: 'Every transaction is read and totalled on upload, ready before sanction.', icon: Calculator },
      { title: 'One method, every file', text: 'ABB and FOIR worked out the same way by every analyst, every time.', icon: Scale },
      { title: 'Fraud signals up front', text: 'Suspicious patterns flagged before the file reaches sanction.', icon: ShieldAlert },
      { title: 'Fits how you work today', text: 'Dashboard for analysts, Excel for credit memos, API for your LOS.', icon: Plug },
    ],
    features: {
      title: 'An underwriter’s reading and arithmetic, done for them',
      highlight: 'done for them',
      intro: 'BSA does the reading and the arithmetic. Your credit team spends its time on judgement.',
      items: [
        { title: 'ABB and monthly cash flow', text: 'Average bank balance on the dates your policy uses, plus monthly inflow, outflow and closing balance. Unusual spikes are marked.', icon: Calculator, visual: 'bsa-flow' },
        { title: 'Fraud and tamper flags', text: 'Circular transactions, round-figure deposits just before applying, edited PDF metadata and running balances that do not add up.', icon: ShieldAlert, visual: 'bsa-flags' },
        { title: 'Digital PDFs, scans and photos', text: 'Digital PDFs give the cleanest read. Scans and phone photos go through OCR, with low-confidence pages marked for review. Password-protected PDFs open with the applicant’s password.', icon: Upload },
        { title: 'Bank auto-detection', text: 'Recognises the bank and statement layout, then extracts every line: date, narration, cheque number, debit, credit and balance.', icon: ScanText },
        { title: 'Transaction categories', text: 'Salary, EMI, UPI, NEFT/IMPS/RTGS, cash deposits and withdrawals, cheque returns, loan disbursals, charges and interest.', icon: Tags },
        { title: 'EMI obligations for FOIR', text: 'Recurring EMIs and loan repayments pulled out and totalled, ready to drop into your FOIR calculation.', icon: HandCoins },
        { title: 'Salary regularity', text: 'Finds the salary credit, the employer narration and the credit date, and shows if any month was missed or late.', icon: Banknote },
        { title: 'Bounce and return tracking', text: 'Inward and outward cheque returns, ECS/NACH bounces and the charges that follow, listed by month.', icon: Repeat },
        { title: 'Dashboard, Excel and API', text: 'Review on screen, export a formatted Excel for the credit memo, or pull JSON straight into your LOS.', icon: LayoutDashboard },
      ],
    },
    steps: { title: 'From upload to decision in four steps', items: [
      { title: 'Upload', text: 'Drag in statements from the dashboard, or send them through the API from your LOS or partner portal.' },
      { title: 'Extract', text: 'BSA identifies the bank, unlocks protected PDFs, runs OCR on scans and pulls out every transaction.' },
      { title: 'Analyse', text: 'Transactions are categorised, ABB and cash flow are computed, and fraud checks run on every line and on the file itself.' },
      { title: 'Decide', text: 'Your analyst reviews the summary and flags, exports the Excel, or your system reads the JSON and applies your policy.' },
    ] },
    api: {
      title: 'Send a statement, get structured JSON back',
      intro: 'Post the statement from your LOS. Long files are processed in the background and the result is pushed to your webhook.',
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
        { title: 'Webhooks', text: 'A callback when an analysis completes or needs a human look.', icon: Webhook },
        { title: 'Excel export', text: 'A formatted workbook: summary, monthly table, transactions and flags on separate sheets.', icon: FileSpreadsheet },
        { title: 'Web dashboard', text: 'No integration needed. Upload, review and export from the browser.', icon: LayoutDashboard },
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
      { q: 'Which banks does BSA support?', a: 'It’s built for the statement layouts of the major public sector, private and co-operative banks used in Indian lending, and we add new layouts on request. Send us a sample statement and we’ll run it in the demo so you can see the output for your mix of banks.' },
      { q: 'Can it read scanned or photographed statements?', a: 'Yes. Digital PDFs give the cleanest read. Scans and phone photos go through OCR, with low-confidence pages marked for review so an analyst checks them instead of trusting them blindly.' },
      { q: 'Does BSA make the credit decision?', a: 'No. It gives you the numbers and the flags. Your credit policy makes the decision. If you want, we can map BSA outputs to your policy rules so your LOS gets a pass/refer/decline signal.' },
      { q: 'Can we run it on our own servers?', a: 'Yes. BSA runs on our hosted setup or on your servers, so statements can stay inside your network. The hosted option is there for teams that want to start quickly.' },
      { q: 'Do we need a tech team to start?', a: 'No. Analysts can use the web dashboard and Excel export from the start. Move to the API whenever your LOS team is ready.' },
    ],
    cta: { title: 'Send us a statement. See the analysis.', text: 'Bring a sample statement to a 30-minute demo and walk through ABB, bounces and fraud flags on your own kind of file.' },
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
        'Payslip Checker reads the slip, redoes the maths, checks PF, PT and TDS, looks for signs of editing and matches net pay against the salary actually credited to the bank.',
      secondary: 'api',
    },
    card: {
      tagline: 'Income proof, checked line by line.',
      bullets: ['Arithmetic and statutory checks', 'Font, metadata and edit detection', 'Net pay vs bank salary credit'],
    },
    outcomes: [
      { title: 'Every slip checked the same way', text: 'No more relying on how carefully someone looked that day.', icon: ListChecks },
      { title: 'Reasons, not just a score', text: 'Each warning says exactly which line failed and why.', icon: Eye },
      { title: 'Proof matched with money', text: 'What the slip says is compared with what reached the bank.', icon: Landmark },
      { title: 'Checked on upload', text: 'Every check runs as soon as the slip is uploaded, before it reaches a credit officer.', icon: Timer },
    ],
    features: {
      title: 'The checks a sharp credit officer would do',
      highlight: 'sharp credit officer',
      intro: 'Every check is listed with a pass, warn or fail, so your team can see the reasoning and overrule it when they know better.',
      items: [
        { title: 'Arithmetic checks', text: 'Gross must equal the sum of earnings. Net must equal gross minus deductions. Any gap is shown in rupees.', icon: Calculator, visual: 'ps-math' },
        { title: 'Tamper detection', text: 'Font and size changes inside fields, edited regions, mismatched alignment and PDF metadata from editing tools.', icon: ScanSearch, visual: 'ps-tamper' },
        { title: 'OCR for PDFs and images', text: 'Reads digital PDFs, scans and phone photos, and marks low-confidence fields instead of guessing. Pulls out employer, employee, month, earnings and deductions.', icon: ScanText },
        { title: 'PF sanity check', text: 'Employee PF compared with 12% of basic (or the wage ceiling where it applies), with the expected figure shown.', icon: Scale },
        { title: 'Professional tax by state', text: 'PT checked against the slab for the state of employment, including months where the amount differs.', icon: Building },
        { title: 'TDS plausibility', text: 'Flags TDS that looks out of line with the annual salary the slip implies.', icon: Receipt },
        { title: 'Bank credit cross-check', text: 'Works with BSA to compare net pay with the salary credits in the bank statement, month by month.', icon: Landmark },
        { title: 'Employer name matching', text: 'Matches the employer on the slip with the salary narration in the bank statement, allowing for short forms.', icon: BadgeCheck },
        { title: 'Risk score with reasons', text: 'A single score for triage, backed by the list of checks that moved it.', icon: Gauge },
      ],
    },
    steps: { title: 'From upload to verdict in four steps', items: [
      { title: 'Upload the slip', text: 'One or several months, as PDF or image, from the dashboard or your LOS.' },
      { title: 'Read and recompute', text: 'Fields are extracted and every total is recalculated from the components.' },
      { title: 'Check and cross-check', text: 'Statutory, tamper and employer checks run; if a BSA analysis exists, net pay is matched against salary credits.' },
      { title: 'Review the verdict', text: 'Low-risk slips move on. Warnings and fails go to a human with the exact reason highlighted.' },
    ] },
    api: {
      title: 'Send a slip, get every check back',
      intro: 'Pass the payslip and, optionally, a BSA analysis ID to turn on the bank credit cross-check.',
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
        { title: 'Webhooks', text: 'Results posted back to your system as soon as checks finish.', icon: Webhook },
        { title: 'Excel and PDF report', text: 'A one-page verification report to attach to the credit file.', icon: FileSpreadsheet },
        { title: 'Web dashboard', text: 'Upload and review slips in the browser with the edited regions highlighted.', icon: LayoutDashboard },
      ],
    },
    security: [
      'Salary and identity fields are masked in logs.',
      'Original files can be auto-deleted once the verification report is saved.',
    ],
    related: [
      { slug: 'bank-statement-analyser', reason: 'Turn on the net pay vs salary credit cross-check.' },
      { slug: 'crm', reason: 'Attach verification results to the lead and move it to the next stage.' },
      { slug: 'hrms', reason: 'Manka HRMS generates clean, consistent payslips for your own employees.' },
    ],
    faqs: [
      { q: 'Does it work with our applicants’ payslip formats?', a: 'Most formats, yes. There’s no template to set up per employer: the checker reads earnings and deductions from the slip itself. Send a few samples and we’ll run them in the demo.' },
      { q: 'What happens if the slip is a poor photo?', a: 'Fields read with low confidence are marked, and the check result says so instead of guessing. Your team can ask for a better copy or verify by hand.' },
      { q: 'Is a high risk score a rejection?', a: 'No. The score is for triage. Every warning comes with its reason, and your credit team decides. Many warnings have innocent explanations, such as arrears or a mid-month joining.' },
      { q: 'Do we need BSA as well?', a: 'No, the payslip checks work on their own. Adding BSA turns on the strongest check: comparing net pay with the salary that actually reached the bank account.' },
    ],
    cta: { title: 'See it catch an edited slip.', text: 'Bring a few sample payslips to a 30-minute demo and see each check, with the reasons, on your own documents.' },
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
        '“Near Hanuman mandir, behind the school” is how addresses get written. Maps API geocodes it, finds the district and state, checks if your branch serves it and confirms where the field visit happened.',
      secondary: 'api',
    },
    card: {
      tagline: 'Location checks built for Indian addresses.',
      bullets: ['Geocoding of landmark-style addresses', 'Pincode, branch and serviceability checks', 'Geo-tagged visits with address match score'],
    },
    outcomes: [
      { title: 'Fewer wasted visits', text: 'Know before dispatch if an address is in your service area.', icon: Route },
      { title: 'Visits you can verify', text: 'Photo, coordinates and timestamp on every field visit.', icon: Camera },
      { title: 'Clean location data', text: 'Pincode, district and state fixed at the point of capture.', icon: MapPinned },
      { title: 'One API for field ops', text: 'Geocoding, distance and territories behind a single key.', icon: Plug },
    ],
    features: {
      title: 'Location data your field and credit teams can rely on',
      highlight: 'can rely on',
      intro: 'Built around how addresses are actually written in India, not how a form expects them to be.',
      items: [
        { title: 'Geocoding for messy addresses', text: 'Handles landmarks, missing pincodes, mixed spellings and Hinglish. Returns coordinates with a confidence level.', icon: MapPin, visual: 'maps-geo' },
        { title: 'Address match score', text: 'Compares the KYC address with where the visit happened and returns a distance and a score.', icon: Crosshair, visual: 'maps-match' },
        { title: 'Pincode intelligence', text: 'Pincode to post office, district and state. Flags pincodes that do not match the city written in the address.', icon: Signpost },
        { title: 'Distance and ETA', text: 'Road distance and travel time between branch, applicant and agent, for routing and visit planning.', icon: Route },
        { title: 'Geo-tagged field visits', text: 'Each visit records a photo, latitude, longitude and timestamp from the agent’s phone.', icon: Camera },
        { title: 'Branch and territory mapping', text: 'Draw territories or set a radius per branch. Every lead is mapped to the right branch and officer.', icon: Radar },
        { title: 'Serviceability checks', text: 'Yes/no on whether a location is inside your service area, with the nearest branch if it is not.', icon: LocateFixed },
        { title: 'Batch processing', text: 'Upload an Excel of addresses and get them back geocoded and cleaned.', icon: FileSpreadsheet },
        { title: 'Visit and route history', text: 'See where agents went and when, for audits and for planning beats.', icon: Navigation },
      ],
    },
    steps: { title: 'From a typed address to a verified visit', items: [
      { title: 'Send an address', text: 'From your CRM, LOS or app, send the address as typed. No cleaning needed.' },
      { title: 'Get a location', text: 'Coordinates, pincode, district, state and a confidence level come back in one response.' },
      { title: 'Check serviceability', text: 'The point is checked against your branch radius or territory, with the nearest branch and distance.' },
      { title: 'Verify the visit', text: 'When the agent visits, the geo-tagged photo is matched against the address and scored.' },
    ] },
    api: {
      title: 'Send an address as typed, get a location back',
      intro: 'Plain JSON over HTTPS. Send the address exactly as the applicant wrote it.',
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
        { title: 'Visit webhooks', text: 'Each geo-tagged visit, with its match score, posted to you when the agent submits it.', icon: Webhook },
        { title: 'Excel batch', text: 'Upload a sheet of addresses, download it geocoded with pincode and district.', icon: FileSpreadsheet },
        { title: 'Map dashboard', text: 'Branches, territories and visits on one map for ops managers.', icon: LayoutDashboard },
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
      { q: 'How does it handle addresses without a pincode?', a: 'It uses the locality, landmarks and city to find the location and fills in the pincode, district and state. When it is not sure, the confidence level says so, rather than returning a confident wrong answer.' },
      { q: 'Can field agents use it without a separate app?', a: 'Yes. Geo-tagged visits work inside Manka CRM’s field app, or we can add the capture flow to your existing app through the API.' },
      { q: 'How is the address match score worked out?', a: 'It is based on the distance between the geocoded KYC address and the visit location, adjusted for how precise the geocode was. You set the distance that counts as a match for your policy.' },
      { q: 'Can we define our own territories?', a: 'Yes. Use a radius around each branch, a list of pincodes, or draw boundaries on the map. Leads are mapped to territories automatically.' },
    ],
    cta: { title: 'Try it on your hardest addresses.', text: 'Send us a sheet of real-world addresses and see them geocoded, cleaned and mapped to your branches in a 30-minute demo.' },
  },

  /* -------------------------------------------------------------- CRM */
  crm: {
    meta: {
      title: 'Manka CRM: Lending CRM for NBFCs & Sales Teams',
      description:
        'Lending CRM for NBFCs, DSAs and sales teams: capture leads from web, WhatsApp and DSA portals, auto-assign, and track every file to disbursal.',
    },
    hero: {
      title: 'Every lead, follow-up and loan file on one pipeline',
      highlight: 'one pipeline',
      intro:
        'Leads from your website, WhatsApp, Excel sheets and DSA partners land in one place and go to the right person, with every follow-up on a list. A lending variant tracks each file from lead to disbursal.',
      secondary: 'how',
    },
    card: {
      tagline: 'Sales pipeline with a lending mode built in.',
      bullets: ['Leads from web, WhatsApp, Excel and DSAs', 'Auto-assignment and follow-up reminders', 'Lead → login → sanction → disbursal'],
    },
    outcomes: [
      { title: 'No lead left in a spreadsheet', text: 'Every source flows into one pipeline the same day.', icon: Inbox },
      { title: 'Follow-ups that don’t slip', text: 'Reminders and overdue lists, not memory and sticky notes.', icon: Bell },
      { title: 'Managers see the real picture', text: 'Live pipeline by stage, branch and person, without asking for an MIS.', icon: ChartPie },
      { title: 'Field and office in sync', text: 'Check-ins and updates from the field land on the office dashboard.', icon: Smartphone },
    ],
    features: {
      title: 'Built for teams that sell on the phone and in the field',
      highlight: 'in the field',
      intro: 'Configured around your stages, products and branches, not a generic template you have to bend to.',
      items: [
        { title: 'Your pipeline stages', text: 'Define stages per product. Required fields and documents per stage keep files complete.', icon: Workflow, visual: 'crm-stages' },
        { title: 'Auto-assignment', text: 'Round-robin, by pincode, by branch or by product. Duplicate leads are caught on mobile number.', icon: Funnel, visual: 'crm-assign' },
        { title: 'Lead capture from everywhere', text: 'Website forms, WhatsApp, Excel imports, DSA and partner portals, and walk-ins added from the app.', icon: UserPlus },
        { title: 'Follow-up reminders', text: 'Scheduled calls and visits, overdue alerts and a daily list for every salesperson.', icon: Bell },
        { title: 'Field-sales mobile app', text: 'Today’s visits, check-in with location, photo capture and lead updates. Built for patchy networks; offline capture available on request.', icon: Smartphone },
        { title: 'WhatsApp, SMS and email templates', text: 'Approved templates for first contact, document requests and reminders, sent from the lead screen.', icon: MessageCircle },
        { title: 'Role-based dashboards', text: 'Salesperson, branch manager and leadership each get the view that matters to them.', icon: ChartPie },
        { title: 'Lending variant', text: 'Lead → login → sanction → disbursal, with document checklists and TAT at each stage.', icon: Landmark },
        { title: 'DSA and partner tracking', text: 'Leads, conversions and payouts per partner, with a partner login for submitting files.', icon: Users },
      ],
    },
    steps: { title: 'Live in four steps, set up around your team', items: [
      { title: 'Map your process', text: 'We sit with your sales and ops heads and set up your stages, products, branches and roles.' },
      { title: 'Connect your sources', text: 'Website forms, WhatsApp, partner portals and your existing Excel sheets are connected and imported.' },
      { title: 'Train the team', text: 'Short, role-wise sessions for sales, field staff and managers, on the web and the mobile app.' },
      { title: 'Go live and refine', text: 'Go live, watch the dashboards and adjust rules and stages as you learn.' },
    ] },
    api: {
      title: 'Push leads in, read the pipeline back',
      intro: 'Push leads from any system and read pipeline status back. Every change can fire a webhook.',
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
        { title: 'Stage webhooks', text: 'Notify your LOS or accounts team when a file is logged in, sanctioned or disbursed.', icon: Webhook },
        { title: 'Excel import and export', text: 'Bring in old lead sheets on day one; export any filtered view for MIS.', icon: FileSpreadsheet },
        { title: 'Dashboards', text: 'Pipeline, conversion and follow-up discipline by person, branch and source.', icon: LayoutDashboard },
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
    custom: { label: 'CRM development', path: '/services/crm-development/' },
    faqs: [
      { q: 'Can it match our exact sales process?', a: 'Yes. Stages, fields, products, assignment rules and roles are configured for you. If something needs custom code, our engineering team builds it: the same team that does our custom builds.' },
      { q: 'Can we import our existing leads?', a: 'Yes. Excel and CSV imports map your columns to Manka CRM fields and flag duplicates by mobile number before anything is created.' },
      { q: 'Does the mobile app work with weak signal?', a: 'The field app is built for patchy networks. Offline capture, where check-ins and updates are saved on the phone and synced when the signal is back, is available on request.' },
      { q: 'Is it only for lenders?', a: 'No. The standard Manka CRM works for any sales team. The lending variant adds login, sanction and disbursal stages, document checklists and DSA tracking.' },
      { q: 'Can it connect to our LOS or accounting system?', a: 'Yes, through the REST API and webhooks. We can also build the connector for you.' },
    ],
    cta: { title: 'See your pipeline in Manka CRM.', text: 'Tell us your stages and sources. In a 30-minute demo we will show the pipeline set up the way your team works.' },
  },

  /* ------------------------------------------------------------- HRMS */
  hrms: {
    meta: {
      title: 'Manka HRMS: Attendance, Leave & Payroll Software',
      description:
        'HRMS for Indian teams: geo-fenced selfie attendance, shifts, leave, payroll with PF, ESI, PT and TDS, payslips, appraisals and an employee app.',
    },
    hero: {
      title: 'Attendance to payslip, without the spreadsheets',
      highlight: 'without the spreadsheets',
      intro:
        'Selfie and geo-fenced attendance, shifts and leave feed straight into payroll. PF, ESI, PT and TDS are worked out, payslips go to every employee’s phone, and month end needs no Excel chasing.',
      secondary: 'how',
    },
    card: {
      tagline: 'Indian payroll, set up with your HR team.',
      bullets: ['Selfie and geo-fenced attendance', 'Payroll with PF, ESI, PT and TDS', 'Employee self-service app'],
    },
    outcomes: [
      { title: 'Month end without the scramble', text: 'Attendance and leave are already in payroll when you run it.', icon: CalendarCheck },
      { title: 'Fewer “why is my salary less?” calls', text: 'Employees see their attendance, leave and payslip themselves.', icon: Smartphone },
      { title: 'Statutory maths done by rule', text: 'PF, ESI, PT and TDS worked out from the rules, not formula cells.', icon: Calculator },
      { title: 'Field staff included', text: 'Geo-fenced, selfie check-in for people who never see an office.', icon: MapPin },
    ],
    features: {
      title: 'The whole employee lifecycle in one system',
      highlight: 'in one system',
      intro: 'From offer letter to full and final, set up for Indian payroll rules and the way Indian teams work.',
      items: [
        { title: 'Selfie and geo-fenced attendance', text: 'Check-in from the app inside an office or site radius, with a selfie to stop proxy punches.', icon: ScanFace, visual: 'hr-attend' },
        { title: 'Payroll with statutory deductions', text: 'Salary structures, PF, ESI, professional tax by state and TDS, with arrears and reimbursements.', icon: Wallet, visual: 'hr-payroll' },
        { title: 'Shifts and rosters', text: 'Fixed, rotating and night shifts, weekly offs, late marks and overtime rules.', icon: Clock },
        { title: 'Leave management', text: 'Leave types, accrual, carry-forward and holiday calendars per location, with approvals on the phone.', icon: CalendarCheck },
        { title: 'Payslip generation', text: 'Clean, consistent payslips for every employee, published to the app and emailed as PDF.', icon: FileText },
        { title: 'Onboarding documents', text: 'Offer letters, ID and bank proofs, and joining forms collected and checked before day one.', icon: ClipboardCheck },
        { title: 'Appraisals', text: 'Goals, self-review, manager review and ratings on a cycle you define.', icon: Star },
        { title: 'Employee self-service app', text: 'Attendance, leave balance, payslips, tax declarations and requests in one app.', icon: Smartphone },
        { title: 'Reports and exports', text: 'Muster roll, statutory reports, bank transfer files and MIS in Excel.', icon: Download },
      ],
    },
    steps: { title: 'From setup to your first payroll run', items: [
      { title: 'Load your company', text: 'Locations, departments, salary structures and holiday calendars are set up with your HR team.' },
      { title: 'Import employees', text: 'Bring in your employee master and opening leave balances from Excel.' },
      { title: 'Roll out the app', text: 'Employees install the app, set up their selfie and start checking in.' },
      { title: 'Run payroll', text: 'Attendance and leave flow in, you review the payroll summary, approve and publish payslips.' },
    ] },
    api: {
      title: 'Push employees in, pull payroll out',
      intro: 'Read payroll runs, push employees from your other systems and import attendance from biometric devices that can export it.',
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
        { title: 'Webhooks', text: 'Events for new joiners, exits, leave approvals and payroll approval.', icon: Webhook },
        { title: 'Excel and bank files', text: 'Muster roll, statutory reports and salary transfer files in the formats you need.', icon: FileSpreadsheet },
        { title: 'HR dashboard', text: 'Headcount, attendance, attrition and payroll cost at a glance.', icon: LayoutDashboard },
      ],
    },
    security: [
      'Salary data is visible only to payroll roles; managers see attendance, not pay.',
      'Selfie images are used for check-in verification and kept only for the period you set.',
    ],
    related: [
      { slug: 'maps-api', reason: 'Geo-fences and field check-ins run on the same location engine.' },
      { slug: 'crm', reason: 'Field-sales check-ins in Manka CRM can count towards attendance.' },
      { slug: 'payslip-checker', reason: 'Built for lenders checking salary slips like the ones Manka HRMS generates.' },
    ],
    custom: { label: 'HR solutions', path: '/services/hr-solutions/' },
    faqs: [
      { q: 'Which statutory deductions does payroll handle?', a: 'PF, ESI, professional tax by state, LWF where applicable and TDS on salary, along with the reports your accountant needs for filing.' },
      { q: 'Can we use our biometric devices?', a: 'Manka HRMS imports attendance from biometric devices that can export it, alongside app check-ins, so office and field staff are on one attendance record. We confirm your device model in the demo.' },
      { q: 'How big a team does it suit?', a: 'Teams from about 10 people upwards, across one or many locations. Tell us your headcount and we’ll confirm fit.' },
      { q: 'Can we move from our current payroll mid-year?', a: 'Yes. We import year-to-date salary and tax figures so TDS and statutory reports stay correct for the full year.' },
    ],
    cta: { title: 'Run your next payroll on Manka HRMS.', text: 'In a 30-minute demo we will walk through attendance, leave and a sample payroll run set up like your company.' },
  },
};

/** Journey shown on the products index: how the lending tools chain together */
export const lendingJourney = [
  { slug: 'crm', stage: 'Lead', title: 'Lead captured and assigned', text: 'A DSA submits a lead. Manka CRM checks for duplicates and assigns it to the right branch officer.', icon: UserPlus },
  { slug: 'maps-api', stage: 'Visit', title: 'Address and visit verified', text: 'The address is geocoded and checked for serviceability. The field visit is geo-tagged and scored.', icon: MapPin },
  { slug: 'payslip-checker', stage: 'Income', title: 'Payslip verified', text: 'Arithmetic, statutory and tamper checks run on the salary slips the applicant uploads.', icon: BadgeCheck },
  { slug: 'bank-statement-analyser', stage: 'Cash flow', title: 'Statement analysed', text: 'ABB, EMI obligations and bounces computed; salary credits matched with the payslip.', icon: TrendingUp },
  { slug: 'crm', stage: 'Decision', title: 'Sanction and disbursal', text: 'Results sit on the loan file in Manka CRM. Your credit team decides, and the file moves to disbursal.', icon: Target },
];
