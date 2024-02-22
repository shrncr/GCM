const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const PlayStyleSchema = new mongoose.Schema({ //schema for the exhibits. more to be added soon
    style_id:{
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
    photos:{
        type:String,
        required:false, // string will be the URL pointing to the image stored externally
    },
    activities:{
        type:String,
        required:false,
    },
    // exhibits that feature this play style
    exhibits:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref: 'Exhibit'
    },
})

module.exports = PlayStyles = mongoose.model('playstyles', PlayStyleSchema);