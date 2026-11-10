# 🏆 Sports League Management System (SLMS)

> **Skill Development Course (SDC) Project Submission**  
> **Problem Statement #50: Sports League Management System**  
> **Full-Stack MERN Architecture (Review 2 Edition)**: React 18, Redux Toolkit (RTK Query), Node.js, Express, MongoDB Atlas, JWT Authentication, Third-Party Sports API & Vercel Production.

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel)](https://vercel.com)
[![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas%20Cloud-green?style=for-the-badge&logo=mongodb)](https://cloud.mongodb.com)
[![Redux Toolkit](https://img.shields.io/badge/State-Redux%20Toolkit%20%2B%20RTK%20Query-purple?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org)
[![JWT Auth](https://img.shields.io/badge/Auth-JWT%20%2B%20Bcrypt-blue?style=for-the-badge&logo=jsonwebtokens)](https://jwt.io)

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

## ⏱️ 2 to 3 Minute Teacher Review Walkthrough

Need to present to your teacher in under 3 minutes? Follow this exact flow:

### 📑 Browser Setup (Keep 3 Tabs Open)
1. **Tab 1: Live Production App** (Deployed on Vercel).
2. **Tab 2: MongoDB Atlas Cloud** (`cloud.mongodb.com` ➔ Database ➔ Browse Collections).
3. **Tab 3: GitHub Repository** (`github.com/sriram-40219/Sports`).

### 🎬 Minute-by-Minute Presentation Script
- **0:00 – 0:45 | Overview & Deployment**: Show your live Vercel URL. State the architecture: React 18, Redux Toolkit, Node/Express, MongoDB Atlas, JWT, and TheSportsDB API.
- **0:45 – 1:30 | Core Features**: 
  - Fan Portal: Show live match score ticker, dynamic standings table, and **Book Tickets** (CSS Grid stadium seating with dynamic QR code ticket pass).
  - Admin Portal: Switch to Admin Module to demonstrate the **Live Match Controller** (+1/-1 scores, minute clock, incident broadcasting).
- **1:30 – 2:15 | Redux & Third-Party API**: Click the **World Radar (API)** tab. Show live international data (Premier League, La Liga) fetched dynamically from **TheSportsDB** via **Redux RTK Query**.
- **2:15 – 2:45 | Cloud Database & Security Proof**:
  - Show MongoDB Atlas collections (`users`, `fixtures`, `tickets`).
  - Open DevTools (`F12` ➔ Application ➔ LocalStorage) to show signed `jwt_token`.
- **2:45 – 3:00 | Conclusion & Viva**: Invite questions.

> 📖 **Full presentation scripts:**
> - [Quick 2-Minute Review Cheat Sheet](docs/QUICK_REVIEW_GUIDE.md)
> - [Comprehensive 3-Person Team SDC Presentation Guide](docs/SDC_PRESENTATION_GUIDE.md)

---

## 💡 Quick 5-Second Viva Answers

| Question | What to Answer |
| :--- | :--- |
| **"Where is the database?"** | *"Hosted on **MongoDB Atlas Cloud Cluster** with Mongoose models for users, leagues, teams, fixtures, and tickets."* |
| **"How is authentication secured?"** | *"Passwords hashed with **bcryptjs** (10 salt rounds); API endpoints guarded by **JWT Bearer tokens** using custom Express middleware."* |
| **"Which third-party API did you use?"** | *"**TheSportsDB public API v1**, querying world leagues, stadiums, and badges dynamically via RTK Query."* |
| **"Why Redux Toolkit?"** | *"Provides centralized predictable state (`authSlice`, `uiSlice`) and **RTK Query** for automated request caching and lifecycle management."* |
| **"How does Vercel run the backend?"** | *"Using **Vercel Serverless Functions** (`api/index.js`) with an optimized cached MongoDB singleton connection and URL rewrite rules."* |

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

## 🚀 5. Deployment Setup

Your project has `vercel.json` and `api/index.js` already configured.

### Environment Variables on Vercel:
- `MONGO_URI`: `mongodb+srv://nsriramgoud746_db_user:SportsPass123@cluster0.yqubub4.mongodb.net/sports_league?retryWrites=true&w=majority`
- `JWT_SECRET`: `super_secret_sports_league_jwt_key_2026_sdc`

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
