# backend/app/crud.py
# Separating CRUD logic from routes

from sqlalchemy.orm import Session
from .models import Job
from .schemas import JobCreate

# CRUD functions for Job model. These are called from the routes in jobs.py, keeping the route handlers clean and focused on HTTP logic

#create a new job
def create_job(db: Session, job: JobCreate):
    db_job = Job(**job.dict())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

#get all jobs
def get_jobs(db: Session):
    return db.query(Job).all()

#get a single job by ID
def get_job(db: Session, job_id: int):
    return db.query(Job).filter(Job.id == job_id).first()

#update a job by ID
def update_job(db: Session, job_id: int, job: JobCreate):
    db_job = get_job(db, job_id)
    if db_job:
        for key, value in job.dict().items():
            setattr(db_job, key, value)
        db.commit()
        db.refresh(db_job)
    return db_job

#delete a job by ID
def delete_job(db: Session, job_id: int):
    db_job = get_job(db, job_id)
    if db_job:
        db.delete(db_job)
        db.commit()
        return True
    return False