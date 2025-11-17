// Admin model: stores admin credentials and metadata for dashboard access.
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String },
  role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
});

module.exports = mongoose.model('Admin', AdminSchema);
