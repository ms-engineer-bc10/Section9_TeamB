from datetime import datetime

def get_story_prompt(child):
    today = datetime.now().date()
    age = (today - child.birth_date).days // 365
    
    prompt = f"""
    Create a children's story for {child.name}, a {age}-year-old {child.gender}. 
    The story should gently address their {child.background_type} background.
    
    Key points to include:
    - Child's interests: {child.interests}
    - Family structure: {child.family_structure}
    - Origin background: {child.origin_background}
    - Care background: {child.care_background}
    
    The story should:
    1. Be appropriate for a {age}-year-old child.
    2. Indirectly address the child's background without being too direct.
    3. Be positive and uplifting, focusing on love and family bonds.
    4. Include elements of {child.interests} to engage the child.
    5. Be divided into 8 short sections, each suitable for one page of a picture book.
    
    Please write the story in a way that's easy to match with illustrations.
    """
    
    return prompt