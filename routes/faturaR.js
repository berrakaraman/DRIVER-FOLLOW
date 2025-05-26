const express = require("express");
const router = express.Router();

const faturaS = require("../services/faturaS");
//const { tokenControl } = require("../middleware/tokenControl");
//const { roleControl } = require("../middleware/roleControl");

router.post("/faturaCreat", faturaS.faturaCreat);
router.get("/faturaList", faturaS.faturaList);
router.get("/:id", faturaS.getById);
router.delete("/:id", faturaS.deleteById);

module.exports = router;
