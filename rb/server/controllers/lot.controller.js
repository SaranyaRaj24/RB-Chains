const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new lot
const postLotInfo = async (req, res) => {
  try {
    const { lot_name, description } = req.body;

    if (!lot_name) {
      return res.status(400).json({ message: "Lot name is required" });
    }

    const newLot = await prisma.lot.create({
      data: {
        lot_name,
        description,
      },
    });

    res.status(201).json({ message: "Lot created successfully", data: newLot });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create lot", error: error.message });
  }
};

// Fetch all lots
const getAllLots = async (req, res) => {
  try {
    const lots = await prisma.lot.findMany();
    res.status(200).json({ message: "Lots fetched successfully", data: lots });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch lots", error: error.message });
  }
};

// Get details of a specific lot by ID
const getLotById = async (req, res) => {
  try {
    const { lot_id } = req.body;

    if (!lot_id) {
      return res.status(400).json({ message: "Lot ID is required" });
    }

    const lot = await prisma.lot.findUnique({
      where: { id: parseInt(lot_id) },
    });

    if (!lot) {
      return res.status(404).json({ message: "Lot not found" });
    }

    res.status(200).json({ message: "Lot fetched successfully", data: lot });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch lot", error: error.message });
  }
};

// Delete a lot by ID
const deleteLot = async (req, res) => {
  try {
    const { lot_id } = req.params;

    const existingLot = await prisma.lot.findUnique({
      where: { id: parseInt(lot_id) },
    });

    if (!existingLot) {
      return res.status(404).json({ message: "Lot not found" });
    }

    await prisma.lot.delete({
      where: { id: parseInt(lot_id) },
    });

    res.status(200).json({ message: "Lot deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete lot", error: error.message });
  }
};

// Update lot info
const updateLotData = async (req, res) => {
  try {
    const { lot_id, lot_name, description } = req.body;

    if (!lot_id) {
      return res.status(400).json({ message: "Lot ID is required" });
    }

    const existingLot = await prisma.lot.findUnique({
      where: { id: parseInt(lot_id) },
    });

    if (!existingLot) {
      return res.status(404).json({ message: "Lot not found" });
    }

    const updatedLot = await prisma.lot.update({
      where: { id: parseInt(lot_id) },
      data: {
        lot_name: lot_name || existingLot.lot_name,
        description: description || existingLot.description,
      },
    });

    res
      .status(200)
      .json({ message: "Lot updated successfully", data: updatedLot });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update lot", error: error.message });
  }
};

module.exports = {
  postLotInfo,
  getAllLots,
  getLotById,
  deleteLot,
  updateLotData,
};
