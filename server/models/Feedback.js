/*
Feedback schema on a particular exhibit
*/
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const FeedbackSchema = new mongoose.Schema({ 
    feedback_id:{
        type:ObjectId,
        required:true,
    },
    exh:{
        type:String,
        required:true, // string will be the URL pointing to the image stored externally
    },
    rating:{
        type:Number,
        required:true, // string will be the URL pointing to the image stored externally
    },
    childAge: {
        type: Number,
        required: true, // Age of the child providing the feedback
    }

})

module.exports = Feedback = mongoose.model('feedback', FeedbackSchema);