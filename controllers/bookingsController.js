const { connection } = require("../db");
const Joi = require("joi");

const bookingSchema = Joi.object({
  guest_name: Joi.string().max(100).required(),
  order_date: Joi.date().required(),
  checkin: Joi.date().required(),
  checkout: Joi.date().required(),
  special_request: Joi.string().max(2000),
  room_id: Joi.number().required(),
  status: Joi.string().valid("checkin", "checkout", "in_progress"),
});

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
  const { error } = bookingSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  } else {
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
          ? res
              .status(404)
              .json({ success: false, message: "Booking not found" })
          : res.json({
              success: true,
              message: "Booking successfully updated",
            });
      }
    );
  }
};

const newBooking = (req, res) => {
  const { error } = bookingSchema.validate(req.body, { abortEarly: false });

  const newBookingData = [
    req.body.guest_name,
    req.body.order_date,
    req.body.checkin,
    req.body.checkout,
    req.body.special_request,
    req.body.room_id,
    req.body.status,
  ];
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  } else {
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
  }
};

module.exports = {
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
  newBooking,
};
