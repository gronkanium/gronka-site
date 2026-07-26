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

  if (request.method !== "GET" && request.method !== "HEAD") {
    return next();
  }

  const accept = request.headers.get("Accept") || "";
  const wantsMarkdown = accept.toLowerCase().includes(MARKDOWN_TYPE);

  const target = twinPath(new URL(request.url).pathname);
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
