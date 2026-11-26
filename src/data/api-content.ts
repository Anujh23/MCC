// Product APIs as clients see them: the /docs/ page and the client app (sidebar, one page per API with Try).
// Behaviour and prices live in the API repo (manka-client-api, app/products/); keep paths and fields in sync.
// Prices are not listed here: the client app shows the live ones from GET /account.

export const apiBase = 'https://api.mankacommerceandconsultancy.co.in';
/** Sample map image URL (Maps API): every located request has one. */
export const mapImage = `${apiBase}/v1/maps/image/loc_x7Kp2mQ9aB1c.png`;

/** Sidebar sections in the client app, in order. */
export const apiGroups = ['KYC', 'Bank', 'Income', 'Location'] as const;
export type ApiGroup = (typeof apiGroups)[number];

export type ApiField = {
  name: string;
  label: string;
  type: 'string' | 'number' | 'file';
  example: string | number;
  doc: string;
};

export type ApiProduct = {
  name: string;
  group: ApiGroup;
  title: string;
  /** Submit button on the Try form. */
  verb: string;
  method: 'GET' | 'POST';
  path: string;
  summary: string;
  /** What it does not do. Keep it honest: no "verified", no accuracy claims. */
  limits: string;
  fields: ApiField[];
  /** Sent as multipart form data (a file), not JSON (BSA). */
  upload?: boolean;
  response: Record<string, unknown>;
  /** Possible values of enum-like response fields. */
  values?: Record<string, string[]>;
  /** Try uses the browser's own location instead of a form (Maps API). */
  tryLocation?: boolean;
  /** Using it from a web page (Maps JavaScript API): the HTML example. */
  script?: string;
  /** A second, free endpoint that reads the result (Maps API). */
  result?: { method: 'GET'; path: string; summary: string; example: string; response: Record<string, unknown> };
};

