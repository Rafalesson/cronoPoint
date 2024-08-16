import React from "react";
import "./header.css"
import meunuHamburger from "/cronoPoint/public/assets/img/menu-m.svg"
import avatarPerfil from "/cronoPoint/public/assets/img/Avatars_Pack/Svg/Artboards_Diversity_Avatars_by_Netguru-10.svg"

export default function Header(){

  return(
      <header className="cabecalho">
        <nav className="cabecalhoNav">
          <button className="menuHamburguer">
          <img src={meunuHamburger} alt="Menu habúrguer" className="menuHamburguerIcon" />

          </button>

          <h1 className="cabecalhoTitulo">
            CRONO POINT
          </h1>

          <button className="avatar">
            <img src={avatarPerfil} alt="Avatar" className="avatarIcon" />
          </button>
        </nav>
      </header>
  )
}