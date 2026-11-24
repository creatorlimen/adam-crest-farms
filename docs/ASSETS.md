# Website asset guide

Updated 24 November 2026. The site uses the unchanged supplied logo and Option C mascot, plus four owner-supplied farm photographs encoded as WebP. Originals remain untouched.

| Local file | Placement | Provenance |
|---|---|---|
| [adam-crest-farms-logo.jpeg](../public/assets/brand/adam-crest-farms-logo.jpeg) | Header, footer and favicon | Unchanged owner-supplied logo |
| [ostrich-greeting.png](../public/assets/mascot/ostrich-greeting.png) | About page illustration, homepage journal feature and journal cards/articles | Unchanged Option C greeting artwork; illustrative, not a farm photograph |
| [greenhouses.webp](../public/assets/farm/greenhouses.webp) | Homepage lead and sharing image | Owner's greenhouse photograph |
| [cucumbers.webp](../public/assets/farm/cucumbers.webp) | Crops catalogue and detail page | Owner's bagged-cucumber photograph |
| [ostrich-paddock.webp](../public/assets/farm/ostrich-paddock.webp) | Ostrich catalogue and detail page | Owner's photograph of adult ostriches; not evidence of adult birds for sale |
| [nursery.webp](../public/assets/farm/nursery.webp) | About page | Owner's nursery exterior photograph |

[asset-manifest.json](asset-manifest.json) records original workspace paths, native derivative dimensions, byte sizes and SHA-256 hashes. Photograph entries also record source hashes and processing. These paths are provenance only, never build/runtime links.

Photo processing applies EXIF orientation, limits the longest side to 1280px and encodes WebP at quality 84. It does not retouch or generate image content. CSS crops the visible image for each layout; original supplied files remain in the brand library. The selected photographs contain physical farm signs as photographed. They do not replace the approved header/footer logo.

The optional maintenance script, scripts/prepare-farm-photos.py, requires Python/Pillow and an explicit source-image directory. Website setup/build only uses the committed derivatives and needs neither that directory nor Pillow.

Excluded from the supplied image folder: the sign-design contact sheet, redundant close nursery doorway and loose signage photograph. No sheep/goat photograph was supplied, so their detail pages include short photo placeholders. Do not substitute stock animals as farm photographs.

Keep the mascot's transparency and aspect ratio. The name remains unapproved. Journal captions distinguish it as an illustration, not an anatomical diagram. Do not import the full mascot kit, unused media, private questionnaire responses, source archives or caches into public. No remote image/font requests are used.
