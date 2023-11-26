// src/components/Header/Header.js
import React from 'react';
import './Header.css'; // Importe o arquivo CSS

const Header = ({ onHomePageClick, onLoginClick }) => {
  return (
    <div className="header">
      <h1 onClick={onHomePageClick}>Virtual Classmaster</h1>
      <button onClick={onLoginClick}>Login</button>
    </div>
  );
};

export default Header;
