const Menu = require("../models/Menu");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new Menu(data);
    const response = await newMenu.save();
    console.log("data save");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await Menu.find({});
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/:tasteType", async (req, res) => {
    try {
      const tasteType = req.params.tasteType;
    
      if (tasteType === "sour" || tasteType === "spicy" || tasteType === "sweet") {
        const response = await Menu.find({ taste: tasteType });
        console.log("response fetched");
        return res.status(200).json(response); // Ensure only one response is sent
      } else {
        return res.status(404).json({ error: "Invalid taste type" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
    });

    //comments added for testing purpose
module.exports = router;
