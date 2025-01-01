const Students = require("../models/students");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res
        .status(403)
        .json({ success: false, message: "All fields are required." });
    }

    const user = await Students.findOne({ email });
    if (user) {
      return res
        .status(403)
        .json({ success: false, message: "User already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await Students.create({ name, email, phone, password: hashedPassword });

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error.", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(403)
        .json({ success: false, message: "All fields are required." });
    }

    const user = await Students.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "User not registered." });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res
        .status(403)
        .json({ success: false, message: "Incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1y",
    });
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully." });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error.", error });
  }
};

exports.logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("accessToken", "", { maxAge: 0 })
      .json({ success: true, message: "User logged out." });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error.", error });
  }
};

// Function to get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Students.find({})
      .select('name email phone'); // Select only name, email, and phone

    return res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error,
    });
  }
};
