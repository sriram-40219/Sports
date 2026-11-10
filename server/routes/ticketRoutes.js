import express from 'express';
import Ticket from '../models/Ticket.js';
import Fixture from '../models/Fixture.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all tickets (Admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('userId', 'name email')
      .populate('fixtureId', 'homeTeamId awayTeamId date time venue')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: tickets.length, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET current user's booked tickets (User protected)
router.get('/my', protect, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: tickets.length, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST book match ticket (User protected)
router.post('/book', protect, async (req, res) => {
  try {
    const { fixtureId, tier, seats, pricePerTicket } = req.body;

    if (!fixtureId || !seats || seats.length === 0 || !pricePerTicket) {
      return res.status(400).json({ success: false, message: 'Please provide fixture, seats, and tier pricing.' });
    }

    const fixture = await Fixture.findById(fixtureId)
      .populate('homeTeamId', 'name')
      .populate('awayTeamId', 'name');

    if (!fixture) {
      return res.status(404).json({ success: false, message: 'Fixture event not found' });
    }

    if (fixture.availableSeats < seats.length) {
      return res.status(400).json({ success: false, message: 'Not enough seats available.' });
    }

    const totalAmount = seats.length * pricePerTicket;
    const matchTitle = `${fixture.homeTeamId?.name || 'Home'} vs ${fixture.awayTeamId?.name || 'Away'}`;
    const qrCode = `SLMS-PASS-${Date.now().toString().slice(-6)}-${tier.slice(0, 3).toUpperCase()}`;

    const ticket = await Ticket.create({
      userId: req.user._id,
      userName: req.user.name,
      userEmail: req.user.email,
      fixtureId: fixture._id,
      matchTitle,
      stadium: fixture.venue,
      matchDate: `${fixture.date} ${fixture.time}`,
      tier: tier || 'VIP Grandstand',
      seats,
      quantity: seats.length,
      pricePerTicket,
      totalAmount,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'CONFIRMED',
      qrCode
    });

    // Deduct available seats
    fixture.availableSeats = Math.max(0, fixture.availableSeats - seats.length);
    await fixture.save();

    res.status(201).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE cancel ticket (Protected: user who owns ticket or Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket pass not found' });

    // Allow only owner or admin
    if (ticket.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this ticket' });
    }

    // Restore available seats on fixture
    await Fixture.findByIdAndUpdate(ticket.fixtureId, {
      $inc: { availableSeats: ticket.quantity }
    });

    await Ticket.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Ticket cancelled and refund processed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
