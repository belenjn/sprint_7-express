const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactsSchema = new Schema({
  contact_name: String,
  contact_email: String,
  contact_phone: String,
  contact_Date: Date,
  subject: String,
  comment: String,
  viewed: Number,
  archived: Number,
}, {collection: "contacts"});


module.exports = {contactsSchema}

