import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CrearAnimal.css'; // Importa el archivo CSS

function CrearAnimal() {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [edad, setEdad] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoAnimal = { nombre, especie, edad };

    const apiUrl = import.meta.env.VITE_API_ZOO;
    
    fetch(`${apiUrl}/animales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoAnimal)
    })
    .then(() => navigate('/'))
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="form-container"> {/* Contenedor para centrar el formulario */}
      <form onSubmit={handleSubmit}>
        <h2>Crear Nuevo Animal</h2>
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
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default CrearAnimal;
