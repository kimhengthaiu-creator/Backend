# Vibelearn Production Deployment Guide

This guide covers deploying Vibelearn to production using **Vercel** for the React frontend and **Render** for the Express backend.

---

## Architecture Overview

- **Frontend:** React (Vite) Single Page Application hosted on **Vercel**.
- **Backend:** Node.js (Express) REST API hosted on **Render**.
- **Database:** PostgreSQL hosted on **Supabase**.
- **Authentication:** **Clerk** (Publishable key on frontend & backend, Secret key on backend only).

---

## 1. Backend Deployment (Render)

### Steps
1. Push the repository to GitHub.
2. Log into [Render Dashboard](https://dashboard.render.com).
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository.
5. Configure the service:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free` (or higher)

### Environment Variables on Render
Add the following under **Environment Variables**:

| Variable | Description | Example |
|---|---|---|
| `NODE_ENV` | Runtime environment | `production` |
| `PORT` | Server listening port | `10000` |
| `DATABASE_URL` | Supabase connection string | `postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres` |
| `CLERK_PUBLISHABLE_KEY` | Clerk Publishable Key | `pk_live_...` |
| `CLERK_SECRET_KEY` | Clerk Secret Key (Server Only) | `sk_live_...` |
| `FRONTEND_URL` | Allowed frontend origins (comma-separated) | `https://vibelearn.vercel.app,https://vibelearn-*.vercel.app` |

### Database Migrations & Seeding (One-time)
From Render's Shell or locally pointing to production `DATABASE_URL`:
```bash
npm run db:push
npm run db:seed
```

---

## 2. Frontend Deployment (Vercel)

### Steps
1. Log into [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. Configure project settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### Environment Variables on Vercel
Add the following in project **Settings -> Environment Variables**:

| Variable | Description | Example |
|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk Publishable Key | `pk_live_...` |
| `VITE_API_URL` | URL of your deployed Render backend | `https://vibelearn-backend.onrender.com/api` |

### SPA Routing
The included `frontend/vercel.json` automatically configures URL rewrites so all route paths (`/courses`, `/my-learning`, `/courses/:slug/lessons/:lessonSlug`) route through `index.html` without 404 errors.

---

## 3. Post-Deployment Verification Checklist

1. [ ] **Health Check:** Open `https://<render-backend-url>/api/health` and verify `{"status":"ok"}`.
2. [ ] **Public Catalog:** Navigate to `https://<vercel-frontend-url>` and confirm courses load from live API.
3. [ ] **Course Details:** Open a course page to verify module and lesson hierarchies.
4. [ ] **Video Lesson:** Open a lesson page and verify the YouTube player loads with notes.
5. [ ] **Authentication:** Sign in via Clerk and verify user profile avatar in the navigation bar.
6. [ ] **Progress Tracking:** Watch a lesson, click "Mark as Complete", and confirm `/my-learning` updates accurately.