export const apiProducts: ApiProduct[] = [
  {
    name: 'pan',
    group: 'KYC',
    title: 'PAN check',
    verb: 'Check',
    method: 'POST',
    path: '/v1/pan/check',
    summary: 'Check a PAN and see the holder type.',
    limits: 'Format only. It doesn’t confirm the PAN exists or who it belongs to.',
    fields: [{ name: 'pan', label: 'PAN', type: 'string', example: 'ABCPE1234F', doc: '10 characters. Case and spaces are ignored.' }],
    response: { id: 'call_1042', pan: 'ABCPE1234F', format_valid: true, reason: null, holder_type: 'individual' },
    values: {
      reason: ['length', 'format', 'holder_type'],
      holder_type: ['individual', 'company', 'firm', 'huf', 'aop', 'trust', 'boi', 'local_authority', 'artificial_juridical_person', 'government'],
    },
  },
  {
    name: 'gstin',
    group: 'KYC',
    title: 'GSTIN check',
    verb: 'Check',
    method: 'POST',
    path: '/v1/gstin/check',
    summary: 'Check a GSTIN and get its state and PAN.',
    limits: 'Regular PAN-based GSTINs. It doesn’t confirm the GSTIN is registered or active.',
    fields: [{ name: 'gstin', label: 'GSTIN', type: 'string', example: '07ABCPE1234F1ZD', doc: '15 characters. Case and spaces are ignored.' }],
    response: { id: 'call_1043', gstin: '07ABCPE1234F1ZD', format_valid: true, reason: null, state: 'Delhi', pan: 'ABCPE1234F' },
    values: { reason: ['length', 'format', 'state_code', 'check_digit'] },
  },
  {
    name: 'ifsc',
    group: 'Bank',
    title: 'IFSC lookup',
    verb: 'Look up',
    method: 'GET',
    path: '/v1/ifsc/{ifsc}',
    summary: 'Get the bank, branch, address and payment modes for any IFSC.',
    limits: 'data_as_of is the date the branch data was last updated.',
    fields: [{ name: 'ifsc', label: 'IFSC', type: 'string', example: 'SBIN0000691', doc: '11 characters, in the path.' }],
    response: {
      id: 'call_1044', ifsc: 'SBIN0000691', bank: 'State Bank of India', branch: 'NEW DELHI MAIN BRANCH',
      address: '11SANSAD MARG, NEW DELHI 110 001', city: 'NEW DELHI', district: 'NEW DELHI', state: 'DELHI',
      micr: '110002087', upi: true, neft: true, rtgs: true, imps: true, data_as_of: '2026-09-01',
    },
  },
  {
    name: 'bsa',
    group: 'Bank',
    title: 'BSA (Bank Statement Analyser)',
    verb: 'Analyse',
    upload: true,
    method: 'POST',
    path: '/v1/bsa/analyze',
    summary: 'Flag fake-looking statements and get income, EMIs and bounces.',
    limits: 'Bank-downloaded PDFs only: no scans and no Account Aggregator PDFs. Send the password if the PDF has one. The statement is not stored. Only a successful analysis is charged.',
    fields: [
      { name: 'file', label: 'Statement (PDF)', type: 'file', example: 'statement.pdf', doc: 'The bank’s PDF. Up to 10 MB.' },
      { name: 'password', label: 'PDF password', type: 'string', example: 'your-pdf-password', doc: 'Optional. Only if the PDF is password protected.' },
    ],
    response: {
      id: 'call_1050',
      meta: { bank_name: 'Sample Bank', account_holder: 'Sample Name', account_number: 'XXXXXX1234', period_from: '2026-05-01', period_to: '2026-10-31', txn_count: 214 },
      authenticity: { verdict: 'ORIGINAL', score: 100, fake_reasons: [] },
      data_quality: { level: 'READY', message: 'Every row reconciles and the closing balance matches.' },
      summary: { monthly_income: 52000, existing_emi: 8500, bounce_count: 0, abb: 41250 },
      upi_mobiles: {
        count: 2, txn_count: 3, paid_count: 2, paid_total: 1200, received_count: 1, received_total: 1500,
        contacts: [
          { mobile: '9000000002', name: 'Sample Two', upi_apps: 'okaxis', paid_count: 0, paid: 0, received_count: 1, received: 1500, net: 1500, txn_count: 1, months: 1, first_date: '2026-06-08', last_date: '2026-06-08', unverified: 0, own_account: false },
          { mobile: '9000000001', name: 'Sample One', upi_apps: 'ybl', paid_count: 2, paid: 1200, received_count: 0, received: 0, net: -1200, txn_count: 2, months: 1, first_date: '2026-06-02', last_date: '2026-06-12', unverified: 0, own_account: false },
        ],
        transactions: [
          { idx: 3, date: '2026-06-08', mobile: '9000000002', upi_id: '9000000002@okaxis', direction: 'Received', amount: 1500, balance: 40300, name: 'Sample Two', narration: 'UPI/9000000002@okaxis/SAMPLE TWO' },
          { idx: 1, date: '2026-06-02', mobile: '9000000001', upi_id: '9000000001@ybl', direction: 'Paid', amount: 500, balance: 9500, name: 'Sample One', narration: 'UPI/9000000001@ybl/SAMPLE ONE' },
          { idx: 4, date: '2026-06-12', mobile: '9000000001', upi_id: '9000000001@ybl', direction: 'Paid', amount: 700, balance: 39600, name: 'Sample One', narration: 'UPI/9000000001@ybl/SAMPLE ONE' },
        ],
      },
      note: 'Also returned: reconciliation, salary, loans, bounces, top_credits, top_debits, monthly, categories, counterparties, cash, risk_flags, transactions, warnings.',
    },
    values: {
      verdict: ['ORIGINAL', 'SUSPICIOUS', 'FAKE'],
      level: ['READY', 'REVIEW', 'NOT_USABLE'],
    },
  },
  {
    name: 'maps',
    group: 'Location',
    title: 'Maps API',
    verb: 'Try it',
    tryLocation: true,
    method: 'POST',
    path: '/v1/maps/link',
    summary: 'Send a link; get the person’s GPS location once they allow it.',
    limits: 'GPS from the person’s phone, with their consent. A link works once and expires after 24 hours. Accuracy depends on the phone.',
    fields: [{ name: 'reference', label: 'Reference', type: 'string', example: 'LN-1042', doc: 'Your own id, e.g. a loan number. Up to 64 characters.' }],
    response: {
      id: 'call_1047', request: 'loc_x7Kp2mQ9aB1c', reference: 'LN-1042', status: 'pending',
      url: `https://mankacommerceandconsultancy.co.in/locate/?t=…`, expires_at: '2026-11-26T10:30:00Z',
      lat: null, lng: null, accuracy_m: null, located_at: null, image: null,
    },
    values: { status: ['pending', 'done', 'expired'] },
    script: mapsScript(),
    result: {
      method: 'GET',
      path: '/v1/maps/link/{request}',
      summary: 'Reads a request. Not charged: check it until status is done.',
      example: 'loc_x7Kp2mQ9aB1c',
      response: {
        request: 'loc_x7Kp2mQ9aB1c', reference: 'LN-1042', status: 'done', url: null, expires_at: '2026-11-26T10:30:00Z',
        lat: 28.6139391, lng: 77.2090212, accuracy_m: 12.3, located_at: '2026-11-25T10:34:12Z', image: mapImage,
      },
    },
  },
];

