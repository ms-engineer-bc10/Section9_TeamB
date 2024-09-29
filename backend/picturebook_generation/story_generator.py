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
                {"role": "system", "content": "あなたは、日本で人気の絵本作家です。背景が複雑な養育家庭における真実告知を目的として子ども向けの絵本を作成してください。真実告知として適切な内容であると同時に、あまり直接的になりすぎないよう配慮してください。必ず日本語で8ページの物語を作成してください。"},
                {"role": "user", "content": f"以下の情報に基づいて、子どもに合わせた8ページの日本語の絵本を作成してください：\n{prompt}"}
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
        print(f"ストーリー生成中にエラーが発生しました: {str(e)}")
        return []

def generate_book_title(child, telling_record):
    prompt = f"{child.name}の家族についての子供向け絵本のタイトルを作成してください。この本は{child.background_type}について優しく扱います。"
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "あなたは子供向け絵本のタイトルを生成する専門家です。日本語でタイトルを作成してください。"},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=50
        )
        
        title = response.choices[0].message.content.strip()
        return title
    except Exception as e:
        print(f"本のタイトル生成中にエラーが発生しました: {str(e)}")
        return "ぼく/わたしのかぞく"