from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    customer_name = Column(String)
    product_name = Column(String)
    batch_number = Column(String)

    complaint_text = Column(Text)

    summary = Column(Text)

    risk_level = Column(String)
    risk_reason = Column(Text)

    root_causes = Column(Text)

    corrective_actions = Column(Text)
    preventive_actions = Column(Text)

    # NEW FIELD
    status = Column(
        String,
        default="Open"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )