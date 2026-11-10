# Adam Crest Farms website

A standalone repository for the farm's website. Prepared on 8 November 2026.

**Current state:** Git initialised on `main`; brand context and two starting images included. Website implementation has not started. No framework, hosting provider or package dependencies have been selected. There is no GitHub remote or initial commit yet.

## Start here

Read [AGENTS.md](AGENTS.md), the [brand brief](docs/BRAND_BRIEF.md) and the [asset guide](docs/ASSETS.md) before building. These files contain the context needed without access to the original chat or parent workspace.

```text
Website/
  .git/
  .gitignore
  .gitattributes
  AGENTS.md
  README.md
  docs/
    BRAND_BRIEF.md
    MASCOT_GUIDE.md
    ASSETS.md
    asset-manifest.json
  public/assets/
    brand/adam-crest-farms-logo.jpeg
    mascot/ostrich-greeting.png
```

The images are starting assets; their page placements will be chosen during design. No unused pose library, videos, carousel exports or source ZIPs are bundled. Asset originals and SHA-256 hashes are documented in the manifest.

## Development and Git

Run Git and future build commands from this directory. This is the repository root; its parent content library is outside its scope. Use Git history for website revisions, rather than separate vNN folders.

The project currently has no development server or build command. Add the actual commands here after choosing and implementing the stack.

Dependencies, build output, local environment files, credentials and caches are ignored. Keep package lockfiles in version control. Any future environment template must contain placeholder values only.

When adding an image or other media, copy only what the site uses into this repository and update the asset manifest. Website runtime code must use local copies, with no dependency on files outside this repository.

## Next task

Build the website from the saved brief, resolve material missing business details, and keep this README current. GitHub creation, remote configuration, pushing and deployment are separate from this completed repository setup.
