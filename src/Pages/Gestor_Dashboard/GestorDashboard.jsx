import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../Componentes/Header/Header"; // Certifique-se de ajustar o caminho conforme necessário
import './GestorDashboard.css';

export default function GestorDashboard() {
    const navigate = useNavigate();

    return (
        <div className="gestor-dashboard">
            {/* Adiciona o componente de Header com o menu hambúrguer */}
            <Header />

            <header className="header">
                <div className="header-content">
                    <h1>Crono Point</h1>
                    <p>Bom dia, Gestor!</p>
                    <div className="time-info">
                        <span className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="date">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <div className="cards-container">
                    <button className="card" onClick={() => navigate('/solicitacoes')}>
                        {/* <img src={solicitacoesIcon} alt="Solicitações" /> */} {/* Comentado */}
                        <span>Solicitações</span>
                    </button>
                    <button className="card" onClick={() => navigate('/funcionarios')}>
                        {/* <img src={funcionariosIcon} alt="Funcionários" /> */} {/* Comentado */}
                        <span>Funcionários</span>
                    </button>
                    <button className="card" onClick={() => navigate('/jornadas')}>
                        {/* <img src={jornadasIcon} alt="Jornadas" /> */} {/* Comentado */}
                        <span>Jornadas</span>
                    </button>
                    <button className="card" onClick={() => navigate('/plantoes')}>
                        {/* <img src={plantoesIcon} alt="Plantões" /> */} {/* Comentado */}
                        <span>Plantões</span>
                    </button>
                </div>

                <div className="ponto-container">
                    <button className="ponto-btn" onClick={() => navigate('/ponto')}>
                        {/* <img src={pontoIcon} alt="Ponto" /> */} {/* Comentado */}
                        <span>Ponto</span>
                    </button>
                </div>
            </main>

            <footer className="footer">
                <p>Powered by <strong>DbSnoop</strong></p>
            </footer>
        </div>
    );
}
