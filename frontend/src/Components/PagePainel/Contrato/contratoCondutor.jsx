/* Dependencias */
import { useState } from "react";

/* Imports */
import ContratoPreview from "./contratoPreview";
import InfoContrato from "./infoContrato";

/* Icons */

/* Funções arquivo */

export default function ContratoCondutor({  }) {
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
            nomeEscola: "Amador Aguiar",
            },
        ],
    });

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
                <div className="flex flex justify-center items-center space-x-6 w-full h-full">
                    <div className="w-full max-w-100 h-full max-h-140 flex flex-col justify-center bg-white border-1 border-[#c9c9c9] rounded-xl">
                        <InfoContrato contrato={contrato} setContrato={setContrato}/>
                    </div>
                    <div className="flex w-full h-full max-w-182">
                        <ContratoPreview contrato={contrato}/>
                    </div>
                </div> 
            )}
        </div>
    </section>
  );    
}