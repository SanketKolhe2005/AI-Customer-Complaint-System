from difflib import SequenceMatcher
from app.models.complaint import Complaint


def find_duplicate(db, complaint_text):

    complaints = db.query(Complaint).all()

    best_score = 0
    best_match = None

    for complaint in complaints:
        score = SequenceMatcher(
            None,
            complaint_text.lower(),
            complaint.complaint_text.lower()
        ).ratio()

        if score > best_score:
            best_score = score
            best_match = complaint

    return best_match, best_score