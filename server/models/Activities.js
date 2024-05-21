/*
* Activities schema -- lays out the data associated with activities
*/
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const ActivitiesSchema = new mongoose.Schema({ 

    title:{
        type:String,
        required:true,
        
    },
    desc:{
        type:String,
        required:true, // string will be the URL pointing to the image stored externally
    },
    skills:{
        type:Array,
        required:true, // string will be the URL pointing to the image stored externally
    },
    atHome:{
        type:Boolean,
        required: true
    }
})

module.exports = Activities = mongoose.model('activities', ActivitiesSchema);