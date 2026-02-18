# backend/app/schemas.py
# Pydantic models for request/response for help with fastapi

from pydantic import BaseModel
from datetime import datetime

class JobBase(BaseModel):
    company: str
    role: str
    status: str = "Applied"

class JobCreate(JobBase):
    pass  # Inherits from baseto creeate new job entries

class Job(JobBase):
    id: int
    applied_date: datetime

    class Config:
        from_attributes = True  # Allows mapping from SQLAlchemy