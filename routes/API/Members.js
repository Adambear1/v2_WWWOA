require("dotenv").config();
const router = require("express").Router();
const db = require("../../model");

const Cryptr = require("cryptr");
cryptr = new Cryptr(`${process.env.SECURE}`);

const { validation } = require("../../utils/Validation.js");

// Get All ##SECURED##
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

// Get One
router.get("/:id", ({ params }, res) => {
  try {
    db.Members.findOne({ _id: params.id }).then(
      ({ firstName, lastName, email, phoneNumber, password }) => {
        return firstName || lastName || email || phoneNumber || password
          ? res.json({
              firstName,
              lastName,
              password: crpytr.decrypt(password),
              email: cryptr.decrypt(email),
              phoneNumber: cryptr.decrypt(phoneNumber),
            })
          : res.status(400).json({ error: "Person doesn't exits" });
      }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
});
// Add One
router.post("/", ({ body }, res) => {
  try {
    try {
      // If email formation
      validation.email(body.email);
      // If email already exists
      db.Members.find({}, ["email"]).then((data) => {
        data.forEach(({ email }) => {
          if (cryptr.decrypt(email) === body.email) {
            return res.status(400).json({ error: "Email already in use" });
          }
        });
      });
    } catch (err) {
      return res.status(400).json({ error: "Email is not valid" });
    }
    try {
      // If telephone formation
      validation.phoneNumber(body.phoneNumber);
      // If telephone already exists
      db.Members.find({}, ["phoneNumber"]).then((data) => {
        data.forEach(({ phoneNumber }) => {
          if (cryptr.decrypt(phoneNumber) === body.phoneNumber) {
            return res
              .status(400)
              .json({ error: "Phone Number already in use" });
          }
        });
      });
    } catch (err) {
      return res.status(400).json({ error: "Phone Number is not valid" });
    }
    db.Members.create({
      firstName: body.firstName,
      lastName: body.lastName,
      password: cryptr.encrypt(body.password),
      email: cryptr.encrypt(body.email),
      phoneNumber: cryptr.encrypt(body.phoneNumber),
    }).then((data) => {
      return res.json(data);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Update either by email or phone number
router.put("/:id", (req, res) => {
  try {
    const { params, body } = req;
    // if email
    if (body.email) {
      // search database
      db.Members.find({}, ["email"]).then((data) => {
        // for all instances in database
        data.forEach(({ email }) => {
          // if email already exists
          if (cryptr.decrypt(email) === body.email) {
            // send error
            return res.status(400).json({ error: "Email already in use" });
          }
          // else update
          db.Members.findOneAndUpdate(
            { _id: params.id },
            { $set: { email: crpytr.encrypt(body.email) } }
          ).then((data) => {
            return res.json(data);
          });
        });
      });
    }
    // if phone number
    if (body.phoneNumber) {
      // search database
      db.Members.find({}, ["phoneNumber"]).then((data) => {
        // for all instances in database
        data.forEach(({ phoneNumber }) => {
          // if exists
          if (cryptr.decrypt(phoneNumber) === body.phoneNumber) {
            // send error
            return res
              .status(400)
              .json({ error: "Phone Number already in use" });
          }
          // else save
          body.phoneNumber &&
            db.Members.findOneAndUpdate(
              { _id: params.id },
              { $set: { phoneNumber: cryptr.encrypt(body.phoneNumber) } }
            ).then((data) => {
              return res.json(data);
            });
        });
      });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

// Login User
router.put("/login/:id", ({ body, params }, res) => {
  db.Members.findOne({ _id: params.id }).then((data) => {
    return cryptr.decrypt(data.password) === body.password
      ? res.json(data)
      : res.status(500).json({ error: "Incorrect Password" });
  });
});

// Toggle status of user
router.put("/status/:id", ({ params }, res) => {
  const _id = params.id;
  try {
    const data = db.Members.findOne({ _id });
    db.Members.updateOne({ _id }, { $set: { active: !data.active } }).then(
      (data) => {
        return res.send(data);
      }
    );
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
