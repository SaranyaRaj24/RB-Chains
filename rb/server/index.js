const express = require("express");
const chalk = require("chalk");
const cors = require("cors"); 
const lotRoutes = require("./routes/lot.routes");
const customerRoutes = require("./routes/customer.routes");

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(express.json());

// Lot routes
app.use("/api/lot", lotRoutes);

// Customer routes
app.use("/api/customer", customerRoutes);

app.listen(PORT, () => {
  console.log(chalk.green(`Server running on http://localhost:${PORT}`));
});
