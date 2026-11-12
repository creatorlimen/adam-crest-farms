# Adam Crest Farms website

A self-contained, responsive website for exploring the farm and making product enquiries. Implemented and locally reviewed on 10 November 2026. HTML, CSS and browser JavaScript, with no runtime packages, web fonts or external asset requests.

**Status:** local preview ready. Nothing has been published or deployed; no GitHub remote is configured. The owner's annotated copy removals have been applied and reviewed on desktop/mobile. WhatsApp stays hidden until a number is supplied. Instagram is linked in the remaining enquiry steps and footer. Visitors prepare an enquiry locally, copy it, and send it themselves. The footer includes Instagram, TikTok and the Facebook page supplied by the owner on 12 November 2026.

## Open the preview

Open [public/index.html](public/index.html) in a browser. Navigation, the enquiry composer and FAQ work directly from the file. If clipboard permission is unavailable, the copy control selects the message and explains how to copy it manually.

For local HTTP development, install Node.js 22 or later and run these commands from this repository:

```sh
npm start          # Serve public/ on http://127.0.0.1:4173
npm run build      # Copy the static site into ignored dist/
npm test           # Four enquiry-formatting tests using Node's built-in runner
```

No package installation is needed for these three commands. The server binds only to this computer; stop it with Ctrl+C. Optional PORT changes the server port. No secrets, services or parent-workspace files are required.

The preview does not submit or store enquiries, process orders/payments, or include analytics. External Instagram, TikTok and Facebook links open only when a visitor follows them.

## Browser and accessibility review

Development-only packages are pinned in package-lock.json: Playwright Test 1.65.0 and axe-core's Playwright integration 4.14.0.

```sh
npm ci
npx playwright install chromium
```

With npm start running in another terminal:

```sh
npm run test:browser
```

On Windows with Microsoft Edge already installed, use it without downloading Chromium:

```powershell
$env:BROWSER_CHANNEL = 'msedge'
npm run test:browser
```

Optional PREVIEW_URL selects a different local preview address. The script writes screenshots and a JSON report to docs/review/. It checks five widths from 320 to 1440 pixels, resources, common WCAG A/AA issues, keyboard skip navigation, mobile navigation, enquiry preparation/copying, clipboard failure, reduced motion, no-JavaScript use and direct file opening. Automated checks supplement visual review; they are not accessibility certification.

See [QA.md](docs/QA.md), the [desktop preview](docs/review/desktop-hero.png), [mobile preview](docs/review/mobile-hero.png) and [automated results](docs/review/report.json).

## Editing

| File | Purpose |
|---|---|
| public/index.html | Page structure and copy |
| public/styles.css | Brand tokens, responsive layouts and motion |
| public/site-config.js | Public contact configuration |
| public/enquiry.js | Plain-text enquiry formatting |
| public/app.js | Navigation, category links and enquiry interaction |
| public/assets/ | Unchanged supplied logo and selected Option C mascot |
| scripts/serve.mjs | Loopback-only static server |
| scripts/build.mjs | Copy website to dist/ |
| scripts/review.mjs | Browser checks and screenshot capture |
| tests/enquiry.test.cjs | Enquiry unit tests |
| docs/ | Business brief, design spec, asset provenance and QA evidence |

Keep all required site media in public/assets/ and use relative paths. Read [AGENTS.md](AGENTS.md), [BRAND_BRIEF.md](docs/BRAND_BRIEF.md), [ASSETS.md](docs/ASSETS.md) and [MASCOT_GUIDE.md](docs/MASCOT_GUIDE.md) before changing claims or visuals. The original images' SHA-256 hashes are retained in the manifest. Parent-workspace paths are provenance only, never runtime dependencies. Internal docs and screenshots are not served to site visitors.

To add WhatsApp, put the **owner-confirmed international digits-only number** in whatsappNumber in public/site-config.js. The script then exposes the WhatsApp link and can attach the prepared enquiry. Also review Instagram-first instructions in index.html and app.js when choosing the final contact journey. Never insert an invented or example number into a live link. No private credentials belong in public configuration.

## Before a later launch

- Confirm the final contact method/number and check the supplied social accounts.
- Confirm any added product, price, availability, collection or delivery statements.
- Add owner-approved photographs only if desired, with provenance. Current artwork is illustrative.
- Choose hosting and verify domain access. Publication, remote configuration and pushing need their own instruction.
- Remove the preview's noindex, nofollow directive and add canonical/social metadata during the authorised launch.

Git operations belong in this repository. Local history preserves the supplied starting files and implemented site. Dependencies, build output, local caches and environment files are ignored. No vNN copies are used.
