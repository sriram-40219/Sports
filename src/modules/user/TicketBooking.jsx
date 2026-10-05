import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Ticket, 
  MapPin, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  QrCode, 
  Sparkles,
  Info
} from 'lucide-react';

export const TicketBooking = () => {
  const { 
    fixtures, 
    teams, 
    currentUser, 
    bookTicket, 
    setCurrentView,
    setAuthModalOpen,
    setAuthMode
  } = useApp();

  // Filter bookable fixtures (Upcoming or Live)
  const bookableFixtures = fixtures.filter(f => f.status !== 'COMPLETED');
  const [selectedFixtureId, setSelectedFixtureId] = useState(
    bookableFixtures.length > 0 ? bookableFixtures[0].id : fixtures[0]?.id
  );

  const [selectedTier, setSelectedTier] = useState('VIP Grandstand');
  const [selectedSeats, setSelectedSeats] = useState(['A-4', 'A-5']);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const activeFixture = fixtures.find(f => f.id === selectedFixtureId) || fixtures[0];
  const homeTeam = teams.find(t => t.id === activeFixture?.homeTeamId);
  const awayTeam = teams.find(t => t.id === activeFixture?.awayTeamId);

  // Seat pricing tiers
  const tiers = [
    { name: 'VIP Grandstand', price: 75, perks: 'Prime centerline view, lounge access & refreshments' },
    { name: 'Premium Club', price: 55, perks: 'Elevated sideline seating with dedicated turnstiles' },
    { name: 'General Bleachers', price: 35, perks: 'Atmospheric fan zone seating behind the goal' }
  ];

  const currentTierObj = tiers.find(t => t.name === selectedTier) || tiers[0];
  const seatPrice = currentTierObj.price;
  const totalAmount = selectedSeats.length * seatPrice;

  // Grid seat rows
  const seatRows = ['A', 'B', 'C', 'D'];
  const seatCols = [1, 2, 3, 4, 5, 6, 7, 8];

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length >= 6) {
        alert('Maximum 6 tickets can be booked per transaction.');
        return;
      }
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const handleBooking = () => {
    if (!currentUser) {
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }

    if (selectedSeats.length === 0) {
      alert('Please select at least 1 seat on the stadium map.');
      return;
    }

    const res = bookTicket({
      fixtureId: selectedFixtureId,
      tier: selectedTier,
      seats: selectedSeats,
      pricePerTicket: seatPrice
    });

    if (res) {
      setConfirmedBooking(res);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-between align-center flex-wrap gap-md" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Ticket size={24} color="var(--primary)" />
            Official Stadium Ticket Booking
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Select your preferred match, choose seating tier, pick seats on the stadium plan, and generate your digital QR pass.
          </p>
        </div>

        {currentUser && (
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setCurrentView('my-bookings')}
          >
            <span>My Booked Tickets</span>
          </button>
        )}
      </div>

      {confirmedBooking ? (
        /* Booking Confirmation Pass */
        <div className="card" style={{ maxWidth: '680px', margin: '0 auto', padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto'
            }}>
              <CheckCircle size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Booking Confirmed!</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Your electronic stadium admission pass has been generated and stored in your profile.
            </p>
          </div>

          {/* Electronic Pass Card */}
          <div className="ticket-pass" style={{ marginBottom: '24px' }}>
            <div className="ticket-pass-header">
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Official Match Pass</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{confirmedBooking.matchTitle}</h4>
              </div>
              <div style={{ fontSize: '1.6rem' }}>🎟️</div>
            </div>

            <div className="ticket-pass-body">
              <div className="d-flex flex-col gap-sm">
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Venue & Date</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{confirmedBooking.stadium}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>{confirmedBooking.matchDate}</div>
                </div>

                <div className="d-flex gap-lg">
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Seating Tier</div>
                    <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{confirmedBooking.tier}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Seats</div>
                    <div style={{ fontWeight: 700 }}>{confirmedBooking.seats.join(', ')}</div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Booked By</div>
                  <div style={{ fontSize: '0.85rem' }}>{confirmedBooking.userName} ({confirmedBooking.userEmail})</div>
                </div>
              </div>

              {/* QR Code Simulation */}
              <div style={{ textAlign: 'center', background: '#fff', padding: '16px', borderRadius: 'var(--radius-md)', color: '#000' }}>
                <QrCode size={100} style={{ margin: '0 auto' }} />
                <div style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '6px', letterSpacing: '1px' }}>
                  {confirmedBooking.qrCode}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-between gap-md">
            <button 
              className="btn btn-secondary"
              onClick={() => { setConfirmedBooking(null); setSelectedSeats([]); }}
            >
              <span>Book Another Match</span>
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setCurrentView('my-bookings')}
            >
              <span>View All My Tickets</span>
            </button>
          </div>
        </div>
      ) : (
        /* Booking Layout (CSS Grid 2-cols) */
        <div className="grid-cols-2">
          {/* Left: Stadium Map & Seat Picker */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <MapPin size={18} color="var(--primary)" />
                Interactive Stadium Seating Map
              </div>
              <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                {activeFixture?.venue}
              </span>
            </div>

            {/* Stadium Pitch graphic */}
            <div className="stadium-map-wrapper">
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                NORTH GRANDSTAND (STAGE / GOAL LINE)
              </div>
              <div className="stadium-pitch-graphic">
                ⚽ PLAYING FIELD / PITCH ⚽
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                SELECT YOUR RESERVED SEATS BELOW
              </div>

              {/* Dynamic Seat Grid (CSS Grid) */}
              <div className="seat-grid">
                {seatRows.map(row => 
                  seatCols.map(col => {
                    const seatId = `${row}-${col}`;
                    const isSelected = selectedSeats.includes(seatId);
                    const isTaken = (row === 'D' && (col === 3 || col === 4)); // simulate reserved seats

                    return (
                      <div
                        key={seatId}
                        className={`seat-box ${isSelected ? 'selected' : ''} ${isTaken ? 'taken' : ''}`}
                        onClick={() => !isTaken && toggleSeat(seatId)}
                        title={isTaken ? 'Already Reserved' : `Seat ${seatId}`}
                      >
                        {seatId}
                      </div>
                    );
                  })
                )}
              </div>

              <div className="d-flex justify-center gap-md" style={{ fontSize: '0.75rem', marginTop: '16px' }}>
                <div className="d-flex align-center gap-xs">
                  <span style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '3px' }} />
                  <span>Selected</span>
                </div>
                <div className="d-flex align-center gap-xs">
                  <span style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }} />
                  <span>Available</span>
                </div>
                <div className="d-flex align-center gap-xs">
                  <span style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid #334155', borderRadius: '3px' }} />
                  <span>Reserved</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Match Selector, Tier, & Checkout */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <CreditCard size={18} color="var(--accent-blue)" />
                Match & Ticket Tier Selection
              </div>
            </div>

            {/* Fixture Selector */}
            <div className="form-group">
              <label className="form-label">Select Match Event</label>
              <select
                className="form-select"
                value={selectedFixtureId}
                onChange={e => setSelectedFixtureId(e.target.value)}
              >
                {bookableFixtures.map(f => {
                  const h = teams.find(t => t.id === f.homeTeamId);
                  const a = teams.find(t => t.id === f.awayTeamId);
                  return (
                    <option key={f.id} value={f.id}>
                      {h?.name} vs {a?.name} ({f.date} at {f.time})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Selected Match Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              marginBottom: '18px'
            }}>
              <div className="d-flex justify-between align-center">
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                  {homeTeam?.name} vs {awayTeam?.name}
                </span>
                <span className="badge badge-upcoming">{activeFixture?.status}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                📍 {activeFixture?.venue} • 🗓️ {activeFixture?.date} at {activeFixture?.time}
              </div>
            </div>

            {/* Tier Selector Radio Cards */}
            <div className="form-group">
              <label className="form-label">Choose Seating Tier</label>
              <div className="d-flex flex-col gap-xs">
                {tiers.map(tr => (
                  <div
                    key={tr.name}
                    onClick={() => setSelectedTier(tr.name)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: selectedTier === tr.name ? '1px solid var(--primary)' : '1px solid var(--border)',
                      background: selectedTier === tr.name ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: selectedTier === tr.name ? 'var(--primary)' : 'var(--text-main)' }}>
                        {tr.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {tr.perks}
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                      ${tr.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Summary */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              marginTop: '16px',
              marginBottom: '18px'
            }}>
              <div className="d-flex justify-between" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Selected Seats ({selectedSeats.length}):</span>
                <span style={{ fontWeight: 700 }}>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}</span>
              </div>
              <div className="d-flex justify-between" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Price Per Seat:</span>
                <span>${seatPrice}</span>
              </div>
              <div className="d-flex justify-between" style={{ fontSize: '1.1rem', fontWeight: 800, borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                <span>Total Amount:</span>
                <span style={{ color: 'var(--primary)' }}>${totalAmount}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px' }}
              onClick={handleBooking}
            >
              <Ticket size={18} />
              <span>{currentUser ? `Confirm & Pay $${totalAmount}` : 'Login to Book Tickets'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
