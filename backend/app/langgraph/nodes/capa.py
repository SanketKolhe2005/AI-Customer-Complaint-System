import json
import re

from langchain_core.messages import HumanMessage

from app.services.groq_service import llm
from app.prompts.capa_prompt import CAPA_PROMPT


def capa_node(state):

    prompt = (
        CAPA_PROMPT
        + "\n\nComplaint:\n"
        + state["complaint_text"]
        + "\n\nRoot Causes:\n"
        + str(state["root_cause"])
    )

    response = llm.invoke([HumanMessage(content=prompt)])

    text = response.content.strip()

    text = re.sub(r"^```json\s*", "", text, flags=re.IGNORECASE)
    text = re.sub(r"^```\s*", "", text)
    text = re.sub(r"\s*```$", "", text)

    try:
        data = json.loads(text)
    except Exception:
        data = {
            "corrective_actions": [],
            "preventive_actions": [],
            "raw_response": text
        }

    return {
        "capa": data
    }