const Booking = require("../models/Booking");
const BookingDetails = require("../models/BookingDetails");
const Seat = require("../models/Seat");
const Pricing = require("../models/Pricing");
const { v4: uuidv4 } = require("uuid");

// Create Booking
exports.createBooking = async (req, res, next) => {
  try {
    const { seat_ids, name, phone, email } = req.body;

    if (!Array.isArray(seat_ids)) {
      return res.status(400).json({ message: "seat_ids must be an array" });
    }

    const bookedSeats = await Seat.find({
      id: { $in: seat_ids },
      is_booked: true,
    });

    if (bookedSeats.length > 0) {
      return res.status(400).json({ message: "Some seats are already booked" });
    }

    let totalAmount = 0;

    for (const seat_id of seat_ids) {
      const seat = await Seat.findOne({ id: seat_id });
      if (!seat) {
        return res
          .status(404)
          .json({ message: `Seat with id ${seat_id} not found` });
      }
      const pricing = await Pricing.findOne({ seat_class: seat.seat_class });
      const totalSeats = await Seat.countDocuments({
        seat_class: seat.seat_class,
      });
      const bookedSeatsCount = await Seat.countDocuments({
        seat_class: seat.seat_class,
        is_booked: true,
      });
      const bookingPercentage = (bookedSeatsCount / totalSeats) * 100;

      let price;
      if (bookingPercentage > 60) {
        price = pricing.max_price || pricing.normal_price;
      } else if (bookingPercentage >= 40) {
        price = pricing.normal_price || pricing.max_price;
      } else {
        price = pricing.min_price || pricing.normal_price;
      }

      totalAmount += price;
      await Seat.findOneAndUpdate({ id: seat_id }, { is_booked: true });
    }

    const booking_id = uuidv4();

    const booking = new Booking({
      seat_ids,
      name,
      phone,
      email,
      booking_id,
      total_amount: totalAmount,
    });

    await booking.save();

    const bookingDetails = new BookingDetails({
      booking_id,
      seat_ids,
      name,
      phone,
      email,
      total_amount: totalAmount,
    });

    await bookingDetails.save();

    res.json({ booking_id: booking.booking_id, total_amount: totalAmount });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Retrieve bookings
exports.getBookings = async (req, res) => {
  try {
    const { userIdentifier } = req.query; // Use Email or Phone Number
    if (!userIdentifier) {
      return res.status(400).json({ message: "User identifier is required" });
    }

    const bookings = await Booking.find({
      $or: [{ phone: userIdentifier }, { email: userIdentifier }],
    });

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
