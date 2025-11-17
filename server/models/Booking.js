// Booking model: handles session requests and confirmation workflow.
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  requestedAt: { type: Date, default: Date.now },
  scheduledStart: { type: Date },
  scheduledEnd: { type: Date },
  notes: String,
});

module.exports = mongoose.model('Booking', BookingSchema);
