//routes/driver.js
const express = require("express");
const router = express.Router();

const driverS = require("../services/driverS");
const { tokenControl } = require("../middleware/tokenControl");
const { roleControl } = require("../middleware/roleControl");

router.post("/driversAdd", driverS.driversAdd);
router.post("/driversList", driverS.driversList);
router.post(
  "/driverUpdate",
  tokenControl,
  roleControl("user"),
  driverS.driverUpdate
);
router.delete(
  "/driverDelete/:driver_id",
  tokenControl,
  roleControl("user"),
  driverS.driverDelete
);

module.exports = router;
