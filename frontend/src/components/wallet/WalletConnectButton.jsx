import React, { useState, useEffect } from "react";
import { useWallet } from '../../context/WalletContext';

export default function WalletConnectButton() {
  const { wallet, walletAddress, isConnecting, connectWallet, disconnectWallet } = useWallet();
  const [error, setError] = useState(null);
  const [walletAvailable, setWalletAvailable] = useState(false);

  // Check if Cardano wallet is available
  useEffect(() => {
    const checkWallet = () => {
      // Check for Cardano object in window
      if (typeof window !== 'undefined' && window.cardano) {
        console.log("Available Cardano wallets:", Object.keys(window.cardano));
        // Check specifically for Lace wallet
        if (window.cardano.lace) {
          setWalletAvailable(true);
          console.log("Lace wallet detected");
        }
      } else {
        console.log("No Cardano wallets detected");
      }
    };

    // Check immediately
    checkWallet();
    
    // Also check after a delay in case wallet loads after page
    const timer = setTimeout(checkWallet, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleConnect = async () => {
    try {
      setError(null);
      await connectWallet('lace');
    } catch (err) {
      console.error("Wallet connection failed:", err);
      setError(err.message || "Failed to connect wallet. Check console for details.");
    }
  };

  return (
    <div className="wallet-connector card">
      <h2>Cardano Wallet Connector</h2>
      
      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {!walletAvailable && (
        <div className="warning-message">
          <strong>Note:</strong> Lace wallet not detected. Please install the{' '}
          <a href="https://www.lace.io/" target="_blank" rel="noopener noreferrer">
            Lace browser extension
          </a>{' '}
          and refresh the page.
        </div>
      )}
      
      {wallet ? (
        <div className="wallet-connected">
          <p className="success-message">✅ Wallet connected successfully</p>
          <div className="wallet-info">
            <p><strong>Address:</strong> {walletAddress}</p>
          </div>
          <button 
            onClick={disconnectWallet}
            className="button button-secondary"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div className="wallet-disconnected">
          <p>{isConnecting ? "Connecting to wallet..." : "Wallet not connected"}</p>
          <button 
            onClick={handleConnect} 
            className="button button-primary"
            disabled={isConnecting || !walletAvailable}
          >
            {isConnecting ? "Connecting..." : "Connect Lace Wallet"}
          </button>
          {!walletAvailable && (
            <p className="wallet-unavailable">
              Wallet not available. Please install the Lace extension.
            </p>
          )}
        </div>
      )}
      
      <div className="instructions">
        <p><strong>Instructions:</strong> Make sure you have the Lace wallet extension installed and are on the Preview Testnet.</p>
      </div>
    </div>
  );
}