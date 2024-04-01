const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const ImpressionsSchema = new mongoose.Schema({
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