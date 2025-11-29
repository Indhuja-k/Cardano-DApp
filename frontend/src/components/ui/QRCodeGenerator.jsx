import React, { useState } from 'react';

const QRCodeGenerator = ({ invoice = null }) => {
  const [data, setData] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [size, setSize] = useState('200x200');

  // If an invoice is provided, use its data as default
  React.useEffect(() => {
    if (invoice) {
      const invoiceData = `addr:${invoice.recipient};amount:${invoice.amount};desc:${invoice.description || ''}`;
      setData(invoiceData);
    }
  }, [invoice]);

  const generateQRCode = () => {
    let qrData = data;
    
    if (!qrData.trim()) {
      if (invoice) {
        qrData = `addr:${invoice.recipient};amount:${invoice.amount};desc:${invoice.description || ''}`;
      } else {
        alert('Please enter data to generate QR code');
        return;
      }
    }
    
    // In a real app, you would use a library like qrcode.react
    // For now, we'll simulate with a placeholder
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=${size}`);
  };

  const downloadQRCode = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'payment-qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="qr-generator card">
      <h3>Generate Payment QR Code</h3>
      
      {invoice && (
        <div className="invoice-info">
          <h4>Invoice Details</h4>
          <p><strong>Recipient:</strong> {invoice.recipient.substring(0, 15)}...</p>
          <p><strong>Amount:</strong> {invoice.amount} ADA</p>
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="qrData">Payment Data:</label>
        <textarea
          id="qrData"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter payment address or invoice data"
          rows="3"
          className="form-textarea"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="qrSize">QR Code Size:</label>
        <select 
          id="qrSize" 
          value={size} 
          onChange={(e) => setSize(e.target.value)}
          className="form-select"
        >
          <option value="100x100">100x100</option>
          <option value="200x200">200x200</option>
          <option value="300x300">300x300</option>
          <option value="400x400">400x400</option>
        </select>
      </div>
      
      <div className="qr-buttons">
        <button onClick={generateQRCode} className="button button-primary">Generate QR Code</button>
        {qrCode && (
          <button onClick={downloadQRCode} className="button button-success">Download QR Code</button>
        )}
      </div>
      
      {qrCode && (
        <div className="qr-result">
          <h4>QR Code:</h4>
          <img src={qrCode} alt="Generated QR Code" className="qr-image" />
          <p>Scan this QR code to make a payment</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;