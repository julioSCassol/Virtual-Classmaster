// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import './HomePage.css';

const Classroom = ({ data }) => (
  <div className="classroom">
    <h2>{data.name}</h2>
    <p>Professor: {data.teacher}</p>
    <button>Entrar</button>
  </div>
);

const HomePage = () => {
  const [classrooms, setClassrooms] = useState([]);

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

  return (
    <div className="home-page">
      <main>
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
