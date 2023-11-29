import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    is_teacher: false,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

 
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
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

    if (!formData.email) {
      setError('Informe um e-mail válido.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          is_teacher: formData.is_teacher,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Cadastro realizado com sucesso!');
      } else {
        setError(`Erro ao cadastrar usuário. ${result.message}`);
      }
    } catch (error) {
      setError('Erro ao conectar com a API. Verifique sua conexão com a internet.');
    }
  };

  return (
    <div class="Tentativa">
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
        Você é um professor? Se sim, clique no botão abaixo!
        <br />
        <input
          type="checkbox"
          name="is_teacher"
          checked={formData.is_teacher}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Cadastrar-se</button>

      <p class="alinha">
        Já possui conta?{' '}
        <Link to="/login" className="login-link">
          Clique aqui para fazer login
        </Link>
      </p>
    </form>
  </div>
  );
  
};

export default SignupForm;
