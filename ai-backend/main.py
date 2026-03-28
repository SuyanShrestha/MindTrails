from fastapi import FastAPI
from pydantic import BaseModel
from generate import get_response

app = FastAPI()

class PlayerData(BaseModel):
    gender: str
    age: int
    environment: str

@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-backend"}

@app.post("/npc-questions")
def npc_questions(data: PlayerData):
    return get_response(data.dict())
