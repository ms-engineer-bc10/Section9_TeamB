import picturebook_generation
from django.conf import settings

picturebook_generation.api_key = settings.OPENAI_API_KEY

def generate_images(story_pages, child):
    images = []
    main_character_prompt = f"A friendly-looking {child.gender} child named {child.name}, "
    
    for i, page_content in enumerate(story_pages):
        if i == 0:
            prompt = f"{main_character_prompt} in a warm, colorful children's book style. The image should be horizontal/landscape oriented."
        else:
            prompt = f"Illustration for a children's book page: {page_content} Featuring {main_character_prompt}. The image should be horizontal/landscape oriented."
        
        response = picturebook_generation.Image.create(
            prompt=prompt,
            n=1,
            size="1024x512"
        )
        
        image_url = response['data'][0]['url']
        images.append(image_url)
    
    return images