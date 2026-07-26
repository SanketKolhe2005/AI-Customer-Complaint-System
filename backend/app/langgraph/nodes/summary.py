from langchain_core.messages import HumanMessage

from app.services.groq_service import llm
from app.prompts.summary_prompt import SUMMARY_PROMPT


def summary_node(state):

    response = llm.invoke([
        HumanMessage(
            content=SUMMARY_PROMPT + "\n\n" + state["complaint_text"]
        )
    ])

    return {
        "summary": response.content.strip()
    }