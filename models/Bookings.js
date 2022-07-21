const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const bookingsSchema = new Schema({
  guest_name: String,
  order_date: Date,
  checkin: Date,
  checkout: Date,
  special_request: String,
  room_id: {
    type: Schema.ObjectId,
    unique: true,
    ref: "rooms"
  },
  status: String,
});

module.exports = model("Booking", bookingsSchema)

