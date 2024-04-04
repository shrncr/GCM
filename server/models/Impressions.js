/*
const mongoose = require("mongoose");
type: mongoose.Schema.Types.ObjectId;
const ImpressionsSchema = new mongoose.Schema({
    impression_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    exhibit_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:false,
        ref: 'Exhibit' // "foreign key" to link to exhibit schema
    },
    rating:{
        type:Number,
        required:false,
    },
    comments:{
        type:String,
        required:false,
    },
    photo:{
        type:String,
        required:false, // string will be the URL pointing to the image stored externally
    },
    time_spent:{
        type:Number,
        required:false,
    },
    time_of_day:{
        type:Date,
        required:true,
    },
})

module.exports = Impressions = mongoose.model('impressions', ImpressionsSchema);
*/