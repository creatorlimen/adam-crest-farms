# Adam Crest Farms — rooted in Osun

Build specification, 10 November 2026. Uses the requested MotionSites specification and screenshot-review method. See BUILD_REVIEW.md for reference provenance.

Final review adjustments: the heading has a 90px maximum; the desktop mascot is 330px wide with 35px bottom space; the decorative label behind its head is hidden; the mobile roots title stacks Osun and State. These final values supersede the initial dimensions below where different. See QA.md.

The owner's later annotated review removes the circled hero/farm/enquiry copy, including the hero location strip, repeated positioning/address, form headings, WhatsApp notice and separate Instagram block. The remaining Instagram instruction links directly to the profile. This approved simplification supersedes the original section-copy specification below. The Facebook footer link awaits the exact URL.

## Purpose and scope

A complete farm introduction and product-enquiry website for end consumers across Nigeria. The owner confirmed the purpose on 10 November 2026. WhatsApp is not ready; placeholders are expressly authorised. Show an honest coming-soon state instead of an invented number. Keep a contact configuration file ready for the real number. The supplied Instagram identity provides a profile link for the preview; do not invent an email or Facebook URL.

The visitor journey is welcome → products → farm/location → practical questions → enquiry. No checkout, inventory, payment processing, availability claims, or collection of submissions. An enquiry composer prepares text locally that a visitor can copy. The interface must state the next step and never claim a message has been sent.

## Stack and source

Semantic HTML, hand-written CSS and browser JavaScript in `public/`, with no runtime packages, web fonts or CDN resources. Node 22+ built-ins provide local serving, a static build and basic integrity checks. `npm start` serves `public` on loopback; `npm run build` copies only the website into `dist`. Internal notes, originals' provenance and QA stay outside the public site. The page also works by opening `public/index.html` directly.

## Signature and composition

Mood: warm, grounded, expressive. A large serif message occupies the left half of a forest-green opening; the full-body Option C ostrich greets the visitor from a cream arch on the right. The arch is a graphic frame, not farm imagery. Keep both feet and wing tips clear. The unchanged supplied logo sits in its own light square at the top left, paired with a restrained text identifier. No generic stock photography, fabricated farm scenes, ornamental statistics or certification badges.

Desktop content width is 1240px with gutters `clamp(22px, 5vw, 80px)`. The header is 104px tall, in normal document flow, with three navigation links and one enquiry CTA. The main hero grid uses `1.2fr 1fr` and 64px of gap, with 48px top and 72px bottom padding. The headline is Georgia, 400 weight, `clamp(56px, 6.9vw, 100px)`, line height 1.02, tracking -0.045em. Break after “Osun.” and “for”. Emphasise “Nigeria.” in gold-highlight italic. Supporting text is 18px Arial at 1.65 line height, max-width 420px. The two actions sit below with 28px top margin. The left eyebrow is 11px bold Arial, tracking 0.18em, uppercase.

The mascot stage has a maximum width of 430px and height of 540px. Its cream arch uses a 220px top radius and a 12px bottom radius. The mascot is a single image fitted with `contain`, maximum width 350px, unchanged aspect ratio 2:3. Small supporting type below the figure says “A warm welcome from Adam Crest Farms.” The mascot remains unnamed.

## Tokens and type

- Forest: `#0C230F`, for the opening, body text, buttons and footer.
- Cream: `#FEF8EC`, the principal light surface and reversed text.
- Gold: `#C3922C`, ornamental lines and selected-control edges.
- Gold highlight: `#EDC56E`, headline emphasis and filled controls on dark surfaces.
- Muted ink: `#56604E` on cream; muted cream: `#C7CEBC` on forest.
- Soft surface: `#F3EDDF`; borders: `#D8DCCB` or 20% cream on dark.

