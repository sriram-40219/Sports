import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Ticket, 
  MapPin, 
  Calendar, 
  QrCode, 
  Trash2, 
  Printer, 
  AlertCircle,
  LogIn
} from 'lucide-react';

export const MyTickets = () => {
  const { 
    currentUser, 
    tickets, 
    cancelTicket, 
    setCurrentView,
    setAuthModalOpen,
    setAuthMode 
  } = useApp();

  // Filter tickets for current user
  const userTickets = currentUser 
    ? tickets.filter(t => t.userId === currentUser.id || t.userEmail === currentUser.email)
    : [];

  if (!currentUser) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '520px', margin: '40px auto' }}>
        <Ticket size={48} color="var(--primary)" style={{ margin: '0 auto 16px auto', opacity: 0.8 }} />
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>Login Required</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
          Please sign in to view your booked match tickets and digital entry passes.
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
        >
          <LogIn size={16} />
          <span>Login / Sign Up</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Ticket size={24} color="var(--primary)" />
            My Booked Match Passes ({userTickets.length})
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            All electronic stadium tickets purchased under your profile: <strong>{currentUser.email}</strong>.
          </p>
        </div>

        <button 
          className="btn btn-primary btn-sm"
          onClick={() => setCurrentView('tickets')}
        >
          <span>Book More Tickets</span>
        </button>
      </div>

      {userTickets.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <AlertCircle size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>No Tickets Booked Yet</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '18px' }}>
            You haven't reserved any match tickets yet. Check out upcoming league fixtures to secure your seat.
          </p>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => setCurrentView('tickets')}
          >
            <span>Explore Matches & Book Now</span>
          </button>
        </div>
      ) : (
        <div className="d-flex flex-col gap-lg">
          {userTickets.map(ticket => (
            <div key={ticket.id} className="ticket-pass">
              <div className="ticket-pass-header">
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Match Admission Pass • Booking ID: #{ticket.id}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{ticket.matchTitle}</h3>
                </div>
                <span className="badge" style={{ background: 'rgba(0,0,0,0.3)', color: '#fff' }}>
                  {ticket.status}
                </span>
              </div>

              <div className="ticket-pass-body">
                {/* Details */}
                <div className="d-flex flex-col gap-md">
                  <div className="d-flex gap-xl flex-wrap">
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Stadium & Venue</div>
                      <div className="d-flex align-center gap-xs" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                        <MapPin size={14} color="var(--primary)" />
                        <span>{ticket.stadium}</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Kickoff Time</div>
                      <div className="d-flex align-center gap-xs" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                        <Calendar size={14} color="var(--accent-blue)" />
                        <span>{ticket.matchDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-xl flex-wrap">
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Seating Tier</div>
                      <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{ticket.tier}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reserved Seats</div>
                      <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>
                        {Array.isArray(ticket.seats) ? ticket.seats.join(', ') : ticket.seats}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Paid</div>
                      <div style={{ fontWeight: 800, color: '#34d399', fontSize: '1.05rem' }}>
                        ${ticket.totalAmount}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="d-flex gap-xs" style={{ marginTop: '8px' }}>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => window.print()}
                    >
                      <Printer size={14} />
                      <span>Print Ticket</span>
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to cancel this booking and request a refund?')) {
                          cancelTicket(ticket.id);
                        }
                      }}
                    >
                      <Trash2 size={14} />
                      <span>Cancel Ticket</span>
                    </button>
                  </div>
                </div>

                {/* Scannable Gate QR Code */}
                <div style={{
                  background: '#fff',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  color: '#000',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <QrCode size={110} style={{ margin: '0 auto' }} />
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '8px', letterSpacing: '0.5px' }}>
                    {ticket.qrCode}
                  </div>
                  <div style={{ fontSize: '0.62rem', color: '#64748b', marginTop: '2px' }}>
                    Scan at Turnstile Gate
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
