const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProcesses = async (req, res) => {
  try {
    const processes = await prisma.lotProcess.findMany();
    res.json(processes);
  } catch (error) {
    console.error("Error fetching processes:", error);
    res.status(500).json({ error: "Failed to fetch process data" });
  }
};

const saveProcessData = async (req, res) => {
  try {
    console.log("Received process data:", req.body);

    if (!req.body || req.body.length === 0) {
      return res.status(400).json({ message: "No process data provided" });
    }

    const processData = req.body.map((process) => ({
      beforeWeight: process.beforeWeight
        ? parseFloat(process.beforeWeight)
        : null,
      afterWeight: process.afterWeight ? parseFloat(process.afterWeight) : null,
      difference: process.difference ? parseFloat(process.difference) : null,
      process_name: process.processName || "",
    }));

    console.log("Processed data before saving:", processData);

    const newProcess = await prisma.lotProcess.createMany({
      data: processData,
    });

    res.status(201).json({
      message: "Process data saved successfully",
      data: newProcess,
    });
  } catch (error) {
    console.error("Error saving process data:", error);
    res.status(500).json({
      message: "Failed to save process data",
      error: error.message,
    });
  }
};


module.exports = {
  getProcesses,
  saveProcessData,
};
