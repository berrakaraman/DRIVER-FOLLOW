const express = require("express");
const router = express.Router();

const operationS = require("../services/operationS");
//const { tokenControl } = require("../middleware/tokenControl");
//const { roleControl } = require("../middleware/roleControl");

router.post("/workingStartTime", operationS.workingStartTime);
router.post("/workingFinishTime", operationS.workingFinishTime);
router.post("/workingTime", operationS.workingTime);
router.post("/workingMoney", operationS.workingMoney);
router.post("/breakTimeStart", operationS.breakTimeStart);
router.post("/breakTimeFinish", operationS.breakTimeFinish);
router.post("/exchange", operationS.exchange);
router.get("/calendar", operationS.events);
router.post("/benzin", operationS.benzin);
router.get("/dashboard", operationS.dashboardStats);

module.exports = router;
