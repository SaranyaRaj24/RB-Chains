
const express = require("express");
const router = express.Router();
const { getProcesses,saveProcessData, } = require("../controllers/process.controller");


router.get("/", getProcesses);
router.post("/save", saveProcessData);
// router.get("/:id", getProcessById); 

module.exports = router;
