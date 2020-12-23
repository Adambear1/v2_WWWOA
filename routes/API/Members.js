require("dotenv").config();
const router = require("express").Router();
const db = require("../../model");

const Cryptr = require("cryptr");
cryptr = new Cryptr(`${process.env.SECURE}`);

const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
var upload = multer({ storage });

const { validation } = require("../../utils/Validation.js");
const { json } = require("body-parser");

// Get All ##SECURED##
router.get("/", (req, res) => {
  try {
    db.Members.find({ active: true }).then((data) => {
      return res.json(data);
    });
  } catch (error) {
    res.status(400).json(error);
    return;
  }
});

// Get One
router.get("/:id", ({ params }, res) => {
  console.log(params);
  try {
    db.Members.findOne({ _id: params.id }).then(
      ({
        _id,
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        admin,
        picture,
      }) => {
        if (
          firstName ||
          lastName ||
          email ||
          phoneNumber ||
          password ||
          admin ||
          picture
        ) {
          return res.json({
            _id,
            admin,
            picture,
            firstName,
            lastName,
            email,
            password: cryptr.decrypt(password),
            phoneNumber,
          });
        } else {
          return res.status(400).json({ error: "Person doesn't exits" });
        }
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
          if (email === body.email) {
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
          if (phoneNumber === body.phoneNumber) {
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
      email: body.email,
      phoneNumber: body.phoneNumber,
    }).then((data) => {
      return res.json(data);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Login User
router.put("/login", ({ body }, res) => {
  const { email, password } = body;
  try {
    db.Members.findOne({ email: email }).then((data) => {
      if (cryptr.decrypt(data.password) === password) {
        console.log(cryptr.decrypt(data.password));
        console.log(password);
        return res.json(data);
      } else {
        return res.sendStatus(500).json({ error: "Incorrect Password" });
      }
    });
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
});

// Update User
router.put("/profile/:id", upload.single("file"), ({ params, body }, res) => {
  const {
    firstName,
    lastName,
    password,
    email,
    phoneNumber,
    picture,
    admin,
  } = body;
  let formattedEmail = email.toLowerCase().trim();
  let formattedPhoneNumber = phoneNumber.replace(/-/g, "").trim();
  try {
    if (password) {
      db.Members.findOneAndUpdate(
        { _id: params.id },
        {
          firstName,
          lastName,
          password: cryptr.encrypt(password),
          email: formattedEmail,
          phoneNumber: formattedPhoneNumber,
          picture,
          admin,
        }
      )
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } else {
      db.Members.findOneAndUpdate(
        { _id: params.id },
        {
          firstName,
          lastName,
          email: formattedEmail,
          phoneNumber: formattedPhoneNumber,
          admin,
        }
      )
        .then((data) => {
          return res.json(data);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    }
  } catch ({ message }) {
    console.log(message);
    return res.status(500).json(message);
  }
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

// Update email or phone number
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
          if (email == body.email) {
            // send error
            return res.status(400).json({ error: "Email already in use" });
          }
          // else update
          db.Members.findOneAndUpdate(
            { _id: params.id },
            { $set: { email: body.email } }
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
              { $set: { phoneNumber: body.phoneNumber } }
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

module.exports = router;
