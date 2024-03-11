const mongoose = require('mongoose');
const Exhibit = require('../models/Exhibit');

// mongodb connection string
const mongoURI = 'mongodb+srv://swish:xCjo8H8cbamHr5CQ@gcm.odjguc7.mongodb.net/';

// sample data
const ExhibitData = [
    {
        exhibit_id: new mongoose.Types.ObjectId(),
        title: "Publix",
        desc: "Children can roleplay as a cashier or shopper",
        photo: "https://i.imgur.com/bu1spm9.jpeg",
        status: True
    },
    {
        exhibit_id: new mongoose.Types.ObjectId(),
        title: "Big John",
        desc: "Children learn about dinosuars",
        photo: "https://i.imgur.com/mGaFbYD.jpeg",
        status: True
    }
];

// connect to MongoDB w/ error messages
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// function to insert sample data
const insertSampleData = async () => {
    try {
        await Exhibit.insertMany(ExhibitData);
        console.log('Sample data inserted successfully');
    } catch (error) {
        console.error('Error inserting sample data', error);
    } finally {
        mongoose.connection.close();
    }
};

insertSampleData();
