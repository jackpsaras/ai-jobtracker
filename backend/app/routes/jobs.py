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