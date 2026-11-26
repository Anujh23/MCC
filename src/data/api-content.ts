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
  type: 'string' | 'number';
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
    summary: 'Checks a PAN’s format and tells you the holder type from its 4th character.',
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
    summary: 'Checks a GSTIN’s format, state code and check digit, and returns its state and PAN.',
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
    summary: 'Returns the bank, branch, address, MICR and payment modes for an IFSC.',
    limits: 'From the open Razorpay IFSC dataset (MIT licence). data_as_of is the release date.',
    fields: [{ name: 'ifsc', label: 'IFSC', type: 'string', example: 'SBIN0000691', doc: '11 characters, in the path.' }],
    response: {
      id: 'call_1044', ifsc: 'SBIN0000691', bank: 'State Bank of India', branch: 'NEW DELHI MAIN BRANCH',
      address: '11SANSAD MARG, NEW DELHI 110 001', city: 'NEW DELHI', district: 'NEW DELHI', state: 'DELHI',
      micr: '110002087', upi: true, neft: true, rtgs: true, imps: true, data_as_of: '2026-09-01',
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
    summary: 'Creates a one-time link. Send it to the person; when they open it and allow location, you get their GPS coordinates.',
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
  { name: 'bsa', group: 'Bank', title: 'BSA (Bank Statement Analyser)' },
  { name: 'payslip', group: 'Income', title: 'Payslip Checker' },
];

export const apiErrors = [
  { status: 401, code: 'invalid_key', when: 'Key missing, wrong or replaced' },
  { status: 403, code: 'origin_not_allowed', when: 'Browser call from a website not listed under API key → Websites' },
  { status: 402, code: 'insufficient_balance', when: 'Balance too low for the call' },
  { status: 404, code: 'not_found', when: 'Nothing found, e.g. an unknown IFSC' },
  { status: 422, code: 'invalid_request', when: 'Input missing or in the wrong format' },
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
  const body = Object.fromEntries(p.fields.map((f) => [f.name, f.example]));
  const auth = '  -H "Authorization: Bearer YOUR_KEY"';
  if (p.method === 'GET') return `curl ${apiBase}${p.path.replace(/\{(\w+)\}/g, (_, k) => String(body[k]))} \\\n${auth}`;
  return `curl ${apiBase}${p.path} \\\n${auth} \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(body)}'`;
}
