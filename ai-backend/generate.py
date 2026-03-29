import os
import time
import uuid
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_response(player_data: dict):
    """
    player_data example:
    {
        "gender": "male",
        "age": 25,
        "environment": "football"
    }
    Returns a JSON dict with 12 questions for the game NPCs.
    """

    timestamp = int(time.time())
    question_set_id = f"q_set_{timestamp}_{uuid.uuid4().hex[:6]}"

    system_prompt = f"""
You are an assistant generating a mental-health themed quiz for a game. 
The player moves around NPCs. Each NPC tells a short story about their mental state 
or situation, in **first-person perspective**, and the player must choose the healthiest response.
Generate **12 questions**:
- 1-10: outside NPCs (general scenarios)
- 11-12: family/house NPCs (personal/family-related)
- Each question must have incremental questionId: "1" to "12"
- questionSetId: "{question_set_id}"
- outsider: true for questionId 1-10 and outsider: false for questionId 11-12
- Every question MUST include the "outsider" field
- solvedByUser: false
- question: 2-sentence story from NPC perspective
- answers: 4 objects with "text", "category", and "feedback".
- The answer text must be written as advice from the player to the NPC.
- The player is the helper/consultant and the NPC is the one experiencing the problem.
- Never write answers using "my" or "I".
- Dont use "I" or "my" for writing answer of question 11 and 12 (outsider: false) strictly as the advice is provided to other.
- feedback must be from the NPC's first-person perspective.
- feedback must be very short (4 to 5 words maximum).
- feedback should sound thankful or appreciative.
- feedback must NOT be negative.
- feedback should still appreciate the effort but sound slightly less confident when the advice is less helpful.
- feedback should relate to the player's environment when possible (career, school, sports, etc.).
- Tailor the questions to the player's gender, age, and environment from input.
- Use these exact categories and generate each answer according to its category:
  - Burnout: emotional exhaustion, loss of motivation, feeling drained by ongoing demands.
  - Stress: feeling overwhelmed, pressured, or over-loaded by current demands.
  - Uncertainty: discomfort or anxiety about not knowing what will happen next.
  - Problem-focused: concrete, action-oriented steps to change or solve the situation.
  - Emotion-focused: strategies to regulate emotional distress without changing the situation.
  - Avoidant: tendencies to avoid, withdraw from, or ignore the problem or feelings.
  - Social-support: turning to others for comfort, advice, or practical help.
  - External-attribution: attributing the cause mainly to external/situational forces.
  - Meaning-focused: reframing the situation by finding meaning, purpose, or growth.
- For each question, randomly select 4 distinct categories from the list above and use them for the 4 answers.
- Each answer must include its category title exactly (as the "category" field).
- Output **JSON only**, no extra text.

Format example:

{{
  "questionSetId": "{question_set_id}",
  "questions": [
    {{
      "questionId": "1",
      "outsider": true,
      "solvedByUser": false,
      "question": "I feel overwhelmed at school and I don't know how to manage my time between classes and football practice.",
      "answers": [
        {{"text": "Talk to a mentor or coach about balancing time.", "category": "Social-support", "feedback": "Thank you, I needed that."}},
        {{"text": "Ignore the problem and hope it resolves itself.", "category": "Avoidant", "feedback": "Thank you, I appreciate that."}},
        {{"text": "Make a concrete weekly plan with small goals.", "category": "Problem-focused", "feedback": "I see, thanks for caring."}},
        {{"text": "Focus on calming breath and reset.", "category": "Emotion-focused", "feedback": "Thanks, I will reflect."}}
      ]
    }},
    ...
  ]
}}
    """

    user_prompt = f"Player info: {player_data}"

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        response_format={"type": "json_object"}
    )

    reply = response.choices[0].message.content

    import json
    return json.loads(reply)
