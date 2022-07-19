const mongoose = require("mongoose");

const { Schema } = mongoose;

const usersSchema = new Schema({
  user_name: String,
  user_email: String,
  user_phone: String,
  start_date: Date,
  occupation: String,
  status: Boolean,
  user_image: String,
  password: String
});


module.exports = {usersSchema}