import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USERS,
  INITIAL_LEAGUES,
  INITIAL_TEAMS,
  INITIAL_FIXTURES,
  INITIAL_TICKETS,
  INITIAL_NEWS,
  INITIAL_POLL,
  INITIAL_NOTIFICATIONS
} from '../data/initialData';

const AppContext = createContext(null);

// LocalStorage Helper functions
const loadStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(`slms_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

const saveStorage = (key, value) => {
  try {
    localStorage.setItem(`slms_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
};

export const AppProvider = ({ children }) => {
  // Authentication & Session
  const [users, setUsers] = useState(() => loadStorage('users', INITIAL_USERS));
  const [currentUser, setCurrentUser] = useState(() => loadStorage('current_user', null));

  // Domain Entities
  const [leagues, setLeagues] = useState(() => loadStorage('leagues', INITIAL_LEAGUES));
  const [teams, setTeams] = useState(() => loadStorage('teams', INITIAL_TEAMS));
  const [fixtures, setFixtures] = useState(() => loadStorage('fixtures', INITIAL_FIXTURES));
  const [tickets, setTickets] = useState(() => loadStorage('tickets', INITIAL_TICKETS));
  const [news, setNews] = useState(() => loadStorage('news', INITIAL_NEWS));
  const [poll, setPoll] = useState(() => loadStorage('poll', INITIAL_POLL));
  const [notifications, setNotifications] = useState(() => loadStorage('notifications', INITIAL_NOTIFICATIONS));

  // Navigation State
  // module: 'user' | 'admin' | 'auth'
  const [currentModule, setCurrentModule] = useState(() => {
    const savedUser = loadStorage('current_user', null);
    if (savedUser && savedUser.role === 'admin') return 'admin';
    return 'user';
  });

  // Tab views within modules
  // User views: 'dashboard', 'fixtures', 'live', 'standings', 'teams', 'players', 'tickets', 'news', 'my-bookings'
  // Admin views: 'dashboard', 'leagues', 'teams', 'fixtures', 'live-control', 'tickets', 'news'
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedLeagueId, setSelectedLeagueId] = useState('league_1');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Sync state changes to LocalStorage
  useEffect(() => saveStorage('users', users), [users]);
  useEffect(() => saveStorage('current_user', currentUser), [currentUser]);
  useEffect(() => saveStorage('leagues', leagues), [leagues]);
  useEffect(() => saveStorage('teams', teams), [teams]);
  useEffect(() => saveStorage('fixtures', fixtures), [fixtures]);
  useEffect(() => saveStorage('tickets', tickets), [tickets]);
  useEffect(() => saveStorage('news', news), [news]);
  useEffect(() => saveStorage('poll', poll), [poll]);
  useEffect(() => saveStorage('notifications', notifications), [notifications]);

  // Auth Functions
  const login = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      showToast('No account found with this email address.', 'error');
      return { success: false, message: 'User not found' };
    }
    if (user.password !== password) {
      showToast('Incorrect password. Please try again.', 'error');
      return { success: false, message: 'Invalid credentials' };
    }

    setCurrentUser(user);
    saveStorage('current_user', user);
    setAuthModalOpen(false);

    // Module-wise redirection based on Role (Requirement #6)
    if (user.role === 'admin') {
      setCurrentModule('admin');
      setCurrentView('dashboard');
      showToast(`Welcome back, Admin ${user.name}! Switched to Admin Portal.`, 'success');
    } else {
      setCurrentModule('user');
      setCurrentView('dashboard');
      showToast(`Welcome back, ${user.name}!`, 'success');
    }

    return { success: true, user };
  };

  const signup = ({ name, email, password, role = 'user', phone = '' }) => {
    if (!name || !email || !password) {
      showToast('Please fill out all required fields.', 'error');
      return { success: false, message: 'Missing fields' };
    }

    const existing = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      showToast('An account with this email already exists.', 'error');
      return { success: false, message: 'Email already exists' };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email: email.trim(),
      password,
      role, // 'admin' or 'user'
      phone,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    saveStorage('current_user', newUser);
    setAuthModalOpen(false);

    // Module-wise redirection
    if (role === 'admin') {
      setCurrentModule('admin');
      setCurrentView('dashboard');
      showToast(`Admin account registered successfully!`, 'success');
    } else {
      setCurrentModule('user');
      setCurrentView('dashboard');
      showToast(`Welcome, ${name}! Your account has been created.`, 'success');
    }

    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('slms_current_user');
    setCurrentModule('user');
    setCurrentView('dashboard');
    showToast('You have been logged out successfully.', 'info');
  };

  // Module Navigation Redirection
  const navigateModule = (moduleName, viewName = 'dashboard') => {
    if (moduleName === 'admin' && (!currentUser || currentUser.role !== 'admin')) {
      showToast('Admin access required. Please login with an Admin account.', 'warning');
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }
    setCurrentModule(moduleName);
    setCurrentView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // League Management (Admin)
  const addLeague = (leagueData) => {
    const newLeague = {
      id: `league_${Date.now()}`,
      ...leagueData,
      teamsCount: 0,
      status: 'Active'
    };
    setLeagues(prev => [...prev, newLeague]);
    showToast(`League "${newLeague.name}" created successfully!`, 'success');
  };

  const updateLeague = (id, updated) => {
    setLeagues(prev => prev.map(l => (l.id === id ? { ...l, ...updated } : l)));
    showToast('League details updated.', 'success');
  };

  const deleteLeague = (id) => {
    setLeagues(prev => prev.filter(l => l.id !== id));
    setTeams(prev => prev.filter(t => t.leagueId !== id));
    setFixtures(prev => prev.filter(f => f.leagueId !== id));
    showToast('League and associated records removed.', 'info');
  };

  // Team Management (Admin)
  const addTeam = (teamData) => {
    const newTeam = {
      id: `team_${Date.now()}`,
      ...teamData,
      roster: teamData.roster || []
    };
    setTeams(prev => [...prev, newTeam]);
    setLeagues(prev =>
      prev.map(l => (l.id === teamData.leagueId ? { ...l, teamsCount: l.teamsCount + 1 } : l))
    );
    showToast(`Team "${newTeam.name}" added successfully!`, 'success');
  };

  const updateTeam = (id, updated) => {
    setTeams(prev => prev.map(t => (t.id === id ? { ...t, ...updated } : t)));
    showToast('Team updated successfully.', 'success');
  };

  const deleteTeam = (id) => {
    const team = teams.find(t => t.id === id);
    setTeams(prev => prev.filter(t => t.id !== id));
    if (team) {
      setLeagues(prev =>
        prev.map(l => (l.id === team.leagueId ? { ...l, teamsCount: Math.max(0, l.teamsCount - 1) } : l))
      );
    }
    showToast('Team deleted.', 'info');
  };

  // Fixture Management (Admin)
  const addFixture = (fixtureData) => {
    const newFixture = {
      id: `fix_${Date.now()}`,
      homeScore: 0,
      awayScore: 0,
      events: [],
      minute: "0'",
      status: 'UPCOMING',
      ...fixtureData
    };
    setFixtures(prev => [newFixture, ...prev]);
    showToast(`Match fixture scheduled!`, 'success');
  };

  const updateFixture = (id, updated) => {
    setFixtures(prev => prev.map(f => (f.id === id ? { ...f, ...updated } : f)));
    showToast('Fixture details updated.', 'success');
  };

  const deleteFixture = (id) => {
    setFixtures(prev => prev.filter(f => f.id !== id));
    showToast('Fixture deleted.', 'info');
  };

  // Live Match Updates (Admin Match Control)
  const updateMatchLiveStatus = (fixtureId, updates) => {
    setFixtures(prev =>
      prev.map(f => {
        if (f.id === fixtureId) {
          const updated = { ...f, ...updates };
          return updated;
        }
        return f;
      })
    );
  };

  const addMatchEvent = (fixtureId, eventText, eventType = 'goal') => {
    setFixtures(prev =>
      prev.map(f => {
        if (f.id === fixtureId) {
          const newEvents = [...(f.events || []), {
            time: f.minute || "Live",
            type: eventType,
            text: eventText
          }];
          return { ...f, events: newEvents };
        }
        return f;
      })
    );
    showToast('Match event recorded!', 'info');
  };

  // Ticket Booking (User Module)
  const bookTicket = ({ fixtureId, tier, seats, pricePerTicket }) => {
    if (!currentUser) {
      setAuthMode('login');
      setAuthModalOpen(true);
      showToast('Please login to book match tickets.', 'warning');
      return null;
    }

    const fixture = fixtures.find(f => f.id === fixtureId);
    if (!fixture) return null;

    const homeTeam = teams.find(t => t.id === fixture.homeTeamId);
    const awayTeam = teams.find(t => t.id === fixture.awayTeamId);
    const matchTitle = `${homeTeam?.name || 'Home'} vs ${awayTeam?.name || 'Away'}`;

    const totalAmount = seats.length * pricePerTicket;

    const newTicket = {
      id: `tkt_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      fixtureId,
      matchTitle,
      stadium: fixture.venue,
      matchDate: `${fixture.date} ${fixture.time}`,
      tier,
      seats,
      quantity: seats.length,
      pricePerTicket,
      totalAmount,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'CONFIRMED',
      qrCode: `SLMS-PASS-${Date.now().toString().slice(-6)}-${tier.slice(0, 3).toUpperCase()}`
    };

    setTickets(prev => [newTicket, ...prev]);

    // Update fixture available seats
    setFixtures(prev =>
      prev.map(f => (f.id === fixtureId ? { ...f, availableSeats: Math.max(0, (f.availableSeats || 500) - seats.length) } : f))
    );

    // Push notification
    addNotification({
      title: '🎟️ Booking Confirmed!',
      message: `Your booking for ${matchTitle} (${tier}, ${seats.length} seats) is confirmed.`,
      type: 'ticket'
    });

    showToast('Ticket booking confirmed! View your pass in My Tickets.', 'success');
    return newTicket;
  };

  const cancelTicket = (ticketId) => {
    setTickets(prev => prev.filter(t => t.id !== ticketId));
    showToast('Ticket cancelled and refunded.', 'info');
  };

  // News & Fan Engagement
  const addNews = (newsData) => {
    const newArticle = {
      id: `news_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...newsData
    };
    setNews(prev => [newArticle, ...prev]);
    showToast('News article published to fan portal!', 'success');
  };

  const deleteNews = (id) => {
    setNews(prev => prev.filter(n => n.id !== id));
    showToast('Article deleted.', 'info');
  };

  const votePoll = (optionId) => {
    setPoll(prev => {
      const updatedOptions = prev.options.map(opt =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      );
      return { ...prev, options: updatedOptions };
    });
    showToast('Thank you for voting! Your voice counts.', 'success');
  };

  const addNotification = ({ title, message, type = 'info' }) => {
    const newNotif = {
      id: `notif_${Date.now()}`,
      title,
      message,
      time: 'Just now',
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Reset to initial demo data
  const resetToInitialData = () => {
    setUsers(INITIAL_USERS);
    setLeagues(INITIAL_LEAGUES);
    setTeams(INITIAL_TEAMS);
    setFixtures(INITIAL_FIXTURES);
    setTickets(INITIAL_TICKETS);
    setNews(INITIAL_NEWS);
    setPoll(INITIAL_POLL);
    setNotifications(INITIAL_NOTIFICATIONS);
    saveStorage('users', INITIAL_USERS);
    saveStorage('leagues', INITIAL_LEAGUES);
    saveStorage('teams', INITIAL_TEAMS);
    saveStorage('fixtures', INITIAL_FIXTURES);
    saveStorage('tickets', INITIAL_TICKETS);
    saveStorage('news', INITIAL_NEWS);
    saveStorage('poll', INITIAL_POLL);
    saveStorage('notifications', INITIAL_NOTIFICATIONS);
    showToast('Default project data restored for demonstration.', 'success');
  };

  // Dynamic Standings Calculator for League
  const getStandingsForLeague = (leagueId) => {
    const leagueTeams = teams.filter(t => t.leagueId === leagueId);
    const leagueFixtures = fixtures.filter(f => f.leagueId === leagueId && f.status === 'COMPLETED');

    const tableMap = {};

    leagueTeams.forEach(team => {
      tableMap[team.id] = {
        teamId: team.id,
        teamName: team.name,
        shortName: team.shortName,
        logo: team.logo,
        themeColor: team.themeColor,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
        points: 0,
        form: []
      };
    });

    leagueFixtures.forEach(fix => {
      const home = tableMap[fix.homeTeamId];
      const away = tableMap[fix.awayTeamId];

      const hScore = typeof fix.homeScore === 'number' ? fix.homeScore : parseInt(fix.homeScore, 10) || 0;
      const aScore = typeof fix.awayScore === 'number' ? fix.awayScore : parseInt(fix.awayScore, 10) || 0;

      if (home && away) {
        home.played += 1;
        away.played += 1;
        home.goalsFor += hScore;
        home.goalsAgainst += aScore;
        away.goalsFor += aScore;
        away.goalsAgainst += hScore;

        if (hScore > aScore) {
          home.won += 1;
          home.points += 3;
          home.form.push('W');
          away.lost += 1;
          away.form.push('L');
        } else if (hScore < aScore) {
          away.won += 1;
          away.points += 3;
          away.form.push('W');
          home.lost += 1;
          home.form.push('L');
        } else {
          home.drawn += 1;
          away.drawn += 1;
          home.points += 1;
          away.points += 1;
          home.form.push('D');
          away.form.push('D');
        }

        home.goalDiff = home.goalsFor - home.goalsAgainst;
        away.goalDiff = away.goalsFor - away.goalsAgainst;
      }
    });

    // Sort by Points (desc), then Goal Difference (desc), then Goals For (desc)
    const sorted = Object.values(tableMap).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
      return b.goalsFor - a.goalsFor;
    });

    return sorted;
  };

  return (
    <AppContext.Provider
      value={{
        // Auth
        users,
        currentUser,
        login,
        signup,
        logout,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,

        // Navigation
        currentModule,
        currentView,
        setCurrentView,
        navigateModule,
        selectedLeagueId,
        setSelectedLeagueId,

        // Entities
        leagues,
        teams,
        fixtures,
        tickets,
        news,
        poll,
        notifications,

        // Operations
        addLeague,
        updateLeague,
        deleteLeague,
        addTeam,
        updateTeam,
        deleteTeam,
        addFixture,
        updateFixture,
        deleteFixture,
        updateMatchLiveStatus,
        addMatchEvent,
        bookTicket,
        cancelTicket,
        addNews,
        deleteNews,
        votePoll,
        addNotification,
        markAllNotificationsRead,
        resetToInitialData,
        getStandingsForLeague,

        // UI
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
