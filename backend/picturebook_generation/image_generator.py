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
        cover_prompt = f"""
        子ども向け絵本『{book_title}』の表紙を作成してください。以下の指示を厳密に守ってください：
        1. 画像内に日本語のひらがなで『{book_title}』の文字をタイトルとして表示して入れてください。
        2. {child.name}という名前の{child_age}歳の{child.gender}の子どもを中心に描いてください。
        3. 背景は柔らかく、親しみやすい雰囲気で、絵本らしいデザインにしてください。
        4. 画像全体が明るく、カラフルで、子どもの注目を引くようにしてください。
        5. キャラクターの表情は明るく、笑顔で描いてください。
        """
        cover_image = generate_single_image(cover_prompt, is_cover=True)
        # cover_image_with_title = add_title_to_cover(cover_image, book_title) # タイトル画像処理にする場合追加
        images.append(cover_image)
        
        # ストーリーページの生成
        for i, page_content in enumerate(story_pages, start=1):
            prompt = f"""
            子ども向け絵本の{i}ページ目のイラストを作成してください。以下の指示を厳密に守ってください：
            1. このページの内容: {page_content}
               このストーリーの内容を視覚的に表現してください。
            2. {main_character_prompt}
               このキャラクターを必ず含め、キャラクターの髪型や服装は常に同じにしてください。
            3. 画像には一切のテキスト、文字、記号を含めないでください。純粋にイラストのみで構成してください。
            4. 広い横長のフォーマットで描いてください。
            5. {style_prompt}
            6. 前のページのイラストと一貫性を持たせ、同じテイストやスタイルを維持してください。
            7. アルファベットや数字などの文字は一切表示しないでください。
            8. この指示自体を画像に含めないでください。純粋にイラストのみを生成してください。
            9. ストーリーの進行に合わせて、場面や登場人物の動きを適切に変化させてください。
            10. 画像に絵本の枠は含まないでください、純粋にイラスト部分のみを表出してください。
            11. 画像に、特定の地域や国の文化を反映するような描写や人々の服装を含まないでください。
            """
            page_image = generate_single_image(prompt)
            images.append(page_image)
        
        return images
    except Exception as e:
        print(f"画像生成中にエラーが発生しました: {str(e)}")
        return []

def generate_single_image(prompt, is_cover=False, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = client.images.generate(
                prompt=prompt,
                n=1,
                size="1792x1024",
                model="dall-e-3",
                quality="standard",
                style="vivid",
            )
    
            image_type = "表紙" if is_cover else "内容ページ"
            openai_logger.info(f"DALL-E API使用: タイプ={image_type}, プロンプト文字数={len(prompt)}, 生成画像数=1, サイズ=1792x1024")
            
            image_url = response.data[0].url
            image_response = requests.get(image_url)
            image = Image.open(BytesIO(image_response.content))
    
            if is_cover:
                # 表紙のサイズ調整（A4横置き）
                a4_width, a4_height = 297, 210  # A4サイズ（mm）
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
        except Exception as e:
            openai_logger.error(f"画像生成の試行 {attempt + 1} 失敗: {str(e)}")
            if attempt == max_retries - 1:
                raise