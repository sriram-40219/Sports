import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Clock, User, ChevronRight, X, Newspaper } from 'lucide-react';

export const NewsFeed = () => {
  const { news, leagues, selectedLeagueId, setSelectedLeagueId } = useApp();

  const [activeArticle, setActiveArticle] = useState(null);

  const filteredNews = news.filter(n => !selectedLeagueId || n.leagueId === selectedLeagueId);

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Newspaper size={24} color="var(--accent-red)" />
            Fan Engagement & League News
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Official match previews, tactical reviews, tournament dispatches, and fan announcements.
          </p>
        </div>

        {/* League Selector Pills */}
        <div className="d-flex gap-xs flex-wrap">
          <button
            onClick={() => setSelectedLeagueId('')}
            className={`btn btn-sm ${!selectedLeagueId ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.82rem' }}
          >
            All Sports
          </button>
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

      {/* News Grid (CSS Grid) */}
      <div className="grid-cols-3">
        {filteredNews.map(item => (
          <div 
            key={item.id} 
            className="card"
            style={{
              padding: '0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onClick={() => setActiveArticle(item)}
          >
            <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
              <img 
                src={item.image} 
                alt={item.title} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
              />
              <span className="badge" style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'rgba(0,0,0,0.7)',
                color: 'var(--primary)',
                backdropFilter: 'blur(4px)'
              }}>
                {item.category}
              </span>
            </div>

            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="d-flex align-center gap-xs" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                  <Clock size={12} />
                  <span>{item.date}</span>
                  <span>•</span>
                  <User size={12} />
                  <span>{item.author}</span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, lineHeight: 1.4, marginBottom: '8px', color: 'var(--text-main)' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {item.summary}
                </p>
              </div>

              <div style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '14px',
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '0.82rem'
              }}>
                <span>Read Full Story</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="modal-overlay" onClick={() => setActiveArticle(null)}>
          <div className="modal-box" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                {activeArticle.category}
              </span>
              <button className="btn btn-secondary btn-icon" onClick={() => setActiveArticle(null)}>
                <X size={16} />
              </button>
            </div>

            <div className="modal-body">
              <img 
                src={activeArticle.image} 
                alt={activeArticle.title} 
                style={{
                  width: '100%',
                  height: '240px',
                  borderRadius: 'var(--radius-md)',
                  objectFit: 'cover',
                  marginBottom: '16px'
                }}
              />

              <div className="d-flex align-center gap-xs" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '10px' }}>
                <Clock size={12} />
                <span>Published on {activeArticle.date}</span>
                <span>•</span>
                <User size={12} />
                <span>Written by {activeArticle.author}</span>
              </div>

              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '14px', lineHeight: 1.3 }}>
                {activeArticle.title}
              </h2>

              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '14px' }}>
                {activeArticle.summary}
              </p>

              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                {activeArticle.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
