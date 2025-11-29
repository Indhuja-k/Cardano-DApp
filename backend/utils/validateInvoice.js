function validateInvoicePayload(payload) {
  // required: recipient (string), amountAda (number > 0)
  if (!payload) return { valid: false, error: "Missing payload" };
  if (!payload.recipient || typeof payload.recipient !== "string") {
    return { valid: false, error: "Invalid recipient address" };
  }
  const amountAda = Number(payload.amountAda);
  if (!amountAda || isNaN(amountAda) || amountAda <= 0) {
    return { valid: false, error: "Invalid amountAda (must be > 0)" };
  }
  return { valid: true };
}

module.exports = { validateInvoicePayload };
