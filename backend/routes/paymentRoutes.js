// Payment routes for Cardano DApp
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Create a new payment
router.post('/', paymentController.createPayment);

// Get payment by ID
router.get('/:id', paymentController.getPaymentById);

// Get payments by invoice ID
router.get('/invoice/:invoiceId', paymentController.getPaymentsByInvoiceId);

// Update payment status
router.put('/:id/status', paymentController.updatePaymentStatus);

module.exports = router;