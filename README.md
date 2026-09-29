# Potts Plumbing

Static Astro website for Potts Plumbing. Four main pages, direct email and phone contact, and no server or contact-form backend.

## Run locally

Requires Node.js 22.12 or later.

```sh
npm ci
npm run build
npm test
npm run preview -- --host 127.0.0.1
```

For editing with automatic refresh, run `npm run dev`.

## Where to edit

- `src/data/business.js`: shared email, phone, and towns.
- `src/data/services.js`: services and examples.
- `src/pages/`: Home, Services, About, Contact and 404.
- `src/components/`: shared header, footer and contact actions.
- `src/styles/global.css`: colors, typography, layouts and responsive behavior.
- `public/images/`: supplied logo derivatives; originals remain in `images/`.

The production output is `dist/`. Use an HTTP server to preview it; opening its HTML directly as a file will not resolve root-relative assets correctly.

Research and rationale: [September 29 design research](docs/2026-09-29-design-research.md).

Confirm the production domain and business details before publication. No live deployment was performed. The email button opens the visitor's email app; it is not a website form. No email is sent automatically.
