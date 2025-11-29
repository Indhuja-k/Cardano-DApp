// User routes for Cardano DApp
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);

// Get user by wallet address
router.get('/wallet/:walletAddress', userController.getUserByWallet);

// Get user by ID
router.get('/:id', userController.getUserById);

module.exports = router;