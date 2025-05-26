// models/bus.js
const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  buss_id: {
    type: String,
    required: true,
    unique: true,
  },
  plate: {
    type: String,
    required: true,
    unique: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  productionYear: {
    type: Number,
  },
  seatCapacity: {
    type: Number,
  },
  fuelType: {
    type: String,
  },
  engineNumber: {
    type: String,
  },
  vin: {
    type: String,
  },
  registrationDate: {
    type: Date,
  },
  gpsDeviceId: {
    type: String,
  },
  status: {
    type: Number,
    default: 2, // 1: Verified, 2: Pending, 3: Rejected
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Buses", busSchema);
