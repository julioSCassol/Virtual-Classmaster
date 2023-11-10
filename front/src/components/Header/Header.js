// src/components/Header/Header.js
import React from 'react';
import './Header.css'; // Estilos específicos do Header

const Header = ({ onAddClassroomClick, onHomePageClick }) => {
  return (
    <div className="header">
      <h1 onClick={onHomePageClick}>Virtual Classmaster</h1>
      <button onClick={onAddClassroomClick}>Criar Sala de Aula</button>
    </div>
  );
};

export default Header;
