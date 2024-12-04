import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function CadastrarCliente() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [complemento, setComplemento] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(false);

    // Função para buscar os dados do CEP
    const handleCepChange = async (e) => {
        const novoCep = e.target.value;
        setCep(novoCep);

        if (novoCep.length === 8) { // Quando o CEP tem 8 caracteres
            try {
                const response = await fetch(`https://viacep.com.br/ws/${novoCep}/json/`);
                const data = await response.json();

                if (!data.erro) {
                    setRua(data.logradouro);
                    setBairro(data.bairro);
                    setCidade(data.localidade);
                    setUf(data.uf);
                } else {
                    setMensagem('CEP não encontrado');
                }
            } catch (error) {
                setMensagem('Erro ao consultar o CEP.');
                console.error(error);
            }
        }
    };

    // Função de envio do formulário (handleSubmit)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Criar o corpo da requisição em formato URL-encoded
        const formData = new URLSearchParams();
        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('cep', cep);
        formData.append('rua', rua);
        formData.append('complemento', complemento);
        formData.append('numero', numero);
        formData.append('bairro', bairro);
        formData.append('cidade', cidade);
        formData.append('uf', uf);

        try {
            const response = await fetch("http://127.0.0.1:5000/cliente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded", // Formato URL-encoded
                },
                body: formData.toString(), // Enviar os dados no formato URL-encoded
            });

            const data = await response.json();
            console.log("Resposta da API:", data);

            if (response.ok) {
                setMensagem("Cliente cadastrado com sucesso!");
                limparFormulario();
            } else {
                setMensagem(data.message || "Erro ao cadastrar cliente.");
            }
        } catch (error) {
            console.error("Erro ao conectar ao servidor:", error);
            setMensagem("Erro ao conectar ao servidor.");
        } finally {
            setLoading(false);
        }
    };

    const limparFormulario = () => {
        setNome('');
        setEmail('');
        setCep('');
        setRua('');
        setComplemento('');
        setNumero('');
        setBairro('');
        setCidade('');
        setUf('');
    };

    const navigate = useNavigate();

    const handleVoltar = () => {
        navigate('/home');  // Redireciona para a página Home
    };

    return (
        <div className='p-3 container text-center'>
            <h1 className='display-3'>Cadastro de Clientes</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col className='p-2 col-6 mb-1'>
                        <label for="nome">Nome</label>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className='form-control'
                        />
                    </Col>

                    <Col className='p-2 col-6 mb-1'>
                        <label for="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='form-control'
                        />

                    </Col>
                </Row>
                <Row>
                    <Col className='p-2 col-2 mb-1'>
                        <label for="cep">CEP</label>
                        <input
                            type="text"
                            placeholder="CEP"
                            maxLength={8}
                            value={cep}
                            onChange={handleCepChange} // Alteração aqui, chama handleCepChange
                            className='form-control'
                        />
                    </Col>

                    <Col className='p-2 col-10 mb-1'>
                        <label for="rua">Endereço</label>
                        <input
                            type="text"
                            placeholder="Rua"
                            value={rua}
                            onChange={(e) => setRua(e.target.value)}
                            className='form-control'
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className='p-2 col-6 mb-1'>
                        <label for="complemento">Complemento</label>
                        <input
                            type="text"
                            placeholder="Complemento"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                            className='form-control'
                        />
                    </Col>
                    <Col className='p-2 col-2 mb-1'>
                        <label for="numero">Numero</label>
                        <input
                            type="text"
                            placeholder="Número"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            className='form-control'
                        />
                    </Col>
                    <Col className='p-2 col-4 mb-1'>
                        <label for="bairro">Bairro</label>
                        <input
                            type="text"
                            placeholder="Bairro"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            className='form-control'
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className='p-2 col-7 mb-1'>
                        <label for="cidade">Cidade</label>
                        <input
                            type="text"
                            placeholder="Cidade"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            className='form-control'
                        />
                    </Col>
                    <Col className='p-2 col-5 mb-1'>
                        <label for="uf">Estado</label>
                        <select
                            type="text"
                            placeholder="Uf"
                            value={uf}
                            onChange={(e) => setUf(e.target.value)}
                            className='form-control'
                        >
                            <option selected>Escolher...</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </Col>
                </Row>
                <Button
                    className='p-3 col-3 m-2 fs-4'
                    variant="success"
                    type="submit"
                    disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </Button>
                <Button
                    className='p-3 col-3 m-2 fs-4'
                    variant="warning"
                    onClick={handleVoltar}>
                    Voltar para a Tela Inicial
                </Button>
            </form>
            {mensagem && <p>{mensagem}</p>}

            {/* Botão Voltar */}

        </div>
    );
};

export default CadastrarCliente;
