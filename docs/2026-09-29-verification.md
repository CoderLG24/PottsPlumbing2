# Redesign verification

Verified September 29, 2026, using the production static build in Microsoft Edge (Chromium), served locally.

- `npm run build`: passed; four primary routes and a 404 page generated.
- `npm test`: 20 passing tests covering original logo integrity, internal links and anchors, metadata, service content, contact targets and static output.
- Browser layout checks: Home, Services, About and Contact at 320, 390, 768, 1024 and 1440 CSS pixels. All 20 combinations passed; no horizontal page overflow, broken images, failed requests or JavaScript errors.
- Full-page screenshots reviewed for all four primary pages at desktop and mobile widths.
- Mobile menu opens natively, closes on Escape, returns focus, and navigates successfully.
- Service chooser links reach their matching Services sections.
- Contact FAQs open and close natively. Email-copy action writes the correct address and announces success.
- Core mobile navigation, email links and FAQs work with JavaScript disabled; the unavailable copy control remains hidden.
- 171 keyboard focus checks at mobile and desktop widths: no missing outlines or focused controls hidden behind the mobile contact rail.
- Reduced-motion setting removes interaction transitions.
- Nine principal text/background combinations checked: all exceed 4.5:1. Email button text contrast: 8.70:1.
- Home content: 219 visible words in the main landmark. The mobile hero email button ends at y=471px on a 390px-wide viewport, and y=494px at 320px wide.
- Shared compiled CSS is approximately 19KB uncompressed. There are no external font, analytics, video, or embedded-map requests.

These are targeted automated and visual checks, not a comprehensive WCAG certification or a real-device lab. No live leads were submitted, emails sent, or phone calls placed. Field performance and conversion results require a deployed site with real traffic. The website is not published by this task.
