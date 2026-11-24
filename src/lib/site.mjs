import path from 'node:path';
import { products, productRoute } from './products.mjs';

export const production = process.env.SITE_ENV === 'production';
const configuredOrigin = process.env.SITE_URL || 'https://adamcrestfarms.com';
const parsedOrigin = new URL(configuredOrigin);
if (production && (!process.env.SITE_URL || parsedOrigin.protocol !== 'https:' || parsedOrigin.pathname !== '/' || parsedOrigin.search || parsedOrigin.hash || parsedOrigin.username || parsedOrigin.password)) {
  throw new Error('Production builds require SITE_URL as the confirmed HTTPS origin, e.g. https://adamcrestfarms.com');
}
export const siteUrl = parsedOrigin.origin;
export const siteName = 'Adam Crest Farms';
export const categories = { ostriches: 'Ostriches', sheep: 'Sheep', goats: 'Goats', crops: 'Crops', 'farm-life': 'Farm life' };
export const today = process.env.BUILD_DATE || new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

// Preview links also work when dist/index.html is opened directly from disk.
export function href(from, target) {
  if (production) return target;
  const [pathname, hash] = target.split('#');
  const file = pathname.endsWith('/') ? pathname + 'index.html' : pathname;
  const relative = path.posix.relative(from, file) || 'index.html';
  return relative + (hash ? '#' + hash : '');
}
export const absolute = route => new URL(route, siteUrl + '/').href;
export const articleRoute = post => `/blog/${post.id}/`;
export const categoryRoute = category => `/blog/topics/${category}/`;
export const formatDate = date => new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date + 'T00:00:00Z'));
export const readingMinutes = body => Math.max(1, Math.ceil((body || '').split(/\s+/).filter(Boolean).length / 220));
export const serializeJson = data => JSON.stringify(data).replace(/</g, '\\u003c');
export const escapeXml = value => String(value).replace(/[<>&"']/g, c => ({ '<':'&lt;', '>':'&gt;', '&':'&amp;', '"':'&quot;', "'":'&apos;' }[c]));

export function visiblePosts(posts, { live = production, date = today } = {}) {
  return posts.filter(post => !live || (post.data.status === 'published' && post.data.publishedAt <= date))
    .sort((a, b) => (b.data.publishedAt || b.data.researchedAt).localeCompare(a.data.publishedAt || a.data.researchedAt) || a.id.localeCompare(b.id));
}
export function sitemapEntries(posts, { live = production, date = today } = {}) {
  if (!live) return [];
  const eligible = visiblePosts(posts, { live, date });
  return ['/', '/about/', '/contact/', '/products/', ...products.map(productRoute), '/blog/', '/blog/about/', ...new Set(eligible.map(p => categoryRoute(p.data.category))), ...eligible.map(articleRoute)];
}
