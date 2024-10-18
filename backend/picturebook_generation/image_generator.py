import openai
import logging
from django.conf import settings
from PIL import Image
import requests
from io import BytesIO
from datetime import date

openai_logger = logging.getLogger('openai_usage')

client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

# 年齢計算のための関数
def calculate_age(birth_date):
    today = date.today()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    return age

def generate_images(story_pages, child, book_title):
    images = []
    
    child_age = calculate_age(child.birth_date)
    
    main_character_prompt = f"{child_age}歳の元気で親しみやすい{child.gender}の子どもで、名前は{child.name}です"
    style_prompt = "温かみのある、カラフルな子ども向け絵本の画像スタイルにしてください。すべての画像でキャラクターのデザインを統一し、キャラクターの髪型や服装も共通にしてください。"
    
    try:
        # 表紙の生成
        cover_prompt = f"『{book_title}』というタイトルの子ども向け絵本の表紙を作成してください。タイトル『{book_title}』は表紙の中央上部に大きく、太く、はっきりとした日本語（ひらがな）で表示してください。英語や他の言語は使用せず、必ずひらがなで表示してください。文字が見やすくなるようにしてください。絵は、柔らかくて親しみやすい雰囲気にしてください。絵本らしいデザインであることを確認してください。"
        cover_image = generate_single_image(cover_prompt, is_cover=True)
        images.append(cover_image)
        
        # ストーリーページの生成
        for page_content in story_pages:
            prompt = f"子ども向け絵本の見開きページのイラスト: {page_content}を描いてください。{main_character_prompt}が登場し、ページごとに{page_content}の内容を再現したイラストにしてください。絵本の見開きページ向けに広い横長のフォーマットで描き、すべてのページで登場人物（キャラクター）のデザインや描写、服装に一貫性を持たせてください。{style_prompt}"
            page_image = generate_single_image(prompt)
            images.append(page_image)
        
        return images
    except Exception as e:
        print(f"画像生成中にエラーが発生しました: {str(e)}")
        return []

def generate_single_image(prompt, is_cover=False):
    if not is_cover:
        prompt += " 重要: この画像には一切のテキスト、文字、記号を含まないでください。英文も表示しないでください。純粋にイラストの要素のみで構成してください。"
        prompt += "また、1枚目の画像のテイストに合わせて、2枚目以降は同じテイストにしてください。キャラクターの髪型や服装も同じにしてください。"
    
    response = client.images.generate(
        prompt=prompt,
        n=1,
        size="1024x1024",
        model="dall-e-3",
        quality="standard",
        style="vivid",
    )
    
    image_type = "表紙" if is_cover else "内容ページ"
    openai_logger.info(f"DALL-E API使用: タイプ={image_type}, プロンプト文字数={len(prompt)}, 生成画像数=1, サイズ=1024x1024")
    
    image_url = response.data[0].url
    image_response = requests.get(image_url)
    image = Image.open(BytesIO(image_response.content))
    
    if is_cover:
        # 表紙のサイズ調整（A4縦置き）
        a4_width, a4_height = 210, 297  # A4サイズ（mm）
        image = image.resize((a4_width, a4_height), Image.LANCZOS)
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