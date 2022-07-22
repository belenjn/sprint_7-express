require("../db");
const Booking = require("../models/Bookings");

const getBookings = async (req, res) => {
  const bookings = await Booking.find();
  return res.json(bookings);
};

const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id });
    return res.json(booking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await Booking.findOneAndDelete({ _id: req.params.id });
    return res.json({ success: true, message: "Booking successfully deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    await Booking.findOneAndUpdate(
      { _id: req.params.id },
      {
        guest_name: req.body.guest_name,
        order_date: req.body.order_date,
        checkin: req.body.checkin,
        checkout: req.body.checkout,
        special_request: req.body.special_request,
        room_id: req.body.room_id,
        status: req.body.status,
      }
    );
    return res.json({ success: true, message: "Booking successfully updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const newBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    return res.json({ success: true, message: "Booking successfully added" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
  newBooking,
};
