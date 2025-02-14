// const express = require("express");

// const router = express.Router();

// router.get("/", (req, res) => {
//   res.json({ message: "Process API is working!" });
// });

// module.exports = router;


const express = require("express");
const {
  getAllProcesses,
  createProcess,
} = require("../controllers/process.controller");

const router = express.Router();

router.get("/", getAllProcesses);
router.post("/", createProcess);

module.exports = router;
