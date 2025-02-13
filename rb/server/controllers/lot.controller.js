const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createLotInfo = async (req, res) => {
  const {
    lot_name,
    lot_before_weight,
    lot_after_weight,
    lot_difference_weight,
    lot_comments,
    is_completed,
  } = req.body;

  console.log("Incoming payload:", req.body); 

  
  if (!lot_name) {
    return res.status(400).json({ error: "Lot name is required" });
  }

  try {
   
    const newLot = await prisma.lotInfo.create({
      data: {
        lot_name,
        lot_before_weight: lot_before_weight || null,
        lot_after_weight: lot_after_weight || null,
        lot_difference_weight: lot_difference_weight || null,
        lot_comments: lot_comments || null,
        is_completed: is_completed || false,
      },
    });

    res.status(201).json(newLot);
  } catch (error) {
    console.error("Error creating lot:", error);
    res.status(400).json({ error: error.message });
  }
};
const getAllLots = async (req, res) => {
  try {
    const lots = await prisma.lotInfo.findMany();
    res.status(200).json(lots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const updateLotInfo = async (req, res) => {
  const { id } = req.params; 
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


const deleteLotInfo = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.lotInfo.delete({
      where: { id: parseInt(id) }, 
    });
    res
      .status(200)
      .json({ message: `Lot with ID ${id} deleted successfully.` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { createLotInfo, getAllLots, updateLotInfo, deleteLotInfo };
