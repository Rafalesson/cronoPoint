import React from "react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import "./boasVindas.css"

const capitalizarPrimeiraLetra = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function BoasVindas() {
  const agora = new Date();
  
  let dataFormatada = format(agora, "E, dd/MM/yyyy", { locale: ptBR });
  
  dataFormatada = capitalizarPrimeiraLetra(dataFormatada)

  const horaFormatada = format(agora, "HH:mm", { locale: ptBR });

  return (
    <>
      <section className="boas_vindas">
        <div className="saudacoes">
          <p id="bomDia">Bom dia, </p>
          <p id="funcionario">Colaborador!</p>
        </div>

        <div className="dataHora">
          <p id="horaAtual">{horaFormatada}</p>
          <p id="dataAtual">{dataFormatada}</p>
        </div>
      </section>

      <section className="sobreEmpresa">
        <p id="sobreEmpresaNome">Softex</p>
        <button id="sobreEmpresaBtn">
          <img
            src="/cronoPoint/public/assets/img/question-circle-m.svg"
            alt="Ícone de interrogação"
            id="sobreEmpresaIcon"
          />
        </button>
      </section>
    </>
  );
}
