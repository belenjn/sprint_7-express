const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const usersSchema = new Schema({
  user_name: String,
  user_email: {
    type: String,
    unique: true
  },
  user_phone: {
    type: String,
    unique: true
  },
  start_date: Date,
  occupation: String,
  status: Boolean,
  user_image: String,
  password: {
    type: String,
    unique: true
  }
});


module.exports = model("User", usersSchema);