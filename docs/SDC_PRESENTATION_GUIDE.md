# 🏆 3-Person SDC Project Review Presentation Guide
## Problem Statement #50: Sports League Management System (SLMS)

---

## 👥 Overview & Team Role Allocation

| Presenter | Role & Topic | Duration | Key Focus Area |
| :--- | :--- | :--- | :--- |
| **Presenter 1** | Team Leader & System Architect | **~2.5 mins** | Problem statement, stakeholder decomposition, React Functional architecture, CSS Grid/Flexbox design, LocalStorage auth & module redirection. |
| **Presenter 2** | Admin Operations & Match Controller | **~3.0 mins** | Tournament provisioning, club/roster management, fixture scheduling, and the live score controller demonstration. |
| **Presenter 3** | Fan Experience, Standings & Viva Lead | **~3.0 mins** | Fan dashboard, live match center, dynamic points calculation algorithm, CSS Grid stadium ticket booking, and LocalStorage inspection. |

---

## 🎙️ PART 1: PRESENTER 1 (Introduction, Architecture & Authentication)
*Estimated Duration: ~2.5 Minutes*

### Slide 1: Problem Statement & Real-World Motivation
- **On Screen:** Title slide showing Problem Statement #50 and core objectives.
- **Speaking Script:**
  > *"Good morning respected evaluators and faculty. Today, our team is presenting our SDC Project on **Problem Statement #50: Sports League Management System**.*
  >
  > *Traditional sports operations are often disorganized, relying on manual paper scorecards or isolated spreadsheets. This causes match scheduling conflicts, delayed score updates, and chaotic ticketing. Our platform provides an integrated web platform that streamlines administration for league organizers while offering a dynamic, real-time experience for fans."*

### Slide 2: Business System & Module Decomposition
- **On Screen:** High-level architecture diagram displaying the **Admin Module** and **User Module**.
- **Speaking Script:**
  > *"To strictly adhere to SDC requirement #2, our project is partitioned into two distinct business modules:*
  > 
  > 1. *The **Admin Module**: Designed for tournament directors to create leagues, register clubs, manage player rosters, schedule fixtures, adjust scores live, and track ticket revenues.*
  > 2. *The **User Module**: Built for fans and spectators to follow live matches, track automated league standings, browse player statistics, and book stadium tickets.*
  > 
  > *Both modules share a synchronized state engine, so changes made by organizers update immediately on fan screens."*

