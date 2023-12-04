const mongoose = require("mongoose");

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "rajeshdb",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Connected to DB Successfully...");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
