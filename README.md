# English Learning Platform

A web application for learning English through short video clips, focusing on **Listening** and **Speaking** skills with AI assistance.

Users pick a 30–60 second video and work through 7 guided steps: Warmup Vocab → Listen → Phrase Practice → Shadow → **Retell** (AI-powered) → Speak → Quick Review. The standout feature is the **AI Retelling Coach** which evaluates how well a user retells a video based on key points, vocabulary, grammar, and a model answer.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Java | 21+ |
| Node.js | 20+ |
| Docker + Docker Compose | latest |
| ffmpeg | any recent |

---

## Setup

### 1. Clone & configure environment

```bash
git clone <repo-url>
cd englishapp
cp .env .env
# Open .env and fill in OPENAI_API_KEY
```

### 2. Start infrastructure (Postgres, Redis, MinIO)

```bash
docker compose up -d
# Wait ~30 seconds for services to become healthy
docker compose ps
```

### 3. Start backend (Terminal 1)

```bash
cd backend
./gradlew bootRun        # Linux / macOS
gradlew.bat bootRun      # Windows
```

### 4. Start frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

---

## URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | — |
| Backend API | http://localhost:8080 | — |
| Swagger UI | http://localhost:8080/swagger-ui.html | — |
| MinIO Console | http://localhost:9001 | minioadmin / minioadmin |
| PostgreSQL | localhost:5432 | englishapp / secret |

---

## Troubleshooting

**Port already in use**
```bash
# Find what's using the port (e.g. 5432)
netstat -ano | findstr :5432     # Windows
lsof -i :5432                    # macOS / Linux
```

**Docker services not healthy**
```bash
docker compose logs postgres
docker compose logs redis
docker compose logs minio
```

**Restart a single service**
```bash
docker compose restart postgres
```

**Reset all data (destructive)**
```bash
docker compose down -v   # removes volumes
docker compose up -d
```

**MinIO buckets missing after restart**
The `init-buckets` service only runs once. If buckets are gone, re-run it:
```bash
docker compose run --rm init-buckets
```

**Backend can't connect to Postgres / Redis**
Make sure your `.env` is filled and exported, or that `application.yml` picks up the defaults (`localhost:5432`, `localhost:6379`).
