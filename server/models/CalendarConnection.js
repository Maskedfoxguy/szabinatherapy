// CalendarConnection model: stores OAuth tokens/config for external calendar sync.
const mongoose = require('mongoose');

const CalendarConnectionSchema = new mongoose.Schema({
  provider: { type: String, enum: ['google', 'outlook'], required: true },
  accountEmail: { type: String, required: true },
  accessToken: String,
  refreshToken: String,
  expiresAt: Date,
  metadata: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('CalendarConnection', CalendarConnectionSchema);
