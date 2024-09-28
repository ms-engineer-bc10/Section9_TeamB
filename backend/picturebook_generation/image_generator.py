import openai
from django.conf import settings
from PIL import Image
import requests
from io import BytesIO

client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

def generate_images(story_pages, child):
    images = []
    main_character_prompt = f"A friendly-looking {child.gender} child named {child.name}, "
    
    try:
        for i, page_content in enumerate(story_pages):
            if i == 0:
                prompt = f"{main_character_prompt} in a warm, colorful children's book style. The image should be a wide double-page spread for a children's book cover."
            else:
                prompt = f"Illustration for a children's book double-page spread: {page_content} Featuring {main_character_prompt}. The image should be in a wide landscape format suitable for a book spread."
            
            response = client.images.generate(
                prompt=prompt,
                n=1,
                size="1024x1024"  # 横長サイズで指定するとサポートしていないエラーが出るため一旦1:1比で指定
            )
            
            image_url = response.data[0].url
            
            # イメージのダウンロード
            image_response = requests.get(image_url)
            image = Image.open(BytesIO(image_response.content))
            
            # 画像が既に適切なアスペクト比（16:9）である場合はそのまま使用
            # そうでない場合は、中央部分をクロップして16:9にする
            width, height = image.size
            target_ratio = 16 / 9
            current_ratio = width / height
            
            if abs(current_ratio - target_ratio) > 0.01:  # 許容誤差
                if current_ratio > target_ratio:
                    # 横が長すぎる場合、左右をクロップ
                    new_width = int(height * target_ratio)
                    left = (width - new_width) // 2
                    image = image.crop((left, 0, left + new_width, height))
                else:
                    # 縦が長すぎる場合、上下をクロップ
                    new_height = int(width / target_ratio)
                    top = (height - new_height) // 2
                    image = image.crop((0, top, width, top + new_height))
            
            # イメージをBytesIO objectで保存
            buffered = BytesIO()
            image.save(buffered, format="PNG")
            buffered.seek(0)
            
            images.append(buffered)
        
        return images
    except Exception as e:
        print(f"Error generating images: {str(e)}")
        return []
