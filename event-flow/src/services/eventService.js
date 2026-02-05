const Event = require('../models/Event');

const createEvent = async (eventData) => {
    const event = await Event.create(eventData);
    return event;
};

const getEvents = async (query) => {
    let { start, end, page, limit } = query;

    const filter = {};
    if (start || end) {
        filter.date = {};
        if (start) filter.date.$gte = new Date(start);
        if (end) filter.date.$lte = new Date(end);
    }

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    const events = await Event.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ date: 1 });

    const total = await Event.countDocuments(filter);

    return {
        events,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    };
};

const updateEvent = async (id, eventData) => {
    const event = await Event.findByIdAndUpdate(id, eventData, {
        new: true,
        runValidators: true
    });
    return event;
};

const deleteEvent = async (id) => {
    const event = await Event.findByIdAndDelete(id);
    return event;
};

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
};
