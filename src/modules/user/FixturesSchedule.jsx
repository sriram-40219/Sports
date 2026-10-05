import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  Ticket, 
  Radio, 
  CheckCircle2 
} from 'lucide-react';

export const FixturesSchedule = () => {
  const { 
    fixtures, 
    teams, 
    leagues, 
    selectedLeagueId, 
    setSelectedLeagueId, 
    setCurrentView 
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'UPCOMING' | 'LIVE' | 'COMPLETED'
  const [searchTerm, setSearchTerm] = useState('');

  // Filter fixtures
  const filteredFixtures = fixtures.filter(f => {
    // League match
    if (selectedLeagueId && f.leagueId !== selectedLeagueId) return false;
    // Status match
    if (statusFilter !== 'ALL' && f.status !== statusFilter) return false;
    // Search match
    if (searchTerm.trim()) {
      const home = teams.find(t => t.id === f.homeTeamId)?.name.toLowerCase() || '';
      const away = teams.find(t => t.id === f.awayTeamId)?.name.toLowerCase() || '';
      const venue = f.venue.toLowerCase();
      const term = searchTerm.toLowerCase();
      return home.includes(term) || away.includes(term) || venue.includes(term);
    }
    return true;
  });

  return (
    <div>
      {/* Title & Description */}
      <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={24} color="var(--primary)" />
            Fixtures & Tournament Schedule
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Browse upcoming matches, live scoreboards, and full-time results across leagues.
          </p>
        </div>

        {/* Status Filter Buttons */}
        <div className="d-flex gap-xs flex-wrap">
          {['ALL', 'LIVE', 'UPCOMING', 'COMPLETED'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`btn btn-sm ${statusFilter === st ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem' }}
            >
              {st === 'LIVE' && <span className="live-dot" style={{ width: '6px', height: '6px' }} />}
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar (Flexbox) */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
        <div className="d-flex justify-between align-center flex-wrap gap-md">
          <div className="d-flex align-center gap-sm" style={{ flex: 1, minWidth: '240px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text"
              placeholder="Search by club name or stadium venue..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            />
          </div>

          <div className="d-flex align-center gap-sm">
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>League:</span>
            <select
              value={selectedLeagueId}
              onChange={e => setSelectedLeagueId(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '8px 14px', fontSize: '0.85rem' }}
            >
              {leagues.map(l => (
                <option key={l.id} value={l.id}>
                  {l.logo} {l.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Fixtures List (CSS Grid) */}
      {filteredFixtures.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            No matches found matching the selected filters.
          </p>
        </div>
      ) : (
        <div className="grid-cols-2">
          {filteredFixtures.map(fixture => {
            const home = teams.find(t => t.id === fixture.homeTeamId);
            const away = teams.find(t => t.id === fixture.awayTeamId);
            const league = leagues.find(l => l.id === fixture.leagueId);

            return (
              <div key={fixture.id} className="fixture-card">
                {/* Header */}
                <div className="fixture-header">
                  <div className="d-flex align-center gap-xs">
                    <span>{league?.logo}</span>
                    <span style={{ fontWeight: 600 }}>{league?.name}</span>
                  </div>
                  <div>
                    {fixture.status === 'LIVE' ? (
                      <span className="live-pill">
                        <span className="live-dot" />
                        LIVE • {fixture.minute}
                      </span>
                    ) : fixture.status === 'COMPLETED' ? (
                      <span className="badge badge-completed">FINAL</span>
                    ) : (
                      <span className="badge badge-upcoming">UPCOMING</span>
                    )}
                  </div>
                </div>

                {/* Teams & Score Layout (CSS Grid) */}
                <div className="fixture-teams-grid">
                  <div className="team-block">
                    <div className="team-logo-lg" style={{ borderColor: home?.themeColor || 'var(--primary)' }}>
                      {home?.logo || '⚽'}
                    </div>
                    <div className="team-name-lg" title={home?.name}>{home?.name}</div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Home</span>
                  </div>

                  <div className="fixture-score-center">
                    {fixture.status === 'UPCOMING' ? (
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>
                          {fixture.time}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {fixture.date}
                        </div>
                      </div>
                    ) : (
                      <div className={`score-display ${fixture.status === 'LIVE' ? 'live' : ''}`}>
                        {fixture.homeScore} : {fixture.awayScore}
                      </div>
                    )}
                  </div>

                  <div className="team-block">
                    <div className="team-logo-lg" style={{ borderColor: away?.themeColor || 'var(--accent-red)' }}>
                      {away?.logo || '⚽'}
                    </div>
                    <div className="team-name-lg" title={away?.name}>{away?.name}</div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Away</span>
                  </div>
                </div>

                {/* Footer with Venue & Action Buttons */}
                <div className="fixture-footer">
                  <div className="d-flex align-center gap-xs" style={{ fontSize: '0.78rem' }}>
                    <MapPin size={13} color="var(--primary)" />
                    <span>{fixture.venue}</span>
                  </div>

                  <div className="d-flex gap-xs">
                    {fixture.status === 'LIVE' ? (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => setCurrentView('live')}
                      >
                        <Radio size={13} />
                        <span>Live Center</span>
                      </button>
                    ) : fixture.status === 'UPCOMING' ? (
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => setCurrentView('tickets')}
                      >
                        <Ticket size={13} />
                        <span>Book Seats (${fixture.ticketPrice})</span>
                      </button>
                    ) : (
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => setCurrentView('live')}
                      >
                        <span>Match Recap</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
