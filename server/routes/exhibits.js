const express = require("express");
const router = express.Router(); //to define routes aligning with the exhibits 
const Exhibit = require("../models/exhibit") //exhibit schema
const Admin = require("../models/Admin"); //admin schema
const Updates = require("../models/Updates")
const dbo = require("../db/conn");
const mongoose = require('mongoose');
const HomeText = require("../models/HomeText");
const Map = require("../models/Map");
const ObjectId = require("mongodb").ObjectId;

// This section will help you create a new exhibit.



//hometxt data get
//playstyles data get
//places to play around tampa get 
//playstyle id

router.get('/', async (req, res) =>  { //load in homepage info ??
  try{
    let data = await HomeText.find({}); //find all
    res.json(data);
  }catch(err){
    res.error;
    console.log("err");

  }
 });

 router.get('/map', async (req, res)=>{ //must load in all the pins
  try{
    let data = await Map.find({}); //find all
    res.json(data)
  }catch(err){
    console.log(err);
  }
 });

 router.get('/playstyles', async (req, res)=>{ //must load in all the learning style data
  try{
    let data = await Exhibit.find({});
  }catch(err){
    console.log(err);
  }
 });


 router.get('/playstyles/:id', async (req, res)=>{ //must load in all the learning style data
  try{
    let data = await Exhibit.findById(id)
  }catch(err){
    console.log(err);
  }
 });

 router.get('/playplace', async (req, res)=>{ //must load in all the learning style data
  try{
    let data = await learning
  }catch(err){
    console.log(err);
  }
 });

//ADMIN OPTIONS
router.post('/admin', async (req,res) =>{ //post request from admin route is to login
  try{
    let data = await Admin.findOne({username:req.username,password:req.password})
    res.json(data);
  }catch(err){
    console.log("err")
  }
});

router.post('/admin/editmap', async (req,res) => {
  try{
    var pinId = new mongoose.Types.ObjectId(); //make a unique objID
    if (req.body.type == "newPin"){
      await Exhibit.create({
        id: pinId,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        playtype: req.body.play
      });
    }else{
      let data = await Exhibit.findOneAndUpdate({});
    }

    //put new update in database
    var id = new mongoose.Types.ObjectId(); //make a unique objID
    const currentDate = new Date();
    await Updates.create({ //create new exhibit w/ the model
      ID: id,
      admin_id: req.body.adminid,
      desc: req.body.description,
      date: currentDate
    }
    );
    res.json(data);
  }catch(err){
    console.log("err")
  }
});

router.post('/admin/editlearningstyle', async (req,res) => {


      //put new update in database
      var id = new mongoose.Types.ObjectId(); //make a unique objID
      const currentDate = new Date();
      await Updates.create({ //create new exhibit w/ the model
        ID: id,
        admin_id: req.body.adminid,
        desc: req.body.description,
        date: currentDate
      }
      );
});

router.post("/admin/addexhibit", async (req, res) => {
  try{
   console.log("lig");
   var id = new mongoose.Types.ObjectId(); //make a unique objID
   console.log("ma");
   await Exhibit.create({ //create new exhibit w/ the model
     ID: id,
     title: req.body.name,
     desc: req.body.description,
     photo:"",
     status:""
   }
   );
   console.log("bawls");
  }catch(err){
   console.log(err); // we will know if error
  }
 });
module.exports = router; //export so you can use this file in other files