/** Not built yet: listed in the client app with an empty page, left out of the docs. Move to apiProducts when live. */
export const apiPlanned: { name: string; group: ApiGroup; title: string }[] = [
  { name: 'payslip', group: 'Income', title: 'Payslip Checker' },
];

/** Banks the BSA reads (client app only, not in the docs). */
export const bsaBanks: string[] = [
  'HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra Bank', 'IDFC FIRST Bank', 'Yes Bank', 'IndusInd Bank',
  'Bank of Baroda', 'Punjab National Bank', 'Canara Bank', 'Union Bank of India', 'Bank of India', 'Indian Bank', 'Central Bank of India',
  'Bank of Maharashtra', 'Indian Overseas Bank', 'UCO Bank', 'IDBI Bank', 'Federal Bank', 'Karnataka Bank', 'Karur Vysya Bank',
  'South Indian Bank', 'City Union Bank', 'RBL Bank', 'DCB Bank', 'Bandhan Bank', 'AU Small Finance Bank', 'Equitas Small Finance Bank',
  'Jana Small Finance Bank', 'ESAF Small Finance Bank', 'Standard Chartered', 'HSBC', 'DBS Bank', 'SBM Bank India', 'Saraswat Bank',
  'TJSB Sahakari Bank', 'Airtel Payments Bank', 'Fino Payments Bank',
];

export const apiErrors = [
  { status: 401, code: 'invalid_key', when: 'Key missing, wrong or replaced' },
  { status: 403, code: 'origin_not_allowed', when: 'Browser call from a website not listed under API key → Websites' },
  { status: 402, code: 'insufficient_balance', when: 'Balance too low for the call' },
  { status: 404, code: 'not_found', when: 'Nothing found, e.g. an unknown IFSC' },
  { status: 422, code: 'invalid_request', when: 'Input missing or in the wrong format' },
  { status: 422, code: 'password_required', when: 'BSA: the PDF needs its password, or the password is wrong' },
  { status: 422, code: 'unsupported_file', when: 'BSA: no transactions could be read from the PDF' },
  { status: 422, code: 'aa_statement', when: 'BSA: Account Aggregator PDF; send the statement downloaded from the bank' },
  { status: 422, code: 'analysis_timeout', when: 'BSA: the PDF took too long to read; get a fresh download' },
  { status: 500, code: 'server_error', when: 'Something failed on our side' },
];

/** Maps JavaScript API: the script tag, then the visitor's coordinates and map image. */
export function mapsScript(key = 'YOUR_KEY'): string {
  return `<img id="map" alt="Map">
<small>© OpenStreetMap</small>
<p id="coords"></p>
<script src="${apiBase}/v1/maps.js?key=${key}"></script>
<script>
  MapsAPI.locate().then((loc) => {
    document.getElementById('map').src = loc.image;
    document.getElementById('coords').textContent = loc.lat + ', ' + loc.lng;
  });
</script>`;
}

/** The curl example for a product, built from its example inputs. */
export function curl(p: ApiProduct): string {
  const auth = '  -H "Authorization: Bearer YOUR_KEY"';
  if (p.upload) {
    const forms = p.fields.map((f) => `  -F "${f.name}=${f.type === 'file' ? '@' : ''}${f.example}"`);
    return [`curl ${apiBase}${p.path}`, auth, ...forms].join(' \\\n');
  }
  const body = Object.fromEntries(p.fields.map((f) => [f.name, f.example]));
  if (p.method === 'GET') return `curl ${apiBase}${p.path.replace(/\{(\w+)\}/g, (_, k) => String(body[k]))} \\\n${auth}`;
  return `curl ${apiBase}${p.path} \\\n${auth} \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(body)}'`;
}
