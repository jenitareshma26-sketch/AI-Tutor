from typing import Literal

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(..., min_length=1, max_length=10000)


class AskRequest(BaseModel):
    messages: list[ChatMessage] = Field(..., min_length=1, max_length=30)


class AskResponse(BaseModel):
    answer: str
