var express = require("express");
var router = express.Router();
let bookings = require("../controllers/bookingsController");

router.get("/", bookings.getBookings);
router.post("/", bookings.newBooking);
router.get("/:id", bookings.bookingPrice);
router.post("/reference", bookings.bookingReference);
router.get("/:id", bookings.getBooking);
router.put("/:id", bookings.updateBooking);
router.delete("/:id", bookings.deleteBooking);

module.exports = router;
