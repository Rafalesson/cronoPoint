import React from "react";
import Footer from "../../Componentes/Footer/Footer";
import iconeMulher from "../../assets/img/people_working_pack/SVG/character3.svg"
import iconeHomem from "../../assets/img/people_working_pack/SVG/character16.svg"
import linha from "../../assets/img/line.svg"
import "./login.css"


export default function Login(){


  return(
    <senction id="login">
      <div id="containerImg">
        <img src={iconeMulher} alt="Mulher com lupa" className="loginImg" id="loginImg1"/>

        <img src={iconeHomem} alt="Homem no computador" className="loginImg" id="loginImg2"/>
      </div>

      <form action="/login" id="loginForm">

      <h1 id="saudacao">
        Bem-vindo(a) ao <strong>Crono Point</strong>
      </h1>

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
          <img src={linha} alt="Apenas uma linha" />

          <span>Ou</span>

          <img src={linha} alt="Apenas uma linha" />
        </div>

        <button type="submit" className="btn" id="cadastrar">Cadastrar</button>

      <Footer />
      </form>
    </senction>
  )
}