# La Table d'Amy — Project Context

## Project Summary

We are building a fast, elegant static website for **La Table d'Amy**, Amy's meal delivery service for guests staying in gîtes in the Gers, France.

The domain will be:

```text
latabledamy.fr
```

The website should feel premium, warm, rustic, French-country, and personal. It should closely match the visual identity Amy is already using for her menus, invoices, and heating instructions.

The site should be easy for Amy to update by editing content files directly in an IDE such as VS Code. Amy is comfortable editing files and does not need a CMS for v1.

---

## Core Goals

The site should be:

- Beautiful and stylish
- Very fast
- Cheap to host
- Secure
- Easy to maintain
- Easy for Amy to update
- Built with simple static-site architecture
- Not over-engineered

The site should **not** be a complex web app.

Guiding principle:

```text
Make it feel handcrafted.
Build it like a static document.
Load it like a newspaper article.
```

---

## Recommended Stack

Use:

- Astro
- Cloudflare Pages
- Cloudflare DNS
- GitHub
- Markdown/YAML content files
- Minimal CSS
- Minimal or zero JavaScript
- Optimized SVG/WebP/AVIF assets

Avoid:

- WordPress
- VPS hosting
- Databases
- Heavy JavaScript frameworks for the public site
- Heavy UI libraries
- Page builders
- Large animation libraries
- Embedded social widgets on initial load
- Chat widgets
- Anything that makes the first page load unnecessarily heavy

Astro is preferred because it can generate static HTML and ship little or no JavaScript by default.

---

## Hosting & Deployment

Proposed hosting setup:

```text
latabledamy.fr
     │
     ▼
Cloudflare DNS
     │
     ▼
Cloudflare Pages
     │
     ▼
Static Astro website
```

Deployment workflow:

```text
Amy edits content files in VS Code
        │
        ▼
Commits/pushes changes to GitHub
        │
        ▼
Cloudflare Pages automatically rebuilds the site
        │
        ▼
latabledamy.fr updates
```

No VPS is required.

---

## Why Not WordPress?

WordPress is not the right starting point for this project because the site is small, mostly static, content-driven, and does not need a database or plugin ecosystem.

Avoiding WordPress avoids:

- Plugin maintenance
- PHP/database hosting
- WordPress security updates
- Heavy themes/page builders
- Performance overhead
- Exposed admin panel

For this project, a static site gives a better balance of elegance, speed, simplicity, and security.

---

## Design Direction

The design should closely resemble Amy's current printed/digital collateral.

Desired aesthetic:

- Warm parchment or textured cream background
- Deep forest green typography
- Muted olive details
- Sepia countryside-style illustrations
- Fine ornamental borders
- Olive branch motifs
- Elegant serif typography
- Framed menu cards
- Rustic but premium French country style
- Refined stationery/menu/invoice feel
- Handcrafted, local, warm, and personal

The site should not look like a generic restaurant template, SaaS site, or overly polished corporate site.

Use the mockup found in /mockups/mockup.png to help guide the design decisions.

---

## Site Structure

The first version should be centred around a strong single-page homepage, with deeper pages available for people who want more detail.

Proposed pages:

```text
/
  Main landing page

/menus
  Full menu details

/extras
  Fridge stock service, celebration cakes, wine pairing, special occasions

/about
  About Amy

/contact
  Enquiry/contact page
```

The homepage should include most of what a visitor needs:

1. Header
2. Hero section
3. About Amy
4. Menu preview
5. Extras preview
6. How it works
7. Contact/enquiry section
8. Footer

---

## Homepage Content

### Header

Should include:

- La Table d'Amy wordmark/logo
- Small tagline: “Meal delivery in the Gers”
- Navigation:
  - Home
  - About
  - Menus
  - Extras
  - Contact
- CTA button: “Enquire”

### Hero

Possible headline:

```text
Home-cooked meals delivered to your gîte in the Gers
```

Supporting copy:

