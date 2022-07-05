var express = require('express');
var router = express.Router();
let bookings = require("../controllers/bookingsController")

router.get("/", bookings.getBookings);
router.get("/:id", bookings.getBooking);
router.post("/:id", bookings.newBooking);
router.put("/:id", bookings.updateBooking);
router.delete("/:id", bookings.deleteBooking);


module.exports = router;


