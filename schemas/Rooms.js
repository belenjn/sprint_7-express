import mongoose from "mongoose";
const { Schema } = mongoose;

const roomsSchema = new Schema({
  room_id: Number,
  room_number: Number,
  bed_type: Array,
  description: String,
  offer: Number,
  price: Number,
  discount: Number,
  cancellation: String,
  amenities: String,
});
