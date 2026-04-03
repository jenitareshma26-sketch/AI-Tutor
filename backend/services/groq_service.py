import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv(override=True)

SYSTEM_PROMPT = (
    "You are a friendly AI tutor. Explain concepts clearly in simple steps. "
    "Use examples. Keep answers easy to understand for students."
)


class GroqService:
    def __init__(self) -> None:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY is not set in environment variables.")
        if api_key.startswith("your_") or api_key == "your_groq_api_key_here":
            raise ValueError("GROQ_API_KEY is still a placeholder. Set a real Groq API key in backend/.env.")

        self.client = Groq(api_key=api_key)

    def get_tutor_answer(self, question: str) -> str:
        try:
            response = self.client.chat.completions.create(
                model=os.getenv("GROQ_MODEL", "llama-3.1-8b-instant"),
                temperature=0.4,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": question},
                ],
            )
        except Exception as error:
            error_text = str(error).lower()
            if "invalid api key" in error_text or "invalid_api_key" in error_text:
                raise ValueError("Invalid GROQ_API_KEY. Update backend/.env with a valid Groq key.") from error
            if "rate limit" in error_text:
                raise RuntimeError("Groq rate limit reached. Please retry in a moment.") from error
            raise RuntimeError("Groq API request failed. Check model/key configuration and try again.") from error

        answer = response.choices[0].message.content
        return answer.strip() if answer else "I could not generate an answer right now."
