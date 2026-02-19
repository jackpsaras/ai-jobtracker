# backend/app/routes/analytics.py
# analytics Using Counter for quick counting.

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from collections import Counter
from ..database import SessionLocal
from ..models import Job

# this route provides a summary for the dashboard
router = APIRouter(prefix="/analytics", tags=["Analytics"])

# get db session for analytics route
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# summary endpoint for dashboard
@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):
    """
    Calculates totals and status breakdownefficient query.
    """
    jobs = db.query(Job).all()
    total = len(jobs)
    status_counts = Counter([job.status for job in jobs])
    return {
        "total_applications": total,
        "status_breakdown": status_counts
    }