import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { plumbingServices } from '../src/data/services.js';
import { business } from '../src/data/business.js';

const routes = [
  { file: 'dist/index.html', href: '/', label: 'Home' },
  { file: 'dist/services/index.html', href: '/services/', label: 'Services' },
  { file: 'dist/about/index.html', href: '/about/', label: 'About' },
  { file: 'dist/contact/index.html', href: '/contact/', label: 'Contact' },
];
const htmlPages = routes.map(route => ({ ...route, html: readFileSync(route.file, 'utf8') }));
const decode = value => value.replaceAll('&amp;', '&');
for (const page of htmlPages) {
  test(page.label + ' has a usable contact and navigation shell', () => {
    assert.match(page.html, /class="skip-link" href="#main-content"/);
    assert.match(page.html, /<main id="main-content"/);
    assert.match(page.html, /<nav[^>]+aria-label="Primary"/);
    assert.match(page.html, /<details class="mobile-menu"/);
    assert.match(page.html, /aria-label="Quick contact"/);
    assert.equal((page.html.match(/<h1\b/g) ?? []).length, 1);
    assert.ok(page.html.includes('href="' + page.href + '" aria-current="page"'));
    assert.ok(page.html.includes('href="' + business.emailHref + '"'));
    assert.ok(page.html.includes('href="' + business.phoneHref + '"'));
  });
  test(page.label + ' links and image sources resolve in the static build', () => {
    for (const match of page.html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const value = decode(match[1]);
      if (/^(mailto:|tel:|https?:|data:)/.test(value)) continue;
      const url = new URL(value, 'https://local.test' + page.href);
      const path = resolve('dist', '.' + url.pathname, url.pathname.endsWith('/') ? 'index.html' : '');
      assert.ok(existsSync(path), 'Missing target: ' + value);
      if (url.hash) {
        const linkedHtml = readFileSync(path, 'utf8');
        assert.ok(linkedHtml.includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"'), 'Missing anchor: ' + value);
      }
    }
  });
  test(page.label + ' does not introduce invented credibility or a fake form', () => {
    assert.doesNotMatch(page.html, /\b(?:licensed|insured|24-hour|five.star|\d+ years of experience|guaranteed)\b/i);
    assert.doesNotMatch(page.html, /<form\b|<iframe\b|<video\b|application\/ld\+json/i);
    assert.doesNotMatch(page.html, /example\.com|YOUR_DOMAIN|\p{Emoji_Presentation}/u);
  });
}
test('Every page has unique metadata', () => {
  const titles = htmlPages.map(page => page.html.match(/<title>([^<]+)<\/title>/)?.[1]);
  const descriptions = htmlPages.map(page => page.html.match(/<meta name="description" content="([^"]+)"/)?.[1]);
  assert.ok(titles.every(Boolean) && descriptions.every(Boolean));
  assert.equal(new Set(titles).size, routes.length);
  assert.equal(new Set(descriptions).size, routes.length);
});
test('Home leads with a real contact action before the service chooser', () => {
  const home = htmlPages[0].html;
  const main = home.slice(home.indexOf('<main'));
  assert.ok(main.indexOf('mailto:') < main.indexOf('class="service-picker"'));
  assert.ok(main.indexOf('tel:') < main.indexOf('class="service-picker"'));
  assert.doesNotMatch(main, /class="brand-card"|class="service-disclosure"/);
  for (const service of plumbingServices) {
    assert.ok(home.includes('/services/#' + service.id));
  }
  for (const town of business.towns) assert.ok(home.includes(town));
});
test('Services retains the full business service scope in crawlable HTML', () => {
  const services = decode(htmlPages[1].html);
  for (const service of plumbingServices) {
    assert.ok(services.includes('id="' + service.id + '"'));
    assert.ok(services.includes(service.title));
    for (const example of service.examples) assert.ok(services.includes(example));
    assert.ok(services.includes(encodeURIComponent('Plumbing inquiry: ' + service.title)));
  }
});
test('Contact explains the email handoff and offers an accessible fallback', () => {
  const contact = htmlPages[3].html;
  assert.match(contact, /Opens your email app/);
  assert.match(contact, /id="email-address"/);
  assert.match(contact, /class="copy-button"[^>]*hidden/);
  assert.match(contact, /role="status"/);
  assert.equal((contact.match(/<details>/g) ?? []).length, 3);
});
test('The supplied original images remain outside the main page payload', () => {
  for (const page of htmlPages) assert.doesNotMatch(page.html, /images\/image[01]/);
  assert.ok(statSync('dist/images/potts-mark.png').size < 150000);
});
test('Static output includes a useful 404 and crawl-friendly robots file', () => {
  assert.ok(existsSync('dist/404.html'));
  assert.match(readFileSync('dist/404.html', 'utf8'), /Back to home/);
  assert.match(readFileSync('dist/robots.txt', 'utf8'), /Allow:\s*\//);
});
