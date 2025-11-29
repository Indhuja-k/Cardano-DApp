# Cardano DApp Project

This is a decentralized application (DApp) built on the Cardano blockchain for managing invoices and payments.

## Project Structure

```
my-cardano-dapp/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WalletConnector.jsx
│   │   │   ├── InvoiceForm.jsx
│   │   │   ├── InvoiceList.jsx
│   │   │   └── QRCodeGenerator.jsx
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── styles.css
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── index.ts (or index.js)
│   │   ├── routes/
│   │   │   └── invoices.ts
│   │   ├── controllers/
│   │   │   └── invoiceController.ts
│   │   ├── db/
│   │   │   └── index.ts
│   │   └── utils/
│   │       └── blockfrost.ts
│   ├── package.json
│   └── tsconfig.json
│
├── contracts/
│   ├── mintPolicy.hs
│   └── escrowValidator.hs
│
└── README.md
```

## Features

1. **Wallet Integration**: Connect to Cardano wallets (Lace, Flint, etc.)
2. **Invoice Management**: Create, view, and manage invoices
3. **QR Code Generation**: Generate payment QR codes for easy transactions
4. **Smart Contracts**: Plutus smart contracts for minting policies and escrow services

## Frontend

The frontend is built with React and Vite, providing a fast and responsive user interface.

### Components

- **WalletConnector**: Handles wallet connection and authentication
- **InvoiceForm**: Form for creating new invoices
- **InvoiceList**: Displays a list of existing invoices
- **QRCodeGenerator**: Generates QR codes for payments

### Getting Started

```bash
cd frontend
npm install
npm run dev
```

## Backend

The backend is built with Node.js, Express, and TypeScript, providing RESTful APIs for the frontend.

### API Endpoints

- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get a specific invoice
- `POST /api/invoices` - Create a new invoice
- `PUT /api/invoices/:id` - Update an invoice
- `DELETE /api/invoices/:id` - Delete an invoice

### Getting Started

```bash
cd backend
npm install
npm run dev
```

## Smart Contracts

The smart contracts are written in Haskell using the Plutus platform.

### Contracts

1. **Minting Policy**: Controls the minting of custom tokens
2. **Escrow Validator**: Implements escrow functionality for secure transactions

## Development

To run the full application:

1. Start the backend server:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Deployment

Instructions for deploying to production would go here.