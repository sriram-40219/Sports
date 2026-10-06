# 🏆 Sports League Management System (SLMS)

> **Skill Development Course (SDC) Project Submission**  
> Problem Statement #55: Sports League Management System  
> Built with: React Functional Components, HTML5, CSS3 (CSS Grid & Flexbox), and LocalStorage.

---

## 📌 1. Problem Statement & Executive Summary

A **Sports League Management System (SLMS)** provides sports governing bodies, tournament directors, club managers, and fans with a unified digital platform to automate and streamline tournament operations:

- **Tournament Organizers (Admins)** eliminate paper-based management by digitally provisioning leagues, scheduling home-and-away fixtures, assigning match officials, and updating scores and incidents in real time.
- **Fans and Spectators (Users)** enjoy interactive live match updates, automated points standings, club rosters, player leaderboards (Golden Boot, MVP race), fan opinion polls, and an interactive stadium seat-selection ticket booking portal with scannable digital admission passes.
- **Data Persistence**: All operations, user sessions, league standings, live score events, and ticket reservations persist dynamically using client-side **LocalStorage**.

---

## 🏢 2. Business System & Architecture

The system features two primary, decoupled functional modules with role-based navigation:

```
                          ┌──────────────────────────────┐
                          │   SportsHub Platform Core    │
                          │   (LocalStorage State Sync)  │
                          └──────────────┬───────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
     ┌───────────────────────┐                       ┌───────────────────────┐
     │     ADMIN MODULE      │                       │      USER MODULE      │
     ├───────────────────────┤                       ├───────────────────────┤
     │ • Tournament Manager  │                       │ • Fan Home Dashboard  │
     │ • Club & Roster CRUD  │                       │ • Live Match Center   │
     │ • Fixture Scheduling  │                       │ • Fixtures & Results  │
     │ • Live Score Console  │                       │ • Dynamic Standings   │
     │ • Ticketing & Revenue │                       │ • Stadium Seat Map    │
     │ • Editorial & Alerts  │                       │ • My E-Tickets Pass   │
     └───────────────────────┘                       │ • Fan Polls & News    │
                                                     └───────────────────────┘
```

### 🛡️ Module 1: Admin Module
1. **Executive Overview Dashboard**: High-level KPIs tracking active leagues, registered clubs, live matches in progress, and gross ticket revenue.
2. **League & Tournament Management**: Full CRUD capabilities to create, edit, and archive tournaments across sports (Football, Cricket, Basketball) with season years, logos, and competition formats.
3. **Club & Roster Management**: Provision clubs with logos, home stadiums, seating capacity, head coaches, and manage athlete rosters (jersey numbers, positions, goals, assists, ratings).
4. **Fixture Scheduling Center**: Schedule matches by selecting competing clubs, match dates, kickoff times, stadium venues, and seat pricing.
5. **Real-Time Live Match Controller**:
   - Live status switcher: `UPCOMING` ➔ `LIVE` ➔ `COMPLETED (FT)`.
   - Scoreboard increments: `+1` / `-1` point buttons for Home and Away clubs.
   - Match clock manipulator (`15'`, `45'`, `HT`, `90'+4`, `FT`).
   - Incident broadcaster: Log goals, yellow/red cards, wickets, boundaries, and penalties directly into the live feed.
6. **Ticket Sales & Revenue Auditing**: Complete audit log of all fan bookings, seat allocations, order values, and gross revenue metrics.
7. **Editorial & Push Alert Publisher**: Publish tournament news stories and broadcast instant push notifications to fans.

