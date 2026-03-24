from groq import Groq
from deep_translator import GoogleTranslator
import os


client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# language mapping
lang_map = {
    "English": "en",
    "Telugu": "te",
    "Hindi": "hi"
}

def get_ai_response(question: str, lang: str = "English"):

    target_lang = lang_map.get(lang, "en")

    # Step 1: translate to English
    if target_lang != "en":
        question = GoogleTranslator(source='auto', target='en').translate(question)

    # Step 2: AI response
    chat = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are an agriculture expert. Answer in simple bullet points."
            },
            {
                "role": "user",
                "content": question
            }
        ],
        model="llama-3.3-70b-versatile"
    )

    answer = chat.choices[0].message.content

    # Step 3: translate back
    if target_lang != "en":
        answer = GoogleTranslator(source='auto', target=target_lang).translate(answer)

    return answer
