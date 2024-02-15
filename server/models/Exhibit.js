const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const ExhibitSchema = new mongoose.Schema({ //schema for the exhibits. more to be added soon
    ID:{
        type:ObjectId,
        required:true
    },
    title: {
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
})

module.exports = Exhibit = mongoose.model('exhibits', ExhibitSchema);