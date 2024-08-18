import React, { useState } from "react";
import "./header.css";
import menuHamburger from "../../assets/img/menu-m.svg";
import menuHamburgerPreto from "../../assets/img/menu-m-preto.svg";
import close from "../../assets/img/close-m.svg"
import avatarPerfil from '../../assets/img/Avatars_Pack/Svg/Artboards_Diversity_Avatars_by_Netguru-10.svg';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="cabecalho">
      <nav className="cabecalhoNav">
        <button className="menuHamburguer" onClick={toggleMenu}>
          <img src={menuHamburger} alt="Menu habúrguer" className="menuHamburguerIcon" />
        </button>

        <h1 className="cabecalhoTitulo">
          CRONO POINT
        </h1>

        <button className="avatar">
          <img src={avatarPerfil} alt="Avatar" className="avatarIcon" />
        </button>
      </nav>

      {isMenuOpen && (
        <section id="menuLateralOverlay">
          <div id="menuLateral">
            <header id="cabecalhoML">
              <img src={menuHamburgerPreto} alt="Ícone menu" id="cabecalhoMH" onClick={toggleMenu}/>

              <img src={close} alt="Ícone X" onClick={toggleMenu}/>
            </header>
          </div>
          
        </section>
      )}
    </header>
  );
}
