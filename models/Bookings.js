const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookingsSchema = new Schema({
  guest_name: String,
  order_date: Date,
  checkin: Date,
  checkout: Date,
  special_request: String,
  room_id: Number,
  status: Boolean,
}, {collection: "bookings"});

module.exports = {bookingsSchema}

