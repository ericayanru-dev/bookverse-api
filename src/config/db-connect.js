const mongoose = require("mongoose");
require("dotenv").config();
let db;
const connectDB = async () => {
  try {
    if (db) {
      console.log("MongoDB already connected");
      return db;
    }
    db = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
