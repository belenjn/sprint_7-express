let bookings = require("../data/bookings.json");

const getBookings = (req, res) => {
  return res.json(bookings);
};

const getBooking = (req, res) => {
  const room = bookings.find((b) => String(b.id) === req.params.id);
  return res.json(room);
};

const deleteBooking = (req, res) => {
  const bookingId = bookings.find(
    (booking) => String(booking.id) === req.params.id
  );
  bookings.splice(bookingId, 1);

  return res.json({ success: true, message: "Booking deleted" });
};

const updateBooking = (req, res) => {
  bookings.forEach((booking, index) => {
    if (booking.id === req.params.id) {
      return (bookings[index] = req.body);
    }
  });

  return res.json({ success: true, message: "Booking updated" });
};

const newBooking = (req, res) => {
  bookings = [...bookings, req.body];
  return res.json({ success: true, message: "New booking updated" });
};

module.exports = {
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
  newBooking,
};
