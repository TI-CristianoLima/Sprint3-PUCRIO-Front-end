import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CadastrarCliente from './pages/CadastrarCliente';
import ConsultarCliente from './pages/ConsultarCliente';
import EditarCliente from './pages/EditarCliente';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='main-content'>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/cadastrar" element={<CadastrarCliente />} />
            <Route path="/consultar" element={<ConsultarCliente />} />
            <Route path='/editar' element={<EditarCliente />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router >
  );
}

export default App;
