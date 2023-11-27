import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const AlunoHomePage = () => {
  const { user } = useAuth();
  const { username, email: userEmail } = user;
  console.log(user);

  const [userClassrooms, setUserClassrooms] = useState([]);

  useEffect(() => {
    const fetchUserClassrooms = async () => {
      try {
        const response = await fetch(`http://localhost:5000/course/searchbystudent?students=${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setUserClassrooms(data);
        } else {
          console.error('Erro ao obter salas de aula do aluno');
        }
      } catch (error) {
        console.error('Erro ao conectar com a API', error);
      }
    };

    fetchUserClassrooms();
  }, [userEmail]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Bem-vindo, Aluno {username}!</h1>
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

export default AlunoHomePage;
