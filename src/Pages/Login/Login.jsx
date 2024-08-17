import React from "react";
import Footer from "../../Componentes/Footer/Footer";
import "./login.css"


export default function Login(){


  return(
    <senction id="login">
      <div id="containerImg">
        <img src="src/assets/img/people_working_pack/SVG/character3.svg" alt="Mulher com lupa" className="loginImg" id="loginImg1"/>

        <img src="src/assets/img/people_working_pack/SVG/character16.svg" alt="Homem no computador" className="loginImg" id="loginImg2"/>
      </div>

      <form action="/login" id="loginForm">

      <p id="saudacao">
        Bem-vindo(a) ao <strong>Crono Point</strong>
      </p>

      <div id="formGroup1">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Digite seu email" required />
        </div>

        <div id="formGroup2">
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" placeholder="Digite sua senha" required />
        </div>

        <button id="forgot">
          Esqueceu a senha?
        </button>

        <button type="submit" className="btn" id="entrar">Entrar</button>

        <div id="divisaoBtn">
          <img src="src/assets/img/line.svg" alt="Apenas uma linha" />

          <span>Ou</span>

          <img src="src/assets/img/line.svg" alt="Apenas uma linha" />
        </div>

        <button type="submit" className="btn" id="cadastrar">Cadastrar</button>

      <Footer />
      </form>
    </senction>
  )
}