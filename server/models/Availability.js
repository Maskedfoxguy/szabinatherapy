// Availability model: captures recurring availability slots for booking logic.
const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
  weekday: { type: Number, min: 0, max: 6, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Availability', AvailabilitySchema);
