import React, { useState } from "react";
import PropTypes from "prop-types";
import Footer from "../../Componentes/Footer/Footer";
import iconeMulher from "../../assets/img/people_working_pack/SVG/character3.svg";
import iconeHomem from "../../assets/img/people_working_pack/SVG/character16.svg";
import linha from "../../assets/img/line.svg";
import "./login.css";

export default function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (response.ok) {
                // Faz a busca do colaborador após o login bem-sucedido
                const colaboradorResponse = await fetch(`http://localhost:5000/api/colaboradores/${data.id_colaborador}`);
                const colaboradorData = await colaboradorResponse.json();

                if (colaboradorData && colaboradorData.result && colaboradorData.result.nome) {
                    localStorage.setItem('colaboradorNome', colaboradorData.result.nome);
                    onLoginSuccess();
                } else {
                    console.error("Colaborador não encontrado.");
                }
            } else {
                console.error("Erro ao realizar login:", data.error);
            }
        } catch (error) {
            console.error("Erro ao realizar login:", error);
        }
    };

    return (
        <section id="login">
            <div id="containerImg">
                <img src={iconeMulher} alt="Mulher com lupa" className="loginImg" id="loginImg1" />
                <img src={iconeHomem} alt="Homem no computador" className="loginImg" id="loginImg2" />
            </div>

            <form onSubmit={handleSubmit} id="loginForm">
                <p id="saudacao">
                    Bem-vindo(a) ao <strong>Crono Point</strong>
                </p>

                <div id="formGroup1">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div id="formGroup2">
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>

                <button type="button" id="forgot">
                    Esqueceu a senha?
                </button>

                <button type="submit" className="btn" id="entrar">
                    Entrar
                </button>

                <div id="divisaoBtn">
                    <img src={linha} alt="Apenas uma linha" />
                    <span>Ou</span>
                    <img src={linha} alt="Apenas uma linha" />
                </div>

                <button type="button" className="btn" id="cadastrar">
                    Cadastrar
                </button>

                <Footer />
            </form>
        </section>
    );
}

Login.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired,
};
