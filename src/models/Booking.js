const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  seat_ids: [{ type: String, required: true }],
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  booking_id: { type: String, unique: true },
  total_amount: { type: Number, required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);
