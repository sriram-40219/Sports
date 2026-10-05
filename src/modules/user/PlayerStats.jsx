import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Star, Flame, Trophy, Target, Zap } from 'lucide-react';

export const PlayerStats = () => {
  const { teams, leagues, selectedLeagueId, setSelectedLeagueId } = useApp();

  const [statType, setStatType] = useState('SCORERS'); // 'SCORERS' | 'ASSISTS' | 'MVPS'

  // Extract all players across teams in the selected league
  const leagueTeams = teams.filter(t => !selectedLeagueId || t.leagueId === selectedLeagueId);
  const allPlayers = [];

  leagueTeams.forEach(team => {
    if (team.roster) {
      team.roster.forEach(player => {
        allPlayers.push({
          ...player,
          teamName: team.name,
          teamLogo: team.logo,
          sport: team.sport
        });
      });
    }
  });

  // Sort based on stat type
  let sortedPlayers = [...allPlayers];
  if (statType === 'SCORERS') {
    sortedPlayers.sort((a, b) => {
      const aVal = a.goals ?? a.runs ?? a.points ?? 0;
      const bVal = b.goals ?? b.runs ?? b.points ?? 0;
      return bVal - aVal;
    });
  } else if (statType === 'ASSISTS') {
    sortedPlayers.sort((a, b) => (b.assists || 0) - (a.assists || 0));
  } else {
    sortedPlayers.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  const topThree = sortedPlayers.slice(0, 3);
  const remaining = sortedPlayers.slice(3, 10);

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={24} color="var(--accent-amber)" />
            Player Statistics & Individual Leaderboards
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Official player performance rankings, Golden Boot race, playmaking assists, and MVP ratings.
          </p>
        </div>

        {/* Stat Type Toggle */}
        <div className="d-flex gap-xs">
          <button 
            className={`btn btn-sm ${statType === 'SCORERS' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setStatType('SCORERS')}
          >
            <Flame size={14} />
            <span>Top Scorers / Points</span>
          </button>
          <button 
            className={`btn btn-sm ${statType === 'ASSISTS' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setStatType('ASSISTS')}
          >
            <Target size={14} />
            <span>Top Assists</span>
          </button>
          <button 
            className={`btn btn-sm ${statType === 'MVPS' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setStatType('MVPS')}
          >
            <Star size={14} />
            <span>MVP Ratings</span>
          </button>
        </div>
      </div>

      {/* Podium for Top 3 (CSS Grid / Flexbox) */}
      {topThree.length >= 3 && (
        <div className="grid-cols-3" style={{ marginBottom: '28px', alignItems: 'flex-end' }}>
          {/* Rank 2 */}
          <div className="card" style={{ textAlign: 'center', padding: '24px', background: 'linear-gradient(180deg, #182236 0%, #101624 100%)' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#94a3b8', marginBottom: '8px' }}>🥈 #2</div>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{topThree[1].teamLogo}</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{topThree[1].name}</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{topThree[1].teamName}</div>
            <div style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: 'var(--text-main)',
              fontFamily: 'var(--font-display)',
              background: 'rgba(0,0,0,0.3)',
              padding: '6px',
              borderRadius: 'var(--radius-md)'
            }}>
              {statType === 'SCORERS' ? `${topThree[1].goals ?? topThree[1].runs ?? topThree[1].points} Score` :
               statType === 'ASSISTS' ? `${topThree[1].assists || 0} Assists` :
               `${topThree[1].rating} ★`}
            </div>
          </div>

          {/* Rank 1 - Golden Champion */}
          <div className="card" style={{
            textAlign: 'center',
            padding: '32px 24px',
            background: 'linear-gradient(180deg, #1a2a40 0%, #0d1624 100%)',
            border: '2px solid var(--accent-amber)',
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.2)'
          }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '4px' }}>👑</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)', marginBottom: '6px' }}>🥇 #1 LEADER</div>
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>{topThree[0].teamLogo}</div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{topThree[0].name}</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>{topThree[0].teamName}</div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--accent-amber)',
              fontFamily: 'var(--font-display)',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '8px',
              borderRadius: 'var(--radius-md)'
            }}>
              {statType === 'SCORERS' ? `${topThree[0].goals ?? topThree[0].runs ?? topThree[0].points} Score` :
               statType === 'ASSISTS' ? `${topThree[0].assists || 0} Assists` :
               `${topThree[0].rating} ★`}
            </div>
          </div>

          {/* Rank 3 */}
          <div className="card" style={{ textAlign: 'center', padding: '24px', background: 'linear-gradient(180deg, #182236 0%, #101624 100%)' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#b45309', marginBottom: '8px' }}>🥉 #3</div>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{topThree[2].teamLogo}</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{topThree[2].name}</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{topThree[2].teamName}</div>
            <div style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: 'var(--text-main)',
              fontFamily: 'var(--font-display)',
              background: 'rgba(0,0,0,0.3)',
              padding: '6px',
              borderRadius: 'var(--radius-md)'
            }}>
              {statType === 'SCORERS' ? `${topThree[2].goals ?? topThree[2].runs ?? topThree[2].points} Score` :
               statType === 'ASSISTS' ? `${topThree[2].assists || 0} Assists` :
               `${topThree[2].rating} ★`}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table (CSS Grid) */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Trophy size={18} color="var(--primary)" />
            Complete Player Rankings
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Top Competitors</span>
        </div>

        <div className="table-container">
          <table className="standings-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Rank</th>
                <th>Player</th>
                <th>Club</th>
                <th>Position</th>
                <th>Matches</th>
                <th>Goals/Runs</th>
                <th>Assists</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player, idx) => (
                <tr key={player.id || idx}>
                  <td className="pos-cell" style={{ fontWeight: 800 }}>
                    #{idx + 1}
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                      {player.name}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-center gap-xs">
                      <span>{player.teamLogo}</span>
                      <span>{player.teamName}</span>
                    </div>
                  </td>
                  <td><span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>{player.position}</span></td>
                  <td>{player.matches || 12}</td>
                  <td style={{ fontWeight: 800, color: 'var(--primary)' }}>
                    {player.goals ?? player.runs ?? player.points ?? '—'}
                  </td>
                  <td>{player.assists ?? '—'}</td>
                  <td>
                    <div className="d-flex align-center gap-xs" style={{ color: '#fbbf24', fontWeight: 700 }}>
                      <Star size={13} fill="#fbbf24" />
                      <span>{player.rating || '8.0'}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
