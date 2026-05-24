# VIT PORTAL / VIT Smart Campus

Monorepo containing backend (Node + TypeScript + Express + MongoDB) and frontend (Next.js + React + TailwindCSS).

## Project layout
- `backend/` — Express API in TypeScript (`backend/src/index.ts`)
- `frontend/` — Next.js app (`frontend/src/app/`)

## Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or Atlas)
- (Optional) GitHub CLI `gh` for repo creation

## Backend (development)
1. Open a terminal in `backend/`
2. Install & run:

```bash
cd backend
npm install
npm run dev
```

Default server: `http://localhost:5000` (uses `MONGODB_URI` from `.env`)

Example `.env` for `backend/`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vit-smart-campus
JWT_SECRET=your_jwt_secret
```

## Frontend (development)
1. Open a terminal in `frontend/`
2. Install & run:

```bash
cd frontend
npm install
npm run dev
```

Next dev server usually: `http://localhost:3000`

## API endpoints (overview)
- `POST /api/auth/signup` — signup
- `POST /api/auth/login` — login
- `GET /api/students/` — list students (admin only)
- `GET /api/students/:id` — get student by id
- `POST /api/students/` — create student
- `POST /api/students/bulk` — bulk create students
- `PUT /api/students/:id` — update student
- `DELETE /api/students/:id` — delete student
- `GET /api/students/stats` — student statistics
- `POST /api/exams/submit` — submit exam

## Build
- Backend: `cd backend && npm run build`
- Frontend: `cd frontend && npm run build`

## Publishing to GitHub
I included a `publish.ps1` PowerShell helper script you can run locally to initialize git, commit, and create & push the repo using the GitHub CLI. If you prefer manual steps, follow the commands in the `publish.ps1` or use `gh repo create`.

## Notes
- Do NOT commit `.env` or any credentials.
- Rotate any secrets if accidentally committed.
