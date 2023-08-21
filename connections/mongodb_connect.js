const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to the database...");
    return true;
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
