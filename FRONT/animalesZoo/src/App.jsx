import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListaAnimales from './components/ListaAnimales';
import DetallesAnimal from './components/DetallesAnimal';
import CrearAnimal from './components/CrearAnimal';
import EditarAnimal from './components/EditarAnimal';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<ListaAnimales />} />
          <Route path="/animales/:id" element={<DetallesAnimal />} />
          <Route path="/crear" element={<CrearAnimal />} />
          <Route path="/editar/:id" element={<EditarAnimal />} />
        </Routes>
    </Router>
  );
}

export default App;
