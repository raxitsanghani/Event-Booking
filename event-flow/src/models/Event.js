const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add an event name'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Please add a date']
    },
    capacity: {
        type: Number,
        required: [true, 'Please add capacity']
    },
    availableSeats: {
        type: Number
    }
}, {
    timestamps: true
});

// Set availableSeats equal to capacity on creation if not provided
eventSchema.pre('save', async function () {
    if (this.isNew && !this.availableSeats) {
        this.availableSeats = this.capacity;
    }
});

module.exports = mongoose.model('Event', eventSchema);
