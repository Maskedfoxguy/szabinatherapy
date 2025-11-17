// Audit routes: authenticated endpoints to browse audit history.
const router = require('express').Router();
const requireAuth = require('../middleware/auth');
const auditController = require('../controllers/auditController');

router.get('/', requireAuth, auditController.getAuditLogs);

module.exports = router;
