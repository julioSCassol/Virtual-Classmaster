// src/components/ProfessorHomePage.js
import React from 'react';

const ProfessorHomePage = ({ onCreateClassroomClick }) => {
  return (
    <div>
      <h3>Seu painel de professor</h3>
      <button onClick={onCreateClassroomClick}>Criar Sala de Aula</button>
      {/* Adicione aqui o conteúdo específico para professores */}
    </div>
  );
};

export default ProfessorHomePage;
