import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../CrearAnimal.css'; // Importa el archivo CSS

function EditarAnimal() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [edad, setEdad] = useState('');
  const navigate = useNavigate();
  // Acceder a la variable de entorno
  const apiUrl = import.meta.env.VITE_API_ZOO;

  useEffect(() => {
    fetch(`${apiUrl}/animales/${id}`)
      .then(response => response.json())
      .then(data => {
        setNombre(data.nombre);
        setEspecie(data.especie);
        setEdad(data.edad);
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const animalActualizado = { nombre, especie, edad };

    fetch(`${apiUrl}/animales/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(animalActualizado)
    })
      .then(() => navigate(`/animales/${id}`))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Editar Animal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Especie:</label>
          <input
            type="text"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
          />
        </div>
        <div>
          <label>Edad:</label>
          <input
            type="text"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}

export default EditarAnimal;
