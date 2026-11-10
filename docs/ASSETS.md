# Website asset guide

Only two starting images are included. Page placements are not implemented yet.

| Local file | Intended use | Provenance |
|---|---|---|
| [adam-crest-farms-logo.jpeg](../public/assets/brand/adam-crest-farms-logo.jpeg) | Brand identification in the website layout | Unchanged owner-supplied logo |
| [ostrich-greeting.png](../public/assets/mascot/ostrich-greeting.png) | Welcoming mascot placement | Production-checked Option C character kit v01; generated artwork |

[asset-manifest.json](asset-manifest.json) records original workspace paths, dimensions, bytes and SHA-256 hashes. Those paths are provenance notes, not runtime links. Both files were copied unchanged and verified against their originals.

The logo is JPEG with its existing background. The mascot is RGBA PNG with transparency. Keep originals intact; add separately named, optimised derivatives when layout and performance requirements are known, and record them in the manifest.

Do not import the full mascot kit, unused photography, source archives or video render caches. Add only assets chosen for the website. Keep this guide and provenance outside public so the asset directory contains only media intended for visitors.

