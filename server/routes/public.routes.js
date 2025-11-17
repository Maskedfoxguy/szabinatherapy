// Public routes: expose read-only data and allow visitors to submit forms.
const router = require('express').Router();
const pageController = require('../controllers/pageController');
const serviceController = require('../controllers/serviceController');
const contactController = require('../controllers/contactController');

router.get('/pages', pageController.getPublishedPages);
router.get('/services', serviceController.listServices);
router.post('/contact', contactController.submitMessage);

module.exports = router;
