// API service for connecting to the backend
const API_BASE_URL = 'http://localhost:4000/api'; // Assuming your backend runs on port 4000

const api = {
  // Generic request helper
  request: async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        // Handle different error statuses
        if (response.status === 503) {
          throw new Error('Service unavailable. Please ensure the backend server and database are running.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  // User endpoints
  createUser: (userData) => 
    api.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getUserByWallet: (walletAddress) => 
    api.request(`/users/wallet/${walletAddress}`),

  // Invoice endpoints
  getInvoices: () => 
    api.request('/invoices'),

  createInvoice: (invoiceData) => 
    api.request('/invoices', {
      method: 'POST',
      body: JSON.stringify(invoiceData),
    }),

  getInvoice: (id) => 
    api.request(`/invoices/${id}`),

  updateInvoice: (id, invoiceData) => 
    api.request(`/invoices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(invoiceData),
    }),

  deleteInvoice: (id) => 
    api.request(`/invoices/${id}`, {
      method: 'DELETE',
    }),

  // Payment endpoints
  createPayment: (paymentData) => 
    api.request('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    }),

  getPaymentsByInvoice: (invoiceId) => 
    api.request(`/payments/invoice/${invoiceId}`),

  // Wallet endpoints
  connectWallet: (walletData) => 
    api.request('/wallet/connect', {
      method: 'POST',
      body: JSON.stringify(walletData),
    }),

  disconnectWallet: (sessionData) => 
    api.request('/wallet/disconnect', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    }),
};

export default api;