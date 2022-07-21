const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const roomsSchema = new Schema({
  room_number: {
    type: Number,
    unique: true,
    required: true,
    default: 0,
  },
  bed_type: String,
  description: String,
  offer: Boolean,
  price: {
    type: Number,
    default: 50,
  },
  discount: {
    type: Number,
    default: 0,
  },
  cancellation: String,
  amenities: Array,
  images: Array
});

module.exports = model("Room", roomsSchema)

