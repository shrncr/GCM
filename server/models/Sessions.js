// dr blessing / marketing data - shows the sessions of website visits

const mongoose = require("mongoose");
type: mongoose.Schema.Types.ObjectId;
const SessionsSchema = new mongoose.Schema({
    session_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
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
    },
    page: {
        type: String,
        required: true
    }
});

module.exports = Sessions = mongoose.model('sessions', SessionsSchema);