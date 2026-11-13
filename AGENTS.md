# Adam Crest Farms website instructions

This directory is an independent Git repository. Read README.md, docs/BRAND_BRIEF.md, docs/ASSETS.md and docs/MASCOT_GUIDE.md before website work.

## Scope and continuity

- Work inside this repository. Use Git history for revisions; do not create vNN copies of the website.
- Keep the repository independently usable after cloning. The parent Adam Crest Farms workspace is an optional source library, not a build/runtime dependency.
- Use public/assets for media actually used by the site. Keep research, provenance and internal implementation notes under docs, outside public.
- Update the README with real setup/build commands, current implementation status and important unfinished work. Record new confirmed brand facts in the brief.
- Preserve existing user changes. The setup request authorised local preparation only; it did not authorise a GitHub push or deployment.

## Brand and content

- Use the supplied logo unchanged and the selected Option C mascot. Preserve the mascot's aspect ratio and transparency.
- The mascot name is not final: “Crestie” is provisional. Do not publish it as an approved name without confirmation.
- Follow the verified business facts and claim limits in the brand brief. Never invent prices, availability, delivery guarantees, certifications, testimonials, phone numbers or email addresses.
- General educational illustrations are not photographs of the owner's farm.
- Existing carousel and video formats supply brand references, not a required website layout. Design for responsive web use and accessibility.

## Development

- The site uses Astro to generate static HTML, with file-based Markdown articles. Read docs/BLOG_WORKFLOW.md for research, drafts, dates, publication filtering and article updates. Hosting remains unselected.
- Preserve .gitignore coverage for dependencies, generated output, local environment files and credentials. Commit sanitised examples and lockfiles as appropriate.
- Use relative or application-root paths to copied assets, never machine-specific C: paths.
- Document any new dependency, media source and required environment variable.
- During implementation, verify responsive layouts, keyboard access, readable contrast and meaningful image alternatives. Respect reduced-motion preferences for any animation.
