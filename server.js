const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./db");
const cors = require("cors");
const personRoute = require("./routes/personRoute");
const menuRoute = require("./routes/menuRoute");
const studentRoute = require("./routes/studentsRoutes");

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;
const FrontendUrl = process.env.FRONTEND_URL;

// Middleware
app.use(cors({
  origin: [`${FrontendUrl}`, 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());

// Database connection
connectDB();

// Routes
app.use("/person", personRoute);
app.use("/menu", menuRoute);
app.use("/students", studentRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
