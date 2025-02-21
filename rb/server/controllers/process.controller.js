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

// const createLotProcess = async (req, res) => {
//   try {
//     const { lot_id, processes } = req.body;

//     console.log("Received data:", JSON.stringify(req.body, null, 2));

//     if (!lot_id) {
//       return res.status(400).json({ error: "lot_id is required" });
//     }

//     if (!Array.isArray(processes) || processes.length === 0) {
//       return res
//         .status(400)
//         .json({ error: "Invalid or empty processes array" });
//     }

//     const lotExists = await prisma.lotInfo.findUnique({
//       where: { id: lot_id },
//     });

//     if (!lotExists) {
//       return res.status(400).json({ error: "Invalid lot_id" });
//     }

//     let createdItems = [];
//     let itemMap = {};


//     for (const process of processes) {
//       if (process.process_name === "Initial Item Weight") {
//         for (const attr of process.attributes) {
//           if (attr.name.includes("_name")) {
//             const itemName = attr.value;

//             const newItem = await prisma.item.create({
//               data: {
//                 lot_id,
//                 item_type: itemName,
//               },
//             });

//             itemMap[itemName] = newItem.item_id;
//             createdItems.push(newItem);
//           }
//         }
//         break;
//       }
//     }
// const hasNameAttributes = processes.some((process) =>
//   process.attributes.some((attr) => attr.name.includes("_name"))
// );

// if (createdItems.length === 0 && hasNameAttributes) {
//   return res.status(400).json({ error: "No valid items found to create" });
// }


//     console.log("Items created successfully:", createdItems);


//     for (const process of processes) {
//       const { process_name, attributes } = process;

//       if (!process_name || !Array.isArray(attributes)) {
//         console.error(`Skipping invalid process: ${JSON.stringify(process)}`);
//         continue;
//       }

//       const lotProcess = await prisma.lotProcess.findFirst({
//         where: { process_name: process_name },
//       });

//       if (!lotProcess) {
//         console.error(`Invalid process_name: ${process_name}`);
//         continue;
//       }

//       const process_id = lotProcess.id;

//       for (const attr of attributes) {
//         let numericValue = parseFloat(attr.value);

//         if (isNaN(numericValue)) {
//           console.error(`Invalid value for ${attr.name}: ${attr.value}`);
//           continue;
//         }

//         let items_id = null;
//         if (attr.name.includes("_weight")) {
//           const itemPrefix = attr.name.split("_")[0];
//           const itemNameAttr = process.attributes.find(
//             (a) => a.name === `${itemPrefix}_name`
//           );
//           if (itemNameAttr) {
//             const itemName = itemNameAttr.value;
//             items_id = itemMap[itemName] || null;
//           }
//         }

//         const attributeName = attr.name.replace(/_/g, " ");
//         console.log("Searching for attribute:", attributeName);

//         const attributeInfo = await prisma.attributeInfo.findFirst({
//           where: { attribute_name: attributeName },
//         });

//         if (!attributeInfo) {
//           console.error(
//             `Attribute info not found for ${attr.name} (checked as ${attributeName})`
//           );
//           continue;
//         }

//         const attribute_id = attributeInfo.attribute_id;

//         console.log("Creating attributeValue with:", {
//           lot_id,
//           process_id,
//           items_id,
//           value: numericValue,
//           attribute_id,
//         });

   
//         const existingProcessStep = await prisma.processSteps.findFirst({
//           where: { process_id, attribute_id },
//         });

//         if (!existingProcessStep) {
//           await prisma.processSteps.create({
//             data: {
//               process_id: process_id,
//               attribute_id: attribute_id,
              
//             },
//           });
//         }

   
//         await prisma.attributeValue.create({
//           data: {
          
//             lot_id: lot_id,
//             process_id: process_id,
//             // items_id: items_id,
//             value: numericValue,
//           },
//         });
//       }
//     }

//     res.status(201).json({
//       message: "Lot process created successfully.",
//       lot_id,
//       items: createdItems.map((item) => ({
//         item_id: item.item_id,
//         item_type: item.item_type,
//       })),
//     });
//   } catch (error) {
//     console.error("Error creating lot process:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// };




module.exports = {
  getProcesses,
  getProcessById,
  createLotProcess

};
