const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all processes
const getAllProcesses = async (req, res) => {
  try {
    const processes = await prisma.masterProcess.findMany();
    res.json(processes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch processes" });
  }
};

// Add a new process
const createProcess = async (req, res) => {
  try {
    const { process_name } = req.body;

    const newProcess = await prisma.masterProcess.create({
      data: {
        process_name,
      },
    });

    res.status(201).json(newProcess);
  } catch (error) {
    res.status(500).json({ error: "Failed to create process" });
  }
};

module.exports = { getAllProcesses, createProcess };
