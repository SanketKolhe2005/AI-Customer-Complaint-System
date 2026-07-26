from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from app.database.database import get_db
from app.models.complaint import Complaint

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/")
def dashboard(db: Session = Depends(get_db)):

    complaints = db.query(Complaint).all()

    total = len(complaints)

    high_risk = sum(
        1 for c in complaints
        if c.risk_level and c.risk_level.lower() == "high"
    )

    duplicates = 0  # Update later if you store duplicate status

    today = datetime.now().date()

    today_cases = sum(
        1
        for c in complaints
        if c.created_at and c.created_at.date() == today
    )

    return {
        "total": total,
        "high_risk": high_risk,
        "duplicates": duplicates,
        "today": today_cases
    }