```text
Relax and enjoy your stay — I'll prepare and deliver delicious, seasonal meals straight to your door.
```

CTA:

```text
View Menus
```

Visual style:

- Large elegant headline
- Botanical divider
- Sepia countryside/farmhouse illustration

### About Amy

A short warm paragraph introducing Amy and the service.

Tone:

- Personal
- Warm
- Reassuring
- Home-cooked rather than restaurant-formal

### Menu Preview

Show three menu tiers:

```text
Classic Menu
Signature Menu
Premium Menu
```

Each menu card should show:

- Menu title
- Price
- Global price label from settings, e.g. “per person, includes dessert”
- 2-3 sample mains
- Short summary
- Link/CTA to full menus

### Extras

Include preview blocks for:

- Fridge Stock Service
- Celebration Cakes
- Optional wine pairing later

### How It Works

Three simple steps:

```text
1. Choose
Browse the menus and extras and let me know what you need.

2. I cook & deliver
I'll prepare everything with care and deliver it to your gîte.

3. You enjoy
Heat, serve and enjoy delicious home-cooked food.
```

### Contact / Enquiry

For v1, keep this simple.

Possible enquiry fields:

- Name
- Email
- Phone/WhatsApp
- Stay location
- Preferred date
- Number of adults
- Number of children
- Menu of interest
- Message
- Dietary requirements/allergies

Avoid a full booking/payment system for v1.

---

## Content Editing Approach

Amy can edit files directly because she is comfortable with IDEs and has a data science background.

Therefore, v1 does **not** need a CMS.

The content should be structured enough that the same content can power multiple parts of the site.

For example:

```text
Menu content
   │
   ├── Homepage menu preview
   ├── Full menus page
   ├── Future printable menu/PDF
   ├── Future invoice template
   └── Future heating instruction templates
```

---

## Content Structure

Recommended v1 content structure:

```text
src/content/
  settings.yaml

  menus/
    classic.md
    signature.md
    premium.md

  desserts/
    dark-chocolate-torte.md
    pavlova-crown.md
    burnt-basque-cheesecake.md

  extras/
    fridge-stock.md
    celebration-cakes.md
```

The key modelling decision:

```text
Menus own mains.
Desserts are shared reusable options.
Menus reference desserts by slug.
```

This avoids duplicating dessert options across all three menus.

---

## Global Settings Model

`settings.yaml` should stay intentionally small.

It should only contain stable, genuinely global values that may be reused across the site.

It should **not** become a dumping ground for homepage copy, page-specific text, or detailed business logic.

Recommended v1 `settings.yaml`:

```yaml
business:
  name: "La Table d'Amy"
  tagline: "Home-cooked meals delivered to your gîte in the Gers"
  area: "Gers, France"

contact:
  email: "bonjour@latabledamy.fr"
  phone: "+33 6 12 34 56 78"

pricing:
  minimumOrder: 200
  menuPriceLabel: "per person, includes dessert"

notices:
  delivery: "Meals are delivered prepared, with simple reheating instructions."
  allergies: "Please mention any allergies or dietary requirements when enquiring."
```

The settings file should stay small enough that Amy almost never has to touch it.

---

## Menu Content Model

Menus should contain menu-specific details and main courses.

They should not repeat globally shared information such as:

- Minimum order
- “Per person, includes dessert”
- Business contact details
- General delivery note
- Allergy note

Menus should reference shared dessert options by slug.

Example menu file:

```yaml
---
title: "Signature Menu"
slug: "signature"
price: 32
active: true
featured: true
order: 2
summary: "A generous home-cooked menu for relaxed evenings with family or friends."

mains:
  - title: "Slow Roasted Crispy Skin Pork Belly"
    description: "Gratin potatoes, seasonal vegetables, cider gravy"

  - title: "Salmon en Croûte"
    description: "Buttery new potatoes, seasonal vegetables, white wine sauce"

desserts:
  - "dark-chocolate-torte"
  - "pavlova-crown"
  - "burnt-basque-cheesecake"
---
```

