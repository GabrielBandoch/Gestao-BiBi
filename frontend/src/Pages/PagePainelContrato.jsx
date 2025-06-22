/* Dependencias */
import { useState } from "react";

/* Imports */
import NavBar from "../Components/PagePainel/NavBar"
import SideBar from "../Components/PagePainel/SideBar"
import fotoPerfil from '../assets/linda.jpg';
import ContratoResponsavel from "../Components/PagePainel/Contrato/ContratoResponsavel";
import ContratoCondutor from "../Components/PagePainel/Contrato/contratoCondutor";

/* Icons */

export default function PagePainelContrato() {
  const [infoUsuario, setInfoUsuario] = useState({
    nome: "Daniela Luísa",
    email: "daniela@email.com",
    foto: fotoPerfil,
    role: "responsavel",
  })
  const [funcao, setFuncao] = useState("Contratos")
  return (
    <section className="h-screen w-screen font-inter bg-[#FAFAFA] flex flex-col">
      
      {/* Topo fixo */}
      <NavBar nome={infoUsuario.nome} email={infoUsuario.email} foto={infoUsuario.foto}/>

      {/* Área principal com sidebar + conteúdo */}
      <div className="flex flex-1 w-full">
        <SideBar setFuncao={setFuncao} funcao={funcao} role={infoUsuario.role}/>
        {/* Conteúdo principal entra aqui */}
        <div className="flex-1">

          {funcao === "Sobre" && (
            <p>Sobre Nós</p>
          )}


          {funcao === "Home" && infoUsuario.role === "condutor" && (
              <p>Home Condutor</p> 
          )}

          {funcao === "Funcoes" && infoUsuario.role === "condutor" && (
              <p>Funções Condutor</p>
          )}

          {funcao === "Contratos" && infoUsuario.role === "condutor" && (
              <ContratoCondutor />
          )}

          {funcao === "Estatisticas" && infoUsuario.role === "condutor" && (
            <p>Estatísticas</p>
          )}
          {funcao === "Relatorios" && infoUsuario.role === "condutor" && (
            <p>Relatórios</p>
          )}
          {funcao === "Financeiro" && infoUsuario.role === "condutor" && (
            <p>Financeiro</p>
          )}
          {funcao === "Turmas" && infoUsuario.role === "condutor" && (
            <p>Turmas</p>
          )}


          {funcao === "Home" && infoUsuario.role === "responsavel" && (
              <p>Home Responsavel</p>
          )}

          {funcao === "Funcoes" && infoUsuario.role === "responsavel" && (
              <p>Funções Responsavel</p>
          )}

          {funcao === "Contratos" && infoUsuario.role === "responsavel" && (
              <ContratoResponsavel />
          )}

        </div>
      </div>

    </section>
  );
}
