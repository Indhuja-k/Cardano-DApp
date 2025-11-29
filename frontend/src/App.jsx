import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Wallet from './pages/Wallet';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { WalletProvider } from './context/WalletContext';
import './styles/globals.css';
import './styles/layout.css';

function App() {
  return (
    <Router>
      <WalletProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </WalletProvider>
    </Router>
  );
}

export default App;