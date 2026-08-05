# ResuMind AI - System Architecture & API Design

## System Architecture Diagram

```
+-------------------------------------------------------------------------+
|                              FRONTEND                                   |
|   React + Vite + TypeScript + Tailwind CSS + Lucide Icons + TanStack    |
|   - Responsive Dark Mode UI / Glassmorphism                             |
|   - Supabase Client Auth State Management                               |
+------------------------------------+------------------------------------+
                                     | REST (HTTPS + Bearer JWT)
                                     v
+-------------------------------------------------------------------------+
|                              BACKEND                                    |
|   Node.js + Express.js API + TypeScript                                 |
|   - Helmet Security, Rate Limiter, CORS, Zod Request Sanitization       |
|   - Multer File Upload Handler (PDF / DOCX / TXT)                       |
|   - File Parser Service (pdf-parse / mammoth)                           |
+--------------+------------------------------------+---------------------+
               |                                    |
               v                                    v
+------------------------------+   +--------------------------------------+
|    DATABASE & STORAGE        |   |           AI INFERENCE               |
|  Supabase PostgreSQL         |   | Google Gemini API (@google/genai SDK)|
|  - RLS Policies              |   | - Structured JSON Prompt Outputs     |
|  - Profiles, Resumes,        |   | - Resume Analysis & ATS Scoring      |
|    Analyses, Cover Letters   |   | - Cover Letter Generation            |
+------------------------------+   +--------------------------------------+
```

## Backend API Specification

| Method | Endpoint | Authorization | Description | Zod Validation Body / Params |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/health` | None | API Healthcheck | None |
| `POST` | `/api/v1/resume/upload` | Bearer JWT | Upload PDF/DOCX/TXT or raw text | `multipart/form-data` or `json: { title, text }` |
| `POST` | `/api/v1/resume/analyze` | Bearer JWT | AI Analysis & ATS Evaluation | `{ resumeId / rawText, jobTitle, jobDescription, targetCompany }` |
| `POST` | `/api/v1/cover-letter` | Bearer JWT | Generate Markdown Cover Letter | `{ resumeId / rawText, jobTitle, jobDescription, companyName, tone }` |
| `GET` | `/api/v1/history` | Bearer JWT | Fetch user analysis history | Query params: `page`, `limit`, `search` |
| `GET` | `/api/v1/analysis/:id` | Bearer JWT | Get detailed analysis report by ID | Path param: `id` (UUID) |
| `DELETE` | `/api/v1/analysis/:id` | Bearer JWT | Delete historical analysis record | Path param: `id` (UUID) |

## Security Features
1. **Supabase JWT Verification**: All `/api/v1/*` protected routes pass through `authMiddleware.ts` which decodes and verifies the bearer token with Supabase Auth service.
2. **Server-Side AI API Key Safety**: `GEMINI_API_KEY` is strictly held in environment variables on the backend; the client never exposes AI keys.
3. **Row Level Security (RLS)**: PostgreSQL tables isolate candidate data using `auth.uid() = user_id`.
4. **Input Sanitization & Zod Schema Guarding**: Every POST request payload is strictly validated using Zod schemas before entering controllers.
