// src/App.js
import React, { useState } from 'react';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import ClassroomForm from './components/ClassroomForm/ClassroomForm';
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignupForm/SignupForm';
import './App.css'; // Estilos globais

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleAddClassroomClick = () => {
    setCurrentPage('classroomForm');
  };

  const handleHomePageClick = () => {
    setCurrentPage('home');
  };

  const handleLoginClick = () => {
    setCurrentPage('login');
  };

  const handleSignupClick = () => {
    setCurrentPage('signup');
  };

  return (
    <div className="App">
      <Header
        onAddClassroomClick={handleAddClassroomClick}
        onHomePageClick={handleHomePageClick}
        onLoginClick={handleLoginClick}
      />

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'classroomForm' && <ClassroomForm />}
      {currentPage === 'login' && <LoginForm onSignupClick={handleSignupClick} />}
      {currentPage === 'signup' && <SignupForm />}
    </div>
  );
}

export default App;
