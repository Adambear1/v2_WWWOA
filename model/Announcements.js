const mongoose = require("mongoose");
const AnnouncementsSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title Required"],
  },
  message: {
    type: String,
    trim: true,
    required: [true, "Message Required"],
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Name Required"],
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Announcements = mongoose.model("announcements", AnnouncementsSchema);

module.exports = Announcements;
