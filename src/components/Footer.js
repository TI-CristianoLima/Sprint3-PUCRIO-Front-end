import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>© 2024 Cristiano Lima. Todos os direitos reservados.</p>
                <p>
                    <a href="/home">Home</a> | <a href="/cadastrar">Cadastrar Cliente</a> | <a href="/consultar">Consultar Cliente</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
