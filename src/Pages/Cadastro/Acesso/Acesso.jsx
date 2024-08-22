import React from "react";
import "./acesso.css";
import { ReactSVG } from "react-svg";
import closeBtn from "../../../assets/img/close-m.svg";
import acessoImg from "../../../assets/img/people_working_pack/SVG/character5.svg";

export default function Acesso() {
  return (
    <section id="acessoContainer">
      <header id="cabecalhoAcesso">
        <ReactSVG src={closeBtn} id="btnX" />
        <span id="acessoText">Finalizando...</span>
        <ReactSVG src={acessoImg} id="acessoImg" />
      </header>

      <div id="acessoCampos">
        <form id="acessoForm">
          <div className="form-group">
            <label htmlFor="email" id="formLabel">
              E-mail <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email_valido@example.com"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha" id="formLabel">
              Senha <span className="required">*</span>
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              className="form-input"
              required
            />
          </div>
          <div id="formActions">
            <button type="submit" id="finalizarBtn" className="formBtn">
              Finalizar
            </button>
            <button type="button" id="btnVoltar" className="formBtn">
              Voltar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
