const { Schema, model } = require("mongoose");

const recordsScheme = new Schema({
  name: String,
  doctor: String,
  date: String,
  comment: String,
  email: String,
  userId: String
});

module.exports = Record = model("records", recordsScheme);