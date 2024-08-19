import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Solicitacoes.css';

export default function Solicitacoes() {
    const [pendenteUsers, setPendenteUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPendenteUsers = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch('http://localhost:5000/api/usuarios/pendentes', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log("Dados recebidos:", data);
                setPendenteUsers(data);
            } catch (error) {
                console.error('Erro ao buscar usuários pendentes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPendenteUsers();
    }, []);

    if (loading) {
        return <p>Carregando usuários pendentes...</p>;
    }

    return (
        <div className="solicitacoes">
            <button onClick={() => navigate(-1)} className="back-btn">Voltar</button>
            <h2>Usuários Pendentes</h2>
            {Array.isArray(pendenteUsers) && pendenteUsers.length > 0 ? (
                <ul>
                    {pendenteUsers.map(user => (
                        <li key={user.id_usuario} onClick={() => navigate(`/usuarios/${user.id_usuario}`)}>
                            <p>{user.email}</p>
                            <div className="actions">
                                <button onClick={(e) => { e.stopPropagation(); handleAprovar(user.id_usuario); }} className="approve-btn">Aprovar</button>
                                <button onClick={(e) => { e.stopPropagation(); handleRejeitar(user.id_usuario); }} className="reject-btn">Rejeitar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Não há usuários pendentes no momento.</p>
            )}
        </div>
    );
}
