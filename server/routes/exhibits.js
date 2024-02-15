const express = require("express");
//import axios from 'axios'; 
 
// exhibitRoutes is an instance of the express router.
// We use it to define our routes. Look up https requests (think CRUD)
// The router will be added as a middleware and will take control of requests starting with path /exhibits.
const exhibitRoutes = express.Router();
const Exhibit = require("../models/Exhibit")
// This will help us connect to the database
const dbo = require("../db/conn");
const mongoose = require('mongoose');
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//const Exhibit = require("../models/Exhibit");
 
 

 

 
// This section will help you create a new exhibit.
exhibitRoutes.post("/", async (req, res) => {
 try{
  console.log("lig");
  var id = new mongoose.Types.ObjectId();
  console.log("ma");
  await Exhibit.create({
    ID: id,
    title: req.body.name,
    desc: req.body.description,
  }
  );
  console.log("bawls");
 }catch(err){
  console.log(err);

 }
 

//  db_connect.collection("exhibits").insertOne(newExhibit, function (err, res) {
//    if (err) throw err;
//    response.json(res);
//  });

});

exhibitRoutes.get('/', async (req, res) =>  {
  try{
    let data = await Exhibit.find({});
    res.json(data);
  }catch(err){
    res.error;
    console.log("err");
  }
 });
  



 
// This section will help you update an exhibit by id.
/*
exhibitRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("exhibits")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete an exhibit
exhibitRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("exhibits").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 */
module.exports = exhibitRoutes;