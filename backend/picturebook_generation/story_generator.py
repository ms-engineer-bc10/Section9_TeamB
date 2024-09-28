import openai
from django.conf import settings
from .utils import get_story_prompt

client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

def generate_story(child, telling_record):
    prompt = get_story_prompt(child, telling_record)
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a children's book author specializing in personalized stories in Japanese that gently address sensitive family backgrounds."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1500
        )
        
        story = response.choices[0].message.content.strip()
        
        # Split the story into pages
        pages = story.split('\n\n')
        
        # Ensure we have exactly 8 pages
        if len(pages) < 8:
            pages.extend([''] * (8 - len(pages)))
        elif len(pages) > 8:
            pages = pages[:8]
        
        return pages
    except Exception as e:
        print(f"Error generating story: {str(e)}")
        return []

def generate_book_title(child, telling_record):
    prompt = f"Create a child-friendly title for a storybook about {child.name}'s family. The book gently addresses {child.background_type}."
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a children's book title generator."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=50
        )
        
        title = response.choices[0].message.content.strip()
        return title
    except Exception as e:
        print(f"Error generating book title: {str(e)}")
        return "My Special Family Story"