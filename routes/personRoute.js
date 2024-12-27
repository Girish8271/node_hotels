const express = require("express");
const router = express.Router();
const Person = require("../models/person");


router.post("/", async (req, res) => {
    try {
      const data = req.body
      const newPerson = new Person(data);
      const response = await newPerson.save();
      console.log('data save');
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error'});
    }

})

router.get("/", async (req, res) => {
try {
  const response = await Person.find({});
  res.status(200).json(response);
} catch (error) {
  console.log(error);
  res.status(500).json({ error: 'Internal Server Error'});
}
})

router.get("/:workType", async (req, res) => {
try {
  const workType = req.params.workType;

  if (workType === "manager" || workType === "chef" || workType === "waiter") {
    const response = await Person.find({ work: workType });
    console.log("response fetched");
    return res.status(200).json(response); // Ensure only one response is sent
  } else {
    return res.status(404).json({ error: "Invalid work type" });
  }
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
}
});

router.put("/:id", async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new : true,
            runValidators: true,
        });
        console.log('data updated');
        res.status(200).json(response);
        
     
      if (!Person) {
        return res.status(404).json({ error: "Person not found" });
      }
      res.status(200).json(Person);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/:id", async (req, res) =>{
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!Person) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log('data deleted');
    res.status(200).json({message: "Person deleted sucessful"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

})


module.exports = router;