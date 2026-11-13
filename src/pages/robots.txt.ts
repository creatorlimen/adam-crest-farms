import { production, absolute } from '../lib/site.mjs';
export function GET() {
  return new Response(production ? `User-agent: *\nAllow: /\nSitemap: ${absolute('/sitemap.xml')}\n` : 'User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain' } });
}
