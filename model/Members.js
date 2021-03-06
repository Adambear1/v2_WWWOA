const mongoose = require("mongoose");
const MembersSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First Name Required"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Lame Name Required"],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Email Required"],
  },
  password: {
    type: String,
    unique: true,
    trim: true,
    require: [true, "Password Required"],
  },
  phoneNumber: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Phone Number Required"],
  },
  picture: {
    type: String,
    default: null,
  },
  admin: {
    type: Boolean,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Members = mongoose.model("members", MembersSchema);

module.exports = Members;
