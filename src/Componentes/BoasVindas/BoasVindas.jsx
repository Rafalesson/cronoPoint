import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import circleQuestion from "../../assets/img/question-circle-m.svg";
import "./boasVindas.css";

const capitalizarPrimeiraLetra = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function BoasVindas() {
  const [colaboradorNome, setColaboradorNome] = useState("Colaborador");
  const [horaAtual, setHoraAtual] = useState("");
  const [dataAtual, setDataAtual] = useState("");

  useEffect(() => {
    const nome = localStorage.getItem('colaboradorNome');
    if (nome) {
      setColaboradorNome(nome);
    }

    const atualizarDataHora = () => {
      const agora = new Date();

      let dataFormatada = format(agora, "E, dd/MM/yyyy", { locale: ptBR });
      dataFormatada = capitalizarPrimeiraLetra(dataFormatada);

      const horaFormatada = format(agora, "HH:mm", { locale: ptBR });

      setHoraAtual(horaFormatada);
      setDataAtual(dataFormatada);
    };

    // Atualiza a data e hora imediatamente quando o componente é montado
    atualizarDataHora();

    // Atualiza a cada minuto
    const intervalId = setInterval(atualizarDataHora, 60000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
      <>
        <section className="boas_vindas">
          <div className="saudacoes">
            <p id="bomDia">Bom dia, </p>
            <p id="funcionario">{colaboradorNome}!</p>
          </div>

          <div className="dataHora">
            <p id="horaAtual">{horaAtual}</p>
            <p id="dataAtual">{dataAtual}</p>
          </div>
        </section>

        <section className="sobreEmpresa">
          <p id="sobreEmpresaNome">Softex</p>
          <button id="sobreEmpresaBtn">
            <img
                src={circleQuestion}
                alt="Ícone de interrogação"
                id="sobreEmpresaIcon"
            />
          </button>
        </section>
      </>
  );
}
