# Farm journal build specification

Approved 12 November 2026: Codex manages research, writing and updates as Markdown in the website repository. Local development only; no publishing or scheduling is authorised. Preserve the reviewed home page and all annotated copy removals.

## Design

Warm, curious, grounded. Extend the existing forest/cream/gold palette and Georgia/Arial typography. Shared header and footer retain the logo and three social links. Add one navigation link: Farm journal.

The journal opens on cream with a 76px maximum Georgia headline, “Small discoveries. A closer look.”, and one short introduction. Categories are real links to generated topic pages; show only categories with visible articles. The first article is a wide editorial feature: soft cream illustration field on the left, title/excerpt on the right. Reuse the unchanged Option C greeting mascot, clearly described as an illustration. No fictitious farm photos, placeholder cards or empty topic archives.

Article opening: breadcrumb, category, 64px maximum title, short description, honest byline and research date. A draft label is visible only in local previews. Below: 200px contents column and 680px reading column, 48px gap, body 18px/1.8. Headings 34px/1.15, 40px top spacing. An illustrative mascot panel sits beside the opening; no fabricated anatomy. Source links are embedded at relevant claims and listed at the end. A compact farm enquiry link ends the article. Related articles appear only when real eligible articles exist.

Below 760px: single columns, 42px title, 17px body, 22px side margins, contents becomes a simple block before the article. Category pills and navigation controls have 44px targets. Existing focus states and reduced-motion styles apply. No new continuous motion or client-side content loading.

## Content and search

- Astro content collection with validated frontmatter and Markdown body. Categories, article routes and sitemap derive from the same eligible-post list.
- One research-backed draft: “Why do ostriches eat stones?” No invented publication date, human expert or farm practice.
- Each article has a stable slug, unique search title/description, local image/alt text, author, status, research date and source records. Published articles require a real publication date; updated date changes only for a substantive revision.
- Static HTML contains the full article and real links, unique metadata, canonical/OG URLs, BlogPosting and breadcrumb JSON-LD. Canonical uses the explicitly configured launch origin for production; local drafts stay noindex.
- Default build is local preview, includes drafts, blocks indexing and outputs an empty discovery sitemap. Production build requires SITE_URL, excludes drafts/future articles, emits only eligible URLs, and enables indexing. Building never deploys.
- Default output supports direct file opening with relative index.html links. Production uses clean routes. Public assets contain no research notes or Markdown source.

## Verification

Check home interactions after migration, journal/category/article/404 at desktop and mobile widths, no-JavaScript article readability, keyboard navigation, common WCAG issues, no broken internal links/media and no external runtime requests. Exercise preview vs production draft exclusion, future dates, metadata/schema, sitemap and a clean rebuild after removing a post. Review actual screenshots before handoff.
