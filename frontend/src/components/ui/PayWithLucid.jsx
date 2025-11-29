import React, { useState } from 'react';

const PayWithLucid = ({ invoice, onPaymentSuccess, onPaymentError }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('Initializing payment...');

    try {
      // Check if Lucid is available
      if (!window.lucid) {
        throw new Error('Lucid wallet not found. Please install a compatible Cardano wallet.');
      }

      // Initialize Lucid
      const lucid = await window.lucid;
      await lucid.selectWallet();

      // Create the payment transaction
      const tx = await lucid
        .newTx()
        .payToAddress(invoice.recipient, {
          lovelace: BigInt(Math.round(invoice.amount * 1000000))
        })
        .complete();

      // Sign and submit the transaction
      setPaymentStatus('Signing transaction...');
      const signedTx = await tx.sign().complete();
      
      setPaymentStatus('Submitting transaction...');
      const txHash = await signedTx.submit();
      
      setPaymentStatus(`Payment successful! Transaction: ${txHash}`);
      onPaymentSuccess(txHash);
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus(`Payment failed: ${error.message}`);
      onPaymentError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pay-with-lucid card">
      <h3>Pay with Lucid</h3>
      
      {invoice ? (
        <div className="payment-details">
          <div className="invoice-summary">
            <h4>Invoice Summary</h4>
            <p><strong>Recipient:</strong> {invoice.recipient.substring(0, 10)}...{invoice.recipient.substring(invoice.recipient.length - 8)}</p>
            <p><strong>Amount:</strong> {invoice.amount} ADA</p>
            <p><strong>Description:</strong> {invoice.description || 'No description'}</p>
          </div>
          
          <button 
            onClick={handlePayment} 
            disabled={isProcessing}
            className="button button-primary"
          >
            {isProcessing ? 'Processing...' : `Pay ${invoice.amount} ADA`}
          </button>
          
          {paymentStatus && (
            <div className="payment-status">
              {paymentStatus}
            </div>
          )}
        </div>
      ) : (
        <p>No invoice selected for payment</p>
      )}
      
      <div className="lucid-info">
        <h4>About Lucid</h4>
        <p>Lucid is a library for interacting with Cardano. To make payments, you need:</p>
        <ul>
          <li>A Cardano wallet extension (like Lace, Flint, or Nami)</li>
          <li>Sufficient ADA in your wallet</li>
          <li>The wallet connected to this dApp</li>
        </ul>
      </div>
    </div>
  );
};

export default PayWithLucid;