// Media model: tracks uploaded files for reuse across pages and services.
const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, enum: ['image', 'video', 'file'], default: 'image' },
  altText: String,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Media', MediaSchema);
