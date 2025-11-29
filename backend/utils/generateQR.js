// Utility function to generate QR codes for Cardano DApp

/**
 * Generate a QR code for a Cardano payment
 * @param {string} address - Recipient's Cardano address
 * @param {number} amount - Amount in ADA
 * @param {string} description - Payment description
 * @param {string} label - Label for the payment
 * @returns {string} - QR code data URL or URI
 */
function generatePaymentQR(address, amount, description = '', label = '') {
  // Cardano payment URI format
  let uri = `web+cardano://addr/${address}`;
  
  const params = [];
  if (amount) params.push(`amount=${amount}`);
  if (description) params.push(`message=${encodeURIComponent(description)}`);
  if (label) params.push(`label=${encodeURIComponent(label)}`);
  
  if (params.length > 0) {
    uri += '?' + params.join('&');
  }
  
  // In a real implementation, you would use a library like 'qrcode' to generate an actual QR code
  // For now, we'll return the URI which can be used with a QR code generator
  return uri;
}

/**
 * Generate a QR code for a Cardano invoice
 * @param {Object} invoice - Invoice object
 * @returns {string} - QR code data URL or URI
 */
function generateInvoiceQR(invoice) {
  const { recipient, amount, description, id } = invoice;
  
  // Create a more detailed URI for invoices
  let uri = `web+cardano://addr/${recipient}`;
  
  const params = [];
  if (amount) params.push(`amount=${amount}`);
  if (description) params.push(`message=${encodeURIComponent(description)}`);
  if (id) params.push(`invoice=${encodeURIComponent(id)}`);
  
  if (params.length > 0) {
    uri += '?' + params.join('&');
  }
  
  return uri;
}

/**
 * Generate a QR code for wallet connection
 * @param {string} dAppUrl - URL of the dApp
 * @param {string} dAppName - Name of the dApp
 * @returns {string} - QR code data URL or URI
 */
function generateWalletConnectionQR(dAppUrl, dAppName = '') {
  // Wallet connection URI format (simplified)
  let uri = `web+cardano://connect`;
  
  const params = [];
  if (dAppUrl) params.push(`callback=${encodeURIComponent(dAppUrl)}`);
  if (dAppName) params.push(`name=${encodeURIComponent(dAppName)}`);
  
  if (params.length > 0) {
    uri += '?' + params.join('&');
  }
  
  return uri;
}

module.exports = {
  generatePaymentQR,
  generateInvoiceQR,
  generateWalletConnectionQR
};