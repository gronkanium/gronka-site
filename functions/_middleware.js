// Markdown content negotiation for agents.
//
// Cloudflare's built-in "Markdown for Agents" is a Pro-plan feature, so this does the
// same job on the free tier. _plugins/markdown_twins.rb writes a .md twin next to every
// generated page at build time; this middleware serves the twin when a request asks for
// `Accept: text/markdown`, and otherwise gets out of the way.
//
// The twins are the pages' authored markdown source, so an agent asking for markdown
// gets the real document rather than an HTML-to-markdown conversion of it.

const MARKDOWN_TYPE = "text/markdown";

// Cloudflare gives every Pages project a permanent *.pages.dev alias, and it serves the
// same build as the custom domain. Analytics caught real traffic (and Google/Bing
// referrals) landing on it, which splits ranking signal across two hostnames for
// identical content. jekyll-seo-tag already emits a gronka.dev canonical, but a canonical
// is a hint -- the 301 is the part crawlers must honour.
//
// Only the production alias is redirected. Preview deployments are <hash>.gronka-site.pages.dev
// and have to keep serving themselves, or there is no way to test a branch before it ships.
const CANONICAL_HOST = "gronka.dev";
const ALIAS_HOSTS = new Set(["gronka-site.pages.dev", "www.gronka.dev"]);

/** Path of the .md twin for a page request, or null if this isn't a page request. */
function twinPath(pathname) {
  if (pathname.endsWith("/")) {
    return `${pathname}index.md`;
  }
  if (pathname.endsWith(".html")) {
    return pathname.replace(/\.html$/, ".md");
  }
  // Anything with another extension is an asset (.css, .png, .txt ...). Extensionless
  // paths are left alone too: Pages redirects those to the trailing-slash form, and
  // negotiating on the redirect rather than its target would just lose the header.
  return null;
}

export async function onRequest(context) {
  const { request, next, env } = context;

  // Ahead of the markdown negotiation below, and deliberately not limited to page GETs:
  // an alias must not serve assets or accept writes either.
  const url = new URL(request.url);
  if (ALIAS_HOSTS.has(url.hostname)) {
    url.hostname = CANONICAL_HOST;
    return Response.redirect(url.toString(), 301);
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return next();
  }

  const accept = request.headers.get("Accept") || "";
  const wantsMarkdown = accept.toLowerCase().includes(MARKDOWN_TYPE);

  const target = twinPath(url.pathname);
  if (!target) {
    return next();
  }

  // Every negotiable URL must advertise that it varies, whether or not this particular
  // request asked for markdown -- otherwise a cache could hand the HTML to an agent
  // asking for markdown, or the reverse.
  const withVary = (response) => {
    const out = new Response(response.body, response);
    out.headers.append("Vary", "Accept");
    return out;
  };

  if (!wantsMarkdown) {
    return withVary(await next());
  }

  const twinUrl = new URL(request.url);
  twinUrl.pathname = target;

  const twin = await env.ASSETS.fetch(new Request(twinUrl, { method: "GET" }));
  if (!twin.ok) {
    // No twin for this page (opted out, or a Function-rendered route). Serving the HTML
    // is a better answer than a 404.
    return withVary(await next());
  }

  const out = new Response(twin.body, twin);
  out.headers.set("Content-Type", `${MARKDOWN_TYPE}; charset=utf-8`);
  out.headers.append("Vary", "Accept");
  return out;
}
