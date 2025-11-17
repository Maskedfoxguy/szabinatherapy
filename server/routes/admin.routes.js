// Admin routes: protect management endpoints for pages, services, and settings.
const router = require('express').Router();
const requireAuth = require('../middleware/auth');
const pageController = require('../controllers/pageController');
const serviceController = require('../controllers/serviceController');
const projectController = require('../controllers/projectController');
const mediaController = require('../controllers/mediaController');
const availabilityController = require('../controllers/availabilityController');
const calendarController = require('../controllers/calendarController');
const configController = require('../controllers/configController');

router.use(requireAuth);
router.post('/pages', pageController.savePage);
router.post('/services', serviceController.saveService);
router.get('/projects', projectController.listProjects);
router.get('/media', mediaController.listMedia);
router.get('/availability', availabilityController.listAvailability);
router.post('/calendar/sync', calendarController.syncCalendar);
router.get('/config', configController.getConfig);

module.exports = router;
