const mongoose = require('mongoose');
const Impressions = require('./path/to/your/ImpressionsModel'); // Update the path to where your model is defined

// Connect to MongoDB - replace the URI with your connection string
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Run the update query to remove the exhibit_id field
Impressions.updateMany({}, { $unset: { exhibit_id: "" } })
    .then(result => {
        console.log('Update successful:', result);
        mongoose.disconnect(); // Disconnect after the operation is complete
    })
    .catch(err => {
        console.error('Error updating documents:', err);
        mongoose.disconnect(); // Disconnect in case of error
    });
