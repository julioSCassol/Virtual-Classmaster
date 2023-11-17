// src/components/SignupForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'student',
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

    // Verificar se pelo menos o e-mail está presente
    if (!formData.email) {
      setError('Informe um e-mail válido.');
      return;
    }

    try {
      // Enviar dados para a API (substitua com sua lógica)

      // Se a operação for bem-sucedida:
      setSuccess('Cadastro realizado com sucesso!');
    } catch (error) {
      // Se ocorrer um erro:
      setError('Erro ao cadastrar usuário. Verifique seus dados.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <label>
        Nome:
        <br />
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>

      <label>
        E-mail:
        <br />
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>

      <label>
        Senha:
        <br />
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>

      <label>
        Você é um:
        <br />
        <select name="userType" value={formData.userType} onChange={handleChange}>
          <option value="student">Estudante</option>
          <option value="teacher">Professor</option>
        </select>
      </label>

      <button type="submit">Cadastrar</button>

      <p>
        Já possui conta?{' '}
        <Link to="/login" className="login-link">
            Clique aqui para fazer login
          </Link>
      </p>
    </form>
  );
};

export default SignupForm;
