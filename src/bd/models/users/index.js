const mongoose = require("mongoose");

const { Schema } = mongoose;

const usersScheme = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true}
});

module.exports = User = mongoose.model("users", usersScheme);