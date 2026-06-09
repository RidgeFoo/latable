# Repository Guidelines

## Project Structure & Module Organization

This repository currently contains planning and design assets for the La Table d'Amy static website.

- `PROJECT_CONTEXT.md`: product goals, preferred stack, site structure, design direction, and deployment notes.
- `TODO.md`: task tracking placeholder.
- `mockups/mockup.png`: visual reference for the warm, rustic French-country design.

When implementation begins, keep the site simple and static. Prefer `src/pages/` for routes, `src/components/` for reusable markup, `src/content/` or `src/data/` for editable Markdown/YAML content, and `public/` for optimized images, SVGs, and fonts.

## Build, Test, and Development Commands

No package manifest exists yet, so there are no runnable commands. After the Astro scaffold is added, keep this section aligned with `package.json`.

Key commands:

- `npm install`: install dependencies.
- `npm run dev`: run the local Astro dev server.
- `npm run build`: generate the static site for Cloudflare Pages.
- `npm run preview`: preview the production build locally.
- `npm test`: build the site, start Astro preview, and run Playwright checks.

## Local Server Process Handling

When starting long-running local servers such as `npm run dev` or `npm run preview`, run them in an interactive TTY session so they can be stopped gracefully after checks are complete.

Preferred workflow:
- Start preview with a TTY-enabled tool/session.
- Run Playwright or browser checks against the preview URL.
- Stop the server by sending `Ctrl-C` to the running session.
- Do not use `kill`, `pkill`, or port-based process termination unless graceful shutdown fails.

Example intent:

```text
Start `npm run preview -- --host 127.0.0.1 --port 4321` in a TTY session, then stop it with Ctrl-C after screenshots/tests are complete.
```

## Coding Style & Naming Conventions

Use concise, content-first HTML/Astro components and minimal JavaScript. Keep CSS lightweight; avoid heavy UI libraries and animation packages. Use 2-space indentation for markup, styles, JSON, and YAML.

Name Astro components in `PascalCase`, such as `MenuPreview.astro`. Use kebab-case for routes and assets, such as `wine-pairing.webp`. Content files should use clear names Amy can recognize, such as `menus.yaml` or `extras.md`.

## Testing Guidelines

Playwright is configured in `tests/site.spec.ts` with desktop and mobile Chromium projects. Run `npm test` before submitting changes; it builds the static site and tests the production preview.

Validate content changes by checking the affected page locally, optimizing images, adding accessible text, and keeping pages usable without client-side JavaScript.

For visual or layout changes, check representative viewport widths rather than only one browser size. Use these targets:

- `360 x 800`
- `393 x 851`
- `430 x 932`
- `768 x 1024`
- `1024 x 768`
- `1280 x 900`
- `1440 x 1100`
- `1920 x 1080`

Treat `1440px` desktop as the main mockup fidelity target. Also verify there is no horizontal overflow, the header wordmark remains centered, cards and forms stack cleanly, and mobile form controls remain usable.

## Commit & Pull Request Guidelines

This directory is not currently initialized as a Git repository, so no local commit history conventions are available. Use short, imperative commit messages, for example `Add homepage menu preview` or `Update extras content`.

Pull requests should include a brief summary, the pages or content files changed, screenshots for visual changes, and any build or preview command results. Link related tasks or notes from `TODO.md` when applicable.

## Security & Configuration Tips

Do not add databases, admin panels, embedded widgets, or secrets for v1. Keep deployment static through Cloudflare Pages. Store public configuration in versioned files, and keep private credentials out of the repository.
