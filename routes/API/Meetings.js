require("dotenv").config();
const router = require("express").Router();
const db = require("../../model");
const { MeetingsEmail } = require("../../utils/Nodemailer");

router.get("/", (req, res) => {
  try {
    db.Meetings.find({})
      .sort({ date: -1 })
      .then((data) => {
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
      db.Members.find({ archive: false }, [
        "email",
        "firstName",
        "active",
      ]).then((users) => {
        MeetingsEmail({
          users,
          name: body.name,
          location: body.location,
          time: body.time,
          date: body.date,
        });
        return res.json(data);
      });
      return res.json(data);
    });
  } catch ({ message }) {
    res.status(400).json(message);
    return;
  }
});

module.exports = router;
