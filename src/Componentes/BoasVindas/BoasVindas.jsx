import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import circleQuestion from "../../assets/img/question-circle-m.svg";
import "./boasVindas.css";

const capitalizarPrimeiraLetra = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function BoasVindas() {
    const [colaboradorNome, setColaboradorNome] = useState("Colaborador");
    const [horaAtual, setHoraAtual] = useState("");
    const [dataAtual, setDataAtual] = useState("");

    useEffect(() => {
        const nome = localStorage.getItem('colaboradorNome');
        if (nome) setColaboradorNome(nome);

        const atualizarDataHora = () => {
            const agora = new Date();
            const dataFormatada = capitalizarPrimeiraLetra(format(agora, "E, dd/MM/yyyy", { locale: ptBR }));
            const horaFormatada = format(agora, "HH:mm", { locale: ptBR });

            setHoraAtual(horaFormatada);
            setDataAtual(dataFormatada);
        };

        atualizarDataHora();
        const intervalId = setInterval(atualizarDataHora, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <section className="boas_vindas">
                <div className="saudacoes">
                    <p id="bomDia">Bom dia,</p>
                    <p id="funcionario">{colaboradorNome}!</p>
                </div>

                <div className="dataHora">
                    <p id="horaAtual">{horaAtual}</p>
                    <p id="dataAtual">{dataAtual}</p>
                </div>
            </section>

            <section className="sobreEmpresa">
                <p id="sobreEmpresaNome">Softex</p>
                <button id="sobreEmpresaBtn" aria-label="Sobre a empresa">
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
