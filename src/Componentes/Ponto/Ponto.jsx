import React from "react";
import "./ponto.css"


export default function Ponto(){


  return (
    <section className="ponto">
      <button id="baterPonto">
        <img src="/cronoPoint/public/assets/img/power-r.svg" alt="Ícone de power para iniciar a jornada" id="baterPontoIcon"/>

        <p id="baterPontoText">Iniciar jornada</p>
      </button>
    </section>
  )
}