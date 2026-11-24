# Website owner questionnaire

Send `Adam-Crest-Farms-Website-Questionnaire.docx` to the farm owner to complete. It contains 14 question groups, 18 editable text controls, known business details and a photo checklist. The four-page form is unprotected; answer areas expand as the owner types. Short bullet answers and "Not decided yet" are welcome.

The supplied information comes from `../BRAND_BRIEF.md`. New questions do not establish new facts. Use returned answers to update the brief and prepare revised copy; keep private responses and raw photographs out of `public/`. Retain the returned file separately from this blank questionnaire.

`build_questionnaire.py` is the optional document generator and requires Python with `python-docx`. Run it from this repository with the approved document-authoring runtime. It overwrites the blank DOCX, so never use that filename for the completed owner response. It is independent of the website build.

## Verification

Reviewed 15 November 2026. Microsoft Word rendered the corrected document as four pages; every page was visually inspected. All 18 text content controls are unlocked, there is no document protection, and the title has no decorative rule. Text, checkbox glyphs, response space and page boundaries were checked. Render evidence is kept in the ignored `.local/owner-questionnaire-review/` directory.

The packaged `render_docx.py` could not run because this Windows runtime does not bundle LibreOffice. Local Microsoft Word PDF export and bundled Poppler supplied the visual review instead. The final deliverable is the editable DOCX; the PDFs and page images are review intermediates.
