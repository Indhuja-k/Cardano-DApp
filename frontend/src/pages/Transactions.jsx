import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Transactions = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch invoices from backend
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const data = await api.getInvoices();
        setInvoices(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching invoices:', err);
        setError('Failed to load invoices. Please ensure the backend server is running and connected to the database.');
        
        // Set some mock data for demonstration purposes when backend is not available
        setInvoices([
          {
            id: '1',
            invoice_id: 'INV-001',
            recipient_address: 'addr1q9g...xyz',
            amount_ada: '150.00',
            description: 'Sample invoice for testing',
            status: 'pending',
            created_at: Date.now() - 86400000 // 1 day ago
          },
          {
            id: '2',
            invoice_id: 'INV-002',
            recipient_address: 'addr1q8h...abc',
            amount_ada: '75.50',
            description: 'Another test invoice',
            status: 'paid',
            created_at: Date.now() - 172800000 // 2 days ago
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) {
    return (
      <div className="transactions">
        <h2>Recent Transactions</h2>
        <p>Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="transactions">
      <h2>Recent Transactions</h2>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <p>Displaying sample data:</p>
        </div>
      )}
      
      {invoices.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <table className="invoices-table card">
          <thead>
            <tr>
              <th>ID</th>
              <th>Recipient</th>
              <th>Amount (ADA)</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoice_id}</td>
                <td className="recipient-cell">{invoice.recipient_address}</td>
                <td className="amount-cell">{invoice.amount_ada}</td>
                <td className="description-cell">{invoice.description || 'No description'}</td>
                <td>
                  <span className={`status status-${invoice.status}`}>
                    {invoice.status}
                  </span>
                </td>
                <td>{new Date(invoice.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;