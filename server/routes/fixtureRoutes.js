import express from 'express';
import Fixture from '../models/Fixture.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all fixtures (filters: ?leagueId=... & ?status=...)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.leagueId) filter.leagueId = req.query.leagueId;
    if (req.query.status) filter.status = req.query.status;

    const fixtures = await Fixture.find(filter)
      .populate('homeTeamId', 'name shortName logo themeColor city stadium coach roster')
      .populate('awayTeamId', 'name shortName logo themeColor city stadium coach roster')
      .populate('leagueId', 'name sport logo')
      .sort({ date: 1, time: 1 });

    res.json({ success: true, count: fixtures.length, fixtures });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single fixture
router.get('/:id', async (req, res) => {
  try {
    const fixture = await Fixture.findById(req.params.id)
      .populate('homeTeamId')
      .populate('awayTeamId')
      .populate('leagueId');

    if (!fixture) return res.status(404).json({ success: false, message: 'Fixture not found' });
    res.json({ success: true, fixture });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST schedule fixture (Admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const fixture = await Fixture.create(req.body);
    res.status(201).json({ success: true, fixture });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT update fixture (Admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const fixture = await Fixture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fixture) return res.status(404).json({ success: false, message: 'Fixture not found' });
    res.json({ success: true, fixture });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PATCH live score & minute updates (Admin only)
router.patch('/:id/live', protect, adminOnly, async (req, res) => {
  try {
    const { homeScore, awayScore, minute, status } = req.body;
    const updates = {};
    if (homeScore !== undefined) updates.homeScore = homeScore;
    if (awayScore !== undefined) updates.awayScore = awayScore;
    if (minute !== undefined) updates.minute = minute;
    if (status !== undefined) updates.status = status;

    const fixture = await Fixture.findByIdAndUpdate(req.params.id, updates, { new: true })
      .populate('homeTeamId', 'name shortName logo')
      .populate('awayTeamId', 'name shortName logo');

    if (!fixture) return res.status(404).json({ success: false, message: 'Fixture not found' });
    res.json({ success: true, fixture });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// POST add live match event incident (Admin only)
router.post('/:id/events', protect, adminOnly, async (req, res) => {
  try {
    const fixture = await Fixture.findById(req.params.id);
    if (!fixture) return res.status(404).json({ success: false, message: 'Fixture not found' });

    fixture.events.push(req.body);
    await fixture.save();

    res.status(201).json({ success: true, fixture });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE fixture (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const fixture = await Fixture.findByIdAndDelete(req.params.id);
    if (!fixture) return res.status(404).json({ success: false, message: 'Fixture not found' });
    res.json({ success: true, message: 'Fixture removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
