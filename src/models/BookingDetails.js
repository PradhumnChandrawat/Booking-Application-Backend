const mongoose = require("mongoose");

const bookingDetailsSchema = new mongoose.Schema({
  booking_id: { type: String, unique: true },
  seat_ids: [{ type: String, required: true }],
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  total_amount: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BookingDetails", bookingDetailsSchema);
