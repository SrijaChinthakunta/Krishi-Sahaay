from fastapi import APIRouter
from services.ai_service import get_ai_response

router = APIRouter()

@router.get("/ask")
def ask_ai(question: str, lang: str = "en"):

    answer = get_ai_response(question, lang)

    return {
        "question": question,
        "language": lang,
        "answer": answer
    }