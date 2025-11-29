import React from 'react';
import WalletConnectButton from '../components/wallet/WalletConnectButton';

const Wallet = () => {
  return (
    <div className="wallet-page">
      <h2>Wallet</h2>
      <WalletConnectButton />
      <div className="wallet-info">
        <p>Connect your Cardano wallet to view your balance and transaction history.</p>
      </div>
    </div>
  );
};

export default Wallet;