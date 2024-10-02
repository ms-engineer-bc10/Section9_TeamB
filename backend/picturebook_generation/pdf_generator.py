from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from PIL import Image
from io import BytesIO

# IPAexゴシックフォントを登録
pdfmetrics.registerFont(TTFont('IPAexGothic', '/usr/share/fonts/opentype/ipaexfont-gothic/ipaexg.ttf'))

def create_storybook_pdf(images, story_pages, title, output_path=None):
    # A4サイズの横向きを使用
    page_width, page_height = landscape(A4)
    
    # PDFをメモリ上に作成
    pdf_buffer = BytesIO()
    c = canvas.Canvas(pdf_buffer, pagesize=landscape(A4))

    # スタイルの定義
    title_style = ParagraphStyle(
        'Title',
        fontName='IPAexGothic',
        fontSize=24,
        leading=28,
        alignment=1  # 中央揃え
    )
    
    body_style = ParagraphStyle(
        'Body',
        fontName='IPAexGothic',
        fontSize=20,  # 文字サイズを20ポイントに変更
        leading=24
    )

    # 表紙の作成
    cover_image = images[0]
    pil_img = Image.open(cover_image)
    img_width, img_height = pil_img.size
    aspect = img_height / float(img_width)
    img_width = page_width / 2 - 2*cm  # 横幅をA4半分に
    img_height = img_width * aspect
    c.drawImage(cover_image, page_width / 2 + cm, (page_height - img_height) / 2, width=img_width, height=img_height)

    # タイトルの描画
    title_paragraph = Paragraph(title, title_style)
    title_width = page_width / 2 - 2*cm
    title_paragraph.wrapOn(c, title_width, page_height - 2*cm)
    title_paragraph.drawOn(c, cm, page_height / 2)

    c.showPage()

    # ストーリーページの作成
    for img, story in zip(images[1:], story_pages):
        # 画像の描画
        pil_img = Image.open(img)
        img_width, img_height = pil_img.size
        aspect = img_height / float(img_width)
        img_width = page_width - 2*cm
        img_height = img_width * aspect
        c.drawImage(img, cm, page_height - img_height - cm, width=img_width, height=img_height)

        # テキストの描画
        text_paragraph = Paragraph(story, body_style)
        text_paragraph.wrapOn(c, page_width - 2*cm, page_height - img_height - 3*cm)
        text_paragraph.drawOn(c, cm, cm)

        c.showPage()

    # PDFの保存
    c.save()
    
    pdf_content = pdf_buffer.getvalue()
    
    # ファイルシステムにも保存する場合
    if output_path:
        with open(output_path, 'wb') as f:
            f.write(pdf_content)
    
    return pdf_content