const mongoose = require("mongoose");

const { Schema } = mongoose;

const recordsScheme = new Schema({
  name: String,
  doctor: String,
  date: String,
  comment: String,
});

module.exports = Records = mongoose.model("users", recordsScheme);