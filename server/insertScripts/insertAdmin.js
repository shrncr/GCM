const mongoose = require('mongoose');
const Admin = require('../models/Admin');

// mongodb connection string
const mongoURI = 'mongodb+srv://swish:xCjo8H8cbamHr5CQ@gcm.odjguc7.mongodb.net/';

// sample data
const AdminData = [
    {
        admin_id: new mongoose.Types.ObjectId(),
        Fname: "John",
        Lname: "Doe",
        username: "jdoe",
        password: "Chicken123"
    }
];

// connect to MongoDB w/ error messages
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// function to insert sample data
const insertSampleData = async () => {
    try {
        await Admin.insertMany(AdminData);
        console.log('Sample data inserted successfully');
    } catch (error) {
        console.error('Error inserting sample data', error);
    } finally {
        mongoose.connection.close();
    }
};

insertSampleData();
