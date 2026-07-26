from typing import TypedDict

class ComplaintState(TypedDict):
    complaint_text: str
    extracted_data: dict
    summary: str
    risk: dict
    root_cause: dict
    capa: dict
    duplicate: dict