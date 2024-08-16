import React from "react";
import "./header.css"
import menuHamburger from '/cronoPoint/src/assets/img/menu-m.svg';
import avatarPerfil from '/cronoPoint/src/assets/img/Avatars_Pack/Svg/Artboards_Diversity_Avatars_by_Netguru-10.svg';


export default function Header(){

  return(
      <header className="cabecalho">
        <nav className="cabecalhoNav">
          <button className="menuHamburguer">
          <img src={menuHamburger} alt="Menu habúrguer" className="menuHamburguerIcon" />

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