# Deployment Guide - ResuMind AI

## 1. Supabase Database Setup
1. Log into [Supabase Dashboard](https://app.supabase.com) and create a new project.
2. Navigate to **SQL Editor**.
3. Copy the contents of `database/schema.sql` and click **Run**.
4. Retrieve your **Project URL** and **Anon Key** from **Project Settings > API**.
5. Copy your **JWT Secret** or Service Role Key for backend token verification.

## 2. Express Backend Deployment (Render / Railway)

### Render Deployment
1. Connect your GitHub repository to [Render](https://render.com).
2. Create a new **Web Service**.
3. Set root directory to `server`.
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`
6. Add Environment Variables:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `GEMINI_API_KEY`: `your_gemini_api_key`
   - `SUPABASE_URL`: `https://your-project.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: `your_supabase_service_role_key`
   - `CLIENT_ORIGIN`: `https://your-frontend.vercel.app`

## 3. Frontend Deployment (Vercel)
1. Import your project into [Vercel](https://vercel.com).
2. Set root directory to `client`.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add Environment Variables:
   - `VITE_SUPABASE_URL`: `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `your_supabase_anon_key`
   - `VITE_API_BASE_URL`: `https://your-backend.onrender.com/api/v1`
7. Click **Deploy**.
