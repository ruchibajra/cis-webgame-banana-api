const mongoose = require("mongoose");
require("dotenv").config();

const mongo_url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("Mongoose Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
