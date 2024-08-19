import React, { useState } from "react";
import { ReactSVG } from 'react-svg';
import "./menuLateral.css";

import menuHamburgerPreto from "../../../assets/img/menu-m-preto.svg";
import close from "../../../assets/img/close-m.svg";
import arrowUp from "../../../assets/img/arrowUp.svg";
import arrowDown from "../../../assets/img/arrowDown.svg";
import userIcon from "../../../assets/img/user-m.svg";
import bancoIcon from "../../../assets/img/clock-m.svg";
import solicitacoesIcon from "../../../assets/img/apps-m.svg";
import relatorioIcon from "../../../assets/img/download-m.svg";
import sairIcon from "../../../assets/img/sair.svg";
import engrenagemIcon from "../../../assets/img/gear-m.svg";

export default function MenuLateral({ toggleMenu }) {
  const [isSolicitacoesOpen, setIsSolicitacoesOpen] = useState(false);

  const toggleSolicitacoes = () => {
    setIsSolicitacoesOpen(!isSolicitacoesOpen);
  };

  const handleLogout = () => {
    // Remover o token de autenticação do localStorage (ou de onde estiver armazenado)
    localStorage.removeItem("authToken");

    // Redirecionar para a página de login
    window.location.href = "/cronoPoint/";
  };

  return (
      <section id="menuLateralOverlay">
        <div id="menuLateral">
          <header id="cabecalhoML">
            <img
                src={menuHamburgerPreto}
                alt="Ícone menu"
                id="cabecalhoMH"
                onClick={toggleMenu} // Fechar menu ao clicar no hambúrguer preto
            />

            <img src={close} alt="Ícone X" id="cabecalhoX" onClick={toggleMenu} /> {/* Fechar menu ao clicar no X */}
          </header>

          <ul id="containerSolicitacoes">
            <li className="solicitacoesItem">
              <div id="perfil">
                <img src={userIcon} alt="Ícone de um usuário" id="userIcon" />
                <span className="solicitacoesText">Perfil</span>
              </div>
            </li>
            <li className="solicitacoesItem">
              <div id="bancoHoras">
                <img src={bancoIcon} alt="ícone de um relógio" id="bancoIcon" />
                <span className="solicitacoesText">Banco de horas</span>
              </div>
            </li>
            <li className="solicitacoesItem" id="listaSolicitacoes">
              <div id="solicitacoes" onClick={toggleSolicitacoes}>
                <div>
                  <img
                      src={solicitacoesIcon}
                      alt="ícone com 4 quadrados"
                      id="solicitacoesImg1"
                  />
                  <span className="solicitacoesText">Solicitações</span>
                </div>

                <img
                    src={isSolicitacoesOpen ? arrowDown : arrowUp}
                    alt="seta apontando para cima"
                    id="solicitacoesImg2"
                />
              </div>

              {isSolicitacoesOpen && (
                  <div id="detalheSolicitacoes" style={{ display: "flex" }}>
                    <div className="dsContainer">
                      <ReactSVG src={engrenagemIcon} className="engrenagemIcon" />
                      <span>Férias</span>
                    </div>
                    <div className="dsContainer">
                      <ReactSVG src={engrenagemIcon} className="engrenagemIcon" />
                      <span>Dispensa</span>
                    </div>
                    <div className="dsContainer">
                      <ReactSVG src={engrenagemIcon} className="engrenagemIcon" />
                      <span>Hora extra</span>
                    </div>
                    <div className="dsContainer">
                      <ReactSVG src={engrenagemIcon} className="engrenagemIcon" />
                      <span>Justificar falta</span>
                    </div>
                  </div>
              )}
            </li>
            <li className="solicitacoesItem">
              <div id="relatorioPonto">
                <img
                    src={relatorioIcon}
                    alt="Ícone de download de relatório de ponto"
                    id="relatorioIcon"
                />
                <span className="solicitacoesText">Relatório de ponto</span>
              </div>
            </li>
            <li className="solicitacoesItem">
              <div id="sair" onClick={handleLogout}>
                <img
                    src={sairIcon}
                    alt="Ícone de uma porta aberta"
                    id="sairIcon"
                />
                <span className="solicitacoesText">Sair</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
  );
}
