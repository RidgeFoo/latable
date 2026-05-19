# Deployment

## Cloudflare Pages

Use Cloudflare Pages to deploy the static Astro build.

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22`

The site is static and does not require a server, database, CMS, or runtime secrets for v1.

## Content Updates

Amy can update content in `src/content/` and push changes to GitHub. Cloudflare Pages should rebuild automatically from the default branch.
