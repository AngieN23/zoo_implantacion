import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function ListaAnimales() {
  const [animales, setAnimales] = useState([]);
  // Acceder a la variable de entorno
  const apiUrl = import.meta.env.VITE_API_ZOO;

  useEffect(() => {
    fetch(`${apiUrl}/animales`)
      .then(response => response.json())
      .then(data => setAnimales(data))
      .catch(error => console.error('Error:', error));
  }, [apiUrl]);

  return (
    <div className="table-container">
      <h2>Lista de Animales</h2>
      <div className="button-container">
        <Link to="/crear" className="create-button">Crear Nuevo Animal</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {animales.map(animal => (
            <tr key={animal._id}>
              <td>{animal.nombre}</td>
              <td>{animal.especie}</td>
              <td>{animal.edad}</td>
              <td>
                <Link to={`/animales/${animal._id}`}>Detalles</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaAnimales;
