import React from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Shield, CheckCircle, Code, Layers } from 'lucide-react';

export const Footer = () => {
  const { navigateModule, currentModule } = useApp();

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Col 1: System Summary */}
        <div className="footer-col">
          <div className="d-flex align-center gap-xs" style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '24px' }}>🏆</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Sports<span style={{ color: 'var(--primary)' }}>Hub</span></h3>
          </div>
          <p>
            An end-to-end Sports League Management System designed to simplify tournament operations,
            fixture generation, player tracking, live score feeds, digital ticketing, and fan interaction.
          </p>
          <div className="d-flex gap-xs" style={{ marginTop: '16px' }}>
            <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              ✓ Admin Module
            </span>
            <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd' }}>
              ✓ User Module
            </span>
            <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              ✓ LocalStorage Auth
            </span>
          </div>
        </div>

        {/* Col 2: User Module Links */}
        <div className="footer-col">
          <h4>Fan & User Portal</h4>
          <ul className="footer-links">
            <li><button onClick={() => navigateModule('user', 'dashboard')}>Home Dashboard</button></li>
            <li><button onClick={() => navigateModule('user', 'live')}>Live Score Center</button></li>
            <li><button onClick={() => navigateModule('user', 'fixtures')}>Fixtures & Schedule</button></li>
            <li><button onClick={() => navigateModule('user', 'standings')}>Points Table & Standings</button></li>
            <li><button onClick={() => navigateModule('user', 'teams')}>Teams & Squad Rosters</button></li>
            <li><button onClick={() => navigateModule('user', 'tickets')}>Book Stadium Tickets</button></li>
          </ul>
        </div>

        {/* Col 3: Admin Module Links */}
        <div className="footer-col">
          <h4>Admin Portal</h4>
          <ul className="footer-links">
            <li><button onClick={() => navigateModule('admin', 'dashboard')}>Admin Overview</button></li>
            <li><button onClick={() => navigateModule('admin', 'leagues')}>Manage Leagues</button></li>
            <li><button onClick={() => navigateModule('admin', 'teams')}>Manage Teams & Players</button></li>
            <li><button onClick={() => navigateModule('admin', 'fixtures')}>Schedule Fixtures</button></li>
            <li><button onClick={() => navigateModule('admin', 'live-control')}>Live Match Controller</button></li>
            <li><button onClick={() => navigateModule('admin', 'tickets')}>Ticket Sales & Revenue</button></li>
          </ul>
        </div>

        {/* Col 4: Project Compliance */}
        <div className="footer-col">
          <h4>SDC Project Compliance</h4>
          <p style={{ fontSize: '0.8rem', marginBottom: '8px' }}>
            Built strictly adhering to SDC project guidelines:
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <li className="d-flex align-center gap-xs">
              <CheckCircle size={14} color="var(--primary)" />
              <span>CSS Grid & Flexbox Template Architecture</span>
            </li>
            <li className="d-flex align-center gap-xs">
              <CheckCircle size={14} color="var(--primary)" />
              <span>LocalStorage Authentication (Signup/Login)</span>
            </li>
            <li className="d-flex align-center gap-xs">
              <CheckCircle size={14} color="var(--primary)" />
              <span>Role-Based Module Redirection & Navigation</span>
            </li>
            <li className="d-flex align-center gap-xs">
              <CheckCircle size={14} color="var(--primary)" />
              <span>Full CRUD on Leagues, Teams, Fixtures, Tickets</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© 2026 SportsHub League Management System • SDC Academic Project Submission</div>
        <div className="d-flex gap-md">
          <span>HTML5 • CSS3 (Grid/Flexbox) • React JS • LocalStorage</span>
        </div>
      </div>
    </footer>
  );
};
