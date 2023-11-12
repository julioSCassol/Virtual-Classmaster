// src/components/SignupForm.js
import React, { useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'student', // Valor padrão para estudante
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

    // Enviar dados para a API (substitua com sua lógica)
    try {
      const response = await fetch('sua-api-endpoint/cadastrar-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Usuário cadastrado com sucesso!');
      } else {
        console.error('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro ao conectar com a API', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
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
      <label>
        Você é um:
        <select name="userType" value={formData.userType} onChange={handleChange}>
          <option value="student">Estudante</option>
          <option value="teacher">Professor</option>
        </select>
      </label>
      <br />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default SignupForm;
