// src/components/HomePage/HomePage.js
import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [userClassrooms, setUserClassrooms] = useState([]);

  useEffect(() => {
    // Lógica para obter as salas de aula do usuário (substitua com sua lógica)
    const fetchUserClassrooms = async () => {
      try {
        const response = await fetch('sua-api-endpoint/user-classrooms');
        if (response.ok) {
          const data = await response.json();
          setUserClassrooms(data);
        } else {
          console.error('Erro ao obter salas de aula do usuário');
        }
      } catch (error) {
        console.error('Erro ao conectar com a API', error);
      }
    };

    fetchUserClassrooms();
  }, []);

  return (
    <div>
      <h2>Minhas Salas de Aula</h2>
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

export default HomePage;
