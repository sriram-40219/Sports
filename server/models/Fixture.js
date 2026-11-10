import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  time: { type: String, default: 'Live' },
  type: { type: String, default: 'goal' },
  text: { type: String, required: true }
});

const fixtureSchema = new mongoose.Schema(
  {
    leagueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'League',
      required: true
    },
    sport: {
      type: String,
      default: 'Football'
    },
    homeTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    },
    awayTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    },
    homeScore: {
      type: mongoose.Schema.Types.Mixed,
      default: 0
    },
    awayScore: {
      type: mongoose.Schema.Types.Mixed,
      default: 0
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    venue: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['UPCOMING', 'LIVE', 'COMPLETED'],
      default: 'UPCOMING'
    },
    minute: {
      type: String,
      default: "0'"
    },
    ticketPrice: {
      type: Number,
      default: 50
    },
    availableSeats: {
      type: Number,
      default: 2000
    },
    events: [eventSchema]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Fixture', fixtureSchema);
