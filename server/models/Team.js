import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  position: { type: String, default: 'Forward' },
  goals: { type: Number, default: 0 },
  runs: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  matches: { type: Number, default: 0 },
  rating: { type: Number, default: 8.0 }
});

const teamSchema = new mongoose.Schema(
  {
    leagueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'League',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    shortName: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },
    sport: {
      type: String,
      default: 'Football'
    },
    city: {
      type: String,
      default: ''
    },
    stadium: {
      type: String,
      default: ''
    },
    capacity: {
      type: Number,
      default: 45000
    },
    coach: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: '⚽'
    },
    themeColor: {
      type: String,
      default: '#2563eb'
    },
    roster: [playerSchema]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Team', teamSchema);
