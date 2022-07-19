import mongoose from "mongoose";
const { Schema } = mongoose;

export const bookingsSchema = new Schema({
  booking_id: Number,
  guest_name: String,
  order_date: Date,
  checkin: Date,
  checkout: Date,
  special_request: String,
  room_id: Number,
  status: Boolean,
});
