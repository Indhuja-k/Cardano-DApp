// Wallet service for Cardano wallet functions (CIP-30 compliant)
const wallet = {
  // Check if a Cardano wallet is available
  isWalletAvailable: (walletName) => {
    if (typeof window === 'undefined') return false;
    
    // Check for Lace wallet
    if (walletName === 'lace' && window.cardano?.lace) {
      return true;
    }
    
    // Check for Flint wallet
    if (walletName === 'flint' && window.cardano?.flint) {
      return true;
    }
    
    // Check for generic CIP-30 support
    if (window.cardano) {
      return !!window.cardano[walletName];
    }
    
    return false;
  },

  // Get available wallets
  getAvailableWallets: () => {
    if (typeof window === 'undefined' || !window.cardano) return [];
    
    const wallets = [];
    for (const key in window.cardano) {
      if (typeof window.cardano[key].enable === 'function') {
        wallets.push(key);
      }
    }
    
    return wallets;
  },

  // Connect to a wallet
  connect: async (walletName) => {
    try {
      if (!wallet.isWalletAvailable(walletName)) {
        throw new Error(`${walletName} wallet not found`);
      }
      
      const walletInstance = await window.cardano[walletName].enable();
      return walletInstance;
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
      throw error;
    }
  },

  // Get wallet balance
  getBalance: async (walletInstance) => {
    try {
      if (!walletInstance) {
        throw new Error('Wallet not connected');
      }
      
      const balance = await walletInstance.getBalance();
      return balance;
    } catch (error) {
      console.error('Failed to get wallet balance:', error);
      throw error;
    }
  },

  // Get wallet address
  getAddress: async (walletInstance) => {
    try {
      if (!walletInstance) {
        throw new Error('Wallet not connected');
      }
      
      const addresses = await walletInstance.getUsedAddresses();
      return addresses[0]; // Return the first address
    } catch (error) {
      console.error('Failed to get wallet address:', error);
      throw error;
    }
  },

  // Sign data
  signData: async (walletInstance, data) => {
    try {
      if (!walletInstance) {
        throw new Error('Wallet not connected');
      }
      
      const signature = await walletInstance.signData(data);
      return signature;
    } catch (error) {
      console.error('Failed to sign data:', error);
      throw error;
    }
  },
};

export default wallet;