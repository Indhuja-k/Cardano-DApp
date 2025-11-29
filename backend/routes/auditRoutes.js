// Audit routes for Cardano DApp
const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');

// Log an action
router.post('/', auditController.logAction);

// Get audit logs by user ID
router.get('/user/:userId', auditController.getLogsByUser);

// Get audit logs by action type
router.get('/action/:action', auditController.getLogsByAction);

// Get audit logs within a date range
router.get('/date-range', auditController.getLogsByDateRange);

module.exports = router;