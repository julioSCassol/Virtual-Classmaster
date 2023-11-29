import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './ClassroomPage.css';

const ClassroomPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [classroomData, setClassroomData] = useState(null);
  const [postContent, setPostContent] = useState('');
  const [indexedMaterial, setIndexedMaterial] = useState('');
  const [subjectsPost, setSubjectsPost] = useState([]);

  useEffect(() => {
    const fetchClassroomData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/course/post/getpostsbycourse?course_id=${id}`, {
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

  const handleContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleIndexedMaterialChange = (event) => {
    setIndexedMaterial(event.target.value);
  };

  const handleSubjectsChange = (event) => {
    setSubjectsPost(event.target.value.split(',').map(subject => subject.trim()));
  };

  const handleCreatePost = async () => {
    try {
      const response = await fetch('http://localhost:5000/course/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          content: postContent,
          indexed_material: indexedMaterial,
          course_id: id,
          subjects_post: subjectsPost,
        }),
      });

      if (response.ok) {
        console.log('Post criado com sucesso!');
        
      } else {
        console.error('Erro ao criar o post');
      }
    } catch (error) {
      console.error('Erro ao conectar com a API', error);
    }
  };

  const isTeacher = user?.isTeacher;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <div>
        <h1>Detalhes da Sala de Aula</h1>

        {classroomData ? (
          <div className='centralizada'>
            {classroomData.data.map(post => (
              <div key={post.id} className='centralizada'>
                <h2>{post.content}</h2>
                <p>Matérias Relacionadas: {post.subjects_post.join(', ')}</p>
                <p>Material indexado: {post.indexed_material}</p>
              </div>
            ))}
          </div>
        ) : (
          <p> Nenhum post encontrado nesta sala de aula!</p>
        )}

        {isTeacher && (
          <div className="post-block">
            <h2>Criar Novo Post</h2>
            <label>Conteúdo do Post:</label>
            <input type="text" value={postContent} onChange={handleContentChange} />

            <label>Matérias do Post (separados por vírgula):</label>
            <input type="text" value={subjectsPost.join(', ')} onChange={handleSubjectsChange} />

            <label>Material Indexado:</label>
            <input type="text" value={indexedMaterial} onChange={handleIndexedMaterialChange} />

            <button onClick={handleCreatePost}>Criar Post</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassroomPage;
