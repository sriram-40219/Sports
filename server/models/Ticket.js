import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    fixtureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fixture',
      required: true
    },
    matchTitle: {
      type: String,
      required: true
    },
    stadium: {
      type: String,
      default: ''
    },
    matchDate: {
      type: String,
      default: ''
    },
    tier: {
      type: String,
      default: 'General Bleachers'
    },
    seats: [String],
    quantity: {
      type: Number,
      default: 1
    },
    pricePerTicket: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    bookingDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0]
    },
    status: {
      type: String,
      enum: ['CONFIRMED', 'CANCELLED'],
      default: 'CONFIRMED'
    },
    qrCode: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Ticket', ticketSchema);
