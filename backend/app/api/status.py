from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.complaint import Complaint

router = APIRouter(
    prefix="/status",
    tags=["Complaint Status"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


VALID_STATUS = [
    "Open",
    "Under Review",
    "CAPA Implemented",
    "Closed",
]


@router.put("/{complaint_id}")
def update_status(
    complaint_id: int,
    status: str,
    db: Session = Depends(get_db),
):

    complaint = (
        db.query(Complaint)
        .filter(Complaint.id == complaint_id)
        .first()
    )

    if complaint is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    if status not in VALID_STATUS:
        raise HTTPException(
            status_code=400,
            detail="Invalid status"
        )

    complaint.status = status

    db.commit()

    db.refresh(complaint)

    return {
        "message": "Complaint status updated successfully",
        "complaint_id": complaint.id,
        "status": complaint.status,
    }


@router.get("/{complaint_id}")
def get_status(
    complaint_id: int,
    db: Session = Depends(get_db),
):

    complaint = (
        db.query(Complaint)
        .filter(Complaint.id == complaint_id)
        .first()
    )

    if complaint is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    return {
        "complaint_id": complaint.id,
        "status": complaint.status,
    }


@router.get("/")
def all_status_counts(
    db: Session = Depends(get_db),
):

    complaints = db.query(Complaint).all()

    return {
        "Open": len(
            [c for c in complaints if c.status == "Open"]
        ),
        "Under Review": len(
            [c for c in complaints if c.status == "Under Review"]
        ),
        "CAPA Implemented": len(
            [c for c in complaints if c.status == "CAPA Implemented"]
        ),
        "Closed": len(
            [c for c in complaints if c.status == "Closed"]
        ),
    }