// models/bussSefer.js (örnek Mongoose şeması)
const mongoose = require("mongoose");

const rowSchema = new mongoose.Schema({
  saat: { type: String, required: true },
  haftaIci: { type: [String], default: [] },
  cumartesi: { type: [String], default: [] },
  pazar: { type: [String], default: [] },
});

const bussSeferSchema = new mongoose.Schema({
  sefer_id: { type: String, required: true },
  busNo: { type: Number, required: true },
  kalkis: { type: String, required: true },
  varis: { type: String, required: true },
  rows: { type: [rowSchema], default: [] },
});

module.exports = mongoose.model("BusSchedule", bussSeferSchema, "bussSefer");
