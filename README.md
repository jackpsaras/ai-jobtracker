# JobTrackr

Video demo: https://youtu.be/nDnN5suOxC0 

JobTrackr is a lightweight job application tracker built as a full-stack demo you can run locally. It's designed to show practical skills a hiring team would care about: REST APIs, database modeling, a reactive frontend with charts, and a small, testable codebase. All the while I will actually use this practical project to track my own applications.

- Demonstrates building a complete feature from DB → API → UI.
- Uses modern libraries and best-practice patterns (FastAPI, SQLAlchemy, React + Vite).
- Includes an analytics view (charts) and responsive UI.
- Easy to run locally for code review or technical interviews.

Key features
- Add, list, update, and delete job applications (CRUD).
- Simple analytics summary (status breakdown + totals) rendered with Chart.js.
- Clean separation of concerns: routes, CRUD logic, schemas, and frontend components.

Tech stack
- Backend: FastAPI, SQLAlchemy, Pydantic, Uvicorn
- Database: PostgreSQL (docker-compose included)
- Frontend: React 19, Vite, Axios, Chart.js + react-chartjs-2
- Tooling: npm, pip, docker-compose, ESLint

Repository layout (high level)
- backend/: FastAPI app and database models
  - `backend/app/main.py` — app entrypoint and router registration
  - `backend/app/routes/jobs.py` — jobs API routes
  - `backend/app/crud.py` — DB CRUD helpers
  - `backend/app/models.py` — SQLAlchemy models
  - `backend/app/schemas.py` — Pydantic request/response models
- frontend/: React app (Vite)
  - `frontend/src/App.jsx` — root UI and layout
  - `frontend/src/components/JobForm.jsx` — add job form
  - `frontend/src/components/JobList.jsx` — jobs list
  - `frontend/src/components/Dashboard.jsx` — analytics + chart
  - `frontend/src/api.js` — Axios client
- `docker-compose.yml` — spins up a local PostgreSQL for development

Quick start (development)
1. Start Postgres (docker)
```bash
docker-compose up -d
```

2. Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# create tables and run dev server
uvicorn app.main:app --reload
```

3. Frontend
```bash
cd frontend
npm install
npm run dev
# open the Vite URL printed in the terminal (usually http://localhost:5173 or 5175)
```


Potential future improvements 
- Add authentication & per-user data isolation.
- Add pagination, search, and filtering on the jobs list.
- Add backend unit/integration tests and frontend component tests.
- Add CI/CD and Dockerfile for full-stack deployment.
