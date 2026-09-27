# Potts Plumbing Astro Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current hand-authored four-page site with a polished, accessible Astro static site for Potts Plumbing.

**Architecture:** Astro prerenders four pages to static HTML. Shared layouts and components own the page shell, navigation, contact links, and repeated service/area UI. CSS provides the visual system; native disclosure elements handle service expansion. Minimal client JavaScript is limited to mobile navigation if needed. A build-time image script creates faithful cropped/transparent logo derivatives from the user-provided raster sources.

**Tech Stack:** Astro 7.3.5, Node.js 22.12+, modern CSS, small vanilla JavaScript only where necessary, Sharp 0.35.5 for deterministic logo processing, and Node’s built-in test runner for generated-site checks.

---

## Prerequisite: Supported Node.js

The approved build environment is Node.js 24, recorded in `.nvmrc`; `package.json` requires Node.js 22.12 or newer. Astro 7.3.5 supports this runtime. Keep the deployment builder on Node.js 22.12+ and do not change the system runtime.

## Task 1: Create the Astro build and static-output test harness

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.nvmrc`
- Create: `tests/site-output.test.mjs`
- Create: `src/pages/index.astro`
- Create: `src/pages/services.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/contact.astro`

**Step 1: Write failing output checks**

Create Node tests that require `dist/index.html`, `dist/services/index.html`, `dist/about/index.html`, and `dist/contact/index.html`, and check that each exists after a build.

**Step 2: Run the tests and verify they fail**

Run: `npm test`
Expected: FAIL because the Astro output and test script do not exist yet.

**Step 3: Add the minimum Astro toolchain**

Add Astro 7.3.5, Sharp 0.35.5, build/dev/preview/test/logo-processing scripts, `output: 'static'`, the Node engine requirement, and a Node 24 version file. Create minimal page placeholders sufficient to exercise static routing. Install dependencies only after the approved Node runtime is active.

**Step 4: Build and run the tests**

Run: `npm run build && npm test`
Expected: PASS with all four static routes emitted under `dist/`.

## Task 2: Create faithful transparent logo assets

**Files:**
- Create: `scripts/process-logos.mjs`
- Create: `tests/logo-assets.test.mjs`
- Create: `public/images/source/image0.png`
- Create: `public/images/source/image1.jpeg`
- Create: `public/images/potts-mark.png`
- Create: `public/images/potts-wordmark.png`

**Step 1: Write failing image-output checks**

Test that both display derivatives exist, have transparency, have trimmed dimensions, and retain the original source files. Record source hashes in the test before asset processing.

**Step 2: Run the logo tests and verify they fail**

Run: `npm test -- --test-name-pattern=logo`
Expected: FAIL because derivatives and processing script do not yet exist.

**Step 3: Implement deterministic white-background removal and trim**

Use Sharp to process the provided logo files only. Preserve their colors, shapes, lettering, phone number, and aspect ratio. Do not redraw or regenerate marks. Keep originals unchanged and write display copies into `public/images/`.

**Step 4: Generate and visually inspect both derivatives**

Run: `npm run assets:logos`
Expected: Each display image has a transparent background, tight bounds around all artwork, and no clipped/haloed edges; originals have unchanged hashes.

## Task 3: Build the shared site shell and visual system

**Files:**
- Create: `src/layouts/SiteLayout.astro`
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/SiteFooter.astro`
- Create: `src/components/Icon.astro`
- Create: `src/styles/global.css`
- Create: `src/scripts/mobile-navigation.js` only if the header needs client interaction
- Modify: all four `src/pages/*.astro` files
- Modify: `tests/site-output.test.mjs`

**Step 1: Add failing shared-shell checks**

Test that all routes render a skip link, primary navigation, footer, visible phone number, email link, correct page-current state, and a page-specific `<title>` and description.

**Step 2: Run the site-output tests and verify they fail**

Run: `npm test`
Expected: FAIL on shared shell and metadata assertions.

**Step 3: Implement the shared components and design tokens**

Create reusable, readable components and global styles for the approved white/navy/light-blue field-guide system, large type, content widths, dividers, section rhythm, responsive grid, visible focus, skip link, and reduced motion. Keep email visually prominent and the phone plainly visible on every page. Use CSS/inline SVG for icons; do not use emoji, Unicode icon arrows, or duplicate logo cards.

**Step 4: Run build and output tests**

Run: `npm run build && npm test`
Expected: PASS for all generated routes, shell, contact links, and metadata.

