# backend/app/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Using the Docker Postgres
DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/jobtrackr"

# Engine for connection pooling
engine = create_engine(DATABASE_URL)

# Session handles DB sessions per API request
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base for our models – all tables inherit from this.
Base = declarative_base()