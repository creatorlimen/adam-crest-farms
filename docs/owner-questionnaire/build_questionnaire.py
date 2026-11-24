"""Build the owner intake form with python-docx; no website content is changed."""
from pathlib import Path
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.text import WD_ALIGN_PARAGRAPH

ROOT = Path(__file__).resolve().parent
OUT = ROOT / 'Adam-Crest-Farms-Website-Questionnaire.docx'
doc = Document()
sec = doc.sections[0]
sec.page_width, sec.page_height = Cm(21), Cm(29.7)
sec.top_margin, sec.bottom_margin = Cm(1.65), Cm(1.65)
sec.left_margin, sec.right_margin = Cm(1.85), Cm(1.85)
sec.footer_distance = Cm(0.8)

for name in ['Normal', 'Title', 'Subtitle', 'Heading 1', 'Heading 2', 'Heading 3']:
    st = doc.styles[name]
    st.font.name = 'Arial'
    st.font.color.rgb = RGBColor(0, 0, 0)
    for attr in list(st._element.rPr.rFonts.attrib):
        if 'theme' in attr.lower(): del st._element.rPr.rFonts.attrib[attr]
    if st._element.pPr is not None:
        for border in list(st._element.pPr.findall(qn('w:pBdr'))):
            st._element.pPr.remove(border)
    st.paragraph_format.space_after = Pt(6)
    st.paragraph_format.line_spacing = 1.08
doc.styles['Normal'].font.size = Pt(10.5)
doc.styles['Title'].font.size = Pt(23)
doc.styles['Title'].font.bold = True
doc.styles['Heading 1'].font.size = Pt(18)
doc.styles['Heading 1'].paragraph_format.space_after = Pt(10)
doc.styles['Heading 2'].font.size = Pt(11)
doc.styles['Heading 2'].paragraph_format.space_before = Pt(10)
doc.styles['Heading 2'].paragraph_format.space_after = Pt(4)
doc.styles['Heading 2'].paragraph_format.keep_with_next = True
doc.core_properties.title = 'Adam Crest Farms website questionnaire'
doc.core_properties.subject = 'Owner facts and photographs for website content'
doc.core_properties.author = 'Adam Crest Farms'
doc.core_properties.comments = ''
doc.core_properties.keywords = 'website, owner questionnaire, products, farm story'

foot = sec.footer.paragraphs[0]
foot.alignment = WD_ALIGN_PARAGRAPH.RIGHT
run = foot.add_run('Adam Crest Farms  |  ')
run.font.name, run.font.size = 'Arial', Pt(8)
field = OxmlElement('w:fldSimple'); field.set(qn('w:instr'), 'PAGE')
foot._p.append(field)

def p(text, size=None, bold=False, after=5):
    para = doc.add_paragraph()
    para.paragraph_format.space_after = Pt(after)
    run = para.add_run(text)
    run.bold = bold
    if size: run.font.size = Pt(size)
    return para

def heading(text):
    return doc.add_paragraph(text, 'Heading 2')

def question(number, title, prompt, lines=2):
    heading(f'{number}  {title}')
    para = p(prompt, size=10, after=5)
    para.paragraph_format.keep_with_next = True
    answer(f'question_{number}', lines)

counter = 0
def answer(tag, lines=2, placeholder='Type your answer here'):
    """Unprotected Word text content control; field grows as the owner types."""
    global counter
    counter += 1
    sdt = OxmlElement('w:sdt')
    props = OxmlElement('w:sdtPr')
    alias = OxmlElement('w:alias'); alias.set(qn('w:val'), tag.replace('_', ' '))
    tag_el = OxmlElement('w:tag'); tag_el.set(qn('w:val'), tag)
    ident = OxmlElement('w:id'); ident.set(qn('w:val'), str(1000 + counter))
    showing = OxmlElement('w:showingPlcHdr')
    text = OxmlElement('w:text'); text.set(qn('w:multiLine'), '1')
    for child in [alias, tag_el, ident, showing, text]: props.append(child)
    sdt.append(props)
    content = OxmlElement('w:sdtContent')
    para = OxmlElement('w:p')
    pp = OxmlElement('w:pPr')
    shd = OxmlElement('w:shd'); shd.set(qn('w:fill'), 'F2F4F1'); pp.append(shd)
    spacing = OxmlElement('w:spacing'); spacing.set(qn('w:before'), '50'); spacing.set(qn('w:after'), '100'); spacing.set(qn('w:line'), '300'); spacing.set(qn('w:lineRule'), 'auto'); pp.append(spacing)
    ind = OxmlElement('w:ind'); ind.set(qn('w:left'), '110'); ind.set(qn('w:right'), '110'); pp.append(ind)
    para.append(pp)
    run = OxmlElement('w:r')
    rp = OxmlElement('w:rPr')
    color = OxmlElement('w:color'); color.set(qn('w:val'), '56604E'); rp.append(color)
    sz = OxmlElement('w:sz'); sz.set(qn('w:val'), '20'); rp.append(sz)
    run.append(rp)
    t = OxmlElement('w:t'); t.text = placeholder; run.append(t)
    for _ in range(lines - 1): run.append(OxmlElement('w:br'))
    para.append(run); content.append(para); sdt.append(content)
    doc._body._body.insert_element_before(sdt, 'w:sectPr')

def page(title):
    doc.add_page_break()
    doc.add_paragraph(title, 'Heading 1')

