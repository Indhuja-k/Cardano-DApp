const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

// Import all routes
const userRoutes = require("./routes/userRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const walletRoutes = require("./routes/walletRoutes");
const auditRoutes = require("./routes/auditRoutes");
const stablecoinRoutes = require("./routes/stablecoinRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// API routes
app.use("/api/users", userRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/stablecoin", stablecoinRoutes);

// Simple health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});