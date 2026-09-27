# Potts Plumbing Astro Website Redesign

**Status:** Approved design, 2026-09-27

## Goal

Rebuild the Potts Plumbing website from the ground up as a polished, mobile-first, accessible static website. Make its home-plumbing services, North Georgia coverage, business standards, and contact paths clear without relying on stock photography, generated imagery, fabricated reviews, or unverified business claims.

## Audience and business facts

- Audience: homeowners looking for a plumber in North Georgia.
- Business: Potts Plumbing, started by Garrett Potts.
- Email: `gtpservices212@gmail.com`.
- Phone: `(770) 685-3901`.
- Requested brand copy: “Trusted by North Georgia,” “transparent pricing,” and “best-in-class service.”
- Requested service-area towns: Talking Rock, Jasper, Ellijay, Nelson, Tate, Ball Ground, Dawsonville, Dahlonega, Cumming, Canton, and Woodstock.
- Focus the copy on home plumbing and invite people to ask about less-common projects. Do not claim that commercial work is unavailable.

## Approved platform and architecture

Use Astro in static output mode. Source pages and reusable components will compile to ordinary static HTML, CSS, and only the small amount of browser JavaScript actually needed. The website does not need a server runtime, CMS, account system, booking service, or app-style framework.

The project uses Astro 7.3.5 with the approved Node.js 24 runtime. Astro requires Node.js 22.12 or later; keep deployment builders on a supported version and do not silently change the system runtime.

Use Astro layouts/components for the shared document shell, metadata, header, navigation, footer, contact links, and reusable service/area sections. Keep page content in readable, semantic Astro templates. Keep the home, Services, About, and Contact pages as separate crawlable pages. Do not add a large client-side UI framework.

Suggested source structure:

```text
src/
  components/
    SiteHeader.astro
    SiteFooter.astro
    ContactActions.astro
    ServiceExplorer.astro
    ServiceAreaList.astro
  layouts/
    SiteLayout.astro
  pages/
    index.astro
    services.astro
    about.astro
    contact.astro
  styles/
    global.css
public/
  images/
    supplied and transparently cropped logo derivatives
```

## Approved visual direction

Use the “field guide” direction: editorial typography, crisp dividers, intentional section rhythm, restrained linework inspired by plumbing routes, and a controlled white, navy, and light-blue palette. Alternate section surfaces and vary composition enough to make the page feel designed rather than a sequence of copied text blocks. Use no stock or AI-generated photos and no generated graphics containing the business name or initials. Any decorative linework is original CSS or simple SVG, not a new logo.

Inspect and use only the logo assets supplied in `images/`. They have large white margins and backgrounds. Create tightly cropped transparent display derivatives from the provided files, preserving their original mark, lettering, colors, proportions, and phone number; retain the originals untouched. Review the derivatives against the originals before using them. Avoid placing a duplicate logo in a decorative “Trusted by North Georgia” card.

Do not use emoji or Unicode symbol characters as icons/arrows. Use CSS or inline SVG icons consistently, with decorative icons hidden from assistive technology. Do not stretch, clip, or crop away any logo artwork.

## Page content and flow

### Home

1. A clear local-residential-plumbing hero with “Trusted by North Georgia,” a short plain-language summary, a visually prominent email link, and an always-visible phone number as the quieter alternative.
2. A short principles/approach transition that sets up the service information.
3. A home-service explorer with distinct, keyboard-operable expandable categories and readable summaries:
   - Leaks and home repairs.
   - Water heaters.
   - Drains and pipes.
   - Fixtures and bathrooms.
   - Other home projects, including appliance water lines, outdoor faucets/hose bibs, shutoff valves, supply lines, and plumbing changes during kitchen/bath updates.
4. A clearly divided standards section for transparent pricing and best-in-class service, using the already approved phrasing without inventing a guarantee or fixed quote.
5. One accurate service-area section listing the 11 requested towns and nearby North Georgia communities.
6. A useful closing email action and visible phone alternative.

### Services

Provide a complete overview of the same service categories with short explanations and concrete examples. The “Other home projects” category should make it clear that customers can ask about plumbing work not listed. Link naturally to the contact page and direct email/phone actions.

