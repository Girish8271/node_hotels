// const mongoose = require("mongoose");
// require("dotenv").config();


// // const mongoURL = process.env.MONGODB_LOCAL_URL;
// const mongoURL = process.env.MONGODB_URL;

// mongoose.connect(mongoURL, {
  
// });

// const db = mongoose.connection;

// db.on("error", (err) => {
//   console.error("MongoDB Connections error!", err);
// });

// db.on("connected", () => {
//   console.log("Connected to MongoDB!");
// });

// db.on("disconnected", () => {
//   console.log("Disconnected from MongoDB");
// });


// module.exports = db;


const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    // console.log(mongoUrl);
    const connect = await mongoose.connect(mongoUrl);
    console.log(`Database host: MongoDB Atlas Compass`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
