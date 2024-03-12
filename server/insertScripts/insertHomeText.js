const mongoose = require('mongoose');
const HomeText = require('../models/HomeText');

// mongodb connection string
const mongoURI = 'mongodb+srv://swish:xCjo8H8cbamHr5CQ@gcm.odjguc7.mongodb.net/';

// sample data
const HomeTextData = [
    {
        hometext_id: new mongoose.Types.ObjectId(),
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
        photo: "https://i.imgur.com/WsN6LDN.png",
    },
    {
        hometext_id: new mongoose.Types.ObjectId(),
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
        photo: "https://i.imgur.com/5IDXriz.png",
    }
];

// connect to MongoDB w/ error messages
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// function to insert sample data
const insertSampleData = async () => {
    try {
        await HomeText.insertMany(HomeTextData);
        console.log('Sample data inserted successfully');
    } catch (error) {
        console.error('Error inserting sample data', error);
    } finally {
        mongoose.connection.close();
    }
};

insertSampleData();
