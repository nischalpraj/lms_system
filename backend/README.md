# 📄 Resume Builder API

A production-ready REST API for a Resume/CV builder, built with **Node.js 20**, **Express 5**, **Prisma**, and **PostgreSQL 16**.

---

## 🚀 Setup

### Prerequisites
- Node.js ≥ 20
- PostgreSQL 16
- npm

### 1. Clone & install
```bash
git clone <repo-url>
cd resume-builder-api
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env — fill in DATABASE_URL and JWT secrets
```

Generate strong JWT secrets:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Database setup
```bash
npm run db:push      # Apply schema to DB
npm run db:seed      # Seed admin, users, templates
```

### 4. Start the server
```bash
npm run dev          # Development (nodemon)
npm start            # Production
```

Server starts at `http://localhost:3000`

---

## 🌍 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NODE_ENV` | Yes | `development` / `production` |
| `PORT` | No | Default `3000` |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_ACCESS_SECRET` | Yes | Min 32 chars |
| `JWT_REFRESH_SECRET` | Yes | Min 32 chars |
| `JWT_ACCESS_EXPIRES_IN` | No | Default `15m` |
| `JWT_REFRESH_EXPIRES_IN` | No | Default `7d` |
| `BCRYPT_ROUNDS` | No | Default `10` |
| `CORS_ORIGIN` | No | Default `http://localhost:3000` |

---

## 📡 API Endpoints

### Auth (public)
| Method | Path | Description |
|---|---|---|
| POST | `/auth/register` | Create account |
| POST | `/auth/login` | Login → tokens |
| POST | `/auth/refresh` | Rotate refresh token |
| POST | `/auth/logout` | Invalidate refresh token |

### Users (protected)
| Method | Path | Description |
|---|---|---|
| GET | `/users/me` | Own profile |
| PUT | `/users/me` | Update profile |
| GET | `/users` | List all users (admin only) |

### Resumes (protected)
| Method | Path | Description |
|---|---|---|
| GET | `/resumes` | Paginated own resumes |
| POST | `/resumes` | Create resume |
| GET | `/resumes/:id` | Resume details |
| PUT | `/resumes/:id` | Update resume |
| DELETE | `/resumes/:id` | Soft delete |
| GET | `/resumes/:id/share` | Generate public share link |
| GET | `/resumes/public/:shareToken` | **Public** — read-only |

### Resume Sections (protected)
| Method | Path | Description |
|---|---|---|
| POST | `/resumes/:id/sections` | Add section |
| PUT | `/resumes/:id/sections/:sectionId` | Update section |
| DELETE | `/resumes/:id/sections/:sectionId?type=` | Remove section |

Section types: `education`, `experience`, `skill`, `project`, `certification`, `language`

### Templates (public GET, admin POST/PUT/DELETE)
| Method | Path | Description |
|---|---|---|
| GET | `/templates` | List templates |
| GET | `/templates/:id` | Template detail |
| POST | `/templates` | Create (admin) |
| PUT | `/templates/:id` | Update (admin) |
| DELETE | `/templates/:id` | Deactivate (admin) |

### AI Enhancement (protected)
| Method | Path | Body |
|---|---|---|
| POST | `/ai/summarize` | `{ resumeId }` |
| POST | `/ai/improve-skills` | `{ resumeId }` |
| POST | `/ai/score-resume` | `{ resumeId }` |

### Export (protected)
| Method | Path | Description |
|---|---|---|
| GET | `/resumes/:id/export/pdf` | Download PDF |

---

## 📦 Response Format

**Success:**
```json
{
  "success": true,
  "message": "Resume created",
  "data": { ... }
}
```

**Paginated list:**
```json
{
  "success": true,
  "data": [ ... ],
  "meta": { "page": 1, "limit": 10, "total": 42, "totalPages": 5 }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Validation failed",
  "code": 400,
  "details": [{ "field": "email", "message": "Invalid email" }]
}
```

---

## 🧪 Sample cURL Requests

### Register
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"full_name":"John Doe","email":"john@example.com","password":"Secret@123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Secret@123"}'
```

### Create Resume
```bash
curl -X POST http://localhost:3000/resumes \
  -H "Authorization: Bearer <accessToken>" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Resume","template_id":"tpl_modern_01","visibility":"private"}'
```

### Add Education Section
```bash
curl -X POST http://localhost:3000/resumes/<resumeId>/sections \
  -H "Authorization: Bearer <accessToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "education",
    "data": {
      "institution": "Tribhuvan University",
      "degree": "BSc Computer Science",
      "start_date": "2019-08-01",
      "end_date": "2023-07-01",
      "gpa": 3.7
    }
  }'
```

### Add Skill
```bash
curl -X POST http://localhost:3000/resumes/<resumeId>/sections \
  -H "Authorization: Bearer <accessToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "skill",
    "data": {
      "skill_name": "JavaScript",
      "category": "Programming",
      "proficiency_level": "expert"
    }
  }'
```

### AI Score
```bash
curl -X POST http://localhost:3000/ai/score-resume \
  -H "Authorization: Bearer <accessToken>" \
  -H "Content-Type: application/json" \
  -d '{"resumeId":"<resumeId>"}'
```

### Export PDF
```bash
curl -X GET http://localhost:3000/resumes/<resumeId>/export/pdf \
  -H "Authorization: Bearer <accessToken>" \
  --output resume.pdf
```

### Refresh Token
```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refreshToken>"}'
```

---

## 🔐 Auth & Security

- JWT Bearer tokens required on all routes except `/auth/*`, `GET /templates`, `GET /resumes/public/:shareToken`
- Access token: 15 minutes | Refresh token: 7 days
- Refresh tokens stored hashed in DB — fully revocable on logout
- Refresh token **rotation**: every refresh issues a new pair and revokes the old one
- Passwords hashed with bcrypt (10+ rounds)
- RBAC: `student`, `HR`, `admin`
- Rate limiting: 20 req/15m on auth, 100 req/15m general
- Helmet.js security headers
- CORS locked to configured origin

---

## 🗂️ Project Structure

```
resume-builder-api/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/          # db, env, jwt
│   ├── middleware/       # auth, role, validate, error, rateLimiter
│   ├── modules/
│   │   ├── auth/        # register, login, refresh, logout
│   │   ├── users/       # profile management
│   │   ├── resumes/     # CRUD + sections + share
│   │   ├── templates/   # template management
│   │   ├── ai/          # summarize, improve, score
│   │   └── export/      # PDF export
│   ├── utils/           # ApiError, ApiResponse, asyncHandler, pagination
│   ├── app.js
└── server.js
```

---

## 🌱 Seed Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@resumebuilder.com | Admin@123 |
| Student | john.doe@student.edu | Student@123 |
| Student | jane.smith@student.edu | Student@123 |
