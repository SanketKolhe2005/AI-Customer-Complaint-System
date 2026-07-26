import json
import re

from langchain_core.messages import HumanMessage

from app.services.groq_service import llm
from app.prompts.rootcause_prompt import ROOTCAUSE_PROMPT


def rootcause_node(state):

    response = llm.invoke(
        [
            HumanMessage(
                content=ROOTCAUSE_PROMPT + "\n\n" + state["complaint_text"]
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
            "root_causes": [text]
        }

    return {
        "root_cause": data
    }