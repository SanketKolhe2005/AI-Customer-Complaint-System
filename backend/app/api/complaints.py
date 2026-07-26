import json

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.complaint import ComplaintRequest
from app.models.complaint import Complaint
from app.langgraph.graph import graph
from app.services.duplicate_service import find_duplicate

router = APIRouter()


@router.post("/process")
def process_complaint(request: ComplaintRequest, db: Session = Depends(get_db)):

    # Check duplicate complaint
    duplicate, score = find_duplicate(db, request.complaint_text)

    if duplicate and score >= 0.85:
        return {
            "message": "Duplicate complaint detected",
            "duplicate": True,
            "similarity_score": round(score, 2),
            "existing_complaint_id": duplicate.id
        }

    # Run AI workflow
    result = graph.invoke({
        "complaint_text": request.complaint_text
    })

    # Save complaint
    complaint = Complaint(
        customer_name=result["extracted_data"].get("customer_name", ""),
        product_name=result["extracted_data"].get("product_name", ""),
        batch_number=result["extracted_data"].get("batch_number", ""),
        complaint_text=result["complaint_text"],
        summary=result["summary"],
        risk_level=result["risk"].get("risk_level", ""),
        risk_reason=result["risk"].get("reason", ""),
        root_causes=json.dumps(result["root_cause"].get("root_causes", [])),
        corrective_actions=json.dumps(result["capa"].get("corrective_actions", [])),
        preventive_actions=json.dumps(result["capa"].get("preventive_actions", []))
    )

    db.add(complaint)
    db.commit()
    db.refresh(complaint)

    return {
        "id": complaint.id,
        "message": "Complaint processed successfully",
        "result": result
    }