def check(text):
    para = doc.add_paragraph()
    para.paragraph_format.space_after = Pt(7)
    para.paragraph_format.left_indent = Cm(0.55)
    para.paragraph_format.first_line_indent = Cm(-0.55)
    mark = para.add_run('\u2610  '); mark.font.name = 'Segoe UI Symbol'; mark.font.size = Pt(12)
    para.add_run(text)

doc.add_paragraph('Adam Crest Farms\nwebsite questionnaire', 'Title')
p('Please help us turn the website into a useful introduction to the farm and its products. Your answers will guide the farm story, product pages, customer FAQs and photographs.', after=6)
p('Short bullet points are enough. Click a shaded answer field and type; it expands as needed. Write "Not decided yet" where necessary, and mark anything private. You do not need to write polished website copy.', size=9.5, after=9)
p('Details already provided', size=10, bold=True, after=3)
p('Adam Crest Farms | Ologobi Village, Ede South, Osun State, Nigeria\nOstriches, sheep, goats and crops | Website purpose: explore the farm and enquire\nInstagram and TikTok: @adamcrestfarms | Facebook page already supplied\nDomain: adamcrestfarms.com | WhatsApp number still pending', size=9, after=6)
p('Correct any of these details in your answers if they have changed.', size=9, after=5)
answer('completed_by_and_date', 1, 'Completed by and role:                              Date:')
question(1, 'The farm story', 'When did the farm start, who started it, and why? Why did you choose these animals and crops? Mention one milestone you would like customers to know.', 3)
question(2, 'The people behind the farm', 'Who runs the farm today? Give names and roles that may appear publicly, and any relevant experience you want mentioned.', 2)
question(3, 'Your customers', 'Who buys from you now, and who would you most like to reach? What are their main reasons for buying? Name your priority locations if relevant.', 2)
question(4, 'What customers should know about your approach', 'Describe two or three things you actually do in caring for livestock, growing crops or serving buyers. Give specific examples, and explain why they matter to customers.', 3)

page('Products and availability')
p('Please describe what is genuinely offered today. Separate current products from future plans. Date any stock or seasonal information; we will confirm it before using it on the website.', after=9)
heading('5  What do you sell in each category')
p('For each category, include the product or breed/variety, live or processed form where relevant, age/size options, selling unit, and usual season or availability. Write "Not sold" where appropriate. Add photo filenames if available.', size=10, after=7)
for label in ['Ostriches', 'Sheep', 'Goats', 'Crops']:
    heading(label)
    answer('products_' + label.lower(), 3)
question(6, 'Pricing and order sizes', 'Should the website show prices or ask buyers to request a quote? Are there minimum quantities, bulk options or factors that change the price? Include a date for any prices supplied.', 3)
question(7, 'Products to feature first', 'Which one to three products should the website give most attention to? Note anything currently unavailable or planned for later that must not be presented as available now.', 2)

page('Enquiries and buying from the farm')
question(8, 'Where customers should contact you', 'Is Instagram DM currently monitored for enquiries? Confirm the preferred channel, any public phone/WhatsApp or email when ready, and realistic contact hours or response times. WhatsApp can stay hidden until ready.', 3)
question(9, 'How an order works', 'Walk us through an ordinary order: details needed from the buyer, how stock and price are confirmed, notice required, reservations or deposits, and accepted payment methods and timing.', 4)
question(10, 'Collection delivery and visits', 'Which options do you currently offer? Describe collection arrangements, delivery areas and how charges are agreed. Are visits allowed, and by appointment? Add visitor hours, directions or a map link only if suitable for public use.', 4)
question(11, 'Questions customers ask most often', 'Give three common questions and your actual answers. Include any buying conditions customers need to know, such as cancellations or what happens if there is a problem with an order.', 6)

page('Photos and final checks')
p('Please send original photo files or a folder link alongside this document. Clear phone photos are welcome. A few strong images are enough to start; send what you already have.', after=10)
heading('Photo checklist')
p('Tick what you can supply. Include a mix of landscape and portrait images where possible.', size=10, after=8)
check('A wide view of the farm, entrance or surroundings')
check('Clear photos of the ostriches, sheep and goats actually on the farm')
check('Crops in the field and examples of produce actually offered')
check('The owner or team, with permission to feature them')
check('Everyday farm work that shows the practices you described')
check('Products ready for collection, packing or delivery, if applicable')
p('For each file, add a short caption: what it shows, roughly when it was taken, and permission to use it on the website. Flag anything outdated or private, and identify anyone pictured who should not be shown.', size=9.5, after=7)
question(12, 'Customer feedback and supporting material', 'Optional: share genuine customer feedback we may quote, with permission and the name they agree to display. List any existing records, credentials or other material that supports claims you want us to make.', 2)
question(13, 'Anything to keep private or leave out', 'Are there names, images, locations, prices, future plans or other details that must not appear publicly? Note any answers that still need confirmation.', 2)
question(14, 'Who will confirm details and future updates', 'Who should check factual questions in the finished copy and tell us when products, availability or contact details change? Give their name, role and preferred contact method for our use.', 2)
p('Before returning', size=11, bold=True, after=6)
check('I have marked uncertain answers and private information, and identified which photos and feedback we may use.')
p('Return the completed Word file with your photos or folder link. We will use the answers to prepare website copy for review; completing this questionnaire does not publish anything.', size=9.5, after=0)

doc.save(OUT)
print(OUT)
print(f'Editable answer fields: {counter}')
