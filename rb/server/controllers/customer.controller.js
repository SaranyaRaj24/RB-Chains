const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createCustomer = async (req, res) => {
  const { customer_name, customer_shop_name, phone_number, address } = req.body;

  try {
    const newCustomer = await prisma.customerInfo.create({
      data: {
        customer_name,
        customer_shop_name,
        phone_number,
        address,
      },
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Failed to create customer" });
  }
};


const deleteCustomer = async (req, res) => {
  const { customer_id } = req.params;
  console.log(`Attempting to delete customer with ID: ${customer_id}`);

  try {
    const deletedCustomer = await prisma.customerInfo.delete({
      where: { customer_id: parseInt(customer_id) },
    });
    res.status(200).json({
      message: "Customer deleted successfully",
      customer: deletedCustomer,
    });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Failed to delete customer" });
  }
};

const updateCustomer = async (req, res) => {
  const { customer_id } = req.params;
  const { customer_name, customer_shop_name, phone_number, address } = req.body;

  try {
    const updatedCustomer = await prisma.customerInfo.update({
      where: { customer_id: parseInt(customer_id) },
      data: {
        customer_name,
        customer_shop_name, 
        phone_number,
        address,
      },
    });
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Failed to update customer" });
  }
};

module.exports = {
  createCustomer,
  deleteCustomer,
  updateCustomer,
};
