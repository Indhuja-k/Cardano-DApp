// Invoice controller for Cardano DApp
const Invoice = require("../models/Invoice");

const createInvoice = async (req, res) => {
  try {
    const { recipient, amount, description, currency = "ADA" } = req.body;

    // Validate input
    if (!recipient || !amount) {
      return res.status(400).json({ error: "Recipient and amount are required" });
    }

    // Convert ADA to Lovelace (1 ADA = 1,000,000 Lovelace)
    const amountLovelace = Math.round(amount * 1000000);
    
    // Create invoice data
    const invoiceData = {
      invoice_id: `INV-${Date.now()}`,
      recipient_address: recipient,
      amount_lovelace: amountLovelace,
      amount_ada: amount,
      currency,
      description: description || null,
    };

    // Create and save invoice
    const invoice = new Invoice(invoiceData);
    await Invoice.save(invoice);

    res.status(201).json(invoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    // Check if it's a database connection error
    if (error.message && error.message.includes('ECONNREFUSED')) {
      res.status(503).json({ error: "Database connection failed. Please ensure MySQL is running." });
    } else {
      res.status(500).json({ error: "Failed to create invoice" });
    }
  }
};

const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    // Check if it's a database connection error
    if (error.message && error.message.includes('ECONNREFUSED')) {
      res.status(503).json({ error: "Database connection failed. Please ensure MySQL is running." });
    } else {
      res.status(500).json({ error: "Failed to fetch invoices" });
    }
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id);
    
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    
    res.json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    // Check if it's a database connection error
    if (error.message && error.message.includes('ECONNREFUSED')) {
      res.status(503).json({ error: "Database connection failed. Please ensure MySQL is running." });
    } else {
      res.status(500).json({ error: "Failed to fetch invoice" });
    }
  }
};

const getInvoiceByInvoiceId = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const invoice = await Invoice.findByInvoiceId(invoiceId);
    
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    
    res.json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    // Check if it's a database connection error
    if (error.message && error.message.includes('ECONNREFUSED')) {
      res.status(503).json({ error: "Database connection failed. Please ensure MySQL is running." });
    } else {
      res.status(500).json({ error: "Failed to fetch invoice" });
    }
  }
};

const markPaid = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const { txHash } = req.body;
    
    const result = await Invoice.update(invoiceId, {
      status: 'paid',
      tx_hash: txHash,
      paid_at: Date.now()
    });
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    
    const updatedInvoice = await Invoice.findByInvoiceId(invoiceId);
    res.json(updatedInvoice);
  } catch (error) {
    console.error("Error marking invoice as paid:", error);
    // Check if it's a database connection error
    if (error.message && error.message.includes('ECONNREFUSED')) {
      res.status(503).json({ error: "Database connection failed. Please ensure MySQL is running." });
    } else {
      res.status(500).json({ error: "Failed to mark invoice as paid" });
    }
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  getInvoiceByInvoiceId,
  markPaid,
};