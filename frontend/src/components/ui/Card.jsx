import React, { useState } from 'react';
import api from '../../services/api';

const Card = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!formData.recipient || !formData.amount) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create invoice via API
      const invoiceData = {
        recipient: formData.recipient,
        amount: parseFloat(formData.amount),
        description: formData.description
      };
      
      const response = await api.createInvoice(invoiceData);
      console.log('Invoice created:', response);
      
      // Call parent onSubmit handler
      if (onSubmit) {
        onSubmit(response);
      }
      
      // Reset form
      setFormData({ recipient: '', amount: '', description: '' });
      alert('Invoice created successfully!');
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Failed to create invoice. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h3>Create New Invoice</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipient">Recipient Address:</label>
          <input
            type="text"
            id="recipient"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter recipient's Cardano address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount (ADA):</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            step="0.000001"
            required
            className="form-input"
            placeholder="Enter amount in ADA"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="form-textarea"
            placeholder="Enter invoice description"
          />
        </div>
        <button 
          type="submit" 
          className="button button-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Invoice'}
        </button>
      </form>
    </div>
  );
};

export default Card;