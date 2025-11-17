// SiteConfig model: centralizes general settings toggled from the admin UI.
const mongoose = require('mongoose');

const SiteConfigSchema = new mongoose.Schema({
  heroHeadline: String,
  heroSubheadline: String,
  contactEmail: String,
  bookingEnabled: { type: Boolean, default: true },
  theme: { type: String, default: 'light' },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SiteConfig', SiteConfigSchema);
