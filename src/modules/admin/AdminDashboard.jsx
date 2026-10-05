import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Trophy, 
  Users, 
  Calendar, 
  Activity, 
  DollarSign, 
  Ticket, 
  PlusCircle, 
  Radio, 
  FileText,
  TrendingUp
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    leagues, 
    teams, 
    fixtures, 
    tickets, 
    setCurrentView,
    currentUser 
  } = useApp();

  const liveMatches = fixtures.filter(f => f.status === 'LIVE');
  const upcomingMatches = fixtures.filter(f => f.status === 'UPCOMING');
  
  // Calculate total revenue from tickets
  const totalRevenue = tickets.reduce((acc, t) => acc + (t.totalAmount || 0), 0);
  const totalTicketsSold = tickets.reduce((acc, t) => acc + (t.quantity || 1), 0);

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div className="d-flex justify-between align-center flex-wrap gap-md">
          <div>
            <div className="d-flex align-center gap-xs" style={{ color: '#a5b4fc', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              <ShieldCheck size={16} />
              <span>Executive League Control Portal</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
              Welcome, {currentUser?.name || 'Administrator'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Manage league tournaments, oversee teams and rosters, update real-time match scores, and monitor ticket revenues.
            </p>
          </div>

          <div className="d-flex gap-xs flex-wrap">
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setCurrentView('live-control')}
            >
              <Radio size={14} />
              <span>Live Match Controller</span>
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentView('fixtures')}
            >
              <PlusCircle size={14} />
              <span>Schedule Match</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats (CSS Grid 4-cols) */}
      <div className="grid-cols-4" style={{ marginBottom: '28px' }}>
        <div className="kpi-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <Trophy size={24} />
          </div>
          <div className="kpi-details">
            <div className="kpi-value">{leagues.length}</div>
            <div className="kpi-label">Leagues Managed</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
            <Users size={24} />
          </div>
          <div className="kpi-details">
            <div className="kpi-value">{teams.length}</div>
            <div className="kpi-label">Active Clubs</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
            <Activity size={24} />
          </div>
          <div className="kpi-details">
            <div className="kpi-value">{liveMatches.length}</div>
            <div className="kpi-label">Matches Live Now</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <DollarSign size={24} />
          </div>
          <div className="kpi-details">
            <div className="kpi-value">${totalRevenue.toLocaleString()}</div>
            <div className="kpi-label">Ticket Revenue</div>
          </div>
        </div>
      </div>

      {/* Quick Action Matrix (CSS Grid) */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div className="card-header">
          <div className="card-title">
            <TrendingUp size={18} color="var(--primary)" />
            Administrative Workflows
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quick Access</span>
        </div>

        <div className="grid-cols-4">
          <div 
            onClick={() => setCurrentView('leagues')}
            style={{
              padding: '18px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Trophy size={28} color="var(--primary)" style={{ marginBottom: '10px' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Leagues & Sports</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Create tournaments, rules, seasons & logos.
            </p>
          </div>

          <div 
            onClick={() => setCurrentView('teams')}
            style={{
              padding: '18px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border)',
              cursor: 'pointer'
            }}
          >
            <Users size={28} color="var(--accent-blue)" style={{ marginBottom: '10px' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Teams & Rosters</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Add clubs, players, jersey numbers & coaches.
            </p>
          </div>

          <div 
            onClick={() => setCurrentView('live-control')}
            style={{
              padding: '18px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border)',
              cursor: 'pointer'
            }}
          >
            <Radio size={28} color="var(--accent-red)" style={{ marginBottom: '10px' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Live Score Control</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Update scores, match clock, goals & cards live.
            </p>
          </div>

          <div 
            onClick={() => setCurrentView('tickets')}
            style={{
              padding: '18px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border)',
              cursor: 'pointer'
            }}
          >
            <Ticket size={28} color="var(--accent-amber)" style={{ marginBottom: '10px' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Ticket Sales</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Review orders, seat allocations & sales figures.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings & Scheduled Matches (CSS Grid 2-cols) */}
      <div className="grid-cols-2">
        {/* Recent Ticket Orders */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Ticket size={18} color="var(--primary)" />
              Recent Ticket Bookings
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentView('tickets')}
            >
              All Sales
            </button>
          </div>

          <div className="d-flex flex-col gap-sm">
            {tickets.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No ticket bookings recorded yet.</p>
            ) : (
              tickets.slice(0, 4).map(t => (
                <div 
                  key={t.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{t.userName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {t.tier} • {Array.isArray(t.seats) ? t.seats.join(', ') : t.seats}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem' }}>
                      +${t.totalAmount}
                    </div>
                    <span className="badge" style={{ fontSize: '0.65rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                      {t.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Live & Upcoming Matches Snapshot */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Calendar size={18} color="var(--accent-blue)" />
              Active Fixture Status
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentView('fixtures')}
            >
              All Fixtures
            </button>
          </div>

          <div className="d-flex flex-col gap-sm">
            {fixtures.slice(0, 4).map(f => {
              const h = teams.find(t => t.id === f.homeTeamId);
              const a = teams.find(t => t.id === f.awayTeamId);
              return (
                <div 
                  key={f.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div className="d-flex align-center gap-sm">
                    <span style={{ fontSize: '1.2rem' }}>{h?.logo}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{h?.shortName} vs {a?.shortName}</span>
                    <span style={{ fontSize: '1.2rem' }}>{a?.logo}</span>
                  </div>
                  <div className="d-flex align-center gap-xs">
                    {f.status === 'LIVE' ? (
                      <span className="live-pill" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                        <span className="live-dot" />
                        LIVE ({f.homeScore}-{f.awayScore})
                      </span>
                    ) : (
                      <span className="badge" style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }}>
                        {f.status} • {f.time}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
