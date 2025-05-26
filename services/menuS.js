const express = require("express");
const router = express.Router();
router.get("/dashboard", (req, res) => {
  res.json({
    stats: {
      totalBuses: 12,
      activeDrivers: 5,
      todaysRides: 34,
    },
    message: "Dashboard verileri başarıyla getirildi",
  });
});

module.exports = router;
