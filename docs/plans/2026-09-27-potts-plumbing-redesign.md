# Potts Plumbing Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild Potts Plumbing as a professional, responsive four-page static website focused on residential service across North Georgia.

**Architecture:** Build a simple, responsive four-page site with the supplied Potts Plumbing logos, semantic HTML, restrained white/navy/light-blue styling, and minimal vanilla JavaScript. Email is the primary inquiry path; keep the phone number as a secondary option on the Contact page. Use native expandable service disclosures on the home page.

**Tech Stack:** HTML, CSS, vanilla JavaScript, supplied logo assets, native HTML disclosure elements.

---

### Task 1: Replace the shared visual system

**Files:**
- Modify: `styles.css`
- Modify: `script.js`

**Steps:**
1. Replace the existing component styles with a coherent, larger type scale, white/navy/light-blue palette, spacing, focus, responsive system, and consistent section dividers and content panels grounded in the supplied logos.
2. Add shared responsive header, navigation, footer, buttons, service layouts, email-first actions, and mobile navigation.
3. Implement accessible mobile navigation with Escape handling, click-away closing, `aria-expanded`, and reduced-motion support.
4. Remove old booking, Google Apps Script, and EmailJS behavior; retain only interactions used by the new pages.

### Task 2: Build the new home page

**Files:**
- Modify: `index.html`

**Steps:**
1. Replace old markup with the new shared shell and prominent supplied logo artwork; create no name/initial graphics.
2. Add “Trusted by North Georgia,” email-first calls to action, North Georgia service context, service-area details, and an owner introduction.
3. Use accessible native expandable home-service panels with separated headings, descriptions, and detail lists, including a catch-all panel for less-common residential projects; add clear-pricing messaging and a best-in-class-service section.
4. Do not include a reviews section.
5. Make email the primary contact action and keep the phone number out of repeated banners and CTAs.
6. Add page-specific title, description, social metadata, and only accurate structured business data.
7. Use relevant residential plumbing and North Georgia terms naturally in each page's title, visible heading, description, and crawlable copy.

### Task 3: Build service and about pages

**Files:**
- Modify: `services.html`
- Modify: `about.html`

**Steps:**
1. Build the Services page around residential plumbing categories from the prior site, using measured copy that avoids unconfirmed availability guarantees.
2. Build the About page around Garrett and the North Georgia business, avoiding unsupported claims about company history, staff, licenses, guarantees, or years of experience.
3. Use the shared navigation/footer and email-first actions on both pages.
4. Add unique page titles and descriptions.
5. Use consistent card, divider, and spacing patterns across service, about, and contact content; avoid keyword stuffing and unverified location claims.

### Task 4: Build contact and retire obsolete integrations

**Files:**
- Modify: `contact.html`
- Modify: `robots.txt`
- Delete: `sitemap.xml` until the final canonical domain is confirmed
- Delete: `Code.gs`

**Steps:**
1. Replace old calendar and booking flow with a prominent email action and a subdued phone alternative; explain the email-client handoff plainly.
2. Remove references to old business hours, unverified address, EmailJS, Google booking, and placeholder social links.
3. Allow crawling in `robots.txt`; defer a new sitemap until the final domain is confirmed.
4. Delete the old Google Apps Script booking backend because the replacement has no booking integration.

### Task 5: Review the finished pages

**Files:**
- Review: all four HTML pages, `styles.css`, and `script.js`

**Steps:**
1. Inspect all shared navigation, internal links, contact links, and image paths for consistency.
2. Review responsive behavior, keyboard navigation, focus states, semantic structure, and reduced-motion behavior using available local tools.
3. Check for stale claims, placeholder links, and old integration credentials.
4. Record the remaining business details Garrett must confirm before publication.

## Launch details to obtain

- Confirm that the listed North Georgia towns and residential services match Garrett’s availability.
- Final service list and urgent-request availability, if these are to be advertised.
- Business location/address preference, final domain, hosting, and social URLs.
- Verified Google Business Profile and Google Search Console access; local profile accuracy, genuine reviews, and authoritative local citations support off-site visibility.
