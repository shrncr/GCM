// impressions schema - stores Dr. Blessing data

const mongoose = require("mongoose");
type: mongoose.Schema.Types.ObjectId;
const ImpressionsSchema = new mongoose.Schema({
    impression_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    page:{
        type: String,
        required:true,
    },
    time_of_day:{
        type:Date,
        required:true,
    },
    deviceType: {
        type: String,
        required: true,
    }
})

module.exports = Impressions = mongoose.model('impressions', ImpressionsSchema);