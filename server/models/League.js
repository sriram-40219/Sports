import mongoose from 'mongoose';

const leagueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    sport: {
      type: String,
      required: true,
      enum: ['Football', 'Cricket', 'Basketball', 'Tennis', 'Rugby'],
      default: 'Football'
    },
    country: {
      type: String,
      default: 'Global'
    },
    season: {
      type: String,
      default: '2026 Season'
    },
    logo: {
      type: String,
      default: '⚽'
    },
    badgeColor: {
      type: String,
      default: '#10b981'
    },
    description: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['Active', 'Completed', 'Upcoming'],
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('League', leagueSchema);
