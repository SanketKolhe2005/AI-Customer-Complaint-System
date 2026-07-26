from difflib import SequenceMatcher

def duplicate_node(state):
    similarity = SequenceMatcher(
        None,
        state["complaint_text"],
        state["complaint_text"]
    ).ratio()

    return {
        "duplicate": {
            "is_duplicate": similarity > 0.90,
            "similarity_score": round(similarity, 2)
        }
    }