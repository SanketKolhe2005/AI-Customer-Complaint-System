import json
import re

from langchain_core.messages import HumanMessage

from app.services.groq_service import llm
from app.prompts.risk_prompt import RISK_PROMPT


def risk_node(state):

    response = llm.invoke(
        [
            HumanMessage(
                content=RISK_PROMPT + "\n\n" + state["complaint_text"]
            )
        ]
    )

    text = response.content.strip()

    text = re.sub(r"^```json\s*", "", text, flags=re.IGNORECASE)
    text = re.sub(r"^```\s*", "", text)
    text = re.sub(r"\s*```$", "", text)

    try:
        data = json.loads(text)
    except Exception:
        data = {
            "risk_level": "Unknown",
            "reason": text
        }

    return {
        "risk": data
    }