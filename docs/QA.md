# Local website verification

## EuniqueFarmé reference redesign, 26 November 2026

Reviewed the cover and product grid at desktop and phone sizes, plus the feature cards, story, farm tour, quote form and individual product layout. The homepage follows the reference sequence and adds the existing journal before the quote form. Buyer groups occupy the reference's testimonial section. Farm photographs and generated product illustrations have distinct uses and provenance.

All eight unit tests, production and preview publication checks, and browser tests passed. Edge checks covered eight farm pages and four journal pages from 320 to 1440 pixels. The slideshow advanced automatically, stayed paused after pausing and supported manual selection. Catalogue filters worked on reload, browser Back and the direct-file preview. Product links, related products, preselected enquiries, clipboard and JavaScript-disabled fallbacks were checked.

[Desktop](review/multipage/desktop-home.png) · [Mobile](review/multipage/mobile-home.png) · [Browser results](review/multipage/report.json)

## Homepage restoration, 25 November 2026

The hero now jumps to four product entries. The nursery photograph and founding story link to About. Home and Contact share the enquiry form. The three original homepage bookmarks now land directly on their sections.

The local review followed all four homepage product links, prepared and copied an ostrich enquiry on Home, and followed a product-specific quote request through Contact. Checks covered five widths from 320 to 1440 pixels, keyboard navigation, JavaScript-disabled fallbacks and opening the site directly from disk. Review images show the full page at [desktop](review/multipage/desktop-home.png) and [phone](review/multipage/mobile-home.png) sizes.

## Multipage redesign, 24 November 2026

The main navigation now opens Home, Products, About, Farm journal and Contact. The catalogue has four dedicated product pages. Product enquiries pass the selected category to Contact through the URL, including in the direct-file preview.

- All eight unit tests and the publication lifecycle checks passed with the expanded sitemap. Draft and future articles remain filtered in production.
- Local Edge browser checks covered eight farm routes and four journal routes at 320, 390, 768, 1024 and 1440 pixels. The scans reported zero overflow, broken images, external runtime requests or automated WCAG violations.
- All four catalogue-to-contact journeys, copy and manual-copy fallback, keyboard navigation, JavaScript-disabled navigation, old homepage bookmarks, article-to-enquiry navigation and the 404 recovery path passed.
- Desktop and phone screenshots were reviewed. The arched homepage photograph echoes the nursery roof, and the desktop crop was adjusted to show the farm sign. Sheep and goats use compact text entries in the catalogue and photo placeholders on their individual pages.

[Farm page checks and screenshots](review/multipage/report.json) · [Journal checks](review/blog-browser-report.json) · [Publication checks](review/blog-build-report.json)

Earlier questionnaire-based homepage review: 24 November 2026 with Microsoft Edge 158.0.4370.33 via local Playwright. The website and journal remain local and unpublished. Earlier review notes are retained below; shared screenshot filenames now show the latest rebuild, and earlier versions remain in Git history.

## Owner questionnaire rebuild, 24 November 2026

- Rebuilt the homepage around the owner's actual products, founding year and photographs. Removed the repetitive FAQ, decorative Osun panel and generic product paragraphs. The shared navigation, journal introduction and article enquiry callout are shorter.
- Selected and inspected four actual farm photographs. Local WebP derivatives preserve the supplied scenes; logo and mascot masters remain unchanged. No stock animals, invented contact details, credentials, testimonials or fulfilment claims were added. Missing sheep/goat photos, goat sale details and fulfilment/visit arrangements remain explicit placeholders.
- `npm test`: all eight tests passed. `npm run test:build`: all publication-lifecycle checks passed and restored the local preview. Added homepage coverage confirms that only eligible posts appear in production, drafts/future posts do not leak through the feature, and an empty feature is omitted while the supporting mascot stays visible.
- `npm run test:browser`: homepage and four journal routes passed at 1440, 1024, 768, 390 and 320px. No horizontal overflow, broken images, page/console errors, failed resources, external runtime requests or axe WCAG A/AA findings. Automated checks do not constitute accessibility certification.
- Product links preselect all four enquiry categories. Preparing, copying, editing and clipboard-failure recovery work; the result provides the supplied Instagram profile in a new tab. The website does not send an enquiry. Confirmed product wording, 2026 structured data, intentional placeholders and absent dummy WhatsApp links were checked.
- Homepage → journal index → full article and article → enquiry journeys passed. Keyboard skip/menu, article contents, internal links, no-JavaScript reading/navigation, direct-file preview and nested 404 recovery passed. Article research/publication dates and source content were not changed by the layout rebuild.
- Visually inspected the full desktop page, mobile layout, all homepage sections, narrow 320px layout, early desktop render, journal index and article opening. Fixed joined mobile heading words with real whitespace, reduced mobile photo placeholders to 100px and adjusted the hero's mobile crop to retain more of the physical farm sign. Lazy images are decoded explicitly in the review harness before image checks.
- MotionSites final subjective rubric: first glance 8, signature 7, typography 8, composition 8, colour 9, media 8, motion 7, mobile 8, copy 9, polish 8; average 8.0. Restrained hover/focus feedback and reduced-motion support suit this content-led layout. Better close-up livestock photographs would improve the product presentation; current photo limitations are not hidden with stock media.

