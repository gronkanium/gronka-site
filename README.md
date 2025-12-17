# Gronka Documentation Site

This is the Jekyll documentation site for the Gronka Discord bot, deployed on Cloudflare Pages.

## Setup

1. **Install Ruby dependencies:**
   ```bash
   bundle install
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file with:
   ```env
   CLOUDFLARE_API_TOKEN=your_api_token_here
   CLOUDFLARE_ACCOUNT_ID=your_account_id_here
   CLOUDFLARE_KV_NAMESPACE_ID=your_kv_namespace_id_here
   ```

## Development

**Build the site:**
```bash
npm run jekyll:build
```

**Serve locally:**
```bash
npm run jekyll:serve
```

**Fetch stats from Cloudflare KV:**
```bash
npm run kv:fetch-stats
```

## Cloudflare Pages Deployment

This site is automatically deployed via Cloudflare Pages when changes are pushed to the repository.

### Build Configuration

- **Build command:** `npm run kv:fetch-stats && bundle install && bundle exec jekyll build`
- **Build output directory:** `_site`
- **Root directory:** `/` (root of repository)

### Environment Variables

The following environment variables must be configured in Cloudflare Pages:

- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with KV read permissions
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
- `CLOUDFLARE_KV_NAMESPACE_ID` - KV namespace ID for stats

### Stats Synchronization

Stats are automatically fetched from Cloudflare KV during the build process:

1. The bot server writes stats to Cloudflare KV when they change
2. During Cloudflare Pages build, `kv:fetch-stats` runs first
3. Stats are fetched from KV and written to `_data/stats.json`
4. Jekyll includes the stats in the site footer

The `_data/stats.json` file is generated during build and should not be committed to the repository.

## Project Structure

- `_posts/` - Blog posts
- `_layouts/` - Jekyll layouts
- `_includes/` - Jekyll includes/partials
- `_sass/` - Sass stylesheets
- `_data/` - Jekyll data files (commands.yml, navigation.yml)
- `_docs/` - Documentation collection
- `assets/` - CSS and image assets
- `blog/` - Blog index page
- `functions/` - Cloudflare Pages Functions (API endpoints)
- `scripts/` - Build scripts (fetch-stats-from-kv.js)
