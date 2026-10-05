import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trophy, 
  ShieldCheck, 
  User, 
  LogIn, 
  LogOut, 
  Bell, 
  RotateCcw, 
  Activity,
  Layers,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentUser, 
    logout, 
    currentModule, 
    navigateModule, 
    setAuthModalOpen, 
    setAuthMode,
    notifications,
    markAllNotificationsRead,
    leagues,
    selectedLeagueId,
    setSelectedLeagueId,
    resetToInitialData,
    showToast
  } = useApp();

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="navbar">
      {/* Brand Identity */}
      <div className="brand-section" onClick={() => navigateModule('user', 'dashboard')}>
        <div className="brand-logo-icon">🏆</div>
        <div className="brand-text">
          <h1>Sports<span>Hub</span></h1>
          <div className="brand-tag">League Management System</div>
        </div>
      </div>

      {/* Module Redirection Switcher (Requirement #2 & #6) */}
      <div className="module-switcher">
        <button 
          className={`module-pill-btn ${currentModule === 'user' ? 'active' : ''}`}
          onClick={() => navigateModule('user', 'dashboard')}
          title="Switch to Fan / User Module"
        >
          <User size={16} />
          <span>User / Fan Module</span>
        </button>
        <button 
          className={`module-pill-btn ${currentModule === 'admin' ? 'admin-active' : ''}`}
          onClick={() => navigateModule('admin', 'dashboard')}
          title="Switch to Admin Management Module"
        >
          <ShieldCheck size={16} />
          <span>Admin Module</span>
        </button>
      </div>

      {/* Right Actions: League Filter, Notifications, Demo Reset, Auth */}
      <div className="nav-actions">
        {/* League Quick Selector */}
        <div className="d-flex align-center gap-xs" style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <Layers size={14} color="var(--primary)" />
          <select 
            value={selectedLeagueId}
            onChange={(e) => {
              setSelectedLeagueId(e.target.value);
              showToast(`Active league filtered: ${leagues.find(l => l.id === e.target.value)?.name}`, 'info');
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '0.82rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {leagues.map(l => (
              <option key={l.id} value={l.id} style={{ background: '#121824', color: '#fff' }}>
                {l.logo} {l.name}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            className="btn btn-secondary btn-icon"
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              if (!notifDropdownOpen && unreadCount > 0) {
                markAllNotificationsRead();
              }
            }}
            title="Notifications"
            style={{ position: 'relative' }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--accent-red)',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 800,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {notifDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '48px',
              right: '0',
              width: '320px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 200,
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.3)'
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Notifications ({notifications.length})</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Latest alerts</span>
              </div>
              <div style={{ maxHeight: '280px', overflowY: 'auto', padding: '8px' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    background: n.read ? 'transparent' : 'rgba(16, 185, 129, 0.08)',
                    marginBottom: '6px',
                    borderLeft: `3px solid ${n.type === 'live' ? 'var(--accent-red)' : n.type === 'ticket' ? 'var(--primary)' : 'var(--accent-blue)'}`
                  }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>{n.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{n.message}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '4px' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Demo Reset Button for Sir/Reviewers */}
        <button 
          className="btn btn-secondary btn-icon" 
          onClick={resetToInitialData}
          title="Reset to Demo Data (SDC Review Helper)"
        >
          <RotateCcw size={16} />
        </button>

        {/* Authentication Badge */}
        {currentUser ? (
          <div className="user-profile-badge">
            <img 
              src={currentUser.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=Sports"} 
              alt={currentUser.name} 
              className="user-avatar-sm" 
            />
            <div className="user-badge-info">
              <span className="user-badge-name">{currentUser.name}</span>
              <span className={`user-badge-role ${currentUser.role}`}>
                {currentUser.role === 'admin' ? '🛡️ Admin' : '⚽ Fan'}
              </span>
            </div>
            <button 
              onClick={logout} 
              title="Logout"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="d-flex gap-xs">
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
            >
              <LogIn size={15} />
              <span>Login</span>
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
            >
              <span>Sign Up</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
