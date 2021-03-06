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
const { IntroductoryEmail } = require("../../utils/Nodemailer");
const {
  _formattedEmail,
  _formattedPhoneNumber,
} = require("../../utils/Formatting");
// Get All ##SECURED##
router.get("/", (req, res) => {
  try {
    db.Members.find({}).then((data) => {
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
      validation.email(body.email);
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
      validation.phoneNumber(body.phoneNumber);
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
    let formattedEmail = _formattedEmail(body.email);
    let formattedPhoneNumber = _formattedPhoneNumber(body.phoneNumber);
    db.Members.create({
      firstName: body.firstName,
      lastName: body.lastName,
      password: cryptr.encrypt(body.password),
      email: formattedEmail,
      phoneNumber: formattedPhoneNumber,
      admin: body.admin,
    }).then((data) => {
      IntroductoryEmail({
        firstName: body.firstName,
        lastName: body.lastName,
        email: formattedEmail,
        phoneNumber: formattedPhoneNumber,
      });
      return res.json(data);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Login User
router.put("/login", async ({ body }, res) => {
  const { email, password } = await body;
  const formattedEmail = _formattedEmail(email);
  try {
    let data = await db.Members.findOne({ email: formattedEmail });
    if ({ data }) {
      if (cryptr.decrypt(data.password) === password) {
        return res.json(data);
      } else {
        return res.json({ error: "Incorrect Password!" });
      }
    } else {
      return res.json({ error: "Invalid Member Email!" });
    }
  } catch ({ message }) {
    return res.json({ message: message });
  }
});

// Reset Password
router.put("/reset", ({ email }, res) => {
  db.Members.findOne({ email }, (err, data) => {
    if (err || !data) {
      return res
        .status(400)
        .json({ error: "User with this email does not exist!" });
    }
  });
});

// Update User
router.put("/profile/:id", upload.single("file"), ({ params, body }, res) => {
  const { firstName, lastName, password, email, phoneNumber, picture } = body;
  let formattedEmail = _formattedEmail(email);
  let formattedPhoneNumber = _formattedPhoneNumber(phoneNumber);
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
          admin: body.admin && body.admin,
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
          admin: body.admin && body.admin,
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
    return res.status(500).json(message);
  }
});
// Toggle status of user
router.put("/status/:id", ({ params }, res) => {
  const _id = params.id;
  try {
    db.Members.findOne({ _id: _id }).then(({ active }) => {
      db.Members.updateOne({ _id }, { $set: { active: !active } }).then(
        (data) => {
          return res.send(data);
        }
      );
      return res.status(200);
    });
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
