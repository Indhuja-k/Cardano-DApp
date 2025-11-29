// Invoice model for Cardano DApp
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Invoice {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.invoice_id = data.invoice_id;
    this.recipient_address = data.recipient_address;
    this.amount_lovelace = data.amount_lovelace;
    this.amount_ada = data.amount_ada;
    this.currency = data.currency;
    this.description = data.description;
    this.metadata = data.metadata ? JSON.stringify(data.metadata) : null;
    this.status = data.status || "pending";
    this.tx_hash = data.tx_hash;
    this.created_at = data.created_at || Date.now();
    this.paid_at = data.paid_at;
  }

  // Save invoice to database
  static async save(invoice) {
    try {
      const query = `
        INSERT INTO invoices (
          id, invoice_id, recipient_address, amount_lovelace, amount_ada,
          currency, description, metadata, status, tx_hash, created_at, paid_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const values = [
        invoice.id,
        invoice.invoice_id,
        invoice.recipient_address,
        invoice.amount_lovelace,
        invoice.amount_ada,
        invoice.currency,
        invoice.description,
        invoice.metadata,
        invoice.status,
        invoice.tx_hash,
        invoice.created_at,
        invoice.paid_at
      ];
      
      const [result] = await db.execute(query, values);
      return result;
    } catch (error) {
      console.error("Error saving invoice:", error);
      throw error;
    }
  }

  // Find all invoices
  static async findAll() {
    try {
      const [rows] = await db.execute("SELECT * FROM invoices ORDER BY created_at DESC");
      return rows.map(row => new Invoice({
        ...row,
        metadata: row.metadata ? JSON.parse(row.metadata) : null
      }));
    } catch (error) {
      console.error("Error fetching invoices:", error);
      throw error;
    }
  }

  // Find invoice by ID
  static async findById(id) {
    try {
      const [rows] = await db.execute("SELECT * FROM invoices WHERE id = ?", [id]);
      if (rows.length === 0) return null;
      
      const row = rows[0];
      return new Invoice({
        ...row,
        metadata: row.metadata ? JSON.parse(row.metadata) : null
      });
    } catch (error) {
      console.error("Error fetching invoice:", error);
      throw error;
    }
  }

  // Find invoice by invoice_id
  static async findByInvoiceId(invoiceId) {
    try {
      const [rows] = await db.execute("SELECT * FROM invoices WHERE invoice_id = ?", [invoiceId]);
      if (rows.length === 0) return null;
      
      const row = rows[0];
      return new Invoice({
        ...row,
        metadata: row.metadata ? JSON.parse(row.metadata) : null
      });
    } catch (error) {
      console.error("Error fetching invoice:", error);
      throw error;
    }
  }

  // Update invoice
  static async update(id, data) {
    try {
      const updates = [];
      const values = [];
      
      for (const [key, value] of Object.entries(data)) {
        if (key !== 'id') {
          updates.push(`${key} = ?`);
          values.push(value);
        }
      }
      
      if (updates.length === 0) return null;
      
      values.push(id);
      const query = `UPDATE invoices SET ${updates.join(', ')} WHERE id = ?`;
      
      const [result] = await db.execute(query, values);
      return result;
    } catch (error) {
      console.error("Error updating invoice:", error);
      throw error;
    }
  }

  // Delete invoice
  static async delete(id) {
    try {
      const [result] = await db.execute("DELETE FROM invoices WHERE id = ?", [id]);
      return result;
    } catch (error) {
      console.error("Error deleting invoice:", error);
      throw error;
    }
  }
}

module.exports = Invoice;