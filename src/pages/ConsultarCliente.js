import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function ConsultarClientes() {
    const [clientes, setClientes] = useState([]); // Estado para armazenar os clientes
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    // const [erro, setErro] = useState(''); // Estado para erros
    const [mensagem, setMensagem] = useState('');

    // Função para buscar os clientes
    const fetchClientes = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:5000/clientes');
            const data = await response.json();

            if (response.ok) {
                setClientes(data.clientes); // Atualiza o estado com a lista de clientes
            } else {
                setMensagem('Erro ao buscar clientes');
            }
        } catch (error) {
            console.error('Erro ao conectar à API:', error);
            setMensagem('Erro ao conectar à API');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClientes(); // Chama a função para buscar os clientes ao carregar o componente
    }, []); // O efeito roda apenas uma vez após o primeiro render

    const handleEditar = async (id) => {
        console.log('Editando cliente:', id);
        navigate(`/editar?id=${id}`);
    };

    const handleExcluir = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esse cliente?")) {
            try {

                const response = await fetch(`http://127.0.0.1:5000/cliente?id=${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    alert('Cliente excluído com sucesso!');
                    // Atualizar a lista de clientes ou realizar outras ações
                    window.location.reload();
                } else {
                    const error = await response.text();
                    alert(`Erro ao excluir cliente: ${error}`);
                }
            } catch (error) {
                console.error('Erro ao conectar ao servidor:', error);
                alert('Erro ao conectar ao servidor.');
            }
        }
    };

    const navigate = useNavigate();

    const handleVoltar = () => {
        navigate('/home');  // Redireciona para a página Home
    };



    // UseEffect para buscar os clientes ao carregar o componente
    useEffect(() => {
        fetchClientes();
    }, []);

    return (
        <Container className='p-3'>

            <h1 className='header display-3'>Clientes Cadastrados</h1>
            {loading && <p>Carregando...</p>}
            {mensagem && <p>{mensagem}</p>}

            <ListGroup variant="flush" className='p-3'>
                {clientes.length > 0 ? (
                    clientes.map(cliente => (
                        <ListGroup.Item key={cliente.id} className='p-3'>
                            <strong className='h3'>{cliente.nome}</strong><br />
                            <span>Email: {cliente.email}</span>
                            <br />
                            <span>Endereço: {cliente.rua}, {cliente.numero}, Complemento: {cliente.complemento || 'N/A'}</span><br />
                            <span>Bairro: {cliente.bairro}</span><br />
                            <span>Cidade: {cliente.cidade} - {cliente.uf}</span>
                            <br />
                            <Button
                                variant="success"
                                onClick={() => handleEditar(cliente.id)}
                                className='col-1 p-1 m-2'
                            >
                                Editar
                            </Button>
                            
                            <Button
                                variant="danger"
                                onClick={() => handleExcluir(cliente.id)}
                                className='col-1 p-1 m-2'
                            >
                                Excluir
                            </Button>
                            {/* </div> */}
                        </ListGroup.Item>
                    ))
                ) : (
                    <p className='center'>Nenhum cliente encontrado</p>
                )}
            </ListGroup>
            {/* Botão Voltar */}
            <Button className='col-3 p-3 mb-3 fs-4' variant="warning" onClick={handleVoltar}>Voltar para a Tela Inicial</Button>

        </Container>
    );
}

export default ConsultarClientes;
