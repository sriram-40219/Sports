import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  Calendar, 
  Trophy, 
  Users, 
  Ticket, 
  Radio, 
  Flame, 
  ChevronRight, 
  ArrowUpRight,
  Vote,
  Sparkles
} from 'lucide-react';

export const UserDashboard = () => {
  const { 
    fixtures, 
    teams, 
    leagues, 
    selectedLeagueId, 
    getStandingsForLeague, 
    setCurrentView,
    poll,
    votePoll,
    news
  } = useApp();

  const [hasVoted, setHasVoted] = useState(false);

  // Filter fixtures for active league or live
  const activeLeague = leagues.find(l => l.id === selectedLeagueId) || leagues[0];
  const liveMatch = fixtures.find(f => f.status === 'LIVE' && f.leagueId === selectedLeagueId) || fixtures.find(f => f.status === 'LIVE') || fixtures[0];
  
  const liveHomeTeam = teams.find(t => t.id === liveMatch?.homeTeamId);
  const liveAwayTeam = teams.find(t => t.id === liveMatch?.awayTeamId);

  const upcomingMatches = fixtures.filter(f => f.status === 'UPCOMING').slice(0, 3);
  const standingsPreview = getStandingsForLeague(selectedLeagueId).slice(0, 4);

  // Poll total votes
  const totalPollVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0);

  return (
    <div>
      {/* =========================================================================
          HERO LIVE MATCH BANNER (FLEXBOX + CSS GRID)
          ========================================================================= */}
      {liveMatch && (
        <div style={{
          background: 'linear-gradient(135deg, #131d2e 0%, #0a111e 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 'var(--radius-xl)',
          padding: '30px',
          marginBottom: '28px',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle background glow */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '16px' }}>
            <div className="d-flex align-center gap-sm">
              <span className="live-pill">
                <span className="live-dot"></span>
                {liveMatch.status === 'LIVE' ? `LIVE • ${liveMatch.minute}` : liveMatch.status}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {activeLeague?.name} • {liveMatch.venue}
              </span>
            </div>
            <div className="d-flex gap-xs">
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setCurrentView('live')}
              >
                <Radio size={14} />
                <span>Live Match Center</span>
              </button>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setCurrentView('tickets')}
              >
                <Ticket size={14} />
                <span>Book Tickets</span>
              </button>
            </div>
          </div>

          {/* Teams and Score Grid */}
          <div className="fixture-teams-grid" style={{ padding: '16px 0' }}>
            {/* Home Team */}
            <div className="team-block">
              <div className="team-logo-lg" style={{ borderColor: liveHomeTeam?.themeColor || 'var(--primary)' }}>
                {liveHomeTeam?.logo || '⚽'}
              </div>
              <div className="team-name-lg">{liveHomeTeam?.name || 'Home Team'}</div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{liveHomeTeam?.city}</span>
            </div>

            {/* Score Display */}
            <div className="fixture-score-center">
              <div className="score-display live">
                {liveMatch.homeScore} : {liveMatch.awayScore}
              </div>
              <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 700, letterSpacing: '1px' }}>
                MATCH IN PROGRESS
              </span>
              {liveMatch.events && liveMatch.events.length > 0 && (
                <div style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  marginTop: '8px',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)'
                }}>
                  {liveMatch.events[liveMatch.events.length - 1].text}
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="team-block">
              <div className="team-logo-lg" style={{ borderColor: liveAwayTeam?.themeColor || 'var(--accent-red)' }}>
                {liveAwayTeam?.logo || '⚽'}
              </div>
              <div className="team-name-lg">{liveAwayTeam?.name || 'Away Team'}</div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{liveAwayTeam?.city}</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          KEY STATS / KPI GRID (CSS GRID)
          ========================================================================= */}
      <div className="grid-cols-4" style={{ marginBottom: '28px' }}>
        <div className="kpi-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <Trophy size={24} />
          </div>
          <div className="kpi-details">
            <div className="kpi-value">{leagues.length}</div>
            <div className="kpi-label">Active Leagues</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
            <Users size={24} />
          </div>
          <div className="kpi-details">
            <div className="kpi-value">{teams.length}</div>
            <div className="kpi-label">Pro Teams</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
            <Activity size={24} />
          </div>
          <div className="kpi-details">
            <div className="kpi-value">{fixtures.filter(f => f.status === 'LIVE').length}</div>
            <div className="kpi-label">Live Fixtures</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <Calendar size={24} />
          </div>
          <div className="kpi-details">
            <div className="kpi-value">{fixtures.filter(f => f.status === 'UPCOMING').length}</div>
            <div className="kpi-label">Upcoming Games</div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN 2-COLUMN GRID: FIXTURES + STANDINGS SNAPSHOT (CSS GRID)
          ========================================================================= */}
      <div className="grid-cols-2" style={{ marginBottom: '28px' }}>
        {/* Left Column: Upcoming Fixtures */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Calendar size={18} color="var(--primary)" />
                Upcoming Fixtures
              </div>
              <div className="card-subtitle">Upcoming games available for ticket booking</div>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentView('fixtures')}
            >
              <span>View All</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="d-flex flex-col gap-md">
            {upcomingMatches.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No upcoming matches scheduled.</p>
            ) : (
              upcomingMatches.map(m => {
                const home = teams.find(t => t.id === m.homeTeamId);
                const away = teams.find(t => t.id === m.awayTeamId);
                return (
                  <div key={m.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)'
                  }}>
                    <div className="d-flex align-center gap-md">
                      <div style={{ textAlign: 'center', minWidth: '60px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{m.time}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{m.date}</div>
                      </div>
                      <div className="d-flex flex-col gap-xs">
                        <div className="d-flex align-center gap-xs" style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                          <span>{home?.logo}</span>
                          <span>{home?.name}</span>
                        </div>
                        <div className="d-flex align-center gap-xs" style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                          <span>{away?.logo}</span>
                          <span>{away?.name}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => setCurrentView('tickets')}
                    >
                      <Ticket size={13} />
                      <span>Book ${m.ticketPrice}</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Standings Table Snapshot */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Trophy size={18} color="var(--accent-amber)" />
                {activeLeague?.name} Standings
              </div>
              <div className="card-subtitle">Real-time points table auto-calculated from match results</div>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentView('standings')}
            >
              <span>Full Table</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="table-container">
            <table className="standings-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Club</th>
                  <th>P</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GD</th>
                  <th>PTS</th>
                </tr>
              </thead>
              <tbody>
                {standingsPreview.map((row, idx) => (
                  <tr key={row.teamId}>
                    <td className={`pos-cell ${idx === 0 ? 'top-rank' : ''}`}>{idx + 1}</td>
                    <td>
                      <div className="team-table-cell">
                        <span>{row.logo}</span>
                        <span>{row.teamName}</span>
                      </div>
                    </td>
                    <td>{row.played}</td>
                    <td>{row.won}</td>
                    <td>{row.drawn}</td>
                    <td>{row.lost}</td>
                    <td style={{ color: row.goalDiff >= 0 ? '#34d399' : '#f87171' }}>
                      {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                    </td>
                    <td style={{ fontWeight: 800, color: 'var(--primary)' }}>{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM ROW: FAN ENGAGEMENT POLL + BREAKING NEWS (CSS GRID)
          ========================================================================= */}
      <div className="grid-cols-2">
        {/* Fan Engagement Poll */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Vote size={18} color="var(--accent-blue)" />
              Fan Voice & Live Poll
            </div>
            <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fa' }}>
              {totalPollVotes} Votes Recorded
            </span>
          </div>

          <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '16px' }}>
            {poll.question}
          </p>

          <div className="d-flex flex-col gap-sm">
            {poll.options.map(opt => {
              const pct = totalPollVotes > 0 ? Math.round((opt.votes / totalPollVotes) * 100) : 0;
              return (
                <div 
                  key={opt.id}
                  onClick={() => {
                    votePoll(opt.id);
                    setHasVoted(true);
                  }}
                  style={{
                    position: 'relative',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s'
                  }}
                >
                  {/* Vote progress fill bar */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: `${pct}%`,
                    background: 'rgba(16, 185, 129, 0.15)',
                    transition: 'width 0.4s ease',
                    zIndex: 0
                  }} />

                  <div className="d-flex justify-between align-center" style={{ position: 'relative', zIndex: 1 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {opt.text}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {pct}% ({opt.votes})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '12px', textAlign: 'center' }}>
            Click an option to cast your vote instantly. Stored in real-time.
          </div>
        </div>

        {/* Breaking News Feed Snapshot */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Flame size={18} color="var(--accent-red)" />
              League Headlines & Stories
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentView('news')}
            >
              <span>All News</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="d-flex flex-col gap-md">
            {news.slice(0, 2).map(item => (
              <div 
                key={item.id} 
                style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'center',
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer'
                }}
                onClick={() => setCurrentView('news')}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{
                    width: '80px',
                    height: '65px',
                    borderRadius: 'var(--radius-sm)',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {item.category}
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3, marginTop: '2px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                    {item.date} • By {item.author}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
