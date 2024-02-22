const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const UpdatesSchema = new mongoose.Schema({
    exhibit_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Exhibit' // "foreign key" to link to exhibit schema
    },
    admin_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Admin' 
    },
    desc:{
        type:String,
        required:false,
    },
    date:{
        type:Date,
        required:true, // string will be the URL pointing to the image stored externally
    },
})

module.exports = Updates = mongoose.model('updates', UpdatesSchema);