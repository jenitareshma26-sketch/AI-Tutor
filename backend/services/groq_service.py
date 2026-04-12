import os
import json
import logging

from dotenv import load_dotenv
from groq import Groq

load_dotenv(override=True)
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)

SYSTEM_PROMPT = (
    "You are a friendly AI tutor. Explain concepts clearly in simple steps. "
    "Use examples. Keep answers easy to understand for students. "
    "Keep your answers concise, clear, and actionable."
)

MAX_HISTORY_MESSAGES = 15


class GroqService:
    def __init__(self) -> None:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY is not set in environment variables.")
        if api_key.startswith("your_") or api_key == "your_groq_api_key_here":
            raise ValueError("GROQ_API_KEY is still a placeholder. Set a real Groq API key in backend/.env.")

        self.client = Groq(api_key=api_key)

    def get_tutor_answer(self, messages: list[dict[str, str]]) -> str:
        logger.debug(f"Incoming messages count: {len(messages)}")
        
        # Extract all valid messages (filter out empty ones)
        valid_messages = [
            {"role": msg.get("role", "user"), "content": msg.get("content", "").strip()}
            for msg in messages
            if msg.get("content", "").strip()
        ]
        
        if not valid_messages:
            return "No question found in the request."
        
        logger.debug(f"Valid messages: {json.dumps(valid_messages, indent=2)}")
        
        # Keep conversation history limited to last 15 messages
        recent_messages = valid_messages[-MAX_HISTORY_MESSAGES:]
        logger.debug(f"Using {len(recent_messages)} recent messages")
        
        # Build final payload with system prompt and conversation history
        final_payload = [{"role": "system", "content": SYSTEM_PROMPT}]
        final_payload.extend(recent_messages)
        
        logger.debug(f"Final payload to Groq: {json.dumps(final_payload, indent=2)}")

        try:
            response = self.client.chat.completions.create(
                model=os.getenv("GROQ_MODEL", "llama-3.1-8b-instant"),
                temperature=0.4,
                messages=final_payload,
            )
            logger.debug(f"Groq response received successfully")
        except Exception as error:
            error_text = str(error).lower()
            logger.error(f"Groq API Error: {str(error)}")
            logger.error(f"Error type: {type(error).__name__}")
            if "invalid api key" in error_text or "invalid_api_key" in error_text:
                raise ValueError("Invalid GROQ_API_KEY. Update backend/.env with a valid Groq key.") from error
            if "rate limit" in error_text:
                raise RuntimeError("Groq rate limit reached. Please retry in a moment.") from error
            raise RuntimeError(f"Groq API request failed: {str(error)}") from error

        answer = response.choices[0].message.content
        return answer.strip() if answer else "I could not generate an answer right now."
