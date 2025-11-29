import React from 'react';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <h1>Cardano DApp</h1>
      </div>
      <div className="topbar-right">
        {/* Wallet connection removed from topbar */}
      </div>
    </div>
  );
};

export default Topbar;