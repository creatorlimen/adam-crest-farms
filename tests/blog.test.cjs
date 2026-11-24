const { test } = require('node:test');
const assert = require('node:assert/strict');
const blog = import('../src/lib/site.mjs');
const post = (id, status, publishedAt, category = 'ostriches') => ({ id, data: { status, publishedAt, category, researchedAt: '2026-11-12' } });

test('live listings exclude drafts and future articles, retaining chronological order', async () => {
  const { visiblePosts } = await blog;
  const posts = [post('draft', 'draft'), post('future', 'published', '2026-11-13'), post('older', 'published', '2026-11-01'), post('newer', 'published', '2026-11-12')];
  assert.deepEqual(visiblePosts(posts, { live: true, date: '2026-11-12' }).map(p => p.id), ['newer', 'older']);
  assert.equal(visiblePosts(posts, { live: false }).length, 4);
});
test('sitemap excludes draft-only categories, future articles and all preview URLs', async () => {
  const { sitemapEntries } = await blog;
  const posts = [post('draft', 'draft', undefined, 'goats'), post('future', 'published', '2026-11-13', 'crops'), post('story', 'published', '2026-11-12')];
  assert.deepEqual(sitemapEntries(posts, { live: false }), []);
  assert.deepEqual(sitemapEntries(posts, { live: true, date: '2026-11-12' }), ['/', '/about/', '/contact/', '/products/', '/products/crops/', '/products/ostriches/', '/products/sheep/', '/products/goats/', '/blog/', '/blog/about/', '/blog/topics/ostriches/', '/blog/story/']);
});
test('local links work from nested article pages and preserve enquiry anchors', async () => {
  const { href } = await blog;
  assert.equal(href('/blog/story/', '/#enquire'), '../../index.html#enquire');
  assert.equal(href('/blog/story/', '/blog/'), '../index.html');
  assert.equal(href('/blog/story/', '/assets/mascot/ostrich-greeting.png'), '../../assets/mascot/ostrich-greeting.png');
});
test('structured data cannot close its script element and sitemap escapes XML', async () => {
  const { serializeJson, escapeXml } = await blog;
  assert.equal(serializeJson({ title: '</script><script>bad' }).includes('<'), false);
  assert.deepEqual(JSON.parse(serializeJson({ title: '</script>' })), { title: '</script>' });
  assert.equal(escapeXml('a&b<c'), 'a&amp;b&lt;c');
});
