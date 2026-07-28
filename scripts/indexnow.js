// IndexNow ping for Bing/Yandex. Run with `bun run indexnow` (all sitemap URLs), or
// `bun run indexnow https://gronka.dev/commands/download/ ...` to submit just those.
//
// Two things to know before changing this:
//   - the URL list comes from the LIVE sitemap, not `_site/sitemap.xml`. A local
//     `jekyll serve` build writes localhost:4444 URLs into that file, and submitting
//     those gets the whole batch rejected as off-host (422).
//   - the key is public by design: IndexNow verifies ownership by fetching KEY.txt from
//     the site root, so the file at the repo root is the source of truth. Rotating means
//     renaming that file and updating KEY here.

const KEY = 'fa22fa300f86416998114482a57e0d3f';
const HOST = 'gronka.dev';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const keyRes = await fetch(KEY_LOCATION);
if (!keyRes.ok) {
  console.error(`key file ${KEY_LOCATION} returned ${keyRes.status} — IndexNow will reject with 403`);
  process.exit(1);
}

let urlList = process.argv.slice(2);

if (urlList.length === 0) {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) {
    console.error(`sitemap ${res.status}: could not read https://${HOST}/sitemap.xml`);
    process.exit(1);
  }
  urlList = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const offHost = urlList.filter((u) => !u.startsWith(`https://${HOST}/`));
if (offHost.length) {
  console.error(`refusing to submit URLs outside https://${HOST}/:\n  ${offHost.join('\n  ')}`);
  process.exit(1);
}

if (urlList.length === 0) {
  console.error('nothing to submit');
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

if (!res.ok) {
  console.error(`indexnow ${res.status}: ${await res.text()}`);
  if (res.status === 422) console.error('URLs did not match the host, or the key file does not match KEY.');
  if (res.status === 429) console.error('Rate limited — submit fewer URLs, less often.');
  process.exit(1);
}

// 202 means accepted with key validation still pending; both are success.
console.log(`indexnow ${res.status} — submitted ${urlList.length} URLs`);
for (const url of urlList) console.log(`  ${url}`);
console.log('\nQueued for crawl consideration; no status endpoint. Check Bing Webmaster Tools.');
