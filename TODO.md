# TODO

## First Implementation Pass

- [x] Scaffold a minimal Astro project in this repository.
- [x] Add basic npm scripts for development, production build, and preview.
- [x] Create the initial content structure:
  - [x] `src/content/settings.yaml`
  - [x] `src/content/menus/classic.md`
  - [x] `src/content/menus/signature.md`
  - [x] `src/content/menus/premium.md`
  - [x] `src/content/desserts/`
  - [x] `src/content/extras/fridge-stock.md`
  - [x] `src/content/extras/celebration-cakes.md`
- [x] Add starter content that follows the models in `PROJECT_CONTEXT.md`.
- [x] Build a plain homepage that reads from content files.
- [x] Show the main homepage sections: hero, about, menu preview, extras preview, how it works, contact, and footer.
- [x] Add a simple `/menus` page that resolves menu dessert references by slug.
- [x] Add simple `/extras`, `/about`, and `/contact` pages.

## Design Pass

- [x] Review `mockups/mockup.png` and extract the main visual system: colors, typography, borders, spacing, and illustration style.
- [x] Add global CSS for the warm parchment, deep green, olive, and sepia design direction.
- [x] Style homepage sections to feel like refined stationery rather than a generic restaurant template.
- [x] Optimize any images or illustrations as SVG, WebP, or AVIF before adding them to `public/`.

## Quality & Deployment

- [x] Run the production build and fix any Astro/content errors.
- [x] Check pages locally on desktop and mobile widths.
- [x] Verify the site remains usable with minimal or no client-side JavaScript.
- [x] Document final Cloudflare Pages build settings.
- [x] Add pull request checklist items for screenshots and build results once GitHub is set up.
