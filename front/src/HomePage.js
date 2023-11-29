// src/HomePage.js
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <header>
        <h1>Virtual Classmaster</h1>
      </header>
      <main>
        <section className="classrooms">
          <div className="classroom">
            <h2>Matemática</h2>
            <p>Professor: João Silva</p>
            <button>Entrar</button>
          </div>
          <div className="classroom">
            <h2>Literatura</h2>
            <p>Professor: Maria Oliveira</p>
            <button>Entrar</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
