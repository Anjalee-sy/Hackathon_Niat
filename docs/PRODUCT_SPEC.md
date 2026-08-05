# ResuMind AI - Product Specification & Deliverables

## 1. Problem Statement
Job seekers frequently struggle to land interviews due to Automated Applicant Tracking Systems (ATS) filtering out non-optimized resumes before human recruiters ever see them. Most resumes lack keyword alignment, contain formatting pitfalls, fail to quantify achievements, or lack section clarity. Job seekers also spend hours manually crafting customized cover letters for every application.

## 2. Solution
ResuMind AI is an enterprise-grade AI Resume Assistant SaaS that parses candidate resumes (PDF, DOCX, Text), evaluates them against targeted job descriptions using Google Gemini AI, scores ATS compatibility (0–100), extracts matched vs. missing skills, detects grammar/formatting issues, provides section-by-section improvement recommendations, and automatically generates customized Markdown cover letters.

## 3. Market Research & Competitive Landscape
- **Market Size**: Global online recruitment and career services market exceeds $30B annually, with job search tools seeing massive adoption.
- **Target Audience**: Mid-level professionals, tech talent, recent graduates, career pivoters, executive candidates.
- **Key Differentiators**:
  - Deep Gemini AI parsing precision with structured JSON outputs.
  - Granular ATS score breakdown with real-time skill gap analysis.
  - Markdown cover letter generator contextualized on candidate history and job requirements.
  - OpenAI/Linear-grade glassmorphism UX with instant dashboard analytics.

## 4. User Personas

### Persona A: Sarah Jenkins (Software Engineer, 4 YOE)
- **Goal**: Transition to Senior Full-Stack Lead at a top-tier tech firm.
- **Pain Point**: Resumes getting rejected by ATS algorithms without feedback.
- **ResuMind Usage**: Uses ATS Compatibility Scorer to identify missing keywords (e.g. Docker, GraphQL) and generates tailored cover letters.

### Persona B: Marcus Vance (Recent Product Management Graduate)
- **Goal**: Land first Associate Product Manager (APM) role.
- **Pain Point**: Resume lacks strong action verbs and quantified metric bullet points.
- **ResuMind Usage**: Uses Section-by-Section AI recommendations to rewrite experience items into high-impact STAR framework achievements.

## 5. Comprehensive Feature List
- **Authentication**: Email/password registration & login via Supabase Auth with JWT authorization.
- **Multi-Format Resume Upload**: Drag-n-drop PDF, DOCX, or plain text file uploader with paste text fallbacks.
- **Document Parsing Engine**: Server-side parsing with `pdf-parse` and `mammoth` for zero client overhead.
- **AI Resume Audit**: In-depth strengths, weaknesses, grammar corrections, and formatting checks using `@google/genai`.
- **ATS Compatibility Score Gauge**: Dynamic visual gauge (0–100), keyword match percentage, and list of missing skills.
- **Actionable Suggestions**: Specific rewrites for Summary, Experience, Skills, and Education sections.
- **Tailored Cover Letter Generator**: Generates customized Markdown cover letters incorporating target job descriptions and company details.
- **Analysis History & Analytics Dashboard**: Track historical scores, search prior reports, filter by company/role, and delete past records.
- **Modern Dark UI**: Glassmorphism aesthetic, responsive drawer navigation, loading skeletons, and interactive charts.
