const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const exhibitRoutes = require("./routes/exhibits");
app.use("/",exhibitRoutes);

// get driver connection
const connectDB = require("./db/conn");
connectDB();
app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`);
});