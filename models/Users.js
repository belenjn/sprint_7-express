const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const usersSchema = new Schema({
  user_name: {
    type: String,
    required: true
  },
  user_email: {
    type: String,
    unique: true,
    required: true
  },
  user_phone: {
    type: String,
    unique: true,
    required: true
  },
  start_date: Date,
  occupation: String,
  status: {
    type: Boolean,
    default: false
  },
  user_image: String,
  password: {
    type: String,
    unique: true,
    required: true
  }
});


module.exports = model("User", usersSchema);