# AI Backend

FastAPI service that generates NPC questions and produces progress reports from game sessions.

**Requirements**
- Python 3.12+

**Setup**
1. `cd ai-backend`
1. `python -m venv venv`
1. Activate venv:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
1. `pip install -r requirements.txt`
1. Copy environment variables:
   - `copy .env.example .env` (Windows)
   - `cp .env.example .env` (Mac/Linux)

**Environment**
- `OPENAI_API_KEY`: OpenAI API key

**Run**
1. `uvicorn main:app --reload --host 0.0.0.0 --port 8000`

**Health Check**
- `GET /health`
