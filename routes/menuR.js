//routes/menuR.js
const express = require("express");
const router = express.Router();

const dashboard = require("../services/menuS");
router.get("/dashboard", dashboard);

module.exports = router;
