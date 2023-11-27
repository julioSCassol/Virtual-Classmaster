import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {userId, username, email, isTeacher} from '../LoginForm/LoginForm';

console.log(userId, username, email, isTeacher);

//NÃO APARECE O NOME!!!!!!!!
const ProfessorHomePage = ({ userEmail }) => {
  const [userClassrooms, setUserClassrooms] = useState([]);

  useEffect(() => {
    const fetchUserClassrooms = async () => {
      try {
        const response = await fetch(`http://localhost:5000/course/searchbyteacher?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setUserClassrooms(data);
        } else {
          console.error('Erro ao obter salas de aula do professor');
        }
      } catch (error) {
        console.error('Erro ao conectar com a API', error);
      }
    };

    fetchUserClassrooms();
  }, [userEmail]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Link to="/create-classroom">
        <button style={{ position: 'absolute', left: '10px', top: '10px' }}>Criar Sala de Aula</button>
      </Link>

      <h1>Bem-vindo, Professor {userEmail}!</h1>
      <h3>Minhas Salas de Aula</h3>
      {userClassrooms.length === 0 ? (
        <p>Você não está cadastrado em nenhuma sala de aula ainda.</p>
      ) : (
        <ul>
          {userClassrooms.map((classroom) => (
            <li key={classroom.id}>{classroom.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfessorHomePage;
