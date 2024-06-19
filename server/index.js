/*
Root file for backend. Brings together API endpoints, defines port number, and connects to database
*/
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/conn");
const router = require("./routes/exhibits");

dotenv.config({ path: "./config.env" }); // Load environment variables early

const app = express();

app.use(cors({
  origin: 'https://thelearningproject.vercel.app', // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'User-Agent', 'Accept', 'Referer'], // Headers to allow
  credentials: true, // Allow setting of cookies or sessions
}));

// Ensure that the express.json middleware is used before defining the routes
app.use(express.json()); // Parse JSON bodies

connectDB(); // Connect to the database

// Use exhibits file to access routes
app.use("/", router); // At the main page, "/", refer to the exhibit routes CRUD operations

const port = process.env.PORT || 8082;

app.listen(port, '0.0.0.0', () => { // Start server on defined port
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
