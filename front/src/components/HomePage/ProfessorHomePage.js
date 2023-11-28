import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './HomePage.css';

const ProfessorHomePage = () => {
  const { user } = useAuth();
  
  // Check if the user is null before destructuring properties
  const { username, email: userEmail } = user || {};

  const [userClassrooms, setUserClassrooms] = useState([]);

  useEffect(() => {
    const fetchUserClassrooms = async () => {
      try {
        const response = await fetch(`http://localhost:5000/course/searchbyteacher?teachers=${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data.data)
          setUserClassrooms(data.data);
        } else {
          console.error('Erro ao obter salas de aula do professor');
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
      <Link to="/create-classroom">
        <button style={{ position: 'absolute', left: '10px', top: '10px' }}>Criar Sala de Aula</button>
      </Link>

      <h1>Bem-vindo, Professor {username || ''}!</h1>
      <h3>Minhas Salas de Aula</h3>

      {Array.isArray(userClassrooms) && userClassrooms.length === 0 ? (
        <p>Você não está cadastrado em nenhuma sala de aula ainda.</p>
      ) : (
        <div className="classrooms-container">
          {userClassrooms.map((classroom) => (
            <div key={classroom.id} className="classroom-item">
              <Link to={`/classroom/${classroom.id}`}>
                <div className="classroom-info">
                  <strong>{classroom.name}</strong>
                  <p>Criada em: {new Date(classroom.created_at).toLocaleDateString()}</p>
                  <p>Matérias: {classroom.subjects.join(', ')}</p>
                  <p>Estudantes: {classroom.students.join(', ')}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfessorHomePage;
