# Research, write and update the farm journal

The owner delegated blog research, writing and updates to Codex on 12 November 2026. Work is initiated by a request or a separately configured schedule; this repository does not run a background researcher. Publishing remains a separate instruction. All code, content, assets and research stay in Website, with Git operations from this directory.

## Choose and research

1. Read AGENTS.md, the brand brief and this workflow. Check existing Markdown posts and research notes before choosing an angle. Focus on useful consumer questions about ostriches, sheep, goats and crops, with a natural connection to the farm.
2. Reopen reliable sources for each article or refresh. Prefer original papers, agricultural institutions and universities. Keep important qualifiers, distinguish general findings from farm-specific facts, and do not invent expert review, veterinary advice, availability or delivery promises.
3. Create a source/claim record in docs/research/<slug>.md, with access date, exclusions, image provenance and the reason for later changes. Record measured search evidence only when actually available; do not claim a topic's search volume or ranking potential without it.

## Author

Copy docs/templates/blog-post.md into src/content/blog/<slug>.md. Use a descriptive lowercase hyphenated filename and keep it stable after publication. The filename becomes /blog/<slug>/. Do not add a separate slug field or use reserved names about/topics. The Markdown body starts with paragraphs, not another H1: the template supplies the title.

Required fields: title, seoTitle, description, category, status, author, researchedAt, image, imageAlt, imageWidth, imageHeight, imageCaption and sources. Categories are ostriches, sheep, goats, crops or farm-life. The schema checks required fields, date format and local-image paths; the build checks that the image exists.

- Keep status: draft while researching or reviewing. Leave publishedAt absent until actual publication is authorised. Default previews include labelled drafts; production builds exclude them.
- On first authorised publication, set status: published and the genuine publishedAt date. Future-dated posts are excluded from production; no scheduler automatically publishes them.
- Set updatedAt only after a substantive change to an already-published article. Do not refresh dates merely to suggest freshness. Update researchedAt when the supporting sources were actually rechecked.
- The Adam Crest Farms byline is an organisation credit, not a named expert. The journal about page explains AI-assisted preparation. Do not add credentials or reviewer identities without confirmation.
- Use useful headings and original explanations. Link source citations close to claims; list consulted sources in frontmatter for the end-of-article bibliography.
- Copy only selected, permission-cleared images into public/assets. Record provenance in docs/asset-manifest.json. Illustrations must not be represented as photographs of the owner's farm.
- For internal Markdown links use relative paths to the target index.html (e.g. ../other-post/index.html). These resolve in both file previews and HTTP builds. Template navigation uses clean routes in production. For links requiring complex components, edit the Astro template instead of putting scripts into articles.

## Check and deliver locally

Run npm run build and npm test. Run npm run test:build for changes to routing, schema or publication rules; it creates/removes its own temporary fixture and restores the local preview. With npm run serve active, use BROWSER_CHANNEL=msedge and npm run test:browser on Windows. Review desktop/mobile screenshots in docs/review before handoff. No new publication workflow requires the parent workspace to be present.

Check title/description, source links, one H1, readable images, mobile layout, contents anchors and the enquiry journey. For substantive post updates, recheck claims and record the change in the research file. Commit only reviewed work locally, keep README current, and provide the preview. Never infer a publication date or status from a local commit.

## Eventual launch

Confirm the HTTPS origin/domain and contact journey. Only with publication authorised: mark approved articles published with their real dates, then build with SITE_ENV=production and SITE_URL set to that origin. Inspect dist before deploying. The build enables indexing and emits clean canonical/OG/schema URLs, robots.txt and a sitemap derived from eligible posts. It does not deploy, connect Search Console or submit a sitemap. Drafts, future articles and their otherwise-empty category archives are absent. Related articles appear automatically when eligible articles share a category.

After launch, Search Console can help identify search queries and pages that need improvement once access and data are available. Technical checks and source quality do not guarantee indexing, ranking or traffic.

## References

- [Astro content collections](https://docs.astro.build/en/guides/content-collections/)
- [Google article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

References consulted 12 November 2026. The production build and live indexing rules must be revisited when launching.
