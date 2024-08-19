import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import FuncionarioDashboard from "./Pages/Funcionario_Dashboard/FuncionarioDashboard";
import CadastroCompleto from "./Pages/Cadastro/CadastroCompleto";

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
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/dashboard" element={isAuthenticated && cargo !== "gestor" ? <FuncionarioDashboard /> : <Navigate to="/" />} />
                <Route path="/cadastro" element={<CadastroCompleto />} />
            </Routes>
        </Router>
    );
}

export default App;
