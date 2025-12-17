# Jekyll Site Migration Notes

This repository was separated from the main gronka bot repository.

## What Changed

- All Jekyll site files moved from `gronka-media` to this repository
- Stats sync now uses Cloudflare KV (no changes needed to bot repo)
- Cloudflare Pages needs to be updated to point to this repository

## Next Steps

1. **Push this repository to GitHub/GitLab:**
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Update Cloudflare Pages:**
   - Go to Cloudflare Dashboard → Workers & Pages → Your Project
   - Update source repository to point to this new repository
   - Verify build command: `npm run kv:fetch-stats && bundle install && bundle exec jekyll build`
   - Verify build output directory: `_site`
   - Ensure environment variables are set:
     - `CLOUDFLARE_API_TOKEN`
     - `CLOUDFLARE_ACCOUNT_ID`
     - `CLOUDFLARE_KV_NAMESPACE_ID`

3. **Test the build:**
   ```bash
   npm install
   bundle install
   npm run kv:fetch-stats  # Requires env vars
   npm run jekyll:build
   ```

## Stats Sync

The bot repository (`gronka-media`) still syncs stats to Cloudflare KV using `sync-stats-to-kv.js`. This script runs in the bot repo and writes to KV.

This repository fetches stats from KV during Cloudflare Pages builds using `fetch-stats-from-kv.js`.

No changes needed to the stats sync workflow - it continues to work as before.
