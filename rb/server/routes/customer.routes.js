const express = require("express");
const { createCustomer,deleteCustomer,updateCustomer } = require("../controllers/customer.controller");

const router = express.Router();

router.post("/customer_info", createCustomer);
router.delete("/customer_info/:customer_id", deleteCustomer);
router.put("/customer_info/:customer_id", updateCustomer);

module.exports = router;
