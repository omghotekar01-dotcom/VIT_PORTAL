# VIT Smart Campus Portal

A full-stack prototype for exploring student, faculty, administration, and placement workflows in one campus interface.

**Project status:** Academic/demo application. This is an independent project, not an official VIT Pune portal or an integration with institutional student records.

## What is included

The frontend provides separate screens for students, faculty, administrators, and the training and placement office (TPO). The backend provides Express endpoints for authentication, student records, and exam submissions.

| Layer | Stack | Directory |
| --- | --- | --- |
| Web interface | Next.js, React, TypeScript, Tailwind CSS | `frontend/` |
| API | Express, TypeScript, JWT authentication | `backend/` |
| Persistence | MongoDB through Mongoose | `backend/src/models/` |
| Charts and interface | Recharts, Framer Motion, React Three Fiber | `frontend/src/` |

The interface contains dashboard and navigation experiences as well as data-backed routes. Do not assume every displayed metric is linked to live college records; parts of the experience use demonstration data.

## Local setup

Use a recent Node.js LTS release and npm, with MongoDB available locally or through a private hosted instance.

**1. Start the backend**

```powershell
cd backend
npm install
npm run dev
```

Create a local `backend/.env` for your own development settings:

```dotenv
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vit-smart-campus
JWT_SECRET=replace-with-a-long-random-local-secret
```

The backend normally listens on `http://localhost:5000`. It can start without a MongoDB connection, but database-dependent operations will not work reliably in that state. The sample secret above is a placeholder, **not** a deployment credential.

**2. Start the frontend in another terminal**

```powershell
cd frontend
npm install
npm run dev
```

Next.js usually serves the application at `http://localhost:3000`. Use the address shown in your terminal if the default port is occupied.

## Code tour

- `frontend/src/app/page.tsx` — role selection and entry screen
- `frontend/src/app/student/` — student-facing views
- `frontend/src/app/faculty/` — faculty-facing views
- `frontend/src/app/admin/` — administration screens
- `frontend/src/app/tpo/` — placement and TPO screens
- `backend/src/index.ts` — API entry point and MongoDB connection
- `backend/src/routes/` — authentication, student, and exam endpoints
- `backend/src/models/` — database models
- `backend/src/mockData.ts` — fictional records for local demonstrations

The separate [TODO.md](TODO.md) tracks which screens are implemented and which integrations remain unfinished.

## Verification

Run the build from each project directory:

```powershell
# From backend/
npm run build

# From frontend/
npm run build
```

These are available build commands, not a claim that the current branch has been verified on every machine. Authentication, permissions, and database-backed operations should be tested independently before deployment.

## Data handling and limitations

The demo fixtures use fictional records and `example.test` email addresses. Do not replace these with actual student information when sharing the repository. Never commit real credentials, personal records, or production tokens.

This project is suitable for studying full-stack campus workflows and role-specific UI patterns; it is not ready to serve as an official institution service without a security review, access-control verification, real data governance, and operational testing.
