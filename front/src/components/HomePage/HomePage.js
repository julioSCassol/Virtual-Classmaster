// src/components/HomePage/HomePage.js
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import ClassroomForm from '../ClassroomForm/ClassroomForm';

const Classroom = ({ data }) => (
  <div className="classroom">
    <h2>{data.name}</h2>
    <p>Matéria: {data.subject}</p>
    <p>Professor: {data.teacher}</p>
    <p>Estudantes Vinculados: {data.students}</p>
    <button>Entrar</button>
  </div>
);

const HomePage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Simulação de chamada à API para obter as salas de aula
    const fetchData = async () => {
      try {
        const response = await fetch('sua-api-endpoint/classrooms');
        if (response.ok) {
          const data = await response.json();
          setClassrooms(data);
        } else {
          console.error('Erro ao obter lista de salas de aula');
        }
      } catch (error) {
        console.error('Erro ao conectar com a API', error);
      }
    };

    fetchData();
  }, []); // A dependência vazia garante que isso só seja executado uma vez

  const handleClassroomCreate = () => {
    setShowForm(false);
    // Atualiza a lista de salas de aula
    // Você pode chamar a função de busca novamente ou de outra forma atualizar a lista
  };

  return (
    <div className="home-page">
      <main>
        <button onClick={() => setShowForm(!showForm)}>Mostrar/Esconder Formulário</button>
        {showForm && <ClassroomForm onClassroomCreate={handleClassroomCreate} />}
        <section className="classrooms">
          {classrooms.map((classroom) => (
            <Classroom key={classroom.id} data={classroom} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
