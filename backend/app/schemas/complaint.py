from pydantic import BaseModel


class ComplaintRequest(BaseModel):
    complaint_text: str