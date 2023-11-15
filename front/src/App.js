import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import CreateClassroomPage from './components/CreateClassroomPage/CreateClassroomPage';
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignupForm/SignupForm'; // Importe o componente de cadastro
import './App.css';

function App() {
  const handleAddClassroomClick = () => {
    window.location.href = '/create-classroom';
  };

  const handleHomePageClick = () => {
    window.location.href = '/';
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleSignupClick = () => {
    console.log('Clicou em cadastrar');
    // Redirecione para a página de cadastro
    window.location.href = '/signup';
  };
  

  return (
    <Router>
      <div className="App">
        <Header
          onAddClassroomClick={handleAddClassroomClick}
          onHomePageClick={handleHomePageClick}
          onLoginClick={handleLoginClick}
          onSignupClick={handleSignupClick} // Adicionado evento de clique para cadastro
        />

        <Routes>
          <Route path="/create-classroom" element={<CreateClassroomPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
