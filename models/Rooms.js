const mongoose = require("mongoose");

const { Schema } = mongoose;

const roomsSchema = new Schema({
  room_number: {
    type: Number,
    default: 0,
  },
  bed_type: String,
  description: String,
  offer: Boolean,
  price: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  cancellation: String,
  amenities: Array,
  images: Array
});

module.exports = {roomsSchema}

