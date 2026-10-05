import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User, Phone, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authMode, 
    setAuthMode, 
    login, 
    signup 
  } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    phone: ''
  });

  const [errorMsg, setErrorMsg] = useState('');

  if (!authModalOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'login') {
      const res = login(formData.email, formData.password);
      if (!res.success) {
        setErrorMsg(res.message);
      }
    } else {
      const res = signup(formData);
      if (!res.success) {
        setErrorMsg(res.message);
      }
    }
  };

  // Quick Demo Logins for Project Evaluators / Sir
  const handleDemoAdmin = () => {
    login('admin@sports.com', 'admin123');
  };

  const handleDemoFan = () => {
    login('fan@sports.com', 'user123');
  };

  return (
    <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="d-flex align-center gap-sm">
            <div className="brand-logo-icon" style={{ width: '36px', height: '36px', fontSize: '18px' }}>
              {authMode === 'login' ? <Lock size={18} color="#fff" /> : <Sparkles size={18} color="#fff" />}
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {authMode === 'login' 
                  ? 'Sign in to access your modules & bookings' 
                  : 'Join SportsHub to book tickets & follow leagues'}
              </p>
            </div>
          </div>
          <button 
            className="btn btn-secondary btn-icon" 
            onClick={() => setAuthModalOpen(false)}
            style={{ width: '32px', height: '32px' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Quick Demo Evaluation Helpers */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px dashed rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px',
            marginBottom: '18px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              ⚡ 1-Click Demo Logins for SDC Review
            </div>
            <div className="d-flex gap-xs">
              <button 
                type="button" 
                className="btn btn-sm btn-outline" 
                style={{ flex: 1, borderColor: '#6366f1', color: '#a5b4fc', fontSize: '0.75rem' }}
                onClick={handleDemoAdmin}
              >
                <ShieldCheck size={14} />
                <span>Admin Login</span>
              </button>
              <button 
                type="button" 
                className="btn btn-sm btn-outline" 
                style={{ flex: 1, fontSize: '0.75rem' }}
                onClick={handleDemoFan}
              >
                <User size={14} />
                <span>Fan / User Login</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#f87171',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              marginBottom: '16px'
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {authMode === 'signup' && (
              <>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-input"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Select Role * (Redirection Target)</label>
                  <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user">User / Fan (Browse, Standings, Book Tickets)</option>
                    <option value="admin">Administrator (Manage Leagues, Fixtures, Live Scores)</option>
                  </select>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                className="form-input"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                required
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {authMode === 'signup' && (
              <div className="form-group">
                <label className="form-label">Contact Number (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              {authMode === 'login' ? 'Sign In' : 'Create Account & Continue'}
            </button>
          </form>

          {/* Toggle between Login and Signup */}
          <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {authMode === 'login' ? (
              <span>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
                >
                  Sign Up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
                >
                  Log In
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
