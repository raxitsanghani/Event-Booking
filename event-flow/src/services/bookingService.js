const Booking = require('../models/Booking');
const Event = require('../models/Event');
const mongoose = require('mongoose');

const bookEvent = async (userId, eventId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const event = await Event.findById(eventId).session(session);

        if (!event) {
            throw new Error('Event not found');
        }

        if (event.availableSeats <= 0) {
            throw new Error('No seats available for this event');
        }

        // Check if user already booked this event
        const existingBooking = await Booking.findOne({ user: userId, event: eventId }).session(session);
        if (existingBooking) {
            throw new Error('You have already booked this event');
        }

        // Reduce available seats
        event.availableSeats -= 1;
        await event.save({ session });

        // Create booking
        const booking = await Booking.create([{
            user: userId,
            event: eventId
        }], { session });

        await session.commitTransaction();
        session.endSession();

        return booking[0];
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

const getBookings = async () => {
    return await Booking.find()
        .populate('user', 'name email')
        .populate('event', 'name date');
};

module.exports = {
    bookEvent,
    getBookings
};
