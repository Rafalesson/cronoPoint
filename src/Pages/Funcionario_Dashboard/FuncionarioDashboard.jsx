import React from "react"
import Header from "/src/Componentes/Header/Header.jsx"
import BoasVindas from "/src/Componentes/BoasVindas/BoasVindas"
import Ponto from "/src/Componentes/Ponto/Ponto"
import PontoCheck from "/src/Componentes/PontoCheck/PontoCheck"
import Footer from "/src/Componentes/Footer/Footer"

export default function FuncionarioDashboard() {
 
  return (
    <>
      <Header />
      <BoasVindas />
      <Ponto />
      <PontoCheck />
      <Footer />
    </>
  )
}