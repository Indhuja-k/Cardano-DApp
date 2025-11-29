// Stablecoin routes for Cardano DApp
const express = require('express');
const router = express.Router();
const stablecoinController = require('../controllers/stablecoinController');

// Create a new stablecoin transaction
router.post('/', stablecoinController.createTransaction);

// Get transaction by ID
router.get('/:id', stablecoinController.getTransactionById);

// Get transactions by user ID
router.get('/user/:userId', stablecoinController.getTransactionsByUser);

// Get transactions by token name
router.get('/token/:tokenName', stablecoinController.getTransactionsByToken);

// Update transaction status
router.put('/:id/status', stablecoinController.updateTransactionStatus);

module.exports = router;