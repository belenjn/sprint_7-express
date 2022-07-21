const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const contactsSchema = new Schema({
  contact_name: String,
  contact_email: {
    type: String,
    unique: true
  },
  contact_phone: String,
  contact_Date: Date,
  subject: String,
  comment: String,
  viewed: Boolean,
  archived: Boolean,
});


module.exports = model("Contact", contactsSchema)

