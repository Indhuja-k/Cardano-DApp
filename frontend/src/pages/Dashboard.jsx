import React from 'react';
import WalletConnectButton from '../components/wallet/WalletConnectButton';
import Card from '../components/ui/Card';
import QRCodeGenerator from '../components/ui/QRCodeGenerator';

const Dashboard = () => {
  const handleInvoiceSubmit = (invoiceData) => {
    console.log('Invoice submitted:', invoiceData);
    // In a real app, this would send the data to a backend API
    alert('Invoice created successfully!');
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <WalletConnectButton />
      
      <div className="dashboard-grid">
        <div className="dashboard-item">
          <Card onSubmit={handleInvoiceSubmit} />
        </div>
        
        <div className="dashboard-item">
          <QRCodeGenerator />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;