const Seat = require("../models/Seat");
const Pricing = require("../models/Pricing");

// GET ALL Seats
exports.getAllSeats = async (req, res, next) => {
  try {
    const seats = await Seat.find().sort({ seat_class: 1 });
    res.json(seats);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET Seat Pricing

exports.getSeatPricing = async (req, res, next) => {
  try {
    const seat = await Seat.findOne({ id: req.params.id });
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }
    const pricing = await Pricing.findOne({ seat_class: seat.seat_class });
    const totalSeats = await Seat.countDocuments({
      seat_class: seat.seat_class,
    });
    const bookedSeats = await Seat.countDocuments({
      seat_class: seat.seat_class,
      is_booked: true,
    });
    const bookingPercentage = (bookedSeats / totalSeats) * 100;

    let price;

    if (bookingPercentage > 60) {
      price = pricing.max_price || pricing.normal_price;
    } else if (bookingPercentage >= 40) {
      price = pricing.normal_price || pricing.max_price;
    } else {
      price = pricing.min_price || pricing.normal_price;
    }

    res.json({ ...seat._doc, price });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
