const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new lot
const createLotInfo = async (req, res) => {
  const {
    lot_name,
    lot_before_weight,
    lot_after_weight,
    lot_difference_weight,
    lot_comments,
    is_completed,
  } = req.body;
  try {
    const newLot = await prisma.lotInfo.create({
      data: {
        lot_name,
        lot_before_weight,
        lot_after_weight,
        lot_difference_weight,
        lot_comments,
        is_completed,
      },
    });
    res.status(201).json(newLot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all lots
const getAllLots = async (req, res) => {
  try {
    const lots = await prisma.lotInfo.findMany();
    res.status(200).json(lots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a lot by lot_id
const updateLotInfo = async (req, res) => {
  const { id } = req.params; // This is still fine as long as frontend sends lot_id as 'id'
  const {
    lot_name,
    lot_before_weight,
    lot_after_weight,
    lot_difference_weight,
    lot_comments,
    is_completed,
  } = req.body;

  try {
    const updatedLot = await prisma.lotInfo.update({
      where: { id: parseInt(id) },
      data: {
        lot_name,
        lot_before_weight,
        lot_after_weight,
        lot_difference_weight,
        lot_comments,
        is_completed,
      },
    });
    res.status(200).json(updatedLot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a lot by lot_id
const deleteLotInfo = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.lotInfo.delete({
      where: { id: parseInt(id) }, // Correctly using 'id' as per your model
    });
    res
      .status(200)
      .json({ message: `Lot with ID ${id} deleted successfully.` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { createLotInfo, getAllLots, updateLotInfo, deleteLotInfo };
