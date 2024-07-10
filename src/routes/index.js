const express = require("express");
const router = express.Router();
const seatsController = require("../controllers/seatsController");
const bookingController = require("../controllers/bookingController");

router.get("/seats", seatsController.getAllSeats);
router.get("/seats/:id", seatsController.getSeatPricing);
router.post("/booking", bookingController.createBooking);
router.get("/bookings", bookingController.getBookings);

module.exports = router;
