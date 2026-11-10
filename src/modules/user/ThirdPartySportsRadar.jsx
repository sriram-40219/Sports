import React, { useState } from 'react';
import { 
  useGetThirdPartySportsDataQuery, 
  useGetThirdPartyLeaguesQuery 
} from '../../redux/api/sportsApi';
import { Globe, Search, ExternalLink, Shield, MapPin, Calendar, Activity } from 'lucide-react';

export const ThirdPartySportsRadar = () => {
  const [selectedLeague, setSelectedLeague] = useState('English Premier League');
  
  // RTK Query hooks connecting directly to Third-Party Sports API (TheSportsDB)
  const { data: teams = [], isLoading, isError, error, refetch } = useGetThirdPartySportsDataQuery(selectedLeague);
  const { data: globalLeagues = [] } = useGetThirdPartyLeaguesQuery();

  const presetLeagues = [
    'English Premier League',
    'Spanish La Liga',
    'Italian Serie A',
    'German Bundesliga',
    'French Ligue 1',
    'NBA',
    'Indian Premier League'
  ];

  return (
    <div>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
        border: '1px solid rgba(16, 185, 129, 0.4)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div className="d-flex justify-between align-center flex-wrap gap-md">
          <div>
            <div className="d-flex align-center gap-xs" style={{ color: '#6ee7b7', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              <Globe size={16} />
              <span>Third-Party API Integration • Live World Sports Feed</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
              Global Sports Radar (TheSportsDB API)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Live real-world sports clubs, badges, stadium venues, and foundation histories fetched dynamically via Redux RTK Query.
            </p>
          </div>

          <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '0.8rem', padding: '6px 14px' }}>
            <Activity size={14} style={{ marginRight: '6px' }} />
            Connected to TheSportsDB API v1
          </span>
        </div>
      </div>

      {/* Preset League Selector Buttons (Flexbox) */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
        <div className="d-flex align-center gap-md flex-wrap">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Choose World League:</span>
          <div className="d-flex gap-xs flex-wrap">
            {presetLeagues.map(l => (
              <button
                key={l}
                onClick={() => setSelectedLeague(l)}
                className={`btn btn-sm ${selectedLeague === l ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem' }}
              >
                <span>⚽</span>
                <span>{l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading & Error States */}
      {isLoading && (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <div className="live-dot" style={{ width: '18px', height: '18px', margin: '0 auto 16px auto' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Fetching Live Data from Third-Party Sports API...</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Communicating with TheSportsDB public endpoints via Redux RTK Query.</p>
        </div>
      )}

      {isError && (
        <div className="card" style={{ textAlign: 'center', padding: '40px', borderColor: 'var(--accent-red)' }}>
          <h3 style={{ color: 'var(--accent-red)', fontSize: '1.1rem' }}>Third-Party API Connection Notice</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>{error?.error || 'Unable to fetch external API data.'}</p>
          <button className="btn btn-secondary btn-sm" onClick={() => refetch()} style={{ marginTop: '12px' }}>
            Retry Request
          </button>
        </div>
      )}

      {/* Results Grid (CSS Grid 3-columns) */}
      {!isLoading && !isError && (
        <div className="grid-cols-3">
          {teams.length === 0 ? (
            <div className="card" style={{ gridColumn: 'span 3', textAlign: 'center', padding: '40px' }}>
              <p style={{ color: 'var(--text-muted)' }}>No teams found for "{selectedLeague}".</p>
            </div>
          ) : (
            teams.map(team => (
              <div
                key={team.idTeam}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: '3px solid var(--primary)'
                }}
              >
                <div>
                  <div className="d-flex justify-between align-center" style={{ marginBottom: '14px' }}>
                    {team.strBadge ? (
                      <img 
                        src={team.strBadge} 
                        alt={team.strTeam} 
                        style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
                      />
                    ) : (
                      <div className="team-logo-lg" style={{ width: '48px', height: '48px', fontSize: '22px' }}>⚽</div>
                    )}
                    <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-muted)' }}>
                      Est. {team.intFormedYear || 'N/A'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{team.strTeam}</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '6px' }}>
                    {team.strLeague}
                  </div>

                  <div style={{
                    background: 'rgba(0,0,0,0.25)',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    marginBottom: '12px'
                  }}>
                    <div className="d-flex align-center gap-xs" style={{ color: 'var(--text-main)', marginBottom: '3px' }}>
                      <MapPin size={13} color="var(--primary)" />
                      <span>{team.strStadium || 'National Arena'}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      Location: {team.strLocation || team.strCountry || 'International'}
                    </div>
                  </div>

                  <p style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    maxHeight: '65px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {team.strDescriptionEN || 'Professional sports franchise competing in official league championships.'}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Source: TheSportsDB API</span>
                  {team.strWebsite && (
                    <a
                      href={`https://${team.strWebsite.replace(/^https?:\/\//, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                    >
                      <span>Website</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
