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
- WhatsApp has no dummy-number link. Its coming-soon notice was removed following the owner's annotated review; the unconfigured link stays hidden.
- FAQ disclosures work. Navigation, FAQ and Instagram remain available without JavaScript, with a composer explanation.
- Reduced-motion mode removes entrance animation. Early and settled desktop screenshots were inspected.
- Opening public/index.html directly loads the site and prepares an enquiry without a server.

Evidence: [review/report.json](review/report.json).

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

Automatic opening in Firefox was blocked by Computer Use because URL-policy enforcement is unsupported for the current Windows browser. Native browser control stopped there. Local automated Edge checks and screenshots completed independently. Open public/index.html manually or run npm start and visit the loopback address.

External accounts were not logged into, and no enquiry was sent. Social-account availability and responses remain unverified. Other browser engines and real mobile devices were not tested. The absent WhatsApp number is intentional and authorised. There is no inventory system, checkout or submission backend.
