import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check if wallet is already connected
  useEffect(() => {
    const storedWallet = localStorage.getItem('connectedWallet');
    const storedAddress = localStorage.getItem('walletAddress');
    if (storedWallet && storedAddress) {
      setWallet(storedWallet);
      setWalletAddress(storedAddress);
    }
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // In a real app, this would connect to the Cardano wallet
      // For now, we'll simulate a connection
      const mockAddress = 'addr1q9gv6...example';
      setWallet('lace');
      setWalletAddress(mockAddress);
      localStorage.setItem('connectedWallet', 'lace');
      localStorage.setItem('walletAddress', mockAddress);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setWalletAddress(null);
    setBalance(null);
    localStorage.removeItem('connectedWallet');
    localStorage.removeItem('walletAddress');
  };

  const value = {
    wallet,
    walletAddress,
    balance,
    isConnecting,
    connectWallet,
    disconnectWallet
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;