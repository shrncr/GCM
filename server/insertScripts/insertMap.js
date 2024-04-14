const mongoose = require('mongoose');
const Map = require('../models/Map');

// mongodb connection string
const mongoURI ="mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority";

// sample data
const MapData = [
    {
        map_id: new mongoose.Types.ObjectId(),
        longitude: -82.50261707677507,
        latitude: 27.901313674533228,
        desc: "The YMCA is a place for kids to be active.",
        title:"YMCA"
    },
    {
        map_id: new mongoose.Types.ObjectId(),
        longitude: -82.48147005267664,
        latitude: 27.88930362717901,
        desc: "Ballast point park.",
        title:"Park"
    }
];

// connect to MongoDB w/ error messages
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// function to insert sample data
const insertSampleData = async () => {
    try {
        await Map.insertMany(MapData);
        console.log('Sample data inserted successfully');
    } catch (error) {
        console.error('Error inserting sample data', error);
    } finally {
        mongoose.connection.close();
    }
};

insertSampleData();
