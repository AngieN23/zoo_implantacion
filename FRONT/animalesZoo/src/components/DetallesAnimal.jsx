import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../DetallesAnimal.css';

function DetallesAnimal() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const navigate = useNavigate();

  // Acceder a la variable de entorno
  const apiUrl = import.meta.env.VITE_API_ZOO;

  useEffect(() => {
    fetch(`${apiUrl}/animales/${id}`)
      .then(response => response.json())
      .then(data => setAnimal(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  const eliminarAnimal = () => {
    fetch(`${apiUrl}/animales/${id}`, {
      method: 'DELETE'
    })
      .then(() => navigate('/'))
      .catch(error => console.error('Error:', error));
  };

  if (!animal) return <div>Cargando...</div>;

  return (
    <div className="detalles-container">
      <h2>Detalles Animal</h2>
      <table>
        <tbody>
          <tr>
            <th>Nombre</th>
            <td>{animal.nombre}</td>
          </tr>
          <tr>
            <th>Especie</th>
            <td>{animal.especie}</td>
          </tr>
          <tr>
            <th>Edad</th>
            <td>{animal.edad}</td>
          </tr>
          <tr>
            <th>Acciones</th>
            <td>
              <button onClick={() => navigate(`/editar/${animal._id}`)}>Editar</button>
              <button onClick={eliminarAnimal}>Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="volver-boton" onClick={() => navigate('/')}>Volver a la lista</button>
    </div>
  );
}

export default DetallesAnimal;
