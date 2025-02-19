const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProcesses = async (req, res) => {
  try {
    console.log("Fetching all processes...");
    const processes = await prisma.lotProcess.findMany({
      include: {
        ProcessSteps: {
          include: {
            AttributeInfo: true,
          },
        },
      },
    });

    console.log(
      "Processes fetched successfully:",
      JSON.stringify(processes, null, 2)
    );
    res.json(processes);
  } catch (error) {
    console.error("Error fetching processes:", error);
    res.status(500).json({ error: "Failed to fetch processes" });
  }
};

const getProcessById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching process with ID: ${id}`);

    const process = await prisma.lotProcess.findUnique({
      where: { id: parseInt(id) },
      include: {
        ProcessSteps: {
          include: {
            AttributeInfo: true,
          },
        },
        attribute: {
          include: {
            LotInfo: true,
            Item: true,
          },
        },
      },
    });

    if (!process) {
      console.log(`Process with ID ${id} not found`);
      return res.status(404).json({ error: "Process not found" });
    }

    console.log(
      "Process fetched successfully:",
      JSON.stringify(process, null, 2)
    );
    res.json(process);
  } catch (error) {
    console.error("Error fetching process:", error);
    res.status(500).json({ error: "Failed to fetch process" });
  }
};

const createLotProcess = async (req, res) => {
  try {
    const { lot_id, processes } = req.body; 

    console.log("Received data:", JSON.stringify(req.body, null, 2));

    if (!processes || !Array.isArray(processes)) {
      return res.status(400).json({ error: "Invalid processes format" });
    }

    const lotExists = await prisma.lotInfo.findUnique({
      where: { id: lot_id },
    });
    if (!lotExists) {
      return res.status(400).json({ error: "Invalid lot_id" });
    }

   
    const newItem = await prisma.item.create({ data: { lot_id } });
    console.log("Item created successfully:", JSON.stringify(newItem, null, 2));

    let allAttributes = [];

    for (const process of processes) {
      const { process_name, attributes } = process;

      console.log(`Processing: ${process_name}`);
      console.log("Received attributes:", JSON.stringify(attributes, null, 2));

      if (!Array.isArray(attributes)) {
        console.error(`Error: attributes for ${process_name} is not an array`);
        continue;
      }

      const lotProcess = await prisma.lotProcess.findFirst({
        where: { process_name },
      });
      if (!lotProcess) {
        console.error(`Invalid process_name: ${process_name}`);
        continue;
      }

      const process_id = lotProcess.id;

    
      let beforeWeight =
        attributes.find((attr) => attr.name === "before_weight")?.value || 0;
      let afterWeight =
        attributes.find((attr) => attr.name === "after_weight")?.value || 0;
      let itemWeight =
        attributes.find((attr) => attr.name === "item1_weight")?.value ||
        attributes.find((attr) => attr.name === "item2_weight")?.value ||
        0;
      let difference =
        beforeWeight > 0 && afterWeight > 0 ? beforeWeight - afterWeight : null;

      let updatedAttributes = attributes.filter(
        (attr) =>
          attr.name !== "item1_weight" &&
          attr.name !== "item2_weight" &&
          attr.name !== "difference"
      );

      if (difference !== null) {
        updatedAttributes.push({ name: "difference", value: difference });
      }

      if (itemWeight > 0) {
        updatedAttributes.push({ name: "item_weight", value: itemWeight });
      }

      console.log(
        `Final attributes for ${process_name}:`,
        JSON.stringify(updatedAttributes, null, 2)
      );

      updatedAttributes.forEach((attr) => {
        allAttributes.push({
          lot_id,
          process_id,
          items_id: newItem.id,
          value: attr.value,
        });
      });
    }
    if (allAttributes.length > 0) {
      await prisma.attributeValue.createMany({
        data: allAttributes,
      });
      console.log("Attributes created successfully.");
    } else {
      console.log("No attributes to save.");
    }

    res.status(201).json({
      message: "Lot process created successfully.",
      lot_id,
      item_id: newItem.id,
      attributes: allAttributes,
    });
  } catch (error) {
    console.error("Error creating lot process:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


module.exports = {
  getProcesses,
  getProcessById,
  createLotProcess,
};
