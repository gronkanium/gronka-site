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

    body = File.read(source_path).sub(FRONT_MATTER, '').strip

    begin
      # page data has to be in scope so a body referencing page.* renders the same
      # way it does in the HTML build.
      body = Liquid::Template
             .parse(body)
             .render(payload.merge('page' => page.to_liquid))
    rescue StandardError => e
      Jekyll.logger.warn 'MarkdownTwins:', "Liquid failed for #{page.path}: #{e.message}"
      next
    end

    # Command pages carry their <h1> in the layout rather than the body, so without
    # this the twin would open mid-sentence with no title.
    title = page.data['title']
    body = "# #{title}\n\n#{body}" if title && !body.start_with?('#')

    File.write(destination.sub(/\.html\z/, '.md'), "#{body}\n")
    written += 1
  end

  Jekyll.logger.info 'MarkdownTwins:', "wrote #{written} markdown twins"
end
