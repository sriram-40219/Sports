import express from 'express';
import League from '../models/League.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all leagues
router.get('/', async (req, res) => {
  try {
    const leagues = await League.find().sort({ createdAt: -1 });
    res.json({ success: true, count: leagues.length, leagues });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single league
router.get('/:id', async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) return res.status(404).json({ success: false, message: 'League not found' });
    res.json({ success: true, league });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create league (Admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const league = await League.create(req.body);
    res.status(201).json({ success: true, league });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT update league (Admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const league = await League.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!league) return res.status(404).json({ success: false, message: 'League not found' });
    res.json({ success: true, league });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE league (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const league = await League.findByIdAndDelete(req.params.id);
    if (!league) return res.status(404).json({ success: false, message: 'League not found' });
    res.json({ success: true, message: 'League deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
