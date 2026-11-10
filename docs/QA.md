# Local website verification

Reviewed 10 November 2026 with Microsoft Edge 157.0.4341.42 via local Playwright tests. The website remains local and unpublished.

## Results

- Four Node enquiry-formatting tests passed.
- Browser checks passed at 1440, 1024, 768, 390 and 320 CSS pixels, with 900px viewport height.
- No document overflow, broken images, page/console errors, failed resources or external runtime requests were found.
- Axe scans using WCAG 2 A, 2 AA and 2.1 AA tags reported zero violations at all five widths. Automated results are not a complete accessibility audit or certification.
- Keyboard Tab reveals the skip link; Enter moves focus to main. The mobile menu closes with Escape, returns focus and closes after navigation.
- All four category links preselect the product. Enquiries include optional details, and editing invalidates stale prepared text.
- Copy works with clipboard permission. With a simulated clipboard failure, the text is selected and manual-copy instructions appear. Windows line endings are normalised only in the test comparison.
- WhatsApp has no dummy-number link. Its status is Coming soon.
- FAQ disclosures work. Navigation, FAQ and Instagram remain available without JavaScript, with a composer explanation.
- Reduced-motion mode removes entrance animation. Early and settled desktop screenshots were inspected.
- Opening public/index.html directly loads the site and prepares an enquiry without a server.

Evidence: [review/report.json](review/report.json).

## Visual review

Inspected the desktop/mobile opening, full pages, product list, farm section and enquiry section. The supplied logo remains unmodified; the full-body mascot retains its silhouette, aspect ratio and transparency.

The first pass showed an extra desktop headline line, clipped Osun State text at 320px, and decorative text competing with the mascot. Refinements reduced the heading to a 90px maximum, stacked the mobile roots title, removed the label behind the mascot and reduced the desktop character to 330px wide with 35px bottom space. Focus outlines were darkened for cream surfaces. The already-cached footer logo now loads eagerly, avoiding an unnecessary not-yet-loaded image state.

MotionSites rubric, final subjective review: first glance 8; signature 8; typography 8; composition 8; colour 9; media integration 8; motion 8; mobile 8; copy 8; polish 8. Average 8.1; none below 7. These are internal judgements, not external endorsements.

- [Desktop opening](review/desktop-hero.png) and [full page](review/desktop.png)
- [Mobile opening](review/mobile-hero.png) and [full page](review/mobile.png)
- [Mobile farm section](review/mobile-our-farm.png)
- [Desktop enquiry](review/desktop-enquire.png) and [mobile enquiry](review/mobile-enquire.png)
- [Early entrance](review/desktop-early.png)

## Limits and handoff

Automatic opening in Firefox was blocked by Computer Use because URL-policy enforcement is unsupported for the current Windows browser. Native browser control stopped there. Local automated Edge checks and screenshots completed independently. Open public/index.html manually or run npm start and visit the loopback address.

External accounts were not logged into, and no enquiry was sent. Social-account availability and responses remain unverified. Other browser engines and real mobile devices were not tested. The absent WhatsApp number is intentional and authorised. There is no inventory system, checkout or submission backend.
