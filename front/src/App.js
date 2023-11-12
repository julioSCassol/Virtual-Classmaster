// src/App.js
import React, { useState } from 'react';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import ClassroomForm from './components/ClassroomForm/ClassroomForm';
import SignupForm from './components/SignupForm/SignupForm'; // Adicionando o formulário de cadastro
import './App.css'; // Estilos globais

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleAddClassroomClick = () => {
    setCurrentPage('classroomForm');
  };

  const handleHomePageClick = () => {
    setCurrentPage('home');
  };

  const handleSignupFormClick = () => {
    setCurrentPage('signupForm');
  };

  return (
    <div className="App">
      <Header
        onAddClassroomClick={handleAddClassroomClick}
        onHomePageClick={handleHomePageClick}
        onSignupFormClick={handleSignupFormClick} // Adicionando a função para exibir o formulário de cadastro
      />

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'classroomForm' && <ClassroomForm />}
      {currentPage === 'signupForm' && <SignupForm />} {/* Adicionando o formulário de cadastro */}
    </div>
  );
}

export default App;
