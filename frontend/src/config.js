// Configuration file for the Cardano DApp

const config = {
  // API configuration
  API: {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api',
    TIMEOUT: 10000, // 10 seconds
  },

  // Wallet configuration
  WALLET: {
    DEFAULT_WALLET: 'lace',
    SUPPORTED_WALLETS: ['lace', 'flint', 'nami'],
    AUTO_CONNECT: true,
  },

  // Cardano network configuration
  NETWORK: {
    // 'mainnet' or 'testnet'
    NAME: process.env.REACT_APP_NETWORK || 'testnet',
    // Network ID (0 for testnet, 1 for mainnet)
    ID: process.env.REACT_APP_NETWORK_ID || 0,
  },

  // Currency configuration
  CURRENCY: {
    SYMBOL: '₳',
    NAME: 'ADA',
    DECIMALS: 6,
    // Lovelace is the smallest unit (1 ADA = 1,000,000 Lovelace)
    LOVELACE_FACTOR: 1000000,
  },

  // UI configuration
  UI: {
    THEME: 'light', // 'light' or 'dark'
    DATE_FORMAT: 'MMM d, yyyy h:mm a',
    ITEMS_PER_PAGE: 10,
  },

  // Feature flags
  FEATURES: {
    ENABLE_QR_CODE: true,
    ENABLE_INVOICE_CREATION: true,
    ENABLE_WALLET_CONNECTION: true,
    ENABLE_TRANSACTION_HISTORY: true,
  },

  // Timeout configurations
  TIMEOUTS: {
    WALLET_CONNECTION: 30000, // 30 seconds
    API_REQUEST: 10000, // 10 seconds
    REFRESH_INTERVAL: 30000, // 30 seconds
  },
};

export default config;