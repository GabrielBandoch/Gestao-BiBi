import { useState, useEffect } from "react";
import axios from "axios";

import NavBar from "../Components/PagePainel/NavBar"
import SideBar from "../Components/PagePainel/SideBar"
import fotoPerfil from '../assets/linda.jpg';
import ContratoResponsavel from "../Components/PagePainel/Contrato/ContratoResponsavel";
import ContratoCondutor from "../Components/PagePainel/Contrato/contratoCondutor";

export default function PagePainelContrato() {
  const [infoUsuario, setInfoUsuario] = useState(null);
  const [funcao, setFuncao] = useState("Contratos");

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:1337/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInfoUsuario({
          nome: response.data.nome,
          email: response.data.email,
          foto: response.data.imagem || fotoPerfil,
          role: response.data.role,
        });
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    }
    carregarUsuario();
  }, []);

  if (!infoUsuario) {
    return <div className="flex justify-center items-center h-screen">Carregando usuário...</div>;
  }

  return (
    <section className="h-screen w-screen font-inter bg-[#FAFAFA] flex flex-col">
      
      <NavBar nome={infoUsuario.nome} email={infoUsuario.email} foto={infoUsuario.foto}/>

      <div className="flex flex-1 w-full">
        <SideBar setFuncao={setFuncao} funcao={funcao} role={infoUsuario.role}/>
        <div className="flex-1">

          {funcao === "Sobre" && <p>Sobre Nós</p>}

          {funcao === "Home" && infoUsuario.role === "condutor" && <p>Home Condutor</p>}
          {funcao === "Funcoes" && infoUsuario.role === "condutor" && <p>Funções Condutor</p>}
          {funcao === "Contratos" && infoUsuario.role === "condutor" && <ContratoCondutor />}
          {funcao === "Estatisticas" && infoUsuario.role === "condutor" && <p>Estatísticas</p>}
          {funcao === "Relatorios" && infoUsuario.role === "condutor" && <p>Relatórios</p>}
          {funcao === "Financeiro" && infoUsuario.role === "condutor" && <p>Financeiro</p>}
          {funcao === "Turmas" && infoUsuario.role === "condutor" && <p>Turmas</p>}

          {funcao === "Home" && infoUsuario.role === "responsavel" && <p>Home Responsavel</p>}
          {funcao === "Funcoes" && infoUsuario.role === "responsavel" && <p>Funções Responsavel</p>}
          {funcao === "Contratos" && infoUsuario.role === "responsavel" && <ContratoResponsavel />}
        </div>
      </div>
    </section>
  );
}
