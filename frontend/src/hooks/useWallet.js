import { useState, useEffect } from 'react';
import walletService from '../services/wallet';
import WalletContext from '../context/WalletContext';

const useWallet = () => {
  // In a real implementation, this would use the context
  // For now, we'll provide a simplified version
  
  const [wallet, setWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Check for available wallets
  const availableWallets = walletService.getAvailableWallets();

  // Connect to a wallet
  const connectWallet = async (walletName) => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const walletInstance = await walletService.connect(walletName);
      setWallet(walletInstance);
      
      // Get wallet address
      const address = await walletService.getAddress(walletInstance);
      setWalletAddress(address);
      
      // Get wallet balance
      const balance = await walletService.getBalance(walletInstance);
      setBalance(balance);
      
      return walletInstance;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet(null);
    setWalletAddress(null);
    setBalance(null);
    setError(null);
  };

  return {
    wallet,
    walletAddress,
    balance,
    isConnecting,
    error,
    availableWallets,
    connectWallet,
    disconnectWallet,
  };
};

export default useWallet;