from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.complaint import Complaint

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==========================
# Dashboard Statistics
# ==========================

@router.get("/")
def dashboard_stats(db: Session = Depends(get_db)):

    complaints = db.query(Complaint).all()

    total = len(complaints)

    high_risk = len(
        [
            c
            for c in complaints
            if c.risk_level == "High"
        ]
    )

    duplicates = 0

    today = len(
        [
            c
            for c in complaints
            if c.created_at
            and c.created_at.date() == date.today()
        ]
    )

    open_cases = len(
        [
            c
            for c in complaints
            if c.status == "Open"
        ]
    )

    under_review = len(
        [
            c
            for c in complaints
            if c.status == "Under Review"
        ]
    )

    closed = len(
        [
            c
            for c in complaints
            if c.status == "Closed"
        ]
    )

    return {

        "total": total,

        "high_risk": high_risk,

        "duplicates": duplicates,

        "today": today,

        "open_cases": open_cases,

        "under_review": under_review,

        "closed": closed,

    }


# ==========================
# Complaint History
# ==========================

@router.get("/complaints")
def get_complaints(
    db: Session = Depends(get_db)
):

    complaints = (
        db.query(Complaint)
        .order_by(Complaint.created_at.desc())
        .all()
    )

    return [

        {

            "id": c.id,

            "customer_name": c.customer_name,

            "product_name": c.product_name,

            "batch_number": c.batch_number,

            "complaint_text": c.complaint_text,

            "summary": c.summary,

            "risk_level": c.risk_level,

            "risk_reason": c.risk_reason,

            "root_causes": c.root_causes,

            "corrective_actions": c.corrective_actions,

            "preventive_actions": c.preventive_actions,

            "status": c.status,

            "created_at": c.created_at.strftime("%d-%m-%Y %H:%M")
            if c.created_at
            else ""

        }

        for c in complaints

    ]