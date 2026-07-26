# Markdown content negotiation, done in the build instead of on Cloudflare's Pro plan.
#
# For every markdown-authored page, write a .md twin alongside the generated HTML
# (_site/commands/download/index.html -> _site/commands/download/index.md).
# functions/_middleware.js serves the twin when a request carries
# `Accept: text/markdown`.
#
# The twin is the authored source with front matter stripped and Liquid rendered --
# not an HTML-to-markdown conversion. These pages are written in markdown to begin
# with, so this hands an agent the real thing rather than a lossy round trip.
#
# Set `markdown_twin: false` in a page's front matter to opt it out.

require 'liquid'

FRONT_MATTER = /\A---\s*\n.*?\n---\s*\n/m

Jekyll::Hooks.register :site, :post_write do |site|
  payload = site.site_payload
  written = 0

  site.pages.each do |page|
    next unless page.output_ext == '.html'
    next unless %w[.md .markdown].include?(page.extname)
    next if page.data['markdown_twin'] == false

    destination = page.destination(site.dest)
    next unless destination.end_with?('.html')

    source_path = site.in_source_dir(page.path)
    next unless File.exist?(source_path)

    # A twin is a nice-to-have; never let one take the build down with it.
    begin
      # Read and write UTF-8 explicitly rather than inheriting the default external
      # encoding. Cloudflare's build image has no locale set, so that default is
      # US-ASCII there, and every em dash in these pages raises "invalid byte
      # sequence" the moment a regex touches the string.
      body = File.read(source_path, encoding: 'UTF-8').sub(FRONT_MATTER, '').strip

      # page data has to be in scope so a body referencing page.* renders the same
      # way it does in the HTML build.
      body = Liquid::Template
             .parse(body)
             .render(payload.merge('page' => page.to_liquid))

      # Command pages carry their <h1> in the layout rather than the body, so without
      # this the twin would open mid-sentence with no title.
      title = page.data['title']
      body = "# #{title}\n\n#{body}" if title && !body.start_with?('#')

      File.write(destination.sub(/\.html\z/, '.md'), "#{body}\n", encoding: 'UTF-8')
      written += 1
    rescue StandardError => e
      Jekyll.logger.warn 'MarkdownTwins:', "skipped #{page.path}: #{e.class}: #{e.message}"
    end
  end

  Jekyll.logger.info 'MarkdownTwins:', "wrote #{written} markdown twins"
end
