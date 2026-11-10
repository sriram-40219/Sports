import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import leagueRoutes from './routes/leagueRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import fixtureRoutes from './routes/fixtureRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/leagues', leagueRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/fixtures', fixtureRoutes);
app.use('/api/tickets', ticketRoutes);

// Health check endpoint
app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    system: 'Sports League Management System API',
    version: '2.0.0 (MERN Stack with JWT & MongoDB)',
    database: mongoose.connection.readyState === 1 ? 'Connected (MongoDB Atlas)' : 'Connecting'
  });
});

// Cached MongoDB Connection for Serverless & Long-running
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sports_league';

let isConnected = false;
export const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB Atlas successfully!');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
  }
};

// Auto-connect and start server when run directly
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Sports League Backend running on http://localhost:${PORT}`);
    });
  });
}

export default app;
