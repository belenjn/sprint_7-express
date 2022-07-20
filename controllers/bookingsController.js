require("../db");
const Booking = require("../models/Bookings");

const getBookings = async (req, res) => {
  const bookings = await Booking.find();
  return res.json(bookings);
};

const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id});
    return res.json(booking);
  } catch (error) {
    res.status(404).json({ success: false, message: "Booking not found" });
    console.log(error);
  }
};

const deleteBooking = async (req, res) => {
  try {
    await Booking.findOneAndDelete({ _id: req.params.id });
    return res.json({ success: true, message: "Booking successfully deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Booking not found" });
    console.log(error);
  }
};

const updateBooking = async (req, res) => {
  try {
    await Room.findOneAndUpdate(
      { _id: req.params.id },
      {
        room_number: req.body.room_number,
        bed_type: req.body.bed_type,
        offer: req.body.offer,
        price: req.body.price,
        discount: req.body.discount,
        cancellation: req.body.cancellation,
        amenities: req.body.amenities,
        images: req.body.images,
      }
    );
    return res.json({ success: true, message: "Room successfully updated" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Room not found" });
    console.log(error);
  }
};

const newBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    return res.json({ success: true, message: "Booking successfully added" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Booking not found" });
    console.log(error);
  }
};

module.exports = {
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
  newBooking,
};
