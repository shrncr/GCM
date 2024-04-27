/* API endpoints associated with the GCM webapp
* Includes get requests to obtain the edit, and post/update requests for admin to edit data
*from admin side
*/
const express = require("express");
const router = express.Router(); //to define routes aligning with the exhibits 
const Sessions = require('../models/Sessions'); 
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
const { Parser } = require('json2csv');


//returns text associated with homepage
router.get('/home', async (req, res) =>  { 
  try{
    let data = await HomeText.findOne({num:"Main"}); //find all
    res.json(data);
  }catch(err){
    res.error;
    console.log("err");
  }
 });

 //returns text associated with homepage
router.post('/home', async (req, res) =>  { 
  console.log("here")
  //);
  let options = {
    desc: req.body.homeText
    };
HomeText.findOneAndUpdate({num: "Main" }, options).then(
  console.log("success")
);
 });

 //returns text associated with homepage
router.get('/resources', async (req, res) =>  { 
  try{
    let data = await HomeText.findOne({num:"Resource"}); //find all
    res.json(data);
  }catch(err){
    res.error;
    console.log("err");
  }
 });
 //returns text associated with homepage
router.post('/resources', async (req, res) =>  { 
  console.log("here")
  //);
  let options = {
    desc: req.body.resourcesText
    };
HomeText.findOneAndUpdate({num: "Resources" }, options).then(
  console.log("success")
);
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

 router.get('/activities', async (req, res)=>{
  try{
    let data = await Activities.find({});
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });

 router.get('/skills', async (req, res)=>{
  try{
    let data = await Skills.find({});
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });

 //returns a playstyle's data and data of associated skills
 router.get('/playstyles/:id', async (req, res)=>{ 
  try{
    let playstyle = await PlayStyle.findById(req.params.id);
    let playstyleSkills = await Skills.find({title:playstyle.skills});
    res.json({baseData: playstyle, dropdown:playstyleSkills});
  }catch(err){
    console.log(err);
  }
 });
 router.delete('/Exhibits/delete', async (req, res)=>{ 
  try{
    let data = await Exhibit.deleteOne({_id:req.body.id})
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });
 router.delete('/Playstyles/delete', async (req, res)=>{ 
  try{
    let data = await PlayStyle.deleteOne({_id:req.body.id})
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });
 router.delete('/Map/delete', async (req, res)=>{ 
  try{
    let data = await Map.deleteOne({_id:req.body.id})
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });
 router.delete('/Activities/delete', async (req, res)=>{ 
  try{
    let data = await Activities.deleteOne({_id:req.body.id})
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });
 router.delete('/Skills/delete', async (req, res)=>{ 
  try{
    let data = await Skills.deleteOne({_id:req.body.id})
    res.json(data);
  }catch(err){
    console.log(err);
  }
 });

 //returns data for a specific map location
 router.get('/playPlaces/:id', async (req, res)=>{ 
  try{
    console.log(req.params.id);
    let exhibit = await Exhibit.findById(req.params.id);
    let exhibitActivities = await Activities.find({title:exhibit.activities});
    console.log(exhibitActivities)
    console.log("paninipanini\n\n");
    res.json({baseData: exhibit, dropdown: exhibitActivities});
  }catch(err){
    console.log(err); 
  }
 });

 //returns data for an exhibit, associated activities, and names of skills
 router.get('/exhibits/:id', async (req, res)=>{ 
  try{
    console.log(req.params.id);
    let exhibit = await Exhibit.findById(req.params.id);
    conosle.log(exhibit.activities)
    let exhibitActivities = await Activities.findOne({title: exhibit.activities[0]});
    conosle.log(exhibitActivities)
    res.json({baseData: exhibit, dropdown: exhibitActivities});
  }catch(err){
    console.log(err);
    console.log('ioesngiesnf')
  }
 });


  //returns data for a specific map location
  router.get('/skills/:id', async (req, res)=>{ 
    try{
      console.log(req.params.id);
      let skill = await Skills.findById(req.params.id);
      let skillActivities = await Activities.find({title:skill.Activities});
      //console.log(exhibitActivities)
      //console.log("paninipanini\n\n");
      res.json({baseData: exhibit, dropdown: skillActivities});
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
    console.log(data);
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
    let data = await Admin.findOne({username:req.body.username,password:req.body.password});
    console.log(data)
    if (data){
      // const sessionUser = sessionizeUser(data);
      // console.log("1");
      // req.session.user = sessionUser
      // console.log("2");
      // res.send(sessionUser);
      res.json(data)
    }
    
  }catch(err){
    console.log("err")
  }
});
router.get("/admin/auth", ({ session: { user }}, res) => {
  res.json({ user });
});

 
//when adding or editing map pins. incomplete
router.post('/admin/editmap', async (req,res) => {
  try{
    let options = {
      title: req.body.title,
      desc: req.body.desc,
      address:req.body.address,
      playstyle:req.body.playstyle,
      longitude:req.body.longitude,
      latitude:req.body.latitude
      }
console.log(req.body);
Map.findOneAndUpdate({_id: req.body.id}, options).then(
console.log(req.body.id)
);

  }catch(err){
    console.log("err")
  }
});

router.delete("", ({ session }, res) => {
  try {
    const user = session.user;
    if (user) {
      session.destroy(err => {
        if (err) throw (err);
        res.clearCookie(SESS_NAME);
        res.send(user);
      });
    } else {
      throw new Error('Something went wrong');
    }
  } catch (err) {
    res.status(422).send(parseError(err));
  }
}); 

router.put('/admin/editlearningstyle', async (req,res) => {

    let options = {
              title: req.body.title,
              desc: req.body.description,
              image: req.body.image,
              skills: req.body.skills
              }
      console.log(req.body);
      PlayStyle.findOneAndUpdate({_id: req.body.id}, options).then(
        console.log(req.body.id)
      );
      //res.json(data);
      

});

//edit already existing exhibit
router.put('/admin/editexhibit', async (req,res) => {
  console.log("here")
  console.log(req.body)

  //);
  let options = {
    title: req.body.title,
    desc: req.body.desc,
    image: req.body.image,
    status: req.body.status,
    activities: req.body.activities
    };
Exhibit.findOneAndUpdate({_id: req.body.id}, options).then(()=>{



  

}


);
//res.json(data);
});


//add new activity
router.post("/admin/addactivity", async (req, res) => {
  try{
   console.log("lig");
   let id = new mongoose.Types.ObjectId(); //make a unique objID
   console.log("ma");
   await Activities.create({ //create new exhibit w/ the model
     'title': req.body.title,
     'description': req.body.desc,
     'skills':req.body.connections,
     'atHome': req.body.atHome
   }
   );
   console.log("bawls");
  }catch(err){
   console.log(err); // we will know if error
  }
 });


 router.post("/admin/editactivity", async (req, res) => {
  try{
    console.log("mewo meow")
   console.log(req.body);
   let options = {
    title: req.body.title,
    description: req.body.desc,
    skills: req.body.skills
    };
  Activities.findOneAndUpdate({_id: req.body.id}, options).then(
    console.log("then")
  )
   
 }catch(err){
  console.log(err);
 }
});

router.post("/admin/editskill", async (req, res) => {
  try{
    console.log("mewo meow")
   console.log(req.body);
   let options = {
    title: req.body.title,
    desc: req.body.desc,
    Activities: req.body.activities
    };
  Skills.findOneAndUpdate({_id: req.body.id}, options).then(
    console.log("then")
  )
   
 }catch(err){
  console.log(err);
 }
});
 router.post("/admin/addskill", async (req, res) => {
  try{
   console.log("lig");
   let id = new mongoose.Types.ObjectId(); //make a unique objID
   console.log("ma");
   await Skills.create({ //create new exhibit w/ the model
     'title': req.body.title,
     'desc': req.body.desc,
     'Activities':req.body.connections,
   }
   );
   console.log("bawls");
  }catch(err){
   console.log(err); // we will know if error
  }
 });

//add a new pin to pin page
router.post("/admin/addmap", async (req, res) => {
  try{
   console.log("lig");
   let id = new mongoose.Types.ObjectId(); //make a unique objID
   console.log("ma");
   await Map.create({ //create new exhibit w/ the model
     'map_id': id,
     'longitude': req.body.long,
     'latitude': req.body.lat,
     'address': req.body.address,
     'title': req.body.title,
     'desc': req.body.desc,
     'playstyle':req.body.playstyle,
     'image': req.body.image

   }
   );
   console.log("bawls");
  }catch(err){
   console.log(err); // we will know if error
  }
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
     'image':req.body.image,
     'status':req.body.status,
     'activities': req.body.activities
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
     'image':req.body.image,
     'skills': req.body.skills
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
      time_of_day: new Date(req.body.time_of_day), // ensure time_of_day is a Date object
  };

  // create a new impression instance with the provided data
  const impression = new Impressions(impressionData);

  // save the impression to the database
  impression.save()
      .then(doc => res.status(200).json(doc))
      .catch(err => res.status(500).json({ error: err }));
});

// route to download Impressions data as CSV
router.get('/download-impressions-csv', async (req, res) => {
  try {
      const data = await Impressions.find();
      const fields = ['impression_id', 'page', 'time_of_day', 'deviceType'];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(data);

      res.header('Content-Type', 'text/csv');
      res.attachment('impressions.csv');
      res.send(csv);
  } catch (error) {
      res.status(500).send('Error occurred: ' + error.message);
  }
});
// create a new session instance in db
router.post('/sessions/end', async (req, res) => {
  try {
    const { deviceType, sessionDuration, bounce, page } = req.body;
    const newSession = new Sessions({
      sessionEnd: new Date(),
      session_id: new mongoose.Types.ObjectId(),
      sessionDuration,
      bounce,
      deviceType,
      page
    });

    await newSession.save();
    res.status(200).json({ message: 'Session ended successfully', data: newSession });
  } catch (error) {
    console.error('Failed to end session:', error);
    res.status(500).send({ error: 'Error ending session', details: error.message });
  }
});

// route to download sessions data as CSV
router.get('/download-sessions-csv', async (req, res) => {
  try {
      const data = await Sessions.find();
      const fields = ['session_id', 'sessionStart', 'sessionEnd', 'sessionDuration', 'bounce', 'deviceType', 'page'];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(data);

      res.header('Content-Type', 'text/csv');
      res.attachment('sessions.csv');
      res.send(csv);
  } catch (error) {
      res.status(500).send('Error occurred: ' + error.message);
  }
});
 
// route to download feedback data as CSV
router.get('/download-feedback-csv', async (req, res) => {
  try {
      const data = await Feedback.find();
      const fields = ['feedback_id', 'exhibit', 'rating', 'childAge'];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(data);

      res.header('Content-Type', 'text/csv');
      res.attachment('feedback.csv');
      res.send(csv);
  } catch (error) {
      res.status(500).send('Error occurred: ' + error.message);
  }
});

module.exports = router; //export so you can use this file in other files