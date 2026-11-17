
require("dotenv").config();

const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to DB");
    } catch (error) {
        console.log("Database connection failed:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
