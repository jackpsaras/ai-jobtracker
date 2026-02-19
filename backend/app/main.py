# backend/app/main.py
# make entry point for the API

from fastapi import FastAPI
from .database import engine
from . import models
from .routes import jobs
from .routes import analytics

app = FastAPI(title="JobTrackr API")

@app.get("/")
def health_check():
    # used to check server status
    return {"status": "ok"}

# Create tables.
models.Base.metadata.create_all(bind=engine)

# Include job routes
app.include_router(jobs.router)

# Include analytics routes for dashboard
app.include_router(analytics.router)