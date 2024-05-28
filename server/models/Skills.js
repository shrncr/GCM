/*
Skills schema - stores data associated with a given skill
*/
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const SkillSchema = new mongoose.Schema({ //schema for the exhibits. more to be added soon

    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    activities:{
        type:Array,
        required:false,
    }
})

module.exports = Skill = mongoose.model('skill', SkillSchema);