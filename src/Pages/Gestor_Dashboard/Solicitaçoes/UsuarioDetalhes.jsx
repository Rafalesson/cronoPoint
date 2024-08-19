import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UsuarioDetalhes.css';

export default function UsuarioDetalhes() {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setUsuario(data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do usuário:', error);
            }
        };

        fetchUsuario();
    }, [id]);

    return (
        <div className="usuario-detalhes">
            <button className="back-btn" onClick={() => navigate(-1)}>Voltar</button>
            <h2>Detalhes do Usuário</h2>
            {usuario ? (
                <div className="usuario-info">
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Nome:</strong> {usuario.nome}</p>
                    <p><strong>CPF:</strong> {usuario.cpf}</p>
                    <p><strong>Cargo:</strong> {usuario.cargo}</p>
                    <p><strong>Status:</strong> {usuario.status}</p>
                    <h3>Contato</h3>
                    <p><strong>Telefone Celular:</strong> {usuario.telefone_celular}</p>
                    <p><strong>Telefone Fixo:</strong> {usuario.telefone_fixo}</p>
                    <p><strong>Email de Contato:</strong> {usuario.contato_email}</p>
                    <h3>Endereço</h3>
                    <p><strong>Rua:</strong> {usuario.rua}</p>
                    <p><strong>Número:</strong> {usuario.numero_casa}</p>
                    <p><strong>Bairro:</strong> {usuario.bairro}</p>
                    <p><strong>Cidade:</strong> {usuario.cidade}</p>
                    <p><strong>Estado:</strong> {usuario.estado}</p>
                    <p><strong>CEP:</strong> {usuario.cep}</p>
                </div>
            ) : (
                <p>Carregando detalhes do usuário...</p>
            )}
        </div>
    );
}