Evidence: [homepage report](review/report.json), [journal report](review/blog-browser-report.json), [publication report](review/blog-build-report.json), [desktop homepage](review/desktop.png), [mobile homepage](review/mobile.png), [homepage journal feature](review/desktop-home-journal.png), [journal index](review/desktop-journal-opening.png).

## Journal preview cards, 15 November 2026

- Replaced the horizontal editorial row with the owner's reference-inspired rounded card: image, overlaid category badge, bold title, excerpt, date, reading-time/draft pills and full-width Read article button. The shared component covers the journal, topic archives and related posts.
- The local preview build succeeded. All four journal routes passed the existing browser review at 1440, 1024, 768, 390 and 320px: no overflow, broken images, console/page errors, external runtime requests or axe WCAG A/AA findings. Internal links, keyboard navigation, no-JavaScript reading, direct-file navigation, article schema and the enquiry journey passed.
- Targeted layout checks confirmed four columns at 1200px and above, two at 640-1199px and one below 640px. Tested both sides of each breakpoint plus 320px and 390px. The actual preview contains only the existing researched draft.
- Image, title and button each opened the correct full article. Keyboard Tab reached the button, its gold focus outline remained visible, and Enter opened the article. The initial keyboard check read the URL before navigation completed; waiting for navigation resolved that test timing issue without a site change.
- A temporary browser-only four-card fixture with varied excerpt lengths confirmed equal card heights and aligned buttons. No fixture posts were written to content or output. Visually inspected desktop/mobile previews, the focused card and the fixture layout; the mascot retains its proportions.
- The browser report now records the actual run date instead of a fixed historical date. Existing publication filtering and article content were unchanged, so the publication-lifecycle checks were not repeated for this presentation change.

Evidence: [card layout and navigation report](review/journal-card-report.json), [journal browser report](review/blog-browser-report.json), [desktop journal](review/desktop-journal.png), [mobile journal](review/mobile-journal.png), [keyboard focus](review/journal-card-focus.png).

## Earlier homepage results, 13 November 2026

- Eight Node tests passed: enquiry formatting, article eligibility, sitemap filtering, relative links and structured-data escaping.
- Browser checks passed at 1440, 1024, 768, 390 and 320 CSS pixels, with 900px viewport height.
- No document overflow, broken images, page/console errors, failed resources or external runtime requests were found.
- Axe scans using WCAG 2 A, 2 AA and 2.1 AA tags reported zero violations at all five widths. Automated results are not a complete accessibility audit or certification.
- Keyboard Tab reveals the skip link; Enter moves focus to main. The mobile menu closes with Escape, returns focus and closes after navigation.
- All four category links preselect the product. Enquiries include optional details, and editing invalidates stale prepared text.
- Copy works with clipboard permission. With a simulated clipboard failure, the text is selected and manual-copy instructions appear. Windows line endings are normalised only in the test comparison.
- WhatsApp has no dummy-number link. Its coming-soon notice was removed following the owner's annotated review; the unconfigured link stays hidden.
- FAQ disclosures work. Navigation, FAQ and Instagram remain available without JavaScript, with a composer explanation.
- Reduced-motion mode removes entrance animation. Early and settled desktop screenshots were inspected.
- Opening the generated dist/index.html directly loads the site and prepares an enquiry without a server.

Evidence: [review/report.json](review/report.json).

## Blog foundation, 13 November 2026

