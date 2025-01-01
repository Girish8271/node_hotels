const express = require("express");
const { register, login, logout, getAllStudents } = require("../controllers/studentsController");

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/all", getAllStudents);


module.exports = router;
