// src/components/LoginForm/LoginForm.js
// Importe os hooks necessários do React Router
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

let userId, username, email, isTeacher;

const LoginForm = ({ onSignupClick, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Use o hook useNavigate para obter a função de navegação
  const navigate = useNavigate();

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
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const qlc = await response.json(); //qlc
        const token = qlc.data
        console.log(token);
        setSuccess('Login bem-sucedido!');

        // Faça uma solicitação para validar o JWT e obter informações do usuário 
        const userResponse = await fetch('http://localhost:5000/user/validateJWT', {
          method: 'GET',
          headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },            
          },
        );

        // userResponse.body.getReader().read().then(({ value, done }) => {
        //   if (!done) {
        //     let decoder = new TextDecoder('utf-8');
        //     console.log(decoder.decode(value));
        //   }
        // });
        
        if (userResponse.ok) {
          const { data } = await userResponse.json();

          [userId, username, email, isTeacher] = data;
          console.log('User ID:', userId);
          console.log('Username:', username);
          console.log('Email:', email);
          console.log('Is Teacher:', isTeacher);
          // console.log(user.data);

          // Verifique o userType e redirecione com base nisso
           if (isTeacher) {
             navigate('/professor-home');
           } else {
             navigate('/aluno-home');
           }

          // onLoginSuccess(user.name);
        } else {
          setError('Erro ao obter informações do usuário.');
        }
      } else {
        const result = await response.json();
        setError(`Erro ao fazer login. ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao conectar com a API. Verifique sua conexão com a internet.');
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
            <button className="signup-button" onClick={onSignupClick}>
              Clique aqui para cadastrar-se
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

export {userId, username, email, isTeacher};