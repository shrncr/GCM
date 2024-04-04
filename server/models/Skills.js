const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const SkillSchema = new mongoose.Schema({ //schema for the exhibits. more to be added soon
    skill_id:{
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
    Activities:{
        type:Array,
        required:false,
    }
})

module.exports = Skill = mongoose.model('skill', SkillSchema);