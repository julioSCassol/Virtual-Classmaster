// src/components/ClassroomForm/ClassroomForm.js
import React, { useState } from 'react';

const ClassroomForm = ({ onClassroomCreate }) => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [students, setStudents] = useState('');

  const handleCreateClassroom = async () => {
    try {
      // Fazer uma chamada à API para criar uma nova sala de aula
      const response = await fetch('sua-api-endpoint/classrooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: className, subject, teacher, students }),
      });

      if (response.ok) {
        // Chama a função passada por prop para atualizar o estado do pai
        onClassroomCreate();
        // Limpa os campos após a criação da sala de aula
        setClassName('');
        setSubject('');
        setTeacher('');
        setStudents('');
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
      <br />
      <label>
        Matéria:
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </label>
      <br />
      <label>
        Professor Responsável:
        <input
          type="text"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
        />
      </label>
      <br />
      <label>
        Estudantes Vinculados:
        <input
          type="text"
          value={students}
          onChange={(e) => setStudents(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleCreateClassroom}>Criar Sala de Aula</button>
    </div>
  );
};

export default ClassroomForm;
