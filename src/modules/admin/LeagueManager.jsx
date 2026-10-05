import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Plus, Edit2, Trash2, X, Check, Layers } from 'lucide-react';

export const LeagueManager = () => {
  const { leagues, addLeague, updateLeague, deleteLeague, teams } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingLeague, setEditingLeague] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    sport: 'Football',
    country: 'International',
    season: '2026 Season',
    logo: '⚽',
    badgeColor: '#10b981',
    description: ''
  });

  const handleOpenAdd = () => {
    setEditingLeague(null);
    setFormData({
      name: '',
      sport: 'Football',
      country: 'International',
      season: '2026 Season',
      logo: '⚽',
      badgeColor: '#10b981',
      description: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (league) => {
    setEditingLeague(league);
    setFormData({
      name: league.name,
      sport: league.sport,
      country: league.country,
      season: league.season,
      logo: league.logo,
      badgeColor: league.badgeColor,
      description: league.description
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingLeague) {
      updateLeague(editingLeague.id, formData);
    } else {
      addLeague(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}"? This will also remove associated fixtures and standings.`)) {
      deleteLeague(id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy size={24} color="var(--primary)" />
            League & Tournament Management
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Configure active sporting competitions, tournament seasons, and rule specifications.
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Create New League</span>
        </button>
      </div>

      {/* Leagues Grid (CSS Grid) */}
      <div className="grid-cols-3">
        {leagues.map(league => {
          const clubCount = teams.filter(t => t.leagueId === league.id).length;
          return (
            <div 
              key={league.id} 
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: `4px solid ${league.badgeColor || 'var(--primary)'}`
              }}
            >
              <div>
                <div className="d-flex justify-between align-center" style={{ marginBottom: '14px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {league.logo}
                  </div>
                  <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                    {league.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '4px' }}>
                  {league.name}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Sport: <strong>{league.sport}</strong> • Season: {league.season}
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {league.description}
                </p>
              </div>

              <div>
                <div className="d-flex justify-between align-center" style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  marginBottom: '14px'
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>Registered Teams:</span>
                  <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{clubCount} Clubs</span>
                </div>

                <div className="d-flex justify-end gap-xs" style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleOpenEdit(league)}
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(league.id, league.name)}
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit League Modal (Flexbox) */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {editingLeague ? 'Edit League Details' : 'Register New Tournament League'}
              </h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">League / Tournament Title *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. National Premier Championship"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="d-flex gap-md">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Sport Discipline</label>
                    <select
                      className="form-select"
                      value={formData.sport}
                      onChange={e => setFormData({ ...formData, sport: e.target.value })}
                    >
                      <option value="Football">Football (Soccer)</option>
                      <option value="Cricket">Cricket (T20/ODI)</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Rugby">Rugby</option>
                      <option value="Tennis">Tennis</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Logo / Emblem</label>
                    <select
                      className="form-select"
                      value={formData.logo}
                      onChange={e => setFormData({ ...formData, logo: e.target.value })}
                    >
                      <option value="⚽">⚽ Football</option>
                      <option value="🏏">🏏 Cricket</option>
                      <option value="🏀">🏀 Basketball</option>
                      <option value="🏉">🏉 Rugby</option>
                      <option value="🎾">🎾 Tennis</option>
                      <option value="🏆">🏆 Trophy</option>
                      <option value="🥇">🥇 Medal</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex gap-md">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Season / Year</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 2026-2027"
                      value={formData.season}
                      onChange={e => setFormData({ ...formData, season: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Country / Jurisdiction</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Global, India, UK"
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description & Competition Format</label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    placeholder="Brief description of the tournament format and rules..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                  {editingLeague ? 'Save Changes' : 'Create Tournament'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
