// Microsoft Clarity behaviour report. Run with `bun run stats:clarity` (Bun loads .env).
//
// Two hard limits from Clarity's side, both worth knowing before you widen this:
//   - the export API only reaches back 3 days, so this is a "what is happening now"
//     view and GA4 stays the source of truth for history
//   - 10 requests per project per day, shared across everything using the token, which
//     is why one call pulls every metric rather than one call per breakdown

const TOKEN = process.env.CLARITY_API_TOKEN;
const ENDPOINT = 'https://www.clarity.ms/export-data/api/v1/project-live-insights';

if (!TOKEN) {
  console.error('Set CLARITY_API_TOKEN in .env');
  process.exit(1);
}

const days = Math.min(Number(process.argv[2] ?? 3), 3);

const res = await fetch(`${ENDPOINT}?numOfDays=${days}`, {
  headers: { authorization: `Bearer ${TOKEN}` },
});

if (!res.ok) {
  console.error(`clarity ${res.status}: ${await res.text()}`);
  if (res.status === 429) console.error('Daily quota is 10 requests — try again tomorrow.');
  process.exit(1);
}

const payload = await res.json();
const byName = Object.fromEntries(payload.map((m) => [m.metricName, m.information]));

console.log(`gronka.dev — Clarity, last ${days} days\n`);

const traffic = byName.Traffic?.[0];
if (traffic) {
  const real = Number(traffic.totalSessionCount) - Number(traffic.totalBotSessionCount);
  console.log('## Traffic');
  console.log(`  sessions        ${traffic.totalSessionCount} (${traffic.totalBotSessionCount} bot, ~${real} real)`);
  console.log(`  distinct users  ${traffic.distinctUserCount}`);
  console.log(`  pages/session   ${Number(traffic.pagesPerSessionPercentage).toFixed(2)}`);
}

const engagement = byName.EngagementTime?.[0];
if (engagement) {
  console.log(`  active time     ${engagement.activeTime}s of ${engagement.totalTime}s total`);
}
if (byName.ScrollDepth?.[0]) {
  console.log(`  avg scroll      ${byName.ScrollDepth[0].averageScrollDepth}%`);
}

// The friction metrics share a shape: percentage of sessions where the signal fired.
const FRICTION = [
  'RageClickCount',
  'DeadClickCount',
  'ExcessiveScroll',
  'QuickbackClick',
  'ScriptErrorCount',
  'ErrorClickCount',
];
console.log('\n## Friction (% of sessions)');
for (const name of FRICTION) {
  const info = byName[name]?.[0];
  if (!info) continue;
  const pct = Number(info.sessionsWithMetricPercentage);
  console.log(`  ${name.padEnd(18)} ${pct.toFixed(1)}%${pct > 0 ? `  (${info.subTotal} events)` : ''}`);
}

const BREAKDOWNS = ['PopularPages', 'ReferrerUrl', 'Country', 'Device', 'OS', 'Browser', 'PageTitle'];
for (const name of BREAKDOWNS) {
  const info = byName[name];
  if (!info?.length) continue;
  console.log(`\n## ${name}`);
  for (const row of info) {
    const label = row.name ?? row.url ?? '(direct / unknown)';
    console.log(`  ${String(row.sessionsCount ?? row.visitsCount).padStart(4)}  ${label}`);
  }
}
