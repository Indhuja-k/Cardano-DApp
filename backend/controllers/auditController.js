// Audit controller for Cardano DApp
const AuditLog = require('../models/AuditLog');

// Log an action
async function logAction(req, res) {
  try {
    const { userId, action, details } = req.body;
    
    // Validate input
    if (!action) {
      return res.status(400).json({ error: 'Action is required' });
    }
    
    // Create audit log entry
    const auditLog = new AuditLog(
      null,
      userId || null,
      action,
      req.ip,
      req.get('User-Agent'),
      details || {},
      new Date()
    );
    
    const savedLog = await AuditLog.logAction(auditLog);
    res.status(201).json(savedLog);
  } catch (error) {
    console.error('Error logging action:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get audit logs by user ID
async function getLogsByUser(req, res) {
  try {
    const { userId } = req.params;
    const { limit } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const logs = await AuditLog.findByUserId(userId, parseInt(limit) || 50);
    res.json(logs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get audit logs by action type
async function getLogsByAction(req, res) {
  try {
    const { action } = req.params;
    const { limit } = req.query;
    
    if (!action) {
      return res.status(400).json({ error: 'Action type is required' });
    }
    
    const logs = await AuditLog.findByAction(action, parseInt(limit) || 50);
    res.json(logs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get audit logs within a date range
async function getLogsByDateRange(req, res) {
  try {
    const { startDate, endDate } = req.query;
    const { limit } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }
    
    const logs = await AuditLog.findByDateRange(
      new Date(startDate),
      new Date(endDate),
      parseInt(limit) || 100
    );
    
    res.json(logs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  logAction,
  getLogsByUser,
  getLogsByAction,
  getLogsByDateRange
};