import openai
import logging
from django.conf import settings
from .utils import get_story_prompt
from datetime import date

openai_logger = logging.getLogger('openai_usage')

client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

def calculate_age(birth_date):
    today = date.today()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    return age

def generate_story(child):
    child_age = calculate_age(child.birth_date)
    
    father_title = child.father_title or 'おとうさん'
    mother_title = child.mother_title or 'おかあさん'
    
    interests = child.interests if child.interests else '特になし'
    
    prompt = get_story_prompt(child)
    story_prompt = f"""
{child_age}歳の{child.gender}の子ども{child.name}が登場する物語です。
父親の呼び方は「{father_title}」、母親の呼び方は「{mother_title}」です。

背景情報：
出自背景: {child.origin_background if child.origin_background else '特になし'}
養育背景: {child.care_background if child.care_background else '特になし'}
興味・関心: {interests}

ストーリー要件:
{prompt}

以下の構成で8ページのストーリーを作成してください：

導入部
・1ページ目: {child.name}と{father_title}、{mother_title}との日常の温かいシーン
・2ページ目: 子どもの興味（{interests}）に関連した家族との活動

展開部
・3ページ目: 主人公が自分の出自や家族について考え始めるきっかけとなる出来事
・4ページ目: {child_age}歳らしい素直な疑問を投げかけるシーン

クライマックス
・5ページ目: 親が真実告知として優しく真実を語り始める場面
・6ページ目: 愛情と選ばれた喜びを中心として、年齢に応じて背景情報を優しく伝える

まとめ
・7ページ目: 家族の絆の再確認
・8ページ目: 愛されている実感で締めくくる

各ページの本文を改行で区切って書いてください。見出しやページ番号は含めないでください。何ページ目かも記載しないでください。"""
    
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": """あなたは、出自を知る権利の専門知識を持つ日本で人気の絵本作家です。
                真実告知（オープン・ディスクロージャー）を目的とした子ども向けの絵本を作成します。

                以下の点に注意してください：
                - 日本語のひらがなとカタカナのみを使用（漢字不可）
                - 8つの本文を作成する
                - ストーリーの本文のみを記載する
                - 直接的な表現を避け、メタファーを活用
                - 「愛」「家族のつながり」「個性の尊重」を軸にする
                - ポジティブで温かい表現を使用
                - 年齢に応じたシンプルな言葉を選択
                - 見出しやタイトル、ページ番号は含めない
                - 「むかしむかし」という表現は使用しない"""},
                {"role": "user", "content": story_prompt}
            ],
            temperature=0.7,
            max_tokens=1600
        )
        
        openai_logger.info(f"GPT-4 API使用 (ストーリー生成): プロンプト文字数={len(story_prompt)}, 生成トークン数={response.usage.total_tokens}")
        
        story = response.choices[0].message.content.strip()
        
        # ストーリーをページごとに分割
        pages = story.split('\n\n')
        
        # ページ数を8ページに調整
        if len(pages) < 8:
            pages.extend([''] * (8 - len(pages)))
        elif len(pages) > 8:
            pages = pages[:8]
        
        return pages
    except Exception as e:
        print(f"ストーリー生成中にエラーが発生しました: {str(e)}")
        return []

def generate_book_title(child):
    father_title = child.father_title or 'おとうさん'
    mother_title = child.mother_title or 'おかあさん'
    
    interests = child.interests if child.interests else '特になし'
    
    prompt = f"""
{child.name}の家族についての子供向け絵本のタイトルを作成してください。
- 背景: {child.background_type}
- 父親の呼び方: {father_title}
- 母親の呼び方: {mother_title}

以下の点に注意してください：
- 直接的な表現は避ける
- 不安のある単語や、ネガティブな単語は使用しない
- 「だいすき」「つながり」「かぞく」などポジティブなキーワードの活用は推奨される
"""
    
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "あなたは子供向け絵本の作家です。タイトルは以下の条件で作成してください：\n- ひらがな・カタカナのみ使用\n- 15文字以内\n- シンプルで温かみのある表現"},
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