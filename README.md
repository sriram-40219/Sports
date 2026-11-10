# 🏆 Sports League Management System (SLMS)

> **Skill Development Course (SDC) Project Submission**  
> Problem Statement #50: Sports League Management System  
> **Full-Stack MERN Architecture (Review 2 Edition)**: React 18, Redux Toolkit (RTK Query), Node.js, Express, MongoDB Atlas, JWT Authentication, Third-Party Sports API & Vercel Ready.

---

## 🚀 Review 2 Deliverables Matrix

| # | Requirement | Implementation Status | Tech Stack / Architecture |
| :--- | :--- | :---: | :--- |
| **1** | **MongoDB Database** | ✅ **100% Completed** | Live **MongoDB Atlas Cloud Database** with Mongoose schemas for `Users`, `Leagues`, `Teams`, `Fixtures`, `Tickets`. |
| **2** | **JWT Authentication** | ✅ **100% Completed** | Bcryptjs password hashing (10 salt rounds), signed 7-day JSON Web Tokens, `protect` & `adminOnly` route guards. |
| **3** | **Redux API** | ✅ **100% Completed** | **Redux Toolkit (`@reduxjs/toolkit`)** & RTK Query `sportsApi` with caching, tag invalidation & `authSlice`. |
| **4** | **Third-Party API** | ✅ **100% Completed** | Live **TheSportsDB API** integration (`useGetThirdPartySportsDataQuery`) displaying world leagues & team badges. |
| **5** | **Vercel Deployment** | ✅ **100% Completed** | Serverless API bridge (`api/index.js`), cached Mongoose connection & production `vercel.json` rewrites. |

---

## 📌 1. Problem Statement & Executive Summary

A **Sports League Management System (SLMS)** provides sports governing bodies, tournament directors, club managers, and fans with a unified digital platform to automate and streamline tournament operations:

- **Tournament Organizers (Admins)** eliminate paper-based management by digitally provisioning leagues, scheduling home-and-away fixtures, assigning match officials, and updating scores and incidents in real time.
- **Fans and Spectators (Users)** enjoy interactive live match updates, automated points standings, club rosters, player leaderboards, stadium seat booking, and global sports coverage.
- **Full-Stack Persistence**: Backed by a live cloud **MongoDB Atlas** database, protected by **JWT**, and accelerated on the frontend via **Redux Toolkit RTK Query**.

---

## 🏢 2. System Architecture

```
                          ┌──────────────────────────────┐
                          │     React 18 Frontend UI     │
                          │   (CSS Grid & Flexbox)       │
                          └──────────────┬───────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
     ┌───────────────────────┐                       ┌───────────────────────┐
     │  Redux Toolkit Store  │                       │  Third-Party API      │
     │  (authSlice, uiSlice) │                       │  (TheSportsDB API v1) │
     └───────────┬───────────┘                       └───────────────────────┘
                 │ (RTK Query with Bearer JWT)
                 ▼
     ┌───────────────────────┐
     │  Node/Express API     │
     │  (JWT Middleware)     │
     └───────────┬───────────┘
                 │
                 ▼
     ┌───────────────────────┐
     │  MongoDB Atlas Cloud  │
     │  (Collections & Schemas)│
     └───────────────────────┘
```

---

## 🔐 3. Authentication & Security (JWT + Bcrypt)

- **Registration & Login**: `POST /api/auth/register` and `POST /api/auth/login`.
- **Password Protection**: Passwords are salted and hashed with **bcryptjs** (10 rounds) before hitting MongoDB.
- **JWT Authorization**: Requests include `Authorization: Bearer <token>`.
- **Pre-Configured Demo Accounts**:
  - **Admin**: `admin@sports.com` / `admin123`
  - **Fan**: `fan@sports.com` / `user123`

---

## 🌐 4. Third-Party API Integration (TheSportsDB)

Accessible under the **World Radar (API)** tab in the Fan Portal:
- Directly communicates with **TheSportsDB public API v1** via Redux RTK Query (`useGetThirdPartySportsDataQuery`).
- Allows searching world tournaments: Premier League, La Liga, Serie A, Bundesliga, NBA, and IPL.
- Dynamically renders real-world team badges, stadium names, locations, and descriptions.

---

## 🚀 5. How to Deploy to Vercel in 2 Minutes

Your project has `vercel.json` and `api/index.js` already configured.

### Method 1: Deploy via Vercel CLI
```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Deploy from project root
cd c:\Users\Srira\Sports
vercel
```

### Method 2: Deploy via GitHub (Recommended)
1. Push your repository to your GitHub:
   ```bash
   git push -u origin master
   ```
2. Go to **[vercel.com](https://vercel.com)** and click **Add New Project**.
3. Import your `Sports` repository.
4. Under **Environment Variables**, add:
   - `MONGO_URI`: `mongodb+srv://nsriramgoud746_db_user:SportsPass123@cluster0.yqubub4.mongodb.net/sports_league?retryWrites=true&w=majority`
   - `JWT_SECRET`: `super_secret_sports_league_jwt_key_2026_sdc`
5. Click **Deploy**!
   Your site will be live on `https://your-project.vercel.app`!

---

## 💻 6. Running Locally

### Start Backend:
```bash
cd server
npm start
# Runs on http://localhost:5000
```

### Start Frontend:
```bash
cd ..
npm run dev
# Runs on http://localhost:3000
```
