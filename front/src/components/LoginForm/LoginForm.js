// src/components/LoginForm/LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ onSignupClick }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica de login (substitua com sua lógica)
    try {
      const response = await fetch('sua-api-endpoint/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Usuário autenticado com sucesso!');
      } else {
        console.error('Erro ao autenticar usuário');
      }
    } catch (error) {
      console.error('Erro ao conectar com a API', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          E-mail:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Senha:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Não possui conta?{' '}
        <button onClick={onSignupClick}>Clique aqui para cadastrar-se</button>
      </p>
    </div>
  );
};

export default LoginForm;
