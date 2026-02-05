const express = require('express');
const router = express.Router();
const { bookEvent, exportBookings } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit');

const bookingLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    message: 'Too many bookings from this IP, please try again after an hour'
});

router.post('/', protect, bookingLimiter, bookEvent);
router.get('/export', protect, authorize('admin'), exportBookings);

module.exports = router;
