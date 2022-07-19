const mongoose = require("mongoose");

const { Schema } = mongoose;

const roomsSchema = new Schema({
  room_number: Number,
  bed_type: Array,
  description: String,
  offer: Number,
  price: {
    type: Number,
    default: 0,
  },
  discount: Number,
  cancellation: String,
  amenities: String,
});

module.exports = {roomsSchema}

