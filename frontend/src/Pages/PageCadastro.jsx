/* Dependencias */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Imports */
import BarraDeProgresso from "../Components/PageCadastro/BarraDeProgresso";
import InfoLogin from "../Components/PageCadastro/InfoLogin";
import ValidaEmail from "../Components/PageCadastro/validaEmail";
import InfoAdicionais from "../Components/PageCadastro/InfoAdicionais";

/* Icons */
import { FaCircleArrowLeft } from "react-icons/fa6";

export default function PageCadastro() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        senha: "",
        confirmarSenha: "",
        nome: "",
        cpf: "",
        celular: "",
        codigoPais: "+55",
        role: "condutor",
    });
    const [etapa, setEtapa] = useState(0);

    /* Função para Finalizar Cadastro e Enviar para banco */
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Cadastro: ", form)
    }

    /* Função para voltar etapa */
    const voltarEtapa = () => {
    if (etapa === 0) {
        navigate("/"); // volta para a home
    } else {
        setEtapa((prev) => prev - 1);
    }
    };

  return (
    <section className="flex h-screen w-screen font-inter">
        {/* Container lado esquerdo */}
        <div className="
        w-1/2 
        flex flex-col justify-between
        p-10
        bg-gradient-to-br from-[#1267A0] to-[#082F49] 
        text-white 
        ">
            {/* Logo */}
            <div className="flex items-center">
                <p className="text-4xl font-bold italic">BIBI</p>
                <div className="text-4xl text-[#007DFA]">·</div>
            </div>
            {/* Chamariz */}
            <div className="text-5xl font-extralight italic">
                <h1>Bem-vindo.</h1>
                <p>Comece sua jornada <br /> agora com nosso <br /> sistema de gestão!</p>
            </div>
        </div>

        {/* Container lado direito */}
        <div className="w-1/2 h-full flex justify-center items-center ">
            <div className="space-y-4">
                {/* Botão Voltar */}
                <div className="px-8">
                    <FaCircleArrowLeft onClick={voltarEtapa} className="text-[#0369A1] text-2xl cursor-pointer hover:scale-120 transition-all duration-300 ease-in-out"/> 
                </div>
                
                <BarraDeProgresso indexEtapa={etapa}/>
                <p className="font-semibold text-3xl select-none px-8">Crie uma conta</p>
                {etapa === 0 && (
                    <InfoLogin form={form} setForm={setForm} setEtapa={setEtapa}/>
                )}
                {etapa === 1 && (
                    <ValidaEmail form={form} setEtapa={setEtapa}/>
                )}  
                {etapa === 2 && (
                    <InfoAdicionais form={form} setForm={setForm} handleSubmit={handleSubmit}/>
                )}
            </div>
        </div>
    </section>
  )
}