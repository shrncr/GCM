// dr blessing / marketing data - shows the sessions of website visits

const mongoose = require("mongoose");
const SessionsSchema = new mongoose.Schema({
    sessionStart: {
        type: Date,
        required: true,
        default: Date.now
    },
    sessionEnd: {
        type: Date,
    },
    sessionDuration: {
        type: Number, // Duration in milliseconds
        default: 0
    },
    bounce: {
        type: Boolean,
        default: false
    },
    deviceType: {
        type: String,
        required: true
    }
});

module.exports = Sessions = mongoose.model('sessions', SessionsSchema);