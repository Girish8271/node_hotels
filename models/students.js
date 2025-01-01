const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true, match: /^[0-9]{10,15}$/ },
  password: { type: String, required: true, minlength: 5 },
});

const Students = mongoose.model("Students", studentsSchema);
module.exports = Students;
