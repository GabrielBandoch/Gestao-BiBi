/* Dependencias */
import { useState } from "react";

/* Imports */

/* Icons */
import { FaHouse } from "react-icons/fa6";
import { FaMoneyCheck } from "react-icons/fa";
import { HiSquares2X2 } from "react-icons/hi2";
import { GoGraph } from "react-icons/go";
import { FaFileLines } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaFileSignature } from "react-icons/fa";

/* Funções arquivo */

export default function SideBar({ setFuncao, funcao, role }) {
    const [ativo, setAtivo] = useState(funcao)

  return (
    <section className="w-full max-w-55 h-full flex items-center">
        <div className="h-full w-55 text-3xl bg-white rounded-tr-xl rounded-br-xl px-4 py-5">

            <div className="w-full">
                <p className="text-xs text-[#A1A1A1] px-1 mb-1">Menu</p>
                <div className="w-full flex flex-col space-y-2">
                    {/* Buttom home */}
                    <button onClick={() => { setAtivo("Home"); setFuncao("Home")}} className={`
                    flex items-center
                    py-2 px-2 space-x-2
                    text-[rgba(133,133,133,1)]
                    cursor-pointer
                    rounded-lg
                    select-none
                    group
                    transition-all duration-300 ease-in-out transform
                    ${ativo === "Home" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
                    `}>
                        <FaHouse className={`text-[26px] transition-all duration-300 ease-in-out transform
                        ${ativo === "Home" ? "text-white" : "group-hover:text-white"}    
                        `}/>
                        <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
                        ${ativo === "Home" ? "text-white" : "group-hover:text-white"}   
                        `}>Home</p>
                    </button>
                    {/* Buttom Funções */}
                    <button onClick={() => { setAtivo("Funcoes"); setFuncao("Funcoes")}} className={`
                    flex items-center
                    py-2 px-2 space-x-2
                    text-[rgba(133,133,133,1)]
                    cursor-pointer
                    rounded-lg
                    select-none
                    group
                    transition-all duration-300 ease-in-out transform
                    ${ativo === "Funcoes" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
                    `}>
                        <FaMoneyCheck className={`text-[26px] transition-all duration-300 ease-in-out transform
                        ${ativo === "Funcoes" ? "text-white" : "group-hover:text-white"}    
                        `}/>
                        <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
                        ${ativo === "Funcoes" ? "text-white" : "group-hover:text-white"}   
                        `}>Funções</p>
                    </button>
                    {/* Buttom Sobre Nós */}
                    <button onClick={() => { setAtivo("Sobre"); setFuncao("Sobre")}} className={`
                    flex items-center
                    py-2 px-2 space-x-2
                    text-[rgba(133,133,133,1)]
                    cursor-pointer
                    rounded-lg
                    select-none
                    group
                    transition-all duration-300 ease-in-out transform
                    ${ativo === "Sobre" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
                    `}>
                        <HiSquares2X2 className={`text-[26px] transition-all duration-300 ease-in-out transform
                        ${ativo === "Sobre" ? "text-white" : "group-hover:text-white"}    
                        `}/>
                        <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
                        ${ativo === "Sobre" ? "text-white" : "group-hover:text-white"}   
                        `}>Sobre Nós</p>
                    </button>
                </div>
            </div>

            <div className="w-full">
                <p className="text-xs text-[#A1A1A1] px-1 mb-1 mt-5">Recursos</p>
                <div className="w-full flex flex-col space-y-2">
                    {role === "condutor" && (
                        <>
                            {/* Buttom Estatisticas */}
                            <button onClick={() => { setAtivo("Estatisticas"); setFuncao("Estatisticas")}} className={`
                            flex items-center
                            py-2 px-2 space-x-2
                            text-[rgba(133,133,133,1)]
                            cursor-pointer
                            rounded-lg
                            select-none
                            group
                            transition-all duration-300 ease-in-out transform
                            ${ativo === "Estatisticas" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
                            `}>
                                <GoGraph className={`text-[26px] transition-all duration-300 ease-in-out transform
                                ${ativo === "Estatisticas" ? "text-white" : "group-hover:text-white"}    
                                `}/>
                                <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
                                ${ativo === "Estatisticas" ? "text-white" : "group-hover:text-white"}   
                                `}>Estatísticas</p>
                            </button>

                            {/* Buttom Relatórios */}
                            <button onClick={() => { setAtivo("Relatorios"); setFuncao("Relatorios")}} className={`
                            flex items-center
                            py-2 px-2 space-x-2
                            text-[rgba(133,133,133,1)]
                            cursor-pointer
                            rounded-lg
                            select-none
                            group
                            transition-all duration-300 ease-in-out transform
                            ${ativo === "Relatorios" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
                            `}>
                                <FaFileLines className={`text-[26px] transition-all duration-300 ease-in-out transform
                                ${ativo === "Relatorios" ? "text-white" : "group-hover:text-white"}    
                                `}/>
                                <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
                                ${ativo === "Relatorios" ? "text-white" : "group-hover:text-white"}   
                                `}>Relatórios</p>
                            </button>

                            {/* Buttom Financeiro */}
                            <button onClick={() => { setAtivo("Financeiro"); setFuncao("Financeiro")}} className={`
                            flex items-center
                            py-2 px-2 space-x-2
                            text-[rgba(133,133,133,1)]
                            cursor-pointer
                            rounded-lg
                            select-none
                            group
                            transition-all duration-300 ease-in-out transform
                            ${ativo === "Financeiro" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
                            `}>
                                <GrMoney className={`text-[26px] transition-all duration-300 ease-in-out transform
                                ${ativo === "Financeiro" ? "text-white" : "group-hover:text-white"}    
                                `}/>
                                <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
                                ${ativo === "Financeiro" ? "text-white" : "group-hover:text-white"}   
                                `}>Financeiro</p>
                            </button>

                            {/* Buttom Turmas */}
                            <button onClick={() => { setAtivo("Turmas"); setFuncao("Turmas")}} className={`
                            flex items-center
                            py-2 px-2 space-x-2
                            text-[rgba(133,133,133,1)]
                            cursor-pointer
                            rounded-lg
                            select-none
                            group
                            transition-all duration-300 ease-in-out transform
                            ${ativo === "Turmas" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
                            `}>
                                <BsFillPersonVcardFill className={`text-[26px] transition-all duration-300 ease-in-out transform
                                ${ativo === "Turmas" ? "text-white" : "group-hover:text-white"}    
                                `}/>
                                <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
                                ${ativo === "Turmas" ? "text-white" : "group-hover:text-white"}   
                                `}>Turmas</p>
                            </button>
                        </>
                    )}



                    {/* Buttom Contratos */}
                    <button onClick={() => { setAtivo("Contratos"); setFuncao("Contratos")}} className={`
                    flex items-center
                    py-2 px-2 space-x-2
                    text-[rgba(133,133,133,1)]
                    cursor-pointer
                    rounded-lg
                    select-none
                    group
                    transition-all duration-300 ease-in-out transform
                    ${ativo === "Contratos" ? "bg-[rgba(3,105,161,1)] scale-102" : "bg-[rgba(152,162,179,0.15)] hover:scale-102 hover:bg-[rgba(3,105,161,1)]"}
                    `}>
                        <FaFileSignature className={`text-[26px] transition-all duration-300 ease-in-out transform
                        ${ativo === "Contratos" ? "text-white" : "group-hover:text-white"}    
                        `}/>
                        <p className={`text-[17px] font-base transition-all duration-300 ease-in-out transform
                        ${ativo === "Contratos" ? "text-white" : "group-hover:text-white"}   
                        `}>Contratos</p>
                    </button>

                </div>
            </div>
        </div>

    </section>
  );
}
