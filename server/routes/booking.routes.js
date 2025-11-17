// Booking routes: handle public creation plus admin-only management actions.
const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const requireAuth = require('../middleware/auth');

router.post('/', bookingController.createBooking);
router.get('/', requireAuth, bookingController.listBookings);
router.patch('/:id/confirm', requireAuth, bookingController.confirmBooking);

module.exports = router;
