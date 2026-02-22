# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from .database import engine
from . import models
from .routes import jobs, analytics

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="JobTrackr API")

# Allow frontend (Vite runs on 5173 by default)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # add both just in case
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables.
models.Base.metadata.create_all(bind=engine)

# Include job routes
app.include_router(jobs.router)

# Include analytics routes for dashboard
app.include_router(analytics.router)

@app.get("/")
def health_check():
    return {"status": "ok"}