### ⚽ Module 2: User / Fan Module
1. **Fan Dashboard**: Live match ticker with animated `LIVE` beacon, upcoming games list, standings preview, and interactive fan poll.
2. **Live Match Center**: Big-screen scoreboard, team line-ups, live match clock, tactical head-to-head statistics (Possession, Shots, Fouls, Pass Accuracy), and chronological event commentary.
3. **Fixtures & Tournament Schedule**: Search and filter matches by tournament, status (`ALL`, `LIVE`, `UPCOMING`, `COMPLETED`), or stadium venue.
4. **Dynamic Points Table & Standings**: Automatically computes Points, Played, Won, Drawn, Lost, Goals For, Goals Against, Goal Difference, and recent form (`W`/`D`/`L`) from completed fixture outcomes.
5. **Team Explorer & Squad Rosters**: Explore clubs by league, view stadium capacity, coach information, and expand full athlete cards.
6. **Player Leaderboard**: Podium rankings (1st, 2nd, 3rd) and data tables for Top Scorers (Golden Boot), Top Assists, and MVP Ratings.
7. **Interactive Stadium Ticket Booking**:
   - CSS Grid-powered interactive stadium map with realistic pitch and seat layout (`A-1` through `D-8`).
   - Tier selection: VIP Grandstand, Premium Club, General Bleachers.
   - Real-time cart calculation and one-click checkout.
   - Instant digital admission pass with unique scannable QR code.
8. **My Passes & Booking History**: View purchased digital tickets, print passes, or cancel bookings with automatic inventory restitution.
9. **Fan Engagement & News**: Read match previews and vote in live polls with real-time percentage graphs.

---

## 🎨 3. UI Template: CSS Grid & Flexbox Architecture

Strictly adheres to requirement #4 without external heavy UI component libraries:
- **CSS Grid** (`display: grid`):
  - `.grid-cols-4`, `.grid-cols-3`, `.grid-cols-2` for responsive KPI metric cards.
  - `.seat-grid`: 8-column stadium seating layout (`repeat(8, 1fr)`).
  - `.standings-table`: Dynamic multi-column points table.
  - `.fixture-teams-grid`: 3-column layout (Home Team, Central Score, Away Team).
- **Flexbox** (`display: flex`):
  - Sticky glassmorphic top navigation bar.
  - Horizontal scrollable sub-navigation pills (`.subnav-tabs`).
  - Interactive ticket vouchers (`.ticket-pass`) and scannable QR ticket cards.
  - Modal dialogues (`.modal-overlay`, `.modal-box`).

---

## 🔐 4. Authentication & LocalStorage Architecture

Implemented strictly using browser `localStorage` under isolated keys:

| LocalStorage Key | Description |
| :--- | :--- |
| `slms_users` | Array of registered user profiles (name, email, password, role, avatar) |
| `slms_current_user` | Active session token and logged-in user profile |
| `slms_leagues` | Tournament competitions and sport rules |
| `slms_teams` | Participating sports clubs and player squad rosters |
| `slms_fixtures` | Match schedule, live minute clock, and event timelines |
| `slms_tickets` | Fan ticket reservations, allocated seats, and QR codes |
| `slms_news` | Editorial news stories and match reports |
| `slms_poll` | Interactive fan poll options and live vote counts |
| `slms_notifications` | Push alert notifications with read/unread statuses |

### ⚡ Pre-Configured Demo Accounts (For SDC Review Evaluation)
| Role | Email | Password | Landing Redirection |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@sports.com` | `admin123` | Redirects to **Admin Module** (`/admin`) |
| **Fan / User** | `fan@sports.com` | `user123` | Redirects to **User Module** (`/user`) |

*(Also includes 1-Click Instant Login buttons directly inside the login modal for quick evaluation!)*

---

## 🚀 5. How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- Modern Web Browser (Chrome, Edge, Firefox, Safari)

### Installation Steps
```bash
# 1. Clone repository
git clone <your-repository-url>
cd Sports

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The application will launch at: `http://localhost:3000` (or `http://localhost:5173`).

### Production Build
```bash
npm run build
npm run preview
```

---


## 👨‍💻 SDC Project Evaluation Checklist
- [x] Problem statement understood and documented
- [x] Admin Module implemented with complete tournament controls
- [x] User Module implemented with live scores, standings, and ticket booking
- [x] Built using React Functional Components
- [x] CSS Grid & Flexbox templates implemented throughout
- [x] Signup & Login functionality using LocalStorage
- [x] Module-wise navigation and redirection using JavaScript
- [x] All functionalities tested and verified
- [x] Ready to push to GitHub
