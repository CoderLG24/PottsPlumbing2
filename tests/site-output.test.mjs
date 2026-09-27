import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const outputPages = [
  { path: 'dist/index.html', navHref: '/', label: 'Home' },
  { path: 'dist/services/index.html', navHref: '/services/', label: 'Services' },
  { path: 'dist/about/index.html', navHref: '/about/', label: 'About' },
  { path: 'dist/contact/index.html', navHref: '/contact/', label: 'Contact' },
];

for (const page of outputPages) {
  test(`build emits ${page.path}`, () => {
    assert.equal(existsSync(page.path), true, `Expected static page ${page.path}`);
  });

  test(`${page.label} includes the shared accessible contact shell`, () => {
    const html = readFileSync(page.path, 'utf8');

    assert.match(html, /class="skip-link"/);
    assert.match(html, /href="#main-content"/);
    assert.match(html, /<main[^>]+id="main-content"/);
    assert.match(html, /<nav[^>]+aria-label="Primary"/);
    assert.match(html, /<footer/);
    assert.match(html, /href="mailto:gtpservices212@gmail\.com"/);
    assert.match(html, /href="tel:\+17706853901"/);
    assert.match(html, new RegExp(`href="${page.navHref.replaceAll('/', '\\/')}"[^>]*aria-current="page"`));
    assert.match(html, /<title>[^<]+<\/title>/);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  });
}

const homeHtml = readFileSync('dist/index.html', 'utf8').replaceAll('&amp;', '&');
const servicesHtml = readFileSync('dist/services/index.html', 'utf8').replaceAll('&amp;', '&');
const aboutHtml = readFileSync('dist/about/index.html', 'utf8').replaceAll('&amp;', '&');
const contactHtml = readFileSync('dist/contact/index.html', 'utf8').replaceAll('&amp;', '&');

test('Home introduces the business, requested standards, and North Georgia coverage', () => {
  assert.match(homeHtml, /Trusted by North Georgia/);
  assert.match(homeHtml, /transparent pricing/i);
  assert.match(homeHtml, /best-in-class service/i);

  for (const town of [
    'Talking Rock', 'Jasper', 'Ellijay', 'Nelson', 'Tate', 'Ball Ground',
    'Dawsonville', 'Dahlonega', 'Cumming', 'Canton', 'Woodstock',
  ]) {
    assert.ok(homeHtml.includes(town), `Expected Home to include ${town}`);
  }
});

test('Home removes the rejected decorative illustration and inactive service link', () => {
  assert.doesNotMatch(homeHtml, /hero-field/);
  assert.doesNotMatch(homeHtml, /Explore service details/);
});

test('Home uses the supplied wordmark and highlights its service standards with icons', () => {
  const brandCard = homeHtml.match(/<aside class="brand-card"[\s\S]*?<\/aside>/)?.[0];

  assert.ok(brandCard, 'Expected the branded home hero panel');
  assert.match(brandCard, /src="\/images\/potts-wordmark\.png"/);
  assert.match(brandCard, /Potts Plumbing, 770-685-3901/);
  assert.match(brandCard, /Transparent pricing/);
  assert.match(brandCard, /Best-in-class service/);
  assert.equal((brandCard.match(/data-icon=/g) ?? []).length, 2);
});

test('Home and Services expose the approved categories and useful home-plumbing examples', () => {
  const categories = [
    'Leaks & home repairs',
    'Water heaters',
    'Drains & pipes',
    'Fixtures & bathrooms',
    'Other home projects',
  ];

  for (const category of categories) {
    assert.ok(homeHtml.includes(category), `Expected Home to include ${category}`);
    assert.ok(servicesHtml.includes(category), `Expected Services to include ${category}`);
  }

  assert.equal((servicesHtml.match(/<h3[^>]*class="service-disclosure__title"/g) ?? []).length, categories.length);
  assert.equal((servicesHtml.match(/<details class="service-disclosure"/g) ?? []).length, categories.length);
  assert.equal((servicesHtml.match(/class="site-icon service-disclosure__icon"/g) ?? []).length, categories.length);

  for (const example of [
    'leaking faucets', 'running toilets', 'water pressure', 'hot water',
    'clogged drains', 'water lines', 'outdoor faucets', 'shutoff valves',
  ]) {
    assert.ok(servicesHtml.toLowerCase().includes(example), `Expected Services to mention ${example}`);
  }
});

