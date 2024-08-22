import React from "react";
import "./endereco.css";
import { ReactSVG } from "react-svg";
import womanIcon from "../../../assets/img/people_working_pack/SVG/character21.svg";
import closeBtn from "../../../assets/img/close-m.svg";

export default function Endereco() {
  return (
    <section id="enderecoContainer">
      <header id="cabecalho">
        <ReactSVG
          src={womanIcon}
          aria-label="Mulher com um papel nas mãos"
          id="caracter21"
          className="header-icon"
        />
        <span id="cabecalhoText" className="header-text">
          Quase lá...
        </span>
        <ReactSVG
          src={closeBtn}
          aria-label="Ícone em formato de X"
          id="closeBtn"
          className="header-icon"
        />
      </header>

      <div id="enderecoCampos">
        <h1 id="camposTitulo">Endereço</h1>

        <form id="enderecoForm">
          <div className="form-group">
            <label htmlFor="cep" className="form-label">
              CEP (Apenas números) <span className="required">*</span>
            </label>
            <input
              type="text"
              id="cep"
              name="cep"
              placeholder="50.761-625"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rua" className="form-label">
              Rua <span className="required">*</span>
            </label>
            <input
              type="text"
              id="rua"
              name="rua"
              placeholder="Digite sua rua"
              className="form-input"
              required
            />
          </div>
          <div className="form-group bairro">
            <label htmlFor="bairro" className="form-label">
              Bairro <span className="required">*</span>
            </label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              placeholder="Digite seu bairro"
              className="form-input"
              required
            />
          </div>
          <div className="form-group numero">
            <label htmlFor="numero" className="form-label">
              Número <span className="required">*</span>
            </label>
            <input
              type="text"
              id="numero"
              name="numero"
              placeholder="49"
              className="form-input"
              required
            />
          </div>
          <div className="form-group cidade">
            <label htmlFor="cidade" className="form-label">
              Cidade <span className="required">*</span>
            </label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              placeholder="Recife"
              className="form-input"
              required
            />
          </div>
          <div className="form-group estado">
            <label htmlFor="estado" className="form-label">
              Estado <span className="required">*</span>
            </label>
            <input
              type="text"
              id="estado"
              name="estado"
              placeholder="PE"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="complemento" className="form-label">
              Complemento
            </label>
            <input
              type="text"
              id="complemento"
              name="complemento"
              placeholder="Digite o complemento"
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="button" id="backBtn" className="formBtn">
              Voltar
            </button>
            <button type="submit" id="nextBtn" className="formBtn">
              Próximo
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
