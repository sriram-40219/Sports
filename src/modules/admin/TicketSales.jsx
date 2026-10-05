import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Ticket, DollarSign, Search, QrCode, CheckCircle, Download, FileSpreadsheet } from 'lucide-react';

export const TicketSales = () => {
  const { tickets, fixtures, teams } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const totalRevenue = tickets.reduce((acc, t) => acc + (t.totalAmount || 0), 0);
  const totalSeatsSold = tickets.reduce((acc, t) => acc + (t.quantity || 1), 0);
  const avgOrderValue = tickets.length > 0 ? Math.round(totalRevenue / tickets.length) : 0;

  const filteredTickets = tickets.filter(t => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.userName?.toLowerCase().includes(q) ||
      t.userEmail?.toLowerCase().includes(q) ||
      t.matchTitle?.toLowerCase().includes(q) ||
      t.tier?.toLowerCase().includes(q) ||
      t.id?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Ticket size={24} color="var(--accent-amber)" />
            Ticket Sales & Ticketing Operations
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Monitor stadium ticket inventory, attendance admissions, seating tiers, and gross revenue collections.
          </p>
        </div>
      </div>

      {/* KPI Cards (CSS Grid 3-cols) */}
      <div className="grid-cols-3" style={{ marginBottom: '24px' }}>
        <div className="kpi-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <DollarSign size={24} />
          </div>
          <div className="kpi-details">
            <div className="kpi-value">${totalRevenue.toLocaleString()}</div>
            <div className="kpi-label">Gross Ticketing Revenue</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
            <Ticket size={24} />
          </div>
          <div className="kpi-details">
            <div className="kpi-value">{totalSeatsSold}</div>
            <div className="kpi-label">Total Seats Reserved</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <DollarSign size={24} />
          </div>
          <div className="kpi-details">
            <div className="kpi-value">${avgOrderValue}</div>
            <div className="kpi-label">Average Order Value</div>
          </div>
        </div>
      </div>

      {/* Search & Table */}
      <div className="card">
        <div className="card-header">
          <div className="d-flex align-center gap-sm" style={{ flex: 1, maxWidth: '400px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search by customer name, email, match, or booking ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ padding: '8px 12px' }}
            />
          </div>

          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Showing {filteredTickets.length} of {tickets.length} Bookings
          </span>
        </div>

        <div className="table-container">
          <table className="standings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Profile</th>
                <th>Fixture Event</th>
                <th>Seating Tier</th>
                <th>Allocated Seats</th>
                <th>Paid Amount</th>
                <th>Date</th>
                <th>QR Pass Code</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    No matching ticket reservations found.
                  </td>
                </tr>
              ) : (
                filteredTickets.map(t => (
                  <tr key={t.id}>
                    <td>
                      <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.82rem' }}>
                        #{t.id}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{t.userName}</div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{t.userEmail}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.matchTitle}</div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.stadium}</span>
                    </td>
                    <td>
                      <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-main)' }}>
                        {t.tier}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700 }}>
                        {Array.isArray(t.seats) ? t.seats.join(', ') : t.seats}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem' }}>
                        ${t.totalAmount}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.bookingDate}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>
                        {t.qrCode}
                      </span>
                    </td>
                    <td>
                      <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
