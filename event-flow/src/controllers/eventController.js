const asyncHandler = require('express-async-handler');
const eventService = require('../services/eventService');

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
    const event = await eventService.createEvent(req.body);
    res.status(201).json({
        success: true,
        data: event
    });
});

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
    const result = await eventService.getEvents(req.query);
    res.status(200).json({
        success: true,
        ...result
    });
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
    const event = await eventService.updateEvent(req.params.id, req.body);
    if (!event) {
        return res.status(404).json({ success: false, error: 'Event not found' });
    }
    res.status(200).json({
        success: true,
        data: event
    });
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await eventService.deleteEvent(req.params.id);
    if (!event) {
        return res.status(404).json({ success: false, error: 'Event not found' });
    }
    res.status(200).json({
        success: true,
        data: {}
    });
});

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
};