test('Home, About, and Contact make it easy to start without diagnosing the problem', () => {
  assert.match(homeHtml, /You do not need to diagnose the problem/i);
  assert.match(homeHtml, /Garrett (?:can help|will help).{0,100}(?:options|next steps|price)/i);
  assert.doesNotMatch(aboutHtml, /Understand the issue|Describe what you are seeing/i);
  assert.match(aboutHtml, /no diagnosis needed/i);
  assert.match(contactHtml, /No need to diagnose anything/i);
  assert.match(contactHtml, /A brief note is enough/i);
});

test('Home and Services avoid fabricated reviews, hours, and unsupported credentials', () => {
  for (const html of [homeHtml, servicesHtml]) {
    assert.doesNotMatch(html, /\b(?:reviews?|testimonials?|business hours|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/i);
    assert.doesNotMatch(html, /\b(?:licensed|insured|guarantee(?:d)?|24-hour|years of experience)\b/i);
    assert.doesNotMatch(html, /\b(?:no commercial work|does not do commercial|commercial work unavailable)\b/i);
  }
});

test('About introduces Garrett and the local business without unsupported claims', () => {
  assert.match(aboutHtml, /Garrett Potts/);
  assert.match(aboutHtml, /Potts Plumbing/);
  assert.match(aboutHtml, /North Georgia/);
  assert.match(aboutHtml, /homeowners|homes/i);
  assert.doesNotMatch(aboutHtml, /\b(?:licensed|insured|guarantee(?:d)?|24-hour|since 20\d\d|\d+ years of experience)\b/i);
});

test('Contact offers direct email and phone actions without implying a form submission', () => {
  assert.match(contactHtml, /href="mailto:gtpservices212@gmail\.com"/);
  assert.match(contactHtml, /opens? (?:your )?email (?:app|application)/i);
  assert.match(contactHtml, /href="tel:\+17706853901"/);
  assert.match(contactHtml, /\(770\) 685-3901/);
  assert.doesNotMatch(contactHtml, /call or text/i);
  assert.doesNotMatch(contactHtml, /<form\b/i);
});

test('All pages have unique crawlable metadata and avoid placeholders or decorative symbols', () => {
  const titles = [];
  const descriptions = [];

  for (const page of outputPages) {
    const html = readFileSync(page.path, 'utf8');
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];

    assert.ok(title, `Expected a title in ${page.path}`);
    assert.ok(description, `Expected a description in ${page.path}`);
    assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+noindex/i);
    assert.doesNotMatch(html, /example\.com|placeholder/i);
    assert.doesNotMatch(html, /[\u2190-\u21ff\u27a1]/u);
    assert.doesNotMatch(html, /\p{Emoji_Presentation}/u);
    titles.push(title);
    descriptions.push(description);
  }

  assert.equal(new Set(titles).size, outputPages.length, 'Expected unique page titles');
  assert.equal(new Set(descriptions).size, outputPages.length, 'Expected unique page descriptions');
});

test('Static output keeps crawling open without domain-dependent sitemap data', () => {
  assert.equal(existsSync('dist/robots.txt'), true, 'Expected robots.txt in static output');
  const robots = readFileSync('dist/robots.txt', 'utf8');
  assert.match(robots, /User-agent:\s*\*/i);
  assert.match(robots, /Allow:\s*\//i);
  assert.doesNotMatch(robots, /Disallow:\s*\//i);
  assert.doesNotMatch(robots, /Sitemap:/i);
  assert.doesNotMatch(readFileSync('dist/index.html', 'utf8'), /rel="canonical"/i);
});

test('Legacy hand-authored pages and scripts are retired after the Astro routes replace them', () => {
  for (const file of ['index.html', 'services.html', 'about.html', 'contact.html', 'styles.css', 'script.js', 'robots.txt']) {
    assert.equal(existsSync(file), false, `Expected legacy source ${file} to be removed`);
  }
});

test('Shared styles remain responsive, keyboard-friendly, and independent of external assets', () => {
  const styles = readFileSync('src/styles/global.css', 'utf8');

  assert.match(styles, /@media\s*\(max-width:\s*48rem\)/);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(styles, /\.mobile-menu summary\s*\{/);
  assert.match(styles, /\.service-disclosure\[open\]/);
  assert.match(styles, /calc\(100% - var\(--page-gutter\) - var\(--page-gutter\)\)/);
  assert.doesNotMatch(styles, /@import\s|https?:\/\//i);
  assert.doesNotMatch(styles, /[\u2190-\u21ff\u27a1]/u);
});