## Task 4: Implement Home and Services content

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/services.astro`
- Create: `src/components/ServiceExplorer.astro`
- Create: `src/data/services.js`
- Modify: `tests/site-output.test.mjs`

**Step 1: Add failing home/service content assertions**

Test the requested North Georgia trust headline, the five service categories, their distinct examples, both service commitments, and all 11 requested towns. Also test that no review/testimonial section, business hours, unsupported qualifications, or claim that commercial work is unavailable appears.

**Step 2: Run the tests and verify the content checks fail**

Run: `npm test`
Expected: FAIL until the new page content is implemented.

**Step 3: Implement the service explorer and separated page sections**

Build native keyboard-operable service disclosures whose headings, teaser copy, details, and links remain clear at mobile and desktop widths. Add the service overview page with useful job examples and a broad “Other home projects” invitation. Keep the service-area towns in useful page content; do not create thin town landing pages.

**Step 4: Build and verify service content**

Run: `npm run build && npm test`
Expected: PASS with all requested service categories, towns, and commitments present in generated HTML.

## Task 5: Implement About and Contact pages

**Files:**
- Modify: `src/pages/about.astro`
- Modify: `src/pages/contact.astro`
- Modify: `tests/site-output.test.mjs`

**Step 1: Add failing about/contact checks**

Test that About introduces Garrett and Potts Plumbing without unverified claims, and that Contact contains a prominent `mailto:` action, an accurate plain-language mail-app note, and a `tel:+17706853901` link.

**Step 2: Run the tests and verify the checks fail**

Run: `npm test`
Expected: FAIL until the two page implementations are complete.

**Step 3: Implement the grounded business and contact content**

Use factual copy only. Do not add a web form without an actual submission backend. Do not add hours, reviews, address, social links, or response-time promises.

**Step 4: Build and verify the two pages**

Run: `npm run build && npm test`
Expected: PASS for About content and Contact mail/phone behavior.

## Task 6: Complete SEO metadata and crawl configuration

**Files:**
- Create: `public/robots.txt`
- Modify: `src/layouts/SiteLayout.astro`
- Modify: all four `src/pages/*.astro` files
- Modify: `tests/site-output.test.mjs`
- Delete: obsolete root-level `index.html`, `services.html`, `about.html`, `contact.html`, `styles.css`, and `script.js` after the Astro pages are verified
- Move: existing `robots.txt` into `public/robots.txt`

**Step 1: Add failing SEO and stale-file checks**

Test unique titles/descriptions, one meaningful page-level heading, crawlable content, no accidental `noindex`, no emoji/Unicode arrow characters, no placeholder origin, and no stale legacy page source at the project root.

**Step 2: Run tests and verify the checks fail**

Run: `npm test`
Expected: FAIL on incomplete metadata and legacy files.

**Step 3: Add page metadata and retire the old site source**

Use unique, accurate titles and descriptions. Keep domain-specific canonical URLs, absolute sitemap entries, and address-dependent `LocalBusiness` rich-result data unset until launch details are confirmed. Preserve crawl access in `robots.txt`. Remove old root pages/scripts only after the build routes and output tests pass.

**Step 4: Rebuild and run the complete output test suite**

Run: `npm run build && npm test`
Expected: PASS with only the new Astro site sources and clean static output.

## Task 7: Review responsive, keyboard, and production output

**Files:**
- Review: all `src/pages/*.astro`, `src/components/*.astro`, `src/styles/global.css`, `scripts/process-logos.mjs`, and generated `dist/`
- Modify: tests and styles only to correct issues found

**Step 1: Run static checks**

Run: `npm run build && npm test`
Expected: PASS with no Astro build errors, broken internal routes, or failed content assertions.

**Step 2: Preview and inspect the complete site**

Run: `npm run preview -- --host 127.0.0.1`
Expected: Home, Services, About, and Contact return successfully. Inspect wide and narrow layouts, service disclosures, logo crop/alpha, direct email and phone actions, and section separation.

**Step 3: Check keyboard and reduced-motion behavior**

Use keyboard-only navigation to verify skip link, menu, disclosure controls, link focus, and page-current state. Verify reduced-motion styles avoid required animation.

**Step 4: Report launch dependencies**

List the items that still require Garrett or owner input: confirmed service availability and towns, pricing explanation, address/service-area business representation, domain, host, Search Console, and any future genuine reviews or photos.

## Verification commands

```bash
node --version
npm run assets:logos
npm run build
npm test
npm run preview -- --host 127.0.0.1
```

`node --version` must report `v22.12.0` or newer for the current Astro major.
