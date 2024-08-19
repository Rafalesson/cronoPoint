import React, { useState } from 'react';
import menuHamburger from "../../assets/img/menu-m.svg";
import MenuLateral from "./MenuLateral/MenuLateral.jsx";
import avatarPerfil from "../../assets/img/Avatars_Pack/Svg/Artboards_Diversity_Avatars_by_Netguru-10.svg";
import "./header.css"; // Adicionando um arquivo CSS para o Header

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className="cabecalho">
                <nav className="cabecalhoNav">
                    <button className="menuHamburguer" onClick={toggleMenu} aria-label="Abrir menu">
                        <img src={menuHamburger} alt="Menu" />
                    </button>

                    <button className="avatar" aria-label="Perfil">
                        <img src={avatarPerfil} alt="Avatar" className="avatarIcon"/>
                    </button>
                </nav>
            </header>
            {isMenuOpen && <MenuLateral toggleMenu={toggleMenu}/>}
        </>
    );
}
