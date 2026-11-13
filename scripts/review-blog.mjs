import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const routes = ['/blog/', '/blog/why-do-ostriches-eat-stones/', '/blog/topics/ostriches/', '/blog/about/'];
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || undefined });
const report = { date: '2026-11-13', browser: browser.version(), checks: [], passed: false };
try {
  for (const width of [1440, 1024, 768, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    for (const route of routes) {
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
      page.on('request', request => { if (!request.url().startsWith(base)) errors.push('External runtime request: ' + request.url()); });
      assert.equal((await page.goto(base + route, { waitUntil: 'networkidle' })).status(), 200);
      const layout = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).length }));
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      assert.deepEqual(errors, []);
      assert.equal(layout.brokenImages, 0);
      assert.ok(layout.scrollWidth <= width, `${route} overflows at ${width}`);
      assert.deepEqual(axe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), []);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
      report.checks.push({ route, width, overflow: false, violations: 0, errors: 0 });
      if ([1440, 390].includes(width) && routes.indexOf(route) < 2) {
        const name = routes.indexOf(route) === 0 ? 'journal' : 'article';
        await page.screenshot({ path: `docs/review/${width === 1440 ? 'desktop' : 'mobile'}-${name}.png`, fullPage: true });
        await page.screenshot({ path: `docs/review/${width === 1440 ? 'desktop' : 'mobile'}-${name}-opening.png` });
      }
      // Every generated navigation/resource link must resolve; external citations are not followed.
      const localLinks = await page.locator('a[href], img[src], script[src], link[rel="stylesheet"]').evaluateAll(elements => elements.map(el => el.href || el.src).filter(Boolean));
      for (const url of new Set(localLinks.filter(url => url.startsWith(base)))) {
        const response = await context.request.get(url.split('#')[0]);
        assert.equal(response.status(), 200, 'Broken local link: ' + url);
      }
      await page.close();
    }
    await context.close();
  }
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(base + routes[1]);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.className), 'skip-link');
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('button', { name: 'Menu', exact: true }).getAttribute('aria-expanded'), 'false');
  await page.getByRole('navigation', { name: 'Article contents' }).getByRole('link', { name: 'The gizzard supplies the movement' }).click();
  assert.ok(page.url().endsWith('#the-gizzard-supplies-the-movement'));
  const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())['@graph'];
  assert.equal(graph[0]['@type'], 'BlogPosting');
  assert.equal(graph[0].datePublished, undefined);
  assert.equal(graph[0].citation.length, 4);
  assert.equal(graph[1]['@type'], 'BreadcrumbList');
  await page.locator('.article-enquiry').getByRole('link', { name: 'Make an enquiry' }).click();
  await page.getByRole('button', { name: 'Prepare my enquiry', exact: true }).click();
  assert.match(await page.locator('#enquiry-message').inputValue(), /Hello Adam Crest Farms/);
  await context.close();
  report.checks.push('Keyboard skip/menu, contents anchors, article schema and article-to-enquiry journey passed.');
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const fallback = await noJs.newPage();
  await fallback.goto(base + routes[1]);
  assert.ok((await fallback.locator('.prose').innerText()).includes('gastroliths'));
  await fallback.locator('.journal-return').click();
  assert.ok((await fallback.locator('h1').innerText()).includes('Small discoveries'));
  await fallback.goto(pathToFileURL(path.resolve('dist/blog/why-do-ostriches-eat-stones/index.html')).href);
  await fallback.locator('.journal-return').click();
  assert.ok(fallback.url().endsWith('/blog/index.html'));
  assert.equal(await fallback.locator('.post-art img').evaluate(img => img.complete && img.naturalWidth > 0), true);
  await noJs.close();
  const notFound = await browser.newPage();
  assert.equal((await notFound.goto(base + '/missing/deep/page/')).status(), 404);
  assert.ok((await notFound.locator('h1').innerText()).includes('the path'));
  assert.equal(await notFound.locator('.brand img').first().evaluate(img => img.complete && img.naturalWidth > 0), true);
  await notFound.getByRole('link', { name: 'Return to the farm', exact: true }).click();
  assert.equal((await notFound.locator('#hero-title').count()), 1);
  await notFound.close();
  report.checks.push('No-JavaScript reading/navigation, direct file links/images and nested 404 recovery passed.');
  report.passed = true;
} catch (error) {
  report.error = error.message;
  throw error;
} finally {
  await writeFile('docs/review/blog-browser-report.json', JSON.stringify(report, null, 2) + '\n');
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
