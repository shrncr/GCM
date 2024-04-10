// exhibit schema - stores exhibit info

const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const ExhibitSchema = new mongoose.Schema({ 
    exhibit_id:{
        type:ObjectId,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    
    photo:{
        type:String,
        required:true, // string will be the URL pointing to the image stored externally
    },
    // is the exhibit active or hidden
    status:{
        type:Boolean,
        required:true,
    },
    activities:{
        type:Array,
        required:false, // string will be the URL pointing to the image stored externally
    },
})

module.exports = Exhibit = mongoose.model('exhibit', ExhibitSchema);