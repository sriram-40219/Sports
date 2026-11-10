import express from 'express';
import Team from '../models/Team.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all teams (can filter by ?leagueId=...)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.leagueId ? { leagueId: req.query.leagueId } : {};
    const teams = await Team.find(filter).populate('leagueId', 'name sport logo');
    res.json({ success: true, count: teams.length, teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single team
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('leagueId', 'name sport logo');
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    res.json({ success: true, team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create team (Admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ success: true, team });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT update team (Admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    res.json({ success: true, team });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE team (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    res.json({ success: true, message: 'Team removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST add player to roster (Admin only)
router.post('/:id/roster', protect, adminOnly, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

    team.roster.push(req.body);
    await team.save();

    res.status(201).json({ success: true, team });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE player from roster (Admin only)
router.delete('/:id/roster/:playerId', protect, adminOnly, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

    team.roster = team.roster.filter(p => p._id.toString() !== req.params.playerId);
    await team.save();

    res.json({ success: true, team });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
