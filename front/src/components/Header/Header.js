// src/components/Header/Header.js
import React from 'react';
import { useAuth } from '../../AuthContext';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ onLoginClick }) => {
  const { user } = useAuth();
  const isTeacher = user ? user.isTeacher : false; // Verifique se user não é null antes de destruturar
  const location = useLocation();

  const homepagePath = isTeacher ? '/professor-home' : '/aluno-home';

  const handleHomepageClick = () => {
    if (user) {
      if (location.pathname === homepagePath) {
        alert('Você já está na HomePage.');
      } else {
        window.location.href = homepagePath;
      }
    } else {
      alert('Você não está registrado. Faça o login para acessar a HomePage.');
    }
  };

  return (
    <div className="header">
      <h1>Virtual Classmaster</h1>
      <div className="header-buttons">
        <button onClick={handleHomepageClick}>Ir para a HomePage</button>
        <button onClick={onLoginClick}>Login</button>
      </div>
    </div>
  );
};

export default Header;
