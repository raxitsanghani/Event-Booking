const asyncHandler = require('express-async-handler');
const bookingService = require('../services/bookingService');
const exportToCsv = require('../utils/csvExporter');

// @desc    Book an event
// @route   POST /api/bookings
// @access  Private
const bookEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.body;
    const booking = await bookingService.bookEvent(req.user._id, eventId);
    res.status(201).json({
        success: true,
        data: booking
    });
});

// @desc    Export bookings as CSV
// @route   GET /api/bookings/export
// @access  Private/Admin
const exportBookings = asyncHandler(async (req, res) => {
    const bookings = await bookingService.getBookings();

    // Flatten booking data for CSV
    const data = bookings.map(b => ({
        bookingId: b._id,
        userName: b.user.name,
        userEmail: b.user.email,
        eventName: b.event.name,
        eventDate: b.event.date,
        bookedAt: b.bookedAt
    }));

    const fields = ['bookingId', 'userName', 'userEmail', 'eventName', 'eventDate', 'bookedAt'];
    const csv = exportToCsv(data, fields);

    res.header('Content-Type', 'text/csv');
    res.attachment('bookings.csv');
    res.send(csv);
});

module.exports = {
    bookEvent,
    exportBookings
};
