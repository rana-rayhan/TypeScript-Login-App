const mongoose = require("mongoose");
const { db_url } = require("../secret");

// connect database
const connectDB = async () => {
  try {
    await mongoose.connect(db_url);
    console.log("DB is connected");

    // db connected error check
    mongoose.connection.on("error", (error) => {
      console.error("db connection error", error);
    });
  } catch (error) {
    console.error("DB not connected: ", error.message);
  }
};

module.exports = connectDB;
