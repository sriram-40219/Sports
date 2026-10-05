import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

// User Module Components
import { UserDashboard } from './modules/user/UserDashboard';
import { LiveScores } from './modules/user/LiveScores';
import { FixturesSchedule } from './modules/user/FixturesSchedule';
import { StandingsTable } from './modules/user/StandingsTable';
import { TeamsExplorer } from './modules/user/TeamsExplorer';
import { PlayerStats } from './modules/user/PlayerStats';
import { TicketBooking } from './modules/user/TicketBooking';
import { MyTickets } from './modules/user/MyTickets';
import { NewsFeed } from './modules/user/NewsFeed';

// Admin Module Components
import { AdminDashboard } from './modules/admin/AdminDashboard';
import { LeagueManager } from './modules/admin/LeagueManager';
import { TeamManager } from './modules/admin/TeamManager';
import { FixtureManager } from './modules/admin/FixtureManager';
import { LiveMatchControl } from './modules/admin/LiveMatchControl';
import { TicketSales } from './modules/admin/TicketSales';
import { NewsManager } from './modules/admin/NewsManager';

import {
  Home,
  Radio,
  Calendar,
  Trophy,
  Users,
  Award,
  Ticket,
  Newspaper,
  LayoutDashboard,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

const MainApp = () => {
  const { 
    currentModule, 
    currentView, 
    setCurrentView, 
    toast, 
    currentUser,
    tickets,
    fixtures 
  } = useApp();

  const userTicketsCount = currentUser 
    ? tickets.filter(t => t.userId === currentUser.id || t.userEmail === currentUser.email).length 
    : 0;

  const liveMatchesCount = fixtures.filter(f => f.status === 'LIVE').length;

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar />

      <main className="main-content">
        {/* Module Sub-Navigation Bar (Flexbox) */}
        <nav className="subnav-tabs">
          {currentModule === 'user' ? (
            /* User Module Views */
            <>
              <button
                className={`tab-btn ${currentView === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentView('dashboard')}
              >
                <Home size={15} />
                <span>Dashboard</span>
              </button>
              <button
                className={`tab-btn ${currentView === 'live' ? 'active' : ''}`}
                onClick={() => setCurrentView('live')}
              >
                <Radio size={15} color={liveMatchesCount > 0 ? "var(--accent-red)" : "currentColor"} />
                <span>Live Match Center</span>
                {liveMatchesCount > 0 && <span className="badge-counter">{liveMatchesCount}</span>}
              </button>
              <button
                className={`tab-btn ${currentView === 'fixtures' ? 'active' : ''}`}
                onClick={() => setCurrentView('fixtures')}
              >
                <Calendar size={15} />
                <span>Fixtures & Schedule</span>
              </button>
              <button
                className={`tab-btn ${currentView === 'standings' ? 'active' : ''}`}
                onClick={() => setCurrentView('standings')}
              >
                <Trophy size={15} />
                <span>Standings & Points</span>
              </button>
              <button
                className={`tab-btn ${currentView === 'teams' ? 'active' : ''}`}
                onClick={() => setCurrentView('teams')}
              >
                <Users size={15} />
                <span>Teams & Squads</span>
              </button>
              <button
                className={`tab-btn ${currentView === 'players' ? 'active' : ''}`}
                onClick={() => setCurrentView('players')}
              >
                <Award size={15} />
                <span>Player Stats</span>
              </button>
              <button
                className={`tab-btn ${currentView === 'tickets' ? 'active' : ''}`}
                onClick={() => setCurrentView('tickets')}
              >
                <Ticket size={15} />
                <span>Book Tickets</span>
              </button>
              <button
                className={`tab-btn ${currentView === 'news' ? 'active' : ''}`}
                onClick={() => setCurrentView('news')}
              >
                <Newspaper size={15} />
                <span>News & Fan Poll</span>
              </button>
              {currentUser && (
                <button
                  className={`tab-btn ${currentView === 'my-bookings' ? 'active' : ''}`}
                  onClick={() => setCurrentView('my-bookings')}
                >
                  <Ticket size={15} color="var(--primary)" />
                  <span>My Passes</span>
                  {userTicketsCount > 0 && (
                    <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--primary)', padding: '2px 6px', fontSize: '0.7rem' }}>
                      {userTicketsCount}
                    </span>
                  )}
                </button>
              )}
            </>
          ) : (
            /* Admin Module Views */
            <>
              <button
                className={`tab-btn admin-tab ${currentView === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentView('dashboard')}
              >
                <LayoutDashboard size={15} />
                <span>Admin Overview</span>
              </button>
              <button
                className={`tab-btn admin-tab ${currentView === 'leagues' ? 'active' : ''}`}
                onClick={() => setCurrentView('leagues')}
              >
                <Trophy size={15} />
                <span>Manage Leagues</span>
              </button>
              <button
                className={`tab-btn admin-tab ${currentView === 'teams' ? 'active' : ''}`}
                onClick={() => setCurrentView('teams')}
              >
                <Users size={15} />
                <span>Teams & Rosters</span>
              </button>
              <button
                className={`tab-btn admin-tab ${currentView === 'fixtures' ? 'active' : ''}`}
                onClick={() => setCurrentView('fixtures')}
              >
                <Calendar size={15} />
                <span>Schedule Fixtures</span>
              </button>
              <button
                className={`tab-btn admin-tab ${currentView === 'live-control' ? 'active' : ''}`}
                onClick={() => setCurrentView('live-control')}
              >
                <Radio size={15} color="var(--accent-red)" />
                <span>Live Match Controller</span>
              </button>
              <button
                className={`tab-btn admin-tab ${currentView === 'tickets' ? 'active' : ''}`}
                onClick={() => setCurrentView('tickets')}
              >
                <DollarSign size={15} />
                <span>Ticket Sales ({tickets.length})</span>
              </button>
              <button
                className={`tab-btn admin-tab ${currentView === 'news' ? 'active' : ''}`}
                onClick={() => setCurrentView('news')}
              >
                <Newspaper size={15} />
                <span>Publish News & Alerts</span>
              </button>
            </>
          )}
        </nav>

        {/* View Routing / Rendering based on currentModule & currentView */}
        {currentModule === 'user' ? (
          <>
            {currentView === 'dashboard' && <UserDashboard />}
            {currentView === 'live' && <LiveScores />}
            {currentView === 'fixtures' && <FixturesSchedule />}
            {currentView === 'standings' && <StandingsTable />}
            {currentView === 'teams' && <TeamsExplorer />}
            {currentView === 'players' && <PlayerStats />}
            {currentView === 'tickets' && <TicketBooking />}
            {currentView === 'my-bookings' && <MyTickets />}
            {currentView === 'news' && <NewsFeed />}
          </>
        ) : (
          <>
            {currentView === 'dashboard' && <AdminDashboard />}
            {currentView === 'leagues' && <LeagueManager />}
            {currentView === 'teams' && <TeamManager />}
            {currentView === 'fixtures' && <FixtureManager />}
            {currentView === 'live-control' && <LiveMatchControl />}
            {currentView === 'tickets' && <TicketSales />}
            {currentView === 'news' && <NewsManager />}
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Authentication Modal (LocalStorage Login & Signup) */}
      <AuthModal />

      {/* Real-time Toast Notification banner */}
      {toast && (
        <div className={`toast-banner ${toast.type}`}>
          {toast.type === 'success' && <CheckCircle2 size={18} color="var(--primary)" />}
          {toast.type === 'error' && <AlertTriangle size={18} color="var(--accent-red)" />}
          {toast.type === 'warning' && <AlertTriangle size={18} color="var(--accent-amber)" />}
          {toast.type === 'info' && <Info size={18} color="var(--accent-blue)" />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
