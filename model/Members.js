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
  phoneNumber: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Phone Number Required"],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Members = mongoose.model("members", MembersSchema);

module.exports = Members;
