// src/components/ClassroomForm.js
import React, { useState } from 'react';

const ClassroomForm = ({ onClassroomCreate }) => {
  const [className, setClassName] = useState('');

  const handleCreateClassroom = async () => {
    try {
      // Fazer uma chamada à API para criar uma nova sala de aula
      const response = await fetch('sua-api-endpoint/classrooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ className }),
      });

      if (response.ok) {
        // Chama a função passada por prop para atualizar o estado do pai
        onClassroomCreate();
      } else {
        console.error('Erro ao criar sala de aula');
      }
    } catch (error) {
      console.error('Erro ao conectar com a API', error);
    }
  };

  return (
    <div>
      <h2>Criar Nova Sala de Aula</h2>
      <label>
        Nome da Sala:
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
      </label>
      <button onClick={handleCreateClassroom}>Criar Sala de Aula</button>
    </div>
  );
};

export default ClassroomForm;
