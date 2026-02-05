const express = require('express');
const router = express.Router();
const {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(getEvents)
    .post(protect, authorize('admin'), createEvent);

router.route('/:id')
    .put(protect, authorize('admin'), updateEvent)
    .delete(protect, authorize('admin'), deleteEvent);

module.exports = router;
