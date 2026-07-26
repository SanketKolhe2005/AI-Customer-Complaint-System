
import json
import re

from langchain_core.messages import HumanMessage
from app.services.groq_service import llm
from app.prompts.extract_prompt import EXTRACT_PROMPT


def extract_node(state):
    response = llm.invoke(
        [
            HumanMessage(
                content=EXTRACT_PROMPT + "\n\n" + state["complaint_text"]
            )
        ]
    )

    text = response.content.strip()

    # Remove ```json and ```
    text = re.sub(r"^```json\s*", "", text, flags=re.IGNORECASE)
    text = re.sub(r"^```\s*", "", text)
    text = re.sub(r"\s*```$", "", text)

    try:
        data = json.loads(text)
    except Exception as e:
        data = {
            "error": str(e),
            "raw_response": text
        }

    return {
        "extracted_data": data
    }