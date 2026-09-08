# Tutorix AI - Full Stack AI Tutoring Chatbot

Premium full-stack AI tutoring chatbot with:

- Frontend: React + Vite + Tailwind CSS
- Backend: FastAPI (Python)
- AI: Groq API integration
- UI: premium maroon + cream SaaS design

## Project Structure

```text
tutor/
  frontend/
    src/
      components/
      pages/
      services/
  backend/
    models/
    routes/
    services/
```

## Frontend Setup

1. Go to frontend:

```bash
cd frontend
```

2. Install packages:

```bash
npm install
```

3. Create env file:

```bash
cp .env.example .env
```

If you are on Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

4. Run dev server:

```bash
npm run dev
```

Frontend runs at http://localhost:5173

## Backend Setup

1. Go to backend:

```bash
cd backend
```

2. Create and activate virtual environment (recommended):

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

Or using your requested command style:

```bash
pip install fastapi uvicorn python-dotenv groq
```

4. Create env file:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

5. Add your Groq key to backend/.env:

```env
GROQ_API_KEY=your_real_key_here
GROQ_MODEL=openai/gpt-oss-20b
```

Note: Set `GROQ_MODEL` to a model currently available to your Groq account. The example uses `openai/gpt-oss-20b`.

6. Start backend:

```bash
uvicorn main:app --reload
```

Backend runs at http://127.0.0.1:8000

## API Endpoint

- POST /api/ask
- Request:

```json
{ "question": "What is Newton's second law?" }
```

- Response:

```json
{ "answer": "Newton's second law states that ..." }
```

## Features Delivered

- Landing page with hero, CTA, features, navbar, footer
- Chat page with ChatGPT-style layout
- Premium sidebar with chat history and new chat flow
- Right-aligned user messages, left-aligned AI messages
- Typing indicator and loading spinner
- Auto-scroll to latest message
- Speech-to-text microphone input
- Text-to-speech response playback toggle
- CORS enabled FastAPI backend
- Groq service with tutor system prompt
- Error handling on frontend and backend
- Responsive, polished maroon + cream SaaS UI
