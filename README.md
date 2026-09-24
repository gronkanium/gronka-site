# gronka-site

The marketing + docs site for [gronka](https://github.com/thedorekaczynski/gronka), a
free, open-source Discord bot that downloads media from 20+ platforms and converts it to
GIFs. Built with [Jekyll](https://jekyllrb.com/) and served at
**[gronka.dev](https://gronka.dev)**.

## Structure

| Path | What it is |
| --- | --- |
| `index.md` | Home page (overview + quick start) |
| `privacy.md` / `terms.md` | Standalone pages |
| `_data/commands.yml` | Source of truth for the command reference (`/download`, `/convert`, `/optimize`, `/info`) |
| `_data/navigation.yml` | Nav links |
| `_includes/` / `_layouts/` / `_sass/` | Templates and styles |
| `assets/` | Images (incl. the OG image) and static assets |
| `_config.yml` | Jekyll config, site title/description, SEO metadata |

Content is authored in Markdown; the command reference is data-driven from
`_data/commands.yml`, so update that file (not the HTML) when the bot's commands change.

## Local development

Requires Ruby + Bundler (for Jekyll).

```bash
bundle install
npm run jekyll:serve   # http://localhost:4000 with live reload
npm run jekyll:build   # production build into _site/
```

## Deployment

`_site/` is the built output. The site is published from `main` (Cloudflare Pages). Push to
`main` to deploy; no manual build step is needed in CI.

## License

MIT
