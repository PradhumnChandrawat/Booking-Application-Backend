const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  seat_class: String,
  is_booked: { type: Boolean, default: false },
});

module.exports = mongoose.model("seat", seatSchema);
