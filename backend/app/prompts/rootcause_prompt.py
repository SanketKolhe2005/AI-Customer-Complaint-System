ROOTCAUSE_PROMPT = """
You are a pharmaceutical manufacturing quality expert.

Based on the complaint, suggest 3 likely root causes.

Return ONLY valid JSON.

Example:

{
    "root_causes": [
        "Improper blister sealing",
        "Tablet compression issue",
        "Packaging machine misalignment"
    ]
}
"""