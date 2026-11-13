# Website asset guide

The website uses the two supplied images. Both originals remain unchanged. Placements were implemented and visually reviewed on 10 November 2026.

| Local file | Intended use | Provenance |
|---|---|---|
| [adam-crest-farms-logo.jpeg](../public/assets/brand/adam-crest-farms-logo.jpeg) | Header, footer and favicon | Unchanged owner-supplied logo |
| [ostrich-greeting.png](../public/assets/mascot/ostrich-greeting.png) | Full-body hero welcome illustration | Production-checked Option C character kit v01; generated artwork |

[asset-manifest.json](asset-manifest.json) records original workspace paths, dimensions, bytes and SHA-256 hashes. Those paths are provenance notes, not runtime links. Both files were copied unchanged and verified against their originals.

The logo is JPEG with its existing background. The mascot is RGBA PNG with transparency. Keep originals intact; add separately named, optimised derivatives when layout and performance requirements are known, and record them in the manifest.

Do not import the full mascot kit, unused photography, source archives or video render caches. Add only assets chosen for the website. Keep this guide and provenance outside public so the asset directory contains only media intended for visitors.

The decorative arch, rings and field lines are CSS shapes created for this website. Navigation symbols are small inline SVG paths. They do not depict the real farm. No stock media, remote fonts or external image requests are used.

On 12 November 2026 the unchanged greeting mascot was also selected for the journal's first article/card and its sharing metadata. Its caption identifies it as an illustration; it is not an anatomical diagram or farm photograph. No additional media was imported. Article metadata records native dimensions and alternative text.

