// hometext schema - stores text for home screen 

const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const HomeTextSchema = new mongoose.Schema({ 
    hometext_id:{
        type:ObjectId,
        required:true,
    },
    num:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true,
        
    },
    photo:{
        type:String,
        required:false, // string will be the URL pointing to the image stored externally
    },
})

module.exports = HomeText = mongoose.model('exhibits', HomeTextSchema);