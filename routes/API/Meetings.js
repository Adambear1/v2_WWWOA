require("dotenv").config();
const router = require("express").Router();
const db = require("../../model");

router.get("/", (req, res) => {
  try {
    db.Meetings.find({}).then((data) => {
      return res.json(data);
    });
  } catch ({ message }) {
    res.status(400).json(message);
    return;
  }
});
router.post("/", ({ body }, res) => {
  try {
    console.log(body);
    db.Meetings.create(body).then((data) => {
      return res.json(data);
    });
  } catch ({ message }) {
    res.status(400).json(message);
    return;
  }
});

module.exports = router;
