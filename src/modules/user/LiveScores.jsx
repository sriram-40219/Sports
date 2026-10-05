import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Radio, 
  Clock, 
  MapPin, 
  Shield, 
  TrendingUp, 
  Zap, 
  Award,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const LiveScores = () => {
  const { fixtures, teams, leagues } = useApp();

  // Find all live and completed matches
  const activeMatches = fixtures.filter(f => f.status === 'LIVE' || f.status === 'COMPLETED');
  const [selectedMatchId, setSelectedMatchId] = useState(
    activeMatches.length > 0 ? activeMatches[0].id : fixtures[0]?.id
  );

  const activeMatch = fixtures.find(f => f.id === selectedMatchId) || fixtures[0];
  const homeTeam = teams.find(t => t.id === activeMatch?.homeTeamId);
  const awayTeam = teams.find(t => t.id === activeMatch?.awayTeamId);
  const league = leagues.find(l => l.id === activeMatch?.leagueId);

  // Match statistics simulation
  const stats = [
    { label: 'Ball Possession', home: '58%', away: '42%' },
    { label: 'Total Shots', home: '14', away: '9' },
    { label: 'Shots on Target', home: '7', away: '4' },
    { label: 'Corner Kicks', home: '6', away: '3' },
    { label: 'Fouls Committed', home: '8', away: '11' },
    { label: 'Passing Accuracy', home: '86%', away: '79%' }
  ];

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Radio size={24} color="var(--accent-red)" />
            Live Match Center & Broadcast Feed
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Real-time score updates, dynamic match minute ticker, tactical stats, and event timeline.
          </p>
        </div>

        {/* Match Selector Tabs */}
        <div className="d-flex gap-xs flex-wrap">
          {fixtures.map(f => {
            const h = teams.find(t => t.id === f.homeTeamId);
            const a = teams.find(t => t.id === f.awayTeamId);
            const isLive = f.status === 'LIVE';
            return (
              <button
                key={f.id}
                onClick={() => setSelectedMatchId(f.id)}
                className={`btn btn-sm ${selectedMatchId === f.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.78rem' }}
              >
                {isLive && <span className="live-dot" style={{ width: '6px', height: '6px' }} />}
                <span>{h?.shortName || 'H'} vs {a?.shortName || 'A'}</span>
                <span style={{ opacity: 0.75 }}>({f.status})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Scoreboard Showcase */}
      {activeMatch && (
        <div style={{
          background: 'linear-gradient(145deg, #162032 0%, #0c121d 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-xl)',
          padding: '36px 28px',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '28px'
        }}>
          {/* Match meta top row */}
          <div className="d-flex justify-between align-center flex-wrap gap-sm" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '24px' }}>
            <div className="d-flex align-center gap-sm">
              <span style={{ fontSize: '1.2rem' }}>{league?.logo}</span>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{league?.name}</span>
              <span style={{ color: 'var(--text-dim)' }}>•</span>
              <span className="d-flex align-center gap-xs" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <MapPin size={14} />
                {activeMatch.venue}
              </span>
            </div>

            <div>
              {activeMatch.status === 'LIVE' ? (
                <span className="live-pill">
                  <span className="live-dot"></span>
                  MATCH LIVE • {activeMatch.minute}
                </span>
              ) : activeMatch.status === 'COMPLETED' ? (
                <span className="badge badge-completed">FULL TIME (COMPLETED)</span>
              ) : (
                <span className="badge badge-upcoming">SCHEDULED • {activeMatch.date} {activeMatch.time}</span>
              )}
            </div>
          </div>

          {/* Big Team Display & Score */}
          <div className="fixture-teams-grid">
            {/* Home */}
            <div className="team-block">
              <div 
                className="team-logo-lg" 
                style={{ 
                  width: '84px', 
                  height: '84px', 
                  fontSize: '40px',
                  borderColor: homeTeam?.themeColor || 'var(--primary)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
                }}
              >
                {homeTeam?.logo || '⚽'}
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '8px' }}>{homeTeam?.name}</h3>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Manager: {homeTeam?.coach}</span>
            </div>

            {/* Score Center */}
            <div className="fixture-score-center">
              <div 
                className={`score-display ${activeMatch.status === 'LIVE' ? 'live' : ''}`}
                style={{ fontSize: '3.6rem', padding: '8px 28px', minWidth: '180px' }}
              >
                {activeMatch.homeScore} : {activeMatch.awayScore}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '4px' }}>
                {activeMatch.status === 'LIVE' ? `Current Match Minute: ${activeMatch.minute}` : 'Official Score'}
              </div>
            </div>

            {/* Away */}
            <div className="team-block">
              <div 
                className="team-logo-lg" 
                style={{ 
                  width: '84px', 
                  height: '84px', 
                  fontSize: '40px',
                  borderColor: awayTeam?.themeColor || 'var(--accent-red)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
                }}
              >
                {awayTeam?.logo || '⚽'}
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '8px' }}>{awayTeam?.name}</h3>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Manager: {awayTeam?.coach}</span>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Live Events Timeline + Head-to-Head Stats (CSS GRID) */}
      <div className="grid-cols-2">
        {/* Match Timeline / Commentary */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Clock size={18} color="var(--primary)" />
              Match Events & Live Commentary
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Timeline Chronology</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {(!activeMatch.events || activeMatch.events.length === 0) ? (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                <AlertCircle size={28} style={{ margin: '0 auto 8px auto', opacity: 0.5 }} />
                No match events recorded yet for this fixture.
              </div>
            ) : (
              activeMatch.events.map((evt, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px 14px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderLeft: `3px solid ${
                      evt.type === 'goal' ? 'var(--primary)' : 
                      evt.type === 'yellow_card' ? 'var(--accent-amber)' : 
                      evt.type === 'boundary' ? 'var(--accent-blue)' : 'var(--text-muted)'
                    }`,
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <span style={{
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    color: 'var(--text-main)',
                    minWidth: '40px'
                  }}>
                    {evt.time}
                  </span>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: 500 }}>
                    {evt.text}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tactical Head-to-Head Statistics */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <TrendingUp size={18} color="var(--accent-blue)" />
              Match Statistics & Performance
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Live Tracking</span>
          </div>

          <div className="d-flex flex-col gap-md">
            {stats.map((st, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div className="d-flex justify-between" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--primary)' }}>{st.home}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{st.label}</span>
                  <span style={{ color: 'var(--accent-blue)' }}>{st.away}</span>
                </div>
                {/* Dual Progress Bar */}
                <div style={{
                  display: 'flex',
                  height: '8px',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)'
                }}>
                  <div style={{
                    width: st.home.includes('%') ? st.home : '50%',
                    background: 'var(--primary)'
                  }} />
                  <div style={{
                    width: st.away.includes('%') ? st.away : '50%',
                    background: 'var(--accent-blue)'
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Roster Spotlight */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
              Key Players To Watch
            </div>
            <div className="d-flex justify-between gap-md">
              <div style={{ fontSize: '0.85rem' }}>
                <div style={{ fontWeight: 700 }}>{homeTeam?.roster?.[0]?.name || 'Top Player'}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{homeTeam?.name} • Rating: {homeTeam?.roster?.[0]?.rating || '8.5'}★</div>
              </div>
              <div style={{ fontSize: '0.85rem', textAlign: 'right' }}>
                <div style={{ fontWeight: 700 }}>{awayTeam?.roster?.[0]?.name || 'Top Player'}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{awayTeam?.name} • Rating: {awayTeam?.roster?.[0]?.rating || '8.5'}★</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
