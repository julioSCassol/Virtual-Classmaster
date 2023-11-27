// src/components/ClassroomForm/ClassroomForm.js
import React, { useState } from 'react';
import './ClassroomForm.css';

const ClassroomForm = ({ onClassroomCreate, userId }) => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [students, setStudents] = useState('');

  const handleCreateClassroom = async () => {
    try {
      // Fazer uma chamada à API para criar uma nova sala de aula
      const response = await fetch('http://localhost:5000/course/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: className, subject, teacher: userId, students }),
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
    <div className="total">
      <h2>Criar Nova Sala de Aula</h2>
      <p>Professor Vinculado: {userId}</p>
      <label>
        Nome da Sala:
        <br />
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
      </label>
      
      <label>
        Matéria:
        <br />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </label>
      
      <label>
        Estudantes Vinculados:
        <br />
        <input
          type="text"
          value={students}
          onChange={(e) => setStudents(e.target.value)}
        />
      </label>
      
      <button onClick={handleCreateClassroom}>Criar Sala de Aula</button>
    </div>
  );
};

export default ClassroomForm;
