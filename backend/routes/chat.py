from fastapi import APIRouter, HTTPException

from models.chat import AskRequest, AskResponse
from services.groq_service import GroqService

router = APIRouter()


@router.post("/ask", response_model=AskResponse)
def ask_tutor(payload: AskRequest) -> AskResponse:
    question = payload.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    try:
        service = GroqService()
        answer = service.get_tutor_answer(question)
        return AskResponse(answer=answer)
    except ValueError as config_error:
        raise HTTPException(status_code=500, detail=str(config_error)) from config_error
    except RuntimeError as runtime_error:
        raise HTTPException(status_code=502, detail=str(runtime_error)) from runtime_error
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Failed to get response from AI tutor. Please try again later.",
        ) from error
