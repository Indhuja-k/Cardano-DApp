const express = require("express");
const router = express.Router();
const controller = require("../controllers/invoiceController");

// POST /api/invoices/         -> create invoice
router.post("/", controller.createInvoice);

// GET /api/invoices/          -> list invoices
router.get("/", controller.getAllInvoices);

// GET /api/invoices/:id       -> get by invoice_id or DB id
router.get("/:id", controller.getInvoiceById);

// POST /api/invoices/mark-paid -> mark invoice as paid (txHash)
router.post("/mark-paid", controller.markPaid);

module.exports = router;