- Astro 6.4.8 builds the preserved home page plus journal, topic, article, editorial-policy and 404 pages into static HTML. The approved draft and its four sources are included in the local preview.
- Production lifecycle tests passed: preview stays noindex; production excludes drafts/future articles and their empty categories; canonical URLs and sitemap use the configured origin; valid published content gets its genuine date. A published article with no publication date fails. A clean rebuild removes a previously generated article. The test fixture was removed and the normal draft preview restored.
- Journal index, category, article and editorial-policy pages passed at 1440, 1024, 768, 390 and 320px: zero overflow, broken images, console/page errors, external runtime requests or axe WCAG A/AA findings. All generated internal links/resources resolved.
- Keyboard skip/menu, contents anchors and the article-to-home enquiry journey passed. Article JSON-LD has BlogPosting/breadcrumb data and no fabricated publication date. Reading and navigation work without JavaScript and directly from file URLs. Nested missing URLs return a styled HTTP 404 with a working home link.
- The test harness now waits for network idle before checking lazy images. The initial immediate image check ran before loading completed; no broken image URL was found.
- Visually inspected full desktop/mobile journal and article pages, their opening views, and the shared header/footer. The mascot keeps its native proportions. No changes were needed to the approved home copy.
- MotionSites rubric, subjective review: first glance 8, signature 8, typography 9, composition 8, colour 9, media 8, motion 8, mobile 8, copy 8, polish 8 (average 8.2; none below 7).

Evidence: [build lifecycle report](review/blog-build-report.json), [blog browser report](review/blog-browser-report.json), [desktop journal](review/desktop-journal-opening.png), [mobile journal](review/mobile-journal.png), [desktop article](review/desktop-article.png), [mobile article](review/mobile-article.png).

Tooling note: the installed Node 22.14 runtime completed all builds and tests. The locked, unused font-fetching dependency undici declares Node >=22.19, so that is the documented minimum for fresh installs. No global Node upgrade was performed. Dependency transfers initially reset; the final cached install completed. No runtime font download is used by the website.

## Visual review

### Facebook footer, 12 November 2026

Added the owner's exact Facebook page URL beside Instagram and TikTok. Checked the footer at 1440, 768, 390 and 320 CSS pixels with Microsoft Edge 157.0.4341.46, including direct file opening with JavaScript disabled. All three links remain visible without horizontal overflow and retain 44px-high targets. The Facebook link is keyboard-focusable and has the supplied URL, new-tab target and noopener/noreferrer attributes. No external account was opened.

Visually inspected all four footer captures. The static build and Git whitespace check passed. Earlier full-page and interaction results below remain from 10 November; this bounded link change received a targeted footer review.

Evidence: [footer report](review/facebook-footer-report.json), [desktop footer](review/desktop-footer.png), [mobile footer](review/mobile-footer.png), [768px footer](review/width-768-footer.png), [320px footer](review/width-320-footer.png).

### Annotated revision, 10 November 2026

Removed every blue-circled element in the supplied hero, farm and enquiry screenshots. Retained the uncircled content, including footer positioning/address and the optional marker on the enquiry-details field. Added spacing before the farm section's remaining contact action. The remaining step-3 Instagram instruction is clickable; the removed contact block has not been reintroduced. The owner supplied the Facebook page URL on 12 November 2026; see the footer review above.

The existing five-width browser review passed again, including the enquiry interactions, reduced motion, no-JavaScript fallback and zero common WCAG A/AA findings. Visually inspected the revised desktop hero, farm and enquiry sections, mobile enquiry, and both footer layouts. Updated screenshots are in review/. Earlier screenshots are retained in Git history.

### Initial implementation

Inspected the desktop/mobile opening, full pages, product list, farm section and enquiry section. The supplied logo remains unmodified; the full-body mascot retains its silhouette, aspect ratio and transparency.

The first pass showed an extra desktop headline line, clipped Osun State text at 320px, and decorative text competing with the mascot. Refinements reduced the heading to a 90px maximum, stacked the mobile roots title, removed the label behind the mascot and reduced the desktop character to 330px wide with 35px bottom space. Focus outlines were darkened for cream surfaces. The already-cached footer logo now loads eagerly, avoiding an unnecessary not-yet-loaded image state.

MotionSites rubric, final subjective review: first glance 8; signature 8; typography 8; composition 8; colour 9; media integration 8; motion 8; mobile 8; copy 8; polish 8. Average 8.1; none below 7. These are internal judgements, not external endorsements.

- [Desktop opening](review/desktop-hero.png) and [full page](review/desktop.png)
- [Mobile opening](review/mobile-hero.png) and [full page](review/mobile.png)
- [Mobile farm section](review/mobile-our-farm.png)
- [Desktop enquiry](review/desktop-enquire.png) and [mobile enquiry](review/mobile-enquire.png)
- [Early entrance](review/desktop-early.png)

## Limits and handoff

During the initial build, automatic opening in Firefox was blocked by Computer Use because URL-policy enforcement is unsupported for the current Windows browser. Native browser control stopped there. Local automated Edge checks and screenshots completed independently. Open the built dist/index.html manually or run npm start and visit the loopback address.

External accounts were not logged into, and no enquiry was sent. Social-account availability and responses remain unverified. Other browser engines and real mobile devices were not tested. The absent WhatsApp number is intentional and authorised. There is no inventory system, checkout or submission backend.
