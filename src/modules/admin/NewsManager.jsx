import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Newspaper, Bell, Plus, Trash2, Send, Clock, User, X } from 'lucide-react';

export const NewsManager = () => {
  const { news, addNews, deleteNews, addNotification, leagues, showToast } = useApp();

  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Match Preview',
    leagueId: leagues[0]?.id || '',
    author: 'League Editorial Desk',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    summary: '',
    content: ''
  });

  // Direct push notification broadcast
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastType, setBroadcastType] = useState('live');

  const handleAddArticle = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.summary) return;

    addNews(formData);
    setArticleModalOpen(false);
    setFormData({
      title: '',
      category: 'Match Preview',
      leagueId: leagues[0]?.id || '',
      author: 'League Editorial Desk',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
      summary: '',
      content: ''
    });
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    addNotification({
      title: broadcastTitle,
      message: broadcastMessage,
      type: broadcastType
    });

    showToast('Push alert broadcasted to all fans!', 'success');
    setBroadcastTitle('');
    setBroadcastMessage('');
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Newspaper size={24} color="var(--primary)" />
            Fan Engagement & News Publishing
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Publish tournament editorials, press briefings, and broadcast instant push notifications to fans.
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => setArticleModalOpen(true)}>
          <Plus size={16} />
          <span>Publish New Article</span>
        </button>
      </div>

      {/* Grid: Broadcast Notification + Published Articles List (CSS Grid 2-cols) */}
      <div className="grid-cols-2">
        {/* Left: Broadcast Push Notification */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Bell size={18} color="var(--accent-red)" />
              Broadcast Live Fan Alert
            </div>
            <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
              Instant Delivery
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Push a real-time notification into every fan's notification center (top bell icon).
          </p>

          <form onSubmit={handleSendBroadcast}>
            <div className="form-group">
              <label className="form-label">Alert Headline</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. ⚡ Extra Time Begins in Championship Final!"
                value={broadcastTitle}
                onChange={e => setBroadcastTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Alert Category</label>
              <select
                className="form-select"
                value={broadcastType}
                onChange={e => setBroadcastType(e.target.value)}
              >
                <option value="live">Live Match Breaking Event</option>
                <option value="ticket">Ticket Announcement / Early Access</option>
                <option value="announcement">Official Tournament Notice</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Message Content</label>
              <textarea
                rows={3}
                required
                className="form-textarea"
                placeholder="Write the broadcast message that fans will read..."
                value={broadcastMessage}
                onChange={e => setBroadcastMessage(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Send size={15} />
              <span>Broadcast Notification Now</span>
            </button>
          </form>
        </div>

        {/* Right: Published Stories */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Newspaper size={18} color="var(--primary)" />
              Published Stories ({news.length})
            </div>
          </div>

          <div className="d-flex flex-col gap-sm" style={{ maxHeight: '420px', overflowY: 'auto' }}>
            {news.map(art => (
              <div 
                key={art.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  gap: '12px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <span className="badge" style={{ fontSize: '0.65rem', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', marginBottom: '4px' }}>
                    {art.category}
                  </span>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.3 }}>
                    {art.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                    {art.date} • {art.author}
                  </div>
                </div>

                <button 
                  className="btn btn-danger btn-icon"
                  style={{ width: '32px', height: '32px' }}
                  onClick={() => deleteNews(art.id)}
                  title="Delete article"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Article Modal */}
      {articleModalOpen && (
        <div className="modal-overlay" onClick={() => setArticleModalOpen(false)}>
          <div className="modal-box" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Publish League Editorial Story</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setArticleModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleAddArticle}>
                <div className="form-group">
                  <label className="form-label">Article Headline *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Thunder Hawks Extend Lead with Dominant 3-0 Victory"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="d-flex gap-md">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Match Preview">Match Preview</option>
                      <option value="Match Report">Match Report</option>
                      <option value="Tournament News">Tournament News</option>
                      <option value="Analysis">Analysis & Stats</option>
                      <option value="Transfer News">Transfer & Rosters</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Associated League</label>
                    <select
                      className="form-select"
                      value={formData.leagueId}
                      onChange={e => setFormData({ ...formData, leagueId: e.target.value })}
                    >
                      {leagues.map(l => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Header Image URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Short Summary (Preview text) *</label>
                  <textarea
                    rows={2}
                    required
                    className="form-textarea"
                    placeholder="Brief 1-2 sentence overview for the cards..."
                    value={formData.summary}
                    onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Full Article Story *</label>
                  <textarea
                    rows={5}
                    required
                    className="form-textarea"
                    placeholder="Complete editorial paragraphs..."
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
                  <span>Publish Story to Fan Portal</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
