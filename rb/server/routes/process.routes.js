
const express = require("express");
const router = express.Router();


const { getProcesses,saveProcessData } = require("../controllers/process.controller");


router.get("/", getProcesses);
router.post("/save", saveProcessData);

module.exports = router;
