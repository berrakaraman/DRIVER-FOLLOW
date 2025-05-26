//routes/busR.js
const express = require("express");
const router = express.Router();

//const bussC = require("../controllers/busC");
const bussS = require("../services/busS");

const { tokenControl } = require("../middleware/tokenControl");
const { roleControl } = require("../middleware/roleControl");

router.post("/bussAdd", bussS.bussAdd);
router.post("/bussList", bussS.bussList);
router.post("/bussUpdate", tokenControl, roleControl("user"), bussS.bussUpdate);
router.delete(
  "/bussDelete/:buss_id",
  tokenControl,
  roleControl("user"),
  bussS.bussDelete
);
router.post("/bussSeferAdd", bussS.bussSeferAdd);
router.get("/bussSeferList", bussS.bussSeferList);

module.exports = router;
