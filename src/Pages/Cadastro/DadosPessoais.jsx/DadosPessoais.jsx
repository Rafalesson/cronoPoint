import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";
import arrowLeft from "../../../assets/img/arrow_left.svg";
import caracterDP from "../../../assets/img/people_working_pack/SVG/character1.svg";
import "./dadosPessoais.css";

// Registrar a localização em português
registerLocale("pt-BR", ptBR);

export default function DadosPessoais() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <section id="contaneirDP">
      <header id="cabecalhoDP">
        <div id="voltarBtn">
          <ReactSVG
            src={arrowLeft}
            aria-label="Seta apontada para esquerda"
            id="voltarBtnImg"
          />
        </div>
        <img
          src={caracterDP}
          alt="vetor de um homem com uma folha na mão"
          id="caracterDP"
        />
        <span id="cabecalhoText">Vamos começar seu cadastro</span>
      </header>

      <form id="dadosPessoais">
        <h1 id="tituloDP">Dados pessoais</h1>

        <div id="containerCampos">
          <div className="form-group">
            <label htmlFor="name">
              Nome <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">
              CPF (Apenas números) <span className="required">*</span>
            </label>
            <input type="text" id="cpf" placeholder="Digite seu cpf" required />
          </div>

          <div className="form-group">
            <label htmlFor="dob">
              Data de nascimento <span className="required">*</span>
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione a data"
              className="date-picker"
              locale="pt-BR"
              required
              id="dob"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefone fixo</label>
            <input type="text" id="phone" placeholder="(81) 3000-0000" />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Telefone celular <span className="required">*</span></label>
            <input
              type="text"
              id="mobile"
              placeholder="(81) 98888-9999"
              required
            />
          </div>
        </div>

        <div className="button-group">
          <button type="button" id="cancel-button" className="button">
            Cancelar
          </button>
          <button type="submit" id="submit-button" className="button">
            Próximo
          </button>
        </div>
      </form>
    </section>
  );
}
