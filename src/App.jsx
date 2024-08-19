import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import FuncionarioDashboard from "./Pages/Funcionario_Dashboard/FuncionarioDashboard";
import CadastroCompleto from "./Pages/Cadastro/CadastroCompleto";
import GestorDashboard from "./Pages/Gestor_Dashboard/GestorDashboard";
import Solicitacoes from "./Pages/Gestor_Dashboard/Solicitaçoes/Solicitacoes.jsx";
import UsuarioDetalhes from "./Pages/Gestor_Dashboard/Solicitaçoes/UsuarioDetalhes.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cargo, setCargo] = useState("");

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const userCargo = localStorage.getItem('cargo');

        if (authToken && userCargo) {
            setIsAuthenticated(true);
            setCargo(userCargo);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setCargo(localStorage.getItem('cargo'));
    };

    return (
        <Router basename="/cronoPoint/">
            <Routes>
                <Route
                    path="/"
                    element={isAuthenticated ? (cargo === "gestor" ? <Navigate to="/gestor-dashboard" /> : <Navigate to="/dashboard" />) : <Login onLoginSuccess={handleLoginSuccess} />}
                />
                <Route
                    path="/dashboard"
                    element={isAuthenticated && cargo !== "gestor" ? <FuncionarioDashboard /> : <Navigate to="/" />}
                />
                <Route
                    path="/gestor-dashboard"
                    element={isAuthenticated && cargo === "gestor" ? <GestorDashboard /> : <Navigate to="/" />}
                />
                <Route
                    path="/solicitacoes"
                    element={isAuthenticated && cargo === "gestor" ? <Solicitacoes /> : <Navigate to="/" />}
                />
                <Route
                    path="/cadastro"
                    element={<CadastroCompleto />}
                />
                <Route path="/usuarios/:id" element={<UsuarioDetalhes />} />
                <Route path="/solicitacoes" element={<Solicitacoes />} />
            </Routes>
        </Router>
    );
}

export default App;
