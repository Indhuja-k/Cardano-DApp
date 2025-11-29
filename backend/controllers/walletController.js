// Wallet controller for Cardano DApp
const WalletSession = require('../models/WalletSession');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

// Connect wallet
async function connectWallet(req, res) {
  try {
    const { walletAddress, userId } = req.body;
    
    // Validate input
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }
    
    // Create or update user
    let user = await User.findByWalletAddress(walletAddress);
    if (!user) {
      user = new User(
        null,
        walletAddress,
        null, // email
        new Date()
      );
      user = await User.save(user);
    }
    
    // Create wallet session
    const session = new WalletSession(
      null,
      user.id,
      walletAddress,
      generateSessionToken(), // Generate a unique token
      new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
      new Date()
    );
    
    const savedSession = await WalletSession.create(session);
    
    // Log the action
    const auditLog = new AuditLog(
      null,
      user.id,
      'wallet_connect',
      req.ip,
      req.get('User-Agent'),
      { walletAddress },
      new Date()
    );
    await AuditLog.logAction(auditLog);
    
    res.status(201).json({
      message: 'Wallet connected successfully',
      session: savedSession,
      user: user
    });
  } catch (error) {
    console.error('Error connecting wallet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Disconnect wallet
async function disconnectWallet(req, res) {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    
    const deleted = await WalletSession.delete(sessionId);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    res.json({ message: 'Wallet disconnected successfully' });
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get wallet sessions for user
async function getUserSessions(req, res) {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const sessions = await WalletSession.findByUserId(userId);
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching wallet sessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Generate a simple session token (in production, use a more secure method)
function generateSessionToken() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

module.exports = {
  connectWallet,
  disconnectWallet,
  getUserSessions
};