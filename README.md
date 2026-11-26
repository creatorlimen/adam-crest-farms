# Adam Crest Farms website

A self-contained Astro website with a Markdown farm journal, a photograph-led farm introduction and a product-enquiry composer. The supplied logo, Option C mascot and established forest/cream/gold palette are retained.

**Local redesign, 26 November 2026.** About the farm follows the rotating cover. The product features and catalogue lead into the farm photo tour, buying information, category shortcuts and buyer groups. The enquiry form comes before the journal, which closes the homepage when an article is eligible. [Products](dist/products/index.html) supports shareable category filters, individual product pages and related products. Each category can open [Contact](dist/contact/index.html) with the product selected. The historical `#offerings`, `#our-farm` and `#enquire` bookmarks open the corresponding homepage sections.

The Farm Journal retains its article cards, topic archives and full articles. The homepage features the latest eligible post. The preview includes one labelled draft. Instagram is the available contact channel, and WhatsApp is hidden pending a confirmed number. Everything is local.

## Setup and preview

Run all commands from this Website repository. For new installs, use Node.js 22.19 or later and npm 9.6.5 or later. Astro 6.4.8 is pinned. The complete local build and tests also passed on this computer's Node 22.14 runtime; npm reports an engine warning for an unused font-fetching dependency. No system runtime was replaced.

```sh
npm ci
npm start
```

Open http://127.0.0.1:4173. The server binds only to this computer. Stop it with Ctrl+C. npm start builds the default local preview before serving it. After source edits, run npm run build again and refresh. No cloud account, credentials or parent-workspace files are required.

```sh
npm run build          # Generate the local preview in dist/
npm run serve          # Serve an already-built dist/ without rebuilding
npm test               # Content eligibility, links, escaping and enquiry tests
npm run test:build     # Publication lifecycle checks; restores the local preview
```

The built preview also opens directly: [Home](dist/index.html), [Farm journal](dist/blog/index.html), [Example article](dist/blog/why-do-ostriches-eat-stones/index.html). Links/assets in preview builds are relative and work from disk. dist/ is generated and ignored by Git; build it after cloning. The old public/index.html has moved to src/pages/index.astro.

## Owner content questionnaire

The editable [website questionnaire](docs/owner-questionnaire/Adam-Crest-Farms-Website-Questionnaire.docx) gathers the farm story, specific products, buying arrangements, common questions and permissioned photographs. It contains three pages of core questions plus a photo checklist and final checks. This blank master is preserved. The partly completed response received on 24 November stays outside the repository/public output; its confirmed business details are recorded in [BRAND_BRIEF.md](docs/BRAND_BRIEF.md).

See [CONTENT_REBUILD.md](docs/CONTENT_REBUILD.md) for the copy decisions, source limits and remaining gaps. Final contact details, ordering steps, collection/delivery/visit policy, goat details and sheep/goat photographs still need owner input. No prices, guarantees, testimonials or credentials have been invented.

## Blog editing

Read [BLOG_WORKFLOW.md](docs/BLOG_WORKFLOW.md) for research, drafting and updates. Copy the [post template](docs/templates/blog-post.md) into src/content/blog/<slug>.md and replace every example value. The filename determines the stable URL /blog/<slug>/.

The schema validates metadata, category, dates, sources and image information. Each post has its own HTML page, search title/description, canonical and sharing metadata, BlogPosting/breadcrumb JSON-LD, contents links and source list. Categories, related posts and the sitemap derive from eligible articles. Full article text and navigation work without JavaScript.

The journal index at /blog/ previews all eligible posts as cards with an image, category, title, excerpt, date and reading time. Images, titles and the Read article buttons open the full post. Topic archives and related posts reuse the same card design. New eligible Markdown articles populate the grid automatically. The homepage selects the latest article from the same collection, labels local drafts and omits the feature if no post is eligible in production.

Default local builds show labelled drafts and carry noindex/nofollow plus a blocking robots.txt and empty sitemap. Published posts need a genuine publishedAt date. Future-dated posts are omitted from production builds. There is no automatic publishing scheduler. Research dates and substantive update dates have separate meanings.

The sample, [Why do ostriches eat stones?](src/content/blog/why-do-ostriches-eat-stones.md), is a draft with [four checked sources](docs/research/why-do-ostriches-eat-stones.md). It has no invented publication date or specialist byline. The journal's about page explains AI-assisted preparation. No research notes or Markdown sources are copied into the public output.

## Browser review

Playwright and axe are development dependencies. With npm run serve running in another terminal, Windows users with Microsoft Edge can run:

```powershell
$env:BROWSER_CHANNEL = 'msedge'
npm run test:browser
```

