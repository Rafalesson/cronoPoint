import React, { useState } from "react";
import "./header.css";
import avatarPerfil from "../../assets/img/Avatars_Pack/Svg/Artboards_Diversity_Avatars_by_Netguru-10.svg";
import menuHamburger from "../../assets/img/menu-m.svg";
import MenuLateral from "./MenuLateral/MenuLateral"; // Importe o novo componente

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="cabecalho">
      <nav className="cabecalhoNav">
        <button className="menuHamburguer">
          <img
            src={menuHamburger}
            alt="Menu habúrguer"
            onClick={toggleMenu}
            className="menuHamburguerIcon"
          />
        </button>

        <h1 className="cabecalhoTitulo">CRONO POINT</h1>

        <button className="avatar">
          <img src={avatarPerfil} alt="Avatar" className="avatarIcon" />
        </button>
      </nav>

      {isMenuOpen && <MenuLateral toggleMenu={toggleMenu} />}
    </header>
  );
}
