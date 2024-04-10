/* API endpoints associated with the GCM webapp
* Includes get requests to obtain the edit, and post/update requests for admin to edit data
*from admin side
*/

const express = require("express");
const router = express.Router(); //to define routes aligning with the exhibits 
const Exhibit = require("../models/Exhibit") //exhibit schema
const Admin = require("../models/Admin"); //admin schema
const Skills = require("../models/Skills")
const Updates = require("../models/Updates")
const dbo = require("../db/conn");
const mongoose = require('mongoose');
const Impressions = require('../models/Impressions');
const Activities = require("../models/Activities");
const Feedback = require("../models/Feedback");
const HomeText = require("../models/HomeText");
const PlayStyle = require("../models/PlayStyles")
const Map = require("../models/Map");
const PlayStyles = require("../models/PlayStyles");
const ObjectId = require("mongodb").ObjectId;

//returns text associated with homepage
router.get('/', async (req, res) =>  { 
  try{
    let data = await HomeText.find({}); //find all
    res.json(data);
  }catch(err){
    res.error;
    console.log("err");
  }
 });


 //returns map locations
 router.get('/map', async (req, res)=>{ //must load in all the pins
  try{
    let data = await Map.find({}); //find all
    res.json(data)
  }catch(err){
    console.log(err);
  }
 });

 //returns playstyle data
 router.get('/playstyles', async (req, res)=>{
  try{
    let data = await PlayStyle.find({});
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });

 //returns a playstyle's data and data of associated skills
 router.get('/playstyles/:id', async (req, res)=>{ 
  try{
    let playstyle = await PlayStyle.findById(req.params.id);
    let playstyleSkills = await Skills.find({name:playstyle.skills});
    res.json({playstyle: playstyle, skills:playstyleSkills});
  }catch(err){
    console.log(err);
  }
 });

 //returns data for a specific map location
 router.get('/playPlaces/:id', async (req, res)=>{ 
  try{
    let data = await Map.findById(req.params.id)
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });

 //returns data for an exhibit, associated activities, and names of skills
 router.get('/exhibit/:id', async (req, res)=>{ 
  try{
    console.log(req.params.id);
    let exhibit = await Exhibit.findById(req.params.id);
    let exhibitActivities = await Activities.find({name:exhibit.activities});

    res.json({exhibitData: exhibit, exhibitActivities: exhibitActivities});
  }catch(err){
    console.log(err);
  }
 });

 //returns all currently existing feedback
 router.get('/feedback', async (req,res) => {
  try{
  let feedback = await Feedback({});
  res.json(feedback);
  }catch(err){
    console.log(err);
  }
 });

 //will eventually work to post feedback
 router.post('/feedback', async (req,res) => {
  try{
  let feedId = new mongoose.Types.ObjectId();
  let feedback = await Feedback({feedback_id:feedId,exh:req.body.exhibit, rating:req.body.rating}); //a get request until data format is completes
  res.json(feedback);
  }catch(err){
    console.log(err);
  }
 });

 //returns all exhibits whose status is set to true, (visible)
 router.get('/exhibits', async (req, res)=>{ 
  try{
    let data = await Exhibit.find({status:true});
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });

//returns all exhibits regardless of visible or not
 router.get('/allexhibits', async (req, res)=>{ //find all exhibit
  try{
    let data = await Exhibit.find({});
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });


 //idk if we use this...
 router.get('/playplace', async (req, res)=>{ 
  try{
    let data = await Exhibit.find({status:true});
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });

//must load in all the learning style data. also not sure if used
router.get('/exhibitsandplaystyles'), async (req, res)=>{ 
  try{
    let exdata = await Exhibit.find({});
    let playdata = await PlayStyle.find({});
    res.json(exdata, playdata);
  }catch(err){
    console.log(err);
  }
 };


//ADMIN OPTIONS

//used when attempting to login
router.post('/admin', async (req,res) =>{ 
  try{
    console.log(req.body);
    let data = await Admin.findOne({username:req.body.username,password:req.body.password})
    res.json(data);
  }catch(err){
    console.log("err")
  }
});

//when adding or editing map pins. incomplete
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

//edit already existing exhibit
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

//add a new exhibit to exhibits page
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

 //edit an already existing exhibit
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

 //find all admin who have accounts
 router.get("/admin/admininfo", async (req, res) => {
  try{
    let data = await Admin.find({});
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });

//making a new impression
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