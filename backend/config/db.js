const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cardano_dapp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Add these for better compatibility
  timezone: '+00:00',
  charset: 'utf8mb4'
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Database connected successfully');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Initialize database tables
async function initializeDatabase() {
  // First test connection
  const isConnected = await testConnection();
  if (!isConnected) {
    console.log('Skipping database initialization due to connection failure');
    return;
  }

  let connection;
  try {
    connection = await pool.getConnection();
    
    // Create invoices table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS invoices (
        id VARCHAR(36) PRIMARY KEY,
        invoice_id VARCHAR(50) UNIQUE,
        recipient_address TEXT NOT NULL,
        amount_lovelace BIGINT NOT NULL,
        amount_ada DECIMAL(10, 6) NOT NULL,
        currency VARCHAR(10) NOT NULL,
        description TEXT,
        metadata TEXT,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        tx_hash VARCHAR(255),
        created_at BIGINT NOT NULL,
        paid_at BIGINT,
        INDEX idx_invoice_id (invoice_id),
        INDEX idx_status (status)
      )
    `);
    
    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        wallet_address VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255),
        created_at BIGINT NOT NULL,
        INDEX idx_wallet_address (wallet_address)
      )
    `);
    
    // Create payments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS payments (
        id VARCHAR(36) PRIMARY KEY,
        invoice_id VARCHAR(36) NOT NULL,
        sender_address VARCHAR(255) NOT NULL,
        receiver_address VARCHAR(255) NOT NULL,
        amount_lovelace BIGINT NOT NULL,
        amount_ada DECIMAL(10, 6) NOT NULL,
        transaction_hash VARCHAR(255),
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        created_at BIGINT NOT NULL,
        FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
      )
    `);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Initialize the database when the module is loaded
initializeDatabase();

module.exports = pool;