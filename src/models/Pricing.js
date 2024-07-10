const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  seat_class: String,
  min_price: Number,
  normal_price: Number,
  max_price: Number,
});

module.exports = mongoose.model("pricing", pricingSchema);
