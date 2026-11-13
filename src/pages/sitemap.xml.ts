import { getPosts } from '../lib/posts';
import { absolute, sitemapEntries, escapeXml, articleRoute } from '../lib/site.mjs';
export async function GET() {
  const posts = await getPosts();
  const entries = sitemapEntries(posts).map(route => {
    const post = posts.find(p => articleRoute(p) === route);
    const modified = post?.data.updatedAt || post?.data.publishedAt;
    return `<url><loc>${escapeXml(absolute(route))}</loc>${modified ? `<lastmod>${modified}</lastmod>` : ''}</url>`;
  }).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
