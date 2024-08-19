import React from "react";
import power from "../../assets/img/power-r.svg";
import "./ponto.css";

export default function Ponto() {
    return (
        <section className="ponto">
            <button id="baterPonto" aria-label="Iniciar jornada">
                <img src={power} alt="Ícone de power para iniciar a jornada" id="baterPontoIcon"/>
                <p id="baterPontoText">Iniciar jornada</p>
            </button>
        </section>
    );
}
