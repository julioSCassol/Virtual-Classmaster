import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import './ClassroomForm.css';

const ClassroomForm = ({ onClassroomCreate }) => {
  const { user } = useAuth();
  const { email: userEmail } = user;

  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [students, setStudents] = useState([]);

  const handleCreateClassroom = async () => {
    try {
      const response = await fetch('http://localhost:5000/course/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: className,
          subjects: subject,
          teachers: [userEmail],  
          students: students,
        }),
      });

      if (response.ok) {
        onClassroomCreate();

        setClassName('');
        setSubject('');
        setStudents('');
      } else {
        let errorMessage = 'Erro ao criar sala de aula';
  
        try {
          const result = await response.json();
          if (result && result.message) {
            errorMessage = `Erro ao criar sala de aula: ${result.message}`;
          }
        } catch (jsonError) {
          console.error('Erro ao analisar resposta JSON do servidor:', jsonError);
        }
  
        console.error(errorMessage);
      }
    } catch (error) {
      console.error('Erro ao conectar com a API', error);
    }
  };

  return (
    <div className="total">
      <h2>Criar Nova Sala de Aula</h2>
      
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
          value={students.join(',')} 
          onChange={(e) => setStudents(e.target.value.split(','))}
        />
      </label>

      <button onClick={handleCreateClassroom}>Criar Sala de Aula</button>
    </div>
  );
};

export default ClassroomForm;
