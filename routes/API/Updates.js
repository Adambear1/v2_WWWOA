require("dotenv").config();
const router = require("express").Router();
const db = require("../../model");

router.get("/", (req, res) => {
  try {
    db.Updates.find({}).then((data) => {
      return res.json(data);
    });
  } catch (error) {
    res.status(400).json(error);
    return;
  }
});

router.post("/", (req, res) => {
  try {
    db.Updates.create(req).then((data) => {
      return res.json(data);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
