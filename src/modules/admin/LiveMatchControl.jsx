import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Radio, 
  Play, 
  Pause, 
  CheckCircle, 
  Plus, 
  Minus, 
  Clock, 
  ShieldAlert, 
  Flag, 
  Activity,
  Send,
  Zap
} from 'lucide-react';

export const LiveMatchControl = () => {
  const { 
    fixtures, 
    teams, 
    leagues, 
    updateMatchLiveStatus, 
    addMatchEvent, 
    showToast 
  } = useApp();

  const [activeFixtureId, setActiveFixtureId] = useState(
    fixtures.find(f => f.status === 'LIVE')?.id || fixtures[0]?.id
  );

  const [customMinute, setCustomMinute] = useState('');
  const [newEventText, setNewEventText] = useState('');
  const [newEventType, setNewEventType] = useState('goal');

  const activeFixture = fixtures.find(f => f.id === activeFixtureId) || fixtures[0];
  const homeTeam = teams.find(t => t.id === activeFixture?.homeTeamId);
  const awayTeam = teams.find(t => t.id === activeFixture?.awayTeamId);
  const league = leagues.find(l => l.id === activeFixture?.leagueId);

  // Score handlers
  const handleScoreChange = (teamType, delta) => {
    if (!activeFixture) return;
    
    let currentHome = typeof activeFixture.homeScore === 'number' 
      ? activeFixture.homeScore 
      : parseInt(activeFixture.homeScore, 10) || 0;
    let currentAway = typeof activeFixture.awayScore === 'number' 
      ? activeFixture.awayScore 
      : parseInt(activeFixture.awayScore, 10) || 0;

    if (teamType === 'home') {
      const nextHome = Math.max(0, currentHome + delta);
      updateMatchLiveStatus(activeFixture.id, { homeScore: nextHome });
      showToast(`Updated ${homeTeam?.name} score to ${nextHome}`, 'info');
    } else {
      const nextAway = Math.max(0, currentAway + delta);
      updateMatchLiveStatus(activeFixture.id, { awayScore: nextAway });
      showToast(`Updated ${awayTeam?.name} score to ${nextAway}`, 'info');
    }
  };

  const handleStatusChange = (newStatus) => {
    if (!activeFixture) return;
    updateMatchLiveStatus(activeFixture.id, { 
      status: newStatus,
      minute: newStatus === 'COMPLETED' ? 'FT' : newStatus === 'LIVE' ? "45'" : "0'"
    });
    showToast(`Match status switched to: ${newStatus}`, 'success');
  };

  const handleMinuteChange = (minStr) => {
    if (!activeFixture) return;
    updateMatchLiveStatus(activeFixture.id, { minute: minStr });
    showToast(`Match minute updated to ${minStr}`, 'info');
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventText.trim() || !activeFixture) return;

    let prefix = '⚡';
    if (newEventType === 'goal') prefix = '⚽ GOAL!';
    if (newEventType === 'yellow_card') prefix = '🟨 YELLOW CARD:';
    if (newEventType === 'red_card') prefix = '🟥 RED CARD:';
    if (newEventType === 'wicket') prefix = '🎯 WICKET:';
    if (newEventType === 'boundary') prefix = '🏏 BOUNDARY:';

    const fullText = `${prefix} ${newEventText.trim()}`;
    addMatchEvent(activeFixture.id, fullText, newEventType);
    setNewEventText('');
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Radio size={24} color="var(--accent-red)" />
            Real-Time Live Match Control Center
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Broadcast live score changes, manage match clock minutes, record match incidents, and conclude fixtures.
          </p>
        </div>

        {/* Fixture Selector Pill List */}
        <div className="d-flex gap-xs flex-wrap">
          {fixtures.map(f => {
            const h = teams.find(t => t.id === f.homeTeamId);
            const a = teams.find(t => t.id === f.awayTeamId);
            const isLive = f.status === 'LIVE';
            return (
              <button
                key={f.id}
                onClick={() => setActiveFixtureId(f.id)}
                className={`btn btn-sm ${activeFixtureId === f.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.78rem' }}
              >
                {isLive && <span className="live-dot" style={{ width: '6px', height: '6px' }} />}
                <span>{h?.shortName} vs {a?.shortName}</span>
                <span>({f.status})</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeFixture && (
        <div className="d-flex flex-col gap-lg">
          {/* Main Control Console Card */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, #182438 0%, #0d1420 100%)',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            padding: '30px'
          }}>
            {/* Top Bar: Match state buttons */}
            <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '18px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {league?.name} • {activeFixture.venue}
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                  {homeTeam?.name} vs {awayTeam?.name}
                </h3>
              </div>

              {/* Status Selector */}
              <div className="d-flex gap-xs">
                <button
                  className={`btn btn-sm ${activeFixture.status === 'UPCOMING' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleStatusChange('UPCOMING')}
                >
                  <span>Upcoming</span>
                </button>
                <button
                  className={`btn btn-sm ${activeFixture.status === 'LIVE' ? 'btn-danger' : 'btn-secondary'}`}
                  onClick={() => handleStatusChange('LIVE')}
                >
                  <span className="live-dot" />
                  <span>Set LIVE</span>
                </button>
                <button
                  className={`btn btn-sm ${activeFixture.status === 'COMPLETED' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleStatusChange('COMPLETED')}
                >
                  <CheckCircle size={14} />
                  <span>Conclude (FT)</span>
                </button>
              </div>
            </div>

            {/* Score Adjuster Grid (CSS Grid 3-cols) */}
            <div className="fixture-teams-grid" style={{ padding: '10px 0' }}>
              {/* Home Team Controller */}
              <div className="team-block">
                <div className="team-logo-lg" style={{ width: '70px', height: '70px', fontSize: '32px', borderColor: homeTeam?.themeColor || 'var(--primary)' }}>
                  {homeTeam?.logo}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{homeTeam?.name}</h4>

                {/* Score Buttons */}
                <div className="d-flex align-center gap-xs" style={{ marginTop: '10px' }}>
                  <button 
                    className="btn btn-secondary btn-icon"
                    onClick={() => handleScoreChange('home', -1)}
                    title="Decrease Score"
                  >
                    <Minus size={16} />
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleScoreChange('home', 1)}
                    style={{ fontWeight: 800 }}
                  >
                    <Plus size={16} />
                    <span>+1 Goal/Pt</span>
                  </button>
                </div>
              </div>

              {/* Central Score Display */}
              <div className="fixture-score-center">
                <div className={`score-display ${activeFixture.status === 'LIVE' ? 'live' : ''}`} style={{ fontSize: '3.8rem', padding: '10px 30px' }}>
                  {activeFixture.homeScore} : {activeFixture.awayScore}
                </div>
                <div className="d-flex align-center gap-xs" style={{ marginTop: '6px' }}>
                  <Clock size={14} color="var(--primary)" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    Minute: {activeFixture.minute || "0'"}
                  </span>
                </div>
              </div>

              {/* Away Team Controller */}
              <div className="team-block">
                <div className="team-logo-lg" style={{ width: '70px', height: '70px', fontSize: '32px', borderColor: awayTeam?.themeColor || 'var(--accent-red)' }}>
                  {awayTeam?.logo}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{awayTeam?.name}</h4>

                {/* Score Buttons */}
                <div className="d-flex align-center gap-xs" style={{ marginTop: '10px' }}>
                  <button 
                    className="btn btn-secondary btn-icon"
                    onClick={() => handleScoreChange('away', -1)}
                    title="Decrease Score"
                  >
                    <Minus size={16} />
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleScoreChange('away', 1)}
                    style={{ fontWeight: 800 }}
                  >
                    <Plus size={16} />
                    <span>+1 Goal/Pt</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Minute Preset Buttons */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '18px', marginTop: '16px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 700 }}>
                Quick Match Clock Presets:
              </div>
              <div className="d-flex gap-xs flex-wrap">
                {["15'", "30'", "45'", "HT", "60'", "75'", "90'", "90'+4", "FT"].map(m => (
                  <button
                    key={m}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                    onClick={() => handleMinuteChange(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Grid: Add Event + Event Feed (CSS Grid 2-cols) */}
          <div className="grid-cols-2">
            {/* Add Live Event Logger */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <Activity size={18} color="var(--primary)" />
                  Broadcast Live Match Incident
                </div>
              </div>

              <form onSubmit={handleAddEvent}>
                <div className="form-group">
                  <label className="form-label">Incident Type</label>
                  <select
                    className="form-select"
                    value={newEventType}
                    onChange={e => setNewEventType(e.target.value)}
                  >
                    <option value="goal">⚽ Goal / Boundary / Basket</option>
                    <option value="yellow_card">🟨 Yellow Card Booking</option>
                    <option value="red_card">🟥 Red Card Dismissal</option>
                    <option value="wicket">🎯 Cricket Wicket Fall</option>
                    <option value="boundary">🏏 Cricket 4 / 6</option>
                    <option value="substitution">🔄 Tactical Substitution</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Event Description & Player Mention</label>
                  <textarea
                    rows={3}
                    required
                    className="form-textarea"
                    placeholder="e.g. Gabriel Vance strikes on the volley into the top left corner!"
                    value={newEventText}
                    onChange={e => setNewEventText(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={15} />
                  <span>Publish Incident to Live Feed</span>
                </button>
              </form>
            </div>

            {/* Current Match Event Stream */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <Clock size={18} color="var(--accent-blue)" />
                  Incident History ({activeFixture.events?.length || 0})
                </div>
              </div>

              <div className="d-flex flex-col gap-xs" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {(!activeFixture.events || activeFixture.events.length === 0) ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '20px', textAlign: 'center' }}>
                    No events broadcasted yet for this match.
                  </p>
                ) : (
                  activeFixture.events.map((evt, idx) => (
                    <div 
                      key={idx}
                      style={{
                        padding: '10px 14px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        fontSize: '0.85rem'
                      }}
                    >
                      <span style={{ fontWeight: 800, color: 'var(--primary)', minWidth: '40px' }}>
                        {evt.time}
                      </span>
                      <span style={{ color: 'var(--text-main)' }}>{evt.text}</span>
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
