const { connection } = require("../db");

const getBookings = (req, res) => {
  connection.query("SELECT * FROM bookings", (error, results, fields) => {
    return res.json({ bookings: results });
  });
};

const getBooking = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * from bookings WHERE booking_id = ?",
    [id],
    (error, results, fields) => {
      return res.json({ bookings: results });
    }
  );
};

const deleteBooking = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE from bookings WHERE booking_id = ?",
    [id],
    (err, results) => {
      return !results
        ? res.status(404).json({ success: false, message: "Booking not found" })
        : res.json({ success: true, message: "Booking successfully deleted" });
    }
  );
};

const updateBooking = (req, res) => {
  const id = req.params.id;
  connection.query(
    "UPDATE bookings SET guest_name = ?, order_date = ?, checkin = ?, checkout = ?, special_request = ?, room_id = ?, status = ? WHERE booking_id = ?",
    [
      req.body.guest_name,
      req.body.order_date,
      req.body.checkin,
      req.body.checkout,
      req.body.special_request,
      req.body.room_id,
      req.body.status,
      id,
    ],
    (err, results) => {
      console.log(err);
      return !results
        ? res.status(404).json({ success: false, message: "Booking not found" })
        : res.json({ success: true, message: "Booking successfully updated" });
    }
  );
};

const newBooking = (req, res) => {
  const newBookingData = [
    req.body.guest_name,
    req.body.order_date,
    req.body.checkin,
    req.body.checkout,
    req.body.special_request,
    req.body.room_id,
    req.body.status,
  ];
  connection.query(
    "INSERT INTO bookings (guest_name, order_date, checkin, checkout, special_request, room_id, status) VALUES (?)",
    [newBookingData],
    (err, results) => {
      console.log(err);
      return res.json({
        success: true,
        message: "Booking successfully created",
      });
    }
  );
};

module.exports = {
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
  newBooking,
};
