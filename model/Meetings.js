const mongoose = require("mongoose");
const MeetingsSchema = mongoose.Schema({
  date: {
    type: String,
    required: [true, "Date Required"],
    unique: [true],
  },
  startTime: {
    type: String,
    required: [true, "Start Time Required"],
  },
  endTime: {
    type: String,
    required: [true, "End Time Required"],
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Name Required"],
  },
});

const Meetings = mongoose.model("meetings", MeetingsSchema);

module.exports = Meetings;
