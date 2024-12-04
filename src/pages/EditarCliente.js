import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function EditarCliente() {
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({
        nome: '',
        email: '',
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
    });

    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const clienteId = queryParams.get('id'); // Obtendo o id da query string
        console.log('ID do cliente:', clienteId); // Verifique o id no console

        if (clienteId) {
            fetch(`http://127.0.0.1:5000/cliente?id=${clienteId}`)
                .then(response => response.json())
                .then(data => setCliente(data)) // Atualizando o estado com os dados do cliente
                .catch(error => console.error('Erro ao buscar cliente:', error));
        }
    }, [location]);

    // Efeito para buscar dados do ViaCEP
    useEffect(() => {
        if (cliente.cep && cliente.cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cliente.cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        setCliente(prevCliente => ({
                            ...prevCliente,
                            rua: data.logradouro || '',
                            bairro: data.bairro || '',
                            cidade: data.localidade || '',
                            uf: data.uf || '',
                        }));
                    } else {
                        setMensagem('CEP não encontrado.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar CEP:', error);
                    setMensagem('Erro ao buscar CEP.');
                });
        }
    }, [cliente.cep]);

    const handleChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value,
        });
    };

    const handleVoltar = () => {
        navigate("/consultar");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { id, nome, email, cep, rua, complemento, numero, bairro, cidade, uf } = cliente;

        // Criar o corpo da requisição em formato URL-encoded
        const formData = new URLSearchParams();
        formData.append("id", id);
        formData.append("nome", nome);
        formData.append("email", email);
        formData.append("cep", cep);
        formData.append("rua", rua);
        formData.append("complemento", complemento);
        formData.append("numero", numero);
        formData.append("bairro", bairro);
        formData.append("cidade", cidade);
        formData.append("uf", uf);

        try {
            const response = await fetch(`http://127.0.0.1:5000/cliente?id=${id}`, {
                method: "PUT", // Método PUT para atualizar
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded", // Formato URL-encoded
                },
                body: formData.toString(), // Enviar os dados no formato URL-encoded
            });

            const data = await response.json();
            console.log("Resposta da API:", data);

            if (response.ok) {
                setMensagem("Cliente atualizado com sucesso!");
                navigate("/consultar"); // Voltar para a página inicial após o sucesso
            } else {
                setMensagem(data.message || "Erro ao atualizar cliente.");
            }
        } catch (error) {
            console.error("Erro ao conectar ao servidor:", error);
            setMensagem("Erro ao conectar ao servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-3 container text-center'>
            <h1 className='header display-3'>Editar Cliente</h1>

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col className='p-2 col-6 mb-1'>
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="nome"
                                value={cliente.nome}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </Col>
                        <Col className='p-2 col-6 mb-1'>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={cliente.email}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='p-2 col-2 mb-1'>
                            <label>CEP:</label>
                            <input
                                type="text"
                                name="cep"
                                value={cliente.cep}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </Col>
                        <Col className='p-2 col-10 mb-1'>
                            <label>Endereço:</label>
                            <input
                                type="text"
                                name="rua"
                                value={cliente.rua}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='p-2 col-6 mb-1'>
                            <label>Complemento:</label>
                            <input
                                type="text"
                                name="complemento"
                                value={cliente.complemento}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </Col>
                        <Col className='p-2 col-2 mb-1'>
                            <label>Número:</label>
                            <input
                                type="text"
                                name="numero"
                                value={cliente.numero}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </Col>
                        <Col className='p-2 col-4 mb-1'>
                            <label>Bairro:</label>
                            <input
                                type="text"
                                name="bairro"
                                value={cliente.bairro}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='p-2 col-7 mb-1'>
                            <label>Cidade:</label>
                            <input
                                type="text"
                                name="cidade"
                                value={cliente.cidade}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </Col>
                        <Col className='p-2 col-5 mb-1'>
                            <label>UF:</label>
                            <input
                                type="text"
                                name="uf"
                                value={cliente.uf}
                                onChange={handleChange}
                                required
                                className='form-control'
                            />
                        </Col>
                    </Row>
                    <Button
                        type="submit"
                        className='p-3 col-3 m-2 fs-4'
                        variant="success">
                        Salvar
                    </Button>
                    <Button
                        className='p-3 col-3 m-2 fs-4'
                        variant="warning"
                        onClick={handleVoltar}>
                        Voltar para consultar
                    </Button>
                </form>
            )}

        </div>
    );
}

export default EditarCliente;
