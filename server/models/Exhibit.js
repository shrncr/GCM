const mongoose = require("mongoose");
const ExhibitSchema = new mongoose.Schema({ //schema for the exhibits. more to be added soon
    title: {
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
})

module.exports = Exhibit = mongoose.model("exhibit", ExhibitSchema);