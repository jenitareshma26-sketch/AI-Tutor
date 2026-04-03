import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.chat import router as chat_router

app = FastAPI(title="Tutorix AI Backend", version="1.0.0")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://ai-tutor.up.railway.app",
]

# Allow additional origins to be injected at runtime via an environment variable.
# Set CORS_ORIGINS to a comma-separated list of URLs, e.g.:
#   CORS_ORIGINS=https://my-custom-domain.com,https://staging.example.com
extra_origins = os.getenv("CORS_ORIGINS", "")
if extra_origins:
    origins.extend([o.strip() for o in extra_origins.split(",") if o.strip()])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api", tags=["chat"])


@app.get("/")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "Tutorix AI API"}
