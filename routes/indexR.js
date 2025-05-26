//routes/indexR.js
const express = require("express");

const driver = require("./driverR");
const operation = require("./operationR");
const busRoutes = require("./busR");
const enter = require("./enterR");
const menu = require("./menuR");
const fatura = require("./faturaR");

const router = express.Router();

router.use("/driver", driver);
router.use("/bus", busRoutes);
router.use("/operation", operation);
router.use("/enter", enter);
router.use("/menu", menu);
router.use("/fatura", fatura);
module.exports = router;
