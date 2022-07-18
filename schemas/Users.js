import mongoose from "mongoose";
const { Schema } = mongoose;

const usersSchema = new Schema({
  user_id: Number,
  user_name: String,
  user_email: String,
  user_phone: String,
  start_date: Date,
  occupation: Array,
  status: Boolean,
  user_image: String,
  password: String
});
