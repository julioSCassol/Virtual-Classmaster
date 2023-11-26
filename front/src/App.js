// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import CreateClassroomPage from './components/CreateClassroomPage/CreateClassroomPage';
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignupForm/SignupForm';
import AlunoHomePage from './components/HomePage/AlunoHomePage';
import ProfessorHomePage from './components/HomePage/ProfessorHomePage';

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
    window.location.href = '/signup';
  };

  return (
    <Router>
      <div className="App">
        <Header
          onAddClassroomClick={handleAddClassroomClick}
          onHomePageClick={handleHomePageClick}
          onLoginClick={handleLoginClick}
          onSignupClick={handleSignupClick}
        />

        <Routes>
          <Route path="/create-classroom" element={<CreateClassroomPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/aluno-home" element={<AlunoHomePage />} />
          <Route path="/professor-home" element={<ProfessorHomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