### Slide 3: Technology Stack & LocalStorage Authentication
- **On Screen:** Tech badges (React Functional Components, CSS Grid, Flexbox, LocalStorage) and the Login modal.
- **Speaking Script:**
  > *"We developed the application using **React Functional Components and React Hooks** (`useState`, `useEffect`, `useContext`). In accordance with Requirement #4, all layouts are built strictly using **CSS Grid and Flexbox** without bloated external UI frameworks.*
  >
  > *For authentication (Requirement #5 & #6), credentials and sessions are persisted in **LocalStorage**. When a user logs in, JavaScript evaluates their role and triggers **module-wise redirection**—routing administrators directly to the Admin Console and fans to the Fan Portal."*
- **Live Demo Action:** Presenter 1 clicks **Login** on screen, displays the quick 1-click role buttons, and introduces Presenter 2.
- **Handover Line:**
  > *"Now, I hand over to my teammate [Presenter 2's Name], who will walk you through the administrative operations and our live match engine."*

---

## 🎙️ PART 2: PRESENTER 2 (Admin Operations & Live Match Controller)
*Estimated Duration: ~3.0 Minutes*

### Slide 4: Tournament & Team Roster Provisioning
- **On Screen:** Admin Dashboard ➔ **Manage Leagues** and **Teams & Rosters** views.
- **Speaking Script:**
  > *"Thank you, [Presenter 1]. In the **Admin Module**, organizers have complete CRUD authority over multi-sport tournaments. As you can see, we have pre-configured leagues for Football, Cricket, and Basketball with customizable seasons, logos, and competition rules.*
  >
  > *Under **Teams & Rosters**, administrators register competing franchises—assigning home stadiums, spectator capacity, and head coaches. In addition, admins manage player contracts and rosters, defining jersey numbers, positions, goals, assists, and performance ratings."*

### Slide 5: Fixture Scheduling Center
- **On Screen:** **Schedule Fixtures** table and modal.
- **Speaking Script:**
  > *"Our **Fixture Manager** prevents venue and timing clashes. Administrators select home and away clubs, match date, kickoff time, and stadium venue, while setting base ticket pricing and seat allocation. Fixtures transition across three lifecycle states: `UPCOMING`, `LIVE`, and `COMPLETED`."*

### Slide 6: Real-Time Live Match Controller (The Core Engine)
- **On Screen:** **Live Match Controller** console.
- **Speaking Script:**
  > *"The centerpiece of our administrative portal is the **Live Match Controller**. Match officials can set any game to `LIVE` with a single click.*
  >
  > *Using our real-time controls, officials increment or decrement scores (+1 / -1), advance the match minute clock (`15'`, `45'`, `HT`, `90'+4`), and broadcast live events like goals, cards, boundaries, and wickets into the incident feed.*
  >
  > *Every update immediately saves to LocalStorage, enabling real-time reactive updates across the entire application."*
- **Live Demo Action:** Presenter 2 clicks `+1 Goal` for Thunder Hawks FC and logs an event: *"⚽ GOAL! Gabriel Vance volley into top corner"*.
- **Handover Line:**
  > *"Now, my teammate [Presenter 3's Name] will show you how these updates instantly reflect on the fan portal, explain our dynamic standings algorithm, and demonstrate stadium ticketing."*

---

## 🎙️ PART 3: PRESENTER 3 (Fan Experience, Standings & LocalStorage Proof)
*Estimated Duration: ~3.0 Minutes*

### Slide 7: Fan Portal & Live Match Center Sync
- **On Screen:** Click the **User / Fan Module** pill ➔ Open **Live Match Center**.
- **Speaking Script:**
  > *"Thank you, [Presenter 2]. As you can see on screen, the moment we switch back to the **User Module**, the score and incident that [Presenter 2] broadcasted are already live without refreshing the page!*
  >
  > *The **Live Match Center** features an animated pulse indicator, tactical head-to-head statistics (Possession %, Total Shots, Fouls, Pass Accuracy), and a chronological incident commentary timeline."*

### Slide 8: Dynamic Standings & Player Leaderboards
- **On Screen:** **Standings & Points** table and **Player Stats** leaderboard.
- **Speaking Script:**
  > *"Rather than hardcoding table rankings, our system features a **dynamic standings algorithm**. It iterates over all completed matches in LocalStorage, calculates Points (3 points for a Win, 1 for a Draw, 0 for a Loss), computes Goal Difference, and sorts clubs automatically.*
  >
  > *Under **Player Stats**, we display podium leaderboards for Golden Boot scorers, playmaking assists, and top MVP ratings."*

### Slide 9: CSS Grid Stadium Ticketing & Digital QR Passes
- **On Screen:** **Book Tickets** view with interactive CSS Grid stadium map.
- **Speaking Script:**
  > *"For fan engagement, we designed an **Interactive Stadium Ticketing System**. The seating layout is built using an **8-column CSS Grid** with visual pitch zones.*
  >
  > *Fans select their seating tier (VIP Grandstand, Premium Club, or General Bleachers), click desired seats on the interactive map, and review real-time pricing.*
  >
  > *Upon checkout, the system generates a verified digital ticket pass complete with unique ticket ID and a dynamic SVG QR code for stadium turnstile validation."*
- **Live Demo Action:** Presenter 3 books seat `B4`, confirms the booking, and displays the generated digital QR ticket pass.

### Slide 10: LocalStorage Data Verification (The Proof)
- **On Screen:** Press `F12` ➔ Open **Application** Tab ➔ **Local Storage** ➔ `http://localhost:3000`.
- **Speaking Script:**
  > *"To verify requirement compliance for LocalStorage persistence, here is our live browser storage inspector.*
  >
  > *You can inspect the `sports_fixtures` key containing our live score update, `sports_tickets` containing the ticket we just booked, and `sports_current_user` containing active session credentials."*
- **Concluding Line:**
  > *"This concludes our presentation of the Sports League Management System. We have satisfied all 8 SDC Review 1 requirements. We are now open for faculty feedback and viva questions. Thank you!"*
