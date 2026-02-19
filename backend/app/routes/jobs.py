# backend/app/routes/jobs.py
# CRUD for jobs. Using dependency injection for DB sessions – standard FastAPI pattern.

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Job
from ..schemas import JobCreate, Job
from ..crud import create_job, get_jobs, get_job, update_job, delete_job  # We'll add crud.py next.

router = APIRouter(prefix="/jobs", tags=["Jobs"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Job)
def create(job: JobCreate, db: Session = Depends(get_db)):
    # Simple create – no auth yet.
    return create_job(db, job)

@router.get("/", response_model=list[Job])
def read_all(db: Session = Depends(get_db)):
    return get_jobs(db)

@router.get("/{job_id}", response_model=Job)
def read_one(job_id: int, db: Session = Depends(get_db)):
    job = get_job(db, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.put("/{job_id}", response_model=Job)
def update(job_id: int, job: JobCreate, db: Session = Depends(get_db)):
    updated = update_job(db, job_id, job)
    if not updated:
        raise HTTPException(status_code=404, detail="Job not found")
    return updated

@router.delete("/{job_id}")
def delete(job_id: int, db: Session = Depends(get_db)):
    if not delete_job(db, job_id):
        raise HTTPException(status_code=404, detail="Job not found")
    return {"message": "Job deleted"}