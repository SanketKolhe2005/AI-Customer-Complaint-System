from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.complaint import Complaint
from app.langgraph.graph import graph
from app.services.duplicate_service import find_duplicate

router = APIRouter(tags=["Complaint Processing"])


class ComplaintRequest(BaseModel):
    complaint_text: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/process")
def process_complaint(
    request: ComplaintRequest,
    db: Session = Depends(get_db),
):
    try:

        # -----------------------------
        # Duplicate Detection
        # -----------------------------
        duplicate, score = find_duplicate(
            db,
            request.complaint_text
        )

        if duplicate and score >= 0.85:

            return {

                "duplicate": True,

                "similarity_score": round(score, 2),

                "existing_complaint_id": duplicate.id,

                "message": "Duplicate complaint detected."

            }

        # -----------------------------
        # Run AI Workflow
        # -----------------------------
        result = graph.invoke({

            "complaint_text": request.complaint_text

        })

        extracted = result.get("extracted_data", {})

        risk = result.get("risk", {})

        root = result.get("root_cause", {})

        capa = result.get("capa", {})

        # -----------------------------
        # Save Complaint
        # -----------------------------
        complaint = Complaint(

            customer_name=extracted.get("customer_name"),

            product_name=extracted.get("product_name"),

            batch_number=extracted.get("batch_number"),

            complaint_text=request.complaint_text,

            summary=result.get("summary"),

            risk_level=risk.get("risk_level"),

            risk_reason=risk.get("reason"),

            root_causes=", ".join(
                root.get("root_causes", [])
            ),

            corrective_actions=", ".join(
                capa.get("corrective_actions", [])
            ),

            preventive_actions=", ".join(
                capa.get("preventive_actions", [])
            ),

            status="Open",

        )

        db.add(complaint)

        db.commit()

        db.refresh(complaint)

        return {

            "success": True,

            "duplicate": False,

            "complaint_id": complaint.id,

            "status": complaint.status,

            "result": result

        }

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=f"Complaint processing failed: {str(e)}"

        )