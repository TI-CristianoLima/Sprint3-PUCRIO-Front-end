import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function Home() {
  return (
    <Container className='mw-100 p-3'>
      <header className="bg-primary-subtle shadow text-black p-5">
        <h1 className='display-1'>Gerenciamento de Clientes</h1>
      </header>
      <main className="d-grid m-5">
        <Link to="/cadastrar">
          <Button variant="primary" className='shadow-lg col-10 p-4 m-2 fs-1'>Cadastrar Clientes</Button>
        </Link>
        <Link to="/consultar">
          <Button variant="primary" className='shadow-lg col-10 p-4 m-2 fs-1'>Consultar Clientes</Button>
        </Link>
      </main>
    </Container>
  );
}

export default Home;
