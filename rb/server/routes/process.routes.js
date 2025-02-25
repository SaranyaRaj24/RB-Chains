
const express = require("express");
const router = express.Router();
const { getProcesses,getProcessById } = require("../controllers/process.controller");


router.get("/processes", getProcesses);

router.get("/processes/:id", getProcessById);

// router.post("/processes", createLotProcess);


module.exports = router;
