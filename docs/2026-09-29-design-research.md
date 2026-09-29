# Potts Plumbing redesign: research and decisions

Research date: September 29, 2026. This is a redesign of the Sunday Astro implementation. The earlier HTML site and existing planning documents are preserved in the original repository.

## Main finding

A good local-service website makes the business, service region, and next step immediately understandable. Visual trends can support that goal, but cannot replace readable content, useful navigation, and working contact options. Bright color works through contrast with its surroundings; there is no universally best converting button color.

## Sources reviewed and applied

| Source | Finding used | Change in this website |
| --- | --- | --- |
| [NN/g: Homepage design principles](https://www.nngroup.com/articles/homepage-design-principles/) | Explain the business quickly, prioritize tasks, use descriptive links, and keep the homepage simple. | Business and region appear above the headline; email is prominent; the service chooser links to specific sections. |
| [NN/g: Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/) | Relative color, size, and grouping communicate importance. | Navy and quiet neutral surfaces; amber reserved for email actions; clear heading scale. |
| [NN/g: Progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/) | Defer supporting detail until it is needed. | Homepage shows service names and short summaries. Full descriptions live on Services; secondary questions use native disclosures on Contact. |
| [NN/g: Imagery in visual design](https://www.nngroup.com/articles/imagery-in-visual-design/) | Prefer informative, consistent imagery with appropriate alternatives. | Retain the supplied brand assets and use a consistent set of lightweight SVG service icons. |
| [NN/g: Photos as web content](https://www.nngroup.com/articles/photos-as-web-content/) | Relevant imagery receives attention; generic decorative pictures are often ignored. | No invented team or project photos. Real job photography remains a useful future addition when available. |
| [W3C: Contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | Normal text needs 4.5:1 contrast; large text needs 3:1. | Dark text on the bright button; readable muted text; no low-contrast white text on amber. |
| [W3C: Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | Pointer targets need adequate size or spacing. | Main controls are at least 44px tall, exceeding the 24px minimum target rule. |
| [W3C: Focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | Fixed UI must not obscure keyboard focus completely. | Visible focus styles and bottom space for the mobile contact rail; keyboard checks during QA. |
| [web.dev: Web Vitals](https://web.dev/articles/vitals) | Loading, responsiveness, and visual stability all matter. | Static Astro output, system fonts, explicit image sizes, tiny interaction scripts, no tracking or third-party embeds. |
| [Google: SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) | Helpful original content, clear page structure, and crawlable links are foundational. | Unique titles/descriptions, semantic headings, real service descriptions, direct links and no town-page duplication. |
| [Reddit: 2026 small-business checklist](https://www.reddit.com/r/web_design/comments/1qaryma/what_should_be_on_a_noexcuses_checklist_for/) | Practitioners emphasize immediate CTAs, contact visibility, speed, and keyboard access. | Contact remains accessible throughout the mobile journey; core navigation works without JavaScript. |
| [Reddit: Plumbing website critique](https://www.reddit.com/r/webdesign/comments/1s75nvj/web_design_website_feedback/) | Feedback calls out below-fold CTAs, repetitive decorative tags, competing actions, and contrast problems. | Remove the logo-first mobile hierarchy, repeated introductory sections, and competing full-color actions. |
| [Reddit: Dated design discussion](https://www.reddit.com/r/web_design/comments/1tn4qgm/what_web_design_trend_instantly_makes_a_website/) | Readers object to purposeless animation and generic template styling. | Restrained motion only for user interactions; no autoplay, scroll-jacking, or delayed text reveals. |
| [Bubble: 2026 design trends](https://bubble.io/blog/web-design-trends/) | Editorial type, more individual identity, and restraint appear in contemporary design commentary. | Confident sans-serif headlines with a selective serif accent; custom composition instead of repeated cards. |
| [UI Discovery: 2026 homepage sample](https://uidiscovery.com/trends) | A current observational snapshot of homepage styles, not proof of conversion performance. | Used as visual context only, not a reason to imitate fashionable effects. |
| [Astro: deployment](https://docs.astro.build/en/guides/deploy/) | Astro static builds produce deployable output in dist. | Keep the existing Astro stack and provide a locally reviewable static build. |

Reddit is practitioner opinion, not controlled evidence. Trend reports are descriptive and can have selection bias. Accessibility and performance requirements are grounded in W3C and Google documentation. No claim is made that this design will increase leads by a particular percentage.

## Audit of the previous implementation

- Mobile DOM/layout placed a large logo panel before the hero contact actions.
- Header used two rows and repeated the region in multiple places.
- Introductory, standards, service, and closing copy repeated similar ideas.
- Header email was styled as a text link; other email actions shared the site's navy color and competed weakly with large branded elements.
- The same detailed service explorer appeared on both Home and Services.
- Oversized repeated serif headings and many large sections made the site feel longer than its content required.

## New page structure

- **Home:** immediate email and phone options, functional service chooser, two concise standards, compact service region, closing contact action.
- **Services:** direct category links and readable anchored descriptions. No need to expand several accordions to compare services.
- **About:** grounded introduction, supplied wordmark, and a short explanation of the service approach.
- **Contact:** prominent email action, clear explanation that it opens an email app, selectable/copyable address, tap-to-call, and three useful FAQs.
- **Shared:** compact navigation, native mobile disclosure with Escape behavior, footer contact details, mobile contact rail, skip link, reduced-motion support, and a useful 404 page.

## Scope and remaining launch information

The source supplies the name, phone, email, owner, services, towns, and existing standards language. No reviews, credentials, hours, response-time guarantees, invented team photos, or new business claims were added. Domain-dependent canonical URLs and sitemap remain unset because the production domain is not confirmed. Email links open the visitor's email app; they do not submit or send a message from the website. This task does not publish the site.

After launch, judge effectiveness using completed inquiries and actual mobile behavior. Field Core Web Vitals require real traffic; a local preview cannot establish them. The next useful content improvement would be approved real work photos and genuine customer feedback supplied by the business.
