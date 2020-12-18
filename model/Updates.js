const mongoose = require("mongoose");
const UpdatesSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title Required"],
  },
  text: {
    type: String,
    trim: true,
    required: [true, "Text Required"],
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Updates = mongoose.model("updates", UpdatesSchema);

module.exports = Updates;
