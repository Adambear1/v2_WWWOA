require("dotenv").config();
const router = require("express").Router();
const db = require("../../model");
const { AnnouncementsEmail } = require("../../utils/Nodemailer");

router.get("/", (req, res) => {
  try {
    db.Announcements.find({ archive: false })
      .sort({ date: -1 })
      .then((data) => {
        return res.json(data);
      });
  } catch (error) {
    res.status(400).json(error);
    return;
  }
});

router.post("/", ({ body }, res) => {
  try {
    db.Announcements.create(body).then((data) => {
      db.Members.find({ archive: false }, [
        "email",
        "firstName",
        "active",
      ]).then((users) => {
        AnnouncementsEmail({
          users,
          name: body.name,
          title: body.title,
          message: body.message,
        });
        return res.json(data);
      });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/", ({ body }, res) => {
  try {
    body.map((item) => {
      db.Announcements.findOneAndUpdate({ _id: item }, { archive: true }).then(
        () => {
          return;
        }
      );
    });
    return res.status(200).json("Success Archived Announcement(s)!");
    //
  } catch ({ message }) {
    return res.status(500).json(message);
  }
});

module.exports = router;
