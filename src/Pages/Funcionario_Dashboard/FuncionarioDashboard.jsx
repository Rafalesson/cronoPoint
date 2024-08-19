import React from "react";
import Header from "../../Componentes/Header/Header.jsx";
import BoasVindas from "../../Componentes/BoasVindas/BoasVindas";
import Ponto from "../../Componentes/Ponto/Ponto";
import PontoCheck from "../../Componentes/PontoCheck/PontoCheck";
import Footer from "../../Componentes/Footer/Footer";

export default function FuncionarioDashboard() {
    return (
        <>
            <Header />
            <BoasVindas />
            <Ponto />
            <PontoCheck />
            <Footer />
        </>
    );
}
