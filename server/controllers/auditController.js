// Audit controller: exposes stored audit logs for the admin dashboard.
const AuditLog = require('../models/AuditLog');

exports.getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(100);
    res.json(logs);
  } catch (error) {
    next(error);
  }
};
