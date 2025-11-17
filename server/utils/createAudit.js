// Audit helper: persists a log entry for important actions so admins can review history.
const AuditLog = require('../models/AuditLog');

async function createAudit({ action, actor, actorId, targetModel, targetId, metadata }) {
  return AuditLog.create({ action, actor, actorId, targetModel, targetId, metadata });
}

module.exports = createAudit;
