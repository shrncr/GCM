const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const ActivitiesSchema = new mongoose.Schema({ 
    activity_id:{
        type:ObjectId,
        required:true,
    },
    name:{
        type:String,
        required:true,
        
    },
    photo:{
        type:String,
        required:true, // string will be the URL pointing to the image stored externally
    },
    description:{
        type:String,
        required:true, // string will be the URL pointing to the image stored externally
    },
    skills:{
        type:Array,
        required:true, // string will be the URL pointing to the image stored externally
    },
})

module.exports = Activities = mongoose.model('activities', ActivitiesSchema);