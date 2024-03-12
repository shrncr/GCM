const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000; //port 5000 or whats defined in ENV (used after deployment)

app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); //we use json

const router = require("./routes/exhibits"); //use exhibits file to access routes
app.use("/",router); //at the main page, "/", we will refer to the exhibit routes CRUD operations. Just for testing purposes
require('core-js');

const connectDB = require("./db/conn");

connectDB(); //connect to db


app.listen(port, () => { //start server on defined port
  console.log(`Server is running on port: ${port}`);
});