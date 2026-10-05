import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Plus, Edit2, Trash2, X, MapPin, Clock, Radio, Ticket } from 'lucide-react';

export const FixtureManager = () => {
  const { fixtures, teams, leagues, addFixture, updateFixture, deleteFixture, setCurrentView } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingFixture, setEditingFixture] = useState(null);

  const [formData, setFormData] = useState({
    leagueId: leagues[0]?.id || '',
    homeTeamId: '',
    awayTeamId: '',
    date: '2026-10-15',
    time: '19:30',
    venue: '',
    status: 'UPCOMING',
    ticketPrice: 50,
    availableSeats: 2500
  });

  const handleOpenAdd = () => {
    setEditingFixture(null);
    const firstLeagueId = leagues[0]?.id || '';
    const leagueTeams = teams.filter(t => t.leagueId === firstLeagueId);
    const home = leagueTeams[0]?.id || '';
    const away = leagueTeams[1]?.id || '';
    const homeVenue = leagueTeams[0]?.stadium || 'Olympic Arena';

    setFormData({
      leagueId: firstLeagueId,
      homeTeamId: home,
      awayTeamId: away,
      date: new Date().toISOString().split('T')[0],
      time: '19:30',
      venue: homeVenue,
      status: 'UPCOMING',
      ticketPrice: 50,
      availableSeats: 2500
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (fix) => {
    setEditingFixture(fix);
    setFormData({
      leagueId: fix.leagueId,
      homeTeamId: fix.homeTeamId,
      awayTeamId: fix.awayTeamId,
      date: fix.date,
      time: fix.time,
      venue: fix.venue,
      status: fix.status,
      ticketPrice: fix.ticketPrice || 50,
      availableSeats: fix.availableSeats || 2500
    });
    setModalOpen(true);
  };

  const handleLeagueChange = (leagueId) => {
    const leagueTeams = teams.filter(t => t.leagueId === leagueId);
    setFormData(prev => ({
      ...prev,
      leagueId,
      homeTeamId: leagueTeams[0]?.id || '',
      awayTeamId: leagueTeams[1]?.id || '',
      venue: leagueTeams[0]?.stadium || prev.venue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.homeTeamId || !formData.awayTeamId) {
      alert('Please select both home and away teams.');
      return;
    }
    if (formData.homeTeamId === formData.awayTeamId) {
      alert('Home team and Away team cannot be the same!');
      return;
    }

    if (editingFixture) {
      updateFixture(editingFixture.id, formData);
    } else {
      addFixture(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this scheduled fixture?')) {
      deleteFixture(id);
    }
  };

  // League teams for form
  const currentFormTeams = teams.filter(t => t.leagueId === formData.leagueId);

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={24} color="var(--primary)" />
            Match Fixtures & Scheduling Center
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Schedule tournament matches, set kickoff dates, designate venues, and configure ticketing tiers.
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Schedule New Match</span>
        </button>
      </div>

      {/* Fixtures Table View */}
      <div className="card">
        <div className="table-container">
          <table className="standings-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>League</th>
                <th>Matchup</th>
                <th>Venue</th>
                <th>Score</th>
                <th>Status</th>
                <th>Ticket Price</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fixtures.map(fix => {
                const home = teams.find(t => t.id === fix.homeTeamId);
                const away = teams.find(t => t.id === fix.awayTeamId);
                const league = leagues.find(l => l.id === fix.leagueId);

                return (
                  <tr key={fix.id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{fix.date}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{fix.time}</span>
                    </td>
                    <td>
                      <div className="d-flex align-center gap-xs">
                        <span>{league?.logo}</span>
                        <span style={{ fontSize: '0.82rem' }}>{league?.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-center gap-xs" style={{ fontWeight: 700 }}>
                        <span>{home?.logo} {home?.shortName}</span>
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>vs</span>
                        <span>{away?.logo} {away?.shortName}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{fix.venue}</div>
                    </td>
                    <td>
                      <span style={{
                        fontWeight: 800,
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        color: fix.status === 'LIVE' ? '#34d399' : 'var(--text-main)'
                      }}>
                        {fix.homeScore} - {fix.awayScore}
                      </span>
                    </td>
                    <td>
                      {fix.status === 'LIVE' ? (
                        <span className="live-pill" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                          <span className="live-dot" /> LIVE
                        </span>
                      ) : fix.status === 'COMPLETED' ? (
                        <span className="badge badge-completed">FINAL</span>
                      ) : (
                        <span className="badge badge-upcoming">UPCOMING</span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--primary)' }}>${fix.ticketPrice}</span>
                    </td>
                    <td>
                      <div className="d-flex justify-end gap-xs">
                        {fix.status === 'LIVE' && (
                          <button 
                            className="btn btn-outline btn-sm"
                            style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                            onClick={() => setCurrentView('live-control')}
                            title="Control Live Match"
                          >
                            <Radio size={12} />
                          </button>
                        )}
                        <button 
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px' }}
                          onClick={() => handleOpenEdit(fix)}
                        >
                          <Edit2 size={12} />
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          style={{ padding: '4px 8px' }}
                          onClick={() => handleDelete(fix.id)}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Fixture Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {editingFixture ? 'Edit Fixture Details' : 'Schedule New Match Fixture'}
              </h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Competition League *</label>
                  <select
                    className="form-select"
                    value={formData.leagueId}
                    onChange={e => handleLeagueChange(e.target.value)}
                  >
                    {leagues.map(l => (
                      <option key={l.id} value={l.id}>{l.logo} {l.name}</option>
                    ))}
                  </select>
                </div>

                <div className="d-flex gap-md">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Home Team *</label>
                    <select
                      className="form-select"
                      value={formData.homeTeamId}
                      onChange={e => {
                        const hTeam = teams.find(t => t.id === e.target.value);
                        setFormData({ 
                          ...formData, 
                          homeTeamId: e.target.value,
                          venue: hTeam?.stadium || formData.venue
                        });
                      }}
                    >
                      {currentFormTeams.map(t => (
                        <option key={t.id} value={t.id}>{t.logo} {t.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Away Team *</label>
                    <select
                      className="form-select"
                      value={formData.awayTeamId}
                      onChange={e => setFormData({ ...formData, awayTeamId: e.target.value })}
                    >
                      {currentFormTeams.map(t => (
                        <option key={t.id} value={t.id}>{t.logo} {t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="d-flex gap-md">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Match Date</label>
                    <input
                      type="date"
                      required
                      className="form-input"
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Kickoff Time</label>
                    <input
                      type="time"
                      required
                      className="form-input"
                      value={formData.time}
                      onChange={e => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Stadium / Arena Venue</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.venue}
                    onChange={e => setFormData({ ...formData, venue: e.target.value })}
                  />
                </div>

                <div className="d-flex gap-md">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Ticket Base Price ($)</label>
                    <input
                      type="number"
                      required
                      min={5}
                      className="form-input"
                      value={formData.ticketPrice}
                      onChange={e => setFormData({ ...formData, ticketPrice: parseInt(e.target.value, 10) || 45 })}
                    />
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Match Status</label>
                    <select
                      className="form-select"
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="UPCOMING">UPCOMING</option>
                      <option value="LIVE">LIVE (In Progress)</option>
                      <option value="COMPLETED">COMPLETED (Full Time)</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                  {editingFixture ? 'Update Fixture' : 'Schedule Fixture'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