Menu fields:

```text
title
slug
price
active
featured
order
summary
mains
desserts
```

Mains are menu-specific and live directly inside the menu file.

---

## Dessert Content Model

Desserts are shared across menus and should live in their own content files.

Example dessert file:

```yaml
---
title: "Pavlova Crown"
slug: "pavlova-crown"
active: true
order: 6
description: "Fresh whipped cream, seasonal fruits"
supplement: 2
---
```

Dessert fields:

```text
title
slug
active
order
description
supplement
```

`supplement` is optional.

Item-specific supplements should live directly on the relevant dessert. For example, Pavlova Crown can have:

```yaml
supplement: 2
```

This keeps the supplement visible where Amy edits the dessert, while avoiding duplicated dessert definitions across menus.

Rule of thumb:

```text
If it varies by menu, keep it in the menu file.
If it applies to all menus, put it in settings.
If it applies to one dish or dessert, put it next to that item.
If it is reused across menus, split it into its own content model.
```

---

## Extras Content Model

Extras should cover things such as:

- Fridge Stock Service
- Celebration Cakes
- Wine pairing, possibly later

Possible extra file:

```yaml
---
title: "Fridge Stock Service"
slug: "fridge-stock"
active: true
featured: true
order: 1
summary: "Arrive to a well-stocked fridge with breakfast essentials, local produce, drinks and more."
---

Full page copy can go here in Markdown if needed.
```

Suggested fields:

```text
title
slug
active
featured
order
summary
```

Longer copy can be written below the frontmatter in Markdown.

---

## Suggested Technical Project Structure

```text
src/
  pages/
    index.astro
    menus.astro
    extras.astro
    about.astro
    contact.astro

  components/
    Header.astro
    Hero.astro
    AboutAmy.astro
    MenuPreview.astro
    MenuCard.astro
    ExtrasPreview.astro
    HowItWorks.astro
    EnquiryForm.astro
    Footer.astro
    Ornament.astro

  content/
    settings.yaml

    menus/
      classic.md
      signature.md
      premium.md

    desserts/
      dark-chocolate-torte.md
      pavlova-crown.md
      burnt-basque-cheesecake.md

    extras/
      fridge-stock.md
      celebration-cakes.md

  styles/
    global.css

  assets/
    paper-texture.avif
    olive-branch-ornament.webp
    olive-sprig-mark.webp
    bookend-sprig.webp
    divider.svg
    corner-ornament.svg
    countryside.avif
    farmhouse.avif
    cake.avif
    fridge.avif
```

---

## Astro Content Collections

Use Astro Content Collections to validate the structured content.

The schema should validate:

- Menus
- Desserts
- Extras
- Settings, if handled through content/config loading

Validation is useful because it prevents broken content from silently going live.

For example, if someone writes:

```yaml
price: "thirty two"
```

instead of:

```yaml
price: 32
```

the build should fail clearly.

---

## Performance Principles

The site should be blazing fast.

Rules:

- Static HTML first
- Minimal JavaScript
- No heavy UI libraries
- No page builder
- No large animation library
- No embedded Instagram/social widgets on first load
- No chat widget
- Avoid large uncompressed PNGs
- Self-host fonts
- Use only the font weights needed
- Use SVG for ornaments where possible
- Use AVIF/WebP for illustrations
- Lazy-load images below the fold
- Set image dimensions to avoid layout shift

Potential performance budget:

```text
CSS: 20-60 KB
JavaScript: ideally 0-20 KB
Fonts: 50-150 KB if self-hosted and subsetted
Images: carefully optimized, especially above the fold
```

---

## Asset Requirements

To get close to the mockup, the site needs a small, coherent asset set:

```text
1 parchment texture
2-4 olive branch ornaments
1 countryside landscape illustration
1 farmhouse/vineyard illustration
1 cake illustration
1 fridge illustration
1 optional Amy portrait illustration
4 ornamental corner SVGs
1-2 divider SVGs
```

