const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const MapSchema = new mongoose.Schema({
    exhibit_id:{
        type:ObjectId,
        required:true,
    },
    longitude:{
        type:Number,
        required:true,
    },
    latitude:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
        required:false, 
    },
    // is the exhibit active or hidden
    status:{
        type:Boolean,
        required:true,
    },
})

module.exports = Map = mongoose.model('map', MapSchema);