const mongoose = require("mongoose");
const shortid = require("shortid");

const driverSchema = new mongoose.Schema(
  {
    driver_id: {
      type: String,
      unique: true,
      default: shortid.generate, // otomatik oluşturur
    },
    tcNumber: {
      type: String,
      required: true,
      unique: true, // TC numarası benzersiz olacak
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // benzersiz e-posta adresi
    },
    license_number: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["aktif", "pasif", "izinli"], // aktif, pasif, izinli
      default: "aktif",
    },
    start_date: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt ve updatedAt alanlarını otomatik olarak oluşturur
);

module.exports = mongoose.model("Driver", driverSchema, "drivers");