These assets will largely determine whether the site feels premium or generic.

Prefer:

- SVG for ornaments
- AVIF/WebP for detailed illustrations
- Lazy-loaded images below the fold
- Compressed and properly sized assets

---

## Forms

For v1, keep the enquiry flow simple.

Possible options:

1. HTML form to a form service such as Formspree/Basin/Getform
2. HTML form to a Cloudflare Worker that sends email
3. Simple mailto/WhatsApp links as a temporary first version

Preferred v1:

```text
Simple enquiry form
Cloudflare Turnstile for spam protection
Email notification to Amy
No online payment yet
No booking engine yet
```

---

## Future Enhancements

Possible later features:

- Bilingual French/English pages
- Seasonal menu versions
- Partner gîte landing pages
- Testimonials
- Availability notes
- Stripe payment links or deposits
- Printable PDF menu generation
- Printable heating instruction generation
- Invoice template generation
- Simple admin/CMS if direct file editing ever becomes inconvenient

Do not build these in v1 unless needed.

---

## Open Decisions

Still to decide:

1. Exact visual identity:
   - fonts
   - colours
   - ornament style
   - illustration style

2. Asset source:
   - commission illustrations
   - use licensed stock illustrations
   - generate and refine AI-assisted illustrations
   - combine SVG ornaments with custom image work

3. Editing/deployment workflow:
   - edit directly on `main`
   - or use a preview branch before publishing

4. Contact form approach:
   - Formspree/Basin/Getform
   - Cloudflare Worker
   - mailto/WhatsApp first

5. Language strategy:
   - English only initially
   - French + English from launch

6. Whether the full menu page should be one page or split by menu tier.

---

## Recommended Next Steps

### Step 1 — Create the Astro starter project

Set up:

```text
Astro
GitHub repo
basic file structure
content collections
schema validation
initial pages
```

### Step 2 — Add starter content files

Create:

```text
src/content/settings.yaml
src/content/menus/classic.md
src/content/menus/signature.md
src/content/menus/premium.md
src/content/desserts/*.md
src/content/extras/fridge-stock.md
src/content/extras/celebration-cakes.md
```

### Step 3 — Build a plain working version

Before spending time on ornamentation, build a clean unstyled or lightly styled version with real content:

```text
Home
Menus
Extras
About
Contact
```

The goal is to prove that the content flow works.

### Step 4 — Add the visual system

Create the design primitives:

```text
colours
font choices
spacing scale
button styles
card styles
borders
dividers
ornaments
background texture
```

### Step 5 — Build the homepage to match the mockup

Implement:

```text
header
hero
about section
menu cards
extras section
how it works
contact/enquiry section
footer
```

### Step 6 — Optimize assets and performance

Run Lighthouse or similar and check:

```text
image sizes
font loading
CSS size
JavaScript size
mobile performance
accessibility
SEO basics
```

### Step 7 — Deploy to Cloudflare Pages

Connect GitHub repo to Cloudflare Pages and deploy a preview.

Then connect:

```text
latabledamy.fr
```

### Step 8 — Add the contact form

Start simple, then improve if needed.

### Step 9 — Review on real phones

The mobile version matters a lot. The design should feel like a refined menu card, not a shrunken poster.

---

## Instructions for Codex

When working on this project, Codex should:

1. Read this file before making changes.
2. Preserve the agreed architecture.
3. Keep the site static and fast.
4. Avoid unnecessary dependencies.
5. Avoid adding heavy JavaScript.
6. Use structured content files rather than hard-coding reusable menu content.
7. Keep `settings.yaml` small and global.
8. Keep desserts as reusable content referenced by menus.
9. Prefer simple, readable code over clever abstractions.
10. Ask before introducing new libraries, services, or architectural changes.

First implementation goal:

```text
Create the Astro project structure, content collections, starter content files, and a plain working homepage/menus page using real content.
```
