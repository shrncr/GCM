/*
Root file for backend. Brings together api endpoints, defined port number, and connects to database
*/



const express = require("express");
const cors = require("cors");
//const session = require("express-session");
//const MongoStore = require('connect-mongo');
const path = require('path');
const port = 8082;
const app = express();

app.use(cors({ 
  origin : ['https://gcm-frontend.vercel.app'], 
} ));
app.use(express.json({extended:false}));

app.options('/*', (_, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://gcm-frontend.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});




//require("dotenv").config({ path: "./config.env" });




//app.use(express.json()); //we use json
const mongoose = require('mongoose');
const connectDB = require("./db/conn");
connectDB(); //connect to db
// app.use(session({
  // name: process.env.SESS_NAME,
  // secret: process.env.SESS_SECRET,
//   saveUninitialized: false,
//   resave: false,
//   store: new MongoStore({
//     mongoUrl: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
//     collection: 'session',
//     ttl: parseInt(process.env.SESS_LIFETIME) / 1000
//   }),
//   cookie: {
//     sameSite: true,
//     secure: true,//NODE_ENV === 'production',
//     maxAge: parseInt(process.env.SESS_LIFETIME)
//   }
// }));



const router = require("./routes/exhibits"); //use exhibits file to access routes
//app.use(express.static(path.join(__dirname, "..", "client", "App.js")))

app.use("/", router); //at the main page, "/", we will refer to the exhibit routes CRUD operations. Just for testing purposes
require('core-js');


app.listen(port, '0.0.0.0', () => { //start server on defined port
  console.log(`Server is running on port: ${port}`);
});
module.exports = app;