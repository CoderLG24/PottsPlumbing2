# Potts Plumbing

Static Astro website for Potts Plumbing. The homepage has a short quote form handled by Netlify Forms, with direct email and phone contact still available.

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
- `src/pages/`: Home (including the quote form), Services, About, Contact, thank-you and 404.
- `src/components/`: shared header, footer and contact actions.
- `src/styles/global.css`: colors, typography, layouts and responsive behavior.
- `public/images/`: supplied logo derivatives, including a horizontal navigation version; originals remain in `images/`.

The production output is `dist/`. Use an HTTP server to preview it; opening its HTML directly as a file will not resolve root-relative assets correctly.

## Deploy on Netlify

For a manual deployment, upload the built `dist/` folder or `potts-netlify-build.zip` to Netlify Drop. For automatic updates, import the repository into Netlify; `netlify.toml` sets the build command to `npm run build` and the publish directory to `dist`.

Enable form detection under **Forms** before deploying the form. If the site was already deployed when you enabled it, redeploy the same files. The homepage form named `quote-request` should then appear under **Forms**. Add an email notification under **Forms → Submission notifications** and send a test submission on the Netlify URL. Netlify Forms does not process submissions in a local Astro preview.

Research and rationale: [September 29 design research](docs/2026-09-29-design-research.md).

Confirm the production domain and business details before publication. No live deployment was performed. The existing email buttons open the visitor's email app; the homepage quote form posts to Netlify Forms after deployment.
