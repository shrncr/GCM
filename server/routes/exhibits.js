const express = require("express");
const router = express.Router(); //to define routes aligning with the exhibits 
const Exhibit = require("../models/Exhibit") //exhibit schema
const Admin = require("../models/Admin"); //admin schema
const Updates = require("../models/Updates")
const dbo = require("../db/conn");
const mongoose = require('mongoose');
const HomeText = require("../models/HomeText");
const PlayStyle = require("../models/PlayStyles")
const Map = require("../models/Map");
const PlayStyles = require("../models/PlayStyles");
const ObjectId = require("mongodb").ObjectId;
const Impressions = require('../models/Impressions');
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
    let data = await PlayStyle.find({});
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });

 router.get('/playstyles/:id', async (req, res)=>{ //must load in all the learning style data
  try{
    let data = await PlayStyle.findById(req.params.id)
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });
 router.get('/playPlaces/:id', async (req, res)=>{ //must load in all the learning style data
  try{
    let data = await Map.findById(req.params.id)
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });
 router.get('/exhibit/:id', async (req, res)=>{ //must load in all the learning style data
  try{
    console.log(req.params.id);
    let data = await Exhibit.findById(req.params.id);
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });
 router.get('/exhibits', async (req, res)=>{ //find all exhibit
  try{
    let data = await Exhibit.find({status:true});
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });
 router.get('/allexhibits', async (req, res)=>{ //find all exhibit
  try{
    let data = await Exhibit.find({});
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });

 router.get('/playplace', async (req, res)=>{ //must load in all the learning style data
  try{
    let data = await Exhibit.find({status:true});
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });
router.get('/exhibitsandplaystyles'), async (req, res)=>{ //must load in all the learning style data
  try{
    let exdata = await Exhibit.find({});
    let playdata = await PlayStyle.find({});
    res.json(exdata, playdata);
  }catch(err){
    console.log(err);
  }
 };


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
      await Map.create({
        id: pinId,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        playtype: req.body.play
      });
    }else{
      let data = await Exhibit.findOneAndUpdate({id: req.body.ID}).then(
        //
      )
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


router.put('/admin/editlearningstyle', async (req,res) => {

      //put new update in database
      // var id = new mongoose.Types.ObjectId(); //make a unique objID
      // const currentDate = new Date();
      // await Updates.create({ //track edit + who made it
      //   ID: id,
      //   admin_id: req.body.adminid,
      //   desc: req.body.description,
      //   date: currentDate
      // });
    let options = {title: req.body.title,
              desc: req.body.desc,
              //image: req.body.image
              }
      console.log(req.body);
      PlayStyle.findOneAndUpdate({exhibit_id: req.body.id}, options).then(
        console.log(req.body.exhibit_id)
      );
      //res.json(data);
      

});
router.put('/admin/editexhibit', async (req,res) => {

  console.log("here")
  //);
  let options = {title: req.body.title,
    desc: req.body.desc,
    image: req.body.image,
    status: req.body.status
    };
Exhibit.findOneAndUpdate({exhibit_id: req.body.id}, options).then(
  console.log(req.body.exhibit_id)
);
//res.json(data);
});

router.post("/admin/addexhibit", async (req, res) => {
  try{
   console.log("lig");
   let id = new mongoose.Types.ObjectId(); //make a unique objID
   console.log("ma");
   await Exhibit.create({ //create new exhibit w/ the model
     'exhibit_id': id,
     'title': req.body.title,
     'desc': req.body.desc,
     'photo':req.body.image,
     'status':req.body.status
   }
   );
   console.log("bawls");
  }catch(err){
   console.log(err); // we will know if error
  }
 });



 
router.post("/admin/addlearningstyle", async (req, res) => {
  try{
   console.log("lig");
   let id = new mongoose.Types.ObjectId(); //make a unique objID
   console.log("ma");
   await PlayStyle.create({ //create new exhibit w/ the model
     'style_id': id,
     'title': req.body.title,
     'desc': req.body.desc,
     'photos':req.body.image
   }
   );
   console.log("bawls");
  }catch(err){
   console.log(err); // we will know if error
  }
 });

 router.get("/admin/admininfo", async (req, res) => {
  try{
    let data = await Admin.find({});
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });


router.post('/create', (req, res) => {
  const impressionData = {
      ...req.body,
      impression_id: new mongoose.Types.ObjectId(),
      time_of_day: new Date(req.body.time_of_day) // ensure time_of_day is a Date object
  };

  // create a new impression instance with the provided data
  const impression = new Impressions(impressionData);

  // save the impression to the database
  impression.save()
      .then(doc => res.status(200).json(doc))
      .catch(err => res.status(500).json({ error: err }));
});

module.exports = router; //export so you can use this file in other files