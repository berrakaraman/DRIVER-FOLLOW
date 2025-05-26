//routes/enterR.js
const express = require("express");
const router = express.Router();

const { tokenControl } = require("../middleware/tokenControl");
//const { roleControl } = require("../middleware/roleControl");
const enterS = require("../services/enterS");

router.post("/register", enterS.register);
router.post("/login", enterS.login);
router.post("/me", tokenControl, enterS.me);

module.exports = router;
