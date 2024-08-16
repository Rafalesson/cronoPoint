import React from "react";
import "./header.css"

export default function Header(){

  return(
      <header className="cabecalho">
        <nav className="cabecalhoNav">
          <button className="menuHamburguer">
          <img src="public/assets/img/menu-m.svg" alt="Menu habúrguer" className="menuHamburguerIcon" />

          </button>

          <h1 className="cabecalhoTitulo">
            CRONO POINT
          </h1>

          <button className="avatar">
            <img src="public/assets/img/Avatars_Pack/Svg/Artboards_Diversity_Avatars_by_Netguru-10.svg" alt="Avatar" className="avatarIcon" />
          </button>
        </nav>
      </header>
  )
}