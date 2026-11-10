# 🏆 SportsHub - Sports League Management System (SLMS)

SportsHub is a full-stack, enterprise-grade sports management and fan engagement platform built on the **MERN** stack (MongoDB, Express, React, Node.js), powered by **Redux Toolkit & RTK Query**, and secured with **JSON Web Tokens (JWT)**.

[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=flat&logo=react)](https://react.dev)
[![Redux Toolkit](https://img.shields.io/badge/State-Redux%20Toolkit%20%2B%20RTK%20Query-764ABC?style=flat&logo=redux)](https://redux-toolkit.js.org)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%26%20Express-339933?style=flat&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=flat&logo=mongodb)](https://cloud.mongodb.com)
[![JWT](https://img.shields.io/badge/Auth-JWT%20%2B%20Bcrypt-000000?style=flat&logo=jsonwebtokens)](https://jwt.io)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?style=flat&logo=vercel)](https://vercel.com)

---

## 📌 Features

### 👤 Fan & User Experience
- **Live Match Center**: Real-time score ticker, match clock, possession and tactical stats, and a chronological incident commentary feed.
- **Dynamic Standings Engine**: Automated points, wins, draws, losses, and goal difference calculations.
- **Interactive Stadium Ticketing**: Interactive CSS Grid seating map with tiered pricing (VIP, Club, Bleachers) and instant digital ticket generation with dynamic QR code validation.
- **Player & Squad Directory**: Complete team rosters, player profiles, and statistical leaderboards.
- **World Sports Radar**: Third-party external API integration querying international leagues, stadiums, and team badges in real time.

### 🛡️ League Administration
- **Tournament & League Provisioning**: Create and manage multi-sport tournaments, seasons, and rules.
- **Team & Roster Management**: Provision competing clubs, manage player contracts, and assign home venues.
- **Fixture Scheduling**: Clash-free calendar planning with venue assignment and ticket pricing.
- **Live Match Controller**: Real-time score incrementing (+1 / -1), match clock management, and instant incident broadcasting.

---

## 🏗️ Architecture & Technology Stack

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
     │  (Mongoose Schemas)   │
     └───────────────────────┘
```

- **Frontend**: React 18, Vite, Pure CSS (CSS Grid & Flexbox layouts, responsive design, zero UI framework bloat).
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`), RTK Query (`sportsApi`), slice-based auth and UI management.
- **Backend API**: Node.js, Express.js REST API with modular routers and controllers.
- **Database**: MongoDB Atlas Cloud, Mongoose ODM with validated schemas and pre-save password encryption.
- **Authentication**: Stateless JSON Web Tokens (JWT) signed with secret keys, stored in client storage, and validated via Bearer authorization middleware.
- **Third-Party API**: TheSportsDB public API integration for live global football league data.
- **Deployment**: Vercel Serverless Functions (`api/index.js`) and Vite static production build.

---

## 📂 Project Structure

```
Sports/
├── api/
│   └── index.js                 # Vercel serverless function entrypoint
├── server/
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification and role authorization
│   ├── models/
│   │   ├── Fixture.js           # Fixture & live incident schema
│   │   ├── League.js            # League & season schema
│   │   ├── Team.js              # Team and player roster schema
│   │   ├── Ticket.js            # Stadium seat booking schema
│   │   └── User.js              # User auth and bcrypt password hashing
│   ├── routes/
│   │   ├── authRoutes.js        # /api/auth/register, /api/auth/login, /api/auth/me
│   │   ├── fixtureRoutes.js     # /api/fixtures CRUD and score updating
│   │   ├── leagueRoutes.js      # /api/leagues CRUD
│   │   ├── teamRoutes.js        # /api/teams CRUD
│   │   └── ticketRoutes.js      # /api/tickets booking and user tickets
│   ├── seed.js                  # Database seeder script
│   └── server.js                # Express app configuration & DB connection
├── src/
│   ├── components/              # Shared navigation, footer, auth modal
│   ├── context/                 # Application context fallbacks
│   ├── data/                    # Initial seed data constants
│   ├── modules/
│   │   ├── admin/               # League, team, fixture, and live match controllers
│   │   └── user/                # Fan dashboard, standings, tickets, world radar
│   ├── redux/
│   │   ├── api/sportsApi.js     # RTK Query service endpoints & external API
│   │   ├── slices/              # authSlice, uiSlice
│   │   └── store.js             # Central Redux store
│   ├── App.jsx                  # Root application router
│   ├── index.css                # Global theme, CSS Grid & Flexbox styling
│   └── main.jsx                 # React root wrapped in Redux Provider
├── package.json                 # Frontend dependencies and build scripts
├── vercel.json                  # Production rewrite rules for serverless API
└── vite.config.js               # Vite build configuration & local dev proxy
```

---

## ⚙️ API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new user account (hashes password with bcrypt)
- `POST /api/auth/login` - Authenticate user and return signed 7-day JWT token
- `GET /api/auth/me` - Retrieve current user profile (requires Bearer token)

### Leagues & Teams
- `GET /api/leagues` - List all active leagues
- `POST /api/leagues` - Create a new tournament league (Admin only)
- `GET /api/teams` - List teams with embedded player rosters
- `POST /api/teams` - Create a new club franchise (Admin only)

### Fixtures & Live Controller
- `GET /api/fixtures` - List scheduled, live, and completed matches
- `POST /api/fixtures` - Schedule a new match fixture (Admin only)
- `PUT /api/fixtures/:id/score` - Live update match score and broadcast incidents (Admin only)

### Ticketing
- `POST /api/tickets/book` - Reserve stadium seats and generate QR ticket
- `GET /api/tickets/my` - Fetch tickets booked by the authenticated user

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn
- MongoDB Atlas connection string

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/sriram-40219/Sports.git
cd Sports

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Configure Environment Variables
Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 3. Run Locally

**Start the Backend Server:**
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

**Start the Frontend App:**
```bash
# In the root project directory
npm run dev
# Application opens on http://localhost:3000
```

---

## 🌐 Production Deployment

The project is structured for zero-configuration continuous deployment on **Vercel**:
- Backend routes under `/api/*` are executed by Vercel Serverless Functions via `api/index.js`.
- Frontend assets are compiled with Vite and served globally through Vercel's edge network.
- Environment variables (`MONGO_URI` and `JWT_SECRET`) are configured directly in the Vercel Project Settings.

---

## 📄 License
This project is open-source and available under the MIT License.
