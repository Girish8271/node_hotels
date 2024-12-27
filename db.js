const mongoose = require("mongoose");
require("dotenv").config();

//const mongoURL = `process.env.MONGODB_LOCAL_URL;`;
const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB Connections error!", err);
});

db.on("connected", () => {
  console.log("Connected to MongoDB!");
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});


module.exports = db;