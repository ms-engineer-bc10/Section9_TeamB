import openai
from django.conf import settings
from PIL import Image
import requests
from io import BytesIO

client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

def generate_images(story_pages, child, book_title):
    images = []
    main_character_prompt = f"A friendly-looking {child.gender} child named {child.name}, "
    style_prompt = "in a warm, colorful children's book style. Consistent character design and art style throughout all images. Soft, gentle colors and simple, expressive shapes."
    
    try:
        # 表紙の生成
        cover_prompt = f"Create a picturebook cover for a children's book titled '{book_title}'. The title '{book_title}' should be prominently displayed on the cover. A friendly-looking {child.gender} child named {child.name}, with large, joyful eyes, wearing a bright, simple outfit. The image is rounded, and cute art style with soft pastel colors. The overall atmosphere is warm and welcoming. Consistent design throughout the book. Illustration in portrait format for a book cover."
        cover_image = generate_single_image(cover_prompt, is_cover=True)
        images.append(cover_image)
        
        # ストーリーページの生成
        for page_content in story_pages:
            prompt = f"Illustration for a children's book double-page spread: {page_content}. Featuring a friendly-looking {child.gender} child named {child.name}, with large, joyful eyes and a bright, simple outfit. The background is simple, with a cozy living room or playful park setting. Keep the focus on the child and avoid distracting details. The scene should feel playful and engaging. Illustration in wide landscape format for a book spread, maintaining character consistency across all pages."
            page_image = generate_single_image(prompt)
            images.append(page_image)
        
        return images
    except Exception as e:
        print(f"画像生成中にエラーが発生しました: {str(e)}")
        return []

def generate_single_image(prompt, is_cover=False):
    prompt += " 重要: この画像には一切のテキスト、文字、記号を含まないでください。純粋に視覚的な要素のみで構成してください。また、1枚目の画像のテイストに2枚目以降は同じスタイルにしてください。"
    
    response = client.images.generate(
        prompt=prompt,
        n=1,
        size="1024x1024",
        model="dall-e-3",  # DALL-E 3モデルを使用
        quality="standard",
        style="vivid"  # スタイルの一貫性を高めるためにvividスタイルを使用
    )
    
    image_url = response.data[0].url
    image_response = requests.get(image_url)
    image = Image.open(BytesIO(image_response.content))
    
    if is_cover:
        # 表紙のサイズ調整（A4縦置きの半分）
        a4_width, a4_height = 210, 297  # A4サイズ（mm）
        cover_width, cover_height = a4_width, a4_height // 2
        image = image.resize((cover_width, cover_height), Image.LANCZOS)
    else:
        # ストーリーページのアスペクト比調整（16:9）
        width, height = image.size
        target_ratio = 16 / 9
        current_ratio = width / height
        
        if abs(current_ratio - target_ratio) > 0.01:  # 許容誤差
            if current_ratio > target_ratio:
                new_width = int(height * target_ratio)
                left = (width - new_width) // 2
                image = image.crop((left, 0, left + new_width, height))
            else:
                new_height = int(width / target_ratio)
                top = (height - new_height) // 2
                image = image.crop((0, top, width, top + new_height))
    
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    buffered.seek(0)
    
    return buffered