// Wallet routes for Cardano DApp
const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

// Connect wallet
router.post('/connect', walletController.connectWallet);

// Disconnect wallet
router.post('/disconnect', walletController.disconnectWallet);

// Get wallet sessions for user
router.get('/sessions/:userId', walletController.getUserSessions);

module.exports = router;