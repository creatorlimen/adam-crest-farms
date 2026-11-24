import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'docs/review/multipage');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || undefined });
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const report = { date: new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos' }).format(new Date()), browser: await browser.version(), viewports: [], interactions: [] };
const failures = [];
const routes = ['/', '/about/', '/contact/', '/products/', ...['crops', 'ostriches', 'sheep', 'goats'].map(slug => '/products/' + slug + '/')];

try {
  for (const width of [1440, 1024, 768, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    for (const route of routes) {
      const page = await context.newPage();
      const errors = [];
      const remote = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('requestfailed', request => errors.push(`${request.url()} ${request.failure()?.errorText}`));
      page.on('response', response => { if (response.status() >= 400) errors.push(`${response.url()} ${response.status()}`); });
      page.on('request', request => { if (!request.url().startsWith(base)) remote.push(request.url()); });
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.evaluate(async () => {
        await Promise.all([...document.images].map(image => { image.loading = 'eager'; return image.decode(); }));
      });
      const layout = await page.evaluate(() => ({
        viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        brokenImages: [...document.images].filter(image => !image.complete || !image.naturalWidth).map(image => image.src),
        headings: document.querySelectorAll('h1').length,
        reducedMotion: getComputedStyle(document.querySelector('h1')).animationName
      }));
      const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      const violations = accessibility.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
      const current = { route, width, ...layout, errors, remote, violations };
      report.viewports.push(current);
      if (layout.scrollWidth > width || layout.brokenImages.length || errors.length || violations.length || remote.length || layout.headings !== 1) failures.push(current);
      if ([1440, 390].includes(width)) {
        const name = route.split('/').filter(Boolean).join('-') || 'home';
        await page.screenshot({ path: path.join(output, (width === 1440 ? 'desktop-' : 'mobile-') + name + '.png'), fullPage: true });
      }
      await page.close();
    }
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  await page.goto(base);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.className), 'skip-link');
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
  report.interactions.push('Keyboard Tab exposes the skip link and Enter moves focus to the main content.');
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Menu', exact: true }).getAttribute('aria-expanded'), 'true');
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('button', { name: 'Menu', exact: true }).getAttribute('aria-expanded'), 'false');
  assert.equal(await page.evaluate(() => document.activeElement.className), 'menu-toggle');
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page.locator('#navigation').getByRole('link', { name: 'About', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Menu', exact: true }).getAttribute('aria-expanded'), 'false');
  report.interactions.push('Mobile menu opens, closes on Escape with focus returned, and closes on navigation.');
  for (const product of ['Ostriches', 'Sheep', 'Goats', 'Crops']) {
    await page.goto(base + '/products/');
    await page.locator('.catalogue-entry').filter({ has: page.getByRole('heading', { name: product, exact: true }) }).click();
    assert.equal(await page.locator('h1').innerText(), product);
    await page.getByRole('link', { name: `Enquire about ${product.toLowerCase()}`, exact: true }).click();
    assert.equal(await page.locator('#product').inputValue(), product);
  }
  await page.locator('#location').fill('Lagos');
  await page.locator('#details').fill('Please let me know which crops are available.');
  await page.getByRole('button', { name: 'Prepare my enquiry', exact: true }).click();
  const prepared = await page.locator('#enquiry-message').inputValue();
  assert.ok(prepared.includes('your crops'));
  assert.ok(prepared.includes('My location: Lagos.'));
  await page.getByRole('button', { name: 'Copy enquiry', exact: true }).click();
  await page.getByRole('status').filter({ hasText: 'Enquiry copied' }).waitFor();
  assert.equal((await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, '\n'), prepared);
  assert.equal(await page.locator('#enquiry-result a').getAttribute('href'), 'https://www.instagram.com/adamcrestfarms/');
  assert.equal(await page.locator('#enquiry-result a').getAttribute('target'), '_blank');
  report.interactions.push('All four category links preselect their product; enquiry text and clipboard output match.');
  await page.screenshot({ path: path.join(output, 'mobile-enquiry.png'), fullPage: true });
  await page.locator('#details').fill('A different question');
  assert.equal(await page.locator('#enquiry-result').isVisible(), false);
  await page.getByRole('button', { name: 'Prepare my enquiry', exact: true }).click();
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new Error('Unavailable')) } }));
  await page.getByRole('button', { name: 'Copy enquiry', exact: true }).click();
  await page.getByRole('status').filter({ hasText: 'copy the selected text manually' }).waitFor();
  assert.equal(await page.evaluate(() => document.activeElement.id), 'enquiry-message');
  report.interactions.push('Editing invalidates the prepared message; clipboard failure exposes manual-copy instructions.');
  assert.equal(await page.locator('a[href^="https://wa.me"]').count(), 0);
  assert.equal(await page.locator('#whatsapp-pending').count(), 0);
  assert.ok(await page.locator('.arrangements-pending').isVisible());
  for (const [hash, destination] of [['enquire','contact'], ['our-farm','about'], ['offerings','products']]) {
    await page.goto(base + '/#' + hash);
    await page.waitForURL('**/' + destination + '/index.html');
  }
  report.interactions.push('Legacy homepage bookmarks reach the dedicated pages.');
  await page.goto(base);
  await page.locator('#journal').getByRole('link', { name: 'View all articles' }).click();
  assert.equal(await page.locator('h1').innerText(), 'Farm journal.');
  await page.getByRole('link', { name: 'Read article: Why do ostriches eat stones?' }).click();
  assert.ok(await page.locator('.prose').isVisible());
  report.interactions.push('Homepage journal link opens the card index, and its Read article link opens the full post.');
  await context.close();

  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const fallback = await noJs.newPage();
  await fallback.goto(base + '/contact/');
  assert.ok(await fallback.locator('#navigation').isVisible());
  assert.ok(await fallback.locator('noscript').isVisible());
  assert.equal(await fallback.locator('#composer-fields').isVisible(), false);
  await noJs.close();
  report.interactions.push('Navigation, product details, contact link and fallback remain available without JavaScript.');

  const fileContext = await browser.newContext();
  const filePage = await fileContext.newPage();
  await filePage.goto(pathToFileURL(path.join(root, 'dist/index.html')).href);
  await filePage.getByRole('link', { name: 'Explore our products' }).click();
  await filePage.locator('.catalogue-entry').first().click();
  await filePage.getByRole('link', { name: 'Enquire about crops' }).click();
  assert.equal(await filePage.locator('#product').inputValue(), 'Crops');
  await filePage.getByRole('button', { name: 'Prepare my enquiry', exact: true }).click();
  assert.ok((await filePage.locator('#enquiry-message').inputValue()).includes('Hello Adam Crest Farms'));
  await fileContext.close();
  report.interactions.push('Direct file opening also loads the page and prepares an enquiry.');

  const earlyPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await earlyPage.goto(base, { waitUntil: 'domcontentloaded' });
  await earlyPage.waitForTimeout(350);
  await earlyPage.screenshot({ path: path.join(output, 'desktop-early.png') });
  await earlyPage.close();
  report.passed = failures.length === 0;
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ passed: report.passed, viewports: report.viewports.map(v => ({ width: v.width, overflow: v.scrollWidth > v.width, violations: v.violations.length, errors: v.errors.length })), interactions: report.interactions, failures }, null, 2));
  assert.equal(failures.length, 0, 'Visual/layout/accessibility checks failed. See docs/review/multipage/report.json.');
} catch (error) {
  report.passed = false;
  report.error = error.message;
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  throw error;
} finally {
  await browser.close();
}
