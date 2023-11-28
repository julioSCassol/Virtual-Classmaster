// src/components/ClassroomPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
//import './ClassroomPage.css';

const ClassroomPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [classroomData, setClassroomData] = useState(null);

  useEffect(() => {
    const fetchClassroomData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/courses/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setClassroomData(data);
        } else {
          console.error('Erro ao obter detalhes da sala de aula');
        }
      } catch (error) {
        console.error('Erro ao conectar com a API', error);
      }
    };

    fetchClassroomData();
  }, [id]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreatePost = async () => {
    try {
      // Lógica para criar um post
      const response = await fetch('http://localhost:5000/course/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          content: 'Conteúdo do post',
          indexed_material: 'Material indexado',
          course_id: id,
          subjects_post: ['Assunto do post'],
        }),
      });

      if (response.ok) {
        console.log('Post criado com sucesso!');
        // Adicione lógica adicional após a criação do post, se necessário
      } else {
        console.error('Erro ao criar o post');
      }
    } catch (error) {
      console.error('Erro ao conectar com a API', error);
    }
  };

  if (!user) {
    // Se o usuário não estiver autenticado, redirecione para a página de login
    navigate('/login');
    return null;
  }

  return (
    <div>
      <h1>Detalhes da Sala de Aula</h1>

      {classroomData ? (
        <div>
          <h2>Nome: {classroomData.name}</h2>
          <p>Criada em: {new Date(classroomData.created_at).toLocaleDateString()}</p>
          <p>Matérias: {classroomData.subjects.join(', ')}</p>
          <p>Estudantes: {classroomData.students.join(', ')}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}

      <button onClick={handleCreatePost}>Criar Post</button>
    </div>
  );
};

export default ClassroomPage;
