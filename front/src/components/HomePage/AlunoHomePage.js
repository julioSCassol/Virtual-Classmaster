import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import './HomePage.css';

const AlunoHomePage = () => {
  const { user } = useAuth();
  const { username, email: userEmail } = user || {};

  const [userClassrooms, setUserClassrooms] = useState([]);

  useEffect(() => {
    const fetchUserClassrooms = async () => {
      try {
        const response = await fetch(`http://localhost:5000/course/searchbystudent?students=${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setUserClassrooms(data.data); // Access the array of classrooms in the response
        } else {
          console.error('Erro ao obter salas de aula do aluno');
        }
      } catch (error) {
        console.error('Erro ao conectar com a API', error);
      }
    };

    fetchUserClassrooms();
  }, [userEmail]);

  console.log('Logged Username:', username);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Bem-vindo, Aluno {username}!</h1>
      <h3>Minhas Salas de Aula</h3>
      {Array.isArray(userClassrooms) && userClassrooms.length === 0 ? (
        <p>Você não está cadastrado em nenhuma sala de aula ainda.</p>
      ) : (
        <ul>
          {userClassrooms.map((classroom) => (
            <li key={classroom.id}>
               <div className="classroom-info">
              <strong>{classroom.name}</strong>
              <p>Criada em: {new Date(classroom.created_at).toLocaleDateString()}</p>
              <p>Matérias: {classroom.subjects.join(', ')}</p>
              <p>Professores: {classroom.teachers.join(', ')}</p>
            </div>
          </li>
        ))}
    </ul>
      )}
    </div>
  );
};

export default AlunoHomePage;
