const mongoose = require('mongoose');
const PlayStyles = require('./models/PlayStyle'); 

// mongodb connection string
const mongoURI = 'mmongodb+srv://swish:xCjo8H8cbamHr5CQ@gcm.odjguc7.mongodb.net/';

// sample data
const playStylesData = [
    {
        style_id: new mongoose.Types.ObjectId(),
        title: "Explorative",
        desc: "Focuses on open-ended exploration and discovery",
        photos: "https://i.imgur.com/nxfFAAi.png",
        activities: "safari, walking around"
    },
    {
        style_id: new mongoose.Types.ObjectId(),
        title: "Competitive",
        desc: "Emphasizes competition and achievement",
        photos: "hhttps://i.imgur.com/s4cdqFE.png",
        activities: "basketball, soccer, board games",
    }
];

// connect to MongoDB w/ error messages
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// function to insert sample data
const insertSampleData = async () => {
    try {
        await PlayStyles.insertMany(playStylesData);
        console.log('Sample data inserted successfully');
    } catch (error) {
        console.error('Error inserting sample data', error);
    } finally {
        mongoose.connection.close();
    }
};

insertSampleData();
