# backend/app/models.py
# Definines the Job model

from sqlalchemy import Column, Integer, String, DateTime
from .database import Base
from datetime import datetime

class Job(Base):
    """
    Job application table
    """
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String, nullable=False)
    role = Column(String, nullable=False)