Georgia handles all display text, with Times New Roman and serif fallbacks. Arial handles all UI and body text, with Helvetica and sans-serif fallbacks. Section titles use `clamp(38px, 4.5vw, 64px)` at 1.05 line height and -0.035em tracking. Body copy is 16–18px at 1.65. Labels never drop below 11px. Buttons have 48px minimum height, 22px horizontal padding, and a pill radius. Arrow SVGs are decorative with empty accessible semantics; visible labels supply their meaning. Focus uses a 3px outline offset by 5px.

## Content and sections

1. Hero: “Rooted in Osun. Growing for Nigeria.” Subline: “Welcome to Adam Crest Farms. Discover our ostriches, sheep, goats and crops, and start a conversation about what you're looking for.” Actions: “Explore the farm” and “Make an enquiry”. A narrow base strip gives only confirmed facts: Ologobi Village, Ede South, Osun State.
2. Products: cream background, 96px vertical padding. Intro at left and four open, numbered rows at right. Titles: Ostriches, Sheep, Goats, Crops. Each row explains that current options need confirmation and supplies an “Enquire” link which preselects that category in the enquiry form. Rows use dividers rather than repeated boxed cards. Large serif category names create a catalogue rhythm without pretending this is live inventory.
3. Our farm: two columns on a slightly darker cream surface. One typography-led forest panel displays “Osun State / Our roots. Your connection.” with simple decorative field lines. The other contains the supplied positioning and location. Copy describes the four areas of the farm and invites conversation; it makes no unsupported farming-method claims. The address is text, with no fabricated map coordinates or visiting hours.
4. Questions: three native details disclosures covering availability, collection/delivery and visiting. Answers tell visitors what to confirm with the farm. They do not establish policies or promises.
5. Enquiries: forest-green section, 96px padding. Left column explains the three steps: choose a category, prepare/copy the enquiry, open Instagram to send it. Show “WhatsApp · Coming soon” as an informational status. Right column is a cream form with a category select, optional location field and optional detail textarea. A submit button prepares a message in a labelled read-only textarea; a copy button copies it with an honest status announcement. An Instagram link remains available even before composing. No remote request occurs on form submission. An empty optional field does not become a placeholder in the finished enquiry.
6. Footer: logo, name, short positioning, Instagram/TikTok links, local address and return-to-top link. No fabricated contact details or unverified Facebook link.

## Motion and responsive behaviour

Use a 650ms fade-and-rise entrance with `cubic-bezier(.22,1,.36,1)`; stagger hero groups by 80ms and end all entrances within 1 second. Hover arrows shift 3px over 180ms. No endless bobbing, parallax, scroll hijacking or blocking preloaders. A reduced-motion media query removes entrance animations, transforms and smooth scrolling. Content is visible by default and remains available without JavaScript.

At 1000px, reduce the hero gap and type slightly. At 760px, stack all sections, change the header to a menu button plus logo/identifier, and place the mascot below the hero actions. Use 22px side gutters, 52–64px section padding and 52px headline text. The mascot is 240px wide and its arch is 300px tall. At 400px, reduce headline to 46px and keep control text wrapping naturally. At 320px, retain every control with at least 44px touch height and no horizontal scrolling.

The mobile menu is an inline disclosure, not a modal. Its button exposes `aria-expanded` and `aria-controls`; Escape closes it and returns focus; anchor selection closes it; desktop resizing resets it. The enquiry composer uses real labels and a polite live region. Copy failure selects the message and provides a manual-copy instruction. Without JavaScript, native anchors/details and social links remain functional, and a noscript explanation replaces the composer controls.

## Acceptance and review

Test 1440px, 1024px, 768px, 390px and 320px widths. Verify no overflow, clipped character, broken images, console errors or unintended remote resource requests. Check mobile menu keyboard behaviour, all four category actions, form generation, clipboard success/fallback, HTML without JavaScript and reduced motion. Verify unchanged original logo/mascot hashes. Inspect desktop, mobile, and early-entry screenshots using the MotionSites rubric; record observed fixes and final results in QA.md. Keep a local preview available and record remaining contact/launch work in README.md.
