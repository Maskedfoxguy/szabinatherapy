// Service model: describes therapeutic offers shown on the marketing site.
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  summary: String,
  description: String,
  durationMinutes: Number,
  price: Number,
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Service', ServiceSchema);
