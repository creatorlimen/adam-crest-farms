# Owner-led website rebuild — 24 November 2026

## Sources and scope

The user supplied `Adam Crest Farms Questionnaire.docx` and the photographs in `03_Brand/Images`, and requested a local rebuild with no filler, no unnecessary repetition, clean spacing and placeholders for missing information. The completed questionnaire remains in the parent workspace, outside the public site and repository. Its answers have been checked against the document's content controls and paragraphs. The original is not modified.

Questionnaire SHA-256: `d8449d3dcd8e89fc318f7bf95c875ae2b26c0162dbe303e3b4e2b6d36f473e0a`.

The existing Astro site, local enquiry composer, reviewed journal cards, supplied logo and selected Option C mascot are retained. No hosting, publication or external message is authorised by this work. No new dependencies are needed.

## Confirmed content

- Established in 2026. Founding aims include food production, employment and a lasting agricultural business; describe these as intentions, not measured achievements.
- Supported by farm managers, agronomists and farm staff. No named founder or staff biographies were supplied.
- Customers include households, individuals, retailers, traders, wholesalers, restaurants and other businesses. Bulk orders and supply enquiries are welcomed.
- Named crops: cucumbers, tomatoes and green and coloured bell peppers. Fruit is mentioned without varieties; do not invent a fruit range.
- Ostrich products: fertilised eggs and chicks aged 4–8 weeks. Adult ostriches appear in a supplied photograph; that photograph does not establish adult birds for sale.
- Sheep labels supplied: Balami, Saudanis, Koroji and Huda. Keep the owner's spellings. The parenthetical “Malian, Chadian, Nigeria” is ambiguous and is not converted into breed-origin or import claims.
- Prices by quotation. Availability follows stock/harvest cycles and must be confirmed for an enquiry.
- Existing address and social links remain confirmed, including the exact Facebook profile URL.

## Missing information

Goat breeds and sale options; sheep/goat photographs; fruit varieties; preferred final contact channel and phone/email; ordering steps; collection/delivery coverage and terms; visit arrangements; named team members; substantiated farming-practice details; customer FAQs and permissioned testimonials.

Public placeholders are limited to the missing sheep/goat photographs, goat sale details and collection/delivery/visit arrangements. No empty biography, testimonial, statistics or FAQ sections are created. WhatsApp stays hidden as requested in the earlier annotated review; its configuration remains null. Instagram is the existing interim enquiry route, not a newly confirmed ordering policy. The form prepares a message locally and the visitor sends it themselves.

## Layout and copy decisions

1. Cream introduction with a short crop/livestock headline and a real greenhouse photograph.
2. Four concise product cards, with a single shared availability/pricing note. Product links preselect the enquiry category.
3. A nursery photograph and a short origin story, with the mascot used as a small supporting illustration.
4. A homepage journal feature drawn from the same eligible article collection as the blog. Local drafts stay labelled; production excludes them. The existing full journal remains a responsive card grid.
5. A quote composer with one instruction and a clear copy-to-Instagram handoff.

Keep the full location and positioning line in the footer rather than repeating them throughout the homepage. Remove the previous non-answers in the FAQ and decorative Osun panel. Use forest green, cream and restrained gold with Georgia/Arial and responsive spacing. Respect reduced motion and provide keyboard focus states.

## Photography

Use four owner-supplied photographs: greenhouses, bagged cucumbers, adult ostriches in their paddock and the nursery exterior. Encode local WebP derivatives without retouching. Preserve source originals, record hashes and dimensions in the asset manifest, and use accurate scene-based alternative text.

Exclude the sign-design contact sheet, the redundant close nursery doorway and the loose signage photograph. These do not add a distinct farm scene. No stock or generated farm photographs are substituted.

## Review requirements

Inspect desktop and mobile renders, photo crops, placeholder distinction, heading hierarchy, text density and spacing. Test category-to-enquiry selection, preparing/copying messages, Instagram handoff, navigation, no-JavaScript fallback and direct-file preview. Re-run existing content/publication checks so the homepage journal cannot expose drafts in production. Record results in QA.md and docs/review/.
