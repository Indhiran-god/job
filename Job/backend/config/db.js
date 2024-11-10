const mongoose = require("mongoose");

async function connectDB() {
    try {
        // Connect to the main MongoDB URI
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true, // Remove if using Node.js Driver version >= 4.0.0
            useUnifiedTopology: true // Remove if using Node.js Driver version >= 4.0.0
        });
        console.log("Connected to Main Database");

        // Connect to the second MongoDB URI
        const secondDbURI = process.env.SECOND_MONGODB_URI;
        if (!secondDbURI) {
            throw new Error('SECOND_MONGODB_URI is not defined');
        }
        await mongoose.createConnection(secondDbURI, {
            useNewUrlParser: true, // Remove if using Node.js Driver version >= 4.0.0
            useUnifiedTopology: true // Remove if using Node.js Driver version >= 4.0.0
        });
        console.log("Connected to Second Database");

    } catch (err) {
        console.log("Error connecting to databases:", err);
    }    
}

module.exports = connectDB;
