from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from routes.chat import router as chat_router

app = FastAPI(title="Tutorix AI Backend", version="1.0.0")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

frontend_origin = os.getenv("FRONTEND_ORIGIN", "").strip()
if frontend_origin:
    origins.append(frontend_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api", tags=["chat"])


@app.get("/")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "Tutorix AI API"}
