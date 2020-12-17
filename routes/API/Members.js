require("dotenv").config();
const router = require("express").Router();
const db = require("../../model");

const Cryptr = require("cryptr");
cryptr = new Cryptr(`${process.env.SECURE}`);

const { validation } = require("../../utils/Validation.js");

// Get All
router.get("/", (req, res) => {
  try {
    db.Members.find({}).then((data) => {
      res.json(data);
      return;
    });
  } catch (error) {
    res.status(400).json(error);
    return;
  }
});

module.exports = router;
