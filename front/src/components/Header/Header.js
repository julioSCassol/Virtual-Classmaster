// src/components/Header/Header.js
import React from 'react';
import { useAuth } from '../../AuthContext';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ onLoginClick }) => {
  const { user } = useAuth();
  const isTeacher = user ? user.isTeacher : false; // Verifique se user não é null antes de destruturar

  const homepagePath = isTeacher ? '/professor-home' : '/aluno-home';

  return (
    <div className="header">
      <h1>Virtual Classmaster</h1>
      <div className="header-buttons">
        <Link to={homepagePath} className="homepage-link">
          <button>Ir para a HomePage</button>
        </Link>
        <button onClick={onLoginClick}>Login</button>
      </div>
    </div>
  );
};

export default Header;
