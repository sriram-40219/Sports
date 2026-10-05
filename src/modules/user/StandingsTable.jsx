import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Award, Shield, Info, Layers } from 'lucide-react';

export const StandingsTable = () => {
  const { 
    leagues, 
    selectedLeagueId, 
    setSelectedLeagueId, 
    getStandingsForLeague 
  } = useApp();

  const currentLeague = leagues.find(l => l.id === selectedLeagueId) || leagues[0];
  const standings = getStandingsForLeague(selectedLeagueId);

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy size={24} color="var(--accent-amber)" />
            League Standings & Points Table
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Real-time standings computed dynamically based on completed fixture outcomes.
          </p>
        </div>

        {/* League Selector Pills */}
        <div className="d-flex gap-xs flex-wrap">
          {leagues.map(l => (
            <button
              key={l.id}
              onClick={() => setSelectedLeagueId(l.id)}
              className={`btn btn-sm ${selectedLeagueId === l.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.82rem' }}
            >
              <span>{l.logo}</span>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* League Header Card */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px', background: 'linear-gradient(135deg, #141c2b 0%, #0c121e 100%)' }}>
        <div className="d-flex justify-between align-center flex-wrap gap-md">
          <div className="d-flex align-center gap-md">
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>
              {currentLeague?.logo}
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{currentLeague?.name}</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Sport: {currentLeague?.sport} • {currentLeague?.season} • {standings.length} Competing Clubs
              </div>
            </div>
          </div>

          <div className="d-flex gap-sm">
            <div style={{ textAlign: 'center', padding: '6px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Win</div>
              <div style={{ fontWeight: 800, color: 'var(--primary)' }}>3 Pts</div>
            </div>
            <div style={{ textAlign: 'center', padding: '6px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Draw</div>
              <div style={{ fontWeight: 800, color: 'var(--accent-amber)' }}>1 Pt</div>
            </div>
            <div style={{ textAlign: 'center', padding: '6px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Loss</div>
              <div style={{ fontWeight: 800, color: 'var(--accent-red)' }}>0 Pts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Standings Table (CSS Grid / Table) */}
      <div className="table-container" style={{ marginBottom: '24px' }}>
        <table className="standings-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>Rank</th>
              <th>Club</th>
              <th>P (Played)</th>
              <th>W (Won)</th>
              <th>D (Draw)</th>
              <th>L (Lost)</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th style={{ color: 'var(--primary)' }}>Points</th>
              <th>Recent Form</th>
            </tr>
          </thead>
          <tbody>
            {standings.length === 0 ? (
              <tr>
                <td colSpan="11" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  No clubs registered in this league yet.
                </td>
              </tr>
            ) : (
              standings.map((row, index) => {
                const isChampion = index === 0;
                const isTopThree = index < 3;
                return (
                  <tr key={row.teamId} style={{ background: isChampion ? 'rgba(16, 185, 129, 0.05)' : 'transparent' }}>
                    <td className={`pos-cell ${isChampion ? 'top-rank' : ''}`}>
                      <div className="d-flex align-center gap-xs">
                        <span>{index + 1}</span>
                        {isChampion && <Award size={14} color="#34d399" />}
                      </div>
                    </td>
                    <td>
                      <div className="team-table-cell">
                        <span style={{ fontSize: '1.2rem' }}>{row.logo}</span>
                        <div>
                          <div>{row.teamName}</div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{row.shortName}</span>
                        </div>
                      </div>
                    </td>
                    <td>{row.played}</td>
                    <td style={{ color: '#34d399', fontWeight: 600 }}>{row.won}</td>
                    <td style={{ color: '#fbbf24', fontWeight: 600 }}>{row.drawn}</td>
                    <td style={{ color: '#f87171', fontWeight: 600 }}>{row.lost}</td>
                    <td>{row.goalsFor}</td>
                    <td>{row.goalsAgainst}</td>
                    <td style={{ fontWeight: 700, color: row.goalDiff >= 0 ? '#34d399' : '#f87171' }}>
                      {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                    </td>
                    <td style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {row.points}
                    </td>
                    <td>
                      <div className="form-pill-list">
                        {row.form && row.form.length > 0 ? (
                          row.form.map((res, i) => (
                            <span key={i} className={`form-badge ${res}`}>
                              {res}
                            </span>
                          ))
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Standings Legend */}
      <div className="card" style={{ padding: '16px 20px' }}>
        <div className="d-flex align-center gap-lg flex-wrap" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <div className="d-flex align-center gap-xs">
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--primary)' }} />
            <span>Top Rank: Championship Contender / Trophy Leader</span>
          </div>
          <div className="d-flex align-center gap-xs">
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#3b82f6' }} />
            <span>Ranks 2-3: Continental Playoff Qualification</span>
          </div>
          <div className="d-flex align-center gap-xs">
            <Info size={14} color="var(--text-dim)" />
            <span>Tie-breaker priority: 1. Points, 2. Goal Difference, 3. Goals Scored</span>
          </div>
        </div>
      </div>
    </div>
  );
};
