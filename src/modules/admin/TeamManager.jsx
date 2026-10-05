import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Plus, Edit2, Trash2, X, UserPlus, MapPin, Star } from 'lucide-react';

export const TeamManager = () => {
  const { teams, leagues, addTeam, updateTeam, deleteTeam, showToast } = useApp();

  const [selectedLeague, setSelectedLeague] = useState(leagues[0]?.id || '');
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  // Player roster modal
  const [rosterModalTeam, setRosterModalTeam] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    number: '',
    position: 'Forward',
    goals: 0,
    assists: 0,
    rating: 8.0
  });

  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    leagueId: leagues[0]?.id || '',
    sport: 'Football',
    city: '',
    stadium: '',
    capacity: 45000,
    coach: '',
    logo: '⚽',
    themeColor: '#2563eb'
  });

  const handleOpenAdd = () => {
    setEditingTeam(null);
    setFormData({
      name: '',
      shortName: '',
      leagueId: selectedLeague || leagues[0]?.id || '',
      sport: leagues.find(l => l.id === selectedLeague)?.sport || 'Football',
      city: '',
      stadium: '',
      capacity: 45000,
      coach: '',
      logo: '⚽',
      themeColor: '#2563eb'
    });
    setTeamModalOpen(true);
  };

  const handleOpenEdit = (team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      shortName: team.shortName,
      leagueId: team.leagueId,
      sport: team.sport,
      city: team.city,
      stadium: team.stadium,
      capacity: team.capacity,
      coach: team.coach,
      logo: team.logo,
      themeColor: team.themeColor
    });
    setTeamModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.shortName) return;

    if (editingTeam) {
      updateTeam(editingTeam.id, formData);
    } else {
      addTeam(formData);
    }
    setTeamModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      deleteTeam(id);
    }
  };

  // Add player to team roster
  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!newPlayer.name || !rosterModalTeam) return;

    const playerObj = {
      id: `p_${Date.now()}`,
      name: newPlayer.name,
      number: parseInt(newPlayer.number, 10) || 10,
      position: newPlayer.position,
      goals: parseInt(newPlayer.goals, 10) || 0,
      assists: parseInt(newPlayer.assists, 10) || 0,
      rating: parseFloat(newPlayer.rating) || 8.0,
      matches: 1
    };

    const updatedRoster = [...(rosterModalTeam.roster || []), playerObj];
    updateTeam(rosterModalTeam.id, { roster: updatedRoster });
    setRosterModalTeam({ ...rosterModalTeam, roster: updatedRoster });

    setNewPlayer({ name: '', number: '', position: 'Forward', goals: 0, assists: 0, rating: 8.0 });
    showToast(`Added ${playerObj.name} to ${rosterModalTeam.name} roster!`, 'success');
  };

  const handleRemovePlayer = (playerId) => {
    if (!rosterModalTeam) return;
    const updatedRoster = (rosterModalTeam.roster || []).filter(p => p.id !== playerId);
    updateTeam(rosterModalTeam.id, { roster: updatedRoster });
    setRosterModalTeam({ ...rosterModalTeam, roster: updatedRoster });
    showToast('Player removed from roster.', 'info');
  };

  const filteredTeams = teams.filter(t => !selectedLeague || t.leagueId === selectedLeague);

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={24} color="var(--accent-blue)" />
            Team Roster & Club Management
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Create sports franchises, manage home venues, assign head coaches, and manage player contracts.
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Register New Team</span>
        </button>
      </div>

      {/* League Filter */}
      <div className="card" style={{ padding: '14px 20px', marginBottom: '20px' }}>
        <div className="d-flex align-center gap-md flex-wrap">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Filter League:</span>
          <div className="d-flex gap-xs flex-wrap">
            <button
              onClick={() => setSelectedLeague('')}
              className={`btn btn-sm ${!selectedLeague ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem' }}
            >
              All Leagues ({teams.length})
            </button>
            {leagues.map(l => (
              <button
                key={l.id}
                onClick={() => setSelectedLeague(l.id)}
                className={`btn btn-sm ${selectedLeague === l.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem' }}
              >
                <span>{l.logo}</span>
                <span>{l.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Teams Grid (CSS Grid) */}
      <div className="grid-cols-3">
        {filteredTeams.map(team => {
          const league = leagues.find(l => l.id === team.leagueId);
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
                <div className="d-flex justify-between align-center" style={{ marginBottom: '14px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {team.logo}
                  </div>
                  <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-muted)' }}>
                    {team.shortName}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{team.name}</h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '8px' }}>
                  {league?.name || team.sport}
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Coach: <strong>{team.coach}</strong> • City: {team.city}
                </div>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  marginBottom: '14px'
                }}>
                  <div className="d-flex align-center gap-xs">
                    <MapPin size={12} color="var(--primary)" />
                    <span>{team.stadium} ({team.capacity?.toLocaleString()} seats)</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="d-flex justify-between align-center" style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => setRosterModalTeam(team)}
                    style={{ fontSize: '0.78rem' }}
                  >
                    <UserPlus size={13} />
                    <span>Roster ({team.roster?.length || 0})</span>
                  </button>

                  <div className="d-flex gap-xs">
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleOpenEdit(team)}
                    >
                      <Edit2 size={13} />
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(team.id, team.name)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Team Modal */}
      {teamModalOpen && (
        <div className="modal-overlay" onClick={() => setTeamModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {editingTeam ? 'Edit Team Details' : 'Register New Sports Team'}
              </h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setTeamModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Team Official Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Thunder Hawks FC"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="d-flex gap-md">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Short Code (3-4 Chars) *</label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      className="form-input"
                      placeholder="e.g. THK"
                      value={formData.shortName}
                      onChange={e => setFormData({ ...formData, shortName: e.target.value.toUpperCase() })}
                    />
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Assigned Tournament *</label>
                    <select
                      className="form-select"
                      value={formData.leagueId}
                      onChange={e => {
                        const lg = leagues.find(l => l.id === e.target.value);
                        setFormData({ 
                          ...formData, 
                          leagueId: e.target.value,
                          sport: lg ? lg.sport : formData.sport 
                        });
                      }}
                    >
                      {leagues.map(l => (
                        <option key={l.id} value={l.id}>{l.logo} {l.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="d-flex gap-md">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Home City</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Metro City"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Head Coach / Manager</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Pep Guardiola"
                      value={formData.coach}
                      onChange={e => setFormData({ ...formData, coach: e.target.value })}
                    />
                  </div>
                </div>

                <div className="d-flex gap-md">
                  <div className="form-group" style={{ flex: 2 }}>
                    <label className="form-label">Home Stadium</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Hawk Arena"
                      value={formData.stadium}
                      onChange={e => setFormData({ ...formData, stadium: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Capacity</label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.capacity}
                      onChange={e => setFormData({ ...formData, capacity: parseInt(e.target.value, 10) || 50000 })}
                    />
                  </div>
                </div>

                <div className="d-flex gap-md">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Team Mascot Logo</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.logo}
                      onChange={e => setFormData({ ...formData, logo: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Brand Color</label>
                    <input
                      type="color"
                      className="form-input"
                      style={{ padding: '4px', height: '42px', cursor: 'pointer' }}
                      value={formData.themeColor}
                      onChange={e => setFormData({ ...formData, themeColor: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                  {editingTeam ? 'Save Team Changes' : 'Register Club'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Manage Squad Roster Modal */}
      {rosterModalTeam && (
        <div className="modal-overlay" onClick={() => setRosterModalTeam(null)}>
          <div className="modal-box" style={{ maxWidth: '680px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="d-flex align-center gap-sm">
                <span style={{ fontSize: '24px' }}>{rosterModalTeam.logo}</span>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{rosterModalTeam.name} Roster</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Add or remove registered athletes from the official team roster.
                  </p>
                </div>
              </div>
              <button className="btn btn-secondary btn-icon" onClick={() => setRosterModalTeam(null)}>
                <X size={16} />
              </button>
            </div>

            <div className="modal-body">
              {/* Add New Player Form */}
              <form onSubmit={handleAddPlayer} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '10px', textTransform: 'uppercase' }}>
                  + Add Player to Squad
                </div>
                <div className="d-flex gap-sm flex-wrap">
                  <input
                    type="text"
                    required
                    placeholder="Player Name"
                    className="form-input"
                    style={{ flex: 2, minWidth: '150px' }}
                    value={newPlayer.name}
                    onChange={e => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  />
                  <input
                    type="number"
                    required
                    placeholder="Jersey #"
                    className="form-input"
                    style={{ width: '90px' }}
                    value={newPlayer.number}
                    onChange={e => setNewPlayer({ ...newPlayer, number: e.target.value })}
                  />
                  <select
                    className="form-select"
                    style={{ flex: 1, minWidth: '120px' }}
                    value={newPlayer.position}
                    onChange={e => setNewPlayer({ ...newPlayer, position: e.target.value })}
                  >
                    <option value="Forward">Forward / Batsman</option>
                    <option value="Midfielder">Midfielder / All-Rounder</option>
                    <option value="Defender">Defender / Bowler</option>
                    <option value="Goalkeeper">Goalkeeper / Keeper</option>
                    <option value="Guard">Point Guard / Center</option>
                  </select>
                  <button type="submit" className="btn btn-primary btn-sm">
                    <span>Add</span>
                  </button>
                </div>
              </form>

              {/* Existing Roster List */}
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase' }}>
                Current Squad Members ({rosterModalTeam.roster?.length || 0})
              </div>

              <div className="d-flex flex-col gap-xs" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {(!rosterModalTeam.roster || rosterModalTeam.roster.length === 0) ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No players listed yet.</p>
                ) : (
                  rosterModalTeam.roster.map(p => (
                    <div 
                      key={p.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 14px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <div className="d-flex align-center gap-md">
                        <span style={{ fontWeight: 800, color: 'var(--primary)', minWidth: '24px' }}>
                          #{p.number}
                        </span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{p.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.position}</div>
                        </div>
                      </div>

                      <div className="d-flex align-center gap-md">
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                          Score: {p.goals ?? p.runs ?? p.points ?? 0}
                        </span>
                        <button 
                          className="btn btn-danger btn-icon"
                          style={{ width: '28px', height: '28px' }}
                          onClick={() => handleRemovePlayer(p.id)}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
