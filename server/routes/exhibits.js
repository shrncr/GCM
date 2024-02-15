const express = require("express");
const exhibitRoutes = express.Router(); //to define routes aligning with the exhibits 
const Exhibit = require("../models/Exhibit") //exhibit schema
const dbo = require("../db/conn");
const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectId;

// This section will help you create a new exhibit.
exhibitRoutes.post("/", async (req, res) => {
 try{
  console.log("lig");
  var id = new mongoose.Types.ObjectId(); //make a unique objID
  console.log("ma");
  await Exhibit.create({ //create new exhibit w/ the model
    ID: id,
    title: req.body.name,
    desc: req.body.description,
  }
  );
  console.log("bawls");
 }catch(err){
  console.log(err); // we will know if error
 }
});

exhibitRoutes.get('/', async (req, res) =>  { //get request literally just to see the exhibits in backend
  try{
    let data = await Exhibit.find({}); //find all
    res.json(data);
  }catch(err){
    res.error;
    console.log("err");
  }
 });
  
module.exports = exhibitRoutes; //export so you can use this file in other files