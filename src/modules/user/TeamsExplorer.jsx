import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  MapPin, 
  Award, 
  Shield, 
  Star, 
  X, 
  Search,
  ChevronRight 
} from 'lucide-react';

export const TeamsExplorer = () => {
  const { teams, leagues, selectedLeagueId, setSelectedLeagueId } = useApp();

  const [activeTeamDetail, setActiveTeamDetail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentLeague = leagues.find(l => l.id === selectedLeagueId);

  const filteredTeams = teams.filter(t => {
    if (selectedLeagueId && t.leagueId !== selectedLeagueId) return false;
    if (searchQuery.trim()) {
      return (
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.stadium.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={24} color="var(--accent-blue)" />
            Teams Directory & Squad Rosters
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Explore participating clubs, stadium details, head coaches, and complete player rosters.
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

      {/* Search Bar */}
      <div className="card" style={{ padding: '14px 20px', marginBottom: '24px' }}>
        <div className="d-flex align-center gap-sm">
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search teams by club name, city, or stadium..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ padding: '8px 12px' }}
          />
        </div>
      </div>

      {/* Teams Grid (CSS Grid) */}
      {filteredTeams.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: 'var(--text-muted)' }}>No teams found in this category.</p>
        </div>
      ) : (
        <div className="grid-cols-3">
          {filteredTeams.map(team => {
            const rosterCount = team.roster ? team.roster.length : 0;
            return (
              <div 
                key={team.id} 
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `4px solid ${team.themeColor || 'var(--primary)'}`
                }}
              >
                <div>
                  <div className="d-flex justify-between align-center" style={{ marginBottom: '16px' }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '26px',
                      border: '1px solid var(--border)'
                    }}>
                      {team.logo}
                    </div>
                    <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-muted)' }}>
                      {team.shortName}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '4px' }}>
                    {team.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                    {team.city} • Head Coach: {team.coach}
                  </div>

                  <div style={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    marginBottom: '16px'
                  }}>
                    <div className="d-flex align-center gap-xs" style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                      <MapPin size={13} color="var(--primary)" />
                      <span style={{ fontWeight: 600 }}>{team.stadium}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      Capacity: {team.capacity?.toLocaleString()} Spectators
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-between align-center" style={{ borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {rosterCount} Registered Players
                  </span>
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => setActiveTeamDetail(team)}
                  >
                    <span>View Squad</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Squad Roster Modal (Flexbox + Grid) */}
      {activeTeamDetail && (
        <div className="modal-overlay" onClick={() => setActiveTeamDetail(null)}>
          <div className="modal-box" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="d-flex align-center gap-md">
                <span style={{ fontSize: '32px' }}>{activeTeamDetail.logo}</span>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{activeTeamDetail.name} Roster</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {activeTeamDetail.stadium} • Managed by {activeTeamDetail.coach}
                  </p>
                </div>
              </div>
              <button className="btn btn-secondary btn-icon" onClick={() => setActiveTeamDetail(null)}>
                <X size={16} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase' }}>
                Squad Members & Performance Stats
              </div>

              {(!activeTeamDetail.roster || activeTeamDetail.roster.length === 0) ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
                  No players currently registered in this squad.
                </p>
              ) : (
                <div className="d-flex flex-col gap-sm">
                  {activeTeamDetail.roster.map(player => (
                    <div 
                      key={player.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <div className="d-flex align-center gap-md">
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.4rem',
                          fontWeight: 700,
                          color: 'var(--primary)',
                          minWidth: '32px'
                        }}>
                          #{player.number}
                        </span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{player.name}</div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {player.position}
                          </span>
                        </div>
                      </div>

                      <div className="d-flex align-center gap-md" style={{ fontSize: '0.82rem' }}>
                        {player.goals !== undefined && (
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{player.goals}</div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Goals</div>
                          </div>
                        )}
                        {player.runs !== undefined && (
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{player.runs}</div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Runs</div>
                          </div>
                        )}
                        {player.points !== undefined && (
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 700, color: 'var(--accent-amber)' }}>{player.points}</div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Points</div>
                          </div>
                        )}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          background: 'rgba(245, 158, 11, 0.15)',
                          padding: '4px 8px',
                          borderRadius: 'var(--radius-sm)',
                          color: '#fbbf24',
                          fontWeight: 700
                        }}>
                          <Star size={12} fill="#fbbf24" />
                          <span>{player.rating || '8.0'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