### About

Introduce Garrett and Potts Plumbing as a local North Georgia business with grounded, friendly copy. Do not add unconfirmed claims about licenses, insurance, years of experience, staff, guarantees, 24-hour availability, or company history.

### Contact

Make the email action visually prominent and the phone number plainly visible and tap-to-call. Explain briefly that the email link opens the visitor’s email app. Do not imply a form submits data or invent a response-time commitment.

### Shared elements

Every page has consistent navigation, a visible phone number, email link, footer, and page-specific current-page navigation state. Email is visually favored by placement and emphasis, but the website does not announce an “email-first” strategy. Do not publish business hours. Do not include simulated reviews.

## Interaction, accessibility, and performance

- Use native `<details>`/`<summary>` behavior or an equivalently semantic, keyboard-operable disclosure for the service explorer. Keep summary text descriptive and all service content in crawlable HTML.
- Provide a skip link, landmarks, one clear page-level heading, logical heading order, visible focus indicators, adequate contrast, touch-friendly controls, responsive layouts, and reduced-motion support.
- Keep the navigation usable on mobile and correctly expose its expanded/collapsed state. Keep phone and email actions visible and operable without requiring hover.
- Do not add scroll-jacking, required animation, auto-rotating content, or decorative icon fonts.
- Optimize only the supplied logo assets and generated static CSS/JavaScript; do not add analytics or third-party embeds without a later need and approval.

## SEO and local-search rules

- Write a distinct, accurate title and meta description for each page. Use North Georgia and plumbing terms naturally rather than repeating town/service lists for ranking.
- Render key page content as HTML at build time; use descriptive links and useful internal linking among Home, Services, About, and Contact.
- Keep the domain unset for now. Add canonical URLs and an absolute-URL sitemap only after the real domain is chosen.
- Keep `robots.txt` crawl-friendly. Avoid a batch of near-duplicate city landing pages; the town list belongs in useful service-area content until unique, first-hand local content exists.
- Do not promise high rankings. Search performance also depends on accurate real-world business information and external local signals.
- Do not invent an address or include fabricated business hours. Google’s LocalBusiness rich-result documentation lists a business name and physical address as required fields; defer that structured-data implementation until Garrett confirms the correct business/address representation. Never add fake ratings or reviews.
- On launch, verify all contact/service-area details and inspect indexing with Google Search Console once domain access is available.

## Out of scope and launch gates

- No domain, hosting provider, or production deployment selected yet.
- No reviews, business hours, address, social profiles, contact-form backend, booking system, or analytics.
- Garrett should confirm the named towns, exact work offered, and how estimates/pricing are explained before the site is considered ready to publish.
- The website must not claim that every plumbing request or every named location is guaranteed to be covered until Garrett confirms it.

## Acceptance criteria

- The new project builds as a static Astro site, with reusable shared components and four distinct pages.
- The service content includes the confirmed broad home-plumbing categories and the “Other home projects” catch-all.
- All pages have consistent, direct email and tap-to-call links; neither contact method is hidden on mobile.
- No emojis, Unicode icon arrows, stock/generated photos, fabricated reviews, business hours, or unsupported credentials remain.
- Both logo derivatives are recognizable, transparent, tightly cropped, and faithful to the supplied sources; originals remain available.
- SEO metadata is unique and crawlable, while canonical URLs, sitemap, and address-dependent business markup remain gated on verified domain/business data.
- Build and page checks pass, and the site is visually reviewed at desktop and narrow mobile widths with keyboard and reduced-motion checks.

## References

- [Astro components](https://docs.astro.build/en/basics/astro-components/) and [layouts](https://docs.astro.build/en/basics/layouts/)
- [Astro static output configuration](https://docs.astro.build/en/reference/configuration-reference/)
- [Google mobile-first indexing guidance](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing)
- [Google helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google LocalBusiness structured-data documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google Business Profile service-area guidance](https://support.google.com/business/answer/9157481?hl=en)
- [W3C mobile accessibility guidance](https://www.w3.org/WAI/standards-guidelines/mobile/)
