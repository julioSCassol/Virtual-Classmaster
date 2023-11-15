// src/components/LoginForm/LoginForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ onSignupClick, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const setSuccess = (message) => {
    setSuccessMessage(message);
    setErrorMessage('');
  };

  const setError = (message) => {
    setErrorMessage(message);
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Lógica de login (substitua com sua lógica)

      // Se a operação for bem-sucedida:
      setSuccess('Login bem-sucedido!');
      onLoginSuccess();
    } catch (error) {
      // Se ocorrer um erro:
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <label>
            E-mail:
            <br />
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>

          <label>
            Senha:
            <br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        <p>
          Não possui conta?{' '}
          <Link to="/signup" className="signup-link">
            <button className="signup-button">Clique aqui para cadastrar-se</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
