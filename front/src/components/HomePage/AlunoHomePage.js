// src/components/AlunoHomePage.js
import React from 'react';

const AlunoHomePage = ({ userClassrooms }) => {
  return (
    <div>
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
