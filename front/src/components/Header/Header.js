// src/components/Header/Header.js
import React from 'react';
import './Header.css'; // Importe o arquivo CSS

const Header = ({ onAddClassroomClick, onHomePageClick, onLoginClick }) => {
  return (
    <div className="header">
      <button onClick={onAddClassroomClick}>Criar Sala de Aula</button>
      <h1 onClick={onHomePageClick}>Virtual Classmaster</h1>
      <button onClick={onLoginClick}>Login</button>
    </div>
  );
};

export default Header;
