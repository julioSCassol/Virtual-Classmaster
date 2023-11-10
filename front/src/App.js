// src/App.js
import React, { useState } from 'react';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import ClassroomForm from './components/ClassroomForm/ClassroomForm';
import './App.css'; // Estilos globais

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleAddClassroomClick = () => {
    setCurrentPage('classroomForm');
  };

  const handleHomePageClick = () => {
    setCurrentPage('home');
  };

  return (
    <div className="App">
      <Header
        onAddClassroomClick={handleAddClassroomClick}
        onHomePageClick={handleHomePageClick}
      />

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'classroomForm' && <ClassroomForm />}
    </div>
  );
}

export default App;
