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

  
    const newProcesses = await prisma.lotProcess.createMany({
      data: processData,
    });

    console.log("Saved lot processes:", newProcesses);


    const lastProcess = await prisma.lotProcess.findMany({
      orderBy: { process_id: "desc" },
      take: req.body.length,
    });

    const itemsData = [];
    lastProcess.forEach((process, index) => {
      const bodyData = req.body[index];
      if (bodyData.item1Name && bodyData.item1Weight) {
        itemsData.push({
          lotProcessId: process.process_id,
          item_name: bodyData.item1Name,
          item_weight: parseFloat(bodyData.item1Weight),
        });
      }
      if (bodyData.item2Name && bodyData.item2Weight) {
        itemsData.push({
          lotProcessId: process.process_id,
          item_name: bodyData.item2Name,
          item_weight: parseFloat(bodyData.item2Weight),
        });
      }
    });

    console.log("Items data before saving:", itemsData);


    if (itemsData.length > 0) {
      await prisma.lotProcessItems.createMany({
        data: itemsData,
      });
    }

    res.status(201).json({
      message: "Process data and items saved successfully",
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