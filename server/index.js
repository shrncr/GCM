/*
Root file for backend. Brings together api endpoints, defined port number, and connects to database
*/

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
///const port = process.env.PORT || 8082; //port 5000 or whats defined in ENV (used after deployment)
const port = 8082
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); //we use json

const connectDB = require("./db/conn");
connectDB(); //connect to db


const router = require("./routes/exhibits"); //use exhibits file to access routes
app.use("/", router); //at the main page, "/", we will refer to the exhibit routes CRUD operations. Just for testing purposes
require('core-js');


app.listen(port, '0.0.0.0', () => { //start server on defined port
  console.log(`Server is running on port: ${port}`);
});
module.exports = app;