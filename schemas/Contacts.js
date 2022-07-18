import mongoose from "mongoose";
const { Schema } = mongoose;

const contactsSchema = new Schema({
  contact_id: Number,
  contact_name: String,
  contact_email: String,
  contact_phone: String,
  contact_Date: Date,
  subject: String,
  comment: String,
  viewed: Number,
  archived: Number,
});
