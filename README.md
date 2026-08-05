# ResuMind AI - AI-Powered Resume Analyzer & ATS Optimizer SaaS

![ResuMind AI Banner](https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop)

ResuMind AI is a startup-grade, production-ready AI SaaS platform designed to transform job search outcomes. Built with React, TypeScript, Vite, Tailwind CSS, Express.js, Supabase PostgreSQL, and Google Gemini AI (`@google/genai`), ResuMind parses candidate resumes, calculates ATS compatibility scores, identifies skill gaps, provides section-by-section improvements, and generates tailored Markdown cover letters.

---

## 🌟 Key Features

- **🔐 Supabase Auth**: Secure JWT-based authentication & user sessions.
- **📄 Document Parsing**: Multi-format document parser supporting PDF, DOCX, and plain text.
- **🤖 Gemini AI Evaluation**: Deep structured analysis using Google Gemini SDK.
- **🎯 ATS Score Gauge**: Dynamic 0–100 compatibility gauge and keyword matching.
- **💡 Skills Gap Analysis**: Instant highlight of missing vs. matched keywords against target job descriptions.
- **📝 Markdown Cover Letter Generator**: Custom cover letters tailored to role, company, and tone.
- **📊 Analytics Dashboard**: Historical reports, score trends, and filterable history table.
- **🎨 Modern Dark Glassmorphism Design**: Inspired by OpenAI, Linear, and Stripe UI.

---

## 📁 Repository Structure

```
.
├── client/              # React + Vite + TypeScript + Tailwind CSS Frontend
├── server/              # Node.js + Express + TypeScript Backend
├── database/            # Supabase PostgreSQL SQL Schema & RLS Policies
├── docs/                # Comprehensive Product Specs, Architecture & Deployment Guides
└── README.md            # Master README
```

---

## 🚀 Quick Start (Local Development)

### 1. Database Setup (Supabase)
Run the SQL queries in `database/schema.sql` inside your Supabase project's SQL Editor.

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Configure PORT, GEMINI_API_KEY, SUPABASE_URL, and SUPABASE_SERVICE_ROLE_KEY
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
cp .env.example .env
# Configure VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, and VITE_API_BASE_URL
npm run dev
```

---

## 📄 License
MIT License. Free for commercial and non-commercial use.