On other platforms, install the Playwright Chromium browser with npx playwright install chromium and omit BROWSER_CHANNEL. Optional PREVIEW_URL changes the local address used by checks; optional PORT changes the server port. Screenshots and reports are written to docs/review/. Browser checks cover 320 to 1440px layouts, keyboard navigation, no-JavaScript reading, enquiry/copy behaviour, internal links, 404 recovery and common WCAG A/AA issues. Automated scans are not accessibility certification.

The [desktop homepage](docs/review/multipage/desktop-home.png) and [mobile homepage](docs/review/multipage/mobile-home.png) show the current layout. See [QA.md](docs/QA.md), [journal screenshot](docs/review/desktop-journal-opening.png) and [article screenshot](docs/review/mobile-article-opening.png).

## Repository map

| Path | Purpose |
|---|---|
| src/pages/index.astro | Farm homepage and latest journal feature |
| src/pages/products/, about.astro, contact.astro | Catalogue, category details, farm story and enquiries |
| src/lib/products.mjs | Product facts and stable category routes |
| src/pages/blog/ | Journal index, topic, article and editorial-policy pages |
| src/content/blog/ | Markdown articles and metadata |
| src/content.config.ts | Article schema |
| src/layouts/ and src/components/ | Shared head, header, footer and article cards |
| src/lib/ | Build mode, routes, date/eligibility and sitemap helpers |
| public/styles.css and public/journal.css | Home and journal presentation |
| public/app.js and public/enquiry.js | Navigation and local enquiry composer |
| public/site-config.js | Public contact configuration |
| public/assets/ | Unchanged brand masters and selected farm-photo WebP derivatives |
| scripts/ | Build, loopback server and verification |
| docs/ | Brief, provenance, research, workflow and review evidence |

Dependencies are pinned in package-lock.json. Astro is used at build time; the result is static HTML/CSS/JavaScript. There are no runtime CDNs, remote fonts, analytics, databases or server submissions. Visitors prepare an enquiry locally and send it themselves through Instagram. Social/source links only open when followed.

Photo provenance and hashes are recorded in [ASSETS.md](docs/ASSETS.md) and its manifest. The four owner-photo derivatives and four generated product illustrations are committed and require no processing to build the site. Optional `python scripts/prepare-farm-photos.py PATH_TO_OWNER_IMAGES` recreates them with Pillow; it is an asset-maintenance utility, not a build dependency. The parent workspace is not needed after cloning.

To enable WhatsApp later, put the owner-confirmed international digits-only number in public/site-config.js and review the Instagram-first instructions. Never use a made-up number or put credentials in public files.

## Vercel hosting

This local working copy keeps the full editorial and review workflow on `local-authoring`. GitHub's `main` contains the build and website sources in a separate worktree at `.local/hosting-source/`. Make public releases from that worktree, transferring only the approved changes. Approved articles can be added there with `git add -f -- src/content/blog/ARTICLE.md`. Future releases use ordinary commits and pushes. The original complete history was backed up in `.local/backups/website-before-github-cleanup-bf07456.bundle`.

Import `creatorlimen/adam-crest-farms` into Vercel, using `main` and the repository root. The checked-in `vercel.json` selects Astro, runs the hosted build and serves `dist/`. Leave Vercel's system environment variables enabled. Production uses the project's assigned HTTPS domain for canonical links and the sitemap. To choose a specific connected custom domain, set `SITE_URL` to its HTTPS origin and redeploy.

Both production and Vercel preview deployments omit drafts and future-dated articles. Production is indexable. Vercel previews block indexing. Local builds continue to include labelled drafts.

## Local production build

To inspect production output locally, set the confirmed HTTPS origin before building. Set an approved article to published with its genuine publication date when it is ready.

```powershell
$env:SITE_ENV = 'production'
$env:SITE_URL = 'https://adamcrestfarms.com' # Only after this origin is confirmed
npm run build
Remove-Item Env:SITE_ENV
Remove-Item Env:SITE_URL
```

This creates production files only. It does not deploy. Production requires an explicit HTTPS origin; it emits clean URLs, indexable metadata, a sitemap and robots.txt while excluding drafts/future posts and empty categories. Serve dist/ with directory-index support and the generated 404.html. Confirm hosting behaviour before deployment, then connect Search Console and submit the sitemap separately if authorised.

After inspecting a production build, run npm run build with those variables cleared to restore the draft preview. npm run test:build uses a temporary fixture and example.test origin only for verification, then restores the normal preview automatically.

Git operations belong here. Use Git history for revisions; do not create vNN directories. Required source/assets stay in Website. Read AGENTS.md and the brand/asset/mascot guides before changing claims or visuals.
