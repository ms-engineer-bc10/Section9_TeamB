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
                prompt = f"{main_character_prompt} in a warm, colorful children's book style. The image should be a wide double-page spread for a children's book."
            else:
                prompt = f"illustration for a children's book: {page_content} Featuring {main_character_prompt}. The image should be a wide landscape format suitable for a book spread."
            
            response = client.images.generate(
                prompt=prompt,
                n=1,
                size="1024x1024"  # 絵本用に見開き2ページの横長画像にしたい
            )
            
            image_url = response.data[0].url
            
            # Download the image
            image_response = requests.get(image_url)
            image = Image.open(BytesIO(image_response.content))
            
            # Crop the image to 16:9 aspect ratio
            width, height = image.size
            new_width = width
            new_height = int(width * 9 / 16)
            left = 0
            top = (height - new_height) / 2
            right = width
            bottom = top + new_height
            
            cropped_image = image.crop((left, top, right, bottom))
            
            # Save the cropped image to a BytesIO object
            buffered = BytesIO()
            cropped_image.save(buffered, format="PNG")
            
            # You might want to save this image to your storage system here
            # For now, we'll just append the BytesIO object to the list
            images.append(buffered)
        
        return images
    except Exception as e:
        print(f"Error generating images: {str(e)}")
        return []
