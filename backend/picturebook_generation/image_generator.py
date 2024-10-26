import openai
import logging
from django.conf import settings
from PIL import Image
import requests
from io import BytesIO
from datetime import date

openai_logger = logging.getLogger('openai_usage')

client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

def calculate_age(birth_date):
    today = date.today()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    return age

def get_scene_specific_instructions(scene_number, child, total_pages=8):
    """シーンに応じた具体的な描画指示を返す"""
    interests = child.interests if child.interests else '特になし'
    
    if scene_number == 1:  # 導入：幸せな日常
        return f"""
        温かな朝の家族の様子を描いてください：
        - 明るく温かみのあるパステルカラーを使用
        - 朝食やお支度など、朝の家族の団らんシーン
        - 家族全員の笑顔を描写
        - 子どもの興味（{interests}）に関連した要素を自然に配置
        """
    elif scene_number == 2:  # 導入：家族との活動
        return f"""
        家族との楽しい活動シーンを描いてください：
        - 明るく活気のある色使い
        - 以下のような活動シーンのいずれかを描写：
          * 公園での遊び
          * 家族での外出
          * 一緒に趣味を楽しむ様子
        - 子どもの興味（{interests}）を活動の中心に
        - インタラクティブな家族の様子を表現
        """
    elif scene_number == 3:  # 展開：きっかけ
        return f"""
        子どもが何かを考え始めるきっかけのシーンを描いてください：
        - やや落ち着いた色調
        - 以下のようなシーンのいずれかを描写：
          * 友達との会話や遊びの場面
          * 写真を見ているシーン
          * 窓辺で空を見上げる様子
        - 子どもの表情に少しの思索的な雰囲気を含める
        """
    elif scene_number == 4 or scene_number == 5:  # 展開：対話の始まり
        return f"""
        家族との穏やかな対話シーンを描いてください：
        - 温かく包み込むような色調
        - くつろいだ家庭的な雰囲気
        - 以下のようなシーンのいずれかを描写：
          * リビングでのソファでの会話
          * 寝室でベッドに座っての語らい
          * 散歩しながらの対話
        - 親の表情は優しく受容的に
        - 子どもの興味（{interests}）に関連した小物を自然に配置
        """
    elif scene_number == 6:  # 転：真実の共有
        return f"""
        深い家族の絆を感じさせる対話シーンを描いてください：
        - 暖かな光に包まれた柔らかな雰囲気
        - 親子の距離が近い構図
        - 感情豊かな表情の描写
        - 子どもの興味（{interests}）に関連した要素を背景に
        """
    elif scene_number == 7:  # 結：再確認
        return f"""
        家族の絆を象徴的に表現するシーンを描いてください：
        - 夕暮れや柔らかな光の表現
        - 家族で寄り添うシーン
        - 穏やかで安心感のある表情
        - 象徴的な背景（夕焼け、星空など）
        """
    else:  # 結：希望に満ちた終わり
        return f"""
        明るい未来を感じさせる最終シーンを描いてください：
        - 明るく希望に満ちた色使い
        - 以下のようなシーンのいずれかを描写：
          * 家族での外出や散歩
          * 抱き合う家族
          * 新しい朝を迎える様子
        - 全員の笑顔を大切に
        - 子どもの興味（{interests}）に関連した将来の希望を感じさせる要素
        """
def generate_images(story_pages, child, book_title):
    images = []
    
    child_age = calculate_age(child.birth_date)
    
    main_character_prompt = f"""
    主人公の特徴：
    - {child_age}歳の{child.gender}の子ども
    - 名前は{child.name}
    - 表情は明るく親しみやすい
    - 髪型や服装は一貫して同じデザインを維持
    """
    
    style_prompt = """
    全体的な画風の指示：
    - 温かみのあるストーリーブックスタイル
    - 柔らかな線と色使い
    - 子どもが親しみやすいデザイン
    - 全ページを通して一貫したキャラクターデザイン
    - 文字や記号は一切含めない
    - 特定の文化や地域性を示す要素は避ける
    """
    
    try:
        # 表紙の生成
        cover_prompt = f"""
        子ども向けの物語『{book_title}』の表紙画像を作成してください。

        {main_character_prompt}

        表紙の要件：
        1. 主人公と家族が笑顔で寄り添う温かなシーン
        2. 背景は明るく希望に満ちた雰囲気
        3. 全体的にカラフルで子どもの注目を引くデザイン
        4. 余白を適度に確保し、タイトルが入るスペースを考慮
        
        {style_prompt}
        """
        
        cover_image = generate_single_image(cover_prompt, is_cover=True)
        images.append(cover_image)
        
        # ストーリーページの生成
        for i, page_content in enumerate(story_pages, start=1):
            scene_instructions = get_scene_specific_instructions(i, child)
            
            prompt = f"""
            子ども向けの物語の第{i}シーンのイラストを作成してください。

            {main_character_prompt}

            このページの内容：
            {page_content}

            シーン固有の指示：
            {scene_instructions}

            {style_prompt}

            注意事項：
            1. このストーリーの内容を視覚的に表現（テキストは含めない）
            2. 前のページとの一貫性を保持
            3. 横長のフォーマットで描画
            4. 文字情報は一切含めない
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