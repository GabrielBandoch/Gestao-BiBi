/* Dependencias */
import { useState } from "react";

/* Imports */
import ContratoPreview from "./contratoPreview";

/* Icons */
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

/* Funções arquivo */

export default function ContratoResponsavel({  }) {
    const [contrato, setContrato] = useState({
        nomeCondutor: "Eric Gabriel Caetano",
        contratado: [
            {
                nome: "Daniela Luisa",
                endereco: "Alfredo Stringari",
                numeroCasa: "620",
                bairro: "Ulysses Guimarães",
                cep: "89.230-690",
                cpf: "122.814.149-57",
                rg: "12.345.678-9",
                telefone: "(47) 99264-7501",
                nomeEscola: "Amador Aguiar",
            }
        ],
        assinado: false,
        tipoTrajeto: 1,
        formaPagamento: "Cartão",
        valorTotal: "12.000,00",
        numeroParcelas: "3",
        valorParcela: "4.000,00",
        dataPagamento: "19/06/2025",
        data: [
            {
                dia: 19,
                mes: "Janeiro",
                ano: 2025,
            }
        ],
        Alunos: [
            {
            nome: "João Pedro",
            nascimento: "12/04/2012",
            serie: "Sexta",
            },
            {
            nome: "Maria Clara",
            nascimento: "28/08/2014",
            serie: "Sexta",
            }
        ],
    });

    const handleAceitarAssinatura = (e) => {
        e.preventDefault();

        setContrato(prev => ({
        ...prev,
        assinado: true
        }));
    }

    const handleNegarAssinatura = (e) => {
        e.preventDefault();

        setContrato(prev => ({
        ...prev,
        assinado: false
        }));
    }

  return (
    <section className="w-full h-full flex justify-between">
        <div className="w-full flex justify-center items-center">
            {contrato === null && (
                <div className="select-none flex flex-col justify-center items-center">
                    <p className="text-2xl text-[rgb(70,189,253)]">Não há contratos para serem assinados</p>
                    <p className="text-sm text-[rgba(70,189,253,0.5)]">Em caso de problemas, entrar em contato com o condutor</p>
                </div>
            )}
            {contrato !== null && (
                <div className="flex flex-col w-full h-full">
                    <div className="flex justify-center items-center mt-6 space-x-4">
                        <button onClick={handleNegarAssinatura} className="
                        py-2 px-5 space-x-3
                        flex justify-center items-center
                        rounded-lg
                        text-[rgba(133,133,133,1)]
                        bg-[rgba(152,162,179,0.2)]
                        cursor-pointer
                        hover:bg-[rgba(152,162,179,0.3)]
                        group
                        transition-all duration-300 ease-in-out transform
                        ">
                            <IoCloseSharp className="text-lg transition-all duration-300 ease-in-out transform"/>
                            <p className="transition-all duration-300 ease-in-out transform">Negar Contrato</p>
                        </button>

                        <button onClick={handleAceitarAssinatura} className="
                        py-2 px-5 space-x-3
                        flex justify-center items-center
                        rounded-lg
                        text-white
                        bg-[rgba(3,105,161,0.9)]
                        cursor-pointer
                        hover:bg-[rgba(3,105,161,1)]
                        group
                        transition-all duration-300 ease-in-out transform
                        ">
                            <FaCheck className="text-lg transition-all duration-300 ease-in-out transform"/>
                            <p className="transition-all duration-300 ease-in-out transform">Assinar Contrato</p>
                        </button>

                    </div>
                    <ContratoPreview contrato={contrato}/>
                </div> 
            )}
        </div>

        <div className="w-60 bg-white"></div>
    </section>
  );    
}