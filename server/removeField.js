// script to delete records from a schema

const mongoose = require('mongoose');
const Impressions = require('./models/Impressions.js'); 


mongoose.connect('mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// run the delete query to remove all documents from  Impressions 
Impressions.deleteMany({})
    .then(result => {
        console.log('Delete successful:', result);
        mongoose.disconnect(); // Disconnect after the operation is complete
    })
    .catch(err => {
        console.error('Error deleting documents:', err);
        mongoose.disconnect(); // Disconnect in case of error
    });
