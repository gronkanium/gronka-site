// GA4 traffic report. Run with `bun run stats:ga4` (Bun loads .env itself).
//
// Auth is a service-account JWT rather than OAuth: AdSense forces a browser consent flow,
// but the Analytics Data API accepts a signed assertion, so this stays non-interactive.
// The key lives outside the repo (GA4_KEY_FILE) so no gitignore rule is load-bearing.

import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';

const KEY_FILE = process.env.GA4_KEY_FILE;
const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';

if (!KEY_FILE || !PROPERTY_ID) {
  console.error('Set GA4_KEY_FILE and GA4_PROPERTY_ID in .env');
  process.exit(1);
}

const b64url = (buf) =>
  Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function accessToken() {
  const key = JSON.parse(readFileSync(KEY_FILE, 'utf8'));
  const iat = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({ iss: key.client_email, scope: SCOPE, aud: key.token_uri, exp: iat + 3600, iat }),
  );
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const jwt = `${header}.${claims}.${b64url(signer.sign(key.private_key))}`;

  const res = await fetch(key.token_uri, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`token ${res.status}: ${JSON.stringify(body)}`);
  return body.access_token;
}

async function runReport(token, spec) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
    {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify(spec),
    },
  );
  const body = await res.json();
  if (!res.ok) throw new Error(`report ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

const rowsOf = (report) =>
  (report.rows ?? []).map((r) => [
    ...(r.dimensionValues ?? []).map((v) => v.value),
    ...(r.metricValues ?? []).map((v) => v.value),
  ]);

function print(title, report, { format } = {}) {
  const cols = [
    ...(report.dimensionHeaders ?? []).map((h) => h.name),
    ...(report.metricHeaders ?? []).map((h) => h.name),
  ];
  const rows = rowsOf(report).map((r) => (format ? format(r) : r));
  console.log(`\n## ${title}`);
  if (!rows.length) {
    console.log('  (no data)');
    return;
  }
  const width = cols.map((c, i) =>
    Math.max(c.length, ...rows.map((r) => String(r[i] ?? '').length)),
  );
  const line = (cells) => '  ' + cells.map((c, i) => String(c ?? '').padEnd(width[i])).join('  ');
  console.log(line(cols));
  console.log('  ' + width.map((w) => '-'.repeat(w)).join('  '));
  for (const r of rows) console.log(line(r));
}

const days = Number(process.argv[2] ?? 90);
const dateRanges = [{ startDate: `${days}daysAgo`, endDate: 'today' }];
const secs = (v) => `${Math.round(Number(v))}s`;
const pct = (v) => `${(Number(v) * 100).toFixed(1)}%`;

const token = await accessToken();
console.log(`gronka.dev — GA4 property ${PROPERTY_ID}, last ${days} days`);

print(
  'Totals',
  await runReport(token, {
    dateRanges,
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
      { name: 'newUsers' },
      { name: 'screenPageViews' },
      { name: 'averageSessionDuration' },
      { name: 'bounceRate' },
      { name: 'engagementRate' },
    ],
  }),
  { format: (r) => [r[0], r[1], r[2], r[3], secs(r[4]), pct(r[5]), pct(r[6])] },
);

print(
  'By hostname (watch for non-canonical hosts)',
  await runReport(token, {
    dateRanges,
    dimensions: [{ name: 'hostName' }],
    metrics: [{ name: 'sessions' }, { name: 'screenPageViews' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 10,
  }),
);

print(
  'Top pages',
  await runReport(token, {
    dateRanges,
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'averageSessionDuration' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 15,
  }),
  { format: (r) => [r[0], r[1], secs(r[2])] },
);

print(
  'Acquisition',
  await runReport(token, {
    dateRanges,
    dimensions: [{ name: 'sessionDefaultChannelGroup' }, { name: 'sessionSource' }],
    metrics: [{ name: 'sessions' }, { name: 'engagementRate' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 15,
  }),
  { format: (r) => [r[0], r[1], r[2], pct(r[3])] },
);

print(
  'Geo / device',
  await runReport(token, {
    dateRanges,
    dimensions: [{ name: 'country' }, { name: 'deviceCategory' }],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 15,
  }),
);
