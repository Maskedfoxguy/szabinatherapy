// AuditLog model: captures noteworthy actions for later review.
const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  actor: { type: String },
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  targetModel: { type: String },
  targetId: { type: mongoose.Schema.Types.ObjectId },
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
