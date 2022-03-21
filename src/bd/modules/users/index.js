const mongoose = require("mongoose");

const { Schema } = mongoose;

const usersScheme = new Schema({
  email: String,
  password: String
});

module.exports = Users = mongoose.model("users", usersScheme);