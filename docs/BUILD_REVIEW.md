# Website build review

Reviewed 10 November 2026. Local work only; publication and GitHub setup are separate.

## Repository inspection

Read the parent AGENTS.md, START_HERE.md and content registry, followed by this repository's AGENTS.md, README.md, BRAND_BRIEF.md, ASSETS.md, MASCOT_GUIDE.md and asset manifest. Visually inspected the supplied logo and Option C greeting mascot.

The repository is on `main`, has no commits or remotes, and contains brand documentation and two starting images. No application, package manifest or build system exists. Existing files are untracked and must be preserved.

## Requested skill

Source: [MotionSites Web Builder](https://github.com/Motionsites-AI/claude-skill), specifically [SKILL.md](https://github.com/Motionsites-AI/claude-skill/blob/main/plugins/motionsites-web-builder/skills/motionsites-web-builder/SKILL.md).

The skill can be applied as written design guidance without installing Claude. Its useful workflow is to select relevant examples, prepare a precise build specification, integrate real assets, implement responsive behaviour, and inspect desktop/mobile screenshots before refinement.

Reviewed its specification template, craft rules, asset guidance, technique index and review rubric. Read these three examples in full:

- `3d-collectible-hero.md`: strong character placement and controlled visual layering.
- `bloom-ai-hero.md`: nature-oriented composition and serif emphasis.
- `interactive-discovery.md`: clear hierarchy and restrained entrance choreography.

Borrow composition principles and precision, not example brands, copy or complete layouts. Downloaded inspection references are cached under ignored `.local/motionsites/`; the website must not depend on that cache.

The [license](https://github.com/Motionsites-AI/claude-skill/blob/main/LICENSE) licenses instructions, references and scripts under MIT, while example prompts and media have separate website-use permission. No shelf media is selected. If any script is incorporated into tracked project tooling, retain its applicable license notice. No external installer has been run.

## Design direction

Warm, grounded, expressive. Use the existing forest green `#0C230F`, cream `#FEF8EC`, gold `#C3922C` and gold highlight `#EDC56E`. Georgia display text and Arial body text keep the established visual identity and avoid a web-font dependency.

Use the unchanged owner logo with clear space and the transparent Option C mascot at its natural aspect ratio. The mascot's name is unconfirmed and will not appear as a named character. A deliberate character composition can carry the opening section without implying that generated art is a photograph of the farm.

For an enquiry-led website, the proposed progression is: introduction, ostriches/sheep/goats/crops, the farm's Osun location and positioning, then a clear contact route. Final architecture and button copy depend on the owner's answers below. Do not invent stock lists, prices, product specifications, delivery terms, testimonials or certifications.

## Essential decisions requested

1. Main purpose: farm/product enquiries, online ordering, or education/following.
2. Preferred contact or ordering route, including a confirmed WhatsApp/phone number, email address, or approval to use Instagram DM at `@adamcrestfarms`. If online ordering is selected, establish the actual order process before building it.

These are content and functional requirements, not a routine design approval checkpoint. No answer has been assumed.

## Next implementation steps

After the essential decisions are supplied:

1. Record the confirmed purpose/contact process in BRAND_BRIEF.md and choose a suitable stack. A small enquiry site can use semantic HTML, CSS and minimal JavaScript with local assets; an actual checkout needs a separately defined order/payment process.
2. Create a precise design specification using the requested skill's method. Establish local Git history without publishing.
3. Build the complete responsive site inside this repository, with documented local startup/build commands and asset provenance.
4. Test navigation, contact actions, keyboard access, reduced motion, readable contrast and mobile layouts. Capture and visually review desktop/mobile screenshots, refine observed issues and save the verification results.
5. Show a working local preview and document remaining launch requirements. Do not configure a remote, push, publish or deploy during this stage.
