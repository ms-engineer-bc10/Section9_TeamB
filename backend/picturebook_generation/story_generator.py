import openai
import logging
from django.conf import settings
from .utils import get_story_prompt
from datetime import date

openai_logger = logging.getLogger('openai_usage')

client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

# 年齢計算のための関数
def calculate_age(birth_date):
    today = date.today()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    return age

def generate_story(child):
    child_age = calculate_age(child.birth_date)
    
    prompt = get_story_prompt(child)
    story_prompt = f"{child_age}歳の{child.gender}の子ども{child.name}が登場する物語です。{prompt}"
    
    
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "あなたは、日本で人気の絵本作家です。背景が複雑な養育家庭における真実告知を目的として子ども向けの絵本を作成してください。真実告知として適切な内容であると同時に、直接的になりすぎないよう配慮して子ども向けの絵本らしく楽しめる内容にしてください。必ず日本語のひらがなとカナカナのみで、漢字は使用せず、8ページの物語を作成してください。各ページにタイトルをつけず、ストーリーのみを書いてください。何ページ目かの数字の記載も入れないでください。"},
                {"role": "user", "content": f"以下の情報に基づいて、子どもに合わせた8ページの日本語の絵本を作成してください。各ページはストーリーの本文のみで、タイトルは不要です、また何ページ目かの数字の記載や、「ページ」という単語も含まないでください：\n{prompt}"}
            ],
            temperature=0.7,
            max_tokens=1500
        )
        
        openai_logger.info(f"GPT-4 API使用 (ストーリー生成): プロンプト文字数={len(prompt)}, 生成トークン数={response.usage.total_tokens}")
        
        story = response.choices[0].message.content.strip()
        
        # ストーリーをページごとに分割
        pages = story.split('\n\n')
        
        # ページ数を指定
        if len(pages) < 8:
            pages.extend([''] * (8 - len(pages)))
        elif len(pages) > 8:
            pages = pages[:8]
        
        return pages
    except Exception as e:
        print(f"ストーリー生成中にエラーが発生しました: {str(e)}")
        return []

def generate_book_title(child):
    prompt = f"{child.name}の家族についての子供向け絵本のタイトルを作成してください。この本は{child.background_type}について直接的になりすぎない表現で、優しく扱います。"
    
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "あなたは子供向け絵本の作家です。日本語で絵本のタイトルを作成してください。タイトルに使用する文字はひらがな、またはカタカナとし、子どもが理解しやすいように15文字以内で簡易でシンプルなものにしてください。"},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=20
        )
        
        title = response.choices[0].message.content.strip()
        return title
    except Exception as e:
        print(f"本のタイトル生成中にエラーが発生しました: {str(e)}")
        return "かぞくのものがたり"