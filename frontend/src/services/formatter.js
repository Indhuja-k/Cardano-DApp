// Utility functions for formatting ADA, timestamps, etc.

const formatter = {
  // Format ADA amount (convert Lovelace to ADA)
  formatADA: (lovelace) => {
    if (typeof lovelace !== 'number' && typeof lovelace !== 'string') {
      return '0.000000';
    }
    
    const ada = Number(lovelace) / 1000000;
    return ada.toFixed(6);
  },

  // Format currency with ADA symbol
  formatCurrency: (amount) => {
    const ada = formatter.formatADA(amount);
    return `₳${ada}`;
  },

  // Format timestamp to readable date
  formatDate: (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Format wallet address (truncate for display)
  formatWalletAddress: (address, startChars = 10, endChars = 8) => {
    if (!address) return '';
    
    if (address.length <= (startChars + endChars)) {
      return address;
    }
    
    const start = address.substring(0, startChars);
    const end = address.substring(address.length - endChars);
    return `${start}...${end}`;
  },

  // Format transaction status
  formatStatus: (status) => {
    const statusMap = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      failed: 'Failed',
      paid: 'Paid',
    };
    
    return statusMap[status] || status;
  },

  // Format large numbers with commas
  formatNumber: (number) => {
    if (typeof number !== 'number') {
      number = Number(number);
    }
    
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    });
  },
};

export default formatter;