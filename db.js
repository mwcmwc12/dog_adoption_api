const mongoose = require("mongoose");

let DB_URI;

// config db uri based on environment
if (process.env.NODE_ENV === "test") {
    DB_URI = process.env.MONGODB_URI + "/" + process.env.TEST_DB_NAME;
} else {
    DB_URI = process.env.MONGODB_URI + "/" + process.env.DB_NAME;
}
// helper function to connect to mongodb and run a callback => start express server
async function connectDB(callback) {
    try {
        const result = await mongoose.connect(DB_URI);
        console.log("MongoDb Connected: ", result.connection.host);
        callback();
    } catch (err) {
        console.error(`There was an error connecting to Mongo Atlas, ${err}`);
        process.exit(1);
    }
}

module.exports = connectDB;