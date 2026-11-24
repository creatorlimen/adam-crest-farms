import { readFile, writeFile, unlink, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sample = await readFile(path.join(root, 'src/content/blog/why-do-ostriches-eat-stones.md'), 'utf8');
const fixture = path.join(root, 'src/content/blog/seo-lifecycle-fixture.md');
const exists = async p => access(p).then(() => true, () => false);
if (await exists(fixture)) throw new Error('Test fixture already exists; refusing to replace it');
const report = { date: new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos' }).format(new Date()), checks: [], passed: false };
function build(live = false, succeeds = true) {
  const run = spawnSync(process.execPath, ['scripts/build.mjs'], { cwd: root, encoding: 'utf8', env: { ...process.env, SITE_ENV: live ? 'production' : 'preview', SITE_URL: 'https://example.test', BUILD_DATE: '2026-11-12', ASTRO_TELEMETRY_DISABLED: '1' } });
  if (succeeds && run.status !== 0) throw new Error(run.stdout + run.stderr);
  if (!succeeds) assert.notEqual(run.status, 0, 'Invalid content should fail the build');
  return run.stdout + run.stderr;
}
const read = file => readFile(path.join(root, 'dist', file), 'utf8');
try {
  build();
  assert.match(await read('blog/why-do-ostriches-eat-stones/index.html'), /noindex, nofollow/);
  assert.match(await read('index.html'), /Draft preview/);
  assert.match(await read('index.html'), /blog\/why-do-ostriches-eat-stones\/index.html/);
  assert.doesNotMatch(await read('sitemap.xml'), /<loc>/);
  report.checks.push('Preview includes the labelled draft with noindex and an empty sitemap.');
  await writeFile(fixture, sample.replace('status: draft', 'status: published\npublishedAt: "2026-11-01"').replace('category: ostriches', 'category: crops'));
  build(true);
  const html = await read('blog/seo-lifecycle-fixture/index.html');
  assert.match(html, /index, follow, max-image-preview:large/);
  assert.match(html, /rel="canonical" href="https:\/\/example.test\/blog\/seo-lifecycle-fixture\/"/);
  assert.match(html, /"datePublished":"2026-11-01"/);
  assert.match(await read('sitemap.xml'), /seo-lifecycle-fixture/);
  assert.match(await read('sitemap.xml'), /topics\/crops/);
  assert.doesNotMatch(await read('sitemap.xml'), /topics\/ostriches/);
  assert.equal(await exists(path.join(root, 'dist/blog/why-do-ostriches-eat-stones/index.html')), false);
  assert.match(await read('index.html'), /\/blog\/seo-lifecycle-fixture\//);
  assert.doesNotMatch(await read('index.html'), /why-do-ostriches-eat-stones|Draft preview/);
  assert.match(await read('robots.txt'), /Sitemap: https:\/\/example.test\/sitemap.xml/);
  report.checks.push('Production has clean canonical URLs, published dates, eligible category/article sitemap entries, and no draft output.');
  await writeFile(fixture, sample.replace('status: draft', 'status: published\npublishedAt: "2999-01-01"'));
  build(true);
  assert.equal(await exists(path.join(root, 'dist/blog/seo-lifecycle-fixture/index.html')), false);
  assert.doesNotMatch(await read('sitemap.xml'), /seo-lifecycle-fixture/);
  assert.doesNotMatch(await read('index.html'), /seo-lifecycle-fixture|why-do-ostriches-eat-stones|id="journal"/);
  assert.match(await read('about/index.html'), /class="mascot story-mascot"/);
  report.checks.push('Homepage journal shares publication filtering: eligible article only, no draft/future links, and the empty feature is omitted while the mascot remains.');
  report.checks.push('A future-dated article is excluded; a clean rebuild removes its previously generated page.');
  await writeFile(fixture, sample.replace('status: draft', 'status: published'));
  assert.match(build(true, false), /Published articles need/);
  report.checks.push('A published article without a genuine publication date fails validation.');
  report.passed = true;
} finally {
  if (await exists(fixture)) await unlink(fixture);
  // Restore the owner's preview after isolated production checks.
  const restore = spawnSync(process.execPath, ['scripts/build.mjs'], { cwd: root, encoding: 'utf8', env: { ...process.env, SITE_ENV: 'preview', SITE_URL: '', ASTRO_TELEMETRY_DISABLED: '1' } });
  if (restore.status !== 0) throw new Error('Preview restore failed: ' + restore.stdout + restore.stderr);
  await writeFile(path.join(root, 'docs/review/blog-build-report.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify(report, null, 2));
