const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const bookingsSchema = new Schema({
  guest_name: {
    type: String,
    required: true
  },
  order_date: Date,
  checkin: {
    type: Date,
    required: true
  },
  checkout: {
    type: Date,
    required: true
  },
  special_request: String,
  room_id: {
    type: Schema.ObjectId,
    required: true,
    ref: "rooms"
  },
  status: String,
});

module.exports = model("Booking", bookingsSchema)

