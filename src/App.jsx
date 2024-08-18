import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import FuncionarioDashboard from "./Pages/Funcionario_Dashboard/FuncionarioDashboard";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router basename="/cronoPoint/">
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/dashboard" element={isAuthenticated ? <FuncionarioDashboard /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
