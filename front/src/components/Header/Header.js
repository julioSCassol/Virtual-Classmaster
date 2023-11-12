// src/components/Header/Header.js
import React from 'react';
import './Header.css'; // Importe o arquivo CSS

const Header = ({ onAddClassroomClick, onHomePageClick, onSignupFormClick }) => {
  return (
    <div className="header">
      <h1 onClick={onHomePageClick}>Virtual Classmaster</h1>
      <div>
        <button onClick={onAddClassroomClick}>Criar Sala de Aula</button>
        <button onClick={onSignupFormClick}>Cadastrar-se</button>
      </div>
    </div>
  );
};

export default Header;
