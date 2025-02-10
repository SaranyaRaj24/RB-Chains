const express = require("express");
const {
  postLotInfo,
  getAllLots,
  getLotById,
  deleteLot,
  updateLotData,
} = require("../controllers/lot.controller");

const router = express.Router();

// Create a lot
// POST /api/lot/lot_info
router.post("/lot_info", postLotInfo);

// Fetch all lots
// GET /api/lot
router.get("/", getAllLots);

// Get details of a specific lot
// POST /api/lot/lot_data
router.post("/lot_data", getLotById);

// Delete a lot by ID
// DELETE /api/lot/lot_info/:lot_id
router.delete("/lot_info/:lot_id", deleteLot);

// Update lot info
// POST /api/lot/modify_lot
router.post("/modify_lot", updateLotData);

module.exports = router;
